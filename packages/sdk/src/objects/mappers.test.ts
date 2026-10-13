import { describe, expect, it } from 'vitest';
import type { Bulle, Task } from '../domain/types.js';
import { collectionNodeId } from '../sync/collection-doc.js';
import { bulleRootDescriptor, collectionDescriptor, taskTitle } from './mappers.js';
import { BULLE_TYPES, SYNC_SCHEMA_VERSION } from './object-types.js';

/**
 * Index labels stay labels. Appending notes, checklist lines, or details
 * onto taskTitle makes the assertion below fail.
 */

function task(over: Partial<Task> = {}): Task {
  return {
    id: 't1',
    projectId: 'p1',
    title: 'Rassembler les documents',
    weekStart: 28,
    weekEnd: 34,
    effort: 'S',
    domain: 'administratif',
    essential: true,
    status: 'todo',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    ...over,
  };
}

function bulle(over: Partial<Bulle> = {}): Bulle {
  return {
    id: 'b1',
    name: 'Notre bulle',
    profile: {
      dueDate: '2026-06-01T00:00:00.000Z',
      firstBaby: true,
      companionship: 'couple',
    },
    pause: { paused: false },
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    ...over,
  };
}

describe('taskTitle', () => {
  it('returns only the title when notes and a checklist are present', () => {
    const notes = 'Le dossier complet reste dans le document chiffré.';
    const itemLabel = 'Carte de groupe sanguin';
    const titled = task({
      title: 'Rassembler les documents',
      notes,
      details: ['Passeport', 'Livret de famille'],
      checklist: [{ id: 'c1', label: itemLabel, done: false }],
    });

    expect(taskTitle(titled)).toBe(titled.title);
    expect(taskTitle(titled)).not.toContain(notes);
    expect(taskTitle(titled)).not.toContain(itemLabel);
    expect(taskTitle(titled)).not.toContain('Livret de famille');

    const untitled = task({
      title: '',
      notes,
      checklist: [{ id: 'c1', label: itemLabel, done: true }],
    });
    expect(taskTitle(untitled)).toBe('');
  });
});

describe('collectionDescriptor', () => {
  it('keeps a stable id for the same type and root, and a different id across types', () => {
    const root = 'root-a';
    const first = collectionDescriptor(BULLE_TYPES.task, root);
    const again = collectionDescriptor(BULLE_TYPES.task, root);
    const otherType = collectionDescriptor(BULLE_TYPES.project, root);
    const otherRoot = collectionDescriptor(BULLE_TYPES.task, 'root-b');

    expect(first).toEqual(again);
    expect(first.id).toBe(collectionNodeId(BULLE_TYPES.task, root));
    expect(first.id).not.toBe(otherType.id);
    expect(first.id).not.toBe(otherRoot.id);
    expect(first).toEqual({
      id: collectionNodeId(BULLE_TYPES.task, root),
      type: BULLE_TYPES.task,
      parentId: root,
      title: BULLE_TYPES.task,
      meta: { collection: true },
      access: 'space',
      enc: true,
      contentKind: 'merge',
    });
  });
});

describe('bulleRootDescriptor', () => {
  it('carries syncSchemaVersion and stays encrypted and space-scoped', () => {
    const root = bulle();
    expect(bulleRootDescriptor('node-1', root)).toEqual({
      id: 'node-1',
      type: BULLE_TYPES.bulle,
      parentId: null,
      title: root.name,
      meta: { syncSchemaVersion: SYNC_SCHEMA_VERSION },
      access: 'space',
      enc: true,
      contentKind: 'merge',
    });
  });
});
