/**
 * Ensemble (spec §5.1) — what the other person has been doing.
 *
 * The point of the module is that preparing for a baby is shared work, and most of it is
 * invisible: your co-parent books the maternity ward while you are at work and you never
 * find out. Two lines on the home screen is the whole feature.
 *
 * What it deliberately is NOT: a feed, an activity log, or a leaderboard. It never counts
 * ("Alex: 12, toi: 4"), never ranks, and never says who is behind. Turning shared
 * preparation into a scoreboard between two people about to have a child would be the
 * single most damaging thing this screen could do.
 */
import type { Task } from './types.js';

const DAY = 24 * 60 * 60 * 1000;

export interface PartnerActivityOptions {
  /** This device's userId. Tasks stamped with it are mine and never appear here. */
  myUserId?: string;
  now: number;
  /** §5.1 caps Ensemble at 2 lines. */
  limit?: number;
  /** How far back to look. Older than this is history, not news. */
  windowDays?: number;
}

/**
 * Tasks resolved by someone else, most recent first.
 *
 * A task with no `completedBy` is treated as mine, not as a partner's — see the field's
 * doc comment. Same when `myUserId` is absent (sync off, so there is no partner at all).
 */
export function partnerActivity(tasks: Task[], options: PartnerActivityOptions): Task[] {
  const { myUserId, now, limit = 2, windowDays = 14 } = options;
  if (!myUserId) return [];
  const since = now - windowDays * DAY;

  return tasks
    .filter((t) => t.status !== 'todo')
    .filter((t) => t.completedBy !== undefined && t.completedBy !== myUserId)
    .filter((t) => {
      const at = Date.parse(t.updatedAt);
      // A malformed timestamp must not silently drop the row into the past or the future.
      return Number.isFinite(at) && at >= since && at <= now;
    })
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
    .slice(0, limit);
}
