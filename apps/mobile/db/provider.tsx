'use client';
/**
 * Per-bulle storage lifecycle.
 *
 * One KV file per bulle (`bulle_{uuid}.db`) means switching bulles is a storage swap, not a
 * filter. That gives hard isolation, and makes the swap the delicate part.
 */
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { closeStorage, getStorage, initStorage } from '@bulle/ui/utils/kv-storage';
import { useBulleTheme } from '@bulle/ui/theme';
import { clearAllStores, hydrateAllStores } from '@/lib/persistence';

const StorageContext = createContext<boolean>(false);
const SwitchingContext = createContext<boolean>(false);

/** Minimum overlay time, so a fast swap doesn't flash. */
const SWITCH_FLOOR_MS = 700;

export interface DatabaseProviderProps {
  dbFileName: string | null;
  children: React.ReactNode;
}

export function DatabaseProvider({ dbFileName, children }: DatabaseProviderProps) {
  const { colors } = useBulleTheme();
  const [loadedDbFileName, setLoadedDbFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const isFirstRunRef = useRef(true);

  /**
   * Derived DURING RENDER, not in an effect.
   *
   * An effect would set this one render too late, and the previous bulle's data would paint
   * for a frame under the new bulle's identity. Computing it here means the very render
   * that sees a new `dbFileName` already knows to cover.
   */
  const switching = !isFirstRunRef.current && !!dbFileName && dbFileName !== loadedDbFileName;

  useEffect(() => {
    if (!dbFileName) {
      setLoading(false);
      return;
    }
    if (dbFileName === loadedDbFileName) return;

    let cancelled = false;
    const startedAt = Date.now();

    void (async () => {
      closeStorage();
      clearAllStores();
      await initStorage(dbFileName);
      if (cancelled) return;
      hydrateAllStores();

      const elapsed = Date.now() - startedAt;
      if (elapsed < SWITCH_FLOOR_MS && !isFirstRunRef.current) {
        await new Promise((r) => setTimeout(r, SWITCH_FLOOR_MS - elapsed));
      }
      if (cancelled) return;

      isFirstRunRef.current = false;
      setLoadedDbFileName(dbFileName);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [dbFileName, loadedDbFileName]);

  const ready = !!getStorage() && !loading;

  return (
    <StorageContext.Provider value={ready}>
      <SwitchingContext.Provider value={switching}>
        <View style={{ flex: 1 }}>
          {children}
          {/*
            An OVERLAY, not a conditional unmount. Unmounting children makes expo-router
            remount <Stack> at its first-declared screen, which flashes onboarding on every
            bulle switch.
          */}
          {(switching || loading) && dbFileName && (
            <View
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: colors.bg,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ActivityIndicator color={colors.sage} />
            </View>
          )}
        </View>
      </SwitchingContext.Provider>
    </StorageContext.Provider>
  );
}

export function useDatabaseReady(): boolean {
  return useContext(StorageContext);
}

/**
 * True while the storage swap is in flight. `ActiveBulleRuntime` uses this to unmount every
 * initializer, so nothing runs against a torn-down store.
 */
export function useDatabaseSwitching(): boolean {
  return useContext(SwitchingContext);
}
