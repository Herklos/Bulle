/**
 * Souvenirs (spec §5) — what you keep.
 *
 * The whole module is a reverse-chronological list and a week stamp. That is deliberate:
 * Souvenirs is the one place in Bulle with no engine behind it. Nothing here suggests,
 * ranks, reminds, or scores. A memory is not a task, and the moment it acquires a
 * completion state or a nudge ("you have not written this week") it stops being a keepsake
 * and becomes another thing to fall behind on.
 */
import { currentWeekSG } from './pregnancy.js';
import type { Memory } from './types.js';

/** Newest first — the way anyone reads back a journal. */
export function sortMemories(memories: Memory[]): Memory[] {
  return [...memories].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

/** Memories stamped with a given gestational week, for the Chemin. */
export function memoriesForWeek(memories: Memory[], week: number): Memory[] {
  return sortMemories(memories.filter((m) => m.week === week));
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
 * Future dates clamp to `now`: the picker sets `maximumDate`, but a peer or a clock skew
 * must not invent a gestational week that has not happened yet. `now` is injected so tests
 * stay deterministic.
 */
export interface MemoryDateStamp {
  createdAt: string;
  updatedAt: string;
  week: number;
}

export function stampMemoryFromDate(
  dueDate: string,
  picked: Date,
  now: number,
): MemoryDateStamp {
  const clamped = Math.min(picked.getTime(), now);
  const iso = new Date(clamped).toISOString();
  return {
    createdAt: iso,
    updatedAt: iso,
    week: currentWeekSG(dueDate, clamped),
  };
}
