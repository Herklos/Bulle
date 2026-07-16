'use client';
/**
 * Native tabs (iOS/Android). The web build resolves `_layout.web.tsx` instead.
 *
 * `NativeTabs` renders a REAL platform tab bar: a UITabBar on iOS with SF Symbols, Material
 * on Android. That is the whole point of the platform split — a JS tab bar on native looks
 * approximately right and feels wrong.
 *
 * No badges. Spec §15.6 bans them outright ("Badges : n'existent pas. Aucun point rouge
 * nulle part"), which is a deliberate divergence from wedding-os' overdue badge. A red dot
 * on a pregnancy-preparation app is exactly the anxiety this product exists to remove.
 */
import React from 'react';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useTranslation } from 'react-i18next';
import { withAlpha } from '@bulle/ui/primitives';
import { useBulleTheme } from '@bulle/ui/theme';
import { usePauseState } from '@/lib/use-pause';

export default function TabLayout() {
  const { t } = useTranslation();
  const { colors } = useBulleTheme();
  const paused = usePauseState();

  return (
    // backgroundColor/iconColor are set explicitly: left alone, the bar renders Material's
    // default surface (a pale lavender on Android), which is the one piece of chrome that
    // does not belong to the palette and reads as "unfinished RN app" against the ivory.
    <NativeTabs
      tintColor={colors.sage}
      backgroundColor={colors.bg}
      iconColor={colors.inkSoft}
      // The pill behind the selected icon is a SEPARATE property from tintColor, and it
      // falls back to Material You's secondaryContainer — a pale lavender, on a palette with
      // no blue or purple anywhere in it. tintColor was already set and does work (the label
      // reads sage), which is exactly why this survived: the tab looked half-right, so the
      // half that was wrong read as intentional.
      //
      // Sage at 0.18 rather than solid: the pill sits UNDER the icon, and a solid sage one
      // would fight the icon it is meant to be indicating.
      indicatorColor={withAlpha(colors.sage, 0.18)}
      // Same leak, same default, one interaction later — the touch ripple.
      rippleColor={withAlpha(colors.sage, 0.12)}
    >
      <NativeTabs.Trigger name="today">
        <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} md="home" />
        <NativeTabs.Trigger.Label>{t('tabs.today')}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      {/* Hidden in Pause mode: the Journey is the one surface that must never appear
          after a loss (§3.1). */}
      {!paused && (
        <NativeTabs.Trigger name="journey">
          <NativeTabs.Trigger.Icon sf={{ default: 'map', selected: 'map.fill' }} md="route" />
          <NativeTabs.Trigger.Label>{t('tabs.journey')}</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      )}

      <NativeTabs.Trigger name="plan">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'checklist', selected: 'checklist' }}
          md="checklist"
        />
        <NativeTabs.Trigger.Label>{t('tabs.plan')}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="memories">
        <NativeTabs.Trigger.Icon sf={{ default: 'sparkles', selected: 'sparkles' }} md="auto_awesome" />
        <NativeTabs.Trigger.Label>{t('tabs.memories')}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      {/* "Plus" (§4.1). Family management, language, and Pause live here rather than in
          their own tab: a tab must earn daily taps, and "manage members" does not. Without
          it, none of those screens is reachable on native at all. */}
      <NativeTabs.Trigger name="more">
        <NativeTabs.Trigger.Icon sf={{ default: 'ellipsis', selected: 'ellipsis' }} md="more_horiz" />
        <NativeTabs.Trigger.Label>{t('tabs.more')}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
