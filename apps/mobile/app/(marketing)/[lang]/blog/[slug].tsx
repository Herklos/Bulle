'use client';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { BlogPostPage } from '@/components/marketing/BlogPostPage';
import { getPublishedBlogSlugs } from '@/lib/blog';
import { normalizeLang } from '@/lib/seo-urls';

/**
 * THE publish gate, at the point where it matters most.
 *
 * Only published slugs get an HTML file, so a future article does not exist in `dist/` at
 * all. Nothing is hidden client-side and nothing can leak by guessing a URL — the page is
 * simply not there until the day its build runs.
 */
export function generateStaticParams({ params }: { params: { lang: string } }): {
  lang: string;
  slug: string;
}[] {
  return getPublishedBlogSlugs().map((slug) => ({ lang: params.lang, slug }));
}

export default function BlogPost() {
  const { lang, slug } = useLocalSearchParams<{ lang: string; slug: string }>();
  return <BlogPostPage slug={slug} lang={normalizeLang(lang)} />;
}
