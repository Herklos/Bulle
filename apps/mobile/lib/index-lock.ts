/**
 * Serialises `objects/_index` writes within this process.
 *
 * The index is a single CAS document. Two concurrent in-process writers both pull the same
 * hash, both mutate, and the second push 409s — then retries, and races again. Chaining
 * them into a promise queue makes the common case correct without touching the CAS retry
 * logic underneath.
 *
 * Keyed by spaceId, though only one space is ever active today — cheap, and it means a
 * future multi-space background sync can't deadlock on a shared chain.
 */

const _chains = new Map<string, Promise<unknown>>();

export function withIndexLock<T>(spaceId: string, fn: () => Promise<T>): Promise<T> {
  const previous = _chains.get(spaceId) ?? Promise.resolve();
  // `.catch(() => {})` on the tail, not on the returned promise: a failed write must not
  // poison the chain for the next caller, but it MUST still reject for its own caller.
  const next = previous.then(fn, fn);
  _chains.set(
    spaceId,
    next.catch(() => {}),
  );
  return next;
}

/** Drop the chains (on teardown / account switch). */
export function clearIndexLocks(): void {
  _chains.clear();
}
