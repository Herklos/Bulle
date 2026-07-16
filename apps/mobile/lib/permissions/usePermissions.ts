'use client';
/**
 * Permission gating for the UI.
 *
 * Two independent sources of truth, and they can disagree:
 *  1. The cached MATRIX on the registry entry — resolved from the synced role. Synchronous,
 *     works offline, but can be stale.
 *  2. `writeDenied` — set from an actual 403. Authoritative, but only known after a failure.
 *
 * The backstop below is why both are needed. A stale invite can hand a member an "edit"
 * matrix while their real cap is read-only: the UI offers editing, every write 403s
 * silently, and the next hydrate reverts their work with no explanation. `writeDenied`
 * overrides the matrix the moment reality asserts itself — while leaving 'view' intact, so
 * the member still sees the bulle rather than being locked out.
 */
import { useCallback } from 'react';
import { matrixAllows, type FeatureSurface, type PermissionAction, type PermissionMatrix } from '@bulle/sdk';
import { useActiveBulle } from '@/store/useBulleRegistryStore';
import { useSyncAccessStore } from '@/store/useSyncAccessStore';

export interface Permissions {
  can: (surface: FeatureSurface, action?: PermissionAction) => boolean;
  isOwner: boolean;
  /** True when a 403 has proven this device cannot write, whatever the matrix says. */
  writeDenied: boolean;
}

export function usePermissions(): Permissions {
  const active = useActiveBulle();
  const writeDenied = useSyncAccessStore((s) => s.writeDenied);

  const isOwner = !active || active.role !== 'member';
  const matrix: PermissionMatrix = active?.permissions ?? {};
  /**
   * `permissions: undefined` means unrestricted; `{}` means locked out. Fail-open is
   * deliberate — a member whose role collection hasn't synced yet must not be locked out of
   * their own bulle over a network hiccup.
   */
  const unrestricted = isOwner || !active?.permissions;

  const can = useCallback(
    (surface: FeatureSurface, action: PermissionAction = 'edit') => {
      if (writeDenied && action !== 'view') return false;
      return unrestricted ? true : matrixAllows(matrix, surface, action);
    },
    [writeDenied, unrestricted, matrix],
  );

  return { can, isOwner, writeDenied };
}

/** Convenience for the common "may I edit this surface?" check. */
export function useCanEdit(surface: FeatureSurface): boolean {
  const { can } = usePermissions();
  return can(surface, 'edit');
}
