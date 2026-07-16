/**
 * Pure entity ↔ ObjectNode mapping helpers.
 *
 * The PII rule — the reason this file exists at all:
 * - `ObjectNode.title` — a displayable label. The index is member-gated and space-private,
 *   so it is safe for the couple's own data, but it is the WIDEST-read surface in the
 *   model: keep it to a label, never a note or a document body.
 * - `ObjectNode.meta` — NON-PII foreign keys only, for tree traversal (projectId, …).
 * - objdoc content — the FULL domain entity including everything sensitive, E2EE under the
 *   space keyring.
 *
 * All Bulle domain nodes are `access:'space', enc:true, contentKind:'merge'` — there is no
 * public/plaintext surface in this app at all (unlike wedding-os' guest page). Pregnancy
 * data is GDPR Art. 9 special-category; nothing here is ever written in the clear.
 */

import { BULLE_TYPES, SYNC_SCHEMA_VERSION } from './object-types.js';
import { collectionNodeId } from '../sync/collection-doc.js';
import type { Bulle, Project, Task } from '../domain/types.js';

/** Index-level node descriptor (passed to `updateObjectIndex`). */
export interface NodeDescriptor {
  id: string;
  type: string;
  parentId: string | null;
  title: string;
  meta?: Record<string, unknown>;
  access?: 'public' | 'space' | 'invite';
  enc?: boolean;
  contentKind?: 'merge' | 'append' | 'none';
}

/** Every Bulle domain node shares these — encrypted, space-scoped, mergeable. */
const SPACE_ENC = {
  access: 'space',
  enc: true,
  contentKind: 'merge',
} as const satisfies Partial<NodeDescriptor>;

/** The bulle root node. `parentId: null` — every other node hangs off it. */
export function bulleRootDescriptor(nodeId: string, bulle: Bulle): NodeDescriptor {
  return {
    id: nodeId,
    type: BULLE_TYPES.bulle,
    parentId: null,
    title: bulle.name,
    meta: { syncSchemaVersion: SYNC_SCHEMA_VERSION },
    ...SPACE_ENC,
  };
}

/**
 * The sentinel node standing in for a whole collection. Deterministic, so every device
 * derives the same id without an index lookup and two devices creating it concurrently
 * converge instead of duplicating.
 */
export function collectionDescriptor(type: string, rootNodeId: string): NodeDescriptor {
  return {
    id: collectionNodeId(type, rootNodeId),
    type,
    parentId: rootNodeId,
    title: type,
    meta: { collection: true },
    ...SPACE_ENC,
  };
}

/** Project label for the index. */
export function projectTitle(project: Project): string {
  return project.title;
}

/**
 * Task label for the index. Titles are user-authored and can carry anything, so this is the
 * one place worth being cautious: the full task (notes, checklist) lives in the encrypted
 * objdoc, and only the title reaches the index.
 */
export function taskTitle(task: Task): string {
  return task.title;
}
