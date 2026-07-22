'use client';
/**
 * Aujourd'hui (spec §5.1) — the answer to "what now?".
 *
 * Fixed vertical order, at most one screen tall. What is deliberately ABSENT is the design:
 * no backlog count, no streak, no percentage on the orb, no red anything, and exactly ONE
 * focus task however many are waiting.
 */
import React, { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  completeTaskUpdates,
  currentWeekSA,
  daysLeftAfterBirth,
  daysSinceBirth,
  daysUntilEvent,
  isCounted,
  nextEvents,
  openPostBirthTasks,
  partnerActivity,
  pregnancyProgress,
  setTaskCount,
  setTaskTarget,
  stepTaskCount,
  suggestFocus,
  taskCount,
  weekDisplay,
  weekEssentials,
  currentWeekSG,
  memoriesForWeek,
  type BulleEvent,
  type Task,
} from '@bulle/sdk';
import { BulleOrb, Glyph } from '@bulle/ui/primitives';
import { Checkbox, EmptyState, FocusCard, Row, SectionHeader, Stepper, Text } from '@bulle/ui/components';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { FeatureWelcomeFor, useFeatureWelcome } from '@/lib/feature-welcomes';
import { bulleForWeekSG } from '@/assets/bulles';
import { useBulleStore } from '@/store/useBulleStore';
import { usePlanStore } from '@/store/usePlanStore';
import { useEventsStore } from '@/store/useEventsStore';
import { useMemoriesStore } from '@/store/useMemoriesStore';
import { useReadinessStore } from '@/store/useReadinessStore';
import { useReadiness } from '@/lib/use-readiness';
import { useNow } from '@/lib/use-now';
import { getSession } from '@/lib/starfish';

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

/**
 * "Encore 4 jours", "Aujourd'hui", or "Le délai est passé".
 *
 * An expired deadline says so plainly rather than turning red or vanishing. §15.1 reserves
 * red for destructive actions and never for lateness — and a right that has been forfeited
 * is a fact to state calmly, not an alarm to sound at someone holding a newborn.
 */
function deadlineLabel(
  task: Task,
  birthDate: string,
  now: number,
  t: (k: string, o?: Record<string, unknown>) => string,
): string {
  const left = daysLeftAfterBirth(task, birthDate, now);
  if (left === null) return '';
  if (left < 0) return t('birth.deadlinePassed');
  if (left === 0) return t('birth.deadlineToday');
  return t('birth.deadlineDays', { count: left });
}

