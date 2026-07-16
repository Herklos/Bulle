/**
 * Revoking a collaborator (owner side) — plan Phase 7.
 *
 * True eviction is two separate things, and both are needed:
 *  - KEYRING ROTATION, so the evicted member cannot decrypt anything written from now on.
 *    Forward secrecy: they keep what they already had, which is unavoidable and honest.
 *  - ROSTER REMOVAL, so the server stops answering them at all. Every object collection
 *    requires the roster's `space:member` role, so dropping it 403s their future reads and
 *    writes regardless of what keys they hold.
 *
 * THE ORDER IS THE WHOLE POINT, and it looks backwards until you see why. The assignment is
 * dropped and PUSHED FIRST, while the member is still inside the old keyring epoch, so they
 * can actually decrypt the deletion and clear their cached permission matrix. Rotate first
 * and the deletion becomes undecryptable noise to them: their local matrix keeps saying they
 * may edit, their UI keeps offering it, and every write 403s silently. They would be left
 * with an app that looks fine and does nothing, which is the worst of both outcomes.
 *
 * Revoking one subject evicts ONLY that subject. Other links and members keep their access.
 *
 * `submitRevocation` is local by design: the dk server exposes no RevocationList endpoint,
 * and does not need one here, because the roster drop is what actually cuts access. The list
 * is still persisted (generation + cumulative entries) so a future server-side endpoint can
 * consume it without a migration.
 */
import {
  hydrateSpaceInviteStore,
  removeSpaceMember,
  revokeSpaceAccess,
} from '@bulle/sdk';
import { kvGet } from '@drakkar.software/dk-spaces-platform-sdk';
import { getSession, getSpaceId } from '@/lib/starfish';
import { pushSpaceSnapshot } from '@/lib/space-sync';
import { INVITE_STORE_KEY } from '@/lib/invite-link';
import { activeEntry } from '@/lib/bulle-registry';
import { usePermissionsStore } from '@/store/usePermissionsStore';
import { useBulleRegistryStore } from '@/store/useBulleRegistryStore';

export interface RevokeResult {
  /** True when the keyring rotated (full eviction); false when only the roster was dropped. */
  evicted: boolean;
}

/**
 * Revoke one collaborator.
 *
 * Never throws: revocation is reached from a UI action, and a failure here must not leave
 * the owner staring at a crash while wondering whether the person still has access. The
 * assignment drop happens first and unconditionally, so even the worst path ends with the
 * collaborator gone from the roster UI and their server access cut.
 */
export async function revokeCollaborator(
  subjectUserId: string,
  assignmentId: string,
): Promise<RevokeResult> {
  const registry = useBulleRegistryStore.getState().registry;
  const active = activeEntry(registry);

  // 1. Drop the assignment and push it WHILE the member can still decrypt (see the header).
  usePermissionsStore.getState().removeAssignment(assignmentId);

  const session = getSession();
  const spaceId = getSpaceId();

  if (session && spaceId && active) {
    try {
      await pushSpaceSnapshot();
    } catch (error) {
      // Push failed, so the member may never see the deletion. Rotating anyway is still
      // correct: cutting access matters more than them getting a tidy local state.
      console.warn('[revoke] pre-rotation push failed', error);
    }
  }

  if (!session || !spaceId || !active) return { evicted: false };

  // 2. The invite store lives in memory and does not survive a restart, so a link minted in
  //    an earlier session is unresolvable until this is hydrated. Read through the SDK KV,
  //    the same bucket createInviteLink writes to (kvSet), NOT the per-bulle collection
  //    storage: the invite store is account-scoped, not bulle-scoped.
  try {
    const raw = await kvGet(INVITE_STORE_KEY);
    if (raw) hydrateSpaceInviteStore(raw);
  } catch (error) {
    console.warn('[revoke] could not hydrate the invite store', error);
  }

  // Only ever increments. Reusing a generation would let a rotated-out member's cap read as
  // current again.
  const generation = (active.revocationGeneration ?? 0) + 1;
  const priorRevoked = active.revokedEntries ?? [];

  try {
    await revokeSpaceAccess(session, spaceId, subjectUserId, {
      generation,
      priorRevoked: priorRevoked as never,
      submitRevocation: async (list: unknown) => {
        const entries =
          (list as { revoked?: unknown[]; entries?: unknown[] }).revoked ??
          (list as { revoked?: unknown[]; entries?: unknown[] }).entries ??
          priorRevoked;
        await useBulleRegistryStore.getState().updateBulle(active.id, {
          revocationGeneration: generation,
          revokedEntries: entries,
        });
      },
    });
    return { evicted: true };
  } catch (error) {
    // Usually: no stored invite entry, because the link was minted on another device. The
    // roster drop alone still cuts server access, since every object collection requires
    // `space:member` — so this is a partial success, not a failure.
    console.warn('[revoke] rotation failed; falling back to a roster drop', error);
    try {
      await removeSpaceMember(session.accountClient, spaceId, subjectUserId, session);
    } catch (fallbackError) {
      console.warn('[revoke] roster drop also failed', fallbackError);
    }
    return { evicted: false };
  }
}
