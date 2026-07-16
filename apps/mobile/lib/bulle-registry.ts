/**
 * The bulle registry — DEVICE-LOCAL metadata, kept in SecureStore.
 *
 * Critical distinction, and the source of a real class of bug in the reference app: this is
 * NOT synced domain data. `role`, `seedPhrase`, `dbFileName` and the cached permission
 * matrix describe *this device's relationship* to a bulle. The `Bulle` entity in @bulle/sdk
 * describes the pregnancy and is shared with the co-parent. Reading `role` off the synced
 * entity (which has no role) silently returns undefined and turns owner-only guards into
 * no-ops. Keep them apart.
 */

import { secureGet, secureSet } from '@bulle/ui/utils/secure-store';
import type { PermissionMatrix } from '@bulle/sdk';

const REGISTRY_KEY = 'bulle_registry';

export interface BulleRegistryEntry {
  /** Local id. Also the root node id for owners. */
  id: string;
  /** Display label, e.g. "Notre bulle". */
  label: string;
  /** One KV file per bulle — hard data isolation between them. */
  dbFileName: string;
  /**
   * BIP-39 seed. ABSENT means sync is entirely off for this bulle and the app is purely
   * local — which is a supported, fully-working mode, not a degraded one.
   */
  seedPhrase?: string;
  spaceId?: string;
  /** Stamped at creation; a mismatch against getSyncNamespace() means the entry is stale. */
  syncNamespace?: string;
  role: 'owner' | 'member';
  /** For members: the owner's root node id, discovered once then cached. */
  rootNodeId?: string;
  /** Cached collaborator role + matrix, so gating is synchronous and works offline. */
  roleId?: string;
  /**
   * `{}` = locked out. `undefined` = unrestricted. The difference is load-bearing: fail-open
   * is deliberate so a member is never accidentally locked out of their own bulle.
   */
  permissions?: PermissionMatrix;
  /** The invite's ephemeral subject id — how this device resolves its own role. */
  inviteSubjectId?: string;
  ownerId?: string;
  /**
   * Revocation bookkeeping, owner side. `revokeSpaceAccess` needs a monotonically
   * increasing generation and the cumulative prior entries; both live here because they
   * are device-local facts about THIS owner's roster, not synced content.
   *
   * Reusing a generation would let a rotated-out member's cap look current again, so it
   * only ever increments (see lib/permissions/revoke.ts).
   */
  revocationGeneration?: number;
  revokedEntries?: unknown[];
  syncDisabled?: boolean;
  createdAt: string;
}

export interface BulleRegistry {
  activeBulleId: string | null;
  bulles: BulleRegistryEntry[];
}

const EMPTY: BulleRegistry = { activeBulleId: null, bulles: [] };

export async function loadRegistry(): Promise<BulleRegistry> {
  const raw = await secureGet(REGISTRY_KEY);
  if (!raw) return EMPTY;
  try {
    const parsed = JSON.parse(raw) as BulleRegistry;
    if (!Array.isArray(parsed.bulles)) return EMPTY;
    return parsed;
  } catch {
    // A corrupt registry must not brick the app into a crash loop on every launch.
    return EMPTY;
  }
}

export async function saveRegistry(registry: BulleRegistry): Promise<void> {
  await secureSet(REGISTRY_KEY, JSON.stringify(registry));
}

export function dbFileNameFor(id: string): string {
  return `bulle_${id}.db`;
}

export function activeEntry(registry: BulleRegistry | null): BulleRegistryEntry | null {
  if (!registry) return null;
  return (
    registry.bulles.find((b) => b.id === registry.activeBulleId) ?? registry.bulles[0] ?? null
  );
}
