/**
 * Custom SpaceLayout for the `dk` sync namespace.
 *
 * starfish-spaces' `defaultSpaceLayout.accountScope`/`linkedDeviceScope` mint
 * wildcard-collection caps (`collections:["*"]`). The server synthesizes cap roles by
 * literal concatenation (`cap:read:${collection}`), so a wildcard collection produces
 * `cap:read:*` — which never matches a collection that requires an EXPLICIT
 * `cap:read:spaces`, as the `dk` namespace's `spaces` and `devices` collections do.
 * Left unfixed, every `_spaces`/`_devices` read or write against `dk` 403s.
 *
 * Fix: override just these two scopes with dk-spaces-sdk's explicit-collection versions.
 * Every other layout field (paths, `spaceOwnerScope`, `spaceMemberScope`, …) is identical
 * between the starfish default and dk-spaces-sdk, so it is left untouched via the spread.
 */
import { defaultSpaceLayout } from '@drakkar.software/starfish-spaces';
import type { SpaceLayout } from '@drakkar.software/starfish-spaces';
import { accountScope, linkedDeviceScope } from '@drakkar.software/dk-spaces-sdk';

// Built lazily inside the function (not at module scope): config.ts imports this module
// unconditionally via the @bulle/sdk barrel, so an eager `...defaultSpaceLayout` spread
// would evaluate on every import of @bulle/sdk — including in tests that partially mock
// starfish-spaces without configureBulle() ever running.
export function bulleLayout(): SpaceLayout {
  return {
    ...defaultSpaceLayout,
    accountScope,
    linkedDeviceScope,
  };
}
