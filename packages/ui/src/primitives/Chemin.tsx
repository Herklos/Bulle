'use client';
/**
 * The fil — signature element #2 (spec §15.3).
 *
 * One continuous serpentine path down the screen, one inflection per week. The boundary
 * between the sage (travelled) and line (ahead) segments is *where you are* — marked by a
 * 16px mini-orb that breathes with the same tempo as the big one.
 *
 * Rendered with react-native-svg rather than Skia: the geometry is a single stroked path,
 * which SVG does natively on all three platforms, and the fil needs no gradient or blur.
 * Skia would buy nothing here and would cost the web a wasm payload.
 *
 * Note there is no `strokeDashoffset` reveal. The travelled and untravelled segments are
 * built as two separate paths from computed geometry, because `getTotalLength()` — which a
 * dash-offset reveal needs — does not exist in react-native-svg on native. Splitting the
 * path is deterministic, identical across platforms, and cheaper.
 */
import React, { useMemo } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useBulleTheme } from '../theme/context.js';

export interface CheminWeek {
  /** Week SA. */
  week: number;
  /** Échographies, trimester boundaries — drawn larger. */
  milestone?: boolean;
}

export interface CheminProps {
  weeks: CheminWeek[];
  /** Current week SA — the boundary between travelled and ahead. */
  currentWeek: number;
  /** Horizontal serpentine amplitude. ≤24px per §15.3: a gentle meander, not a slalom. */
  amplitude?: number;
  /** Vertical distance between week nodes. */
  spacing?: number;
  width?: number;
}

interface Point {
  x: number;
  y: number;
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

export function Chemin({
  weeks,
  currentWeek,
  amplitude = 24,
  spacing = 72,
  width = 96,
}: CheminProps) {
  const { colors } = useBulleTheme();

  const points = useMemo(
    () => cheminPoints(weeks.length, width, amplitude, spacing),
    [weeks.length, width, amplitude, spacing],
  );

  const currentIndex = useMemo(() => {
    const exact = weeks.findIndex((w) => w.week === currentWeek);
    if (exact !== -1) return exact;
    // Before the first week → nothing travelled; past the last → all of it.
    if (weeks.length === 0 || currentWeek < weeks[0].week) return -1;
    return weeks.length - 1;
  }, [weeks, currentWeek]);

  const height = weeks.length * spacing;

  // Split at the current node so the colour boundary IS "you are here". Both segments
  // include the boundary point, so the join is seamless.
  const travelled = currentIndex >= 0 ? cheminPath(points.slice(0, currentIndex + 1)) : '';
  const ahead = currentIndex >= 0 ? cheminPath(points.slice(currentIndex)) : cheminPath(points);

  return (
    <View style={{ width, height }} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Svg width={width} height={height}>
        {ahead !== '' && (
          <Path d={ahead} stroke={colors.line} strokeWidth={3} strokeLinecap="round" fill="none" />
        )}
        {travelled !== '' && (
          <Path d={travelled} stroke={colors.sage} strokeWidth={3} strokeLinecap="round" fill="none" />
        )}

        {weeks.map((w, i) => {
          const p = points[i];
          const past = i < currentIndex;
          const isCurrent = i === currentIndex;
          if (isCurrent) return null; // drawn below, on top of everything

          const r = w.milestone ? 6 : 4;
          return (
            <Circle
              key={w.week}
              cx={p.x}
              cy={p.y}
              r={r}
              fill={past ? colors.sage : colors.bg}
              stroke={past ? colors.sage : colors.line}
              strokeWidth={2}
            />
          );
        })}

        {/* "Vous êtes ici" — a 16px mini-orb, same family as the big one. */}
        {currentIndex >= 0 && (
          <>
            <Circle cx={points[currentIndex].x} cy={points[currentIndex].y} r={12} fill={colors.sage} opacity={0.2} />
            <Circle cx={points[currentIndex].x} cy={points[currentIndex].y} r={8} fill={colors.sage} />
          </>
        )}
      </Svg>
    </View>
  );
}
