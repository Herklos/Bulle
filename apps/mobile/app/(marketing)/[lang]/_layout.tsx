'use client';
/**
 * The locale-scoped marketing shell.
 *
 * `generateStaticParams` prerenders this segment once per locale, so `/fr/...` and
 * `/en/...` are real HTML files rather than a client-side language toggle. That is what
 * makes hreflang honest: each URL genuinely serves that language to a crawler.
 */
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Slot, useLocalSearchParams } from 'expo-router';
import { I18nextProvider } from 'react-i18next';
import { useBulleTheme } from '@bulle/ui/theme';
import { MarketingNav } from '@/components/marketing/MarketingNav';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { getI18nForLang } from '@/i18n';
import { normalizeLang } from '@/lib/seo-urls';

export function generateStaticParams(): { lang: string }[] {
  return [{ lang: 'fr' }, { lang: 'en' }];
}

export default function MarketingLangLayout() {
  const { lang } = useLocalSearchParams<{ lang: string }>();
  const { colors } = useBulleTheme();
  const resolved = normalizeLang(lang);

  return (
    // A per-locale i18n INSTANCE, not the app singleton: the static export renders both
    // locales in the same process, so mutating the shared instance would race and bake the
    // wrong language into one of the two.
    <I18nextProvider i18n={getI18nForLang(resolved)}>
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        <MarketingNav lang={resolved} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Slot />
          <MarketingFooter lang={resolved} />
        </ScrollView>
      </View>
    </I18nextProvider>
  );
}
