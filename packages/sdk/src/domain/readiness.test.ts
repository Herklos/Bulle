import { describe, it, expect } from 'vitest';
import { computeReadiness, isFullyPrepared, profileKey } from './readiness.js';
import type { BulleProfile, ReadinessDomain, Task, TaskStatus } from './types.js';

const profile: BulleProfile = {
  dueDate: '2026-09-01T00:00:00.000Z',
  firstBaby: true,
  companionship: 'couple',
};

let n = 0;
const task = (
  over: Partial<Task> & { essential: boolean; status: TaskStatus },
): Task => ({
  id: `t${++n}`,
  projectId: 'p1',
  title: 'Tâche',
  weekStart: 10,
  weekEnd: 20,
  effort: 'S',
  domain: 'maison' as ReadinessDomain,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  ...over,
});

describe('computeReadiness — the denominator', () => {
  it('counts only essential tasks', () => {
    const r = computeReadiness(
      [
        task({ essential: true, status: 'done' }),
        task({ essential: true, status: 'todo' }),
        task({ essential: false, status: 'todo' }),
        task({ essential: false, status: 'todo' }),
      ],
      profile,
    );
    expect(r.total).toBe(2);
    expect(r.resolved).toBe(1);
    expect(r.fill).toBe(0.5);
  });

  it('adding an OPTIONAL task cannot lower the score', () => {
    // The anti-gamification property: planning more must never punish you.
    const base = [task({ essential: true, status: 'done' })];
    const before = computeReadiness(base, profile);
    const after = computeReadiness([...base, task({ essential: false, status: 'todo' })], profile);
    expect(before.fill).toBe(1);
    expect(after.fill).toBe(1);
  });

  it('is 0 with no essential tasks, and reports the empty phrase (never 0/0 = NaN)', () => {
    const r = computeReadiness([task({ essential: false, status: 'todo' })], profile);
    expect(r.total).toBe(0);
    expect(r.fill).toBe(0);
    expect(Number.isNaN(r.fill)).toBe(false);
    expect(r.phraseKey).toBe('readiness.empty');
  });
});

describe('computeReadiness — the numerator', () => {
  it('counts a dismissed task as resolved', () => {
    // "Pas pour nous" is a decision, not a failure. Respecting it is what keeps the
    // score honest — and monotonic.
    const r = computeReadiness(
      [task({ essential: true, status: 'dismissed' }), task({ essential: true, status: 'todo' })],
      profile,
    );
    expect(r.resolved).toBe(1);
    expect(r.fill).toBe(0.5);
  });

  it('a todo task is not resolved', () => {
    const r = computeReadiness([task({ essential: true, status: 'todo' })], profile);
    expect(r.resolved).toBe(0);
  });
});

describe('computeReadiness — monotonicity (spec §6)', () => {
  it('holds the high-water mark when a task is un-ticked within the same profile', () => {
    const done = [task({ essential: true, status: 'done' }), task({ essential: true, status: 'done' })];
    const first = computeReadiness(done, profile);
    expect(first.fill).toBe(1);

    // The user un-ticks one (a mis-tap, or a genuine correction).
    const undone = [task({ essential: true, status: 'todo' }), task({ essential: true, status: 'done' })];
    const second = computeReadiness(undone, profile, first.snapshot);

    expect(second.rawFill).toBe(0.5); // the truth is still available…
    expect(second.fill).toBe(1); // …but the orb does not visibly regress.
    expect(second.regressionReason).toBeUndefined();
  });

  it('allows a drop on profile change, and says why', () => {
    const first = computeReadiness([task({ essential: true, status: 'done' })], profile);
    expect(first.fill).toBe(1);

    // Twins discovered → the essential set itself changed, so a drop is legitimate.
    const newProfile: BulleProfile = { ...profile, multiples: true };
    const second = computeReadiness(
      [task({ essential: true, status: 'done' }), task({ essential: true, status: 'todo' })],
      newProfile,
      first.snapshot,
    );

    expect(second.fill).toBe(0.5);
    expect(second.regressionReason).toBe('profile-changed');
  });

  it('lets the score rise freely', () => {
    const first = computeReadiness(
      [task({ essential: true, status: 'todo' }), task({ essential: true, status: 'todo' })],
      profile,
    );
    const second = computeReadiness(
      [task({ essential: true, status: 'done' }), task({ essential: true, status: 'done' })],
      profile,
      first.snapshot,
    );
    expect(first.fill).toBe(0);
    expect(second.fill).toBe(1);
  });

  it('carries the held value forward in the snapshot, so a hold is not lost next call', () => {
    const done = [task({ essential: true, status: 'done' })];
    const first = computeReadiness(done, profile);
    const undone = [task({ essential: true, status: 'todo' })];
    const second = computeReadiness(undone, profile, first.snapshot);
    const third = computeReadiness(undone, profile, second.snapshot);
    expect(third.fill).toBe(1);
  });
});

describe('profileKey', () => {
  it('changes when the essential set could change', () => {
    expect(profileKey(profile)).not.toBe(profileKey({ ...profile, multiples: true }));
    expect(profileKey(profile)).not.toBe(profileKey({ ...profile, dueDate: '2026-10-01T00:00:00.000Z' }));
    expect(profileKey(profile)).not.toBe(profileKey({ ...profile, companionship: 'solo' }));
  });

  it('does NOT change for `sensitive`, which only alters tone', () => {
    // Toggling a copy/tone flag must not license a visible score drop.
    expect(profileKey(profile)).toBe(profileKey({ ...profile, sensitive: true }));
  });
});

describe('byDomain', () => {
  it('tallies per domain and leaves untouched domains at zero', () => {
    const r = computeReadiness(
      [
        task({ essential: true, status: 'done', domain: 'sante' }),
        task({ essential: true, status: 'todo', domain: 'sante' }),
        task({ essential: true, status: 'done', domain: 'administratif' }),
      ],
      profile,
    );
    expect(r.byDomain.sante).toEqual({ resolved: 1, total: 2, fill: 0.5 });
    expect(r.byDomain.administratif).toEqual({ resolved: 1, total: 1, fill: 1 });
    expect(r.byDomain.finances).toEqual({ resolved: 0, total: 0, fill: 0 });
  });
});

describe('isFullyPrepared — the one celebration gate (§6)', () => {
  const gateTasks = (status: TaskStatus): Task[] => [
    task({ essential: true, status, domain: 'sante' }),
    task({ essential: true, status, domain: 'administratif' }),
    task({ essential: true, status, domain: 'maison' }),
  ];

  it('fires from week 36 when the three gate domains are fully resolved', () => {
    const r = computeReadiness(gateTasks('done'), profile);
    expect(isFullyPrepared(r, 36)).toBe(true);
  });

  it('does not fire before week 36, however ready', () => {
    const r = computeReadiness(gateTasks('done'), profile);
    expect(isFullyPrepared(r, 35)).toBe(false);
  });

  it('does not fire with a gate domain incomplete', () => {
    const r = computeReadiness(
      [...gateTasks('done'), task({ essential: true, status: 'todo', domain: 'sante' })],
      profile,
    );
    expect(isFullyPrepared(r, 38)).toBe(false);
  });

  it('does not fire on a vacuous gate (a domain with no essential tasks at all)', () => {
    // An empty domain has fill 0 but total 0 — it must not count as "complete", or a
    // brand-new bulle would celebrate at week 36 having done nothing.
    const r = computeReadiness([task({ essential: true, status: 'done', domain: 'sante' })], profile);
    expect(isFullyPrepared(r, 38)).toBe(false);
  });
});
