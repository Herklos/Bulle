import { describe, it, expect } from 'vitest';
import {
  mergeCollectionDoc,
  buildCollectionDoc,
  buildSingletonDoc,
  readSingletonEntity,
  mergeSingletonDoc,
  asCollectionDoc,
  liveItems,
  collectionNodeId,
  isCollectionNodeId,
  TOMBSTONE_TTL_MS,
  COLLECTION_DOC_FMT,
  type CollectionDoc,
  type CollectionState,
} from './collection-doc.js';

const doc = (partial: Partial<CollectionDoc>): CollectionDoc => ({
  fmt: COLLECTION_DOC_FMT,
  items: {},
  rev: {},
  tombstones: {},
  ...partial,
});

const entity = (id: string, extra: Record<string, unknown> = {}) => ({ id, ...extra });

describe('collectionNodeId / isCollectionNodeId', () => {
  it('builds a deterministic sentinel id and recognises it', () => {
    const id = collectionNodeId('task', 'bulle-1');
    expect(id).toBe('col:task:bulle-1');
    expect(isCollectionNodeId(id)).toBe(true);
    expect(isCollectionNodeId('some-task-uuid')).toBe(false);
  });
});

describe('asCollectionDoc', () => {
  it('coerces null / partial / unknown payloads to a well-formed doc', () => {
    expect(asCollectionDoc(null)).toEqual(doc({}));
    expect(asCollectionDoc(undefined)).toEqual(doc({}));
    expect(asCollectionDoc({ items: { t1: entity('t1') } })).toEqual(
      doc({ items: { t1: entity('t1') } }),
    );
    // An array or primitive is not a doc → empty doc.
    expect(asCollectionDoc([1, 2, 3])).toEqual(doc({}));
  });
});

describe('liveItems', () => {
  it('returns items minus tombstoned ids', () => {
    const d = doc({
      items: { t1: entity('t1'), t2: entity('t2') },
      rev: { t1: 1, t2: 1 },
      tombstones: { t2: 5 },
    });
    expect(liveItems(d).map((e) => e.id)).toEqual(['t1']);
  });
});

describe('mergeCollectionDoc — concurrent adds', () => {
  it('unions adds to different ids without clobbering', () => {
    const remote = doc({ items: { TA: entity('TA') }, rev: { TA: 10 } });
    const local = doc({ items: { TB: entity('TB') }, rev: { TB: 11 } });
    const out = mergeCollectionDoc(remote, local);
    expect(Object.keys(out.items).sort()).toEqual(['TA', 'TB']);
    expect(out.rev).toEqual({ TA: 10, TB: 11 });
  });

  it('a remote-only entity (peer add, not yet hydrated) survives a local push', () => {
    const remote = doc({ items: { PEER: entity('PEER') }, rev: { PEER: 7 } });
    const local = doc({ items: { MINE: entity('MINE') }, rev: { MINE: 8 } });
    const out = mergeCollectionDoc(remote, local);
    expect(out.items.PEER).toBeDefined();
    expect(out.items.MINE).toBeDefined();
  });
});

describe('mergeCollectionDoc — same-id edit LWW', () => {
  it('higher rev wins the conflicting leaf, regardless of argument order', () => {
    const remote = doc({ items: { t1: entity('t1', { title: 'Remote' }) }, rev: { t1: 20 } });
    const local = doc({ items: { t1: entity('t1', { title: 'Local' }) }, rev: { t1: 25 } });
    expect(mergeCollectionDoc(remote, local).items.t1.title).toBe('Local');
    expect(mergeCollectionDoc(local, remote).items.t1.title).toBe('Local');
  });

  it('field-merges untouched fields from the older copy under the newer one', () => {
    const remote = doc({ items: { t1: entity('t1', { a: 'fromRemote', shared: 'old' }) }, rev: { t1: 20 } });
    const local = doc({ items: { t1: entity('t1', { b: 'fromLocal', shared: 'new' }) }, rev: { t1: 25 } });
    const merged = mergeCollectionDoc(remote, local).items.t1;
    expect(merged).toMatchObject({ a: 'fromRemote', b: 'fromLocal', shared: 'new' });
  });

  it('one partner ticking a task does not revert the other partner\'s concurrent note', () => {
    // The real two-device case: A marks done, B adds a note, neither has seen the other.
    const fromA = doc({ items: { t1: entity('t1', { status: 'done', notes: '' }) }, rev: { t1: 30 } });
    const fromB = doc({ items: { t1: entity('t1', { status: 'todo', notes: 'acheté hier' }) }, rev: { t1: 31 } });
    const merged = mergeCollectionDoc(fromA, fromB).items.t1;
    expect(merged.notes).toBe('acheté hier');
    // B's copy is newer, so its `status` wins — LWW is per-entity, not per-field.
    expect(merged.status).toBe('todo');
  });
});

