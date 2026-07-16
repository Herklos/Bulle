'use client';
/**
 * The orb — signature element #1 (spec §15.2). Native (iOS/Android).
 * The web build resolves `BulleOrb.web.tsx`; both derive from `orb-shared.ts`.
 *
 * What it encodes, and why it is not a progress bar:
 *  - FILL is readiness — a liquid level with a meniscus, so it reads as something filling
 *    up rather than something being scored.
 *  - TEMPERATURE is how far along the pregnancy is (cool → warm).
 *  - The BABY floats inside it. That is the product's actual metaphor (§1.1: "une bulle est
 *    protectrice, douce, partagée") made literal: the bubble contains the thing it protects.
 *  - It BREATHES at 6 cycles/min, a calming-breath tempo — why it reads as alive rather
 *    than as a spinner.
 *
 * Layer order is load-bearing: halo → glass → baby → liquid → sheen → rim. The baby sits
 * BEHIND the liquid so a full orb submerges it slightly, and behind the sheen so the glass
 * always reads as being in front of it.
 *
 * No number appears on it. The percentage lives one tap deeper (§6).
 */
import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import {
  BlurMask,
  Canvas,
  Circle,
  Group,
  Image as SkImage,
  LinearGradient,
  Path,
  RadialGradient,
  Skia,
  SweepGradient,
  useImage,
  vec,
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
   * Sentence describing readiness. Required: the orb is the primary status display, so it
   * must have a text equivalent (§15.8 item 4). There is no visual-only state in this app.
   */
  label: string;
  /** Bump to pulse once — fired when an essential task is ticked (§15.6). */
  pulseKey?: number;
  /**
   * The week's illustration, floating inside the glass. Omit for a plain orb (onboarding,
   * the marketing hero) — the orb must stand on its own without it.
   */
  innerImage?: number;
}

export function BulleOrb({
  fill,
  trimesterProgress,
  size = 180,
  label,
  pulseKey = 0,
  innerImage,
}: BulleOrbProps) {
  const { colors, scheme } = useBulleTheme();
  const reduced = useReducedMotion();

  const box = size * HALO_SCALE;
  const r = size / 2;
  const cx = r;
  const cy = r;

  const breath = useSharedValue(1);
  const pulse = useSharedValue(1);
  const level = useSharedValue(fill);
  const baby = useImage(innerImage ?? null);

  // Breathing: 10s sinusoidal, UI thread, forever. Under reduced motion the orb is simply
  // still — a static gradient, not a slower animation.
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

  // The liquid rises with a spring — a readiness gain should settle, not snap.
  useEffect(() => {
    level.value = reduced ? fill : withSpring(fill, settle);
  }, [fill, reduced, level]);

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

  // The halo tracks the gradient's warm stop, so the light the orb casts matches the light
  // it contains.
  const halo = stops[1];

  // The baby is inset and sits low: a fetus floats in the lower half of the sac, and
  // centring it makes the orb look like a logo rather than a bubble with something in it.
  const babyInset = size * 0.20;
  const babyRect = {
    x: babyInset,
    y: babyInset * 1.25,
    width: size - babyInset * 2,
    height: size - babyInset * 2,
  };

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={label}
      style={{ width: box, height: box, alignItems: 'center', justifyContent: 'center' }}
    >
      <Canvas style={{ width: box, height: box }}>
        <Group transform={transform} origin={{ x: box / 2, y: box / 2 }}>
          <Group transform={[{ translateX: (size * (HALO_SCALE - 1)) / 2 }, { translateY: (size * (HALO_SCALE - 1)) / 2 }]}>
            {/* Halo — the only light-emitting element in the app (§15.2). */}
            <Circle cx={cx} cy={cy} r={r} color={withAlpha(halo, HALO_OPACITY)}>
              <BlurMask blur={18} style="normal" />
            </Circle>

            {/* Glass body. A radial gradient offset to the upper left: a flat fill reads as
                a plastic ball, and the offset centre supplies the implied light source. */}
            <Circle cx={cx} cy={cy} r={r}>
              <RadialGradient
                c={vec(cx - r * 0.35, cy - r * 0.35)}
                r={r * 1.6}
                colors={[withAlpha(colors.surface, 0.95), withAlpha(colors.line, 0.55)]}
              />
            </Circle>

            <Group clip={clip}>
              {/* The baby, inside the glass. Softened so it reads as seen THROUGH something
                  rather than pasted on — and so it never competes with the focus card. */}
              {baby && (
                <SkImage
                  image={baby}
                  x={babyRect.x}
                  y={babyRect.y}
                  width={babyRect.width}
                  height={babyRect.height}
                  fit="contain"
                  opacity={scheme === 'dark' ? 0.75 : 0.9}
                />
              )}

              {/* Liquid, over the baby. `start`/`end` span the full turn so the three stops
                  close seamlessly instead of seaming at 0°. */}
              <Path path={liquid} opacity={0.92}>
                <SweepGradient c={vec(cx, cy)} start={0} end={360} colors={stops} />
              </Path>

              {/* Sheen: a soft diagonal highlight across the upper left. This is the one
                  detail that makes it read as glass rather than as a circle — light has to
                  reflect OFF something for it to have a surface. */}
              <Circle cx={cx} cy={cy} r={r} opacity={0.5}>
                <LinearGradient
                  start={vec(cx - r, cy - r)}
                  end={vec(cx + r * 0.2, cy + r * 0.3)}
                  colors={[withAlpha(colors.surface, 0.85), withAlpha(colors.surface, 0)]}
                />
              </Circle>
            </Group>

            {/* Rim, over everything: draws the edge of the glass so the contents read as
                being INSIDE the vessel rather than sitting on top of it. */}
            <Circle cx={cx} cy={cy} r={r} color={colors.line} style="stroke" strokeWidth={1} />
          </Group>
        </Group>
      </Canvas>
    </View>
  );
}
