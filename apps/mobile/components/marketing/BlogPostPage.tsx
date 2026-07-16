'use client';
import React from 'react';
import { View } from 'react-native';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useBulleTheme } from '@bulle/ui/theme';
import { Text } from '@bulle/ui/components';
import { Seo } from '@/components/Seo';
import { RichText } from '@/lib/rich-text';
import {
  buildPostJsonLd,
  getPublishedBlogPost,
  postAlternates,
  postCanonicalUrl,
} from '@/lib/blog';
import { BLOG_AUTHORS, authorProfileUrl, getPostAuthorSlug } from '@/lib/blog-authors';
import { localizedPath, type MarketingLang } from '@/lib/seo-urls';
import type { BlogSection } from '@/lib/blog-types';

function ArticleSection({ section }: { section: BlogSection }) {
  const { colors, radius, space } = useBulleTheme();

  if (section.type === 'quote') {
    return (
      <View
        style={{
          borderLeftWidth: 2,
          borderLeftColor: colors.terracotta,
          paddingLeft: space[4],
          paddingVertical: space[2],
        }}
      >
        <Text variant="titleXL">{section.quote}</Text>
      </View>
    );
  }

  if (section.type === 'callout') {
    return (
      <View style={{ backgroundColor: colors.surface, borderRadius: radius.m, padding: space[5], gap: space[3] }}>
        {section.paragraphs?.map((p, i) => <RichText key={i}>{p}</RichText>)}
      </View>
    );
  }

  if (section.type === 'list') {
    return (
      <View style={{ gap: space[3] }}>
        {section.title && <Text variant="title">{section.title}</Text>}
        {section.items?.map((item, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: space[3] }}>
            <Text variant="body" color="sage">
              ·
            </Text>
            <View style={{ flex: 1 }}>
              <RichText>{item}</RichText>
            </View>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={{ gap: space[3] }}>
      {section.title && <Text variant="title">{section.title}</Text>}
      {section.paragraphs?.map((p, i) => <RichText key={i}>{p}</RichText>)}
    </View>
  );
}

export function BlogPostPage({ slug, lang }: { slug: string; lang: MarketingLang }) {
  const { t } = useTranslation();
  const { layout, space } = useBulleTheme();
  const post = getPublishedBlogPost(lang, slug);

  // The gate again, at render. A build should never produce this page for an unpublished
  // slug, but a stale client-side route must not become a leak.
  if (!post) {
    return (
      <View style={{ padding: space[6], gap: space[4] }}>
        <Text variant="titleXL">{t('marketing.blog.notFoundTitle')}</Text>
        <Link href={localizedPath(lang, '/blog') as never} asChild>
          <Pressable accessibilityRole="link">
            <Text variant="body" color="sage">
              {t('marketing.blog.backToBlog')}
            </Text>
          </Pressable>
        </Link>
      </View>
    );
  }

  const authorSlug = getPostAuthorSlug(post);
  const author = BLOG_AUTHORS[authorSlug];
  const showUpdated = post.updated != null && post.updated !== post.date;

  return (
    <View
      style={{
        width: '100%',
        maxWidth: layout.maxContentWidth,
        alignSelf: 'center',
        paddingHorizontal: space[5],
        paddingVertical: space[7],
        gap: space[6],
      }}
    >
      <Seo
        title={`${post.title} · Bulle`}
        description={post.excerpt}
        canonical={postCanonicalUrl(post.slug, lang)}
        alternates={postAlternates(post.slug)}
        ogType="article"
        ogImage={post.heroImage}
        ogImageAlt={post.heroImageAlt}
        articlePublishedTime={post.date}
        articleModifiedTime={post.updated ?? post.date}
        articleAuthor={author.name}
        jsonLd={buildPostJsonLd(post, lang, t)}
      />

      <Link href={localizedPath(lang, '/blog') as never} asChild>
        <Pressable accessibilityRole="link">
          <Text variant="caption" color="sage">
            {t('marketing.blog.backToBlog')}
          </Text>
        </Pressable>
      </Link>

      <View style={{ gap: space[3] }}>
        <Text variant="overline">{post.category}</Text>
        <Text variant="display">{post.title}</Text>
        <Text variant="body" color="inkSoft">
          {post.excerpt}
        </Text>
        <Text variant="caption">
          {author.name} · {post.date}
          {showUpdated ? ` · ${t('marketing.blog.updated', { date: post.updated })}` : ''} ·{' '}
          {t('marketing.blog.readingMinutes', { count: post.readingMinutes })}
        </Text>
      </View>

      <View style={{ gap: space[6] }}>
        {post.sections.map((section, index) => (
          <ArticleSection key={index} section={section} />
        ))}
      </View>

      <Link href={authorProfileUrl(authorSlug, lang) as never} asChild>
        <Pressable accessibilityRole="link">
          <Text variant="caption" color="sage">
            {author.name}
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}
