/**
 * Bootstraps the OWNER's starfish space. Ported from Fiancé's lib/space-provision.ts.
 *
 * Without this, sharing is impossible and always was. `invite()` needs a session and a
 * spaceId; both come from the sync singletons, which `activateSync` only sets when the
 * registry entry ALREADY has a spaceId; and nothing ever set one for an owner (join-space.ts
 * is the joiner's side, and it needs a link that could never be minted). So an owner could
 * never create their first invite link, the screen did nothing, and sync never started —
 * which is why nobody had noticed the default sync host does not resolve. See docs/SYNC.md.
 *
 * The first `writeSpaceAccess` works by TOFU (trust on first use): with no `_access` doc, the
 * server enricher grants `[space:owner, space:member]` to any authenticated identity, which
 * is what lets an owner bootstrap their own space at all. Every request after that reads the
 * stored doc, so this window is exactly one write wide.
 *
 * A bulle is LOCAL until it is shared. Nothing here runs at onboarding; it runs the first
 * time someone reaches for an invite. That ordering is deliberate: a solo bulle should never
 * touch the network, and §9's promise is that the app works fully with no account and no
 * server.
 */
import * as Crypto from 'expo-crypto';
import {
  buildSpace,
  DEFAULT_SYNC_NAMESPACE,
  getSyncNamespace,
  ownerEnsureSpaceKeyring,
  readSpaces,
  seedSpaceObjectIndex,
  writeSpaceAccess,
  writeSpaces,
  type Session,
} from '@bulle/sdk';
import type { BulleRegistryEntry } from '@/lib/bulle-registry';
import { useBulleRegistryStore } from '@/store/useBulleRegistryStore';
import { withIndexLock } from '@/lib/index-lock';

/**
 * Idempotent. Returns the existing spaceId when there is one, otherwise creates the space
 * (`_access`, object index, keyring, `_spaces`) and persists the `sp-` id on the entry.
 */
export async function ensureSpaceProvisioned(
  session: Session,
  bulle: BulleRegistryEntry,
): Promise<string> {
  // Fast path. Always true for a member entry: join sets spaceId before anything else.
  if (bulle.spaceId) return bulle.spaceId;

  // A member with no spaceId means the join did not persist one, and running owner
  // provisioning for them would mint a second, empty space and quietly strand them in it.
  if (bulle.role === 'member') {
    throw new Error(
      `[space-provision] member entry ${bulle.id} has no spaceId — the invite join did not persist it`,
    );
  }

  const spaceId = `${session.spaceIdPrefix}${Crypto.randomUUID().replace(/-/g, '')}`;
  const name = bulle.label;

  // 1. `_access`. TOFU grants space:owner on this first write.
  await writeSpaceAccess(
    session.spacesRegistryClient,
    spaceId,
    session.userId,
    [],
    null,
    session,
    { name },
  );

  // 2. Seed the empty object index. Under withIndexLock because seedSpaceObjectIndex has no
  //    CAS retry: two concurrent activations racing here would 409 on a hash mismatch.
  await withIndexLock(spaceId, () => seedSpaceObjectIndex(session, spaceId));

  // 3. The space-wide E2EE keyring. Nothing can be decrypted by anyone without it.
  await ownerEnsureSpaceKeyring(session, spaceId);

  // 4. Register in the user's `_spaces` list. Best-effort ON PURPOSE: a CAS 409 here must
  //    not abort provisioning, because the spaceId is persisted below and sync reads it
  //    directly rather than through `_spaces`. Failing the whole bootstrap over a
  //    bookkeeping write would strand a space that is otherwise complete.
  try {
    const { spaces } = await readSpaces(session.spacesRegistryClient, session);
    await writeSpaces(session.spacesRegistryClient, session, [...spaces, buildSpace(spaceId, name)]);
  } catch (error) {
    console.warn('[space-provision] _spaces registration failed (non-fatal)', error);
  }

  // 5. Persist, so the fast path holds next time. Through the STORE, not the raw KV writer:
  //    the in-memory registry has to update now, or the next activation re-provisions and
  //    orphans this space.
  //
  //    The namespace is stamped alongside, so a space left over from a retired namespace is
  //    detectable rather than silently unreachable.
  await useBulleRegistryStore.getState().updateBulle(bulle.id, {
    spaceId,
    syncNamespace: getSyncNamespace() ?? DEFAULT_SYNC_NAMESPACE,
  });

  return spaceId;
}
