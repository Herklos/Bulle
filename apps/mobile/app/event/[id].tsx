'use client';
/**
 * One appointment: change it, or remove it.
 *
 * Events were WRITE-ONCE. `/event/new` existed and nothing else did, so the rows on
 * Aujourd'hui and on the Chemin were inert and an appointment could never be touched again.
 * The store has had `updateEvent` and `removeEvent` the whole time; no screen ever called
 * them. That is the tell: the capability was built and then never given a door.
 *
 * It matters more here than for most entities, because a scan being MOVED is the normal
 * case rather than the exception. A date the maternité changes by a fortnight is the single
 * most likely edit in the app, and the answer was "delete the bulle" or live with a lie on
 * the home screen.
 *
 * Edits apply on the spot, no Save. There is nothing to confirm: the store is local-first
 * and every change is one field the user just picked by hand. A Save button here would only
 * add a way to lose the change.
 */
import React, { useRef, useState } from 'react';
import { Alert, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { DateTimePicker } from '@expo/ui/community/datetime-picker';
import type { BulleEvent, EventKind } from '@bulle/sdk';
import { Row, SectionHeader, Text } from '@bulle/ui/components';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { goBack, useHardwareBack } from '@/lib/go-back';
import { HeaderAction } from '@/components/HeaderAction';
import { HeaderBackButton } from '@/components/HeaderBackButton';
import { EVENT_KINDS, withDate, withTime } from '@/lib/event-when';
import { useEventsStore } from '@/store/useEventsStore';
import { useCanEdit } from '@/lib/permissions/usePermissions';

type Step = 'overview' | 'kind' | 'date' | 'time';

export default function EventScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const { colors, space } = useBulleTheme();
  const canEdit = useCanEdit('journey');

  const [step, setStep] = useState<Step>('overview');
  // A ref, so the BackHandler closure reads the CURRENT step rather than the one it
  // captured. Depending on `step` directly would re-register the listener on every change.
  const stepRef = useRef<Step>('overview');
  stepRef.current = step;

  // Android's back walks back to the overview before it leaves the screen.
  useHardwareBack('/today', () => {
    if (stepRef.current === 'overview') return false;
    setStep('overview');
    return true;
  });

  const event = useEventsStore((s) => s.events.find((e) => e.id === id));

  // Deleted from under us — a peer's tombstone arriving, or our own delete below.
  if (!event) return null;

  const at = new Date(event.at);

  /** Every edit is this: touch one field, let the store stamp updatedAt and push. */
  const patch = (updates: Partial<BulleEvent>) => {
    useEventsStore.getState().updateEvent(event.id, updates);
  };

  const setKind = (kind: EventKind) => {
    // The kind IS the title (see event/new.tsx), so changing one must change the other or
    // the row goes on showing "Échographie" for a consultation.
    patch({ kind, title: t(`events.kinds.${kind}`) });
    setStep('overview');
  };

  const remove = () => {
    Alert.alert(t('events.delete'), event.title, [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('events.delete'),
        style: 'destructive',
        onPress: () => {
          useEventsStore.getState().removeEvent(event.id);
          goBack('/today');
        },
      },
    ]);
  };

  const formatDay = (d: Date) =>
    new Intl.DateTimeFormat(i18n.language === 'en' ? 'en-GB' : 'fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }).format(d);

  const formatTime = (d: Date) =>
    new Intl.DateTimeFormat(i18n.language === 'en' ? 'en-GB' : 'fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);

  if (step === 'overview') {
    return (
      // Stack.Screen is a SIBLING of Screen, not a child: nested in the ScrollView's content
      // container its options never reach the navigator — the back button AND the Delete
      // action (headerRight is Delete's only home) would both silently vanish.
      <>
        <Stack.Screen
          options={{
            title: '',
            // The default arrow no-ops on an empty stack (see lib/go-back.ts) — and this
            // screen is reachable from a notification, so that stack is often empty.
            headerLeft: () => (
              <HeaderBackButton label={t('common.back')} onPress={() => goBack('/today')} />
            ),
            headerRight: () =>
              canEdit ? <HeaderAction label={t('events.delete')} onPress={remove} /> : null,
          }}
        />
        <Screen>
        <View style={{ gap: space[2] }}>
          <Text variant="overline">{t(`events.kinds.${event.kind}`)}</Text>
          <Text variant="display">{formatDay(at)}</Text>
          <Text variant="caption">{formatTime(at)}</Text>
        </View>

        {/* Read-only members see the appointment and no way to change it. The rows simply
            stop being rows rather than becoming disabled ones: a control that is visibly
            there and refuses is worse than one that is not offered (§5.10). */}
        {canEdit && (
          <View>
            <SectionHeader title={t('events.change')} />
            <Row
              title={t('events.kindQuestion')}
              subtitle={t(`events.kinds.${event.kind}`)}
              onPress={() => setStep('kind')}
              chevron
              divider
            />
            <Row
              title={t('events.dateQuestion')}
              subtitle={formatDay(at)}
              onPress={() => setStep('date')}
              chevron
              divider
            />
            <Row
              title={t('events.timeQuestion')}
              subtitle={formatTime(at)}
              onPress={() => setStep('time')}
              chevron
            />
          </View>
        )}
        </Screen>
      </>
    );
  }

  if (step === 'kind') {
    return (
      <>
        <Stack.Screen
          options={{
            title: '',
            headerLeft: () => (
              <HeaderBackButton label={t('common.back')} onPress={() => setStep('overview')} />
            ),
          }}
        />
        <Screen>
        <Text variant="display">{t('events.kindQuestion')}</Text>
        <View>
          {EVENT_KINDS.map((k, index) => (
            <Row
              key={k}
              title={t(`events.kinds.${k}`)}
              subtitle={k === event.kind ? t('events.kindCurrent') : undefined}
              onPress={() => setKind(k)}
              divider={index < EVENT_KINDS.length - 1}
            />
          ))}
        </View>
        </Screen>
      </>
    );
  }

  const isDate = step === 'date';

  return (
    // scroll={false}: the picker sizes itself and swallows vertical drags, so nothing here
    // may rely on scrolling (see event/new.tsx).
    <Screen scroll={false}>
      <Stack.Screen
        options={{
          title: '',
          // `common.back`, not `common.done`: this returns to the overview, and FR's done is
          // "C'est fait" — task-completion phrasing, which on a picker header reads as
          // though it finishes something rather than closes it.
          headerLeft: () => (
            <HeaderBackButton label={t('common.back')} onPress={() => setStep('overview')} />
          ),
        }}
      />

      <View style={{ gap: space[2] }}>
        <Text variant="display">{t(`events.kinds.${event.kind}`)}</Text>
        <Text variant="caption">{isDate ? t('events.dateQuestion') : t('events.timeQuestion')}</Text>
      </View>

      {/* The `key` forces a fresh native view per step. Reusing one across a mode change
          leaves the Compose picker showing the previous mode's control. */}
      {isDate ? (
        <DateTimePicker
          key="date"
          mode="date"
          presentation="inline"
          accentColor={colors.sage}
          value={at}
          onValueChange={(_e, date) => patch({ at: withDate(at, date).toISOString() })}
        />
      ) : (
        <DateTimePicker
          key="time"
          mode="time"
          presentation="inline"
          accentColor={colors.sage}
          value={at}
          // `mode="time"` fires on EVERY tick of the wheel, so this writes a dozen times as
          // it spins. That is fine and deliberate here: the store is local and the last
          // write wins, whereas buffering would need a Save button and this screen has none.
          onValueChange={(_e, date) => patch({ at: withTime(at, date).toISOString() })}
        />
      )}
    </Screen>
  );
}
