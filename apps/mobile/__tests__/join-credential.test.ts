/**
 * Regression tests for the space-invite credential persistence bugs. Ported from
 * wedding-os, where both shipped and together made joining silently useless: a joiner
 * ended up in the bulle with no key, so they saw an empty app and no sync, with no error
 * anywhere.
 *
 * Bug A: the SDK config never called `configureSpaceAccessStore`, so the access store's KV
 *   was undefined and `persist()` was a silent no-op. Credentials lived only in a volatile
 *   in-memory cache and evaporated on reload.
 *
 * Bug B: `joinSpaceByLink` writes the credential under the store's CURRENT active key. If
 *   the identity is not pinned first, member-boot's `hydrateSpaceAccessStore(newUserId)`
 *   sees an identity change, resets the cache, and wipes the entry before anything can
 *   decrypt with it.
 *
 * Bulle's lib/join-space.ts is written to avoid both (`hydrateSpaceAccessStore(userId)`
 * runs BEFORE `joinSpaceByLink`), and the plan calls that ordering load-bearing. These
 * tests are what make it stay that way: the order looks arbitrary, reads like boilerplate,
 * and is the kind of line a tidy-up moves.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  configureSpaceAccessStore,
  hydrateSpaceAccessStore,
  saveSpaceAccessEntry,
  getSpaceAccessEntry,
  clearSpaceAccessStore,
} from '@bulle/sdk';

function makeKv() {
  const store = new Map<string, string>();
  return {
    getItem: vi.fn(async (key: string) => store.get(key) ?? null),
    setItem: vi.fn(async (key: string, value: string) => {
      store.set(key, value);
    }),
    removeItem: vi.fn(async (key: string) => {
      store.delete(key);
    }),
    store,
  };
}

const SPACE_ID = 'sp-testspace001';
const OLD_USER = 'a'.repeat(32);
const NEW_USER = 'b'.repeat(32);

const linkEntry = () => ({
  kind: 'link' as const,
  cap: {},
  key: 'e'.repeat(64),
  kemPriv: 'f'.repeat(64),
  kemPub: 'a'.repeat(64),
  write: true,
});

let kv: ReturnType<typeof makeKv>;

// Reset the module-global cache and rewire KV per test, or they leak into each other.
beforeEach(() => {
  clearSpaceAccessStore();
  kv = makeKv();
  configureSpaceAccessStore({ kvAdapter: kv });
});

describe('configureSpaceAccessStore — KV wiring (Bug A)', () => {
  it('persists a link credential to KV once an adapter is configured', async () => {
    await hydrateSpaceAccessStore(NEW_USER, {}, {});
    await saveSpaceAccessEntry(SPACE_ID, linkEntry());

    // Without the adapter this wrote nowhere and failed silently.
    expect(kv.setItem).toHaveBeenCalled();
    expect([...kv.store.keys()].some((k) => k.includes(NEW_USER))).toBe(true);
  });

  it('reads the credential back after a fresh hydrate, as a reload would', async () => {
    await hydrateSpaceAccessStore(NEW_USER, {}, {});
    await saveSpaceAccessEntry(SPACE_ID, linkEntry());

    // Simulate a restart: drop the in-memory cache, keep the KV.
    clearSpaceAccessStore();
    configureSpaceAccessStore({ kvAdapter: kv });
    await hydrateSpaceAccessStore(NEW_USER, {}, {});

    expect(await getSpaceAccessEntry(SPACE_ID)).toMatchObject({ kind: 'link' });
  });
});

describe('identity must be pinned before saving (Bug B)', () => {
  it('keeps the credential when hydrate is called again for the SAME user', async () => {
    // This is the order lib/join-space.ts uses: hydrate(newUserId) → join → save.
    await hydrateSpaceAccessStore(NEW_USER, {}, {});
    await saveSpaceAccessEntry(SPACE_ID, linkEntry());

    // Member-boot re-hydrates for the same identity. No change, so no reset.
    await hydrateSpaceAccessStore(NEW_USER, {}, {});
    expect(await getSpaceAccessEntry(SPACE_ID)).toMatchObject({ kind: 'link' });
  });

  it('loses the credential when it was saved under a DIFFERENT identity', async () => {
    // The bug, reproduced: save while the store still points at the previous user, then
    // boot as the joiner. The entry was written to the wrong bucket and is simply not there.
    await hydrateSpaceAccessStore(OLD_USER, {}, {});
    await saveSpaceAccessEntry(SPACE_ID, linkEntry());

    await hydrateSpaceAccessStore(NEW_USER, {}, {});
    expect(await getSpaceAccessEntry(SPACE_ID)).toBeFalsy();
  });

  it('keeps each identity credentials separate', async () => {
    await hydrateSpaceAccessStore(OLD_USER, {}, {});
    await saveSpaceAccessEntry(SPACE_ID, linkEntry());

    await hydrateSpaceAccessStore(NEW_USER, {}, {});
    await saveSpaceAccessEntry(SPACE_ID, { ...linkEntry(), key: 'c'.repeat(64) });

    // Going back to the first identity must still find ITS entry, not the joiner's.
    await hydrateSpaceAccessStore(OLD_USER, {}, {});
    expect(await getSpaceAccessEntry(SPACE_ID)).toMatchObject({ key: 'e'.repeat(64) });
  });
});
