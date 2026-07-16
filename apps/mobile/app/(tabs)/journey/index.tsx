'use client';
/**
 * Chemin (spec §5.2) — the fil, and what a week actually holds.
 *
 * The card shows the week's REAL content: the appointments in it, the task windows opening
 * in it, and the souvenirs written during it. All three come from the user's own data, so
 * this needs no editorial corpus and — more importantly — it is not a tracker. §1.2 is
 * explicit that week-by-week fetal medical content is an anti-goal, and the placeholder this
 * replaces ("week-by-week content is coming soon") was promising exactly the thing the
 * product exists in order not to be.
 *
 * Step through the weeks to look at any of them. Looking ahead is allowed here: the fil is
 * the one place where seeing what is coming is the point, which is why the home screen caps
 * everything and this does not.
 *
 * Milestones mark the trimester boundaries and the three échographies — the weeks that
 * actually carry information, rather than a decorative marker every N rows.
 */
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  currentWeekSA,
  DPA_WEEKS_SA,
  eventsInWeek,
  isResolved,
  memoriesForWeek,
  SA_TO_SG_OFFSET,
} from '@bulle/sdk';
import { Chemin, Glyph, type CheminWeek } from '@bulle/ui/primitives';
import { Row, Text } from '@bulle/ui/components';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { FeatureWelcomeFor, useFeatureWelcome } from '@/lib/feature-welcomes';
import { useBulleStore } from '@/store/useBulleStore';
import { usePlanStore } from '@/store/usePlanStore';
import { useEventsStore } from '@/store/useEventsStore';
import { useMemoriesStore } from '@/store/useMemoriesStore';
import { useNow } from '@/lib/use-now';

/** The three French échographies, plus the trimester boundaries. */
const MILESTONE_WEEKS = new Set([12, 16, 22, 28, 32]);

export default function JourneyScreen() {
  const { t, i18n } = useTranslation();
  const welcome = useFeatureWelcome('journey');
  const router = useRouter();
  const { space } = useBulleTheme();
  const now = useNow();

  const bulle = useBulleStore((s) => s.bulle);
  const allTasks = usePlanStore((s) => s.tasks);
  const projects = usePlanStore((s) => s.projects);
  const allEvents = useEventsStore((s) => s.events);
  const allMemories = useMemoriesStore((s) => s.memories);

  const [selected, setSelected] = useState<number | null>(null);

  const weeks = useMemo<CheminWeek[]>(
    () =>
      Array.from({ length: DPA_WEEKS_SA - 4 }, (_, i) => {
        const week = i + 5; // the Chemin starts around the first missed period
        return { week, milestone: MILESTONE_WEEKS.has(week) };
      }),
    [],
  );

  const weekSA = bulle ? currentWeekSA(bulle.profile.dueDate, now) : 0;
  const shown = selected ?? weekSA;
  const dueDate = bulle?.profile.dueDate ?? '';

  const events = useMemo(
    () => (dueDate ? eventsInWeek(allEvents, shown, dueDate, DPA_WEEKS_SA) : []),
    [allEvents, shown, dueDate],
  );

  // Windows OPENING this week, not merely spanning it: a task running 6 to 16 SA would
  // otherwise appear on eleven consecutive weeks and the card would read as a backlog.
  const opening = useMemo(
    () => allTasks.filter((task) => task.weekStart === shown && !isResolved(task)),
    [allTasks, shown],
  );

  // Souvenirs are stamped in SG (§7.2), so the SA week has to be converted to match.
  const memories = useMemo(
    () => memoriesForWeek(allMemories, shown - SA_TO_SG_OFFSET),
    [allMemories, shown],
  );

  if (!bulle) return null;
  // The Journey is the single surface that must never appear in Pause mode (§3.1).
  if (bulle.pause.paused) return <Redirect href="/pause" />;

  const formatTime = (iso: string) =>
    new Intl.DateTimeFormat(i18n.language === 'en' ? 'en-GB' : 'fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso));

  const empty = events.length === 0 && opening.length === 0 && memories.length === 0;

  return (
    <Screen>
      <FeatureWelcomeFor area="journey" visible={welcome.visible} onDismiss={welcome.dismiss} />
      <Text variant="display">{t('journey.title')}</Text>

      <View style={{ flexDirection: 'row', gap: space[4] }}>
        {/*
          weekSA, NOT `shown`: the fil marks where you ARE. Browsing ahead must not move the
          "vous êtes ici" node — the marker is the one fixed fact on this screen, and sliding
          it to whatever week you happened to tap would make the fil lie about the pregnancy.
          The heading says which week is being looked at; the fil says which week is real.
        */}
        <Chemin weeks={weeks} currentWeek={weekSA} />

        <View style={{ flex: 1, gap: space[5], paddingTop: space[4] }}>
          <View style={{ gap: space[2] }}>
            <Text variant="titleXL">{t('journey.weekTitle', { week: shown })}</Text>
            <Text variant="caption">
              {shown === weekSA
                ? t('journey.youAreHere')
                : shown < weekSA
                  ? t('journey.behindYou')
                  : t('journey.ahead')}
            </Text>

            {/*
              The stepper sits WITH the week it changes, not under the fil. The fil is ~37
              weeks tall, so anything below it is a very long scroll past an empty column
              away from the thing it controls.

              It is also why the fil itself is not the control: giving it per-node hit
              targets would mean 37 touch areas on a 24px-wide serpentine, nearly all of them
              under 44pt (§15.8 item 5).
            */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: space[4] }}>
              <Text
                variant="body"
                color="sage"
                accessibilityRole="button"
                onPress={() => setSelected(Math.max(5, shown - 1))}
              >
                {t('journey.previousWeek')}
              </Text>
              <Text
                variant="body"
                color="sage"
                accessibilityRole="button"
                onPress={() => setSelected(Math.min(DPA_WEEKS_SA, shown + 1))}
              >
                {t('journey.nextWeek')}
              </Text>
              {shown !== weekSA && (
                <Text
                  variant="body"
                  color="sage"
                  accessibilityRole="button"
                  onPress={() => setSelected(null)}
                >
                  {t('journey.backToNow')}
                </Text>
              )}
            </View>
          </View>

          {events.map((event) => (
            <Row
              key={event.id}
              title={event.title}
              subtitle={formatTime(event.at)}
              leading={<Glyph name="calendar" size={20} color="dustyBlue" />}
            />
          ))}

          {opening.map((task) => (
            <Row
              key={task.id}
              title={task.title}
              subtitle={projects.find((p) => p.id === task.projectId)?.title}
              leading={<Glyph name="check" size={20} color="sage" />}
              onPress={() => router.push(`/plan/${task.projectId}` as never)}
              chevron
            />
          ))}

          {memories.map((memory) => (
            <Row
              key={memory.id}
              title={memory.title ?? memory.body ?? ''}
              leading={<Glyph name="souvenirs" size={20} color="sage" />}
              onPress={() => router.push(`/memory/${memory.id}` as never)}
              chevron
            />
          ))}

          {/* A quiet line, not an EmptyState: most weeks hold nothing, and that is a calm
              fact about a calm week rather than a gap to be filled. */}
          {empty && <Text variant="caption">{t('journey.quietWeek')}</Text>}
        </View>
      </View>
    </Screen>
  );
}
