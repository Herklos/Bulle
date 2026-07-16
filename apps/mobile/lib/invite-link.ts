/**
 * Minting invite links.
 *
 * The model has no accounts. Sharing mints an EPHEMERAL identity, adds it to the space
 * roster and keyring, then ships that identity's private keys inside the URL fragment.
 * The link is therefore a BEARER TOKEN: whoever holds it *is* that member.
 *
 * Consequences worth stating plainly rather than discovering later:
 *  - The link is inherently MULTI-USE. The secret is entirely in the URL and the server
 *    counts no redemptions, so there is no client-side way to make it single-use. Bound it
 *    with a TTL and revoke after the intended join.
 *  - The role is NOT in the link (only `write`). It travels separately over sync — see
 *    `assignRole` below.
 */

import {
  createSpaceInviteLink,
  serializeSpaceInviteStore,
  type RoleDefinition,
  type Session,
} from '@bulle/sdk';
import { kvSet } from '@drakkar.software/dk-spaces-platform-sdk';
import { roleCanWrite } from '@bulle/sdk';
import { APP_ORIGIN } from './config';

/** KV key holding the serialized invite store, needed later to revoke. */
export const INVITE_STORE_KEY = 'spaceInviteStore';

export interface MintedInvite {
  link: string;
  /** The invite's ephemeral subject id — the key a role assignment is filed under. */
  inviteUserId: string;
}

/**
 * Mint an invite for `role`.
 *
 * ORDER MATTERS: the caller must have pushed content BEFORE handing the link out, or the
 * invite points at an empty space and the joiner sees a blank bulle.
 */
export async function mintInvite(
  session: Session,
  spaceId: string,
  spaceName: string,
  role: RoleDefinition,
): Promise<MintedInvite> {
  const write = roleCanWrite(role);

  const { link, inviteUserId } = await createSpaceInviteLink(
    session,
    spaceId,
    spaceName,
    write,
    APP_ORIGIN,
  );

  /**
   * Persist the invite store immediately.
   *
   * The in-memory store does not survive a restart, and revocation needs the entry it holds.
   * Skipping this means an invite minted today cannot be revoked tomorrow — which, for a
   * bearer token, is the difference between "shareable" and "permanent".
   */
  try {
    await kvSet(INVITE_STORE_KEY, JSON.stringify(serializeSpaceInviteStore()));
  } catch (error) {
    console.warn('[invite] failed to persist the invite store; revocation may be unavailable', error);
  }

  return { link, inviteUserId };
}
