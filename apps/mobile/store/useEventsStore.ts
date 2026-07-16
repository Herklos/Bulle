/**
 * Événements — appointments. The only datetime-bearing collection.
 *
 * Same two-tier setter shape as usePlanStore: `setEvents` is PURE (hydrate + remote-apply
 * only), everything else goes through syncedSlice. Mixing them causes an infinite sync echo.
 */
import { create } from 'zustand';
import type { BulleEvent } from '@bulle/sdk';
import { syncedSlice } from '@/lib/synced-slice';

export const EVENTS_KEY = 'events';

interface EventsState {
  events: BulleEvent[];

  /** PURE — hydrate / remote-apply only. Never notifies. */
  setEvents: (events: BulleEvent[]) => void;

  addEvent: (event: BulleEvent) => void;
  updateEvent: (id: string, updates: Partial<BulleEvent>) => void;
  removeEvent: (id: string) => void;
}

export const useEventsStore = create<EventsState>((set, get) => {
  const events = syncedSlice<BulleEvent>(
    EVENTS_KEY,
    () => get().events,
    (items) => set({ events: items }),
  );

  return {
    events: [],
    setEvents: (items) => set({ events: items }),
    addEvent: events.add,
    updateEvent: events.update,
    removeEvent: events.remove,
  };
});
