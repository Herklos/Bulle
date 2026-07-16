/**
 * The registry store. Device-local, never synced (see lib/bulle-registry.ts).
 *
 * Every action follows: mutate SecureStore → reload → `set({ registry })`. Reloading rather
 * than patching in place keeps the store and the durable copy from drifting.
 */
import { create } from 'zustand';
import { randomId } from '@bulle/sdk';
import {
  activeEntry,
  dbFileNameFor,
  loadRegistry,
  saveRegistry,
  type BulleRegistry,
  type BulleRegistryEntry,
} from '@/lib/bulle-registry';

interface BulleRegistryState {
  registry: BulleRegistry | null;
  isLoaded: boolean;
  load: () => Promise<void>;
  createBulle: (input: {
    label: string;
    seedPhrase?: string;
    spaceId?: string;
    role?: 'owner' | 'member';
    rootNodeId?: string;
    inviteSubjectId?: string;
    syncNamespace?: string;
  }) => Promise<BulleRegistryEntry>;
  updateBulle: (id: string, updates: Partial<BulleRegistryEntry>) => Promise<void>;
  switchBulle: (id: string) => Promise<void>;
  deleteBulle: (id: string) => Promise<void>;
}

export const useBulleRegistryStore = create<BulleRegistryState>((set, get) => ({
  registry: null,
  isLoaded: false,

  load: async () => {
    const registry = await loadRegistry();
    set({ registry, isLoaded: true });
  },

  createBulle: async (input) => {
    const id = randomId();
    const entry: BulleRegistryEntry = {
      id,
      label: input.label,
      dbFileName: dbFileNameFor(id),
      seedPhrase: input.seedPhrase,
      spaceId: input.spaceId,
      syncNamespace: input.syncNamespace,
      // Persisted ATOMICALLY with spaceId: a member whose role lands in a later write
      // would, in the gap, look like an owner and run owner-only provisioning against a
      // space it does not own.
      role: input.role ?? 'owner',
      rootNodeId: input.rootNodeId,
      inviteSubjectId: input.inviteSubjectId,
      createdAt: new Date().toISOString(),
    };

    const current = get().registry ?? { activeBulleId: null, bulles: [] };
    const next: BulleRegistry = {
      activeBulleId: id,
      bulles: [...current.bulles, entry],
    };
    await saveRegistry(next);
    set({ registry: next });
    return entry;
  },

  updateBulle: async (id, updates) => {
    const current = get().registry;
    if (!current) return;
    const next: BulleRegistry = {
      ...current,
      bulles: current.bulles.map((b) => (b.id === id ? { ...b, ...updates } : b)),
    };
    await saveRegistry(next);
    set({ registry: next });
  },

  switchBulle: async (id) => {
    const current = get().registry;
    if (!current) return;
    const next: BulleRegistry = { ...current, activeBulleId: id };
    await saveRegistry(next);
    set({ registry: next });
  },

  deleteBulle: async (id) => {
    const current = get().registry;
    if (!current) return;
    const bulles = current.bulles.filter((b) => b.id !== id);
    const next: BulleRegistry = {
      bulles,
      activeBulleId: current.activeBulleId === id ? (bulles[0]?.id ?? null) : current.activeBulleId,
    };
    await saveRegistry(next);
    set({ registry: next });
  },
}));

/** The active entry, or null. */
export function useActiveBulle(): BulleRegistryEntry | null {
  return useBulleRegistryStore((s) => activeEntry(s.registry));
}
