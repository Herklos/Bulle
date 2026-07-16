import { describe, it, expect } from 'vitest';
import { deepMerge, stableStringify } from './deep-merge.js';

describe('deepMerge', () => {
  it('recurses into plain objects, overlay winning on leaves', () => {
    expect(deepMerge({ a: 1, b: { c: 1, d: 2 } }, { b: { c: 9 } })).toEqual({
      a: 1,
      b: { c: 9, d: 2 },
    });
  });

  it('treats arrays as atomic leaves — overlay wins wholesale, no element merge', () => {
    // This is load-bearing: concurrent edits to the same array lose one side entirely.
    // It is why a task's checklist is small and why collections are id-keyed maps, not arrays.
    expect(deepMerge({ xs: [1, 2, 3] }, { xs: [9] })).toEqual({ xs: [9] });
  });

  it('overlay wins when either side is not a plain object', () => {
    expect(deepMerge({ a: 1 }, 'scalar')).toBe('scalar');
    expect(deepMerge('scalar', { a: 1 })).toEqual({ a: 1 });
    expect(deepMerge({ a: 1 }, null)).toBeNull();
  });

  it('keeps a base field the overlay never mentions', () => {
    expect(deepMerge({ keep: 'me', over: 'old' }, { over: 'new' })).toEqual({
      keep: 'me',
      over: 'new',
    });
  });

  it('does not mutate its inputs', () => {
    const base = { a: { b: 1 } };
    const overlay = { a: { c: 2 } };
    deepMerge(base, overlay);
    expect(base).toEqual({ a: { b: 1 } });
    expect(overlay).toEqual({ a: { c: 2 } });
  });
});

describe('stableStringify', () => {
  it('is key-order independent', () => {
    expect(stableStringify({ b: 1, a: 2 })).toBe(stableStringify({ a: 2, b: 1 }));
  });

  it('sorts nested keys too', () => {
    expect(stableStringify({ x: { z: 1, y: 2 } })).toBe('{"x":{"y":2,"z":1}}');
  });

  it('preserves array order (arrays are ordered data, not bags)', () => {
    expect(stableStringify({ xs: [3, 1, 2] })).toBe('{"xs":[3,1,2]}');
  });

  it('distinguishes genuinely different content', () => {
    expect(stableStringify({ a: 1 })).not.toBe(stableStringify({ a: 2 }));
  });
});
