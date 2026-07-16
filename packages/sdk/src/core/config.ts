/**
 * Bulle SDK configuration.
 *
 * Call `configureBulle({ syncBase }, kv)` once at app boot — at MODULE SCOPE, before any
 * React renders, since screens derive a session during their first render.
 *
 *   1. Seed the global sync transport (`syncBase` + the `dk` namespace) via dk-spaces-sdk's
 *      `configureDKSpaces` — the single source of truth for `getSyncBase()`/
 *      `getSyncNamespace()`. Note those getters THROW (not return undefined) before this
 *      runs, so callers that read them early must wrap in try/catch.
 *   2. Register the KV adapter (`configureKv`, which also wires starfish-spaces'
 *      `configureSpaces`/`configureSpaceAccessStore` internally under the fixed
 *      `dk.spaceaccess.` key prefix).
 *   3. Install the custom `SpaceLayout` (see `./layout.ts`) that fixes the wildcard-cap
 *      403 against the `dk` namespace's `spaces`/`devices` collections.
 */

import { configureSpaces } from '@drakkar.software/starfish-spaces';
import { configureDKSpaces, configureKv, type KvAdapter } from '@drakkar.software/dk-spaces-sdk';
import { bulleLayout } from './layout.js';

export type { KvAdapter };

/** The sync namespace Bulle targets. Single source of truth for the "dk" literal. */
export const DEFAULT_SYNC_NAMESPACE = 'dk';

export interface BulleConfig {
  /** Starfish sync server base URL (no trailing `/v1`). */
  syncBase: string;
}

/**
 * Initialise the Bulle SDK.
 *
 * @param cfg - `{ syncBase }`, the normalized sync server URL.
 * @param kv - KV adapter with `{ get, set, remove }` methods (dk-spaces-sdk shape — e.g.
 *   `@drakkar.software/dk-spaces-platform-sdk`'s `kvGet/kvSet/kvRemove`).
 *
 * IMPORTANT: this adapter MUST be a flat, tenant-independent (global) store — never
 * prefixed by the active bulle, never gated on a bulle being open. All SDK KvAdapter state
 * is account-scoped per-user:
 *   "dk.spaceaccess.{userId}" — join-link credential (ephemeral KEM keys)
 *   caps / pull-cache keys — also per-user, not per-bulle
 * Routing through a per-bulle-prefixed adapter silently drops the join credential when no
 * bulle is active (the /join flow), breaking sync for every joiner on web after reload.
 */
export function configureBulle(cfg: BulleConfig, kv: KvAdapter): void {
  configureDKSpaces({
    syncBase: cfg.syncBase,
    syncNamespace: DEFAULT_SYNC_NAMESPACE,
  });
  // Also wires configureSpaces({ kvAdapter }) + configureSpaceAccessStore
  // (kvKeyPrefix: 'dk.spaceaccess.') internally.
  configureKv(kv);
  // Layered on top of configureKv's configureSpaces call (configureSpaces merges, so the
  // kvAdapter set above is preserved).
  configureSpaces({ layout: bulleLayout() });
}
