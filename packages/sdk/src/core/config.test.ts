/**
 * configureBulle must seed the transport, register the KV adapter, then layer
 * bulleLayout. configureSpaces merges, so the adapter registered by configureKv
 * has to still be there after the layout call. Swapping those two calls changes
 * the recorded order below.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';

const calls = vi.hoisted(() => [] as string[]);

vi.mock('@drakkar.software/dk-spaces-sdk', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@drakkar.software/dk-spaces-sdk')>();
  return {
    ...actual,
    configureDKSpaces: vi.fn((cfg: Parameters<typeof actual.configureDKSpaces>[0]) => {
      calls.push('configureDKSpaces');
      actual.configureDKSpaces(cfg);
    }),
    configureKv: vi.fn((kv: Parameters<typeof actual.configureKv>[0]) => {
      calls.push('configureKv');
      actual.configureKv(kv);
    }),
  };
});

vi.mock('@drakkar.software/starfish-spaces', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@drakkar.software/starfish-spaces')>();
  return {
    ...actual,
    configureSpaces: vi.fn((opts: Parameters<typeof actual.configureSpaces>[0]) => {
      calls.push('configureSpaces');
      actual.configureSpaces(opts);
    }),
  };
});

import { configureDKSpaces, configureKv, getSyncNamespace } from '@drakkar.software/dk-spaces-sdk';
import { configureSpaces, getSpacesConfig } from '@drakkar.software/starfish-spaces';
import { configureBulle, DEFAULT_SYNC_NAMESPACE, type KvAdapter } from './config.js';
import { bulleLayout } from './layout.js';

const SYNC_BASE = 'https://sync.example.test';

function memoryKv(): KvAdapter {
  const store = new Map<string, string>();
  return {
    get: async (key) => store.get(key) ?? null,
    set: async (key, value) => {
      store.set(key, value);
    },
    remove: async (key) => {
      store.delete(key);
    },
  };
}

describe('configureBulle', () => {
  beforeEach(() => {
    calls.length = 0;
    vi.mocked(configureDKSpaces).mockClear();
    vi.mocked(configureKv).mockClear();
    vi.mocked(configureSpaces).mockClear();
  });

  it('resolves the sync namespace to dk', () => {
    expect(DEFAULT_SYNC_NAMESPACE).toBe('dk');
  });

  it('seeds the transport, registers the KV adapter, then layers bulleLayout', async () => {
    const kv = memoryKv();
    configureBulle({ syncBase: SYNC_BASE }, kv);

    // configureBulle's own three calls. configureKv registers the adapter through
    // the real configureSpaces, which merges, so that inner call is not listed.
    // Swapping configureKv and configureSpaces fails this assertion.
    expect(calls).toEqual(['configureDKSpaces', 'configureKv', 'configureSpaces']);

    expect(configureDKSpaces).toHaveBeenCalledTimes(1);
    expect(configureDKSpaces).toHaveBeenCalledWith({
      syncBase: SYNC_BASE,
      syncNamespace: DEFAULT_SYNC_NAMESPACE,
    });
    expect(getSyncNamespace()).toBe('dk');

    expect(configureKv).toHaveBeenCalledTimes(1);
    expect(configureKv).toHaveBeenCalledWith(kv);

    expect(configureSpaces).toHaveBeenCalledTimes(1);
    const layoutCall = vi.mocked(configureSpaces).mock.calls[0]?.[0];
    expect(Object.keys(layoutCall ?? {})).toEqual(['layout']);
    expect(layoutCall?.layout?.accountScope).toBe(bulleLayout().accountScope);
    expect(layoutCall?.layout?.linkedDeviceScope).toBe(bulleLayout().linkedDeviceScope);

    const registered = getSpacesConfig().kvAdapter;
    expect(registered).toBeDefined();
    if (!registered) {
      throw new Error('KV adapter was cleared when bulleLayout was applied');
    }
    await registered.setItem('probe', 'alive');
    await expect(kv.get('probe')).resolves.toBe('alive');
    expect(getSpacesConfig().layout).toBe(layoutCall?.layout);
  });
});
