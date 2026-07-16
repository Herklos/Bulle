'use client';
import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useBulleTheme } from '@bulle/ui/theme';
import { Text } from '@bulle/ui/components';
import { Seo } from '@/components/Seo';
import { BlogPostCard } from '@/components/marketing/BlogPostCard';
import { buildBlogJsonLd, getPublishedBlogPosts } from '@/lib/blog';
import { localizedSeo, type MarketingLang } from '@/lib/seo-urls';

export function BlogIndexPage({ lang }: { lang: MarketingLang }) {
  const { t } = useTranslation();
  const { layout, space } = useBulleTheme();
  const posts = getPublishedBlogPosts(lang);
  const description = t('marketing.blog.metaDescription');

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
        title={t('marketing.blog.metaTitle')}
        description={description}
        {...localizedSeo(lang, '/blog')}
        jsonLd={buildBlogJsonLd(posts, lang, description)}
      />

      <View style={{ gap: space[3] }}>
        <Text variant="display">{t('marketing.blog.title')}</Text>
        <Text variant="body" color="inkSoft">
          {t('marketing.blog.subtitle')}
        </Text>
      </View>

      {/* Before the first publish date this is what the page shows. It is a real state, not
          an error, so it gets real copy. */}
      {posts.length === 0 ? (
        <View style={{ gap: space[3], paddingVertical: space[6] }}>
          <Text variant="title">{t('marketing.blog.emptyTitle')}</Text>
          <Text variant="body" color="inkSoft">
            {t('marketing.blog.emptyBody')}
          </Text>
        </View>
      ) : (
        <View>
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} lang={lang} />
          ))}
        </View>
      )}
    </View>
  );
}
