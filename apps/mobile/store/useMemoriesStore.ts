/**
 * Souvenirs — notes and moments.
 *
 * Same two-tier setter shape as the other synced stores: `setMemories` is PURE (hydrate +
 * remote-apply only), everything else goes through syncedSlice. Mixing them causes an
 * infinite sync echo — see lib/synced-slice.ts.
 */
import { create } from 'zustand';
import type { Memory } from '@bulle/sdk';
import { syncedSlice } from '@/lib/synced-slice';

export const MEMORIES_KEY = 'memories';

interface MemoriesState {
  memories: Memory[];

  /** PURE — hydrate / remote-apply only. Never notifies. */
  setMemories: (memories: Memory[]) => void;

  addMemory: (memory: Memory) => void;
  updateMemory: (id: string, updates: Partial<Memory>) => void;
  removeMemory: (id: string) => void;
}

export const useMemoriesStore = create<MemoriesState>((set, get) => {
  const memories = syncedSlice<Memory>(
    MEMORIES_KEY,
    () => get().memories,
    (items) => set({ memories: items }),
  );

  return {
    memories: [],
    setMemories: (items) => set({ memories: items }),
    addMemory: memories.add,
    updateMemory: memories.update,
    removeMemory: memories.remove,
  };
});
