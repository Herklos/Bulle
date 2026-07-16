/**
 * Events — the ONLY datetime-bearing entity in the model.
 *
 * Everything else lives on week-windows, deliberately (§4.2): a task that "reschedules
 * itself" when the due date is corrected is the whole point. But an appointment is a real
 * commitment to a real person at a real time, and pretending otherwise would be worse than
 * useless — it is the one thing a pregnant person genuinely cannot afford to be vague about.
 *
 * Pure: `now` is injected, never read from the clock here.
 */

import type { BulleEvent } from './types.js';

const DAY_MS = 24 * 60 * 60 * 1000;

/** Chronological. */
export function sortEvents(events: BulleEvent[]): BulleEvent[] {
  return [...events].sort((a, b) => a.at.localeCompare(b.at));
}

/** Still ahead of `now`. */
export function upcomingEvents(events: BulleEvent[], now: number): BulleEvent[] {
  return sortEvents(events.filter((e) => new Date(e.at).getTime() >= now));
}

/**
 * The "À venir" module (§5.1). At most 2, by design — the home screen answers "what now?",
 * and a full calendar there would turn it back into the backlog it exists to avoid.
 */
export function nextEvents(events: BulleEvent[], now: number, limit = 2): BulleEvent[] {
  return upcomingEvents(events, now).slice(0, limit);
}

/**
 * The gestational week (SA) an event falls in, from the due date.
 *
 * The inverse of `weeksSA`: an appointment carries a real datetime, and the Chemin speaks
 * weeks, so something has to translate. Floor, to match `currentWeekSA` — an event 3 days
 * into week 12 is in week 12, not "12.4".
 */
export function eventWeekSA(event: BulleEvent, dueDate: string, dpaWeeksSA: number): number {
  const daysUntilDue = (new Date(dueDate).getTime() - new Date(event.at).getTime()) / DAY_MS;
  return Math.floor(dpaWeeksSA - daysUntilDue / 7);
}

/** Events falling in a given gestational week, chronological. */
export function eventsInWeek(
  events: BulleEvent[],
  weekSA: number,
  dueDate: string,
  dpaWeeksSA: number,
): BulleEvent[] {
  return sortEvents(events.filter((e) => eventWeekSA(e, dueDate, dpaWeeksSA) === weekSA));
}

/** Whole days from `now` until the event. 0 = today, 1 = tomorrow. */
export function daysUntilEvent(event: BulleEvent, now: number): number {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const at = new Date(event.at);
  at.setHours(0, 0, 0, 0);
  return Math.round((at.getTime() - start.getTime()) / DAY_MS);
}

/** Today, in the user's local timezone. */
export function isToday(event: BulleEvent, now: number): boolean {
  return daysUntilEvent(event, now) === 0;
}

// ─── Pure reducers ───────────────────────────────────────────────────────────

export function addEvent(events: BulleEvent[], event: BulleEvent): BulleEvent[] {
  return [...events, event];
}

export function updateEvent(
  events: BulleEvent[],
  id: string,
  updates: Partial<BulleEvent>,
  now: string,
): BulleEvent[] {
  return events.map((e) => (e.id === id ? { ...e, ...updates, updatedAt: now } : e));
}

export function removeEvent(events: BulleEvent[], id: string): BulleEvent[] {
  return events.filter((e) => e.id !== id);
}
