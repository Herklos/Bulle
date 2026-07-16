/**
 * Readiness display state.
 *
 * Two things live here, and neither is synced:
 *
 *  - `snapshot` — the monotonicity high-water mark (spec §6). Persisted to the per-bulle KV
 *    so the hold survives a relaunch, but deliberately NOT synced: it is a property of what
 *    THIS device has already shown the user. Syncing it would mean one partner's un-tick
 *    silently pins the other's orb, which is a display artifact leaking across people.
 *
 *  - `deferredIds` — tasks dismissed via "Plus tard" this session. In memory ONLY, and that
 *    is the entire point: a persisted deferral becomes a count, and a count becomes guilt
 *    (§5.1). They evaporate on relaunch, so the task genuinely re-enters the pool.
 */
import { create } from 'zustand';
import type { ReadinessSnapshot } from '@bulle/sdk';
import { getStorage, readCollection, writeCollection } from '@bulle/ui/utils/kv-storage';

export const READINESS_KEY = 'readinessSnapshot';

interface ReadinessState {
  snapshot: ReadinessSnapshot | null;
  deferredIds: Set<string>;
  /** Bumped to make the orb pulse once when an essential is ticked. */
  pulseKey: number;

  /** PURE — hydrate only. */
  setSnapshot: (snapshot: ReadinessSnapshot | null) => void;

  saveSnapshot: (snapshot: ReadinessSnapshot) => void;
  defer: (taskId: string) => void;
  clearDeferred: () => void;
  pulse: () => void;
}

export const useReadinessStore = create<ReadinessState>((set, get) => ({
  snapshot: null,
  deferredIds: new Set(),
  pulseKey: 0,

  setSnapshot: (snapshot) => set({ snapshot }),

  saveSnapshot: (snapshot) => {
    const current = get().snapshot;
    // The snapshot is written on every readiness computation, i.e. on every render of the
    // home screen. Skip the identical write rather than churn the KV.
    if (current && current.fill === snapshot.fill && current.profileKey === snapshot.profileKey) {
      return;
    }
    set({ snapshot });
    if (getStorage()) writeCollection(READINESS_KEY, snapshot);
  },

  defer: (taskId) => set({ deferredIds: new Set(get().deferredIds).add(taskId) }),
  clearDeferred: () => set({ deferredIds: new Set() }),
  pulse: () => set({ pulseKey: get().pulseKey + 1 }),
}));

/** Read the persisted snapshot. Called by the hydrate path. */
export function readReadinessSnapshot(): ReadinessSnapshot | null {
  return readCollection<ReadinessSnapshot>(READINESS_KEY);
}
