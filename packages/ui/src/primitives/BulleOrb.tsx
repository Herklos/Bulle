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
  CANVAS_SCALE,
  HALO_OPACITY,
  HALO_SCALE,
  LIGHT,
  liquidPathString,
  meniscusLinePath,
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

  // `layout` is what the orb occupies on screen; `box` is what it draws on. The canvas is
  // deliberately much larger so the halo and contact shadow fade out instead of being cut
  // off at its edge — the surplus hangs outside via the negative margin below and costs
  // layout nothing.
  const layout = size * HALO_SCALE;
  const box = size * CANVAS_SCALE;
  const bleed = (box - layout) / 2;
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

  // The bright line riding the liquid surface. Derived alongside the liquid so the two can
  // never disagree by a frame.
  const meniscus = useDerivedValue(() =>
    Skia.Path.MakeFromSVGString(meniscusLinePath(size, level.value)) ?? Skia.Path.Make(),
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
      style={{ width: layout, height: layout, alignItems: 'center', justifyContent: 'center' }}
      // The glow is decoration; it must never eat a touch meant for what is underneath it.
      pointerEvents="none"
    >
      {/*
        OPEN BUG (Android, seen on emulator-5554): the orb paints inside a visible grey
        square against the ivory background. Reproduced across reloads and breathing cycles,
        so it is not a repaint artifact.

        Measured, not guessed: the square is ~1.3x the sphere, which is `layout`
        (size * HALO_SCALE) — the PARENT View's bounds — and NOT `box` (size * CANVAS_SCALE
        = 2.4x). Android clips a Skia surface to its parent, so a surface painting its own
        background would show at exactly the parent's size. That is the leading hypothesis.

        Ruled out with evidence, so nobody buys them twice:
        - NOT a worklet failure from meniscusFor/liquidPathString. logcat has no Reanimated
          or JS error, and the sphere itself renders correctly. The only RNSkia line is
          "updateAndRelease() failed. The exception above can safely be ignored", which is
          benign and unrelated.
        - NOT the bulle PNGs lacking transparency. All 40 are colortype 6 (RGB+ALPHA) and
          their corner pixels are alpha 0.
        - NOT the canvas bleed itself: the square is 1.3x, and the canvas is 2.4x.

        Next step is `opaque` / surface-backing on <Canvas>, checked ON A DEVICE. Note that
        if the parent really does clip at 1.3x, then CANVAS_SCALE 2.4 is buying nothing and
        the halo is being clipped anyway — which would make this two bugs, not one.
      */}
      <Canvas style={{ width: box, height: box, margin: -bleed }}>
        <Group transform={transform} origin={{ x: box / 2, y: box / 2 }}>
          <Group transform={[{ translateX: (box - size) / 2 }, { translateY: (box - size) / 2 }]}>
            {/* Contact shadow. Sits the orb in space instead of floating it on the page —
                without it the whole thing reads as a sticker, however good the glass is. */}
            <Circle
              cx={cx}
              cy={cy + r * 0.9}
              r={r * 0.7}
              color={withAlpha(colors.ink, LIGHT.contactOpacity)}
            >
              <BlurMask blur={22} style="normal" />
            </Circle>

            {/* Halo — the only light-emitting element in the app (§15.2). */}
            <Circle cx={cx} cy={cy} r={r} color={withAlpha(halo, HALO_OPACITY)}>
              <BlurMask blur={18} style="normal" />
            </Circle>

            {/* Glass body. A radial gradient offset to the upper left: a flat fill reads as
                a plastic ball, and the offset centre supplies the implied light source. */}
            <Circle cx={cx} cy={cy} r={r}>
              <RadialGradient
                c={vec(cx + r * LIGHT.keyX, cy + r * LIGHT.keyY)}
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

              {/* Surface tension: a bright line riding the meniscus. This is what gives the
                  liquid a TOP, rather than looking like a fill pasted behind the glass. */}
              <Path
                path={meniscus}
                style="stroke"
                strokeWidth={1.5}
                color={withAlpha(colors.surface, 0.6)}
              />

              {/* Bounce light: a dim, wide secondary low-right. Sells roundness without
                  implying a second lamp in the room. */}
              <Circle
                cx={cx + r * LIGHT.bounceX}
                cy={cy + r * LIGHT.bounceY}
                r={r * LIGHT.bounceRadius}
                color={withAlpha(colors.surface, LIGHT.bounceOpacity)}
              >
                <BlurMask blur={18} style="normal" />
              </Circle>

              {/* Sheen: the broad diagonal wash across the upper left. */}
              <Circle cx={cx} cy={cy} r={r} opacity={0.45}>
                <LinearGradient
                  start={vec(cx - r, cy - r)}
                  end={vec(cx + r * 0.2, cy + r * 0.3)}
                  colors={[withAlpha(colors.surface, 0.85), withAlpha(colors.surface, 0)]}
                />
              </Circle>

              {/* Rim light: a bright crescent where light wraps the far edge. Drawn INSIDE
                  the clip and inset, so it hugs the inner wall rather than outlining the
                  shape — an outline reads as a border, a crescent reads as a lit edge. */}
              <Circle
                cx={cx - r * 0.06}
                cy={cy - r * 0.08}
                r={r - LIGHT.rimWidth / 2}
                style="stroke"
                strokeWidth={LIGHT.rimWidth}
                color={withAlpha(colors.surface, LIGHT.rimOpacity)}
              >
                <BlurMask blur={3} style="normal" />
              </Circle>

              {/* The KEY SPECULAR. Small, tight, offset up-left. This single element is what
                  the eye reads as "hard transparent surface"; everything above only supports
                  it. A large soft one instead would read as plastic. */}
              <Circle
                cx={cx + r * LIGHT.keyX}
                cy={cy + r * LIGHT.keyY}
                r={r * LIGHT.specularRadius}
                color={withAlpha(colors.surface, LIGHT.specularOpacity)}
              >
                <BlurMask blur={6} style="normal" />
              </Circle>
            </Group>

            {/* The physical edge, hairline, over everything. */}
            <Circle
              cx={cx}
              cy={cy}
              r={r}
              color={withAlpha(colors.line, 0.9)}
              style="stroke"
              strokeWidth={1}
            />
          </Group>
        </Group>
      </Canvas>
    </View>
  );
}
