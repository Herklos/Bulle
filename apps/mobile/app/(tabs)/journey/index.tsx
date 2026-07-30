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
import { Pressable, View } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  currentWeekSA,
  DPA_WEEKS_SA,
  eventsInWeek,
  isResolved,
  memoriesForWeek,
  memoryPreview,
} from '@bulle/sdk';
import { Chemin, Glyph, buildCheminWeeks, clampCheminWeek, type CheminWeek, type GlyphName } from '@bulle/ui/primitives';
import { Row, Text } from '@bulle/ui/components';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { FeatureWelcomeFor, useFeatureWelcome } from '@/lib/feature-welcomes';
import { useBulleStore } from '@/store/useBulleStore';
import { usePlanStore } from '@/store/usePlanStore';
import { useEventsStore } from '@/store/useEventsStore';
import { useMemoriesStore } from '@/store/useMemoriesStore';
import { useNow } from '@/lib/use-now';

/**
 * One step of the week stepper.
 *
 * A glyph rather than a word: "Avant"/"Après" cost two words to say what an arrow says
 * instantly, they sat at inconsistent widths so the row reflowed as the label changed, and
 * they needed translating to say nothing. The direction IS the meaning.
 *
 * The label survives as `accessibilityLabel` — dropping it would trade a visual improvement
 * for an unlabelled button, which is not a trade (§15.8 item 4).
 *
 * 44×44 with the glyph at 22: these were bare `<Text onPress>` before, whose touch target
 * was the text box itself, around 40×20. Under the 44pt floor in both axes.
 */
