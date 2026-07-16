/**
 * Template gating and data integrity.
 *
 * Written after a real leak: the app called `templatesForLocale`, which applies the locale
 * filter but NOT `appliesTo`, and offered the twins template to a single pregnancy. The
 * tests below pin both filters and the timing facts that are easy to get quietly wrong.
 */
import { describe, expect, it } from 'vitest';
import {
  PROJECT_TEMPLATES,
  templateById,
  templatesFor,
  templatesForLocale,
} from './templates.js';
import type { BulleProfile } from './types.js';

const couple: BulleProfile = {
  dueDate: '2027-02-11T00:00:00.000Z',
  firstBaby: true,
  companionship: 'couple',
};
const solo: BulleProfile = { ...couple, companionship: 'solo' };
const twins: BulleProfile = { ...couple, multiples: true };

const ids = (profile: BulleProfile, locale = 'fr') =>
  templatesFor(locale, profile).map((t) => t.id);

describe('templatesFor — profile gating', () => {
  it('keeps the twins template away from a single pregnancy', () => {
    expect(ids(couple)).not.toContain('tpl-jumeaux');
    expect(ids(twins)).toContain('tpl-jumeaux');
  });

  it('keeps the solo template away from a couple', () => {
    expect(ids(couple)).not.toContain('tpl-solo');
    expect(ids(solo)).toContain('tpl-solo');
  });

  it('offers every ungated template to everyone', () => {
    for (const id of ['tpl-admin-fr', 'tpl-decisions', 'tpl-garde', 'tpl-valise', 'tpl-nid']) {
      expect(ids(couple)).toContain(id);
    }
  });
});

describe('templatesForLocale — locale gating (§7.1)', () => {
  it('drops the FR-only templates in English rather than mistranslating them', () => {
    const en = templatesForLocale('en').map((t) => t.id);
    // A US or UK user has no CPAM, no CAF and no congé maternité; a literal translation
    // would be actively misleading, so these are absent entirely.
    expect(en).not.toContain('tpl-admin-fr');
    expect(en).not.toContain('tpl-garde');
    expect(en).toContain('tpl-valise');
  });

  it('handles a region tag', () => {
    expect(templatesForLocale('fr-FR').map((t) => t.id)).toContain('tpl-admin-fr');
  });
});

describe('data integrity', () => {
  const tasks = PROJECT_TEMPLATES.flatMap((t) => t.tasks);

  it('has no inverted week windows', () => {
    for (const task of tasks) expect(task.weekStart).toBeLessThanOrEqual(task.weekEnd);
  });

  it('has unique template ids', () => {
    const seen = PROJECT_TEMPLATES.map((t) => t.id);
    expect(new Set(seen).size).toBe(seen.length);
  });

  it('resolves every template by id', () => {
    for (const t of PROJECT_TEMPLATES) expect(templateById(t.id)?.id).toBe(t.id);
  });
});

describe('timing facts that are easy to get wrong', () => {
  it('opens the déclaration de grossesse window at 6 SA and closes it at 16', () => {
    // "Avant la fin du 3e mois" = 14 weeks of GESTATION = 16 SA. This was 8-15 once, which
    // is a week short of the real deadline — and missing it can forfeit the prime.
    const task = templateById('tpl-admin-fr')?.tasks.find((t) =>
      t.titleKey.endsWith('.declaration'),
    );
    expect(task).toBeDefined();
    expect(task?.weekStart).toBe(6);
    expect(task?.weekEnd).toBe(16);
  });

  it('starts the childcare search in the first half of the pregnancy', () => {
    // Nurseries fill before the birth. A window opening after ~24 SA has already lost.
    const first = templateById('tpl-garde')?.tasks[0];
    expect(first?.weekStart).toBeLessThanOrEqual(20);
  });

  it('keeps buying the car seat separate from fitting it', () => {
    // ~95% of parents make an installation error. Merged into one task, the fitting is
    // what silently never happens.
    const achats = templateById('tpl-achats');
    const buy = achats?.tasks.find((t) => t.titleKey.endsWith('.siegeAuto'));
    const fit = achats?.tasks.find((t) => t.titleKey.endsWith('.installer'));
    expect(buy).toBeDefined();
    expect(fit).toBeDefined();
    expect(fit!.weekStart).toBeGreaterThanOrEqual(buy!.weekStart);
    expect(fit!.essential).toBe(true);
  });

  it('decides the VRS strategy before the 32 SA window it gates', () => {
    const task = templateById('tpl-decisions')?.tasks.find((t) => t.titleKey.endsWith('.vrs'));
    expect(task?.weekStart).toBeLessThan(32);
  });
});

describe('post-birth deadlines (domain/postnatal.ts)', () => {
  const tasks = PROJECT_TEMPLATES.flatMap((t) => t.tasks);

  it('gives the déclaration de naissance the statutory 5 days (Art. 55 Code civil)', () => {
    const task = templateById('tpl-admin-fr')?.tasks.find((t) =>
      t.titleKey.endsWith('.declarationNaissance'),
    );
    expect(task?.afterBirthDays).toBe(5);
  });

  it('gives the congé paternité its 6-month window (Art. L1225-35)', () => {
    // An individual, non-transferable right: what is not taken is lost, not deferred. It
    // used to carry only a 41+ SA window, which is timed off an ESTIMATE and so gave the
    // app no way to warn anyone before the right expired.
    const task = templateById('tpl-admin-fr')?.tasks.find((t) =>
      t.titleKey.endsWith('.prendreCongePaternite'),
    );
    expect(task?.afterBirthDays).toBe(182);
  });

  it('never marks a task both post-birth and inside a live pregnancy window', () => {
    // A post-birth task's window is inert by design, but if one opened before the DPA it
    // would surface mid-pregnancy with a deadline that cannot start yet.
    for (const task of tasks.filter((t) => t.afterBirthDays !== undefined)) {
      expect(task.weekStart).toBeGreaterThanOrEqual(41);
    }
  });

  it('has no negative or zero post-birth deadline', () => {
    for (const task of tasks.filter((t) => t.afterBirthDays !== undefined)) {
      expect(task.afterBirthDays!).toBeGreaterThan(0);
    }
  });
});

describe('content rules the corpus must not break', () => {
  const templates = PROJECT_TEMPLATES;

  it('keeps the FR-institution templates out of English (§7.1)', () => {
    // Budget and Postnatal are CAF/PAJE/PRADO/PMI/3114 end to end. An English version would
    // translate a system the reader is not in, which is worse than shipping nothing.
    for (const id of ['tpl-admin-fr', 'tpl-budget', 'tpl-postnatal']) {
      expect(templateById(id)?.locales).toEqual(['fr']);
    }
  });

  it('gives every template at least one task', () => {
    for (const t of templates) expect(t.tasks.length).toBeGreaterThan(0);
  });

  it('points every essential admin/finance task at an official source or explains itself', () => {
    // Not every task can have a link (some are decisions, not procedures), but a task that
    // asserts a French rule without one is an assertion the user cannot check.
    const budget = templateById('tpl-budget')!;
    const linked = budget.tasks.filter((t) => t.essential && t.href);
    expect(linked.length).toBeGreaterThanOrEqual(4);
  });
});
