/**
 * The notification policy (spec §5.11) — pure rules, no scheduling.
 *
 * The cap is ONE per day and it is structural, not policed: the app schedules a single
 * repeating daily trigger, so "at most one" is a property of the shape rather than a rule
 * something has to remember to enforce. There is no per-event notification anywhere, and
 * that is deliberate. The moment a task can fire its own reminder, the cap becomes a
 * counter someone has to check, and counters lose.
 *
 * What is deliberately IMPOSSIBLE to express here, because §5.11 forbids it and code is a
 * better place to forbid it than a document:
 *  - streaks ("3 jours d'affilée !")
 *  - score deltas ("votre préparation a baissé")
 *  - win-back ("on ne vous a pas vu depuis 5 jours")
 *  - anything in the evening
 *
 * Those are the mechanics an engagement-optimised product reaches for, and each one turns a
 * calm companion into a thing that pesters someone who is pregnant. There is one morning
 * line, it says what today holds, and it never comments on what you did not do.
 */

/** The morning digest fires here, local time. */
export const DIGEST_HOUR = 8;
export const DIGEST_MINUTE = 0;

/** Quiet hours (§5.11): nothing may fire from 21h to 8h. */
export const QUIET_FROM_HOUR = 21;
export const QUIET_TO_HOUR = 8;

/**
 * Is this hour inside the quiet window?
 *
 * The window wraps midnight, so a naive `h >= 21 && h < 8` is always false. That bug would
 * be silent and would let a 3am notification through, which is the exact thing the window
 * exists to stop.
 */
export function isQuietHour(hour: number): boolean {
  return hour >= QUIET_FROM_HOUR || hour < QUIET_TO_HOUR;
}

/** The digest hour must sit outside the quiet window, or the policy contradicts itself. */
export function isDigestHourValid(): boolean {
  return !isQuietHour(DIGEST_HOUR);
}

export interface DigestPlan {
  /** Whether anything should be scheduled at all. */
  enabled: boolean;
  hour: number;
  minute: number;
}

export interface DigestInput {
  /** The user's opt-in. Off by default (§5.11: opt-in, never opt-out). */
  notificationsEnabled: boolean;
  /** Pause purges everything and blocks rescheduling (§3.1). */
  paused: boolean;
}

/**
 * What to schedule. Returns `enabled: false` rather than throwing, so every caller path
 * ends in "cancel everything and maybe schedule one thing".
 *
 * Pause wins over the opt-in, always. Someone who paused after a loss has not withdrawn
 * consent to notifications in general; they have said not now, and the schedule must be
 * empty regardless of what the toggle still says.
 */
export function planDigest(input: DigestInput): DigestPlan {
  const enabled = input.notificationsEnabled && !input.paused;
  return { enabled, hour: DIGEST_HOUR, minute: DIGEST_MINUTE };
}
