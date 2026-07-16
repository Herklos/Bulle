/**
 * Collaborator permissions — pure domain logic (no store / RN deps). Spec §5.10.
 *
 * An owner defines *roles* (a per-surface permission matrix) and *assigns* a role to each
 * invited collaborator. The role is NOT carried in the invite link — it travels to the
 * member over sync as ordinary encrypted content, keyed by the invite's ephemeral subject
 * id. The member's client resolves it into a matrix and gates its UI.
 *
 * Enforcement is layered — a role declares its `tier`:
 *   - "app-cosmetic": client-side UX gating only.
 *   - "app-readonly": + server-enforced read-only via the invite `write=false` cap.
 *   - "app-scoped" | "web-view" | "app-crypto": reserved, not built yet.
 *
 * Two co-parents are SYMMETRIC (principle §2.3): there is no "main account + guest". A
 * co-parent is not a lesser owner, so this matrix exists to scope *famille*, not the couple.
 */

/** The feature surfaces a role can grant access to. */
export type FeatureSurface =
  | 'journey'
  | 'plan'
  | 'shopping'
  | 'budget'
  | 'documents'
  | 'decisions'
  | 'memories';

export type PermissionAction = 'view' | 'edit';

/** A role's grants. An absent surface means "no access" (the surface is hidden). */
export type PermissionMatrix = Partial<Record<FeatureSurface, PermissionAction>>;

export type RoleTier =
  | 'app-cosmetic'
  | 'app-readonly'
  | 'app-scoped'
  | 'web-view'
  | 'app-crypto';

export const FEATURE_SURFACES: FeatureSurface[] = [
  'journey',
  'plan',
  'shopping',
  'budget',
  'documents',
  'decisions',
  'memories',
];

export interface RoleDefinition {
  id: string;
  /** System roles: an i18n key the UI resolves. Custom roles: a literal name. */
  name: string;
  isSystem: boolean;
  tier: RoleTier;
  matrix: PermissionMatrix;
  createdAt: string | null;
  updatedAt: string | null;
}

/** Binds an invited collaborator (by their subject id) to a role. */
export interface PermissionAssignment {
  id: string;
  /** The invite's ephemeral `inviteUserId` (primary) — or a real member userId. */
  subjectUserId: string;
  roleId: string;
  /** Optional owner note, e.g. "Mamie". */
  label: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

/**
 * System roles seeded when the collection is empty.
 *
 * `role-famille` is deliberately MINIMAL by default (§5.10: "the couple explicitly opens
 * each surface"). Family never sees the Journey, readiness, documents, budget or decisions —
 * those are the couple's bulle. Widening is an explicit act, not a default.
 */
export const DEFAULT_PERMISSION_ROLES: Omit<RoleDefinition, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'role-coparent',
    name: 'roleCoparentName',
    isSystem: true,
    tier: 'app-cosmetic',
    matrix: {
      journey: 'edit',
      plan: 'edit',
      shopping: 'edit',
      budget: 'edit',
      documents: 'edit',
      decisions: 'edit',
      memories: 'edit',
    },
  },
  {
    id: 'role-famille',
    name: 'roleFamilleName',
    isSystem: true,
    tier: 'app-readonly',
    matrix: { shopping: 'view' },
  },
  {
    id: 'role-doula',
    name: 'roleDoulaName',
    isSystem: true,
    tier: 'app-scoped',
    matrix: { documents: 'view' },
  },
];

/**
 * Whether a collaborator with this role should receive a write-capable invite cap.
 * Read-only / web-view / crypto-scoped roles never write. Otherwise it's writable iff any
 * surface is granted "edit".
 */
export function roleCanWrite(role: RoleDefinition): boolean {
  if (role.tier === 'app-readonly' || role.tier === 'web-view' || role.tier === 'app-crypto') {
    return false;
  }
  return Object.values(role.matrix).some((a) => a === 'edit');
}

/** True if the matrix grants at least `action` on `surface`. */
export function matrixAllows(
  matrix: PermissionMatrix,
  surface: FeatureSurface,
  action: PermissionAction = 'edit',
): boolean {
  const level = matrix[surface];
  if (!level) return false;
  return action === 'view' ? true : level === 'edit';
}

// ─── Pure reducers (the store delegates to these) ─────────────────────────────

export function addPermissionRole(roles: RoleDefinition[], role: RoleDefinition): RoleDefinition[] {
  return [...roles, role];
}

export function updatePermissionRole(
  roles: RoleDefinition[],
  id: string,
  updates: Partial<RoleDefinition>,
  now: string,
): RoleDefinition[] {
  return roles.map((r) => (r.id === id ? { ...r, ...updates, updatedAt: now } : r));
}

export function removePermissionRole(roles: RoleDefinition[], id: string): RoleDefinition[] {
  return roles.filter((r) => r.id !== id);
}

/** Insert or replace the assignment for a subject (one role per collaborator). */
export function upsertPermissionAssignment(
  assignments: PermissionAssignment[],
  next: PermissionAssignment,
): PermissionAssignment[] {
  const rest = assignments.filter((a) => a.subjectUserId !== next.subjectUserId && a.id !== next.id);
  return [...rest, next];
}

export function removePermissionAssignment(
  assignments: PermissionAssignment[],
  id: string,
): PermissionAssignment[] {
  return assignments.filter((a) => a.id !== id);
}

export function removeAssignmentsForRole(
  assignments: PermissionAssignment[],
  roleId: string,
): PermissionAssignment[] {
  return assignments.filter((a) => a.roleId !== roleId);
}

/**
 * Resolve a subject's role + matrix. Returns null when the subject has no assignment or the
 * referenced role is gone.
 *
 * Callers MUST distinguish the two null cases (see lib/permissions/resolve.ts):
 *   - roles.length === 0        → the collection hasn't synced yet; retry, don't lock out.
 *   - roles.length > 0 + a prior roleId → the owner revoked; write `permissions: {}`.
 * An empty matrix `{}` means locked out; `undefined` means unrestricted. Fail-open is the
 * deliberate default so a member is never accidentally locked out of their own bulle.
 */
export function resolvePermissionForSubject(
  roles: RoleDefinition[],
  assignments: PermissionAssignment[],
  subjectUserId: string,
): { role: RoleDefinition; matrix: PermissionMatrix } | null {
  const assignment = assignments.find((a) => a.subjectUserId === subjectUserId);
  if (!assignment) return null;
  const role = roles.find((r) => r.id === assignment.roleId);
  if (!role) return null;
  return { role, matrix: role.matrix };
}
