import { describe, expect, it } from 'vitest';
import { customTaskWindow, dominantDomain } from './tasks.js';
import { DPA_WEEKS_SA } from './pregnancy.js';
import type { ReadinessDomain, Task } from './types.js';

const task = (domain: ReadinessDomain): Task => ({
  id: `t-${domain}-${Math.round(Math.random() * 1e9)}`,
  projectId: 'p1',
  title: 't',
  weekStart: 1,
  weekEnd: 40,
  effort: 'S',
  domain,
  essential: true,
  status: 'todo',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
});

describe('dominantDomain', () => {
  it('picks the most common domain among the project\'s tasks', () => {
    expect(dominantDomain([task('achats'), task('maison'), task('achats')])).toBe('achats');
  });

  it('falls back when the project has no tasks yet', () => {
    expect(dominantDomain([])).toBe('maison');
    expect(dominantDomain([], 'administratif')).toBe('administratif');
  });

  it('returns a real domain for a single task', () => {
    expect(dominantDomain([task('postpartum')])).toBe('postpartum');
  });
});

describe('customTaskWindow', () => {
  it('opens at the current week, so a task you just typed is never filed as upcoming', () => {
    expect(customTaskWindow(12, 'thisWeek')).toEqual({ weekStart: 12, weekEnd: 12 });
  });

  it('"soon" reaches four weeks out', () => {
    expect(customTaskWindow(12, 'soon')).toEqual({ weekStart: 12, weekEnd: 16 });
  });

  it('"beforeBirth" runs to the DPA', () => {
    expect(customTaskWindow(12, 'beforeBirth')).toEqual({ weekStart: 12, weekEnd: DPA_WEEKS_SA });
  });

  it('rounds a fractional week rather than producing a fractional window', () => {
    expect(customTaskWindow(12.6, 'thisWeek').weekStart).toBe(13);
  });

  it('never lets a window close before it opens, late in the pregnancy', () => {
    // At 40 SA, "soon" would reach 44. An unclamped weekEnd < weekStart matches no week at
    // all, so the task silently vanishes from every window-filtered list.
    for (const when of ['thisWeek', 'soon', 'beforeBirth'] as const) {
      const w = customTaskWindow(40, when);
      expect(w.weekEnd).toBeGreaterThanOrEqual(w.weekStart);
      expect(w.weekEnd).toBeLessThanOrEqual(DPA_WEEKS_SA);
    }
  });

  it('clamps a past-term week to the DPA rather than opening beyond it', () => {
    expect(customTaskWindow(44, 'soon')).toEqual({
      weekStart: DPA_WEEKS_SA,
      weekEnd: DPA_WEEKS_SA,
    });
  });

  it('never opens before week 1', () => {
    expect(customTaskWindow(0, 'thisWeek').weekStart).toBe(1);
  });
});
