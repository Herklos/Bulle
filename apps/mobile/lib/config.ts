/**
 * SDK boot. Called at MODULE SCOPE from app/_layout.tsx, before any React renders.
 *
 * That timing is not a style choice: screens derive a session during their first render,
 * and `getSyncBase()`/`getSyncNamespace()` THROW rather than return undefined before
 * `configureBulle` runs. Booting this in an effect would race the first screen.
 */
import { configureBulle } from '@bulle/sdk';
import {
  configureStarfishPlatform,
  kvGet,
  kvRemove,
  kvSet,
} from '@drakkar.software/dk-spaces-platform-sdk';

/**
 * Starfish sync server. Override with EXPO_PUBLIC_SYNC_BASE.
 * No trailing `/v1` — the SDK appends the namespace itself.
 *
 * ⚠️ THE DEFAULT BELOW IS A PLACEHOLDER AND DOES NOT EXIST. `sync.drakkar.software` is
 * NXDOMAIN: the device cannot even resolve it ("ping: unknown host"). Sync has therefore
 * never worked, and cannot, until this points somewhere real.
 *
 * It fails SILENTLY, which is the dangerous part. A bulle with a seed phrase reports itself
 * as syncing, `activateSync` runs, every push throws, and the error is swallowed by a
 * console.warn — so the UI shows a healthy, shareable bulle whose co-parent will never
 * receive anything. Nothing surfaces because nothing is meant to: the offline path is a
 * supported mode, and the code cannot tell "offline for now" from "this host is a fiction".
 *
 * Note Fiancé does NOT do this. It has no default server at all: `serverUrl` is stored per
 * registry entry and supplied by the user, so an unconfigured wedding is simply local. A
 * hardcoded default that does not resolve is strictly worse than no default, because it
 * looks configured.
 *
 * To make sync real, either point this at a deployed Starfish server, or adopt Fiancé's
 * per-entry `serverUrl` model. Until then `assertSyncBaseReachable()` below shouts in dev.
 */
export const SYNC_BASE =
  process.env.EXPO_PUBLIC_SYNC_BASE ?? 'https://sync.drakkar.software';

/** The placeholder that has never resolved. */
export const PLACEHOLDER_SYNC_BASE = 'https://sync.drakkar.software';

/** True when `url` is the fiction host that cannot resolve. */
export function isPlaceholderSyncBase(url: string): boolean {
  return url === PLACEHOLDER_SYNC_BASE;
}

/**
 * Whether invite / couple sync has a real Starfish host.
 *
 * `SYNC_BASE` always has a fallback (the placeholder), so "configured" means the env var is
 * set to something other than that fiction — not merely that `SYNC_BASE` is a string.
 */
export function isSyncConfigured(
  envBase: string | undefined = process.env.EXPO_PUBLIC_SYNC_BASE,
): boolean {
  return typeof envBase === 'string' && envBase.length > 0 && !isPlaceholderSyncBase(envBase);
}

/**
 * Say it out loud in dev.
 *
 * Not an exception: the app is fully usable without sync, and crashing a local-first
 * product because a server is missing would be the wrong trade. But a silent placeholder is
 * how "sync is broken" survives to launch.
 */
function warnIfSyncBaseIsPlaceholder(): void {
  if (__DEV__ && !isSyncConfigured()) {
    console.warn(
      '[bulle] SYNC_BASE is the placeholder https://sync.drakkar.software, which does not ' +
        'resolve. Sync will fail silently and no co-parent will ever receive anything. ' +
        'Set EXPO_PUBLIC_SYNC_BASE to a real Starfish server.',
    );
  }
}

/** Public origin, used to build invite links that open in a browser. */
export const APP_ORIGIN =
  process.env.EXPO_PUBLIC_APP_ORIGIN ?? 'https://bulle.drakkar.software';

let booted = false;

export function configureOnBoot(): void {
  if (booted) return;
  warnIfSyncBaseIsPlaceholder();
  booted = true;

  // 1. Platform crypto + an RN-safe base64 provider. Must precede any SDK call.
  configureStarfishPlatform();

  // 2. Transport + KV + the custom SpaceLayout.
  //
  // The KV adapter here is the platform SDK's, which is a FLAT, GLOBAL store. This is
  // load-bearing and easy to get wrong: SDK state is account-scoped ("dk.spaceaccess.
  // {userId}" holds the join-link ephemeral KEM keys), never bulle-scoped. Routing it
  // through the per-bulle SQLite KV would drop the join credential whenever no bulle is
  // active — which is exactly the state the /join flow runs in.
  configureBulle({ syncBase: SYNC_BASE }, { get: kvGet, set: kvSet, remove: kvRemove });
}