describe('mergeCollectionDoc — tombstones honored', () => {
  it('a stale peer copy does NOT resurrect a tombstoned id', () => {
    const remote = doc({ items: { t1: entity('t1') }, rev: { t1: 30 } });
    const local = doc({ tombstones: { t1: 40 } });
    const out = mergeCollectionDoc(remote, local);
    expect(out.items.t1).toBeUndefined();
    expect(out.tombstones.t1).toBe(40);
  });

  it('delete-vs-edit race: newer edit wins (edit after delete)', () => {
    const remote = doc({ items: { t1: entity('t1', { title: 'edited' }) }, rev: { t1: 100 } });
    const local = doc({ tombstones: { t1: 90 } });
    const out = mergeCollectionDoc(remote, local);
    expect(out.items.t1?.title).toBe('edited');
    expect(out.tombstones.t1).toBeUndefined();
  });

  it('delete-vs-edit race: newer delete wins (delete after edit)', () => {
    const remote = doc({ items: { t1: entity('t1', { title: 'edited' }) }, rev: { t1: 100 } });
    const local = doc({ tombstones: { t1: 110 } });
    const out = mergeCollectionDoc(remote, local);
    expect(out.items.t1).toBeUndefined();
    expect(out.tombstones.t1).toBe(110);
  });

  it('re-add after delete resurrects (live rev > tombstone)', () => {
    const remote = doc({ tombstones: { t1: 50 } });
    const local = doc({ items: { t1: entity('t1') }, rev: { t1: 100 } });
    const out = mergeCollectionDoc(remote, local);
    expect(out.items.t1).toBeDefined();
    expect(out.tombstones.t1).toBeUndefined();
  });

  it('add-wins on an exact rev/tombstone tie', () => {
    const remote = doc({ tombstones: { t1: 100 } });
    const local = doc({ items: { t1: entity('t1') }, rev: { t1: 100 } });
    expect(mergeCollectionDoc(remote, local).items.t1).toBeDefined();
  });
});

describe('mergeCollectionDoc — tombstone GC', () => {
  it('drops tombstones older than the TTL when `now` is supplied, keeps recent ones', () => {
    const now = 1_000_000_000_000;
    const remote = doc({
      tombstones: { old: now - TOMBSTONE_TTL_MS - 1, recent: now - 1000 },
    });
    const out = mergeCollectionDoc(remote, doc({}), { now });
    expect(out.tombstones.old).toBeUndefined();
    expect(out.tombstones.recent).toBe(now - 1000);
  });

  it('without `now`, keeps all tombstones (GC is opt-in)', () => {
    const remote = doc({ tombstones: { old: 1 } });
    expect(mergeCollectionDoc(remote, doc({})).tombstones.old).toBe(1);
  });
});

describe('mergeCollectionDoc — degenerate inputs', () => {
  it('handles a null / missing remote (first write)', () => {
    const local = doc({ items: { t1: entity('t1') }, rev: { t1: 5 } });
    expect(mergeCollectionDoc(null, local).items.t1).toBeDefined();
  });

  it('handles an unknown-shaped remote (no items/rev/tombstones keys)', () => {
    const local = doc({ items: { t1: entity('t1') }, rev: { t1: 5 } });
    expect(mergeCollectionDoc({ some: 'garbage' }, local).items.t1).toBeDefined();
  });

  it('output never contains non-finite numbers', () => {
    const local = doc({ items: { t1: entity('t1') } }); // rev intentionally missing
    const out = mergeCollectionDoc(null, local);
    expect(Number.isFinite(out.rev.t1)).toBe(true);
    expect(JSON.stringify(out)).toContain('"t1"'); // serialisable, no Infinity
  });
});

describe('buildCollectionDoc', () => {
  const empty: CollectionState = { rev: {}, tombstones: {} };

  it('stamps a fresh rev for a new entity', () => {
    const { doc: d, state } = buildCollectionDoc([entity('t1')], empty, new Set(), 1000);
    expect(d.items.t1).toBeDefined();
    expect(d.rev.t1).toBe(1000);
    expect(state.rev.t1).toBe(1000);
  });

  it('carries the prior rev for an unchanged entity', () => {
    const prev: CollectionState = { rev: { t1: 500 }, tombstones: {} };
    const { doc: d } = buildCollectionDoc([entity('t1')], prev, new Set(), 1000);
    expect(d.rev.t1).toBe(500); // not bumped — not in changedIds
  });

  it('bumps rev for a changed entity', () => {
    const prev: CollectionState = { rev: { t1: 500 }, tombstones: {} };
    const { doc: d } = buildCollectionDoc([entity('t1', { title: 'new' })], prev, new Set(['t1']), 1000);
    expect(d.rev.t1).toBe(1000);
  });

  it('tombstones an entity that disappeared from the store', () => {
    const prev: CollectionState = { rev: { t1: 500, t2: 500 }, tombstones: {} };
    const { doc: d } = buildCollectionDoc([entity('t1')], prev, new Set(), 1000);
    expect(d.items.t2).toBeUndefined();
    expect(d.tombstones.t2).toBe(1000);
    expect(d.rev.t2).toBeUndefined();
  });

  it('drops a prior tombstone when the entity is re-added', () => {
    const prev: CollectionState = { rev: {}, tombstones: { t1: 500 } };
    const { doc: d } = buildCollectionDoc([entity('t1')], prev, new Set(), 1000);
    expect(d.items.t1).toBeDefined();
    expect(d.tombstones.t1).toBeUndefined();
    expect(d.rev.t1).toBe(1000);
  });

  it('GCs tombstones older than the TTL', () => {
    const now = 1_000_000_000_000;
    const prev: CollectionState = {
      rev: {},
      tombstones: { stale: now - TOMBSTONE_TTL_MS - 1, fresh: now - 1 },
    };
    const { doc: d } = buildCollectionDoc([], prev, new Set(), now);
    expect(d.tombstones.stale).toBeUndefined();
    expect(d.tombstones.fresh).toBe(now - 1);
  });

  it('a build then a merge round-trips a delete safely against a stale remote', () => {
    // Device deletes t2 locally.
    const prev: CollectionState = { rev: { t1: 500, t2: 500 }, tombstones: {} };
    const { doc: local } = buildCollectionDoc([entity('t1')], prev, new Set(), 1000);
    // Remote still has both (peer hasn't seen the delete).
    const remote = doc({ items: { t1: entity('t1'), t2: entity('t2') }, rev: { t1: 500, t2: 500 } });
    const merged = mergeCollectionDoc(remote, local);
    expect(merged.items.t1).toBeDefined();
    expect(merged.items.t2).toBeUndefined(); // stays deleted
    expect(merged.tombstones.t2).toBe(1000);
  });
});

