/**
 * Projects — instantiation from templates and progress (spec §5.3).
 *
 * Pure: ids, `now` and the translator are injected. Nothing here reads a clock, a store,
 * or a global.
 */

import { DEFAULT_COUNTRY } from './templates.js';
import type { BulleProfile, Project, ProjectTemplate, Task, TaskTemplate } from './types.js';

/** Everything impure a template instantiation needs, supplied by the caller. */
export interface InstantiateDeps {
  /** ms wall-clock. */
  now: number;
  /** Resolves an i18n key to the user's language. */
  t: (key: string) => string;
  /**
   * Resolves an i18n key to an ARRAY of paragraphs (i18next `returnObjects`).
   *
   * Separate from `t` because a missing array and a missing string fail differently: `t`
   * returns the key itself when it misses, which as a detail body would render the literal
   * string "templates.valise.tasks.docsDetails" to the user. Omit it and tasks simply have
   * no details, which is the safe direction.
   */
  tList?: (key: string) => string[];
  /** Fresh unique id (e.g. starfish's `randomId`). */
  makeId: () => string;
  /** Where the project sorts among existing ones. */
  order?: number;
  /**
   * ISO 3166-1 alpha-2, for resolving per-country links. Defaults to the profile's country.
   */
  country?: string;
}

/**
 * The official source for a task, in a given country.
 *
 * `hrefByCountry` wins, then the plain `href`. A template that applies everywhere but cites
 * one country's institution is worse than citing none: it is confidently wrong, and the
 * reader has no way to know the page does not describe their system.
 */
export function resolveTaskHref(
  task: Pick<TaskTemplate, 'href' | 'hrefByCountry'>,
  country: string,
): string | undefined {
  return task.hrefByCountry?.[country.toUpperCase()] ?? task.href;
}

/**
 * Instantiate a template into a project + its tasks.
 *
 * Note there is no date arithmetic: template windows are already in SA, the same units the
 * Journey and suggestion engine use. That is the whole point of week-windows — correcting
 * the due date after a scan re-times every task for free, with no migration pass.
 */
export function instantiateTemplate(
  template: ProjectTemplate,
  profile: BulleProfile,
  deps: InstantiateDeps,
): { project: Project; tasks: Task[] } {
  const iso = new Date(deps.now).toISOString();
  const projectId = deps.makeId();

  const project: Project = {
    id: projectId,
    title: deps.t(template.titleKey),
    description: template.descriptionKey ? deps.t(template.descriptionKey) : undefined,
    glyph: template.glyph,
    templateId: template.id,
    order: deps.order ?? 0,
    createdAt: iso,
    updatedAt: iso,
  };

  const kept = template.tasks
    // Solo mode must never materialise a co-parent task — a ghost like "prepare your
    // partner's bag" is exactly the failure §3.2 exists to prevent.
    .filter((tt) => !(profile.companionship === 'solo' && tt.titleKey.endsWith('.coparent')));

  /*
    Ids are minted BEFORE the map so a branch task can point at its choice task, which may
    appear either side of it in the template. `choiceKey` is the authoring-time name; this
    is where it becomes a real id.
  */
  const ids = kept.map(() => deps.makeId());
  const choiceIds = new Map<string, string>();
  kept.forEach((tt, index) => {
    if (tt.choiceKey) choiceIds.set(tt.choiceKey, ids[index]!);
  });

  const tasks: Task[] = kept
    .map((tt, index) => ({
      id: ids[index]!,
      projectId,
      title: deps.t(tt.titleKey),
      notes: tt.notesKey ? deps.t(tt.notesKey) : undefined,
      weekStart: tt.weekStart,
      weekEnd: tt.weekEnd,
      // Carried through, so a post-birth task keeps its real clock instead of being timed
      // by the decorative 41+ SA window it also has (see domain/postnatal.ts).
      afterBirthDays: tt.afterBirthDays,
      details: tt.detailsKey ? deps.tList?.(tt.detailsKey) : undefined,
      // `href` was declared on the template and then dropped on the floor here: it never
      // reached the Task and nothing rendered it, so every official source in the corpus
      // was invisible. That is the one thing making the admin module trustworthy.
      href: resolveTaskHref(tt, deps.country ?? profile.country ?? DEFAULT_COUNTRY),
      effort: tt.effort,
      domain: tt.domain,
      essential: tt.essential,
      // A counted task starts at zero rather than with `count` absent, so the stepper has a
      // number to render on the very first paint instead of a flash of nothing.
      target: tt.target,
      count: tt.target === undefined ? undefined : 0,
      // Ids are generated rather than derived from the label, so editing a line later
      // cannot orphan its own done-state.
      checklist: tt.checklistKey
        ? deps.tList?.(tt.checklistKey)?.map((label) => ({ id: deps.makeId(), label, done: false }))
        : undefined,
      // A choice with no resolvable labels degrades to an ordinary boolean task rather than
      // rendering an empty option list — same fail-safe direction as `details`.
      options:
        tt.optionsKey && tt.optionIds
          ? deps
              .tList?.(tt.optionsKey)
              ?.map((label, i) => ({ id: tt.optionIds![i] ?? `opt-${i}`, label }))
          : undefined,
      branchOfTaskId: tt.branchOf ? choiceIds.get(tt.branchOf.choiceKey) : undefined,
      branchOptionIds: tt.branchOf?.optionIds,
      status: 'todo' as const,
      createdAt: iso,
      updatedAt: iso,
    }))
    // A branch whose choice task was filtered out (solo mode) would be unreachable: nothing
    // could ever answer it, so it would sit in the list forever.
    .filter((task) => !(task.branchOptionIds && !task.branchOfTaskId));

  return { project, tasks };
}

export interface ProjectProgress {
  /** Essential tasks resolved (done or dismissed). */
  resolved: number;
  /** Essential tasks only — optional ones are NEVER in the denominator (§5.3). */
  total: number;
  /** 0..1; 0 when the project has no essential tasks. */
  fill: number;
  /** Rendered as "+N idées", never as unfinished work. */
  optionalCount: number;
}

/** Progress for one project. Counts essential tasks only — see §5.3. */
export function projectProgress(projectId: string, tasks: Task[]): ProjectProgress {
  const mine = tasks.filter((t) => t.projectId === projectId);
  const essential = mine.filter((t) => t.essential);
  const resolved = essential.filter((t) => t.status === 'done' || t.status === 'dismissed').length;
  const total = essential.length;
  return {
    resolved,
    total,
    fill: total === 0 ? 0 : resolved / total,
    optionalCount: mine.length - total,
  };
}

/** Projects in display order, stable by `order` then title. */
export function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}
