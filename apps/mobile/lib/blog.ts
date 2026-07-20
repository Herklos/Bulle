/**
 * The blog's query layer + JSON-LD.
 *
 * THE PUBLISH GATE IS APPLIED HERE, and every read path goes through it. That is defence in
 * depth: a future article must not leak via the index, an author page, the landing strip,
 * the sitemap, or a direct URL. Each of those calls a `getPublished*` function below.
 */

import { getBlogPublishDate, isBlogPostPublished } from './blog-publish-dates';
import { BASE_URL, localizedUrl, type MarketingLang } from './seo-urls';
import { getPostAuthorSlug, authorPersonId, BLOG_AUTHORS } from './blog-authors';
import { POSTS_ADMIN_EN, POSTS_ADMIN_FR } from './blog-posts-admin';
import { POSTS_ADMIN2_EN, POSTS_ADMIN2_FR } from './blog-posts-admin2';
import { POSTS_PREP_EN, POSTS_PREP_FR } from './blog-posts-prep';
import { POSTS_COUPLE_EN, POSTS_COUPLE_FR } from './blog-posts-couple';
import { POSTS_RETOUR_EN, POSTS_RETOUR_FR } from './blog-posts-retour';
import { POSTS_LOGISTIQUE_EN, POSTS_LOGISTIQUE_FR } from './blog-posts-logistique';
import { POSTS_ACHATS_EN, POSTS_ACHATS_FR } from './blog-posts-achats';
import { POSTS_BUDGET_EN, POSTS_BUDGET_FR } from './blog-posts-budget';
import { POSTS_LAYETTE_EN, POSTS_LAYETTE_FR } from './blog-posts-layette';
import type { BlogAuthorSlug, BlogPost } from './blog-types';

/**
 * Every article, in both languages. Order here is irrelevant: the publish date decides what
 * exists (blog-publish-dates.ts) and each query sorts for itself.
 */
const POSTS: Record<MarketingLang, BlogPost[]> = {
  fr: [
    ...POSTS_ADMIN_FR,
    ...POSTS_ADMIN2_FR,
    ...POSTS_PREP_FR,
    ...POSTS_COUPLE_FR,
    ...POSTS_RETOUR_FR,
    ...POSTS_LOGISTIQUE_FR,
    ...POSTS_ACHATS_FR,
    ...POSTS_BUDGET_FR,
    ...POSTS_LAYETTE_FR,
  ],
  en: [
    ...POSTS_ADMIN_EN,
    ...POSTS_ADMIN2_EN,
    ...POSTS_PREP_EN,
    ...POSTS_COUPLE_EN,
    ...POSTS_RETOUR_EN,
    ...POSTS_LOGISTIQUE_EN,
    ...POSTS_ACHATS_EN,
    ...POSTS_BUDGET_EN,
    ...POSTS_LAYETTE_EN,
  ],
};