export default function TodayScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const welcome = useFeatureWelcome('today');
  const { space, touch } = useBulleTheme();
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

  // Once the baby is here, the legal clock outranks the gestational one: the week no longer
  // advances, but "5 days to declare the birth" very much does (see domain/postnatal.ts).
  const postBirth = useMemo(
    () => (bulle ? openPostBirthTasks(tasks, bulle, now) : []),
    [tasks, bulle, now],
  );

  // Ensemble (§5.1). Solo bulles have no partner, so the module does not exist for them —
  // a "Ton co-parent…" ghost on a solo screen is exactly the failure §3 exists to prevent.
  // Souvenirs written for THIS week. Select the raw array and derive with useMemo: a
  // selector that filters returns a new array every call and re-renders forever.
  const allMemories = useMemoriesStore((s) => s.memories);
  const weekMemories = useMemo(
    () => (bulle ? memoriesForWeek(allMemories, currentWeekSG(bulle.profile.dueDate, now)) : []),
    [allMemories, bulle, now],
  );

  const solo = bulle?.profile.companionship === 'solo';
  const myUserId = getSession()?.userId;
  const partner = useMemo(
    () => (solo ? [] : partnerActivity(tasks, { myUserId, now })),
    [solo, tasks, myUserId, now],
  );

  if (!bulle) return null;
  // Pause hides the countdown and readiness entirely (§3.1).
  if (bulle.pause.paused) return <Redirect href="/pause" />;

  const display = weekDisplay(bulle.profile.dueDate, now);
  const focusProject = projects.find((p) => p.id === focus?.projectId);

  const born = !!bulle.birthDate;
  const daysSince = bulle.birthDate ? daysSinceBirth(bulle.birthDate, now) : 0;

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

  const complete = (task: Task) => {
    const { essential } = task;
    // A counted task ticked from here is filled to its target — see completeTaskUpdates.
    // Today offers one gesture per task and it must not leave count and status disagreeing.
    updateTask(task.id, completeTaskUpdates(task));
    // The orb acknowledges an essential with a single pulse (§15.6). Optional tasks don't
    // move the readiness, so they don't get the pulse — the feedback stays truthful.
    if (essential) useReadinessStore.getState().pulse();
  };

  /**
   * A counted task is nudged, not completed, from here — the same contract as the Préparer
   * list and the task screen. `status` is derived alongside `count` (see stepTaskCount), so
   * readiness only pulses on the tap that actually reaches the target.
   */
  const applyCount = (
    task: Task,
    next: { count: number; status: Task['status']; target?: number },
  ) => {
    updateTask(task.id, next);
    if (next.status === 'done' && task.status !== 'done' && task.essential) {
      useReadinessStore.getState().pulse();
    }
  };

  const step = (task: Task, delta: number) => applyCount(task, stepTaskCount(task, delta));

  /** The stepper wiring a counted task needs, wherever the home screen shows one. */
  const countedProps = (task: Task) => ({
    count: taskCount(task),
    target: task.target!,
    onStep: (delta: number) => step(task, delta),
    onSetCount: (nextCount: number) => applyCount(task, setTaskCount(task, nextCount)),
    onSetTarget: (nextTarget: number) => applyCount(task, setTaskTarget(task, nextTarget)),
    accessibilityLabel: task.title,
  });

  return (
    <Screen>
      <FeatureWelcomeFor area='today' visible={welcome.visible} onDismiss={welcome.dismiss} />

      {/*
        Plus, in the corner rather than in the tab bar.
        A tab is a place you go daily; settings is not one, and spending a fifth of the tab
        bar on it said otherwise. Moving it here also buys the Chemin, Préparer and Souvenirs
        more room, and drops the bar to four — which is what the app actually has.

        Absolute, so it does not push the greeting off centre. The greeting is centred and a
        row would either shove it left or need a phantom spacer on the other side to keep it
        honest; both are worse than taking the button out of flow.

        It scrolls with the content on purpose. Pinning it would need a header on a screen
        that deliberately has none — the orb is meant to be the first thing, with nothing
        above it.
      */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t('tabs.more')}
        onPress={() => router.push('/more')}
        style={({ pressed }) => ({
          position: 'absolute',
          top: 0,
          right: 0,
          // 44 square: this is a lone glyph, and the glyph is 22 (§15.8 item 5).
          width: 44,
          height: 44,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          opacity: pressed ? 0.5 : 1,
        })}
      >
{/* The gear, not the `more` dots it carried as a tab.
            Consistency with the old tab icon was my argument and it was the wrong one: the
            `more` glyph is `M6 12h0M12 12h0M18 12h0`, three zero-length caps, and three
            1.75px dots alone in a corner are nearly invisible. A tab bar gave them a label
            and four neighbours to be read against; a bare corner gives them nothing. The
            gear survives being alone, which is the job here.

            `inkSoft`, matching the "Bonjour" caption it sits level with. I reached for `ink`
            on the grounds that this is the only control up here so nothing is louder than it
            — which had the argument backwards. The orb is what should be loudest on this
            screen, and a full-strength gear in the corner competes with it. Quiet is the
            point: the gear is now legible enough to find (it is a gear, not three 1.75px
            dots) and does not ask to be looked at. */}
        <Glyph name="settings" size={22} color="inkSoft" />
      </Pressable>

      {/* Header */}
      <View style={{ alignItems: 'center', gap: space[2] }}>
        <Text variant="caption">{t('today.greeting')}</Text>

        {/* After the birth the countdown is meaningless — the gestational week has stopped
            and "J-0" is not information. Days since the birth is what a new parent is
            actually keeping track of, and it is the unit every deadline below uses. */}
        {born ? (
          <Text variant="caption">
            {daysSince === 0 ? t('birth.dayOne') : t('birth.dayN', { count: daysSince + 1 })}
          </Text>
        ) : (
          // Tap to switch SA/SG (§7.2). French medical follow-up speaks SA; the rest of the
          // world quotes SG. Showing both, on demand, is a small competence signal.
          // A Pressable, not a bare tappable Text: it needs a real touch target and pressed
          // feedback. hitSlop rather than padding, so the header's centred gap is unchanged.
          <Pressable
            accessibilityRole="button"
            accessibilityHint={t('today.weekToggleHint')}
            hitSlop={touch.min}
            onPress={() => setShowSG((v) => !v)}
            style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
          >
            <Text variant="caption">
              {showSG
                ? t('today.weekLineSG', { sg: display.sg, days: display.daysUntil })
                : t('today.weekLine', { sa: display.sa, days: display.daysUntil })}
            </Text>
          </Pressable>
        )}

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
          // Nothing inside it once the baby is out. The weekly illustration is keyed off the
          // DUE DATE, so after the birth it keeps showing a fetus at whatever week the
          // pregnancy would have been — a first-trimester embryo to someone holding a
          // newborn. The orb still means something (the post-birth deadlines fill it); the
          // picture does not.
          innerImage={born ? undefined : bulleForWeekSG(display.sg)}
        />

        <Text
          variant="body"
          color="inkSoft"
          importantForAccessibility="no"
          accessibilityElementsHidden={true}
        >
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
          onDone={() => complete(focus)}
          onLater={() => useReadinessStore.getState().defer(focus.id)}
          onOpen={() => router.push(`/task/${focus.id}` as never)}
          // A counted focus task steps toward its target instead of jumping to done.
          counted={isCounted(focus) ? countedProps(focus) : undefined}
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
      {/*
        After the birth (§5.4). These carry real legal deadlines counted in DAYS from the
        birth — 5 for the mairie, 6 months for the congé paternité — so they are the one
        place in Bulle that shows a countdown at all. It is not a nudge: the congé is an
        individual, non-transferable right, and what is not taken is lost rather than
        deferred.
      */}
      {postBirth.length > 0 && (
        <View>
          <SectionHeader title={t('birth.afterBirth')} />
          {postBirth.map((task, index) => (
            <Row
              key={task.id}
              title={task.title}
              subtitle={deadlineLabel(task, bulle.birthDate!, now, t)}
              leading={<Glyph name="stamp" size={20} color="sage" />}
              onPress={() => router.push(`/task/${task.id}` as never)}
              chevron
              divider={index < postBirth.length - 1}
            />
          ))}
        </View>
      )}

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
              // A scan gets MOVED; that is the normal case. Inert, this row showed a date
              // the user knew was wrong and offered nothing to do about it.
              onPress={() => router.push(`/event/${event.id}` as never)}
              chevron
              divider={index < upcoming.length - 1}
            />
          ))
        )}
      </View>

      {/* This week — at most 3, essentials only. */}
      {essentials.length > 0 && (
        <View>
          <SectionHeader title={t('today.thisWeek')} />
          {essentials.map((task) => {
            // A counted task answers "how many", so it carries the stepper here rather than a
            // checkbox that would fill it to target in one tap. Same split as the Préparer
            // list. The leading pad keeps its title aligned with the checkbox rows above it.
            const counted = isCounted(task);
            return (
              <View
                key={task.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: space[4],
                  paddingVertical: space[3],
                }}
              >
                {!counted && (
                  <Checkbox
                    checked={false}
                    onChange={() => complete(task)}
                    accessibilityLabel={task.title}
                  />
                )}
                <Pressable
                  style={{ flex: 1, paddingLeft: counted ? 24 + space[4] : 0 }}
                  onPress={() => router.push(`/task/${task.id}` as never)}
                  accessibilityRole="button"
                >
                  <Text variant="body">{task.title}</Text>
                </Pressable>
                {counted && <Stepper {...countedProps(task)} />}
              </View>
            );
          })}
        </View>
      )}

      {/*
        Ensemble (§5.1) — at most 2 lines, and nothing at all when there is nothing to say.
        No counts, no comparison, no "Alex: 12, toi: 4". Most of the work of preparing is
        invisible to the other person; this makes a little of it visible. It must never
        become a scoreboard between two people about to have a child.
      */}
      {partner.length > 0 && (
        <View>
          <SectionHeader title={t('today.together')} />
          {partner.map((task, index) => (
            <Row
              key={task.id}
              title={t(task.status === 'dismissed' ? 'today.partnerDismissed' : 'today.partnerDid', {
                title: task.title,
              })}
              leading={<Glyph name="members" size={20} color="sage" />}
              divider={index < partner.length - 1}
            />
          ))}
        </View>
      )}

      {/*
        A souvenir is the one thing here nobody will ever remind you about, because it has no
        deadline: a task shouts by having a window, and a moment just quietly does not happen.
        Preparing is the app's job and remembering is its point (§1.2), so the invitation has
        to exist somewhere.

        Only when the week is genuinely empty of them. Someone who already wrote something is
        being asked "did nothing happen?" about a week they just recorded, which is worse than
        silence.

        A question, not a nudge. No count, no streak, no "you haven't written in 3 weeks" —
        §5.1 bans exactly that, and this is the surface where it would be easiest to slip in.
        It disappears the moment it is answered and never mentions having been ignored.
      */}
      {!born && weekMemories.length === 0 && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('today.memoryPrompt')}
          onPress={() => router.push('/memory/new')}
          style={({ pressed }) => ({
            alignItems: 'center',
            gap: space[2],
            paddingVertical: space[3],
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <Glyph name="souvenirs" size={20} color="sage" />
          <Text variant="body" color="inkSoft" style={{ textAlign: 'center' }}>
            {t('today.memoryPrompt')}
          </Text>
          <Text variant="caption" color="sage">
            {t('today.memoryPromptAction')}
          </Text>
        </Pressable>
      )}

      {/* One quiet, honest line. Never "You're doing great!!" */}
      <Text variant="caption" style={{ textAlign: 'center' }}>
        {focus ? t('today.calm') : t('today.caughtUp')}
      </Text>
    </Screen>
  );
}
