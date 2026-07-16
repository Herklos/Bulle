'use client';
/**
 * Marketing nav.
 *
 * The language switcher is REAL NAVIGATION (`/fr/blog` → `/en/blog`), not a client-side
 * toggle, and the links carry `hrefLang`. A JS toggle would leave one URL serving two
 * languages, which quietly destroys the hreflang set the rest of the SEO layer builds.
 */
import React from 'react';
import { Pressable, View } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useBulleTheme } from '@bulle/ui/theme';
import { Text } from '@bulle/ui/components';
import { localizedPath, swapLocaleInPath, type MarketingLang } from '@/lib/seo-urls';

export function MarketingNav({ lang }: { lang: MarketingLang }) {
  const { t } = useTranslation();
  const { colors, layout, space, touch } = useBulleTheme();
  const pathname = usePathname();

  const other: MarketingLang = lang === 'fr' ? 'en' : 'fr';

  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: colors.line,
        backgroundColor: colors.bg,
      }}
    >
      <View
        style={{
          width: '100%',
          maxWidth: layout.maxContentWidth * 1.8,
          alignSelf: 'center',
          paddingHorizontal: space[5],
          paddingVertical: space[4],
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: space[5],
        }}
      >
        <Link href={localizedPath(lang, '/') as never} asChild>
          <Pressable accessibilityRole="link">
            <Text variant="titleXL">Bulle</Text>
          </Pressable>
        </Link>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: space[5] }}>
          <Link href={localizedPath(lang, '/blog') as never} asChild>
            <Pressable accessibilityRole="link" style={{ minHeight: touch.min, justifyContent: 'center' }}>
              <Text variant="bodyMed">{t('marketing.nav.blog')}</Text>
            </Pressable>
          </Link>

          {/* A real link to the other locale, with hrefLang, so crawlers can follow it. */}
          <Link href={swapLocaleInPath(pathname, other) as never} asChild>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel={other === 'fr' ? 'Français' : 'English'}
              style={{ minHeight: touch.min, justifyContent: 'center' }}
            >
              <Text variant="bodyMed" color="inkSoft">
                {other.toUpperCase()}
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}
