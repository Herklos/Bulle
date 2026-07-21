'use client';
/**
 * Bulle Complète (spec §10, §15.6).
 *
 * The design rules here are constraints, not preferences:
 *  - The CTA is SAGE, not terracotta. A paywall is not a celebration, and dressing it as
 *    one is the tell of a product that is pleased with itself for charging you.
 *  - Three contextual benefits, tied to what the user just tried to do. Never a generic
 *    feature list — they know what they wanted, and a wall of bullets reads as a pitch.
 *  - A way out is always there, immediately: a header back button (not buried in content,
 *    works even with no navigation history — see lib/go-back.ts).
 *  - NO dark patterns, and the component cannot express them: no delayed close, no
 *    countdown, no "offer expires", no pre-ticked anything.
 *
 * The orb appears full. It is the only place in the app it does — this is what the product
 * looks like finished, which is the honest thing a paywall is actually selling.
 */
import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import Animated, { FadeIn, FadeInDown, useReducedMotion } from 'react-native-reanimated';
import { BulleOrb, Glyph } from '@bulle/ui/primitives';
import { Button, Text } from '@bulle/ui/components';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { goBack } from '@/lib/go-back';
import { HeaderAction } from '@/components/HeaderAction';
import { usePremiumStore } from '@/store/usePremiumStore';
import { getOffering, redeemPromoCode } from '@/lib/revenuecat';
import type { GateReason } from '@/lib/premium';

/** Which three benefits to show. Contextual to the gate the user actually hit (§10). */
const BENEFITS: Record<GateReason, string[]> = {
  adminTemplate: ['adminAll', 'adminTiming', 'unlimited'],
  projectLimit: ['unlimited', 'allTemplates', 'adminAll'],
};

