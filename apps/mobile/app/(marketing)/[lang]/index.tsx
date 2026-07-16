'use client';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { LandingPage } from '@/components/marketing/LandingPage';
import { normalizeLang } from '@/lib/seo-urls';

export default function MarketingHome() {
  const { lang } = useLocalSearchParams<{ lang: string }>();
  return <LandingPage lang={normalizeLang(lang)} />;
}
