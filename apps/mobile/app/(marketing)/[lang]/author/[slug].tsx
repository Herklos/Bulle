'use client';
import React from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useBulleTheme } from '@bulle/ui/theme';
import { Text } from '@bulle/ui/components';
import { Seo } from '@/components/Seo';
import { BlogPostCard } from '@/components/marketing/BlogPostCard';
import { getPostsByAuthor, PUBLISHER } from '@/lib/blog';
import {
  BLOG_AUTHORS,
  DEFAULT_BLOG_AUTHOR_SLUG,
  authorProfileUrl,
  buildAuthorPersonJsonLd,
} from '@/lib/blog-authors';
import { localizedSeo, normalizeLang } from '@/lib/seo-urls';
import type { BlogAuthorSlug } from '@/lib/blog-types';

export function generateStaticParams({ params }: { params: { lang: string } }): {
  lang: string;
  slug: string;
}[] {
  return Object.keys(BLOG_AUTHORS).map((slug) => ({ lang: params.lang, slug }));
}

export default function AuthorPage() {
  const { lang, slug } = useLocalSearchParams<{ lang: string; slug: string }>();
  const { t } = useTranslation();
  const { layout, space } = useBulleTheme();

  const resolvedLang = normalizeLang(lang);
  // Fall back rather than 404: an author URL is a stable, linkable thing, and a renamed
  // slug should land somewhere useful instead of a dead end.
  const resolvedSlug: BlogAuthorSlug =
    slug in BLOG_AUTHORS ? (slug as BlogAuthorSlug) : DEFAULT_BLOG_AUTHOR_SLUG;

  const author = BLOG_AUTHORS[resolvedSlug];
  const posts = getPostsByAuthor(resolvedSlug, resolvedLang);

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
        title={`${author.name} · Bulle`}
        description={t(author.bioKey)}
        {...localizedSeo(resolvedLang, `/author/${resolvedSlug}`)}
        jsonLd={[
          buildAuthorPersonJsonLd(resolvedSlug, resolvedLang, t),
          PUBLISHER,
          {
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            '@id': `${authorProfileUrl(resolvedSlug, resolvedLang)}#profile`,
            mainEntity: { '@id': `${authorProfileUrl(resolvedSlug, resolvedLang)}#person` },
          },
        ]}
      />

      <View style={{ gap: space[2] }}>
        <Text variant="display">{author.name}</Text>
        <Text variant="overline">{t(author.roleKey)}</Text>
        <Text variant="body" color="inkSoft">
          {t(author.bioKey)}
        </Text>
      </View>

      <View style={{ gap: space[2] }}>
        {author.expertiseKeys.map((key) => (
          <Text key={key} variant="body">
            · {t(key)}
          </Text>
        ))}
      </View>

      {posts.length > 0 && (
        <View>
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} lang={resolvedLang} />
          ))}
        </View>
      )}
    </View>
  );
}
