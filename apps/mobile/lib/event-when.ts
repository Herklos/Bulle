/**
 * The date/time arithmetic shared by creating an event and editing one.
 *
 * In its own module rather than exported from `app/event/new.tsx`: a route file is a screen,
 * and importing one from another route couples two screens through expo-router's tree for
 * the sake of two five-line functions. It also makes `new.tsx` unable to ever become a
 * platform-split file without dragging `[id].tsx` into the resolution (see
 * components/due-date.ts for what that costs).
 */
import type { EventKind } from '@bulle/sdk';

/** The kinds that matter in a French pregnancy. `autre` catches everything else. */
export const EVENT_KINDS: EventKind[] = ['echo', 'consultation', 'prepa', 'admin', 'autre'];

/** A week out at 09:00 — near enough to be plausible, never today. */
export function defaultEventAt(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  d.setHours(9, 0, 0, 0);
  return d;
}

/**
 * Take the calendar day from `from`, keep the clock time already chosen.
 *
 * The split exists because the date and the time are picked in separate steps, and each
 * picker hands back a WHOLE Date: the date step's value carries midnight, the time step's
 * carries today. Assigning either wholesale silently discards the other half.
 */
export function withDate(at: Date, from: Date): Date {
  const d = new Date(at);
  d.setFullYear(from.getFullYear(), from.getMonth(), from.getDate());
  return d;
}

/** Take the clock time from `from`, keep the calendar day already chosen. */
export function withTime(at: Date, from: Date): Date {
  const d = new Date(at);
  d.setHours(from.getHours(), from.getMinutes(), 0, 0);
  return d;
}
