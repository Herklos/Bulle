/**
 * Motion tokens (spec §15.5). Every animation in the app uses one of these named configs —
 * an inline spring is a review failure, the same way an inline hex is.
 *
 * Springs are specified by physics (damping/stiffness/mass), not duration, so they retain
 * physicality at any distance. The durations quoted below are the settle time at typical
 * travel, for reference only.
 *
 * Rules that ride along with these tokens:
 *  - Never two entrance animations at once on one screen.
 *  - Stagger at most 3 elements × 40ms.
 *  - Every animated component checks `useReducedMotion()` and falls back to a 150ms opacity
 *    fade (or, for `breathe`, to a static gradient).
 *  - The Pause-mode screens animate NOTHING (§3.1). Motion reads as cheer; the one screen
 *    someone may open on the worst day of their life must be still.
 */

/** Spring params — shape matches Reanimated's `withSpring` config. */
export interface SpringConfig {
  damping: number;
  stiffness: number;
  mass: number;
}

/** Timing params — shape matches Reanimated's `withTiming` config (easing applied by caller). */
export interface TimingConfig {
  duration: number;
}

/** Cards and screens arriving. ~350ms at typical travel. */
export const settle: SpringConfig = { damping: 18, stiffness: 180, mass: 0.9 };

/** Checkboxes, reactions. Snappier, slightly overshooting. Pair with `impactLight` haptics. */
export const pop: SpringConfig = { damping: 12, stiffness: 320, mass: 1 };

/** Fil parallax, gradient shifts. Slow and unnoticeable by design. */
export const drift: TimingConfig = { duration: 600 };

/**
 * The orb's breathing — 10s per cycle = 6 cycles/min, a calming-breath tempo. This is the
 * one number in the file chosen for a physiological reason rather than a visual one, and it
 * is why the orb reads as alive rather than as a loading spinner.
 */
export const breathe = { duration: 10_000, scaleFrom: 1.0, scaleTo: 1.03 } as const;

/**
 * The celebration. Occurs EXACTLY twice in the whole product (§8.2): the name match, and
 * "Vous êtes prêts". Scarcity is the entire mechanism — a third use devalues the other two.
 * Always skippable on tap.
 */
export const celebrate: TimingConfig = { duration: 2_500 };

/** Fallback when the user prefers reduced motion. */
export const reducedFade: TimingConfig = { duration: 150 };

/** Checkbox tick draw (§15.6). */
export const tickDraw: TimingConfig = { duration: 120 };

/** The single pulse the orb gives when an essential task is ticked (§15.6). */
export const orbPulse = { duration: 400, scale: 1.05 } as const;
