import { describe, expect, it } from 'vitest';
import { pickAdviceIndex } from '@/lib/pick-advice-index';

describe('pickAdviceIndex', () => {
  it('returns 0 when the pool has zero or one item', () => {
    expect(pickAdviceIndex(0, null)).toBe(0);
    expect(pickAdviceIndex(1, 0)).toBe(0);
  });

  it('never returns the avoided index when more than one item exists', () => {
    for (let trial = 0; trial < 200; trial++) {
      const avoid = trial % 5;
      expect(pickAdviceIndex(5, avoid)).not.toBe(avoid);
    }
  });

  it('stays within bounds', () => {
    for (let trial = 0; trial < 200; trial++) {
      const index = pickAdviceIndex(7, null);
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(7);
    }
  });
});
