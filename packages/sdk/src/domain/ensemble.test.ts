import { describe, expect, it } from 'vitest';
import { partnerActivity } from './ensemble.js';
import type { Task } from './types.js';

const DAY = 24 * 60 * 60 * 1000;
const now = new Date('2026-07-16T10:00:00.000Z').getTime();
const ME = 'user-me';
const THEM = 'user-them';

const task = (id: string, over: Partial<Task> = {}): Task => ({
  id,
  projectId: 'p1',
  title: id,
  weekStart: 1,
  weekEnd: 40,
  effort: 'S',
  domain: 'maison',
  essential: true,
  status: 'done',
  completedBy: THEM,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: new Date(now - DAY).toISOString(),
  ...over,
});

describe('partnerActivity', () => {
  it('returns what the other person resolved, most recent first', () => {
    const tasks = [
      task('older', { updatedAt: new Date(now - 3 * DAY).toISOString() }),
      task('newer', { updatedAt: new Date(now - 1 * DAY).toISOString() }),
    ];
    expect(partnerActivity(tasks, { myUserId: ME, now }).map((t) => t.id)).toEqual([
      'newer',
      'older',
    ]);
  });

  it('never shows my own work back to me', () => {
    expect(partnerActivity([task('mine', { completedBy: ME })], { myUserId: ME, now })).toEqual([]);
  });

  it('treats an unattributed task as mine rather than as a partner\'s', () => {
    // Tasks resolved before sync was ever on carry no completedBy. Crediting a partner who
    // did nothing is worse than showing nothing.
    expect(
      partnerActivity([task('legacy', { completedBy: undefined })], { myUserId: ME, now }),
    ).toEqual([]);
  });

  it('is empty when there is no session, because then there is no partner', () => {
    expect(partnerActivity([task('t')], { myUserId: undefined, now })).toEqual([]);
  });

  it('ignores tasks still to do', () => {
    expect(partnerActivity([task('t', { status: 'todo' })], { myUserId: ME, now })).toEqual([]);
  });

  it('counts a dismissed task — deciding "not for us" is doing the work (§6)', () => {
    expect(partnerActivity([task('t', { status: 'dismissed' })], { myUserId: ME, now })).toHaveLength(1);
  });

  it('caps at 2 lines (§5.1)', () => {
    const tasks = [1, 2, 3, 4].map((n) =>
      task(`t${n}`, { updatedAt: new Date(now - n * 60 * 1000).toISOString() }),
    );
    expect(partnerActivity(tasks, { myUserId: ME, now })).toHaveLength(2);
  });

  it('drops anything older than the window', () => {
    expect(
      partnerActivity([task('old', { updatedAt: new Date(now - 30 * DAY).toISOString() })], {
        myUserId: ME,
        now,
      }),
    ).toEqual([]);
  });

  it('drops a malformed timestamp instead of sorting it to the top', () => {
    expect(partnerActivity([task('bad', { updatedAt: 'not-a-date' })], { myUserId: ME, now })).toEqual(
      [],
    );
  });
});
