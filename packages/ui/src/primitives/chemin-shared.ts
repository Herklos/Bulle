/**
 * Pure fil geometry and week range — no React, no SVG.
 *
 * Kept separate from `Chemin.tsx` so unit tests can pin the numbers without dragging
 * react-native into vitest (Flow parse failure on the RN entry).
 */

export interface CheminWeek {
  /** Week SA. */
  week: number;
  /** Échographies, trimester boundaries — drawn larger. */
  milestone?: boolean;
}

export interface Point {
  x: number;
  y: number;
}

/**
 * Matches SDK `DPA_WEEKS_SA`. Kept local so `@bulle/ui` stays free of the SDK — if the DPA
 * convention ever moves, update both.
 */
export const CHEMIN_LAST_WEEK = 41;
export const CHEMIN_FIRST_WEEK = 1;

/** The three French échographies, plus the trimester boundaries. */
export const CHEMIN_MILESTONE_WEEKS: ReadonlySet<number> = new Set([12, 16, 22, 28, 32]);

/** Weeks 1…DPA as Chemin nodes. One source of truth for the journey floor. */
export function buildCheminWeeks(
  from: number = CHEMIN_FIRST_WEEK,
  to: number = CHEMIN_LAST_WEEK,
  milestones: ReadonlySet<number> = CHEMIN_MILESTONE_WEEKS,
): CheminWeek[] {
  const start = Math.min(from, to);
  const end = Math.max(from, to);
  return Array.from({ length: end - start + 1 }, (_, i) => {
    const week = start + i;
    return { week, milestone: milestones.has(week) };
  });
}

/** Clamp a browse week into the Chemin range. */
export function clampCheminWeek(
  week: number,
  from: number = CHEMIN_FIRST_WEEK,
  to: number = CHEMIN_LAST_WEEK,
): number {
  return Math.max(from, Math.min(to, Math.round(week)));
}

/**
 * A smooth path through `points` using mid-point cubic smoothing: each segment's control
 * points sit on the vertical between consecutive nodes, which keeps the curve gentle and
 * guarantees it never overshoots horizontally past a node.
 */
export function cheminPath(points: Point[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  const parts = [`M ${points[0].x} ${points[0].y}`];
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const cur = points[i];
    const midY = (prev.y + cur.y) / 2;
    parts.push(`C ${prev.x} ${midY}, ${cur.x} ${midY}, ${cur.x} ${cur.y}`);
  }
  return parts.join(' ');
}

/** Node positions. Exported so tests can pin the geometry without rendering. */
export function cheminPoints(
  count: number,
  width: number,
  amplitude: number,
  spacing: number,
): Point[] {
  const center = width / 2;
  return Array.from({ length: count }, (_, i) => ({
    // One inflection per node — a half-period per step.
    x: center + Math.sin(i * (Math.PI / 2)) * amplitude,
    y: spacing / 2 + i * spacing,
  }));
}
