'use client';
/**
 * The orb — signature element #1 (spec §15.2). Native (iOS/Android) implementation.
 * The web build resolves `BulleOrb.web.tsx` instead; both derive from `orb-shared.ts`.
 *
 * What it encodes, and why it is not a progress bar:
 *  - FILL is readiness — rendered as a liquid level with a meniscus, so it reads as
 *    something filling up rather than something being scored.
 *  - TEMPERATURE is how far along the pregnancy is (cool → warm).
 *  - It BREATHES at 6 cycles/min, a calming-breath tempo. This is why it feels alive
 *    rather than like a loading spinner.
 *
 * No number appears on it by default. The percentage lives one tap deeper, for the users
 * who want it (§6).
 */
import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import {
  BlurMask,
  Canvas,
  Circle,
  Group,
  Path,
  RadialGradient,
  Skia,
  SweepGradient,
} from '@shopify/react-native-skia';
import {
  useDerivedValue,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useBulleTheme } from '../theme/context.js';
import { breathe, settle } from '../theme/motion.js';
import {
  HALO_OPACITY,
  HALO_SCALE,
  liquidPathString,
  orbGradientStops,
  withAlpha,
} from './orb-shared.js';

export interface BulleOrbProps {
  /** Readiness 0..1. */
  fill: number;
  /** 0..1 across the pregnancy — drives the gradient's temperature. */
  trimesterProgress: number;
  size?: number;
  /**
   * Sentence describing readiness, e.g. "Votre bulle prend forme, 7 essentiels restants".
   * Required: the orb is the primary status display, so it must have a text equivalent
   * (§15.8 item 4). There is no visual-only state in this app.
   */
  label: string;
  /** Bump to pulse once — fired when an essential task is ticked (§15.6). */
  pulseKey?: number;
}

export function BulleOrb({ fill, trimesterProgress, size = 180, label, pulseKey = 0 }: BulleOrbProps) {
  const { colors } = useBulleTheme();
  const reduced = useReducedMotion();

  const r = size / 2;
  const cx = r;
  const cy = r;

  const breath = useSharedValue(1);
  const pulse = useSharedValue(1);
  const level = useSharedValue(fill);

  // Breathing: 10s sinusoidal, on the UI thread, forever. Under reduced motion the orb is
  // simply still — a static gradient, not a slower animation.
  useEffect(() => {
    if (reduced) {
      breath.value = 1;
      return;
    }
    breath.value = withRepeat(
      withSequence(
        withTiming(breathe.scaleTo, { duration: breathe.duration / 2, easing: Easing.inOut(Easing.sin) }),
        withTiming(breathe.scaleFrom, { duration: breathe.duration / 2, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );
  }, [reduced, breath]);

  // The liquid rises with a spring — a readiness gain should feel like it settles, not snap.
  useEffect(() => {
    level.value = reduced ? fill : withSpring(fill, settle);
  }, [fill, reduced, level]);

  // One pulse when an essential is ticked. Skipped entirely under reduced motion.
  useEffect(() => {
    if (pulseKey === 0 || reduced) return;
    pulse.value = withSequence(withSpring(1.05, settle), withSpring(1, settle));
  }, [pulseKey, reduced, pulse]);

  const transform = useDerivedValue(() => [{ scale: breath.value * pulse.value }]);

  const liquid = useDerivedValue(() =>
    Skia.Path.MakeFromSVGString(liquidPathString(size, level.value)) ?? Skia.Path.Make(),
  );

  const clip = useMemo(() => {
    const p = Skia.Path.Make();
    p.addCircle(cx, cy, r);
    return p;
  }, [cx, cy, r]);

  const stops = useMemo(
    () => orbGradientStops(colors, trimesterProgress),
    [colors, trimesterProgress],
  );

  // The halo colour tracks the gradient's warm stop, so the light the orb casts matches
  // the light it contains.
  const halo = stops[1];

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={label}
      style={{ width: size * HALO_SCALE, height: size * HALO_SCALE, alignItems: 'center', justifyContent: 'center' }}
    >
      <Canvas style={{ width: size * HALO_SCALE, height: size * HALO_SCALE }}>
        <Group transform={transform} origin={{ x: (size * HALO_SCALE) / 2, y: (size * HALO_SCALE) / 2 }}>
          <Group transform={[{ translateX: (size * (HALO_SCALE - 1)) / 2 }, { translateY: (size * (HALO_SCALE - 1)) / 2 }]}>
            {/* Halo — the only light-emitting element in the app (§15.2). */}
            <Circle cx={cx} cy={cy} r={r} color={withAlpha(halo, HALO_OPACITY)}>
              <BlurMask blur={16} style="normal" />
            </Circle>

            {/*
              Glass body. A radial gradient offset toward the upper left, not a flat fill:
              a single opaque circle reads as a plastic ball, and the whole point of the orb
              is that it looks like something light passes through. The offset centre is
              what supplies the implied light source, and it is the only "refraction" here —
              cheap, and enough.
            */}
            <Circle cx={cx} cy={cy} r={r}>
              <RadialGradient
                c={{ x: cx - r * 0.35, y: cy - r * 0.35 }}
                r={r * 1.6}
                colors={[withAlpha(colors.surface, 0.95), withAlpha(colors.line, 0.55)]}
              />
            </Circle>

            {/* Liquid, clipped to the glass. `start`/`end` span the full turn so the
                three stops close seamlessly instead of seaming at 0°. */}
            <Group clip={clip}>
              <Path path={liquid}>
                <SweepGradient c={{ x: cx, y: cy }} start={0} end={360} colors={stops} />
              </Path>
            </Group>

            {/* Rim. Draws the edge of the glass over the liquid, so the liquid reads as
                being INSIDE the vessel rather than as a shape sitting on top of it. */}
            <Circle cx={cx} cy={cy} r={r} color={colors.line} style="stroke" strokeWidth={1} />
          </Group>
        </Group>
      </Canvas>
    </View>
  );
}
