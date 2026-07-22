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
  const { space } = useBulleTheme();

  return (
    <Link href={localizedPath(lang, `/blog/${post.slug}`) as never} asChild>
      <Pressable
        accessibilityRole="link"
        style={({ pressed }) => ({
          gap: space[3],
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <View style={{ gap: space[2] }}>
          <Text variant="overline">{post.category}</Text>
          <Text variant="title" heading={2}>{post.title}</Text>
          <Text variant="body" color="inkSoft">
            {post.excerpt}
          </Text>
        </View>
        <Text variant="caption">
          {t('marketing.blog.readingMinutes', { count: post.readingMinutes })}
        </Text>
      </Pressable>
    </Link>
  );
}
