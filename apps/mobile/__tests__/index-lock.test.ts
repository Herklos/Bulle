import { describe, expect, it } from 'vitest';
import { withIndexLock } from '../lib/index-lock';

function deferred<T = void>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

const settle = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

describe('withIndexLock', () => {
  it('runs writes for one space one at a time, in call order', async () => {
    const order: string[] = [];
    const first = deferred();

    const p1 = withIndexLock('space-serial', async () => {
      order.push('first:start');
      await first.promise;
      order.push('first:end');
    });
    const p2 = withIndexLock('space-serial', async () => {
      order.push('second:start');
    });

    await settle();
    expect(order).toEqual(['first:start']);

    first.resolve();
    await Promise.all([p1, p2]);
    expect(order).toEqual(['first:start', 'first:end', 'second:start']);
  });

  it('rejects only the caller whose write failed', async () => {
    const failure = new Error('hash mismatch');

    const failing = withIndexLock('space-reject', () => Promise.reject(failure));
    const following = withIndexLock('space-reject', async () => 'ok');

    await expect(failing).rejects.toBe(failure);
    await expect(following).resolves.toBe('ok');
  });

  it('still runs a write queued behind one that later rejects', async () => {
    const gate = deferred();
    const ran: string[] = [];

    const failing = withIndexLock('space-queued', async () => {
      await gate.promise;
      throw new Error('cas conflict');
    });
    const queued = withIndexLock('space-queued', async () => {
      ran.push('queued');
    });

    const failingResult = expect(failing).rejects.toThrow('cas conflict');
    gate.resolve();
    await failingResult;
    await queued;

    expect(ran).toEqual(['queued']);
  });

  it('does not make a write to one space wait on another space', async () => {
    const blocker = deferred();
    const blocked = withIndexLock('space-blocked', () => blocker.promise);

    const free = await withIndexLock('space-free', async () => 'free');
    expect(free).toBe('free');

    blocker.resolve();
    await blocked;
  });

  it('returns the value produced by the write', async () => {
    const value = await withIndexLock('space-value', async () => 42);
    expect(value).toBe(42);
  });
});
