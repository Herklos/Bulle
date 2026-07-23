import { describe, expect, it } from 'vitest';
import { instantiateTemplate, projectProgress, resolveTaskHref } from './projects.js';
import type { BulleProfile, ProjectTemplate, Task } from './types.js';

const profile: BulleProfile = {
  dueDate: '2027-02-11T00:00:00.000Z',
  firstBaby: true,
  companionship: 'couple',
};

const deps = {
  now: Date.parse('2026-07-16T00:00:00.000Z'),
  t: (k: string) => k,
  tList: (k: string) => [`${k}-p1`, `${k}-p2`],
  makeId: () => Math.random().toString(36).slice(2),
};

const template: ProjectTemplate = {
  id: 'tpl-x',
  titleKey: 'x.title',
  glyph: 'leaf',
  tasks: [
    {
      titleKey: 'x.tasks.a',
      detailsKey: 'x.tasks.aDetails',
      href: 'https://example.fr',
      hrefByCountry: { BE: 'https://example.be' },
      weekStart: 10,
      weekEnd: 12,
      effort: 'S',
      domain: 'administratif',
      essential: true,
    },
  ],
};

describe('resolveTaskHref', () => {
  it('prefers the country-specific link', () => {
    const t = { href: 'https://ameli.fr', hrefByCountry: { BE: 'https://socialsecurity.be' } };
    expect(resolveTaskHref(t, 'BE')).toBe('https://socialsecurity.be');
  });

  it('falls back to the default link when the country has no override', () => {
    const t = { href: 'https://ameli.fr', hrefByCountry: { BE: 'https://socialsecurity.be' } };
    expect(resolveTaskHref(t, 'FR')).toBe('https://ameli.fr');
  });

  it('is case-insensitive about the country code', () => {
    expect(resolveTaskHref({ hrefByCountry: { BE: 'https://socialsecurity.be' } }, 'be')).toBe(
      'https://socialsecurity.be',
    );
  });

  it('is undefined when there is no link at all', () => {
    expect(resolveTaskHref({}, 'FR')).toBeUndefined();
  });
});

describe('instantiateTemplate — details and links', () => {
  it('carries href onto the Task', () => {
    // It used to be declared on the template and dropped on the floor here: it never
    // reached the Task and nothing rendered it, so every official source in the corpus was
    // invisible. Those links are the thing that makes the admin module trustworthy.
    const { tasks } = instantiateTemplate(template, profile, deps);
    expect(tasks[0]!.href).toBe('https://example.fr');
  });

  it('resolves href for the profile country', () => {
    const { tasks } = instantiateTemplate(template, { ...profile, country: 'BE' }, deps);
    expect(tasks[0]!.href).toBe('https://example.be');
  });

  it('lets an explicit country override the profile', () => {
    const { tasks } = instantiateTemplate(template, profile, { ...deps, country: 'BE' });
    expect(tasks[0]!.href).toBe('https://example.be');
  });

  it('resolves details to paragraphs', () => {
    const { tasks } = instantiateTemplate(template, profile, deps);
    expect(tasks[0]!.details).toEqual(['x.tasks.aDetails-p1', 'x.tasks.aDetails-p2']);
  });

  it('leaves details undefined when the caller supplies no tList', () => {
    // The safe direction. `t` returns the KEY on a miss, so routing details through it would
    // render the literal string "x.tasks.aDetails" to the user as a paragraph.
    const { tasks } = instantiateTemplate(template, profile, { ...deps, tList: undefined });
    expect(tasks[0]!.details).toBeUndefined();
  });

  it('leaves details undefined for a task that declares none', () => {
    const bare: ProjectTemplate = {
      ...template,
      tasks: [{ ...template.tasks[0]!, detailsKey: undefined }],
    };
    const { tasks } = instantiateTemplate(bare, profile, deps);
    expect(tasks[0]!.details).toBeUndefined();
  });
});

describe('projectProgress', () => {
  const base = (over: Partial<Task> = {}): Task => ({
    id: 't1',
    projectId: 'p1',
    title: 'T',
    weekStart: 10,
    weekEnd: 12,
    effort: 'S',
    domain: 'maison',
    essential: true,
    status: 'todo',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    ...over,
  });

  it('counts a counted task at target as resolved', () => {
    const progress = projectProgress('p1', [
      base({ id: 'a', target: 6, count: 6, status: 'done' }),
      base({ id: 'b', status: 'todo' }),
    ]);
    expect(progress).toMatchObject({ resolved: 1, total: 2, fill: 0.5 });
  });

  it('counts a fully-ticked checklist as resolved', () => {
    const progress = projectProgress('p1', [
      base({
        id: 'a',
        status: 'done',
        checklist: [
          { id: '1', label: 'A', done: true },
          { id: '2', label: 'B', done: true },
        ],
      }),
    ]);
    expect(progress.resolved).toBe(1);
    expect(progress.total).toBe(1);
  });

  it('counts a dismissed counted task as resolved', () => {
    const progress = projectProgress('p1', [
      base({ id: 'a', target: 6, count: 3, status: 'dismissed' }),
    ]);
    expect(progress.resolved).toBe(1);
  });

  it('ignores optional tasks in the essential tally', () => {
    const progress = projectProgress('p1', [
      base({ id: 'a', status: 'done' }),
      base({ id: 'b', essential: false, status: 'todo' }),
    ]);
    expect(progress).toMatchObject({ resolved: 1, total: 1, optionalCount: 1 });
  });
});
