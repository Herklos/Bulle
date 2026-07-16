/**
 * Pregnancy week math (spec §7.2).
 *
 * France counts in **semaines d'aménorrhée (SA)** — weeks since the last menstrual period —
 * and every medical interaction (sage-femme, échographies, the 7 consultations) speaks SA.
 * The rest of the world usually quotes **semaines de grossesse (SG)** — weeks since
 * conception, which is SA − 2. Every competitor localizes this sloppily; showing both, with
 * SA as the default in FR, is a small thing that reads as competence to the actual users.
 *
 * Pure: `now` is always injected, never read from the clock here.
 */

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * French convention: the DPA (date présumée d'accouchement) falls at **41 SA**.
 * (A pregnancy is ~39 weeks of gestation = 41 SA. The international "EDD at 40 weeks"
 * convention counts differently; do not mix the two.)
 */
export const DPA_WEEKS_SA = 41;

/** Offset between the two scales: SG = SA − 2. */
export const SA_TO_SG_OFFSET = 2;

/** Whole days from `now` until the due date. Negative once past term. */
export function daysUntilDue(dueDate: string, now: number): number {
  return Math.round((new Date(dueDate).getTime() - now) / DAY_MS);
}

/** Fractional weeks of amenorrhea. */
export function weeksSA(dueDate: string, now: number): number {
  return DPA_WEEKS_SA - daysUntilDue(dueDate, now) / 7;
}

/** Current week SA, floored and clamped to a sane range. This is the number the UI shows. */
export function currentWeekSA(dueDate: string, now: number): number {
  return Math.max(0, Math.min(42, Math.floor(weeksSA(dueDate, now))));
}

/** Current week SG (= SA − 2), floored and clamped at 0. */
export function currentWeekSG(dueDate: string, now: number): number {
  return Math.max(0, currentWeekSA(dueDate, now) - SA_TO_SG_OFFSET);
}

export type Trimester = 1 | 2 | 3;

/** Trimester from a week SA. T1 < 16 SA, T2 16–27 SA, T3 ≥ 28 SA. */
export function trimester(weekSA: number): Trimester {
  if (weekSA < 16) return 1;
  if (weekSA < 28) return 2;
  return 3;
}

/**
 * 0..1 across the whole pregnancy — drives the orb's gradient temperature (cool → warm,
 * spec §15.2) and the Chemin's background tint. Not a progress bar; never shown as a number.
 */
export function pregnancyProgress(dueDate: string, now: number): number {
  return Math.max(0, Math.min(1, weeksSA(dueDate, now) / DPA_WEEKS_SA));
}

/** Both scales at once, for the tap-to-toggle header (§5.1). */
export interface WeekDisplay {
  sa: number;
  sg: number;
  daysUntil: number;
  trimester: Trimester;
}

export function weekDisplay(dueDate: string, now: number): WeekDisplay {
  const sa = currentWeekSA(dueDate, now);
  return {
    sa,
    sg: Math.max(0, sa - SA_TO_SG_OFFSET),
    daysUntil: daysUntilDue(dueDate, now),
    trimester: trimester(sa),
  };
}
