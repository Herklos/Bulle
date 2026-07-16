'use client';
/**
 * The week's illustration, shown beside the week line on Aujourd'hui.
 *
 * A COMPANION to the orb, not a replacement. They encode different things and both are
 * wanted: the orb is readiness (§6 — how prepared you are, monotonic, fed by Préparer),
 * this is gestational age. Swapping one for the other would delete the readiness display
 * that the entire Préparer slice exists to drive.
 *
 * Grief-safety: this is figurative baby imagery, which §8.1 otherwise bans. It is gated on
 * Pause mode by the fact that Aujourd'hui redirects to /pause when paused, so a paused
 * bulle never renders it. If this component is ever reused on another screen, that screen
 * must carry its own Pause gate — do not assume the redirect covers you.
 *
 * Indexed by SG, not SA. See assets/bulles/index.ts.
 */
import React from 'react';
import { Image, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useBulleTheme } from '@bulle/ui/theme';
import { bulleForWeekSG } from '@/assets/bulles';

export interface WeekBulleProps {
  /** Semaines de grossesse (SA - 2). */
  weekSG: number;
  size?: number;
}

export function WeekBulle({ weekSG, size = 72 }: WeekBulleProps) {
  const { t } = useTranslation();
  const { colors } = useBulleTheme();

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={t('today.weekBulleLabel', { week: weekSG })}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: 'hidden',
        backgroundColor: colors.surface,
      }}
    >
      <Image
        source={bulleForWeekSG(weekSG)}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </View>
  );
}
