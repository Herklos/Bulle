/**
 * Post-birth deadlines — the one place Bulle counts in days rather than weeks.
 *
 * Everything else in the model lives on week-windows in SA, on purpose (§4.2): a task that
 * re-times itself when the due date is corrected at a scan is the whole point. That model
 * breaks completely the moment the baby arrives. Three facts force this module to exist:
 *
 *  1. The clocks are legal and they run from the BIRTH, not the estimate. Déclaration de
 *     naissance: 5 days (Art. 55 du Code civil). Congé paternité et d'accueil de l'enfant:
 *     6 months (Art. L1225-35 du Code du travail).
 *  2. A due date cannot stand in for a birth date. Babies do not arrive on the DPA, and a
 *     deadline computed from an estimate is simply the wrong date.
 *  3. Some of these rights are INDIVIDUAL and NON-TRANSFERABLE. What a parent does not take
 *     within the window is not deferred, it is lost. That is the difference between a
 *     missed reminder and a forfeited right, and it is why these tasks cannot be left with
 *     a decorative 41+ SA window and no real clock.
 *
 * Pure: `now` is injected, never read from the clock here.
 *
 * REGULATORY LINE (§7.3): every deadline here schedules *paperwork*, never care. Nothing in
 * this module knows anything about anyone's health.
 */
import type { Bulle, Task } from './types.js';

const DAY_MS = 24 * 60 * 60 * 1000;

/** Timed by the birth rather than by a week-window. */
export function isPostBirthTask(task: Pick<Task, 'afterBirthDays'>): boolean {
  return task.afterBirthDays !== undefined;
}

/** The baby has arrived, so post-birth deadlines have a real clock. */
export function isBorn(bulle: Pick<Bulle, 'birthDate'>): boolean {
  return !!bulle.birthDate;
}

/** Whole days elapsed since the birth. 0 on the day itself. */
export function daysSinceBirth(birthDate: string, now: number): number {
  const born = new Date(birthDate);
  born.setHours(0, 0, 0, 0);
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  return Math.round((today.getTime() - born.getTime()) / DAY_MS);
}

/**
 * Days left to act. Negative once the deadline has passed.
 *
 * Calendar days, not 24h blocks: a deadline "5 days after the birth" is about dates on a
 * calendar, which is how the mairie counts them and how a sleep-deprived parent reads them.
 */
export function daysLeftAfterBirth(
  task: Pick<Task, 'afterBirthDays'>,
  birthDate: string,
  now: number,
): number | null {
  if (task.afterBirthDays === undefined) return null;
  return task.afterBirthDays - daysSinceBirth(birthDate, now);
}

/**
 * Post-birth tasks still open, soonest deadline first.
 *
 * Returns [] before the birth: a deadline with no start date is not "urgent", it is not yet
 * a deadline at all, and showing a countdown against an estimate would be a lie.
 */
export function postBirthTasks(tasks: Task[], bulle: Pick<Bulle, 'birthDate'>): Task[] {
  if (!bulle.birthDate) return [];
  return tasks
    .filter((t) => isPostBirthTask(t) && t.status === 'todo')
    .sort((a, b) => (a.afterBirthDays ?? 0) - (b.afterBirthDays ?? 0));
}

/**
 * Post-birth tasks whose deadline has NOT passed, soonest first.
 *
 * Deliberately separate from `postBirthTasks`: an expired deadline must still be visible.
 * Hiding a task because its legal window closed is how someone finds out months later that
 * they lost a right, from someone other than the app that was supposed to be helping.
 */
export function openPostBirthTasks(
  tasks: Task[],
  bulle: Pick<Bulle, 'birthDate'>,
  now: number,
): Task[] {
  if (!bulle.birthDate) return [];
  const birthDate = bulle.birthDate;
  return postBirthTasks(tasks, bulle).filter(
    (t) => (daysLeftAfterBirth(t, birthDate, now) ?? 0) >= 0,
  );
}

/**
 * The most urgent post-birth task, or null.
 *
 * Feeds the Today focus slot once the baby is here: at that point "what now?" is answered by
 * the legal clock, not by a gestational week that no longer advances.
 */
export function nextPostBirthTask(
  tasks: Task[],
  bulle: Pick<Bulle, 'birthDate'>,
  now: number,
): Task | null {
  return openPostBirthTasks(tasks, bulle, now)[0] ?? null;
}