describe('buildSingletonDoc / readSingletonEntity', () => {
  it('wraps the entity as a 1-item doc keyed by the NODE id, not entity.id', () => {
    const { doc: d, rev } = buildSingletonDoc('node-1', entity('local-row-7', { name: 'Notre bulle' }), 1000);
    expect(rev).toBe(1000);
    expect(d.items['node-1']).toEqual(entity('local-row-7', { name: 'Notre bulle' }));
    expect(d.rev['node-1']).toBe(1000);
    expect(d.tombstones).toEqual({});
  });

  it('round-trips through readSingletonEntity', () => {
    const { doc: d } = buildSingletonDoc('node-1', { id: 'node-1', name: 'Notre bulle' }, 42);
    const { entity: e, rev } = readSingletonEntity(d, 'node-1');
    expect(e).toEqual({ id: 'node-1', name: 'Notre bulle' });
    expect(rev).toBe(42);
  });

  it('returns null entity for null/non-record input', () => {
    expect(readSingletonEntity(null, 'node-1').entity).toBeNull();
    expect(readSingletonEntity(undefined, 'node-1').entity).toBeNull();
  });

  it('falls back to the first item when the id key mismatches', () => {
    const d = doc({ items: { other: entity('other', { name: 'X' }) }, rev: { other: 7 } });
    const { entity: e, rev } = readSingletonEntity(d, 'node-1');
    expect(e).toEqual(entity('other', { name: 'X' }));
    expect(rev).toBe(7);
  });

  it('returns null for a doc with wrapper keys but a malformed items value', () => {
    expect(readSingletonEntity({ fmt: 1, items: 'not-a-record' }, 'node-1').entity).toBeNull();
  });

  it('returns null for an UNWRAPPED raw entity', () => {
    // wedding-os tolerates this shape (legacy pre-migration docs + hybrid docs written by
    // old builds mid-rollout). Bulle is greenfield and wraps the singleton from day one,
    // so an unwrapped doc can never legitimately exist and is treated as absent rather
    // than silently adopted. This test pins that deliberate divergence.
    expect(readSingletonEntity({ id: 'node-1', name: 'raw' }, 'node-1').entity).toBeNull();
  });
});

describe('mergeSingletonDoc', () => {
  it('higher-rev wins while the older side\'s untouched field survives', () => {
    // A edits the name (rev 20); B edits the due date (rev 25), concurrently.
    const remote = doc({
      items: { 'node-1': entity('node-1', { name: 'Notre bulle' }) },
      rev: { 'node-1': 20 },
    });
    const { doc: local } = buildSingletonDoc('node-1', { id: 'node-1', dueDate: '2026-09-01' }, 25);
    const merged = mergeSingletonDoc(remote, local, 'node-1').items['node-1'];
    expect(merged).toMatchObject({ name: 'Notre bulle', dueDate: '2026-09-01' });
  });

  it('handles a null/missing remote (first-ever push)', () => {
    const { doc: local } = buildSingletonDoc('node-1', { id: 'node-1', name: 'New' }, 10);
    expect(mergeSingletonDoc(null, local, 'node-1').items['node-1']).toMatchObject({ name: 'New' });
  });

  it('never tombstones the singleton', () => {
    const remote = doc({ items: { 'node-1': entity('node-1') }, rev: { 'node-1': 5 } });
    const { doc: local } = buildSingletonDoc('node-1', { id: 'node-1', name: 'New' }, 10);
    expect(mergeSingletonDoc(remote, local, 'node-1').tombstones).toEqual({});
  });
});