export default function PaywallScreen() {
  const { reason } = useLocalSearchParams<{ reason?: GateReason }>();
  const { t } = useTranslation();
  const router = useRouter();
  const { colors, space, touch } = useBulleTheme();
  const reduced = useReducedMotion();

  /**
   * The price the STORE will actually charge, localised by it.
   *
   * This used to be a hardcoded i18n string ("29,99 € · une fois..."), which is a promise
   * the app cannot keep: change the price in the RevenueCat dashboard and the screen lies,
   * and any non-euro storefront was quoted euros it would never be billed in. `priceString`
   * comes from the store itself, already formatted for the user's region.
   *
   * Falls back to the written line when there is no offering (web, offline, a failed
   * configure). Showing an approximate price beats showing none, as long as the real one
   * wins whenever it is known.
   */
  const [priceString, setPriceString] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void getOffering().then((offering) => {
      const pkg = offering?.lifetime ?? offering?.availablePackages[0];
      if (!cancelled && pkg) setPriceString(pkg.product.priceString);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const purchasing = usePremiumStore((s) => s.purchasing);
  const isPremium = usePremiumStore((s) => s.isPremium);
  const [restoring, setRestoring] = useState(false);
  const [restoreFailed, setRestoreFailed] = useState(false);

  const gate: GateReason = reason === 'adminTemplate' ? 'adminTemplate' : 'projectLimit';
  const benefits = BENEFITS[gate];

  // Bought, or restored → leave immediately. Lingering on a paywall you have already paid
  // is the fastest way to make someone doubt the purchase went through.
  useEffect(() => {
    if (isPremium) goBack();
  }, [isPremium, router]);

  const buy = async () => {
    const { cancelled } = await usePremiumStore.getState().purchase();
    // Cancelling is a normal answer to a paywall. No toast, no "are you sure", nothing.
    if (cancelled) return;
  };

  const restore = async () => {
    setRestoring(true);
    setRestoreFailed(false);
    const ok = await usePremiumStore.getState().restore();
    setRestoring(false);
    if (!ok) setRestoreFailed(true);
  };

  return (
    // Scrollable, not centred-and-fixed: at this content height a small screen clipped the
    // orb off the top and pushed Restore below the fold. Restore being unreachable is not a
    // cosmetic bug — with no account it is the only route back to a purchase, and both
    // stores require it.
    // Stack.Screen is a SIBLING of Screen, not a child: nested in the ScrollView's content
    // container its options never reach the navigator, and this file's Stack.Screen is the
    // ONLY source of a header (there is no paywall/_layout and the root stack is headerless),
    // so the "way out" back button would never render at all.
    <>
      {/* The way out. In the header rather than inline text so it is reachable immediately
          and identically regardless of scroll position — and goBack() always lands
          somewhere real even with no navigation history (a paywall can be the first thing
          on the stack: a notification, a deep link). */}
      <Stack.Screen
        options={{
          headerShown: true,
          title: '',
          headerLeft: () => <HeaderAction label={t('common.back')} onPress={() => goBack()} />,
        }}
      />
      <Screen>

      <View style={{ gap: space[6], paddingVertical: space[4] }}>
        <Animated.View
          entering={reduced ? undefined : FadeIn.duration(500)}
          style={{ alignItems: 'center' }}
        >
          {/* Full, warm. The only full orb in the product. */}
          <BulleOrb fill={1} trimesterProgress={0.85} size={132} label={t('paywall.orbLabel')} />
        </Animated.View>

        <Animated.View
          entering={reduced ? undefined : FadeInDown.delay(120).duration(420)}
          style={{ gap: space[3] }}
        >
          <Text variant="display" style={{ textAlign: 'center' }}>
            {t('paywall.title')}
          </Text>
          <Text variant="body" color="inkSoft" style={{ textAlign: 'center' }}>
            {t(`paywall.lead.${gate}`)}
          </Text>
        </Animated.View>

        <Animated.View
          entering={reduced ? undefined : FadeInDown.delay(220).duration(420)}
          style={{ gap: space[3] }}
        >
          {benefits.map((key) => (
            <View key={key} style={{ flexDirection: 'row', gap: space[3], alignItems: 'center' }}>
              <Glyph name="check" size={18} color="sage" />
              <Text variant="body" style={{ flex: 1 }}>
                {t(`paywall.benefits.${key}`)}
              </Text>
            </View>
          ))}
        </Animated.View>

        <Animated.View
          entering={reduced ? undefined : FadeInDown.delay(300).duration(420)}
          style={{ gap: space[4] }}
        >
          <Text variant="caption" style={{ textAlign: 'center' }}>
            {priceString ? t('paywall.priceOnce', { price: priceString }) : t('paywall.price')}
          </Text>

          {/* Sage. Never terracotta. */}
          <Button label={t('paywall.cta')} onPress={buy} loading={purchasing} block />

          <Pressable
            onPress={() => void redeemPromoCode()}
            accessibilityRole="button"
            style={{ alignSelf: 'center', minHeight: touch.min, justifyContent: 'center' }}
          >
            <Text variant="caption">{t('paywall.promoCode')}</Text>
          </Pressable>

          {/* Restore is not optional: with no account, reinstalling is the ONLY route back
              to a purchase, and both stores require it for a non-consumable. */}
          <Pressable
            onPress={restore}
            disabled={restoring}
            accessibilityRole="button"
            style={{ alignSelf: 'center', minHeight: touch.min, justifyContent: 'center' }}
          >
            <Text variant="caption" color="sage">
              {restoring ? t('common.loading') : t('paywall.restore')}
            </Text>
          </Pressable>

          {restoreFailed && (
            <Text variant="caption" style={{ textAlign: 'center' }}>
              {t('paywall.restoreEmpty')}
            </Text>
          )}

          <Text variant="caption" style={{ textAlign: 'center', color: colors.inkSoft }}>
            {t('paywall.reassurance')}
          </Text>
        </Animated.View>
      </View>
      </Screen>
    </>
  );
}