/** Publisher node, referenced by @id from every page graph rather than repeated. */
export const PUBLISHER = {
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'Bulle',
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/assets/icon.png`,
  },
};

// ─── Queries ─────────────────────────────────────────────────────────────────

/** ALL posts, published or not. Only the sitemap builder and tests should use this. */
export function getAllBlogPosts(lang: MarketingLang): BlogPost[] {
  return POSTS[lang];
}

export function getBlogSlugs(): string[] {
  return POSTS.fr.map((p) => p.slug);
}

/** Published slugs, newest first. Drives `generateStaticParams` — an unpublished article
 *  therefore has no HTML file at all, rather than being hidden client-side. */
export function getPublishedBlogSlugs(asOf?: string): string[] {
  return getBlogSlugs().filter((slug) => isBlogPostPublished(slug, asOf));
}

export function getPublishedBlogPosts(lang: MarketingLang, asOf?: string): BlogPost[] {
  return POSTS[lang]
    .filter((post) => isBlogPostPublished(post.slug, asOf))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPublishedBlogPost(
  lang: MarketingLang,
  slug: string,
  asOf?: string,
): BlogPost | undefined {
  if (!isBlogPostPublished(slug, asOf)) return undefined;
  return POSTS[lang].find((post) => post.slug === slug);
}

export function getPostsByAuthor(slug: BlogAuthorSlug, lang: MarketingLang): BlogPost[] {
  return getPublishedBlogPosts(lang).filter((post) => getPostAuthorSlug(post) === slug);
}

/** The three posts featured on the landing page. Curated, order matters. */
const LANDING_BLOG_SLUGS = [
  'declaration-grossesse-demarches',
  'valise-maternite-liste',
  'applications-grossesse-donnees',
];

export function getLandingBlogPosts(lang: MarketingLang): BlogPost[] {
  const published = getPublishedBlogPosts(lang);
  // flatMap away the ones not yet live, so before the first publish date this simply
  // returns [] and the section renders empty instead of breaking.
  return LANDING_BLOG_SLUGS.flatMap((slug) => published.find((p) => p.slug === slug) ?? []);
}

// ─── JSON-LD ─────────────────────────────────────────────────────────────────

/** Date-only inputs get a stable time, so `dateModified` never appears to shift by timezone. */
function toSchemaDateTime(iso: string): string {
  return iso.length === 10 ? `${iso}T08:00:00Z` : iso;
}

export function postCanonicalUrl(slug: string, lang: MarketingLang): string {
  return localizedUrl(lang, `/blog/${slug}`);
}

export function postAlternates(slug: string): { fr: string; en: string } {
  // fr and en share a slug, so hreflang is a pure identity mapping. That is exactly why
  // `postPair` exists rather than two hand-written objects.
  return { fr: postCanonicalUrl(slug, 'fr'), en: postCanonicalUrl(slug, 'en') };
}

/** Plain text of the whole article, markdown links flattened to their label. */
export function extractArticleBody(post: BlogPost): string {
  const parts: string[] = [];
  for (const section of post.sections) {
    if (section.title) parts.push(section.title);
    if (section.paragraphs) parts.push(...section.paragraphs);
    if (section.items) parts.push(...section.items);
    if (section.quote) parts.push(section.quote);
  }
  return parts.join(' ').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

export function computeWordCount(post: BlogPost): number {
  return extractArticleBody(post).split(/\s+/).filter(Boolean).length;
}

export function buildBlogPostingNode(
  post: BlogPost,
  lang: MarketingLang,
): Record<string, unknown> {
  const canonical = postCanonicalUrl(post.slug, lang);
  const authorSlug = getPostAuthorSlug(post);

  return {
    '@type': 'BlogPosting',
    '@id': `${canonical}#article`,
    mainEntityOfPage: canonical,
    headline: post.title,
    name: post.title,
    description: post.excerpt,
    abstract: post.excerpt,
    articleBody: extractArticleBody(post),
    image: {
      '@type': 'ImageObject',
      url: post.heroImage,
      caption: post.heroImageAlt,
    },
    thumbnailUrl: post.heroImage,
    datePublished: toSchemaDateTime(post.date),
    dateModified: toSchemaDateTime(post.updated ?? post.date),
    // @id references only — the full Person node lives on the author page.
    author: { '@id': authorPersonId(authorSlug, lang) },
    publisher: { '@id': PUBLISHER['@id'] },
    inLanguage: lang === 'fr' ? 'fr-FR' : 'en-US',
    articleSection: post.category,
    keywords: post.categoryKey,
    wordCount: computeWordCount(post),
    timeRequired: `PT${post.readingMinutes}M`,
    isPartOf: { '@id': `${localizedUrl(lang, '/blog')}#blog` },
  };
}

export function blogName(lang: MarketingLang): string {
  return lang === 'fr' ? 'Bulle — Le Carnet' : 'Bulle Journal';
}

export function buildPostJsonLd(
  post: BlogPost,
  lang: MarketingLang,
  t: (key: string) => string,
): unknown[] {
  const canonical = postCanonicalUrl(post.slug, lang);
  const authorSlug = getPostAuthorSlug(post);
  const author = BLOG_AUTHORS[authorSlug];

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': canonical,
      url: canonical,
      name: post.title,
      description: post.excerpt,
      isPartOf: { '@id': `${BASE_URL}/#website` },
    },
    buildBlogPostingNode(post, lang),
    {
      '@type': 'Blog',
      '@id': `${localizedUrl(lang, '/blog')}#blog`,
      name: blogName(lang),
      url: localizedUrl(lang, '/blog'),
    },
    {
      '@type': 'Person',
      '@id': authorPersonId(authorSlug, lang),
      name: author.name,
      url: `${BASE_URL}/${lang}/author/${authorSlug}`,
      jobTitle: t(author.roleKey),
    },
    PUBLISHER,
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Bulle', item: localizedUrl(lang, '/') },
        { '@type': 'ListItem', position: 2, name: blogName(lang), item: localizedUrl(lang, '/blog') },
        { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
      ],
    },
  ];
}

export function buildBlogJsonLd(
  posts: BlogPost[],
  lang: MarketingLang,
  description: string,
): unknown[] {
  const url = localizedUrl(lang, '/blog');
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${url}#blog`,
      url,
      name: blogName(lang),
      description,
      inLanguage: lang === 'fr' ? 'fr-FR' : 'en-US',
      publisher: { '@id': PUBLISHER['@id'] },
      // Lightweight @id refs on the index; the full BlogPosting lives on the post page.
      blogPost: posts.map((p) => ({ '@id': `${postCanonicalUrl(p.slug, lang)}#article` })),
    },
    PUBLISHER,
  ];
}

export { getBlogPublishDate, isBlogPostPublished };
