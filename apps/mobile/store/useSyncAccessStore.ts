/**
 * Session-only sync access flags. Never persisted.
 *
 * `writeDenied` is set from an actual 403 on a push — the AUTHORITATIVE signal that this
 * device's cap cannot write, regardless of what the local permission matrix claims.
 *
 * It guards a genuinely nasty failure: a member holding a stale read-only cap edits, the
 * push 403s silently, and the next hydrate's wholesale store replace reverts the edit with
 * no feedback at all. The user watches their work vanish and has no idea why. With this
 * flag the UI turns edit affordances off and says so.
 */
import { create } from 'zustand';

interface SyncAccessState {
  writeDenied: boolean;
  /** SSE stream health — NOT connectivity. Pushes work fine without SSE. */
  streamConnected: boolean;
  setWriteDenied: (denied: boolean) => void;
  setStreamConnected: (connected: boolean) => void;
  reset: () => void;
}

export const useSyncAccessStore = create<SyncAccessState>((set) => ({
  writeDenied: false,
  streamConnected: true,
  setWriteDenied: (writeDenied) => set({ writeDenied }),
  setStreamConnected: (streamConnected) => set({ streamConnected }),
  reset: () => set({ writeDenied: false, streamConnected: true }),
}));
