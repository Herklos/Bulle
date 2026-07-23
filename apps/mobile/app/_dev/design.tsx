'use client';
/**
 * The design bench (plan Phase 3) — the two signature primitives with live controls.
 *
 * §15 imposes the process, not just the output: tokens and motion first, then the
 * primitives in isolation with the states you cannot reach by using the app, and only then
 * screens. This is that isolation. Reaching "readiness 1.0 at 38 SA under reduced motion"
 * through the product means faking a due date and ticking twenty tasks; here it is two
 * taps, which is the difference between checking it and meaning to.
 *
 * What it exists to make checkable, per the §15.8 definition of done:
 *  - the orb across its whole fill and temperature range, not just the value today's data
 *    happens to produce
 *  - reduced motion, which is a real user setting and an easy thing to never once see
 *  - dark mode, against the light build, side by side in the same session
 *  - every glyph at once, which is how a stroke inconsistency becomes obvious
 *
 * DEV ONLY. It is unreachable from the app, and `+not-found` catches /_dev/design in a
 * production build unless someone types it. It ships in the bundle either way, which is a
 * few KB of Skia props for a route no user will find: the alternative is a build-time
 * exclusion that silently rots, and a bench nobody can run is a bench nobody uses.
 */
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import { BulleOrb, Chemin, Glyph, GLYPHS, buildCheminWeeks, type CheminWeek, type GlyphName } from '@bulle/ui/primitives';
import { Button, ProgressRing, Text } from '@bulle/ui/components';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';

const FILLS = [0, 0.25, 0.5, 0.75, 1];
const TRIMESTERS = [0, 0.5, 1];

export default function DesignScreen() {
  const { colors, space, scheme } = useBulleTheme();
  const reduced = useReducedMotion();

  const [fill, setFill] = useState(0.45);
  const [trimester, setTrimester] = useState(0.4);
  const [pulseKey, setPulseKey] = useState(0);

  const weeks: CheminWeek[] = buildCheminWeeks(1, 20);

  return (
    <Screen>
      <View style={{ gap: space[2] }}>
        <Text variant="display">Design</Text>
        {/* The ambient facts that change what everything below should look like. */}
        <Text variant="caption">
          {scheme} · reduced motion {reduced ? 'ON' : 'off'}
        </Text>
      </View>

      {/* ── Orb ───────────────────────────────────────────────────────────── */}
      <View style={{ alignItems: 'center', gap: space[4] }}>
        <BulleOrb
          fill={fill}
          trimesterProgress={trimester}
          size={156}
          label={`fill ${fill}, trimester ${trimester}`}
          pulseKey={pulseKey}
        />
        <Text variant="caption">
          fill {fill.toFixed(2)} · trimester {trimester.toFixed(2)}
        </Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space[2], justifyContent: 'center' }}>
          {FILLS.map((value) => (
            <Button key={value} label={`${value}`} tone="ghost" onPress={() => setFill(value)} />
          ))}
        </View>
        <View style={{ flexDirection: 'row', gap: space[2], justifyContent: 'center' }}>
          {TRIMESTERS.map((value) => (
            <Button
              key={value}
              label={value === 0 ? 'T1' : value === 0.5 ? 'T2' : 'T3'}
              tone="ghost"
              onPress={() => setTrimester(value)}
            />
          ))}
        </View>
        {/* The pulse is one frame of feedback and impossible to judge from a still. */}
        <Button label="pulse" onPress={() => setPulseKey((k) => k + 1)} />
      </View>

      {/* ── Rings ─────────────────────────────────────────────────────────── */}
      <View style={{ flexDirection: 'row', gap: space[4], alignItems: 'center' }}>
        {FILLS.map((value) => (
          <ProgressRing key={value} fill={value}>
            <Glyph name="leaf" size={18} color="inkSoft" />
          </ProgressRing>
        ))}
      </View>

      {/* ── Glyphs ────────────────────────────────────────────────────────── */}
      {/* All of them at once: a stroke or grid inconsistency is invisible one at a time. */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space[4] }}>
        {(Object.keys(GLYPHS) as GlyphName[]).map((name) => (
          <View key={name} style={{ alignItems: 'center', gap: space[1], width: 64 }}>
            <Glyph name={name} size={24} color="ink" />
            <Text variant="caption">{name}</Text>
          </View>
        ))}
      </View>

      {/* ── Chemin ────────────────────────────────────────────────────────── */}
      <View style={{ height: 320 }}>
        <ScrollView horizontal={false} style={{ backgroundColor: colors.bg }}>
          <Chemin weeks={weeks} currentWeek={12} />
        </ScrollView>
      </View>
    </Screen>
  );
}
