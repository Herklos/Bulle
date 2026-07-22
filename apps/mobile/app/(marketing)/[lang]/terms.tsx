'use client';
import React from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useBulleTheme } from '@bulle/ui/theme';
import { Text } from '@bulle/ui/components';
import { Seo } from '@/components/Seo';
import { BASE_URL, localizedSeo, localizedUrl, normalizeLang } from '@/lib/seo-urls';

export default function TermsPage() {
  const { lang } = useLocalSearchParams<{ lang: string }>();
  const { t } = useTranslation();
  const { layout, space } = useBulleTheme();
  const resolved = normalizeLang(lang);
  const canonical = localizedUrl(resolved, '/terms');

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
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': canonical,
            url: canonical,
            name: t('marketing.terms.metaTitle'),
            description: t('marketing.terms.metaDescription'),
            inLanguage: resolved === 'fr' ? 'fr-FR' : 'en-US',
            isPartOf: { '@id': `${BASE_URL}/#website` },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            '@id': `${canonical}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Bulle', item: localizedUrl(resolved, '/') },
              { '@type': 'ListItem', position: 2, name: t('marketing.terms.title'), item: canonical },
            ],
          },
        ]}
      />

      <Text variant="display" heading={1}>
        {t('marketing.terms.title')}
      </Text>
      <Text variant="body" color="inkSoft">
        {t('marketing.terms.intro')}
      </Text>

      {Array.isArray(sections) &&
        sections.map((section) => (
          <View key={section.title} style={{ gap: space[2] }}>
            <Text variant="title" heading={2}>
              {section.title}
            </Text>
            <Text variant="body" color="inkSoft">
              {section.body}
            </Text>
          </View>
        ))}

      <Text variant="caption">{t('marketing.terms.updated')}</Text>
    </View>
  );
}
