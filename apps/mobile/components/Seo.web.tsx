'use client';
/**
 * Per-page SEO. Web only — `Seo.native.tsx` renders null.
 *
 * The split with `+html.tsx` is strict: that file holds the INVARIANTS (site name, fonts,
 * the Organization/WebSite graph); this holds everything per-page. Duplicating a tag across
 * both is how you end up with two canonicals disagreeing.
 */
import React from 'react';
import Head from 'expo-router/head';
import { BASE_URL } from '@/lib/seo-urls';

export interface SeoProps {
  title: string;
  description: string;
  canonical: string;
  alternates?: { fr: string; en: string };
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: 'website' | 'article';
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  noindex?: boolean;
  jsonLd?: unknown;
}

export function Seo({
  title,
  description,
  canonical,
  alternates,
  ogTitle,
  ogDescription,
  ogImage,
  ogImageAlt,
  ogType = 'website',
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  noindex,
  jsonLd,
}: SeoProps) {
  const resolvedOgTitle = ogTitle ?? title;
  const resolvedOgDescription = ogDescription ?? description;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      {/* Canonical and og:url must agree. Emitting both from one prop is the cheapest way
          to guarantee they never drift. */}
      <link rel="canonical" href={canonical} />
      <meta property="og:url" content={canonical} />

      {/*
        Each <link> is a DIRECT child of <Head>, deliberately.

        expo-router/head (Helmet) does not traverse Fragments: wrapping these three in a
        `{alternates && <>…</>}` silently drops all of them, the export succeeds, and the
        entire bilingual hreflang set is missing with nothing to indicate it. Hence the
        repeated `alternates &&` rather than one wrapper.

        x-default points at FR: it is the launch market, and an unmatched visitor is more
        likely to want French than English.
      */}
      {alternates && <link rel="alternate" hrefLang="fr" href={alternates.fr} />}
      {alternates && <link rel="alternate" hrefLang="en" href={alternates.en} />}
      {alternates && <link rel="alternate" hrefLang="x-default" href={alternates.fr} />}

      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDescription} />
      <meta property="og:type" content={ogType} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}

      <meta name="twitter:title" content={resolvedOgTitle} />
      <meta name="twitter:description" content={resolvedOgDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {ogType === 'article' && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {ogType === 'article' && articleModifiedTime && (
        <meta property="article:modified_time" content={articleModifiedTime} />
      )}
      {ogType === 'article' && articleAuthor && (
        <meta property="article:author" content={articleAuthor} />
      )}

      {jsonLd != null && (
        <script
          type="application/ld+json"
          // Always an array, so a page can add nodes without changing shape.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd]),
          }}
        />
      )}
    </Head>
  );
}

export { BASE_URL };
