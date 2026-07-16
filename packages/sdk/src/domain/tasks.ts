/**
 * Tasks — week-window helpers and pure reducers.
 *
 * A window is inclusive on both ends and expressed in SA. Note what is deliberately
 * ABSENT: any notion of "overdue". A task past its window is not late, it is simply still
 * on the list (§5.1) — there is no red state, no counter, and no shaming copy anywhere in
 * this module's vocabulary.
 */

import { DPA_WEEKS_SA } from './pregnancy.js';
import type { Effort, ReadinessDomain, Task, TaskStatus } from './types.js';

/** Minutes an effort estimate implies — shown as "~20 min" on the focus card (§5.1). */
export const EFFORT_MINUTES: Record<Effort, number> = { S: 20, M: 60, L: 180 };

export function isInWindow(task: Task, weekSA: number): boolean {
  return weekSA >= task.weekStart && weekSA <= task.weekEnd;
}

/** The window has not opened yet. */
export function isUpcoming(task: Task, weekSA: number): boolean {
  return weekSA < task.weekStart;
}

/** The window has closed and the task is unresolved. Still not "late" — see the header. */
export function isLingering(task: Task, weekSA: number): boolean {
  return weekSA > task.weekEnd && task.status === 'todo';
}

export function isResolved(task: Task): boolean {
  return task.status === 'done' || task.status === 'dismissed';
}

/** Open tasks whose window contains `weekSA`. */
export function tasksForWeek(tasks: Task[], weekSA: number): Task[] {
  return tasks.filter((t) => t.status === 'todo' && isInWindow(t, weekSA));
}

/** Group tasks by their window, for the project detail screen (§5.3). */
export function groupByWindow(tasks: Task[]): { weekStart: number; weekEnd: number; tasks: Task[] }[] {
  const buckets = new Map<string, { weekStart: number; weekEnd: number; tasks: Task[] }>();
  for (const task of tasks) {
    const key = `${task.weekStart}-${task.weekEnd}`;
    const bucket = buckets.get(key);
    if (bucket) bucket.tasks.push(task);
    else buckets.set(key, { weekStart: task.weekStart, weekEnd: task.weekEnd, tasks: [task] });
  }
  return [...buckets.values()].sort((a, b) => a.weekStart - b.weekStart || a.weekEnd - b.weekEnd);
}

// ─── Custom tasks (§5.3) ─────────────────────────────────────────────────────

/**
 * When a hand-written task should sit. Three coarse choices, not a week picker: a person
 * adding "acheter un tire-lait" knows "bientôt", not "semaines 29 à 33". Asking for
 * precision nobody has is how a companion turns into a project-management tool.
 */
export type CustomTaskWhen = 'thisWeek' | 'soon' | 'beforeBirth';

/** How many weeks past the current one "soon" reaches. */
const SOON_WEEKS = 4;

/**
 * The window for a custom task. Always opens at the CURRENT week: a task you just typed is
 * something you are thinking about now, so it must never be filed as upcoming and hidden.
 *
 * Clamped to the DPA so a window cannot open after the date it would close on — otherwise a
 * task added at 40 SA gets `weekStart > weekEnd` and matches no week at all, silently
 * vanishing from every list that filters by window.
 */
export function customTaskWindow(
  weekSA: number,
  when: CustomTaskWhen,
): { weekStart: number; weekEnd: number } {
  const weekStart = Math.max(1, Math.min(Math.round(weekSA), DPA_WEEKS_SA));
  const weekEnd =
    when === 'thisWeek'
      ? weekStart
      : when === 'soon'
        ? Math.min(weekStart + SOON_WEEKS, DPA_WEEKS_SA)
        : DPA_WEEKS_SA;
  return { weekStart, weekEnd: Math.max(weekStart, weekEnd) };
}

/**
 * The domain a project mostly belongs to, from the tasks already in it.
 *
 * A Project carries a glyph but no domain of its own, so a hand-written task has to get its
 * readiness bucket from its neighbours rather than by asking the user to classify their own
 * shopping. Ties break toward the first task seen, which is stable because the caller passes
 * tasks in insertion order.
 */
export function dominantDomain(tasks: Task[], fallback: ReadinessDomain = 'maison'): ReadinessDomain {
  if (tasks.length === 0) return fallback;
  const counts = new Map<ReadinessDomain, number>();
  for (const task of tasks) counts.set(task.domain, (counts.get(task.domain) ?? 0) + 1);
  let best: ReadinessDomain = tasks[0]!.domain;
  for (const [domain, count] of counts) {
    if (count > (counts.get(best) ?? 0)) best = domain;
  }
  return best;
}

// ─── Pure reducers (the store delegates to these) ─────────────────────────────

export function addTask(tasks: Task[], task: Task): Task[] {
  return [...tasks, task];
}

export function updateTask(tasks: Task[], id: string, updates: Partial<Task>, now: string): Task[] {
  return tasks.map((t) => (t.id === id ? { ...t, ...updates, updatedAt: now } : t));
}

export function removeTask(tasks: Task[], id: string): Task[] {
  return tasks.filter((t) => t.id !== id);
}

export function setTaskStatus(tasks: Task[], id: string, status: TaskStatus, now: string): Task[] {
  return updateTask(tasks, id, { status }, now);
}

/**
 * "Plus tard" (§5.1) is intentionally NOT a reducer.
 *
 * Deferring must persist nothing — no snooze count, no deferral timestamp — because any
 * such field inevitably surfaces as guilt ("reporté 3 fois"), which the spec forbids. But
 * the focus engine is deterministic, so a pure no-op would re-offer the very same task and
 * make the button feel broken.
 *
 * The resolution: deferral is SESSION state, not domain state. The caller keeps the deferred
 * ids in memory for the session and passes them to `suggestFocus({ excludeIds })`. They
 * evaporate on relaunch, so the task genuinely "re-enters the pool" — exactly the spec's
 * wording — while nothing is ever written down about how often it was postponed.
 */
