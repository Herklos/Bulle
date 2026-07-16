/**
 * Projects — instantiation from templates and progress (spec §5.3).
 *
 * Pure: ids, `now` and the translator are injected. Nothing here reads a clock, a store,
 * or a global.
 */

import type { BulleProfile, Project, ProjectTemplate, Task } from './types.js';

/** Everything impure a template instantiation needs, supplied by the caller. */
export interface InstantiateDeps {
  /** ms wall-clock. */
  now: number;
  /** Resolves an i18n key to the user's language. */
  t: (key: string) => string;
  /** Fresh unique id (e.g. starfish's `randomId`). */
  makeId: () => string;
  /** Where the project sorts among existing ones. */
  order?: number;
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

  const tasks: Task[] = template.tasks
    // Solo mode must never materialise a co-parent task — a ghost like "prepare your
    // partner's bag" is exactly the failure §3.2 exists to prevent.
    .filter((tt) => !(profile.companionship === 'solo' && tt.titleKey.endsWith('.coparent')))
    .map((tt) => ({
      id: deps.makeId(),
      projectId,
      title: deps.t(tt.titleKey),
      notes: tt.notesKey ? deps.t(tt.notesKey) : undefined,
      weekStart: tt.weekStart,
      weekEnd: tt.weekEnd,
      effort: tt.effort,
      domain: tt.domain,
      essential: tt.essential,
      status: 'todo',
      createdAt: iso,
      updatedAt: iso,
    }));

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
