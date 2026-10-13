import { describe, expect, it } from 'vitest';
import { DEFAULT_PERMISSION_ROLES, resolvePermissionForSubject, upsertPermissionAssignment } from './permissions.js';
import type { PermissionAssignment, RoleDefinition } from './permissions.js';

const roles: RoleDefinition[] = DEFAULT_PERMISSION_ROLES.map((role) => ({
  ...role,
  createdAt: null,
  updatedAt: null,
}));

const assignment = (
  id: string,
  subjectUserId: string,
  roleId = 'role-famille',
): PermissionAssignment => ({
  id,
  subjectUserId,
  roleId,
  label: null,
  createdAt: null,
  updatedAt: null,
});

describe('upsertPermissionAssignment', () => {
  it('appends when the subject and the id are both new', () => {
    const existing = assignment('a1', 'subject-1');
    const next = assignment('a2', 'subject-2', 'role-doula');
    expect(upsertPermissionAssignment([existing], next)).toEqual([existing, next]);
  });

  it('replaces the assignment for the same subject, even when the id differs', () => {
    const existing = assignment('a1', 'subject-1', 'role-famille');
    const next = assignment('a2', 'subject-1', 'role-doula');
    expect(upsertPermissionAssignment([existing], next)).toEqual([next]);
  });

  it('replaces an assignment that reuses an id, even when the subject differs', () => {
    const existing = assignment('a1', 'subject-1');
    const next = assignment('a1', 'subject-2', 'role-doula');
    expect(upsertPermissionAssignment([existing], next)).toEqual([next]);
  });

  it('drops every prior row that shares the subject or the id, and keeps the rest', () => {
    const keep = assignment('keep', 'subject-keep');
    const sameSubject = assignment('old-subject', 'subject-1', 'role-famille');
    const sameId = assignment('a-next', 'subject-other');
    const next = assignment('a-next', 'subject-1', 'role-doula');
    expect(
      upsertPermissionAssignment([keep, sameSubject, sameId], next),
    ).toEqual([keep, next]);
  });
});

describe('resolvePermissionForSubject', () => {
  it('returns the role and its matrix when the assignment matches', () => {
    const result = resolvePermissionForSubject(
      roles,
      [assignment('a1', 'subject-1', 'role-famille')],
      'subject-1',
    );
    expect(result).toEqual({
      role: roles.find((role) => role.id === 'role-famille'),
      matrix: { shopping: 'view' },
    });
  });

  it('returns null when the subject has no assignment', () => {
    expect(resolvePermissionForSubject(roles, [], 'subject-1')).toBeNull();
  });

  it('returns null when the assignment points at a role that is not in the list', () => {
    expect(
      resolvePermissionForSubject(
        roles,
        [assignment('a1', 'subject-1', 'role-gone')],
        'subject-1',
      ),
    ).toBeNull();
  });

  it('returns null for an empty role list and for a missing assignment alike', () => {
    const assigned = [assignment('a1', 'subject-1', 'role-famille')];
    expect(resolvePermissionForSubject([], assigned, 'subject-1')).toBeNull();
    expect(resolvePermissionForSubject(roles, assigned, 'someone-else')).toBeNull();
  });
});
