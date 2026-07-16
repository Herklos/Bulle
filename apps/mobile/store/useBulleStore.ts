/**
 * The bulle root — a SINGLETON (the pregnancy itself: profile, pause state).
 *
 * Synced as a 1-item collection doc so it gets per-entity rev LWW rather than a whole-object
 * clobber when both parents edit at once (see @bulle/sdk's buildSingletonDoc).
 */
import { create } from 'zustand';
import type { Bulle, BulleProfile, PauseState } from '@bulle/sdk';
import { getStorage, writeCollection } from '@bulle/ui/utils/kv-storage';
import { notifySync } from '@/lib/starfish';

export const BULLE_KEY = 'bulle';

interface BulleState {
  bulle: Bulle | null;

  /** PURE — hydrate / remote-apply only. */
  setBulle: (bulle: Bulle | null) => void;

  /** set → persist → notifySync. */
  saveBulle: (bulle: Bulle) => void;
  updateProfile: (updates: Partial<BulleProfile>) => void;
  setPause: (pause: PauseState) => void;
}

function persist(bulle: Bulle | null) {
  if (getStorage()) writeCollection(BULLE_KEY, bulle);
  notifySync();
}

export const useBulleStore = create<BulleState>((set, get) => ({
  bulle: null,

  setBulle: (bulle) => set({ bulle }),

  saveBulle: (bulle) => {
    set({ bulle });
    persist(bulle);
  },

  updateProfile: (updates) => {
    const current = get().bulle;
    if (!current) return;
    const next: Bulle = {
      ...current,
      profile: { ...current.profile, ...updates },
      updatedAt: new Date().toISOString(),
    };
    set({ bulle: next });
    persist(next);
  },

  setPause: (pause) => {
    const current = get().bulle;
    if (!current) return;
    const next: Bulle = { ...current, pause, updatedAt: new Date().toISOString() };
    set({ bulle: next });
    persist(next);
  },
}));
