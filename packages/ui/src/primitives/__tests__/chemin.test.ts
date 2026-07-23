/**
 * The fil's geometry and week range — pure, so regressions show up as numbers, not as a
 * slightly wrong serpentine nobody files a bug for.
 */
import { describe, expect, it } from 'vitest';
import {
  buildCheminWeeks,
  cheminPath,
  cheminPoints,
  clampCheminWeek,
  CHEMIN_FIRST_WEEK,
  CHEMIN_LAST_WEEK,
  type CheminWeek,
  type Point,
} from '../chemin-shared.js';

describe('buildCheminWeeks', () => {
  it('starts at week 1 and ends at the DPA week', () => {
    const weeks: CheminWeek[] = buildCheminWeeks();
    expect(weeks[0]!.week).toBe(CHEMIN_FIRST_WEEK);
    expect(weeks[weeks.length - 1]!.week).toBe(CHEMIN_LAST_WEEK);
    expect(weeks).toHaveLength(CHEMIN_LAST_WEEK - CHEMIN_FIRST_WEEK + 1);
  });

  it('flags the milestone weeks', () => {
    const byWeek = new Map<number, CheminWeek>(buildCheminWeeks().map((w) => [w.week, w]));
    expect(byWeek.get(12)?.milestone).toBe(true);
    expect(byWeek.get(1)?.milestone).toBe(false);
  });
});

describe('clampCheminWeek', () => {
  it('floors below the first week', () => {
    expect(clampCheminWeek(0)).toBe(1);
  });

  it('caps past the last week', () => {
    expect(clampCheminWeek(99)).toBe(CHEMIN_LAST_WEEK);
  });

  it('passes a week already in range', () => {
    expect(clampCheminWeek(20)).toBe(20);
  });
});

describe('cheminPoints / cheminPath', () => {
  it('emits one point per week', () => {
    const points: Point[] = cheminPoints(41, 96, 24, 72);
    expect(points).toHaveLength(41);
    expect(points[0]!.y).toBeLessThan(points[40]!.y);
  });

  it('builds a non-empty path through those points', () => {
    const path: string = cheminPath(cheminPoints(41, 96, 24, 72));
    expect(path.startsWith('M ')).toBe(true);
    expect(path.length).toBeGreaterThan(10);
  });

  it('is empty for no points', () => {
    expect(cheminPath([])).toBe('');
  });
});
