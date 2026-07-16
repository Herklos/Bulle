/**
 * The content calendar. One article per day, in SEO-priority order.
 *
 * THIS ARRAY IS THE ENTIRE SCHEDULE. Index === day offset from
 * `BLOG_FIRST_PUBLISH_DATE`. There is no cron, no CMS, no database, and nothing is hidden
 * client-side: an unpublished article simply has no HTML file in `dist/`.
 *
 * Reordering the array reschedules everything after the moved slug.
 *
 * ⚠️ A build must run for an article to appear. Without a DAILY SCHEDULED BUILD (cron or a
 * GitHub Action), nothing ever releases. See scripts/generate-sitemap.mjs.
 */

const DAY_MS = 24 * 60 * 60 * 1000;

/** Day 0 of the calendar. The first article publishes on this date. */
export const BLOG_FIRST_PUBLISH_DATE = '2026-07-20';

function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return new Date(d.getTime() + days * DAY_MS).toISOString().slice(0, 10);
}

/**
 * Ordered by search intent, highest first. The early slugs are the ones that answer the
 * question a stressed future parent actually types at 11pm, and they are what the whole
 * site ranks on.
 *
 * Tier 1 — administrative panic (the highest-value, least-served queries in FR)
 * Tier 2 — the preparation decisions everyone hits
 * Tier 3 — buying guides, anti-overbuying angle
 * Tier 4 — the couple / partner angle nobody else covers
 * Tier 5 — privacy, which is our actual differentiator
 */
export const BLOG_PUBLISH_PRIORITY: string[] = [
  // ── Tier 1 — administratif ──
  'declaration-grossesse-demarches',
  'conge-maternite-paternite-dates',
  'choisir-inscrire-maternite',
  'mode-de-garde-quand-commencer',
  // ── Tier 2 — préparation ──
  'valise-maternite-liste',
  'checklist-avant-arrivee-bebe',
  // ── Tier 3 — achats ──
  'liste-naissance-vraiment-utile',
  'siege-auto-i-size-choisir',
  'seconde-main-bebe-oui-non',
  // ── Tier 4 — le couple ──
  'preparer-a-deux-repartir-charge',
  // ── Tier 5 — vie privée ──
  'applications-grossesse-donnees',
];

function buildPublishDates(): Record<string, string> {
  const dates: Record<string, string> = {};
  BLOG_PUBLISH_PRIORITY.forEach((slug, index) => {
    dates[slug] = addDays(BLOG_FIRST_PUBLISH_DATE, index);
  });
  return dates;
}

export const BLOG_PUBLISH_DATES: Record<string, string> = buildPublishDates();

/**
 * Slugs missing from the priority array are dated past the end of the queue — FAIL-CLOSED.
 * An article you forget to schedule is never published, rather than being published
 * immediately, which is the failure you actually want.
 */
export function getBlogPublishDate(slug: string): string {
  return BLOG_PUBLISH_DATES[slug] ?? addDays(BLOG_FIRST_PUBLISH_DATE, BLOG_PUBLISH_PRIORITY.length);
}

/** Last substantive content edit per slug → JSON-LD `dateModified` and sitemap `lastmod`. */
export const BLOG_CONTENT_UPDATED: Record<string, string> = {};

/**
 * The date the gate compares against. `BUILD_DATE` lets CI and tests pin it — which is what
 * makes "what does the site look like on day 30?" a checkable question rather than a guess.
 */
export function getBuildDate(): string {
  const raw = typeof process !== 'undefined' ? process.env.BUILD_DATE : undefined;
  if (raw && /^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  return new Date().toISOString().slice(0, 10);
}

/** Plain ISO string comparison — lexicographic order is chronological for YYYY-MM-DD. */
export function isBlogPostPublished(slug: string, asOf?: string): boolean {
  return getBlogPublishDate(slug) <= (asOf ?? getBuildDate());
}
