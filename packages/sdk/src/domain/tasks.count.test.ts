import { describe, expect, it } from 'vitest';
import {
  completeTaskUpdates,
  isCounted,
  setTaskCount,
  setTaskTarget,
  stepTaskCount,
  taskCount,
} from './tasks.js';
import type { Task } from './types.js';

function task(over: Partial<Task> = {}): Task {
  return {
    id: 't1',
    projectId: 'p1',
    title: 'Bodies naissance',
    weekStart: 28,
    weekEnd: 34,
    effort: 'S',
    domain: 'achats',
    essential: false,
    status: 'todo',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    ...over,
  };
}

describe('isCounted', () => {
  it('is false without a target', () => {
    expect(isCounted(task())).toBe(false);
  });

  it('is true with a positive target', () => {
    expect(isCounted(task({ target: 6 }))).toBe(true);
  });

  it('is false for a target of 0 — it would be born complete', () => {
    expect(isCounted(task({ target: 0 }))).toBe(false);
  });
});

describe('taskCount', () => {
  it('defaults to 0 when the count is absent', () => {
    expect(taskCount(task({ target: 6 }))).toBe(0);
  });

  it('clamps a peer-sent count into 0..target', () => {
    expect(taskCount(task({ target: 6, count: 99 }))).toBe(6);
    expect(taskCount(task({ target: 6, count: -3 }))).toBe(0);
  });

  it('is 0 for an uncounted task whatever it carries', () => {
    expect(taskCount(task({ count: 4 }))).toBe(0);
  });
});

describe('stepTaskCount', () => {
  it('increments without completing before the target', () => {
    expect(stepTaskCount(task({ target: 6, count: 2 }), 1)).toEqual({ count: 3, status: 'todo' });
  });

  it('completes on reaching the target', () => {
    expect(stepTaskCount(task({ target: 6, count: 5 }), 1)).toEqual({ count: 6, status: 'done' });
  });

  it('cannot overshoot the target', () => {
    expect(stepTaskCount(task({ target: 6, count: 6 }), 1)).toEqual({ count: 6, status: 'done' });
  });

  it('reopens when the count drops back below the target', () => {
    expect(stepTaskCount(task({ target: 6, count: 6, status: 'done' }), -1)).toEqual({
      count: 5,
      status: 'todo',
    });
  });

  it('cannot go below zero', () => {
    expect(stepTaskCount(task({ target: 6, count: 0 }), -1)).toEqual({ count: 0, status: 'todo' });
  });

  // "Pas pour nous" is a decision about the item, not a tally. A stray tap must not undo it.
  it('leaves a dismissed task dismissed at either end of the range', () => {
    expect(stepTaskCount(task({ target: 6, count: 5, status: 'dismissed' }), 1).status).toBe(
      'dismissed',
    );
    expect(stepTaskCount(task({ target: 6, count: 3, status: 'dismissed' }), -1).status).toBe(
      'dismissed',
    );
  });
});

describe('completeTaskUpdates', () => {
  it('fills a counted task to its target so count and status cannot disagree', () => {
    expect(completeTaskUpdates(task({ target: 6, count: 1 }))).toEqual({ status: 'done', count: 6 });
  });

  it('leaves an ordinary task alone', () => {
    expect(completeTaskUpdates(task())).toEqual({ status: 'done' });
  });
});

describe('setTaskCount', () => {
  it('jumps straight to a value and completes when it reaches the target', () => {
    expect(setTaskCount(task({ target: 6, count: 0 }), 6)).toEqual({ count: 6, status: 'done' });
  });

  it('clamps above the target rather than storing an impossible count', () => {
    expect(setTaskCount(task({ target: 6, count: 0 }), 99)).toEqual({ count: 6, status: 'done' });
  });

  it('reopens a done task when set back below the target', () => {
    expect(setTaskCount(task({ target: 6, count: 6, status: 'done' }), 2)).toEqual({
      count: 2,
      status: 'todo',
    });
  });

  it('still refuses to overturn a dismissal', () => {
    expect(setTaskCount(task({ target: 6, status: 'dismissed' }), 6).status).toBe('dismissed');
  });
});

describe('setTaskTarget', () => {
  it('raising the target above the count reopens the task', () => {
    expect(setTaskTarget(task({ target: 6, count: 6, status: 'done' }), 12)).toEqual({
      target: 12,
      count: 6,
      status: 'todo',
    });
  });

  it('lowering the target to at or below the count completes it', () => {
    expect(setTaskTarget(task({ target: 12, count: 6 }), 6)).toEqual({
      target: 6,
      count: 6,
      status: 'done',
    });
  });

  it('clamps the count down when the target shrinks past it', () => {
    expect(setTaskTarget(task({ target: 12, count: 10 }), 4)).toEqual({
      target: 4,
      count: 4,
      status: 'done',
    });
  });

  // A target of 0 makes isCounted false, which would strand the task with no stepper at all.
  it('never lets the target reach zero', () => {
    expect(setTaskTarget(task({ target: 6, count: 3 }), 0).target).toBe(1);
  });
});
