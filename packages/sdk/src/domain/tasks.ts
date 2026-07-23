/**
 * Tasks — week-window helpers and pure reducers.
 *
 * A window is inclusive on both ends and expressed in SA. Note what is deliberately
 * ABSENT: any notion of "overdue". A task past its window is not late, it is simply still
 * on the list (§5.1) — there is no red state, no counter, and no shaming copy anywhere in
 * this module's vocabulary.
 */

import { DPA_WEEKS_SA } from './pregnancy.js';
import type {
  ChecklistItem,
  Effort,
  ReadinessDomain,
  Task,
  TaskOption,
  TaskStatus,
} from './types.js';

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

// ─── Counted tasks (§5.3) ────────────────────────────────────────────────────

/**
 * Is this a stock question rather than a yes/no one? See `Task.target`.
 *
 * A target of 0 is not a counted task: it would be born already complete and the stepper
 * would have nothing to count toward.
 */
export function isCounted(task: Task): boolean {
  return typeof task.target === 'number' && task.target > 0;
}

/** How many are owned, clamped into 0..target. Peers on older builds can send anything. */
export function taskCount(task: Task): number {
  if (!isCounted(task)) return 0;
  return Math.min(Math.max(Math.round(task.count ?? 0), 0), task.target!);
}

/**
 * Nudge a counted task's stock, and derive its status from the result.
 *
 * `status` remains the ONE thing that means "done": readiness, the suggestion engine,
 * Ensemble and the postnatal list all read it and none of them know counts exist. Deriving
 * it here rather than teaching each of those about `target` is what keeps a counted task an
 * ordinary task everywhere except the one row that renders it.
 *
 * Reaching the target completes the task; going back below it reopens it. That symmetry
 * matters — a count that could only ever complete would mean using the minus button locks
 * you into a lie about your own cupboard.
 *
 * `dismissed` survives untouched. "Pas pour nous" is a decision about the item, not a tally,
 * and a stray tap on a stepper must not silently overturn it.
 */
export function stepTaskCount(task: Task, delta: number): { count: number; status: TaskStatus } {
  const target = task.target ?? 0;
  const count = Math.min(Math.max(taskCount(task) + delta, 0), target);
  const status: TaskStatus =
    task.status === 'dismissed' ? 'dismissed' : count >= target ? 'done' : 'todo';
  return { count, status };
}

/**
 * Set a counted task's stock outright, rather than one tap at a time.
 *
 * Same derivation as `stepTaskCount` and deliberately routed through it, so there is exactly
 * one place where "count reached target" turns into "done". Two code paths computing that
 * independently is how a manual entry ends up completing a task the stepper would not.
 */
export function setTaskCount(task: Task, next: number): { count: number; status: TaskStatus } {
  return stepTaskCount(task, Math.round(next) - taskCount(task));
}

/**
 * Change what a counted task is aiming AT.
 *
 * The recommended figures assume a wash every three or four days; a household washing daily
 * needs half of them, and a family given a bag of hand-me-downs needs a different number
 * again. A target the user cannot move is a number arguing with the person who owns the
 * cupboard, so this exists for the same reason the counts are editable at all.
 *
 * Raising the target above the current count reopens the task, which is correct: needing
 * twelve when you own six is not a finished job.
 */
export function setTaskTarget(
  task: Task,
  next: number,
): { target: number; count: number; status: TaskStatus } {
  // Never below 1. A target of 0 would make isCounted false, stranding the task with a
  // stepper that has vanished and a count nothing can clear.
  const target = Math.max(1, Math.round(next));
  const retargeted: Task = { ...task, target };
  return { target, ...stepTaskCount(retargeted, 0) };
}

// ─── Checklist tasks (the third shape) ───────────────────────────────────────

export function hasChecklist(task: Task): boolean {
  return (task.checklist?.length ?? 0) > 0;
}

/** Items ticked, out of the total. For the "2 sur 4" caption on the row. */
export function checklistProgress(task: Task): { done: number; total: number } {
  const items = task.checklist ?? [];
  return { done: items.filter((i) => i.done).length, total: items.length };
}

/**
 * Tick or untick one line, and derive the task's status from the result.
 *
 * Deliberately the same contract as `stepTaskCount`: the last item completes the task, and
 * unticking any item reopens it. `status` stays the single source of truth so readiness,
 * suggestion, Ensemble and the post-birth list need to know nothing about checklists — the
 * same trick that let counted tasks ship without touching any of them.
 *
 * `dismissed` survives untouched, for the same reason it does under the stepper: "pas pour
 * nous" is a decision about the task, not a tally of its parts.
 */
