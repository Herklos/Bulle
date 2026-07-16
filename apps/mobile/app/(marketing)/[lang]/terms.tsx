'use client';
import React from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useBulleTheme } from '@bulle/ui/theme';
import { Text } from '@bulle/ui/components';
import { Seo } from '@/components/Seo';
import { localizedSeo, normalizeLang } from '@/lib/seo-urls';

export default function TermsPage() {
  const { lang } = useLocalSearchParams<{ lang: string }>();
  const { t } = useTranslation();
  const { layout, space } = useBulleTheme();
  const resolved = normalizeLang(lang);

  const sections = t('marketing.terms.sections', { returnObjects: true }) as {
    title: string;
    body: string;
  }[];

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
        title={t('marketing.terms.metaTitle')}
        description={t('marketing.terms.metaDescription')}
        {...localizedSeo(resolved, '/terms')}
      />

      <Text variant="display">{t('marketing.terms.title')}</Text>
      <Text variant="body" color="inkSoft">
        {t('marketing.terms.intro')}
      </Text>

      {Array.isArray(sections) &&
        sections.map((section) => (
          <View key={section.title} style={{ gap: space[2] }}>
            <Text variant="title">{section.title}</Text>
            <Text variant="body" color="inkSoft">
              {section.body}
            </Text>
          </View>
        ))}

      <Text variant="caption">{t('marketing.terms.updated')}</Text>
    </View>
  );
}
