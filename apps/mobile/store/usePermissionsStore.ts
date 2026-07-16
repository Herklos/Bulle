/**
 * Permission roles + assignments. Synced like any other collection — this is how a role
 * reaches an invited member, since the invite link itself carries only `write`.
 */
import { create } from 'zustand';
import type { PermissionAssignment, RoleDefinition } from '@bulle/sdk';
import { upsertPermissionAssignment } from '@bulle/sdk';
import { syncedSlice } from '@/lib/synced-slice';

export const ROLES_KEY = 'permissionRoles';
export const ASSIGNMENTS_KEY = 'permissionAssignments';

interface PermissionsState {
  roles: RoleDefinition[];
  assignments: PermissionAssignment[];

  /** PURE — hydrate / remote-apply only. */
  setRoles: (roles: RoleDefinition[]) => void;
  setAssignments: (assignments: PermissionAssignment[]) => void;

  addRole: (role: RoleDefinition) => void;
  removeRole: (id: string) => void;
  upsertAssignment: (assignment: PermissionAssignment) => void;
  removeAssignment: (id: string) => void;
}

export const usePermissionsStore = create<PermissionsState>((set, get) => {
  const roles = syncedSlice<RoleDefinition>(
    ROLES_KEY,
    () => get().roles,
    (items) => set({ roles: items }),
  );
  const assignments = syncedSlice<PermissionAssignment>(
    ASSIGNMENTS_KEY,
    () => get().assignments,
    (items) => set({ assignments: items }),
  );

  return {
    roles: [],
    assignments: [],

    setRoles: (items) => set({ roles: items }),
    setAssignments: (items) => set({ assignments: items }),

    addRole: roles.add,
    removeRole: roles.remove,

    // One role per subject — upsert rather than append, or a re-invite would leave two
    // conflicting assignments and `resolvePermissionForSubject` would pick by array order.
    upsertAssignment: (assignment) =>
      assignments.replaceAndSync(upsertPermissionAssignment(get().assignments, assignment)),
    removeAssignment: assignments.remove,
  };
});
