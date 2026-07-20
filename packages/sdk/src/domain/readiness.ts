/**
 * The readiness model — "la Bulle" (spec §6).
 *
 *   readiness = |E resolved| / |E|      where E = the profile's ESSENTIAL tasks
 *   resolved  = completed OR explicitly dismissed ("pas pour nous")
 *
 * Three rules make this honest rather than gamified:
 *  1. Optional tasks NEVER enter the denominator. Adding a custom task marks it optional
 *     unless flagged essential — so a user can never lower their own score by planning more.
 *  2. Dismissed counts as resolved. Respecting "not for us" is what keeps the score
 *     monotonic and truthful instead of punishing a deliberate choice.
 *  3. The score never visibly regresses, except on a profile change (due-date edit, twins
 *     discovered) — and then it reports a reason so the UI can explain rather than drop
 *     silently. Monotonicity is enforced against a caller-persisted snapshot, not inferred.
 *
 * Pure: no Date.now(), no storage, no React.
 */

import { READINESS_DOMAINS, type BulleProfile, type ReadinessDomain, type Task } from './types.js';

/** Per-domain tally. */
export interface DomainReadiness {
  resolved: number;
  total: number;
  /** 0..1; 0 when the domain has no essential tasks. */
  fill: number;
}

/**
 * The persisted high-water mark. The caller stores this and passes it back next time; that
 * is what makes monotonicity a property of the *display* rather than a hidden mutation of
 * the underlying tasks.
 */
export interface ReadinessSnapshot {
  fill: number;
  profileKey: string;
}

export interface Readiness {
  /** 0..1 — what the orb renders. Monotonic within a profile. */
  fill: number;
  /** The un-held value, for debugging and for the numeric detail view. */
  rawFill: number;
  resolved: number;
  total: number;
  byDomain: Record<ReadinessDomain, DomainReadiness>;
  /** i18n key for the phrase shown under the orb. */
  phraseKey: string;
  /** Set only when the profile changed AND the score dropped — the UI must explain it. */
  regressionReason?: 'profile-changed';
  /** Persist this and pass it back as `previous` next time. */
  snapshot: ReadinessSnapshot;
}

/**
 * Identity of the inputs that change the essential set E. A change here legitimises a drop.
 * Deliberately excludes `sensitive` (a copy/tone flag) — it doesn't alter which tasks are
 * essential, so toggling it must not license a regression.
 */
export function profileKey(profile: BulleProfile): string {
  return [
    profile.dueDate,
    profile.firstBaby ? 'first' : 'again',
    profile.companionship,
    profile.multiples ? 'multi' : 'single',
    profile.gentle ? 'gentle' : 'standard',
  ].join('|');
}

function phraseFor(total: number, fill: number): string {
  if (total === 0) return 'readiness.empty';
  if (fill >= 1) return 'readiness.ready';
  if (fill >= 0.9) return 'readiness.nearly';
  if (fill >= 0.6) return 'readiness.wellUnderway';
  if (fill >= 0.25) return 'readiness.forming';
  return 'readiness.starting';
}

const isResolved = (t: Task): boolean => t.status === 'done' || t.status === 'dismissed';

/**
 * Compute readiness from the current tasks.
 *
 * @param tasks    every task in the bulle (optional ones are filtered out here, not by the caller)
 * @param profile  the current profile — its key gates whether a drop is allowed
 * @param previous the snapshot returned by the last call, if any
 */
export function computeReadiness(
  tasks: Task[],
  profile: BulleProfile,
  previous?: ReadinessSnapshot,
): Readiness {
  const essential = tasks.filter((t) => t.essential);

  const byDomain = Object.fromEntries(
    READINESS_DOMAINS.map((d) => [d, { resolved: 0, total: 0, fill: 0 }]),
  ) as Record<ReadinessDomain, DomainReadiness>;

  for (const task of essential) {
    const bucket = byDomain[task.domain];
    if (!bucket) continue;
    bucket.total += 1;
    if (isResolved(task)) bucket.resolved += 1;
  }
  for (const d of READINESS_DOMAINS) {
    const b = byDomain[d];
    b.fill = b.total === 0 ? 0 : b.resolved / b.total;
  }

  const total = essential.length;
  const resolved = essential.filter(isResolved).length;
  const rawFill = total === 0 ? 0 : resolved / total;

  const key = profileKey(profile);
  const sameProfile = previous !== undefined && previous.profileKey === key;

  let fill = rawFill;
  let regressionReason: Readiness['regressionReason'];

  if (previous !== undefined && rawFill < previous.fill) {
    if (sameProfile) {
      // Hold the high-water mark: within one profile the score must never visibly regress.
      fill = previous.fill;
    } else {
      // The essential set itself changed — a drop is legitimate, but it must be explained.
      regressionReason = 'profile-changed';
    }
  }

  return {
    fill,
    rawFill,
    resolved,
    total,
    byDomain,
    phraseKey: phraseFor(total, fill),
    regressionReason,
    snapshot: { fill, profileKey: key },
  };
}

/**
 * The one "Vous êtes prêts" gate (spec §6) — the second and last confetti-grade moment in
 * the whole product. Scarcity is what makes it land, so this is deliberately strict:
 * from week 36, with the three make-or-break domains fully resolved.
 */
export function isFullyPrepared(readiness: Readiness, gestationalWeek: number): boolean {
  if (gestationalWeek < 36) return false;
  const gates: ReadinessDomain[] = ['sante', 'administratif', 'maison'];

  /*
    Every gated domain the bulle ACTUALLY HAS must be complete, and at least two of the
    three must be present.

    The old rule demanded `total > 0` on all three, which made the moment structurally
    unreachable outside France rather than merely hard to earn. `sante` tasks exist only in
    tpl-admin-fr and tpl-decisions, both `countries: ['FR']`, so no universal template
    produces a single one. A bulle in Brussels or an EN bulle could therefore resolve every
    task it had ever been offered and still be told, forever, that it was not ready — judged
    against templates it was never shown.

    Two-of-three rather than one-of-three is what keeps the moment scarce. A bulle holding a
    lone done `sante` task has not prepared for anything, and celebrating that would cheapen
    the second of only two confetti-grade moments in the product. Outside France the pair
    that carries it is `maison` and `administratif`, both of which the universal valise and
    nid templates do produce.
  */
  const MIN_GATED_DOMAINS = 2;
  const present = gates.filter((d) => readiness.byDomain[d].total > 0);
  if (present.length < MIN_GATED_DOMAINS) return false;
  return present.every((d) => readiness.byDomain[d].fill >= 1);
}
