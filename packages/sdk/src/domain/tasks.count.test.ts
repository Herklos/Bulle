import { describe, expect, it } from 'vitest';
import {
  applyTaskChoice,
  checklistProgress,
  completeTaskUpdates,
  hasChecklist,
  isChoice,
  toggleChecklistItem,
  isCounted,
  rederiveTaskStatus,
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

describe('checklist tasks', () => {
  const withList = (over: Partial<Task> = {}) =>
    task({
      checklist: [
        { id: 'a', label: 'Carte Vitale', done: false },
        { id: 'b', label: 'Mutuelle', done: false },
      ],
      ...over,
    });

  it('is not a checklist task without items', () => {
    expect(hasChecklist(task())).toBe(false);
    expect(hasChecklist(task({ checklist: [] }))).toBe(false);
  });

  it('reports progress', () => {
    expect(checklistProgress(withList())).toEqual({ done: 0, total: 2 });
  });

  it('stays open while any item is unticked', () => {
    expect(toggleChecklistItem(withList(), 'a').status).toBe('todo');
  });

  it('completes when the last item is ticked', () => {
    const partly = withList({ checklist: [
      { id: 'a', label: 'Carte Vitale', done: true },
      { id: 'b', label: 'Mutuelle', done: false },
    ] });
    expect(toggleChecklistItem(partly, 'b').status).toBe('done');
  });

  it('reopens when an item is unticked again', () => {
    const full = withList({
      status: 'done',
      checklist: [
        { id: 'a', label: 'Carte Vitale', done: true },
        { id: 'b', label: 'Mutuelle', done: true },
      ],
    });
    expect(toggleChecklistItem(full, 'a').status).toBe('todo');
  });

  it('refuses to overturn a dismissal, like the stepper', () => {
    const partly = withList({
      status: 'dismissed',
      checklist: [
        { id: 'a', label: 'Carte Vitale', done: true },
        { id: 'b', label: 'Mutuelle', done: false },
      ],
    });
    expect(toggleChecklistItem(partly, 'b').status).toBe('dismissed');
  });

  it('fills every item when completed from a plain "Fait" affordance', () => {
    const updates = completeTaskUpdates(withList());
    expect(updates.status).toBe('done');
    expect(updates.checklist!.every((i) => i.done)).toBe(true);
  });
});

describe('applyTaskChoice', () => {
  const choice = task({
    id: 'choice',
    title: 'Mode de garde',
    options: [
      { id: 'creche', label: 'La crèche' },
      { id: 'assmat', label: 'Une assistante maternelle' },
    ],
  });
  const branch = (id: string, optionIds: string[], over: Partial<Task> = {}) =>
    task({ id, branchOfTaskId: 'choice', branchOptionIds: optionIds, ...over });

  const NOW = '2026-07-20T00:00:00.000Z';

  it('records the answer and resolves the choice task', () => {
    const [answered] = applyTaskChoice([choice], 'choice', 'creche', NOW);
    expect(answered!.chosenOptionId).toBe('creche');
    expect(answered!.status).toBe('done');
  });

  it('dismisses the branches not taken and leaves the chosen one alone', () => {
    const out = applyTaskChoice(
      [choice, branch('a', ['creche']), branch('b', ['assmat'])],
      'choice',
      'creche',
      NOW,
    );
    expect(out.find((t) => t.id === 'a')!.status).toBe('todo');
    expect(out.find((t) => t.id === 'b')!.status).toBe('dismissed');
  });

  it('restores a branch when the choice changes — deciding again must not be a trap', () => {
    const first = applyTaskChoice(
      [choice, branch('a', ['creche']), branch('b', ['assmat'])],
      'choice',
      'creche',
      NOW,
    );
    const second = applyTaskChoice(first, 'choice', 'assmat', NOW);
    expect(second.find((t) => t.id === 'b')!.status).toBe('todo');
    expect(second.find((t) => t.id === 'a')!.status).toBe('dismissed');
  });

  it('leaves a branch task the user already finished alone', () => {
    const out = applyTaskChoice(
      [choice, branch('a', ['assmat'], { status: 'done' })],
      'choice',
      'creche',
      NOW,
    );
    expect(out.find((t) => t.id === 'a')!.status).toBe('done');
  });

  it('handles a task belonging to several branches (CMG applies to two routes)', () => {
    const out = applyTaskChoice(
      [choice, branch('cmg', ['assmat', 'domicile'])],
      'choice',
      'assmat',
      NOW,
    );
    expect(out.find((t) => t.id === 'cmg')!.status).toBe('todo');
  });

  // Otherwise picking an answer nothing branches on would empty the user's whole list.
  it('prunes nothing when no task claims the chosen option', () => {
    const out = applyTaskChoice(
      [choice, branch('a', ['creche']), branch('b', ['assmat'])],
      'choice',
      'domicile',
      NOW,
    );
    expect(out.find((t) => t.id === 'a')!.status).toBe('todo');
    expect(out.find((t) => t.id === 'b')!.status).toBe('todo');
  });

  it('touches no task belonging to a different choice', () => {
    const other = task({ id: 'x', branchOfTaskId: 'other-choice', branchOptionIds: ['zzz'] });
    const out = applyTaskChoice([choice, other], 'choice', 'creche', NOW);
    expect(out.find((t) => t.id === 'x')!.status).toBe('todo');
  });

  it('isChoice only for tasks that actually offer options', () => {
    expect(isChoice(choice)).toBe(true);
    expect(isChoice(task())).toBe(false);
  });
});

describe('rederiveTaskStatus', () => {
  it('restores done for a counted task already at target (undismiss path)', () => {
    expect(
      rederiveTaskStatus(task({ target: 6, count: 6, status: 'dismissed' })),
    ).toBe('done');
  });

  it('returns todo when the count is still below target', () => {
    expect(
      rederiveTaskStatus(task({ target: 6, count: 2, status: 'dismissed' })),
    ).toBe('todo');
  });

  it('restores done when every checklist item is ticked', () => {
    expect(
      rederiveTaskStatus(
        task({
          status: 'dismissed',
          checklist: [
            { id: 'a', label: 'A', done: true },
            { id: 'b', label: 'B', done: true },
          ],
        }),
      ),
    ).toBe('done');
  });

  it('returns todo when a checklist item is still open', () => {
    expect(
      rederiveTaskStatus(
        task({
          status: 'dismissed',
          checklist: [
            { id: 'a', label: 'A', done: true },
            { id: 'b', label: 'B', done: false },
          ],
        }),
      ),
    ).toBe('todo');
  });

  it('restores done for an answered choice', () => {
    expect(
      rederiveTaskStatus(
        task({
          status: 'dismissed',
          chosenOptionId: 'creche',
          options: [
            { id: 'creche', label: 'Crèche' },
            { id: 'assmat', label: 'Assmat' },
          ],
        }),
      ),
    ).toBe('done');
  });

  it('returns todo for a plain boolean task', () => {
    expect(rederiveTaskStatus(task({ status: 'dismissed' }))).toBe('todo');
    expect(rederiveTaskStatus(task({ status: 'done' }))).toBe('todo');
  });
});
