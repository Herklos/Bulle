import { describe, it, expect } from 'vitest';
import {
  currentWeekSA,
  currentWeekSG,
  daysUntilDue,
  DPA_WEEKS_SA,
  pregnancyProgress,
  trimester,
  weekDisplay,
} from './pregnancy.js';

const DAY = 24 * 60 * 60 * 1000;
const dueDate = '2026-09-01T00:00:00.000Z';
const due = new Date(dueDate).getTime();

describe('daysUntilDue', () => {
  it('counts forward to the due date', () => {
    expect(daysUntilDue(dueDate, due - 10 * DAY)).toBe(10);
  });

  it('goes negative past term', () => {
    expect(daysUntilDue(dueDate, due + 3 * DAY)).toBe(-3);
  });
});

describe('currentWeekSA', () => {
  it('is 41 SA on the due date (the French DPA convention)', () => {
    expect(currentWeekSA(dueDate, due)).toBe(DPA_WEEKS_SA);
  });

  it('counts back one week per 7 days', () => {
    expect(currentWeekSA(dueDate, due - 7 * DAY)).toBe(40);
    expect(currentWeekSA(dueDate, due - 70 * DAY)).toBe(31);
  });

  it('clamps at 0 far before conception and at 42 past term', () => {
    expect(currentWeekSA(dueDate, due - 400 * DAY)).toBe(0);
    expect(currentWeekSA(dueDate, due + 30 * DAY)).toBe(42);
  });
});

describe('currentWeekSG', () => {
  it('trails SA by exactly 2 weeks', () => {
    expect(currentWeekSG(dueDate, due - 70 * DAY)).toBe(currentWeekSA(dueDate, due - 70 * DAY) - 2);
  });

  it('never goes negative in early pregnancy', () => {
    expect(currentWeekSG(dueDate, due - 287 * DAY)).toBe(0);
  });
});

describe('trimester', () => {
  it('splits at 16 and 28 SA', () => {
    expect(trimester(15)).toBe(1);
    expect(trimester(16)).toBe(2);
    expect(trimester(27)).toBe(2);
    expect(trimester(28)).toBe(3);
  });
});

describe('pregnancyProgress', () => {
  it('runs 0..1 and clamps at both ends', () => {
    expect(pregnancyProgress(dueDate, due)).toBe(1);
    expect(pregnancyProgress(dueDate, due + 30 * DAY)).toBe(1);
    expect(pregnancyProgress(dueDate, due - 400 * DAY)).toBe(0);
    const mid = pregnancyProgress(dueDate, due - 140 * DAY);
    expect(mid).toBeGreaterThan(0);
    expect(mid).toBeLessThan(1);
  });
});

describe('weekDisplay', () => {
  it('reports both scales at once for the tap-to-toggle header', () => {
    const d = weekDisplay(dueDate, due - 70 * DAY);
    expect(d).toEqual({ sa: 31, sg: 29, daysUntil: 70, trimester: 3 });
  });
});
