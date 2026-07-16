import { describe, it, expect } from 'vitest';
import { suggestFocus, suggestTemplates, weekEssentials } from './suggest.js';
import type { BulleProfile, Effort, Task, TaskStatus } from './types.js';

const profile: BulleProfile = {
  dueDate: '2026-09-01T00:00:00.000Z',
  firstBaby: true,
  companionship: 'couple',
};

const task = (id: string, over: Partial<Task> = {}): Task => ({
  id,
  projectId: 'p1',
  title: id,
  weekStart: 10,
  weekEnd: 20,
  effort: 'S' as Effort,
  domain: 'maison',
  essential: false,
  status: 'todo' as TaskStatus,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  ...over,
});

describe('suggestFocus — ranking', () => {
  it('prefers essential over optional', () => {
    const picked = suggestFocus([task('opt'), task('ess', { essential: true })], { weekSA: 15 });
    expect(picked?.id).toBe('ess');
  });

  it('prefers an in-window task over one whose window has not opened', () => {
    const picked = suggestFocus(
      [task('future', { weekStart: 30, weekEnd: 35 }), task('now')],
      { weekSA: 15 },
    );
    expect(picked?.id).toBe('now');
  });

  it('prefers shorter effort as the final tie-break', () => {
    const picked = suggestFocus([task('long', { effort: 'L' }), task('short', { effort: 'S' })], {
      weekSA: 15,
    });
    expect(picked?.id).toBe('short');
  });

  it('ranks essential above in-window — an essential future task beats an optional current one', () => {
    const picked = suggestFocus(
      [task('optNow'), task('essLater', { essential: true, weekStart: 30, weekEnd: 35 })],
      { weekSA: 15 },
    );
    expect(picked?.id).toBe('essLater');
  });

  it('still offers a lingering task, ranked ahead of one not yet open', () => {
    // A closed window is not "late" — it just stays quietly in the pool.
    const picked = suggestFocus(
      [task('future', { weekStart: 30, weekEnd: 35 }), task('lingering', { weekStart: 5, weekEnd: 8 })],
      { weekSA: 15 },
    );
    expect(picked?.id).toBe('lingering');
  });
});

describe('suggestFocus — behaviour', () => {
  it('ignores resolved tasks', () => {
    const picked = suggestFocus(
      [task('done', { status: 'done', essential: true }), task('todo')],
      { weekSA: 15 },
    );
    expect(picked?.id).toBe('todo');
  });

  it('returns null when everything is resolved — the caller must not invent busywork', () => {
    expect(suggestFocus([task('a', { status: 'done' }), task('b', { status: 'dismissed' })], { weekSA: 15 })).toBeNull();
  });

  it('returns null for an empty list', () => {
    expect(suggestFocus([], { weekSA: 15 })).toBeNull();
  });

  it('is stable across calls (a focus card must not reshuffle on re-render)', () => {
    const tasks = [task('b'), task('a'), task('c')];
    expect(suggestFocus(tasks, { weekSA: 15 })?.id).toBe(suggestFocus(tasks, { weekSA: 15 })?.id);
  });

  it('"Plus tard" excludes the task for the session and offers the next one', () => {
    const tasks = [task('first', { essential: true }), task('second', { essential: true, effort: 'M' })];
    expect(suggestFocus(tasks, { weekSA: 15 })?.id).toBe('first');
    expect(suggestFocus(tasks, { weekSA: 15, excludeIds: new Set(['first']) })?.id).toBe('second');
  });

  it('returns null once everything open has been deferred, rather than looping', () => {
    const tasks = [task('a'), task('b')];
    expect(suggestFocus(tasks, { weekSA: 15, excludeIds: new Set(['a', 'b']) })).toBeNull();
  });
});

describe('weekEssentials', () => {
  it('returns only open, essential, in-window tasks, capped at 3', () => {
    const tasks = [
      task('e1', { essential: true }),
      task('e2', { essential: true }),
      task('e3', { essential: true }),
      task('e4', { essential: true }),
      task('optional'),
      task('done', { essential: true, status: 'done' }),
      task('future', { essential: true, weekStart: 30, weekEnd: 35 }),
    ];
    const out = weekEssentials(tasks, 15);
    expect(out).toHaveLength(3);
    expect(out.every((t) => t.essential && t.status === 'todo')).toBe(true);
    expect(out.map((t) => t.id)).not.toContain('future');
  });
});

describe('suggestTemplates', () => {
  const available = [
    { id: 'tpl-a', tasks: [{ weekStart: 10 }, { weekStart: 20 }] },
    { id: 'tpl-b', tasks: [{ weekStart: 34 }] },
  ];

  it('proposes a template whose first window opens within the lookahead', () => {
    const out = suggestTemplates(available, new Set(), 8, profile);
    expect(out.map((s) => s.templateId)).toEqual(['tpl-a']);
    expect(out[0].opensAtWeek).toBe(10);
  });

  it('does not propose an already-instantiated template', () => {
    expect(suggestTemplates(available, new Set(['tpl-a']), 8, profile)).toEqual([]);
  });

  it('does not propose a template still far out', () => {
    expect(suggestTemplates(available, new Set(['tpl-a']), 20, profile)).toEqual([]);
  });

  it('uses a shorter lookahead for a gentle profile', () => {
    // Someone on bed rest should not be handed work four weeks early.
    const gentle: BulleProfile = { ...profile, gentle: true };
    expect(suggestTemplates(available, new Set(), 7, profile).map((s) => s.templateId)).toEqual(['tpl-a']);
    expect(suggestTemplates(available, new Set(), 7, gentle)).toEqual([]);
    expect(suggestTemplates(available, new Set(), 8, gentle).map((s) => s.templateId)).toEqual(['tpl-a']);
  });
});
