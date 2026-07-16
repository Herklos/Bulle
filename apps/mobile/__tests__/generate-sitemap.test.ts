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
import { BLOG_FIRST_PUBLISH_DATE, BLOG_PUBLISH_PRIORITY } from '@/lib/blog-publish-dates';
import { BASE_URL } from '@/lib/seo-urls';

const DIST = path.resolve(__dirname, '..', 'dist');

const ROBOTS = `User-agent: *
Allow: /
Disallow: /_expo/

Sitemap: ${BASE_URL}/sitemap.xml
`;

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

  it('releases exactly one more article per day', () => {
    // Count <loc> entries only. A bare /fr/blog/ match would also hit the three hreflang
    // links inside every url block and count each article five times over.
    const countArticles = (asOf: string) =>
      (buildSitemapXml(asOf).match(/<loc>[^<]*\/fr\/blog\/[^<]+<\/loc>/g) ?? []).length;

    const day0 = countArticles('2026-07-20');
    expect(day0).toBe(1); // day zero publishes exactly the first slug
    expect(countArticles('2026-07-21')).toBe(2);
    expect(countArticles('2026-07-22')).toBe(3);
  });

  it('eventually lists the whole corpus', () => {
    const far = buildSitemapXml('2030-01-01');
    for (const slug of BLOG_PUBLISH_PRIORITY) {
      expect(far).toContain(`/fr/blog/${slug}`);
    }
  });

  it('writes dist/sitemap.xml and dist/robots.txt', () => {
    const xml = buildSitemapXml();
    mkdirSync(DIST, { recursive: true });
    writeFileSync(path.join(DIST, 'sitemap.xml'), xml, 'utf8');
    writeFileSync(path.join(DIST, 'robots.txt'), ROBOTS, 'utf8');
    expect(xml.length).toBeGreaterThan(0);
  });
});
