/**
 * Shared maths for the orb (spec §15.2), used by BOTH the native (Skia) and web (CSS
 * conic-gradient) implementations.
 *
 * The orb is the product's signature and exists twice — Skia can't reach the web without
 * shipping a ~6MB CanvasKit wasm, which is a bad trade on a static export that also serves
 * the marketing site, and CSS `conic-gradient` reproduces a sweep gradient exactly. Every
 * number and colour they share lives here so the two can never drift apart.
 */

import type { Palette } from '../theme/tokens.js';

// ─── Colour ──────────────────────────────────────────────────────────────────

function clamp255(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)));
}

function parseHex(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

function toHex(rgb: [number, number, number]): string {
  return '#' + rgb.map((c) => clamp255(c).toString(16).padStart(2, '0')).join('');
}

/** Linear RGB mix. `t` is clamped to 0..1. */
export function mix(a: string, b: string, t: number): string {
  const k = Math.max(0, Math.min(1, t));
  const [ar, ag, ab] = parseHex(a);
  const [br, bg, bb] = parseHex(b);
  return toHex([ar + (br - ar) * k, ag + (bg - ag) * k, ab + (bb - ab) * k]);
}

/** Hex + alpha → `rgba()`, for halo stops. */
export function withAlpha(hex: string, alpha: number): string {
  const [r, g, b] = parseHex(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * The orb's three sweep stops.
 *
 * The gradient's TEMPERATURE encodes how far along the pregnancy is: sage→dustyBlue when
 * cool (T1) drifting to sage→terracotta when warm (T3). This is the one place terracotta
 * is allowed to appear outside a celebration or the Focus CTA, and it earns it — it is not
 * decoration, it is the passage of time rendered as heat.
 *
 * Returned closed (first stop repeated last) so the sweep wraps seamlessly instead of
 * showing a hard seam at 0°/360°.
 */
export function orbGradientStops(colors: Palette, trimesterProgress: number): string[] {
  const t = Math.max(0, Math.min(1, trimesterProgress));
  const accent = mix(colors.dustyBlue, colors.terracotta, t);
  return [colors.sage, accent, colors.sage];
}

// ─── Geometry ────────────────────────────────────────────────────────────────

/** Meniscus depth in px — the liquid clings to the glass. Small enough to read as physics. */
export const MENISCUS = 4;

/**
 * The liquid surface's y for a given fill, in a box of `size`.
 * fill 0 → the very bottom, fill 1 → the very top.
 *
 * Marked as a worklet: the native orb rebuilds the path inside a `useDerivedValue`, which
 * runs on the UI thread. Without the directive, Reanimated treats it as a remote function
 * and throws "Tried to synchronously call a Remote Function" the moment the orb mounts.
 * The directive is harmless on the JS side, so the web implementation calls it normally.
 */
export function surfaceY(size: number, fill: number): number {
  'worklet';
  const f = Math.max(0, Math.min(1, fill));
  return size - f * size;
}

/**
 * SVG/Skia path command string for the liquid: a meniscus curve across the top, then down
 * and around the bottom of the box. Clipped to the circle by the caller, so the box maths
 * stays trivial.
 *
 * A worklet, for the same reason as `surfaceY` above — and note that both must be marked:
 * a worklet calling a non-worklet fails exactly the same way.
 */
export function liquidPathString(size: number, fill: number): string {
  'worklet';
  const y = surfaceY(size, fill);
  // A SYMMETRIC meniscus: the surface starts and ends high (the liquid clings to the glass
  // at both walls) and both control points pull DOWN, so the centre dips evenly.
  //
  // Getting this wrong is easy and looks it: one control point above and one below produces
  // an S-curve, i.e. a wave sloshing to one side, which reads as a bug rather than physics.
  return [
    `M 0 ${y - MENISCUS}`,
    `C ${size * 0.3} ${y + MENISCUS * 1.4}, ${size * 0.7} ${y + MENISCUS * 1.4}, ${size} ${y - MENISCUS}`,
    `L ${size} ${size}`,
    `L 0 ${size}`,
    'Z',
  ].join(' ');
}

/** Halo opacity (§15.2). The orb is the only element in the app that emits light. */
export const HALO_OPACITY = 0.25;
/**
 * The LAYOUT footprint, as a multiple of the orb size. This is the space the orb reserves
 * on the screen — not the size of the surface it draws on (see CANVAS_SCALE).
 */
export const HALO_SCALE = 1.3;

/**
 * The DRAWING surface, as a multiple of the orb size.
 *
 * Much larger than the layout footprint, and it has to be: Skia clips at the canvas edge,
 * and the contact shadow is drawn at `cy + r*0.9` with radius `r*0.7` — reaching a full
 * orb-diameter below centre before its 22px blur spreads any further. At the old 1.3 the
 * canvas cut straight through it and left a hard horizontal seam under the orb, which read
 * as a rectangle of slightly different background rather than as a shadow.
 *
 * The surplus is absorbed by negative margins at the call site, so a bigger canvas costs
 * layout nothing and the composition does not move.
 */
export const CANVAS_SCALE = 2.4;

/**
 * The lighting model, in one place so both renderers agree.
 *
 * A sphere reads as GLASS rather than as a filled circle because of four things, and all
 * four are cheap:
 *  1. a key light — one small, sharp SPECULAR highlight, offset up-left;
 *  2. a RIM light on the opposite edge, where light wraps around the far side;
 *  3. surface TENSION catching light along the meniscus;
 *  4. a CONTACT shadow, so it sits in space instead of floating on the page.
 *
 * The body gradient alone (which is all this had) gives a matte ball. The specular is what
 * your eye actually reads as "hard, transparent surface".
 */
export const LIGHT = {
  /** Key light direction, as a fraction of the radius from centre. Up and to the left. */
  keyX: -0.38,
  keyY: -0.42,
  /** The specular: small and tight. A big soft one reads as plastic. */
  specularRadius: 0.17,
  specularOpacity: 0.9,
  /** A second, much dimmer bounce, low and right. Sells roundness without a second source. */
  bounceX: 0.3,
  bounceY: 0.42,
  bounceRadius: 0.3,
  bounceOpacity: 0.16,
  /** Rim light: a bright crescent on the far edge. */
  rimWidth: 2.5,
  rimOpacity: 0.55,
  /** Contact shadow beneath the orb. */
  contactOpacity: 0.1,
} as const;

/**
 * The meniscus highlight: a thin bright line riding the liquid surface.
 *
 * Surface tension catches light, and this is the detail that stops the liquid looking like
 * a flat fill pasted behind glass — it gives the surface a top.
 */
export function meniscusLinePath(size: number, fill: number): string {
  'worklet';
  const y = surfaceY(size, fill);
  return [
    `M 0 ${y - MENISCUS}`,
    `C ${size * 0.3} ${y + MENISCUS * 1.4}, ${size * 0.7} ${y + MENISCUS * 1.4}, ${size} ${y - MENISCUS}`,
  ].join(' ');
}
