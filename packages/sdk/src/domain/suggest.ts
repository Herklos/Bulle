/**
 * Suggestion engine (spec §5.9) — `(week, profile, project states) → ranked suggestions`.
 *
 * DETERMINISTIC RULES, ZERO LLM. This is a design decision, not a shortcut: it is cheap,
 * offline, predictable, has no hallucination surface, and — the part that actually matters —
 * no medical-liability surface. The engine schedules *preparation*, never care (§7.3).
 * An opt-in, corpus-grounded Q&A is a V2 concern and does not belong here.
 *
 * Pure: no clock, no store, no globals.
 */

import { isInWindow, isUpcoming } from './tasks.js';
import type { BulleProfile, Task } from './types.js';

export interface FocusOptions {
  /** Current week SA. */
  weekSA: number;
  /**
   * Tasks deferred via "Plus tard" THIS SESSION. Never persisted — see tasks.ts. Without
   * this the engine would deterministically re-offer the task the user just dismissed.
   */
  excludeIds?: ReadonlySet<string>;
}

/** Lower sorts first. */
function focusRank(task: Task, weekSA: number): number {
  // 1. Essential beats optional — the readiness denominator is what the couple is judged
  //    against, so never spend the single focus slot on a "nice to have".
  const essential = task.essential ? 0 : 1;
  // 2. In-window beats not-yet-open. A lingering task (window closed, still todo) ranks
  //    alongside in-window rather than being pushed away — quietly persistent, never red.
  const timing = isInWindow(task, weekSA) ? 0 : isUpcoming(task, weekSA) ? 2 : 1;
  // 3. Short effort first — the one-next-action screen should be answerable now.
  const effort = { S: 0, M: 1, L: 2 }[task.effort];
  return essential * 100 + timing * 10 + effort;
}

/**
 * The single task for the home Focus card (§5.1). Returns null when there is genuinely
 * nothing to do — the caller must then show the caught-up empty state and NOT manufacture
 * busywork ("Tout est calme pour cette semaine").
 */
export function suggestFocus(tasks: Task[], opts: FocusOptions): Task | null {
  const excludeIds = opts.excludeIds;
  const candidates = tasks.filter(
    (t) => t.status === 'todo' && !(excludeIds?.has(t.id) ?? false),
  );
  if (candidates.length === 0) return null;

  return candidates.reduce((best, task) => {
    const d = focusRank(task, opts.weekSA) - focusRank(best, opts.weekSA);
    // Tie-break on id so the choice is stable across renders — a focus card that reshuffles
    // on every re-render reads as broken.
    return d < 0 || (d === 0 && task.id < best.id) ? task : best;
  });
}

/** This week's essentials for the "Cette semaine" module (§5.1) — at most 3, by design. */
export function weekEssentials(tasks: Task[], weekSA: number, limit = 3): Task[] {
  return tasks
    .filter((t) => t.status === 'todo' && t.essential && isInWindow(t, weekSA))
    .sort((a, b) => focusRank(a, weekSA) - focusRank(b, weekSA) || a.id.localeCompare(b.id))
    .slice(0, limit);
}

/** A template Bulle proposes because its window is opening and it isn't instantiated yet. */
export interface TemplateSuggestion {
  templateId: string;
  /** The week the template's earliest task opens — why we're proposing it now. */
  opensAtWeek: number;
}

/**
 * Templates worth proposing at `weekSA`: not already instantiated, and whose first window
 * opens within the lookahead. Surfaces ONLY in the home focus slot and week cards (§5.9) —
 * never as a notification, never as a badge.
 *
 * `gentle` profiles (§3.2 — high-risk / bed rest) get a shorter lookahead, so the app
 * proposes less far ahead rather than piling future work onto someone told to rest.
 */
export function suggestTemplates(
  available: { id: string; tasks: { weekStart: number }[] }[],
  instantiatedTemplateIds: ReadonlySet<string>,
  weekSA: number,
  profile: BulleProfile,
): TemplateSuggestion[] {
  const lookahead = profile.gentle ? 2 : 4;
  return available
    .filter((t) => !instantiatedTemplateIds.has(t.id))
    .map((t) => ({
      templateId: t.id,
      opensAtWeek: Math.min(...t.tasks.map((task) => task.weekStart)),
    }))
    .filter((s) => s.opensAtWeek <= weekSA + lookahead)
    .sort((a, b) => a.opensAtWeek - b.opensAtWeek || a.templateId.localeCompare(b.templateId));
}
