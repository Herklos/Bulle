/**
 * Souvenirs (spec §5) — what you keep.
 *
 * The whole module is a reverse-chronological list and a week stamp. That is deliberate:
 * Souvenirs is the one place in Bulle with no engine behind it. Nothing here suggests,
 * ranks, reminds, or scores. A memory is not a task, and the moment it acquires a
 * completion state or a nudge ("you have not written this week") it stops being a keepsake
 * and becomes another thing to fall behind on.
 */
import { currentWeekSA } from './pregnancy.js';
import type { Memory } from './types.js';

/** Newest first — the way anyone reads back a journal. */
export function sortMemories(memories: Memory[]): Memory[] {
  return [...memories].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

/** Memories stamped with a given week SA, for the Chemin. */
export function memoriesForWeek(memories: Memory[], weekSA: number): Memory[] {
  return sortMemories(memories.filter((m) => m.week === weekSA));
}

/**
 * A one-line preview for a list row.
 *
 * Falls back to the body when there is no title, because a title is optional and a row
 * reading "Note" tells you nothing about which note it is.
 */
export function memoryPreview(memory: Memory, maxLength = 80): string {
  const source = (memory.title?.trim() || memory.body?.trim()) ?? '';
  const flat = source.replace(/\s+/g, ' ').trim();
  return flat.length > maxLength ? `${flat.slice(0, maxLength - 1).trimEnd()}…` : flat;
}

/** A memory with neither a title nor a body is not worth storing. */
export function isMemoryEmpty(memory: Pick<Memory, 'title' | 'body'>): boolean {
  return !memory.title?.trim() && !memory.body?.trim();
}

/**
 * Stamp `createdAt` / `week` from a calendar day the user picked (today or past).
 *
 * Week is **SA** (semaines d'aménorrhée), same scale as the Chemin and Aujourd'hui. Stamping
 * SG here used to show "Semaine 18" while the rest of the app said "Semaine 20" — off by
 * two, and unlabelled, so it read as broken.
 *
 * Date pickers hand local midnight. In positive UTC offsets that is the previous UTC day,
 * which can drop the stamp across a week boundary. Anchor on the local Y-M-D at UTC noon,
 * then clamp to `now`. `now` is injected so tests stay deterministic.
 */
export interface MemoryDateStamp {
  createdAt: string;
  updatedAt: string;
  /** Week SA. */
  week: number;
}

/** Local calendar day of `date`, as UTC noon ms — week math must not depend on midnight TZ. */
export function calendarDayUtcNoon(date: Date): number {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
}

export function stampMemoryFromDate(
  dueDate: string,
  picked: Date,
  now: number,
): MemoryDateStamp {
  const dayMs = calendarDayUtcNoon(picked);
  const clamped = Math.min(dayMs, now);
  const iso = new Date(clamped).toISOString();
  return {
    createdAt: iso,
    updatedAt: iso,
    week: currentWeekSA(dueDate, clamped),
  };
}
