/**
 * The synced-collection factory.
 *
 * wedding-os has no equivalent: its 28 stores each hand-repeat the same
 * `set → persist → notifySync` epilogue in every mutator, and adding one collection means
 * editing six sites. Behaviour here is identical; the repetition is not.
 *
 * THE INVARIANT THIS EXISTS TO PROTECT — pure setter vs effectful mutator:
 *
 *   setTasks: (tasks) => set({ tasks })        // PURE. Hydrate + remote-apply use ONLY this.
 *   addTask:  (task)  => { …; flush() }        // Effectful. User actions use these.
 *
 * If the pure setter called `notifySync()`, every remote pull would immediately schedule a
 * push of what it just received, and two devices would ping-pong forever. That is why the
 * factory takes `set` (the pure setter) as a separate argument rather than owning it: the
 * hydrate path must be able to reach the setter WITHOUT reaching the effects.
 */

import { getStorage, writeCollection } from '@bulle/ui/utils/kv-storage';
import { notifySync } from './starfish';

export interface SyncedSlice<T extends { id: string }> {
  add: (item: T) => void;
  addMany: (items: T[]) => void;
  update: (id: string, updates: Partial<T>) => void;
  remove: (id: string) => void;
  /** Replace the whole collection AND sync it — unlike the pure setter. */
  replaceAndSync: (items: T[]) => void;
}

/**
 * @param key  KV key for the whole collection
 * @param get  reads the current items out of the store
 * @param set  the PURE setter — must not itself persist or notify
 */
export function syncedSlice<T extends { id: string }>(
  key: string,
  get: () => T[],
  set: (items: T[]) => void,
): SyncedSlice<T> {
  const flush = () => {
    // `getStorage()` is null until initStorage() resolves. A mutation in that window is
    // kept in memory and persisted by the next one; the guard lives here, once, rather
    // than at ~60 call sites the way it does in the reference app.
    if (getStorage()) writeCollection(key, get());
    notifySync();
  };

  return {
    add: (item) => {
      set([...get(), item]);
      flush();
    },
    addMany: (items) => {
      if (items.length === 0) return;
      set([...get(), ...items]);
      flush();
    },
    update: (id, updates) => {
      const now = new Date().toISOString();
      // `updatedAt` is stamped here, not at the call site, so it can never be forgotten.
      set(get().map((x) => (x.id === id ? { ...x, ...updates, updatedAt: now } : x)));
      flush();
    },
    remove: (id) => {
      set(get().filter((x) => x.id !== id));
      flush();
    },
    replaceAndSync: (items) => {
      set(items);
      flush();
    },
  };
}
