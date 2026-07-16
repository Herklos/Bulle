'use client';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { BlogIndexPage } from '@/components/marketing/BlogIndexPage';
import { normalizeLang } from '@/lib/seo-urls';

export default function BlogIndex() {
  const { lang } = useLocalSearchParams<{ lang: string }>();
  return <BlogIndexPage lang={normalizeLang(lang)} />;
}
