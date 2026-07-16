/**
 * Bilingual authoring helper.
 *
 * `postPair()` takes ONE flat bilingual input and emits both `BlogPost`s, auto-wiring the
 * publish/updated dates. That matters for more than ergonomics: fr and en must share a slug
 * for hreflang to be a clean identity mapping, and writing two objects by hand is exactly
 * how that invariant breaks.
 */

import { BLOG_CONTENT_UPDATED, getBlogPublishDate } from './blog-publish-dates';
import { BASE_URL } from './seo-urls';
import type { BlogAuthorSlug, BlogPost, BlogSection } from './blog-types';

/** Every article shares one hero. Bulle has no illustration layer by design (§8.1). */
export const BLOG_HERO = `${BASE_URL}/assets/og-image.png`;

/**
 * The regulatory line (§7.3), appended to any article touching health or admin.
 * Bulle schedules preparation, never care — this keeps that promise visible to the reader
 * as well as true in the code.
 */
export const DISCLAIMER_FR: BlogSection = {
  type: 'callout',
  paragraphs: [
    'Bulle vous aide à vous organiser, pas à vous soigner. Pour toute question médicale, ou au moindre doute, contactez votre sage-femme ou le 15.',
  ],
};

export const DISCLAIMER_EN: BlogSection = {
  type: 'callout',
  paragraphs: [
    'Bulle helps you get organised, not treated. For any medical question, or at the slightest doubt, contact your midwife or your doctor.',
  ],
};

export interface PostPairInput {
  slug: string;
  categoryKey: string;
  categoryFr: string;
  categoryEn: string;
  titleFr: string;
  titleEn: string;
  excerptFr: string;
  excerptEn: string;
  readingMinutes: number;
  heroAltFr: string;
  heroAltEn: string;
  sectionsFr: BlogSection[];
  sectionsEn: BlogSection[];
  /** Appends the medical disclaimer. Default true — opt OUT, not in. */
  disclaimer?: boolean;
  authorSlug?: BlogAuthorSlug;
  date?: string;
  updated?: string;
}

export function postPair(input: PostPairInput): { fr: BlogPost; en: BlogPost } {
  const date = input.date ?? getBlogPublishDate(input.slug);
  const updated = input.updated ?? BLOG_CONTENT_UPDATED[input.slug];
  const withDisclaimer = input.disclaimer !== false;

  const base = {
    slug: input.slug,
    categoryKey: input.categoryKey,
    date,
    updated,
    readingMinutes: input.readingMinutes,
    heroImage: BLOG_HERO,
    authorSlug: input.authorSlug,
  };

  return {
    fr: {
      ...base,
      category: input.categoryFr,
      title: input.titleFr,
      excerpt: input.excerptFr,
      heroImageAlt: input.heroAltFr,
      sections: withDisclaimer ? [...input.sectionsFr, DISCLAIMER_FR] : input.sectionsFr,
    },
    en: {
      ...base,
      category: input.categoryEn,
      title: input.titleEn,
      excerpt: input.excerptEn,
      heroImageAlt: input.heroAltEn,
      sections: withDisclaimer ? [...input.sectionsEn, DISCLAIMER_EN] : input.sectionsEn,
    },
  };
}

export function pairsToArrays(pairs: { fr: BlogPost; en: BlogPost }[]): {
  fr: BlogPost[];
  en: BlogPost[];
} {
  return {
    fr: pairs.map((p) => p.fr),
    en: pairs.map((p) => p.en),
  };
}
