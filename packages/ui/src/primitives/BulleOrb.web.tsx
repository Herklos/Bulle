'use client';
/**
 * The orb — web implementation (spec §15.2). Resolves instead of `BulleOrb.tsx` on web.
 *
 * Same maths (`orb-shared.ts`), different renderer: a CSS `conic-gradient` IS a sweep
 * gradient, and `filter: blur()` is the halo — so the web gets the identical design without
 * the ~6MB CanvasKit wasm that Skia would pull into a static export that also serves the
 * marketing site.
 *
 * The liquid is an inline SVG path clipped to a circle, which keeps the meniscus honest;
 * the conic gradient sits behind it and is revealed through the path via an SVG mask.
 */
import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useBulleTheme } from '../theme/context.js';
import { breathe } from '../theme/motion.js';
import {
  HALO_OPACITY,
  HALO_SCALE,
  LIGHT,
  liquidPathString,
  orbGradientStops,
  withAlpha,
} from './orb-shared.js';
import type { BulleOrbProps } from './BulleOrb.js';

/** Injected once. Keyframes can't be expressed inline, and this is the only place we need them. */
const STYLE_ID = 'bulle-orb-keyframes';
function useOrbKeyframes() {
  useEffect(() => {
    if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = `
@keyframes bulle-breathe {
  0%, 100% { transform: scale(${breathe.scaleFrom}); }
  50%      { transform: scale(${breathe.scaleTo}); }
}
@keyframes bulle-pulse {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.05); }
}
/* Reduced motion: the orb becomes a still gradient, never a slower animation. */
@media (prefers-reduced-motion: reduce) {
  .bulle-orb-breathing { animation: none !important; }
}`;
    document.head.appendChild(el);
  }, []);
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
  useOrbKeyframes();

  // On web a `require`d asset resolves to a URI (or a module object carrying one).
  const babyUri =
    typeof innerImage === 'string'
      ? innerImage
      : (innerImage as unknown as { uri?: string } | undefined)?.uri;

  const box = size * HALO_SCALE;
  const stops = orbGradientStops(colors, trimesterProgress);
  const halo = stops[1];
  const maskId = useRef(`orb-mask-${Math.random().toString(36).slice(2)}`).current;
  const pulseRef = useRef<HTMLDivElement | null>(null);

  // One pulse when an essential is ticked — re-triggered by restarting the animation.
  useEffect(() => {
    if (pulseKey === 0) return;
    const el = pulseRef.current;
    if (!el) return;
    el.style.animation = 'none';
    // Force a reflow so the animation restarts rather than being coalesced away.
    void el.offsetHeight;
    el.style.animation = 'bulle-pulse 400ms ease-out';
  }, [pulseKey]);

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={label}
      style={{ width: box, height: box, alignItems: 'center', justifyContent: 'center' }}
    >
      <div ref={pulseRef} style={{ width: box, height: box, display: 'grid', placeItems: 'center' }}>
        <div
          className="bulle-orb-breathing"
          style={{
            width: box,
            height: box,
            display: 'grid',
            placeItems: 'center',
            animation: `bulle-breathe ${breathe.duration}ms ease-in-out infinite`,
          }}
        >
          {/* Contact shadow: sits the orb in space rather than floating it on the page. */}
          <div
            style={{
              position: 'absolute',
              width: size * 0.7,
              height: size * 0.7,
              borderRadius: '50%',
              background: withAlpha(colors.ink, LIGHT.contactOpacity),
              filter: `blur(${size * 0.12}px)`,
              transform: `translateY(${size * 0.45}px)`,
            }}
            aria-hidden
          />
          {/* Halo — the only light-emitting element in the app. */}
          <div
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: '50%',
              background: withAlpha(halo, HALO_OPACITY),
              filter: 'blur(16px)',
            }}
          />
          {/*
            Glass body. A radial gradient offset toward the upper left, matching the native
            orb: a flat fill reads as a plastic ball, and the offset centre supplies the
            implied light source that makes it read as glass.

            KNOWN WEAK IN DARK MODE, and the numbers say why rather than a hunch: this runs
            surface #26231F -> line #353028 against a bg of #1C1A17. All three sit within a
            few percent of each other, so the glass barely separates from the page while the
            liquid (sage #93A889 -> terracotta #D08461) is far brighter. The orb then reads
            as a dark bowl with a bright stripe in it instead of a lit glass sphere.

            A sphere in a dark room catches light rather than absorbing it, so dark mode
            probably wants its own glass treatment instead of inheriting tokens that all
            collapse toward the background. Not attempted here: it needs to be judged on a
            screen, not reasoned about in a file.
          */}
          <div
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: '50%',
              background: `radial-gradient(circle at 32% 32%, ${withAlpha(colors.surface, 0.95)}, ${withAlpha(colors.line, 0.55)})`,
            }}
          />
          {/* The baby, inside the glass and behind the liquid. Inset and sitting low: a
              fetus floats in the lower half of the sac, and centring it makes the orb look
              like a logo rather than a bubble with something in it. */}
          {babyUri && (
            <img
              src={babyUri}
              alt=""
              aria-hidden
              style={{
                position: 'absolute',
                width: size * 0.6,
                height: size * 0.6,
                objectFit: 'contain',
                transform: `translateY(${size * 0.05}px)`,
                opacity: scheme === 'dark' ? 0.75 : 0.9,
                // Clip to the glass, or it spills past the rim on the diagonal.
                clipPath: 'circle(50%)',
              }}
            />
          )}

          {/* Liquid: the conic gradient, revealed only through the meniscus path.

              `from 90deg` is NOT a nudge. Skia's SweepGradient starts at 3 o'clock (the
              positive x-axis, start={0} in BulleOrb.tsx); CSS conic-gradient starts at 12
              o'clock. Identical stops therefore land a quarter turn apart, putting the warm
              trimester accent at 6 o'clock on web and 9 o'clock on native — the same orb,
              lit differently, on the one screen where both are seen. Rotating the web start
              to 3 o'clock is what makes the two renderers agree.

              There is no seam to hide: orbGradientStops returns [sage, accent, sage], so the
              wrap point is sage meeting sage at whatever angle it lands on. */}
          <div
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: '50%',
              background: `conic-gradient(from 90deg, ${stops.join(', ')})`,
              WebkitMaskImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><path d="${liquidPathString(size, fill)}" fill="white"/></svg>`,
              )}")`,
              maskImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><path d="${liquidPathString(size, fill)}" fill="white"/></svg>`,
              )}")`,
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              transition: 'mask-image 350ms ease-out, -webkit-mask-image 350ms ease-out',
            }}
            aria-hidden
            id={maskId}
          />
          {/* Sheen: the broad diagonal wash. */}
          <div
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${withAlpha(colors.surface, 0.85)}, ${withAlpha(colors.surface, 0)} 60%)`,
              opacity: 0.45,
            }}
            aria-hidden
          />

          {/* Rim light: a bright crescent where light wraps the far edge. An inset shadow
              rather than a border — a border outlines the shape, a crescent lights it. */}
          <div
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: '50%',
              boxShadow: `inset ${size * 0.03}px ${size * 0.04}px ${size * 0.03}px ${withAlpha(colors.surface, LIGHT.rimOpacity)}`,
            }}
            aria-hidden
          />

          {/* The KEY SPECULAR. Small, tight, up-left. This single element is what the eye
              reads as "hard transparent surface"; everything else only supports it. */}
          <div
            style={{
              position: 'absolute',
              width: size * LIGHT.specularRadius * 2,
              height: size * LIGHT.specularRadius * 2,
              borderRadius: '50%',
              background: withAlpha(colors.surface, LIGHT.specularOpacity),
              filter: `blur(${size * 0.035}px)`,
              transform: `translate(${size * LIGHT.keyX * 0.5}px, ${size * LIGHT.keyY * 0.5}px)`,
            }}
            aria-hidden
          />

          {/* The physical edge, hairline, over everything. */}
          <div
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: '50%',
              border: `1px solid ${withAlpha(colors.line, 0.9)}`,
              boxSizing: 'border-box',
            }}
            aria-hidden
          />
        </div>
      </div>
    </View>
  );
}
