import { describe, expect, it } from 'vitest';
import {
  daysLeftAfterBirth,
  daysSinceBirth,
  isBorn,
  isPostBirthTask,
  nextPostBirthTask,
  openPostBirthTasks,
  postBirthTasks,
} from './postnatal.js';
import type { Bulle, Task } from './types.js';

const DAY = 24 * 60 * 60 * 1000;
const BIRTH = '2026-07-10T04:00:00.000Z';
const now = new Date('2026-07-16T10:00:00.000Z').getTime(); // 6 days after the birth

const task = (id: string, over: Partial<Task> = {}): Task => ({
  id,
  projectId: 'p1',
  title: id,
  weekStart: 41,
  weekEnd: 42,
  effort: 'S',
  domain: 'administratif',
  essential: true,
  status: 'todo',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  ...over,
});

const born: Pick<Bulle, 'birthDate'> = { birthDate: BIRTH };
const expecting: Pick<Bulle, 'birthDate'> = {};

describe('isPostBirthTask / isBorn', () => {
  it('distinguishes a birth-timed task from a week-window one', () => {
    expect(isPostBirthTask(task('a', { afterBirthDays: 5 }))).toBe(true);
    expect(isPostBirthTask(task('b'))).toBe(false);
  });

  it('knows whether the baby has arrived', () => {
    expect(isBorn(born)).toBe(true);
    expect(isBorn(expecting)).toBe(false);
  });
});

describe('daysSinceBirth', () => {
  it('counts calendar days, not 24h blocks', () => {
    // Born 04:00 on the 10th, now 10:00 on the 16th: 6 days, not 6.25 rounded oddly.
    expect(daysSinceBirth(BIRTH, now)).toBe(6);
  });

  it('is 0 on the day itself', () => {
    // Midday UTC, deliberately: the count is in LOCAL calendar days, which is correct (a
    // deadline at the mairie is a date on a French calendar, not an elapsed-hours budget).
    // A late-evening UTC instant is already the NEXT day in Paris, so it would legitimately
    // read as day 1 and would be testing the runner's timezone rather than the logic.
    expect(daysSinceBirth(BIRTH, new Date('2026-07-10T12:00:00.000Z').getTime())).toBe(0);
  });
});

describe('daysLeftAfterBirth', () => {
  it('counts down to the deadline', () => {
    // Congé paternité: 6 months ≈ 182 days, 6 days elapsed.
    expect(daysLeftAfterBirth(task('a', { afterBirthDays: 182 }), BIRTH, now)).toBe(176);
  });

  it('goes negative once the deadline has passed', () => {
    // Déclaration de naissance: 5 days (Art. 55 Code civil). Day 6 is one day late.
    expect(daysLeftAfterBirth(task('a', { afterBirthDays: 5 }), BIRTH, now)).toBe(-1);
  });

  it('is null for a task that has no post-birth deadline', () => {
    expect(daysLeftAfterBirth(task('a'), BIRTH, now)).toBeNull();
  });
});

describe('postBirthTasks', () => {
  it('is empty before the birth — a deadline with no start date is not yet a deadline', () => {
    // The whole bug this module fixes: these tasks carried a 41+ SA window, so they looked
    // schedulable against an ESTIMATE. Nothing may count down until the baby is actually here.
    expect(postBirthTasks([task('a', { afterBirthDays: 5 })], expecting)).toEqual([]);
  });

  it('orders by deadline, soonest first', () => {
    const tasks = [
      task('conge', { afterBirthDays: 182 }),
      task('mairie', { afterBirthDays: 5 }),
      task('impots', { afterBirthDays: 60 }),
    ];
    expect(postBirthTasks(tasks, born).map((t) => t.id)).toEqual(['mairie', 'impots', 'conge']);
  });

  it('ignores week-window tasks', () => {
    expect(postBirthTasks([task('window')], born)).toEqual([]);
  });

  it('ignores tasks already resolved', () => {
    expect(postBirthTasks([task('a', { afterBirthDays: 5, status: 'done' })], born)).toEqual([]);
  });
});

describe('openPostBirthTasks', () => {
  it('drops the ones whose deadline has passed', () => {
    const tasks = [task('mairie', { afterBirthDays: 5 }), task('impots', { afterBirthDays: 60 })];
    expect(openPostBirthTasks(tasks, born, now).map((t) => t.id)).toEqual(['impots']);
  });

  it('keeps a deadline falling exactly today', () => {
    expect(openPostBirthTasks([task('a', { afterBirthDays: 6 })], born, now)).toHaveLength(1);
  });

  it('still lists an expired task via postBirthTasks, so it is never silently hidden', () => {
    // Losing a non-transferable right is bad; finding out months later, from someone other
    // than the app meant to help, is worse.
    const expired = [task('mairie', { afterBirthDays: 5 })];
    expect(openPostBirthTasks(expired, born, now)).toEqual([]);
    expect(postBirthTasks(expired, born)).toHaveLength(1);
  });
});

describe('nextPostBirthTask', () => {
  it('is the most urgent one still open', () => {
    const tasks = [task('conge', { afterBirthDays: 182 }), task('impots', { afterBirthDays: 60 })];
    expect(nextPostBirthTask(tasks, born, now)?.id).toBe('impots');
  });

  it('is null before the birth', () => {
    expect(nextPostBirthTask([task('a', { afterBirthDays: 5 })], expecting, now)).toBeNull();
  });

  it('is null when everything is done', () => {
    expect(nextPostBirthTask([], born, now)).toBeNull();
  });
});
