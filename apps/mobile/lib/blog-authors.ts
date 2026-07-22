/**
 * Blog authors.
 *
 * Two, and the second one matters commercially: the spec (§7.1) budgets a sage-femme to
 * review the corpus, and her name in the credits is a trust asset in a category where
 * trust IS the product. So health-adjacent articles are attributed to her, not to the
 * founder.
 *
 * Names live in code; roles and bios live in i18n, so authors are bilingual for free.
 */
import { BASE_URL, localizedUrl, type MarketingLang } from './seo-urls';
import type { BlogAuthorSlug, BlogPost } from './blog-types';

export interface BlogAuthorProfile {
  slug: BlogAuthorSlug;
  name: string;
  initials: string;
  /** i18n keys under `marketing.authors.{slug}.*`. */
  roleKey: string;
  bioKey: string;
  /** `<title>` for the author page. Dedicated so it reads well at ~40–50 chars rather than
   *  being a thin "Name · Bulle" fragment. */
  metaTitleKey: string;
  expertiseKeys: string[];
}

export const BLOG_AUTHORS: Record<BlogAuthorSlug, BlogAuthorProfile> = {
  paul: {
    slug: 'paul',
    name: 'Paul',
    initials: 'P',
    roleKey: 'marketing.authors.paul.role',
    bioKey: 'marketing.authors.paul.bio',
    metaTitleKey: 'marketing.authors.paul.metaTitle',
    expertiseKeys: [
      'marketing.authors.paul.expertise.admin',
      'marketing.authors.paul.expertise.privacy',
      'marketing.authors.paul.expertise.organisation',
    ],
  },
  'sage-femme': {
    slug: 'sage-femme',
    name: 'Camille',
    initials: 'C',
    roleKey: 'marketing.authors.sageFemme.role',
    bioKey: 'marketing.authors.sageFemme.bio',
    metaTitleKey: 'marketing.authors.sageFemme.metaTitle',
    expertiseKeys: [
      'marketing.authors.sageFemme.expertise.suivi',
      'marketing.authors.sageFemme.expertise.maternite',
      'marketing.authors.sageFemme.expertise.postpartum',
    ],
  },
};

export const DEFAULT_BLOG_AUTHOR_SLUG: BlogAuthorSlug = 'paul';

/**
 * Author is DERIVED from the category rather than stored per post. One fewer field to get
 * wrong on every article, and it makes the editorial rule explicit: anything touching care
 * carries the midwife's name.
 */
const AUTHOR_BY_CATEGORY: Partial<Record<string, BlogAuthorSlug>> = {
  sante: 'sage-femme',
};

export function getPostAuthorSlug(post: BlogPost): BlogAuthorSlug {
  return post.authorSlug ?? AUTHOR_BY_CATEGORY[post.categoryKey] ?? DEFAULT_BLOG_AUTHOR_SLUG;
}

export function authorProfileUrl(slug: BlogAuthorSlug, lang: MarketingLang): string {
  return localizedUrl(lang, `/author/${slug}`);
}

export function authorPersonId(slug: BlogAuthorSlug, lang: MarketingLang): string {
  return `${authorProfileUrl(slug, lang)}#person`;
}

export function buildAuthorPersonJsonLd(
  slug: BlogAuthorSlug,
  lang: MarketingLang,
  t: (key: string) => string,
): Record<string, unknown> {
  const author = BLOG_AUTHORS[slug];
  return {
    '@type': 'Person',
    '@id': authorPersonId(slug, lang),
    name: author.name,
    url: authorProfileUrl(slug, lang),
    jobTitle: t(author.roleKey),
    description: t(author.bioKey),
    worksFor: { '@id': `${BASE_URL}/#organization` },
  };
}
