'use client';
import React from 'react';
import { Pressable, View } from 'react-native';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useBulleTheme } from '@bulle/ui/theme';
import { Text } from '@bulle/ui/components';
import { localizedPath, type MarketingLang } from '@/lib/seo-urls';
import type { BlogPost } from '@/lib/blog-types';

export function BlogPostCard({ post, lang }: { post: BlogPost; lang: MarketingLang }) {
  const { t } = useTranslation();
  const { colors, space } = useBulleTheme();

  return (
    <Link href={localizedPath(lang, `/blog/${post.slug}`) as never} asChild>
      <Pressable
        accessibilityRole="link"
        style={({ pressed }) => ({
          gap: space[2],
          paddingVertical: space[4],
          borderTopWidth: 1,
          borderTopColor: colors.line,
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <Text variant="overline">{post.category}</Text>
        <Text variant="title">{post.title}</Text>
        <Text variant="body" color="inkSoft">
          {post.excerpt}
        </Text>
        <Text variant="caption">
          {t('marketing.blog.readingMinutes', { count: post.readingMinutes })}
        </Text>
      </Pressable>
    </Link>
  );
}
