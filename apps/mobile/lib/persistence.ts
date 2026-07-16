/**
 * KV → store hydration and teardown.
 *
 * The whole file is registry-driven (see lib/collection-registry.ts). wedding-os spends 418
 * lines on near-identical three-line functions to do this; the behaviour below is the same.
 *
 * KV is the DURABLE LOCAL SOURCE OF TRUTH: this runs at boot with no network, and the app
 * is fully usable the moment it returns. The server is a convergence point, not the truth.
 */

import { readCollection } from '@bulle/ui/utils/kv-storage';
import type { Bulle } from '@bulle/sdk';
import { COLLECTIONS } from './collection-registry';
import { BULLE_KEY, useBulleStore } from '@/store/useBulleStore';
import { READINESS_KEY, useReadinessStore } from '@/store/useReadinessStore';
import type { ReadinessSnapshot } from '@bulle/sdk';

/**
 * Load every collection from the per-bulle KV into its store.
 *
 * Synchronous — `expo-sqlite/kv-store` reads synchronously on native, and the web cache is
 * pre-loaded by `initStorage`. That is what lets the first paint already have data instead
 * of flashing an empty list.
 *
 * Uses ONLY the pure setters, so nothing here schedules a push.
 */
export function hydrateAllStores(): void {
  for (const collection of COLLECTIONS) {
    const rows = readCollection<unknown[]>(collection.key);
    if (rows && Array.isArray(rows)) {
      const { items } = collection.parse(rows);
      collection.write(items.length === 0 && collection.defaults ? collection.defaults() : items);
    } else if (collection.defaults) {
      collection.write(collection.defaults());
    } else {
      collection.write([]);
    }
  }

  useBulleStore.getState().setBulle(readCollection<Bulle>(BULLE_KEY));
  useReadinessStore.getState().setSnapshot(readCollection<ReadinessSnapshot>(READINESS_KEY));
}

/**
 * Empty every store. Called before swapping to another bulle's KV file — without it, the
 * previous bulle's data would paint for a frame under the new one's identity.
 */
export function clearAllStores(): void {
  for (const collection of COLLECTIONS) collection.write([]);
  useBulleStore.getState().setBulle(null);
  useReadinessStore.getState().setSnapshot(null);
  useReadinessStore.getState().clearDeferred();
}
