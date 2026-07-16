/**
 * The sync engine: build → dirty-diff → push, and hydrate → apply.
 *
 * Every guard in this file encodes a real, expensive bug. They are documented individually
 * because none of them is obvious from the code alone, and removing any one of them
 * produces silent data loss rather than a crash.
 */

import {
  asCollectionDoc,
  buildCollectionDoc,
  buildSingletonDoc,
  collectionNodeId,
  getNodeAccess,
  liveItems,
  mergeCollectionDoc,
  mergeSingletonDoc,
  objDocPull,
  objDocPush,
  readSingletonEntity,
  readObjectTree,
  stableStringify,
  updateObjectIndex,
  bulleRootDescriptor,
  collectionDescriptor,
  type Bulle,
  type CollectionEntity,
  type CollectionState,
  type Session,
} from '@bulle/sdk';
import { COLLECTIONS } from './collection-registry';
import { withIndexLock } from './index-lock';
import { getRootNodeId, getSession, getSpaceId, isSyncActive } from './starfish';
import { useBulleStore } from '@/store/useBulleStore';
import { useSyncAccessStore } from '@/store/useSyncAccessStore';

const PUSH_DEBOUNCE_MS = 2_000;

// ─── Dirty-tracking baselines ────────────────────────────────────────────────
// Committed ONLY after a confirmed push. Committing them on a failed push would mark dirty
// entities clean and lose the write permanently.

/** type → carried {rev, tombstones}. */
const _collectionState = new Map<string, CollectionState>();
/** entityId → last-folded JSON. The per-entity dirty check that decides rev bumps. */
const _collectionEntityJson = new Map<string, string>();
/** sentinel node id → last-pushed doc JSON, so unchanged collections are skipped. */
const _lastPushedCollectionJson = new Map<string, string>();
/** root node id → last-pushed singleton JSON. */
let _lastPushedBulleJson: string | null = null;

// ─── Race interlocks ─────────────────────────────────────────────────────────

let _isHydrating = false;
let _pushing = false;
let _pushTimer: ReturnType<typeof setTimeout> | null = null;

export function resetDirtyPushBaseline(): void {
  _collectionState.clear();
  _collectionEntityJson.clear();
  _lastPushedCollectionJson.clear();
  _lastPushedBulleJson = null;
}

// ─── Build ───────────────────────────────────────────────────────────────────

interface BuiltDoc {
  type: string;
  nodeId: string;
  doc: ReturnType<typeof buildCollectionDoc>['doc'];
  state: CollectionState;
}

function buildCollectionDocs(rootNodeId: string, now: number): BuiltDoc[] {
  const out: BuiltDoc[] = [];

  for (const collection of COLLECTIONS) {
    const entities = collection.read();
    const prev = _collectionState.get(collection.type) ?? { rev: {}, tombstones: {} };

    // Skip a collection that is empty AND has never been material. Once it HAS been
    // material, keep building it forever — otherwise a delete-everything would look like
    // "nothing to say" and the tombstones would never reach the peer.
    const everMaterial =
      entities.length > 0 ||
      Object.keys(prev.rev).length > 0 ||
      Object.keys(prev.tombstones).length > 0;
    if (!everMaterial) continue;

    const changedIds = new Set<string>();
    for (const entity of entities) {
      const json = stableStringify(entity);
      if (_collectionEntityJson.get(entity.id) !== json) {
        changedIds.add(entity.id);
        _collectionEntityJson.set(entity.id, json);
      }
    }

    const { doc, state } = buildCollectionDoc(entities, prev, changedIds, now);
    out.push({ type: collection.type, nodeId: collectionNodeId(collection.type, rootNodeId), doc, state });
  }

  return out;
}

// ─── Push ────────────────────────────────────────────────────────────────────

