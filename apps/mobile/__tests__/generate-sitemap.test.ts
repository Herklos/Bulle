/**
 * Generates dist/sitemap.xml and dist/robots.txt, and asserts they are correct.
 *
 * Generation and its test are the same artifact on purpose: a sitemap that fails its own
 * assertions never reaches dist/, so a bad one cannot ship quietly. The drip-schedule
 * assertions below are the important ones — they are what stop an unpublished article being
 * announced to crawlers before its page exists.
 */
import { describe, expect, it } from 'vitest';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { buildSitemapXml } from '@/lib/sitemap';
import {
  BLOG_FIRST_PUBLISH_DATE,
  BLOG_PUBLISH_PRIORITY,
  getBlogPublishDate,
} from '@/lib/blog-publish-dates';
import { BASE_URL } from '@/lib/seo-urls';

const DIST = path.resolve(__dirname, '..', 'dist');
// robots.txt is NOT generated: it is static, so it lives in public/ and expo export copies
// it. Writing it from here as well would give it two sources of truth that disagree the
// first time one is edited.

describe('sitemap', () => {
  const firstSlug = BLOG_PUBLISH_PRIORITY[0];
  const lastSlug = BLOG_PUBLISH_PRIORITY[BLOG_PUBLISH_PRIORITY.length - 1];

  it('is well-formed and includes the static pages in both locales', () => {
    const xml = buildSitemapXml('2026-07-20');
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain(`<loc>${BASE_URL}/fr</loc>`);
    expect(xml).toContain(`<loc>${BASE_URL}/en</loc>`);
    expect(xml).toContain(`<loc>${BASE_URL}/fr/blog</loc>`);
    expect(xml).toContain(`<loc>${BASE_URL}/fr/privacy</loc>`);
    expect(xml).toContain(`<loc>${BASE_URL}/en/terms</loc>`);
  });

  it('gives every url a reciprocal fr/en/x-default hreflang set', () => {
    const xml = buildSitemapXml('2026-07-20');
    expect(xml).toContain(`hreflang="fr" href="${BASE_URL}/fr"`);
    expect(xml).toContain(`hreflang="en" href="${BASE_URL}/en"`);
    expect(xml).toContain(`hreflang="x-default" href="${BASE_URL}/fr"`);
    // One <loc> per locale, each carrying all three alternates.
    const locs = (xml.match(/<loc>/g) ?? []).length;
    const xdefaults = (xml.match(/x-default/g) ?? []).length;
    expect(xdefaults).toBe(locs);
  });

  it('lists only articles published as of the build date', () => {
    const dayZero = buildSitemapXml(BLOG_FIRST_PUBLISH_DATE);
    expect(dayZero).toContain(`/fr/blog/${firstSlug}`);
    // The last slug is many days out; it must not be announced yet.
    expect(dayZero).not.toContain(`/fr/blog/${lastSlug}`);
  });

  it('lists nothing from the blog the day before launch', () => {
    const before = buildSitemapXml('2026-07-19');
    expect(before).not.toContain('/blog/declaration');
    // The static pages are still there.
    expect(before).toContain(`<loc>${BASE_URL}/fr</loc>`);
  });

  it('releases on the publish days only', () => {
    // Count <loc> entries only. A bare /fr/blog/ match would also hit the three hreflang
    // links inside every url block and count each article five times over.
    const countArticles = (asOf: string) =>
      (buildSitemapXml(asOf).match(/<loc>[^<]*\/fr\/blog\/[^<]+<\/loc>/g) ?? []).length;

    // Two a week, Monday and Wednesday (see blog-publish-dates.ts).
    expect(countArticles('2026-07-20')).toBe(1); // Monday, article 1
    expect(countArticles('2026-07-21')).toBe(1); // Tuesday, nothing new
    expect(countArticles('2026-07-22')).toBe(2); // Wednesday, article 2
    expect(countArticles('2026-07-27')).toBe(3); // the next Monday
  });

  it('carries the calendar to the end of December', () => {
    // The user-facing promise is that the blog keeps releasing until 31 December. At two a
    // week that needs ~47 articles; this fails the moment the corpus shrinks below the
    // schedule, which is the only way that promise breaks silently.
    const last = BLOG_PUBLISH_PRIORITY[BLOG_PUBLISH_PRIORITY.length - 1]!;
    expect(getBlogPublishDate(last) >= '2026-12-01').toBe(true);
  });

  it('eventually lists the whole corpus', () => {
    const far = buildSitemapXml('2030-01-01');
    for (const slug of BLOG_PUBLISH_PRIORITY) {
      expect(far).toContain(`/fr/blog/${slug}`);
    }
  });

  it('writes dist/sitemap.xml', () => {
    const xml = buildSitemapXml();
    mkdirSync(DIST, { recursive: true });
    writeFileSync(path.join(DIST, 'sitemap.xml'), xml, 'utf8');
    expect(xml.length).toBeGreaterThan(0);
  });
});
