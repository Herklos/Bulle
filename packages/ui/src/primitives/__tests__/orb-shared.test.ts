/**
 * The orb's maths.
 *
 * Worth testing despite being ~40 lines, because it is the one part of the identity that is
 * PURE — and because both renderers depend on it agreeing with itself. A regression here does
 * not throw or fail to compile; it just quietly draws a slightly wrong orb on one platform,
 * which is exactly the class of bug nobody files.
 *
 * The `'worklet'` directives are inert off the UI thread, so these run as plain functions.
 */
import { describe, expect, it } from 'vitest';
import {
  MENISCUS,
  MIN_VISIBLE_FILL,
  meniscusFor,
  liquidPathString,
  mix,
  orbGradientStops,
  surfaceY,
  withAlpha,
} from '../orb-shared.js';
// The REAL palette, not a stand-in: these assertions are about the orb agreeing with the
// tokens, so inventing colours here would let the two drift while the test still passed.
import { color } from '../../theme/tokens.js';

const SIZE = 200;
const PALETTE = color.light;

describe('surfaceY', () => {
  it('puts fill 1 at the very top', () => {
    expect(surfaceY(SIZE, 1)).toBe(0);
  });

  it('never draws an empty glass, even at a legitimate readiness of 0', () => {
    // The reason the floor exists: at week 5 nothing is due, so readiness is honestly 0, and
    // a literal empty orb reads as broken rather than as "0% ready".
    expect(surfaceY(SIZE, 0)).toBe(SIZE - MIN_VISIBLE_FILL * SIZE);
    expect(surfaceY(SIZE, 0)).toBeLessThan(SIZE);
  });

  it('floors rather than rescales, so real values are never shifted', () => {
    // The distinction that matters. A rescale (0.06 + fill * 0.94) would move EVERY value,
    // drawing a true 50% at 53% forever. A floor is wrong only inside the band it covers.
    expect(surfaceY(SIZE, 0.5)).toBe(SIZE * 0.5);
    expect(surfaceY(SIZE, 1)).toBe(0);
  });

  it('clamps out-of-range input instead of drawing outside the glass', () => {
    expect(surfaceY(SIZE, 2)).toBe(0);
    expect(surfaceY(SIZE, -1)).toBe(surfaceY(SIZE, 0));
  });

  it('is monotonic: more readiness is never less liquid', () => {
    const ys = [0, 0.1, 0.25, 0.5, 0.75, 1].map((f) => surfaceY(SIZE, f));
    const descending = [...ys].sort((a, b) => b - a);
    expect(ys).toEqual(descending);
  });
});

describe('orbGradientStops', () => {
  it('wraps seamlessly: the first and last stop are the same colour', () => {
    // Both renderers sweep a full 360°, so a first stop differing from the last would put a
    // hard seam through the liquid at the wrap angle. This is why the array is [a, b, a].
    for (const t of [0, 0.5, 1]) {
      const stops = orbGradientStops(PALETTE, t);
      expect(stops[0]).toBe(stops[stops.length - 1]);
    }
  });

  it('runs cool at the start of the pregnancy and warm at the end', () => {
    // Lowercased: mix() normalizes its output, so compare case-insensitively rather than
    // pinning the palette's own casing.
    expect(orbGradientStops(PALETTE, 0)[1].toLowerCase()).toBe(
      PALETTE.dustyBlue.toLowerCase(),
    );
    expect(orbGradientStops(PALETTE, 1)[1].toLowerCase()).toBe(
      PALETTE.terracotta.toLowerCase(),
    );
  });

  it('clamps trimester progress, since a corrected DPA can push it past the ends', () => {
    expect(orbGradientStops(PALETTE, 2)[1]).toBe(orbGradientStops(PALETTE, 1)[1]);
    expect(orbGradientStops(PALETTE, -1)[1]).toBe(orbGradientStops(PALETTE, 0)[1]);
  });
});

describe('mix', () => {
  it('returns the endpoints exactly', () => {
    expect(mix('#000000', '#ffffff', 0)).toBe('#000000');
    expect(mix('#000000', '#ffffff', 1)).toBe('#ffffff');
  });

  it('interpolates to a valid hex colour', () => {
    expect(mix('#000000', '#ffffff', 0.5)).toMatch(/^#[0-9a-f]{6}$/i);
  });
});

describe('withAlpha', () => {
  it('produces a css-parseable colour', () => {
    expect(withAlpha(PALETTE.sage, 0.5)).toMatch(/^(rgba|#)/i);
  });
});

describe('liquidPathString', () => {
  it('is a symmetric meniscus, not a wave sloshing to one side', () => {
    // Both control points must pull the SAME way. One above and one below produces an
    // S-curve, which reads as a bug rather than as physics.
    const path = liquidPathString(SIZE, 0.5);
    const curve = path.match(/C\s*([-\d.]+)[,\s]+([-\d.]+)[,\s]+([-\d.]+)[,\s]+([-\d.]+)/i);
    expect(curve).not.toBeNull();
    const y = surfaceY(SIZE, 0.5);
    const [c1y, c2y] = [Number(curve![2]), Number(curve![4])];
    expect(Math.sign(c1y - y)).toBe(Math.sign(c2y - y));
    expect(Math.abs(c1y - y)).toBeCloseTo(Math.abs(c2y - y), 5);
  });

  it('keeps the meniscus depth bounded, so the surface stays a surface', () => {
    // Only the CURVE's y values, not every number in the string: a naive sweep picks up the
    // x coordinates too and then compares an x against a y, which is how this assertion was
    // wrong the first time.
    const y = surfaceY(SIZE, 0.5);
    const curve = liquidPathString(SIZE, 0.5).match(
      /C\s*([-\d.]+)[,\s]+([-\d.]+)[,\s]+([-\d.]+)[,\s]+([-\d.]+)/i,
    );
    expect(curve).not.toBeNull();
    for (const cy of [Number(curve![2]), Number(curve![4])]) {
      expect(Math.abs(cy - y)).toBeLessThanOrEqual(MENISCUS * 2);
    }
  });

  it('is SCALE-INVARIANT: the same shape at every size', () => {
    // The bug this pins. A flat 4px meniscus made the curve 2.2% of a 180px orb and 1.5% of
    // the 260px landing hero, so the surface flattened as the orb grew — the biggest
    // instance in the product had the weakest version of the detail that says "liquid".
    // Normalise both paths by their size and the curve depths must agree.
    const depthRatio = (size: number) => {
      const y = surfaceY(size, 0.5);
      const c = liquidPathString(size, 0.5).match(
        /C\s*([-\d.]+)[,\s]+([-\d.]+)[,\s]+([-\d.]+)[,\s]+([-\d.]+)/i,
      );
      return (Number(c![2]) - y) / size;
    };
    expect(depthRatio(260)).toBeCloseTo(depthRatio(180), 6);
    expect(depthRatio(64)).toBeCloseTo(depthRatio(180), 6);
  });

  it('leaves the 180px default exactly where it was', () => {
    // The ratio is 4/180 precisely so the orb everyone has already seen does not move.
    expect(meniscusFor(180)).toBeCloseTo(4, 6);
  });

  it('never emits NaN, whatever it is handed', () => {
    for (const f of [0, 0.5, 1, -1, 2, Number.NaN]) {
      expect(liquidPathString(SIZE, f)).not.toMatch(/NaN/);
    }
  });
});
