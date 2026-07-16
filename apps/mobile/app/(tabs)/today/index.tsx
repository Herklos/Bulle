'use client';
/**
 * Aujourd'hui (spec §5.1) — the answer to "what now?".
 *
 * Fixed vertical order, at most one screen tall. What is deliberately ABSENT is the design:
 * no backlog count, no streak, no percentage on the orb, no red anything, and exactly ONE
 * focus task however many are waiting.
 */
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  currentWeekSA,
  daysUntilEvent,
  nextEvents,
  pregnancyProgress,
  suggestFocus,
  weekDisplay,
  weekEssentials,
  type BulleEvent,
} from '@bulle/sdk';
import { BulleOrb, Glyph } from '@bulle/ui/primitives';
import { Checkbox, EmptyState, FocusCard, Row, SectionHeader, Text } from '@bulle/ui/components';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { FeatureWelcomeFor, useFeatureWelcome } from '@/lib/feature-welcomes';
import { bulleForWeekSG } from '@/assets/bulles';
import { useBulleStore } from '@/store/useBulleStore';
import { usePlanStore } from '@/store/usePlanStore';
import { useEventsStore } from '@/store/useEventsStore';
import { useReadinessStore } from '@/store/useReadinessStore';
import { useReadiness } from '@/lib/use-readiness';
import { useNow } from '@/lib/use-now';

/**
 * "demain", "dans 3 jours", or a date. Relative for the near ones because that is how
 * people actually hold an appointment in their head; absolute past a week, because
 * "dans 23 jours" is not information.
 */
function formatEventWhen(
  event: BulleEvent,
  now: number,
  t: (k: string, o?: Record<string, unknown>) => string,
  language: string,
): string {
  const days = daysUntilEvent(event, now);
  const time = new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(event.at));
  if (days === 0) return t('today.eventToday', { time });
  if (days === 1) return t('today.eventTomorrow', { time });
  if (days <= 7) return t('today.eventInDays', { count: days });
  return new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'fr-FR', {
    day: 'numeric',
    month: 'long',
  }).format(new Date(event.at));
}