async function pushDoc(
  session: Session,
  spaceId: string,
  nodeId: string,
  type: string,
  mutate: (cur: unknown) => Record<string, unknown>,
): Promise<boolean> {
  try {
    const descriptor = collectionDescriptor(type, getRootNodeId() ?? '');
    const handle = await getNodeAccess(spaceId, nodeId, descriptor, session, null);
    await handle.push(
      objDocPull(spaceId, nodeId),
      objDocPush(spaceId, nodeId),
      (cur) => mutate(cur),
    );
    return true;
  } catch (error) {
    // A 403 is the AUTHORITATIVE "this cap cannot write" signal — more trustworthy than
    // any locally-cached permission matrix, which may be stale. Surface it so the UI can
    // stop offering edits, instead of letting the next hydrate silently revert them.
    if (isForbidden(error)) {
      useSyncAccessStore.getState().setWriteDenied(true);
    }
    console.warn(`[space-sync] push failed for ${nodeId}`, error);
    return false;
  }
}

function isForbidden(error: unknown): boolean {
  const status = (error as { status?: number } | null)?.status;
  return status === 403;
}

/**
 * Push everything dirty.
 *
 * ORDER IS LOAD-BEARING: content first, index second. A failed content push must never
 * leave the index advertising a node whose content was never written — a peer would then
 * read a node that does not exist.
 */
export async function pushSpaceSnapshot(): Promise<void> {
  const session = getSession();
  const spaceId = getSpaceId();
  const rootNodeId = getRootNodeId();
  if (!session || !spaceId || !rootNodeId || !isSyncActive()) return;

  _pushing = true;
  try {
    const now = Date.now();
    const built = buildCollectionDocs(rootNodeId, now);

    // ── Content ──
    const dirty = built.filter(
      (b) => stableStringify(b.doc) !== _lastPushedCollectionJson.get(b.nodeId),
    );

    const results = await Promise.allSettled(
      dirty.map(async (b) => {
        const ok = await pushDoc(session, spaceId, b.nodeId, b.type, (cur) =>
          mergeCollectionDoc(cur, b.doc, { now }) as unknown as Record<string, unknown>,
        );
        if (ok) {
          // Commit the baseline ONLY on success.
          _collectionState.set(b.type, b.state);
          _lastPushedCollectionJson.set(b.nodeId, stableStringify(b.doc));
        }
        return ok;
      }),
    );

    // ── The bulle singleton ──
    const bulle = useBulleStore.getState().bulle;
    if (bulle) {
      const json = stableStringify(bulle);
      if (json !== _lastPushedBulleJson) {
        const { doc } = buildSingletonDoc(rootNodeId, bulle as unknown as Record<string, unknown>, now);
        const ok = await pushDoc(session, spaceId, rootNodeId, 'bulle', (cur) =>
          mergeSingletonDoc(cur, doc, rootNodeId, { now }) as unknown as Record<string, unknown>,
        );
        if (ok) _lastPushedBulleJson = json;
      }
    }

    // ── Index ──
    const anyContentFailed = results.some((r) => r.status === 'fulfilled' && r.value === false);
    if (!anyContentFailed && bulle) {
      await withIndexLock(spaceId, async () => {
        await updateObjectIndex(session, spaceId, (nodes) => {
          const wanted = [
            bulleRootDescriptor(rootNodeId, bulle),
            ...COLLECTIONS.map((c) => collectionDescriptor(c.type, rootNodeId)),
          ];
          const byId = new Map(nodes.map((n) => [n.id, n]));
          let changed = false;
          for (const descriptor of wanted) {
            if (!byId.has(descriptor.id)) {
              byId.set(descriptor.id, { ...descriptor, order: 0, updatedAt: new Date(now).toISOString() } as never);
              changed = true;
            }
          }
          // Returning null skips the write entirely — the index CAS is not free.
          return changed ? [...byId.values()] : null;
        });
      });
    }
  } finally {
    _pushing = false;
  }
}

/**
 * Debounced push. Bails while hydrating.
 *
 * The `_isHydrating` check is repeated INSIDE the timer deliberately: hydration can start
 * after the timer was queued, and a push that fires mid-hydrate would send a half-applied
 * store.
 */
