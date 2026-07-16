'use client';
/**
 * Chemin (spec §5.2) — the fil.
 *
 * The week-by-week editorial corpus (42 entries × profile variants, sage-femme reviewed) is
 * a content project, not a code one, so the cards are placeholders here. The fil itself is
 * real: it is the signature element, and it renders from the actual due date.
 *
 * Milestones mark the trimester boundaries and the three échographies — the weeks that
 * actually carry information, rather than a decorative marker every N rows.
 */
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Redirect } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { currentWeekSA, DPA_WEEKS_SA } from '@bulle/sdk';
import { Chemin, type CheminWeek } from '@bulle/ui/primitives';
import { Text } from '@bulle/ui/components';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { useBulleStore } from '@/store/useBulleStore';
import { useNow } from '@/lib/use-now';

/** The three French échographies, plus the trimester boundaries. */
const MILESTONE_WEEKS = new Set([12, 16, 22, 28, 32]);

export default function JourneyScreen() {
  const { t } = useTranslation();
  const { space } = useBulleTheme();
  const now = useNow();
  const bulle = useBulleStore((s) => s.bulle);

  const weeks = useMemo<CheminWeek[]>(
    () =>
      Array.from({ length: DPA_WEEKS_SA - 4 }, (_, i) => {
        const week = i + 5; // the Chemin starts around the first missed period
        return { week, milestone: MILESTONE_WEEKS.has(week) };
      }),
    [],
  );

  if (!bulle) return null;
  // The Journey is the single surface that must never appear in Pause mode (§3.1).
  if (bulle.pause.paused) return <Redirect href="/pause" />;

  const weekSA = currentWeekSA(bulle.profile.dueDate, now);

  return (
    <Screen>
      <Text variant="display">{t('journey.title')}</Text>

      <View style={{ flexDirection: 'row', gap: space[4] }}>
        <Chemin weeks={weeks} currentWeek={weekSA} />

        <View style={{ flex: 1, gap: space[5], paddingTop: space[4] }}>
          <Text variant="titleXL">{t('journey.weekTitle', { week: weekSA })}</Text>
          <Text variant="body" color="inkSoft">
            {t('journey.youAreHere')}
          </Text>
          <Text variant="caption">{t('journey.placeholder')}</Text>
        </View>
      </View>
    </Screen>
  );
}
