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
 * Starfish sync server. Override with EXPO_PUBLIC_SYNC_BASE for a local server.
 * No trailing `/v1` — the SDK appends the namespace itself.
 */
export const SYNC_BASE =
  process.env.EXPO_PUBLIC_SYNC_BASE ?? 'https://sync.drakkar.software';

/** Public origin, used to build invite links that open in a browser. */
export const APP_ORIGIN =
  process.env.EXPO_PUBLIC_APP_ORIGIN ?? 'https://bulle.drakkar.software';

let booted = false;

export function configureOnBoot(): void {
  if (booted) return;
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
