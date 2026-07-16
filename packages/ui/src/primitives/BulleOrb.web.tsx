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

export function BulleOrb({ fill, trimesterProgress, size = 180, label, pulseKey = 0 }: BulleOrbProps) {
  const { colors } = useBulleTheme();
  useOrbKeyframes();

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
          {/* Liquid: the conic gradient, revealed only through the meniscus path. */}
          <div
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: '50%',
              background: `conic-gradient(${stops.join(', ')})`,
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
          {/* Rim, over the liquid, so the liquid reads as inside the vessel. */}
          <div
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: '50%',
              border: `1px solid ${colors.line}`,
              boxSizing: 'border-box',
            }}
            aria-hidden
          />
        </div>
      </div>
    </View>
  );
}
