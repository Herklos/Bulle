'use client';
/**
 * Runtime initializers for the ACTIVE bulle.
 *
 * Everything here is keyed on the active bulle and is unmounted for the duration of a bulle
 * switch (see ActiveBulleRuntime in app/_layout.tsx) — sync globals are module-level, so a
 * subscription or an in-flight push surviving a swap would act on the wrong bulle.
 */
import React, { useEffect } from 'react';
import { AppState } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {
  buildAuthHeaders,
  getSpaceAccessEntry,
  registerPull,
  subscribeSpaceChanges,
} from '@bulle/sdk';
import type { BulleRegistryEntry } from './bulle-registry';
import { deriveSessionFromPhrase } from './identity';
import { initSync, teardownSync, isSyncActive } from './starfish';
import {
  discoverRootNodeId,
  hydrateFromSpace,
  refreshFromSpaceIfIdle,
  resetDirtyPushBaseline,
  scheduleSyncPush,
} from './space-sync';
import { useSyncAccessStore } from '@/store/useSyncAccessStore';

/** Single-flighted per bulle, so boot and a settings toggle can't both activate at once. */
const _activating = new Map<string, Promise<void>>();

async function activateSync(bulle: BulleRegistryEntry): Promise<void> {
  const existing = _activating.get(bulle.id);
  if (existing) return existing;

  const promise = (async () => {
    if (!bulle.seedPhrase) return;

    const session = await deriveSessionFromPhrase(bulle.seedPhrase);
    const spaceId = bulle.spaceId;
    if (!spaceId) return;

    // Members don't know the owner's root node id until they read the tree; owners are
    // their own root.
    const rootNodeId =
      bulle.role === 'owner'
        ? bulle.id
        : (bulle.rootNodeId ?? (await discoverRootNodeId(session, spaceId)));
    if (!rootNodeId) return;

    initSync({ session, spaceId, rootNodeId });

    // A stored link entry with `write: false` is a reliable positive — act on it before the
    // first 403 rather than after a failed edit. A `member` entry carries no `write` field,
    // which is ambiguous rather than permissive, so it is left to the 403 path in
    // space-sync.ts to decide.
    const access = getSpaceAccessEntry(spaceId);
    if (access?.kind === 'link' && access.write === false) {
      useSyncAccessStore.getState().setWriteDenied(true);
    }
  })();

  _activating.set(bulle.id, promise);
  try {
    await promise;
  } finally {
    _activating.delete(bulle.id);
  }
}

export function SyncInitializer({ bulle }: { bulle: BulleRegistryEntry }) {
  useEffect(() => {
    let cancelled = false;
    let unsubSse: (() => void) | undefined;
    let unregisterPush: (() => void) | undefined;
    let unsubNet: (() => void) | undefined;

    if (isSyncActive()) {
      teardownSync();
      // Baselines are keyed by node id; a stale one would make the next push believe fresh
      // content was already sent.
      resetDirtyPushBaseline();
    }
    useSyncAccessStore.getState().reset();

    // Sync is entirely optional. No seed phrase = a purely local bulle, fully functional.
    if (!bulle.seedPhrase || bulle.syncDisabled || !bulle.spaceId) return;

    void (async () => {
      try {
        await activateSync(bulle);
        if (cancelled || !isSyncActive()) return;

        // Opened BEFORE the hydrate await: a peer edit landing during a slow boot would
        // otherwise be missed entirely until the next foreground.
        unsubSse = subscribeSpaceChanges(
          (event) => {
            if (event.spaceId !== bulle.spaceId) return;
            refreshFromSpaceIfIdle();
          },
          {
            spaces: [bulle.spaceId!],
            authHeaders: async (method, pathAndQuery) => {
              const { getSession } = await import('./starfish');
              const session = getSession();
              if (!session) return {};
              return buildAuthHeaders(session.contentCap, session.keys.edPriv, method, pathAndQuery);
            },
            onStatus: (connected) =>
              useSyncAccessStore.getState().setStreamConnected(connected),
          },
        );

        await hydrateFromSpace();
        if (cancelled) return;

        // THE line that connects every store mutation to the network.
        unregisterPush = registerPull('*', () => {
          scheduleSyncPush();
          return true;
        });

        /**
         * Retry on reconnect.
         *
         * This does not exist in wedding-os, and its absence is a real hole: offline, a push
         * throws, gets console.warn'd, and NOTHING retries. Durability is fine (the KV write
         * already happened), but convergence is not — a user who edits on a plane, closes
         * the app, and never edits again simply never syncs until a future cold boot.
         * Reconnecting is exactly when we know a retry is worth attempting.
         */
        unsubNet = NetInfo.addEventListener((state) => {
          if (state.isConnected && state.isInternetReachable !== false) scheduleSyncPush();
        });
      } catch (error) {
        console.warn('[sync] activation failed', error);
      }
    })();

    const appStateSub = AppState.addEventListener('change', (status) => {
      if (status === 'active') refreshFromSpaceIfIdle();
    });

    return () => {
      cancelled = true;
      appStateSub.remove();
      unregisterPush?.();
      unsubSse?.();
      unsubNet?.();
    };
  }, [bulle]);

  return null;
}