export default function TodayScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const welcome = useFeatureWelcome('today');
  const { space } = useBulleTheme();
  const now = useNow();

  const bulle = useBulleStore((s) => s.bulle);
  const tasks = usePlanStore((s) => s.tasks);
  const projects = usePlanStore((s) => s.projects);
  const updateTask = usePlanStore((s) => s.updateTask);
  const readiness = useReadiness();

  const deferredIds = useReadinessStore((s) => s.deferredIds);
  const pulseKey = useReadinessStore((s) => s.pulseKey);
  const [showSG, setShowSG] = useState(false);

  const weekSA = bulle ? currentWeekSA(bulle.profile.dueDate, now) : 0;
  const focus = useMemo(
    () => suggestFocus(tasks, { weekSA, excludeIds: deferredIds }),
    [tasks, weekSA, deferredIds],
  );
  const essentials = useMemo(() => weekEssentials(tasks, weekSA), [tasks, weekSA]);

  const allEvents = useEventsStore((s) => s.events);
  const upcoming = useMemo(() => nextEvents(allEvents, now), [allEvents, now]);

  if (!bulle) return null;
  // Pause hides the countdown and readiness entirely (§3.1).
  if (bulle.pause.paused) return <Redirect href="/pause" />;

  const display = weekDisplay(bulle.profile.dueDate, now);
  const focusProject = projects.find((p) => p.id === focus?.projectId);

  /**
   * The orb's text equivalent (§15.8 item 4). Three cases, not two:
   * nothing tracked yet, some essentials left, and genuinely done.
   *
   * Collapsing the first two is a real bug: with no essential tasks, `total - resolved` is
   * 0, which takes the "done" branch and tells a screen-reader user "everything is ready"
   * about a bulle where nothing has been planned at all.
   */
  const remaining = readiness ? readiness.total - readiness.resolved : 0;
  const phrase = t(readiness?.phraseKey ?? 'readiness.empty');
  const orbLabel =
    !readiness || readiness.total === 0
      ? phrase
      : remaining > 0
        ? t('readiness.label', { phrase, remaining })
        : t('readiness.labelDone', { phrase });

  const complete = (taskId: string, essential: boolean) => {
    updateTask(taskId, { status: 'done' });
    // The orb acknowledges an essential with a single pulse (§15.6). Optional tasks don't
    // move the readiness, so they don't get the pulse — the feedback stays truthful.
    if (essential) useReadinessStore.getState().pulse();
  };

  return (
    <Screen>
      <FeatureWelcomeFor area='today' visible={welcome.visible} onDismiss={welcome.dismiss} />
      {/* Header */}
      <View style={{ alignItems: 'center', gap: space[2] }}>
        <Text variant="caption">{t('today.greeting')}</Text>

        <Text
          variant="caption"
          onPress={() => setShowSG((v) => !v)}
          // Tap to switch SA/SG (§7.2). French medical follow-up speaks SA; the rest of the
          // world quotes SG. Showing both, on demand, is a small competence signal.
          accessibilityRole="button"
        >
          {showSG
            ? t('today.weekLineSG', { sg: display.sg, days: display.daysUntil })
            : t('today.weekLine', { sa: display.sa, days: display.daysUntil })}
        </Text>

        {/*
          The baby lives INSIDE the bulle, not beside it. That is the product's metaphor made
          literal (§1.1: "une bulle est protectrice, douce, partagée") — the bubble contains
          the thing it protects. It also fixes the composition: an image floating next to the
          week line read as a stray sticker, and an empty orb read as a grey ball.

          Indexed by SG, not SA — the sheet is gestational age (see assets/bulles/index.ts).
        */}
        <BulleOrb
          fill={readiness?.fill ?? 0}
          trimesterProgress={pregnancyProgress(bulle.profile.dueDate, now)}
          size={156}
          label={orbLabel}
          pulseKey={pulseKey}
          innerImage={bulleForWeekSG(display.sg)}
        />

        <Text variant="body" color="inkSoft">
          {t(readiness?.phraseKey ?? 'readiness.empty')}
        </Text>

        {/* A drop is only ever shown WITH its reason (§6) — never a silent regression. */}
        {readiness?.regressionReason === 'profile-changed' && (
          <Text variant="caption">{t('readiness.profileChanged')}</Text>
        )}
      </View>

      {/* Focus — one task, or an honest empty state. */}
      {focus ? (
        <FocusCard
          projectTitle={focusProject?.title ?? ''}
          taskTitle={focus.title}
          effortLabel={t(`plan.effort.${focus.effort}`)}
          doneLabel={t('today.done')}
          laterLabel={t('today.later')}
          onDone={() => complete(focus.id, focus.essential)}
          onLater={() => useReadinessStore.getState().defer(focus.id)}
        />
      ) : (
        <EmptyState glyph="leaf" message={t('today.emptyFocus')} />
      )}

      {/*
        À venir (§5.1) — at most 2. The home screen answers "what now?", and a full calendar
        here would turn it back into the backlog it exists to avoid.

        The header renders even with NO events, because it carries the only "add" affordance
        in the app: gating it on `upcoming.length > 0` means a new user has no way to add
        their first appointment. One quiet line is the price of the feature being reachable.
      */}
      <View>
        <SectionHeader
          title={t('today.upcoming')}
          action={{ label: t('today.addEvent'), onPress: () => router.push('/event/new') }}
        />
        {upcoming.length === 0 ? (
          <Text variant="caption">{t('today.noEvents')}</Text>
        ) : (
          upcoming.map((event, index) => (
            <Row
              key={event.id}
              title={event.title}
              subtitle={formatEventWhen(event, now, t, i18n.language)}
              leading={<Glyph name="calendar" size={20} color="dustyBlue" />}
              divider={index < upcoming.length - 1}
            />
          ))
        )}
      </View>

      {/* This week — at most 3, essentials only. */}
      {essentials.length > 0 && (
        <View>
          <SectionHeader title={t('today.thisWeek')} />
          {essentials.map((task) => (
            <View
              key={task.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: space[4],
                paddingVertical: space[3],
              }}
            >
              <Checkbox
                checked={false}
                onChange={() => complete(task.id, task.essential)}
                accessibilityLabel={task.title}
              />
              <Text variant="body" style={{ flex: 1 }}>
                {task.title}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* One quiet, honest line. Never "You're doing great!!" */}
      <Text variant="caption" style={{ textAlign: 'center' }}>
        {focus ? t('today.calm') : t('today.caughtUp')}
      </Text>
    </Screen>
  );
}