export function scheduleSyncPush(): void {
  if (_isHydrating) return;
  if (_pushTimer) clearTimeout(_pushTimer);
  _pushTimer = setTimeout(() => {
    _pushTimer = null;
    if (_isHydrating) return;
    void pushSpaceSnapshot();
  }, PUSH_DEBOUNCE_MS);
}

// ─── Hydrate ─────────────────────────────────────────────────────────────────

/**
 * Pull every collection from the space and feed the stores.
 *
 * Feeds ONLY via the pure setters (`collection.write`), so receiving a peer's change does
 * not schedule a push of what we just received. That echo is the single easiest way to
 * build an infinite sync loop.
 */
export async function hydrateFromSpace(): Promise<void> {
  const session = getSession();
  const spaceId = getSpaceId();
  const rootNodeId = getRootNodeId();
  if (!session || !spaceId || !rootNodeId) return;

  _isHydrating = true;
  try {
    await Promise.all(
      COLLECTIONS.map(async (collection) => {
        const nodeId = collectionNodeId(collection.type, rootNodeId);
        try {
          const descriptor = collectionDescriptor(collection.type, rootNodeId);
          const handle = await getNodeAccess(spaceId, nodeId, descriptor, session, null);
          const pulled = await handle.client.pull(objDocPull(spaceId, nodeId));
          const decrypted = handle.encryptor
            ? await handle.encryptor.decrypt(pulled.data as never)
            : pulled.data;
          const doc = asCollectionDoc(decrypted);

          // Seed the dirty baseline from what the server already has, so the first push
          // after boot only sends genuine local changes.
          _collectionState.set(collection.type, { rev: doc.rev, tombstones: doc.tombstones });
          _lastPushedCollectionJson.set(nodeId, stableStringify(doc));

          const { items } = collection.parse(liveItems(doc) as unknown[]);
          for (const item of items) _collectionEntityJson.set(item.id, stableStringify(item));
          if (items.length > 0) collection.write(items);
        } catch {
          // A collection that has never been pushed 404s. That is the normal first-run
          // state, not an error.
        }
      }),
    );

    // The bulle singleton.
    try {
      const descriptor = collectionDescriptor('bulle', rootNodeId);
      const handle = await getNodeAccess(spaceId, rootNodeId, descriptor, session, null);
      const pulled = await handle.client.pull(objDocPull(spaceId, rootNodeId));
      const decrypted = handle.encryptor
        ? await handle.encryptor.decrypt(pulled.data as never)
        : pulled.data;
      const { entity } = readSingletonEntity(decrypted, rootNodeId);
      if (entity) {
        useBulleStore.getState().setBulle(entity as unknown as Bulle);
        _lastPushedBulleJson = stableStringify(entity);
      }
    } catch {
      // Not yet pushed.
    }
  } finally {
    _isHydrating = false;
  }
}

/**
 * Pull, but only when nothing is in flight.
 *
 * `_pushing` is the subtle one. Without it, the "no push pending" check goes false the
 * instant the debounce timer fires — while the push is still awaiting the network. A
 * hydrate slipping into that window reseeds `_collectionState` from the PRE-push doc, so
 * the next build sees an entity it already pushed as missing, infers a delete, and
 * DURABLY TOMBSTONES it. The user's data disappears on every device, permanently.
 */
export function refreshFromSpaceIfIdle(): boolean {
  if (_isHydrating || _pushTimer || _pushing) return false;
  void hydrateFromSpace();
  return true;
}

/** Discover the owner's root node id — members don't know it until they read the tree. */
export async function discoverRootNodeId(session: Session, spaceId: string): Promise<string | null> {
  try {
    const nodes = await readObjectTree(session, spaceId);
    return nodes.find((n) => n.parentId === null && n.type === 'bulle')?.id ?? null;
  } catch {
    return null;
  }
}

/** Entities currently held, for debugging a divergence. */
export function debugSnapshot(): Record<string, CollectionEntity[]> {
  return Object.fromEntries(COLLECTIONS.map((c) => [c.key, c.read()]));
}
