/**
 * sitemap.xml.
 *
 * Every URL is emitted ONCE PER LOCALE, each carrying the full fr/en/x-default hreflang
 * triple. That reciprocity is the part search engines actually check: a page claiming an
 * alternate that does not claim it back is ignored.
 *
 * The publish gate applies here too (§ blog-publish-dates) — a future article must not be
 * announced in the sitemap before its HTML exists, or crawlers bank a 404.
 */

import { BLOG_CONTENT_UPDATED, getBuildDate, getBlogPublishDate, isBlogPostPublished } from './blog-publish-dates';
import { getBlogSlugs } from './blog';
import { BLOG_AUTHORS } from './blog-authors';
import { localizedUrl, type MarketingLang } from './seo-urls';

interface SitemapEntry {
  path: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: string;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function hreflangLinks(path: string): string {
  const fr = localizedUrl('fr', path);
  const en = localizedUrl('en', path);
  return [
    `    <xhtml:link rel="alternate" hreflang="fr" href="${escapeXml(fr)}"/>`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(en)}"/>`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(fr)}"/>`,
  ].join('\n');
}

function urlBlock(entry: SitemapEntry, lang: MarketingLang): string {
  return [
    '  <url>',
    `    <loc>${escapeXml(localizedUrl(lang, entry.path))}</loc>`,
    `    <lastmod>${entry.lastmod}</lastmod>`,
    `    <changefreq>${entry.changefreq}</changefreq>`,
    `    <priority>${entry.priority}</priority>`,
    hreflangLinks(entry.path),
    '  </url>',
  ].join('\n');
}

function staticEntries(asOf: string): SitemapEntry[] {
  return [
    { path: '/', lastmod: asOf, changefreq: 'weekly', priority: '1.0' },
    { path: '/blog', lastmod: asOf, changefreq: 'daily', priority: '0.8' },
    ...Object.keys(BLOG_AUTHORS).map((slug) => ({
      path: `/author/${slug}`,
      lastmod: asOf,
      changefreq: 'monthly' as const,
      priority: '0.5',
    })),
    { path: '/privacy', lastmod: asOf, changefreq: 'monthly', priority: '0.3' },
    { path: '/terms', lastmod: asOf, changefreq: 'monthly', priority: '0.3' },
  ];
}

/** Content-updated date if the article was actually edited, else its publish date. */
function blogLastmod(slug: string): string {
  return BLOG_CONTENT_UPDATED[slug] ?? getBlogPublishDate(slug);
}

export function buildSitemapXml(asOf: string = getBuildDate()): string {
  const entries: SitemapEntry[] = [...staticEntries(asOf)];

  for (const slug of getBlogSlugs()) {
    if (!isBlogPostPublished(slug, asOf)) continue;
    entries.push({
      path: `/blog/${slug}`,
      lastmod: blogLastmod(slug),
      changefreq: 'monthly',
      priority: '0.7',
    });
  }

  const urls = entries.flatMap((entry) => [urlBlock(entry, 'fr'), urlBlock(entry, 'en')]);

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    '',
    ...urls,
    '',
    '</urlset>',
    '',
  ].join('\n');
}
