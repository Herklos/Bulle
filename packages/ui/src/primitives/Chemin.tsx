'use client';
/**
 * The fil — signature element #2 (spec §15.3).
 *
 * One continuous serpentine path down the screen, one inflection per week. The boundary
 * between the sage (travelled) and line (ahead) segments is *where you are* — marked by a
 * static 16px "vous êtes ici" mini-orb in the orb's colour family (no animation).
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
import { Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useBulleTheme } from '../theme/context.js';
import {
  cheminPath,
  cheminPoints,
  type CheminWeek,
} from './chemin-shared.js';

export type {
  CheminWeek,
  Point,
} from './chemin-shared.js';
export {
  buildCheminWeeks,
  clampCheminWeek,
  cheminPath,
  cheminPoints,
  CHEMIN_FIRST_WEEK,
  CHEMIN_LAST_WEEK,
  CHEMIN_MILESTONE_WEEKS,
} from './chemin-shared.js';

export interface CheminProps {
  weeks: CheminWeek[];
  /** Current week SA — the boundary between travelled and ahead. */
  currentWeek: number;
  /** Week being browsed (heading / card). Distinct from `currentWeek` so the orb stays honest. */
  selectedWeek?: number;
  /** Tap a node to jump the browse week. Hit targets are ≥44pt overlays, not the SVG circles. */
  onSelectWeek?: (week: number) => void;
  /** a11y label for each node hit target. Defaults to the week number alone. */
  weekAccessibilityLabel?: (week: number) => string;
  /** Horizontal serpentine amplitude. ≤24px per §15.3: a gentle meander, not a slalom. */
  amplitude?: number;
  /** Vertical distance between week nodes. */
  spacing?: number;
  width?: number;
}

const HIT = 44;

export function Chemin({
  weeks,
  currentWeek,
  selectedWeek,
  onSelectWeek,
  weekAccessibilityLabel,
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

  const selectedIndex = useMemo(() => {
    if (selectedWeek === undefined) return -1;
    return weeks.findIndex((w) => w.week === selectedWeek);
  }, [weeks, selectedWeek]);

  const height = weeks.length * spacing;

  // Split at the current node so the colour boundary IS "you are here". Both segments
  // include the boundary point, so the join is seamless.
  const travelled = currentIndex >= 0 ? cheminPath(points.slice(0, currentIndex + 1)) : '';
  const ahead = currentIndex >= 0 ? cheminPath(points.slice(currentIndex)) : cheminPath(points);

  return (
    <View
      style={{ width, height }}
      // Hit targets below are labelled; the decorative SVG stays out of the a11y tree.
      accessibilityElementsHidden={!onSelectWeek}
      importantForAccessibility={onSelectWeek ? 'yes' : 'no-hide-descendants'}
    >
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
          const isSelected = i === selectedIndex && i !== currentIndex;
          if (isCurrent) return null; // drawn below, on top of everything

          const r = w.milestone ? 6 : 4;
          return (
            <Circle
              key={w.week}
              cx={p.x}
              cy={p.y}
              r={r}
              fill={past ? colors.sage : colors.bg}
              stroke={isSelected ? colors.ink : past ? colors.sage : colors.line}
              strokeWidth={isSelected ? 2.5 : 2}
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

      {/*
        Absolute overlays, not SVG presses: each node is a 4–6px circle on a 24px meander,
        far under the 44pt floor. Centering a 44×44 Pressable on the node keeps the fil
        tappable without inventing tiny hit areas.
      */}
      {onSelectWeek &&
        weeks.map((w, i) => {
          const p = points[i];
          return (
            <Pressable
              key={`hit-${w.week}`}
              accessibilityRole="button"
              accessibilityLabel={weekAccessibilityLabel?.(w.week) ?? String(w.week)}
              onPress={() => onSelectWeek(w.week)}
              style={{
                position: 'absolute',
                left: p.x - HIT / 2,
                top: p.y - HIT / 2,
                width: HIT,
                height: HIT,
              }}
            />
          );
        })}
    </View>
  );
}
