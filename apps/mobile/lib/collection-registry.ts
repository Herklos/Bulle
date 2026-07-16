/**
 * The collection registry — ONE descriptor per synced collection.
 *
 * In wedding-os, adding a collection means editing six places (persistence.ts ×3,
 * space-sync.ts ×3, plus the store), and the sync path re-lists every collection three
 * times over with `as unknown as` casts that discard exactly the type safety this restores.
 *
 * Here, `hydrateAllStores` / `clearAllStores` / `collectionSources` / the hydrate fan-out /
 * the store-feeding step are all `for (const c of COLLECTIONS)` loops. Adding a collection
 * is adding one entry below.
 */

import {
  BULLE_TYPES,
  DEFAULT_PERMISSION_ROLES,
  eventSchema,
  memorySchema,
  parseCollection,
  projectSchema,
  taskSchema,
  type CollectionEntity,
} from '@bulle/sdk';
import { z } from 'zod';
import { usePlanStore, PROJECTS_KEY, TASKS_KEY } from '@/store/usePlanStore';
import { usePermissionsStore, ASSIGNMENTS_KEY, ROLES_KEY } from '@/store/usePermissionsStore';
import { useEventsStore, EVENTS_KEY } from '@/store/useEventsStore';
import { useMemoriesStore, MEMORIES_KEY } from '@/store/useMemoriesStore';

/**
 * `read`/`write` are intentionally separate fields rather than a single store reference:
 * `write` MUST be the store's pure setter, so the hydrate path can feed a collection
 * without triggering the mutator's notifySync (which would echo straight back out).
 */
export interface CollectionDef<T extends { id: string }> {
  /** KV key AND the identity used for dirty-tracking. */
  key: string;
  /** ObjectNode type — drives the `col:{type}:{rootId}` sentinel. */
  type: string;
  read: () => T[];
  /** The PURE setter. Never a mutator. */
  write: (items: T[]) => void;
  /** Validates rows arriving from a peer; bad ones are dropped, not thrown. */
  parse: (rows: unknown[]) => { items: T[]; dropped: number };
  /** Seeded when the collection is empty after a hydrate. */
  defaults?: () => T[];
}

// The permission-role schema lives here rather than in the SDK because the SDK's
// RoleDefinition is a plain interface (roles are code-defined, not user content) and this
// is the only place that needs to validate one off the wire.
const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  isSystem: z.boolean(),
  tier: z.enum(['app-cosmetic', 'app-readonly', 'app-scoped', 'web-view', 'app-crypto']),
  matrix: z.record(z.string(), z.enum(['view', 'edit'])),
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
});

const assignmentSchema = z.object({
  id: z.string(),
  subjectUserId: z.string(),
  roleId: z.string(),
  label: z.string().nullable(),
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
});

export const COLLECTIONS: CollectionDef<CollectionEntity>[] = [
  {
    key: PROJECTS_KEY,
    type: BULLE_TYPES.project,
    read: () => usePlanStore.getState().projects as unknown as CollectionEntity[],
    write: (items) => usePlanStore.getState().setProjects(items as never),
    parse: (rows) => parseCollection(projectSchema, rows) as never,
  },
  {
    key: TASKS_KEY,
    type: BULLE_TYPES.task,
    read: () => usePlanStore.getState().tasks as unknown as CollectionEntity[],
    write: (items) => usePlanStore.getState().setTasks(items as never),
    parse: (rows) => parseCollection(taskSchema, rows) as never,
  },
  {
    key: EVENTS_KEY,
    type: BULLE_TYPES.event,
    read: () => useEventsStore.getState().events as unknown as CollectionEntity[],
    write: (items) => useEventsStore.getState().setEvents(items as never),
    parse: (rows) => parseCollection(eventSchema, rows) as never,
  },
  {
    key: MEMORIES_KEY,
    type: BULLE_TYPES.memory,
    read: () => useMemoriesStore.getState().memories as unknown as CollectionEntity[],
    write: (items) => useMemoriesStore.getState().setMemories(items as never),
    parse: (rows) => parseCollection(memorySchema, rows) as never,
  },
  {
    key: ROLES_KEY,
    type: BULLE_TYPES.permissionRole,
    read: () => usePermissionsStore.getState().roles as unknown as CollectionEntity[],
    write: (items) => usePermissionsStore.getState().setRoles(items as never),
    parse: (rows) => parseCollection(roleSchema, rows) as never,
    // Seeded so an owner has roles to assign the first time they invite someone.
    defaults: () =>
      DEFAULT_PERMISSION_ROLES.map((r) => ({
        ...r,
        createdAt: null,
        updatedAt: null,
      })) as unknown as CollectionEntity[],
  },
  {
    key: ASSIGNMENTS_KEY,
    type: BULLE_TYPES.permissionAssignment,
    read: () => usePermissionsStore.getState().assignments as unknown as CollectionEntity[],
    write: (items) => usePermissionsStore.getState().setAssignments(items as never),
    parse: (rows) => parseCollection(assignmentSchema, rows) as never,
  },
];

export function collectionByType(type: string): CollectionDef<CollectionEntity> | undefined {
  return COLLECTIONS.find((c) => c.type === type);
}
