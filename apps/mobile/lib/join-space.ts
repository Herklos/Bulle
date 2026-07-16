/**
 * Joining a bulle from an invite link.
 *
 * The ORDER of the calls below is load-bearing and non-obvious. Read the comments before
 * rearranging anything.
 */

import {
  hydrateSpaceAccessStore,
  joinSpaceByLink,
  type SpaceInviteLinkToken,
} from '@bulle/sdk';
import { deriveSessionFromPhrase, generatePassphrase } from './identity';
import { useBulleRegistryStore } from '@/store/useBulleRegistryStore';
import type { BulleRegistryEntry } from './bulle-registry';

export async function joinBulleByToken(token: SpaceInviteLinkToken): Promise<BulleRegistryEntry> {
  // 1. The joiner mints THEIR OWN identity. They never learn the owner's seed phrase — the
  //    space is adopted, not shared. This is what makes revocation meaningful later.
  const seedPhrase = generatePassphrase();
  const session = await deriveSessionFromPhrase(seedPhrase);

  /**
   * 2. Pin the identity BEFORE joining.
   *
   * `joinSpaceByLink` calls `saveSpaceAccessEntry`, which writes under the access store's
   * current active key. If that key still belongs to a previous identity, the join
   * credential lands in the wrong bucket and is wiped at the next member boot — sync then
   * silently never works for this joiner, with no error anywhere.
   */
  await hydrateSpaceAccessStore(session.userId, {}, {});

  // 3. Adopt the space. Re-seals the bearer credential to the joiner's own identity
  //    server-side, so it survives a reinstall.
  await joinSpaceByLink(session, token);

  /**
   * 4. Persist spaceId AND role atomically.
   *
   * A member whose `role` arrived in a later write would, in the gap, look like an owner and
   * run owner-only provisioning (writing space access, minting a keyring) against a space
   * it does not own.
   */
  const entry = await useBulleRegistryStore.getState().createBulle({
    label: token.spaceName,
    seedPhrase,
    spaceId: token.spaceId,
    role: 'member',
    inviteSubjectId: (token.cap as { subUserId?: string }).subUserId,
  });

  return entry;
}
