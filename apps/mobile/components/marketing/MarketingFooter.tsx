'use client';
import React from 'react';
import { Pressable, View } from 'react-native';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useBulleTheme } from '@bulle/ui/theme';
import { Text } from '@bulle/ui/components';
import { localizedPath, type MarketingLang } from '@/lib/seo-urls';

export function MarketingFooter({ lang }: { lang: MarketingLang }) {
  const { t } = useTranslation();
  const { colors, layout, space, touch } = useBulleTheme();

  const links: { href: string; label: string }[] = [
    { href: localizedPath(lang, '/blog'), label: t('marketing.nav.blog') },
    { href: localizedPath(lang, '/privacy'), label: t('marketing.footer.privacy') },
    { href: localizedPath(lang, '/terms'), label: t('marketing.footer.terms') },
  ];

  return (
    <View style={{ borderTopWidth: 1, borderTopColor: colors.line, marginTop: space[8] }}>
      <View
        style={{
          width: '100%',
          maxWidth: layout.maxContentWidth * 1.8,
          alignSelf: 'center',
          paddingHorizontal: space[5],
          paddingVertical: space[7],
          gap: space[5],
        }}
      >
        <Text variant="titleXL">Bulle</Text>
        <Text variant="caption">{t('common.tagline')}</Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space[5] }}>
          {links.map((link) => (
            <Link key={link.href} href={link.href as never} asChild>
              <Pressable accessibilityRole="link" style={{ minHeight: touch.min, justifyContent: 'center' }}>
                <Text variant="caption" color="inkSoft">
                  {link.label}
                </Text>
              </Pressable>
            </Link>
          ))}
        </View>

        <Text variant="caption">
          © {new Date().getFullYear()} Bulle · {t('marketing.footer.madeWith')}
        </Text>
      </View>
    </View>
  );
}