export function toggleChecklistItem(
  task: Task,
  itemId: string,
): { checklist: ChecklistItem[]; status: TaskStatus } {
  const checklist = (task.checklist ?? []).map((item) =>
    item.id === itemId ? { ...item, done: !item.done } : item,
  );
  const complete = checklist.length > 0 && checklist.every((i) => i.done);
  const status: TaskStatus =
    task.status === 'dismissed' ? 'dismissed' : complete ? 'done' : 'todo';
  return { checklist, status };
}

// ─── Choice tasks (the fourth shape) ─────────────────────────────────────────

export function isChoice(task: Task): boolean {
  return (task.options?.length ?? 0) > 0;
}

/**
 * Answer a choice, and prune the branches it rules out.
 *
 * Returns the FULL task list because answering a choice is not a local edit: it resolves the
 * choice task, dismisses every sibling belonging to a branch that was not taken, and
 * restores any that belong to the branch that was. Changing your mind therefore un-prunes,
 * which matters — a childcare decision made in month four is routinely revisited in month
 * seven, and a model that could only ever narrow would punish that.
 *
 * Dismissal, not deletion. A pruned branch keeps everything the user did to it, stays
 * visible in the list as "pas pour nous", and comes back intact if the choice changes.
 * Deleting would be tidier and would silently destroy their work.
 *
 * A branch task the user has already RESOLVED is left alone: they did it, whatever the
 * branch now says, and rewriting a done task's status would be the app arguing with a fact.
 */
export function applyTaskChoice(
  tasks: Task[],
  choiceTaskId: string,
  optionId: string,
  now: string,
): Task[] {
  /*
    If nothing claims the chosen option as a branch, prune nothing.

    Without this, an option that no task belongs to would dismiss every branch of the group
    at once — the user picks an answer and their whole list empties. Recording the answer and
    leaving the branches alone is the only safe reading of "an option we have no tasks for".
  */
  const claimed = tasks.some(
    (t) => t.branchOfTaskId === choiceTaskId && t.branchOptionIds?.includes(optionId),
  );

  return tasks.map((task) => {
    if (task.id === choiceTaskId) {
      return { ...task, chosenOptionId: optionId, status: 'done' as TaskStatus, updatedAt: now };
    }
    if (task.branchOfTaskId !== choiceTaskId || !claimed) return task;

    const onChosenBranch = task.branchOptionIds?.includes(optionId) ?? false;
    if (task.status === 'done') return task;
    if (onChosenBranch && task.status === 'dismissed') {
      return { ...task, status: 'todo' as TaskStatus, updatedAt: now };
    }
    if (!onChosenBranch && task.status === 'todo') {
      return { ...task, status: 'dismissed' as TaskStatus, updatedAt: now };
    }
    return task;
  });
}

/** The option the user picked, if any. */
export function chosenOption(task: Task): TaskOption | undefined {
  return task.options?.find((o) => o.id === task.chosenOptionId);
}

/**
 * The updates a plain "Fait" affordance should write — the Focus card, the Today list, the
 * task screen's button.
 *
 * A counted task reached this way has its stock filled to the target, because `count` and
 * `status` disagreeing is a state the UI cannot render honestly: a row reading "0/6" with a
 * struck-through title claims both that nothing was bought and that the job is finished, and
 * the next tap on `+` would silently reopen a task the user had just closed.
 */
export function completeTaskUpdates(
  task: Task,
): { status: TaskStatus; count?: number; checklist?: ChecklistItem[] } {
  if (isCounted(task)) return { status: 'done', count: task.target };
  // Same reasoning as the count: a struck-through task showing "1 sur 4" claims both that
  // the job is finished and that three pieces of paper are still missing.
  if (hasChecklist(task)) {
    return { status: 'done', checklist: task.checklist!.map((i) => ({ ...i, done: true })) };
  }
  return { status: 'done' };
}

/**
 * Status implied by count / checklist / choice answer, ignoring a current `dismissed` flag.
 *
 * Used when undismissing: a counted task that already reached its target must become `done`
 * again, not `todo`. Forcing `todo` would leave the Stepper looking complete while
 * `projectProgress` under-counts — boolean tasks have no secondary state, so they alone
 * stayed consistent.
 */
export function rederiveTaskStatus(task: Task): TaskStatus {
  if (isCounted(task)) {
    return taskCount(task) >= task.target! ? 'done' : 'todo';
  }
  if (hasChecklist(task)) {
    const items = task.checklist ?? [];
    return items.length > 0 && items.every((i) => i.done) ? 'done' : 'todo';
  }
  if (isChoice(task) && task.chosenOptionId) return 'done';
  return 'todo';
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
