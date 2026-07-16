/**
 * Blog content types.
 *
 * Articles are plain TypeScript objects, not MDX and not a CMS. That sounds primitive until
 * you need bilingual parity, typed sections, and a build-time publish gate — at which point
 * being real code is the whole advantage.
 */

export type BlogSectionType = 'text' | 'quote' | 'callout' | 'list';

export interface BlogSection {
  /** Defaults to 'text'. */
  type?: BlogSectionType;
  title?: string;
  /** Supports inline markdown links: `[label](/path)`. Rendered via <RichText>. */
  paragraphs?: string[];
  /** For type: 'list'. */
  items?: string[];
  /** For type: 'quote'. */
  quote?: string;
}

export type BlogAuthorSlug = 'paul' | 'sage-femme';

export interface BlogPost {
  slug: string;
  /** Stable key used for filtering and author routing. Never localized. */
  categoryKey: string;
  /** Localized display label. */
  category: string;
  title: string;
  excerpt: string;
  /**
   * First publication (ISO YYYY-MM-DD) → JSON-LD `datePublished`.
   * Comes from `blog-publish-dates.ts`. Set once; NEVER change it on an edit, or every
   * crawler treats the article as brand new and the ranking history resets.
   */
  date: string;
  /**
   * Last substantive content edit → JSON-LD `dateModified`.
   * Set ONLY when the title, excerpt or sections actually change — not for wiring or
   * sitemap-only changes. A `dateModified` that moves without the content moving is a
   * trust signal you spend for nothing.
   */
  updated?: string;
  readingMinutes: number;
  heroImage: string;
  heroImageAlt: string;
  /** Overrides the default category→author mapping. */
  authorSlug?: BlogAuthorSlug;
  sections: BlogSection[];
}
