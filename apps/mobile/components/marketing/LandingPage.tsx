'use client';
/**
 * The landing page.
 *
 * The hero is the ORB, breathing, at a real readiness value. It is the most characteristic
 * thing in the product's world, it is live code rather than a screenshot, and it states the
 * thesis before a word does: this is a calm thing that fills up.
 *
 * Everything else stays quiet on purpose (§15.0). The boldness budget is spent on the orb;
 * the rest is typography and whitespace. If a section here would look at home in a generic
 * "cozy startup" template, it is wrong.
 */
import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BulleOrb } from '@bulle/ui/primitives';
import { Text } from '@bulle/ui/components';
import { useBulleTheme } from '@bulle/ui/theme';
import { Seo } from '@/components/Seo';
import { BlogPostCard } from '@/components/marketing/BlogPostCard';
import { getLandingBlogPosts } from '@/lib/blog';
import { BLOG_HERO } from '@/lib/blog-posts-shared';
import { localizedPath, localizedSeo, type MarketingLang } from '@/lib/seo-urls';

export function LandingPage({ lang }: { lang: MarketingLang }) {
  const { t } = useTranslation();
  const { colors, layout, radius, space, touch } = useBulleTheme();
  const { width } = useWindowDimensions();

  /**
   * During static export there is no window and `useWindowDimensions` reports 0. Treating
   * an unmeasured width as DESKTOP is deliberate: `0 < 720` would otherwise bake the
   * narrow layout into the exported HTML, and every desktop visitor would get the phone
   * version until hydration corrected it.
   */
  const isNarrow = width > 0 && width < 720;

  const posts = getLandingBlogPosts(lang);

  const Section = ({ children, tint }: { children: React.ReactNode; tint?: boolean }) => (
    <View style={{ backgroundColor: tint ? colors.surface : colors.bg, paddingVertical: space[8] }}>
      <View
        style={{
          width: '100%',
          maxWidth: layout.maxContentWidth * 1.6,
          alignSelf: 'center',
          paddingHorizontal: space[5],
          gap: space[6],
        }}
      >
        {children}
      </View>
    </View>
  );

  return (
    <View>
      <Seo
        title={t('marketing.landing.metaTitle')}
        description={t('marketing.landing.metaDescription')}
        ogImage={BLOG_HERO}
        {...localizedSeo(lang, '/')}
      />

      {/* ── Hero ── */}
      <Section>
        <View
          style={{
            flexDirection: isNarrow ? 'column' : 'row',
            alignItems: 'center',
            gap: space[7],
          }}
        >
          <View style={{ flex: 1, gap: space[5] }}>
            <Text variant="overline">{t('marketing.landing.eyebrow')}</Text>
            <Text variant="display">{t('marketing.landing.headline')}</Text>
            <Text variant="body" color="inkSoft">
              {t('marketing.landing.subhead')}
            </Text>

            <Link href={localizedPath(lang, '/blog') as never} asChild>
              <Pressable
                accessibilityRole="link"
                style={{
                  minHeight: touch.min,
                  paddingHorizontal: space[5],
                  borderRadius: radius.s,
                  backgroundColor: colors.sage,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'flex-start',
                }}
              >
                <Text variant="bodyMed" style={{ color: colors.bg }}>
                  {t('marketing.landing.cta')}
                </Text>
              </Pressable>
            </Link>

            <Text variant="caption">{t('marketing.landing.ctaNote')}</Text>
          </View>

          {/* The signature element, live. Not a screenshot of one. */}
          <View style={{ alignItems: 'center' }}>
            <BulleOrb
              fill={0.62}
              trimesterProgress={0.55}
              size={isNarrow ? 200 : 260}
              label={t('marketing.landing.orbLabel')}
            />
          </View>
        </View>
      </Section>

      {/* ── What it is ── */}
      <Section tint>
        <Text variant="titleXL">{t('marketing.landing.whatTitle')}</Text>
        <View style={{ flexDirection: isNarrow ? 'column' : 'row', gap: space[6] }}>
          {(['calm', 'together', 'admin'] as const).map((key) => (
            <View key={key} style={{ flex: 1, gap: space[2] }}>
              <Text variant="title">{t(`marketing.landing.pillars.${key}.title`)}</Text>
              <Text variant="body" color="inkSoft">
                {t(`marketing.landing.pillars.${key}.body`)}
              </Text>
            </View>
          ))}
        </View>
      </Section>

      {/* ── Privacy: the actual differentiator, so it gets its own section ── */}
      <Section>
        <Text variant="titleXL">{t('marketing.landing.privacyTitle')}</Text>
        <Text variant="body" color="inkSoft">
          {t('marketing.landing.privacyBody')}
        </Text>
        <View style={{ gap: space[3] }}>
          {(['noAccount', 'onDevice', 'e2ee', 'oneTime'] as const).map((key) => (
            <Text key={key} variant="body">
              {t(`marketing.landing.privacyPoints.${key}`)}
            </Text>
          ))}
        </View>
      </Section>

      {/* ── Le Carnet. Empty (and silent) until the first publish date. ── */}
      {posts.length > 0 && (
        <Section tint>
          <Text variant="titleXL">{t('marketing.landing.carnetTitle')}</Text>
          <View style={{ flexDirection: isNarrow ? 'column' : 'row', gap: space[5] }}>
            {posts.map((post) => (
              <View key={post.slug} style={{ flex: 1 }}>
                <BlogPostCard post={post} lang={lang} />
              </View>
            ))}
          </View>
        </Section>
      )}
    </View>
  );
}