function IconStep({
  glyph,
  label,
  onPress,
  disabled,
}: {
  glyph: GlyphName;
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        // The end of the fil is a real edge, not an error. Fading is how a stepper says
        // "nothing further this way" without a disabled-looking box or a message.
        opacity: disabled ? 0.3 : pressed ? 0.5 : 1,
      })}
    >
      <Glyph name={glyph} size={22} color={disabled ? 'inkSoft' : 'sage'} />
    </Pressable>
  );
}

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

  const weeks = useMemo<CheminWeek[]>(() => buildCheminWeeks(1, DPA_WEEKS_SA), []);

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

  // Souvenirs are stamped in SA, same as the Chemin heading — look up by `shown` directly.
  const memories = useMemo(
    () => memoriesForWeek(allMemories, shown),
    [allMemories, shown],
  );

  if (!bulle) return null;
  // The Journey is the single surface that must never appear in Pause mode (§3.1).
  if (bulle.pause.paused) return <Redirect href="/pause" />;

  // Weekday + time, not day + month: inside a card that already names the week, the date is
  // redundant and reads as a raw timestamp. "jeudi 14:30" orients you within the week at a
  // glance.
  const formatTime = (iso: string) =>
    new Intl.DateTimeFormat(i18n.language === 'en' ? 'en-GB' : 'fr-FR', {
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso));

  const empty = events.length === 0 && opening.length === 0 && memories.length === 0;

  const browse = (week: number) => setSelected(clampCheminWeek(week, 1, DPA_WEEKS_SA));

  // Appointments, task windows and souvenirs used to render as three separate stacks of
  // Row, each with its own 24px column gap AND its own hairline divider — a divider floating
  // in whitespace, which reads as neither a tight list nor an airy one. Worse, tasks and
  // souvenirs both led with a sage glyph, so a to-do and a memory looked identical. Unify
  // them into ONE list: souvenirs take a non-action `inkSoft` (a memory is not something to
  // act on), the divider is dropped only on the true last row, and the leading glyph shape
  // still distinguishes the three (calendar / check / star). Order is appointments → tasks →
  // souvenirs, the sequence a week is actually lived in.
  const rows: Array<{
    key: string;
    title: string;
    subtitle?: string;
    glyph: GlyphName;
    color: 'dustyBlue' | 'sage' | 'inkSoft';
    onPress: () => void;
  }> = [
    ...events.map((event) => ({
      key: `event-${event.id}`,
      title: event.title,
      subtitle: formatTime(event.at),
      glyph: 'calendar' as GlyphName,
      color: 'dustyBlue' as const,
      onPress: () => router.push(`/event/${event.id}` as never),
    })),
    ...opening.map((task) => ({
      key: `task-${task.id}`,
      title: task.title,
      subtitle: projects.find((p) => p.id === task.projectId)?.title,
      glyph: 'check' as GlyphName,
      color: 'sage' as const,
      onPress: () => router.push(`/plan/${task.projectId}` as never),
    })),
    ...memories.map((memory) => ({
      key: `memory-${memory.id}`,
      title: memoryPreview(memory),
      glyph: 'souvenirs' as GlyphName,
      color: 'inkSoft' as const,
      onPress: () => router.push(`/memory/${memory.id}` as never),
    })),
  ];

  return (
    <Screen>
      <FeatureWelcomeFor area="journey" visible={welcome.visible} onDismiss={welcome.dismiss} />
      <Text variant="display" heading={1}>
        {t('journey.title')}
      </Text>

      <View style={{ flexDirection: 'row', gap: space[4] }}>
        {/*
          weekSA, NOT `shown`: the fil marks where you ARE. Browsing ahead must not move the
          "vous êtes ici" node — the marker is the one fixed fact on this screen, and sliding
          it to whatever week you happened to tap would make the fil lie about the pregnancy.
          The heading says which week is being looked at; the fil says which week is real.
        */}
        <Chemin
          weeks={weeks}
          currentWeek={weekSA}
          selectedWeek={shown}
          onSelectWeek={browse}
          weekAccessibilityLabel={(week) => t('journey.weekTitle', { week })}
          // The stepper below is the assistive-tech browse path (prev / next / back to now),
          // so the fil's 41 node overlays stay tappable for sighted users but leave the a11y
          // tree — otherwise VoiceOver reads 41 week buttons before the week card itself.
          nodesAccessible={false}
        />

        <View style={{ flex: 1, gap: space[5], paddingTop: space[4] }}>
          <View style={{ gap: space[2] }}>
            <Text variant="titleXL">{t('journey.weekTitle', { week: shown })}</Text>
            {/* "Vous êtes ici" is the Chemin's emotional anchor — the text twin of the fil's
                orb — so it lands in ink, exactly as Aujourd'hui lifts its readiness phrase.
                The two orientation states ("Derrière vous" / "Encore devant") stay the quiet
                inkSoft default. */}
            <Text variant="caption" color={shown === weekSA ? 'ink' : undefined}>
              {shown === weekSA
                ? t('journey.youAreHere')
                : shown < weekSA
                  ? t('journey.behindYou')
                  : t('journey.ahead')}
            </Text>

            {/*
              The stepper sits WITH the week it changes, not under the fil. The fil is tall,
              so anything below it is a long scroll past an empty column away from the thing
              it controls. Nodes are also tappable (44pt overlays on the fil).
            */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: space[2] }}>
              <IconStep
                glyph="chevronLeft"
                label={t('journey.previousWeek')}
                onPress={() => browse(shown - 1)}
                disabled={shown <= 1}
              />
              <IconStep
                glyph="chevronRight"
                label={t('journey.nextWeek')}
                onPress={() => browse(shown + 1)}
                disabled={shown >= DPA_WEEKS_SA}
              />
              {/* Only once you have wandered off. Showing a disabled "back to now" while you
                  ARE at now is a control that spends space to say nothing. */}
              {shown !== weekSA && (
                <IconStep
                  glyph="today"
                  label={t('journey.backToNow')}
                  onPress={() => setSelected(null)}
                />
              )}
            </View>
          </View>

          {rows.length > 0 && (
            <View>
              {rows.map((row, index) => (
                <Row
                  key={row.key}
                  title={row.title}
                  subtitle={row.subtitle}
                  // Same fixed `space[5]` leading slot the other glyph-led lists use, so the
                  // week card's rows share one title spine with Aujourd'hui and Souvenirs.
                  leading={
                    <View style={{ width: space[5], alignItems: 'center' }}>
                      <Glyph name={row.glyph} size={20} color={row.color} />
                    </View>
                  }
                  onPress={row.onPress}
                  chevron
                  divider={index < rows.length - 1}
                />
              ))}
            </View>
          )}

          {/* A quiet line, not an EmptyState: most weeks hold nothing, and that is a calm
              fact about a calm week rather than a gap to be filled. A FUTURE week is empty
              because it has not happened yet ("rien de prévu"), not because it went unrecorded
              ("rien de noté") — the past-tense line would mislabel it. */}
          {empty && (
            <Text variant="caption">
              {shown > weekSA ? t('journey.quietWeekAhead') : t('journey.quietWeek')}
            </Text>
          )}
        </View>
      </View>
    </Screen>
  );
}
