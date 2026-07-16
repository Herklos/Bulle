'use client';
/**
 * Glyphs (spec §15.4).
 *
 * Drawn in-house on a 24px grid, stroke 1.75, round caps, never filled, one token colour.
 * NOT lucide, not any icon pack: with no illustration layer anywhere in the product, the
 * consistency of this stroke is a large part of what makes Bulle look like itself. A
 * borrowed set would import someone else's hand.
 *
 * Adding a glyph is a design review, not an import. Keep this under ~30.
 */
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useBulleTheme } from '../theme/context.js';
import type { ColorToken } from '../theme/tokens.js';

/** Path data on a 24×24 grid. */
export const GLYPHS = {
  // ─── Navigation ────────────────────────────────────────────────────────────
  today: 'M4 11 12 4l8 7M6 10v9h12v-9',
  chemin: 'M7 3c0 4 10 4 10 9s-10 5-10 9',
  plan: 'M5 6h14M5 12h14M5 18h9M3.5 6h0M3.5 12h0M3.5 18h0',
  souvenirs: 'M12 4l1.8 4.6L18 10l-4.2 1.4L12 16l-1.8-4.6L6 10l4.2-1.4Z',
  plus: 'M5 12h14M12 5v14',
  close: 'M6 6l12 12M18 6L6 18',
  more: 'M6 12h0M12 12h0M18 12h0',

  // ─── Projects ──────────────────────────────────────────────────────────────
  bag: 'M4 9h16v10H4zM9 9V6a3 3 0 0 1 6 0v3',
  nest: 'M3 13a9 9 0 0 1 18 0M6 13c1.5 3 10.5 3 12 0',
  stamp: 'M9 9V6a3 3 0 0 1 6 0v3M5 13h14v5H5zM5 13c0-2 3-2 4-4M19 13c0-2-3-2-4-4',

  // ─── Actions & state ───────────────────────────────────────────────────────
  check: 'M5 12.5 10 17.5 19 7',
  chevronRight: 'M9.5 5.5 16 12l-6.5 6.5',
  chevronLeft: 'M14.5 5.5 8 12l6.5 6.5',
  calendar: 'M5 6h14v14H5zM5 10h14M9 4v4M15 4v4',
  members: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20c0-3.3 2.7-5 6-5s6 1.7 6 5M17 15c2.2.4 4 1.9 4 5',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4',
  pause: 'M10 6v12M14 6v12',
  link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 1 0-5.7-5.7L11.5 6.5M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 1 0 5.7 5.7l1.5-1.5',
  leaf: 'M5 19c0-8 5-13 14-14 1 9-4 15-11 15a6 6 0 0 1-3-1ZM5 19c2-4 5-6 9-8',
} as const;

export type GlyphName = keyof typeof GLYPHS;

export interface GlyphProps {
  name: GlyphName;
  /** Rendered size. The 24-grid scales via viewBox, so the stroke thins proportionally. */
  size?: number;
  /** Token name — never a raw hex (§15.1). */
  color?: ColorToken;
  /** Overrides `color`; for cases where the parent already resolved a token. */
  tint?: string;
}

export function Glyph({ name, size = 24, color = 'ink', tint }: GlyphProps) {
  const { colors } = useBulleTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d={GLYPHS[name]}
        stroke={tint ?? colors[color]}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
