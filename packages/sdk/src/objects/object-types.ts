/**
 * Bulle ObjectNode type constants.
 *
 * starfish-spaces ships zero domain type strings; all app-specific type identifiers are
 * declared here and stored verbatim in `ObjectNode.type`.
 *
 * These values are PERSISTED IN THE INDEX. Never rename one — a rename orphans every node
 * already written under the old string on every device that has ever synced.
 */

import type { ObjectType } from '@drakkar.software/starfish-spaces';

export const BULLE_TYPES = {
  /** The bulle root — a singleton node, `parentId: null`. */
  bulle: 'bulle',
  project: 'project',
  task: 'task',
  member: 'member',
  permissionRole: 'permissionRole',
  permissionAssignment: 'permissionAssignment',
} as const satisfies Record<string, ObjectType>;

export type BulleObjectType = (typeof BULLE_TYPES)[keyof typeof BULLE_TYPES];

/**
 * Collections that sync as one doc per collection (everything except the root singleton).
 * Each gets a deterministic sentinel node `col:{type}:{rootNodeId}`.
 */
export const BULLE_COLLECTION_TYPES: BulleObjectType[] = [
  BULLE_TYPES.project,
  BULLE_TYPES.task,
  BULLE_TYPES.permissionRole,
  BULLE_TYPES.permissionAssignment,
];

/** Schema version stamped on the root node's `meta`, for future migrations. */
export const SYNC_SCHEMA_VERSION = 1;
