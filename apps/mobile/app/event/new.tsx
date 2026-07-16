'use client';
/**
 * Add an appointment — kind, then day, then time.
 *
 * The only place in the app that asks for a date AND a time, because an Event is the only
 * datetime-bearing entity (§4.2) — everything else lives on week-windows on purpose.
 *
 * Why three steps rather than one `mode="datetime"` picker: on Android that mode renders a
 * date picker and NO time control at all, so the time silently stayed at whatever the
 * default put there while the Today screen went on displaying it ("demain à 09:00") as if
 * it had been chosen. A date picker and a time picker, one per step, are what actually
 * exist on both platforms.
 *
 * The confirm action lives in the HEADER, not under the picker. An inline picker renders as
 * `<Host matchContents={{ vertical: true }}>`, which sizes to its content and ignores any
 * height passed to it — so it claims the full body and paints over anything below. It also
 * swallows vertical drags, so a surrounding ScrollView cannot scroll past it to reach a
 * button underneath (see components/DueDatePicker.tsx). Between fighting that and putting
 * confirm where both platforms already put it on a form sheet, the header wins.
 */
import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { DateTimePicker } from '@expo/ui/community/datetime-picker';
import { randomId, type BulleEvent, type EventKind } from '@bulle/sdk';
import { Row, SectionHeader, Text } from '@bulle/ui/components';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { goBack, useHardwareBack } from '@/lib/go-back';
import { HeaderAction } from '@/components/HeaderAction';
import { useEventsStore } from '@/store/useEventsStore';

/** The kinds that matter in a French pregnancy. `autre` catches everything else. */
const KINDS: EventKind[] = ['echo', 'consultation', 'prepa', 'admin', 'autre'];

type Step = 'kind' | 'date' | 'time';

function defaultAt(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  d.setHours(9, 0, 0, 0);
  return d;
}

/** Take the calendar day from `from`, keep the clock time already chosen. */
function withDate(at: Date, from: Date): Date {
  const d = new Date(at);
  d.setFullYear(from.getFullYear(), from.getMonth(), from.getDate());
  return d;
}

/** Take the clock time from `from`, keep the calendar day already chosen. */
function withTime(at: Date, from: Date): Date {
  const d = new Date(at);
  d.setHours(from.getHours(), from.getMinutes(), 0, 0);
  return d;
}

export default function NewEventScreen() {
  const { t } = useTranslation();
  // Android's back walks the steps first, then leaves.
  useHardwareBack('/today', () => {
    if (stepRef.current === 'kind') return false;
    setStep(stepRef.current === 'time' ? 'date' : 'kind');
    return true;
  });
  const router = useRouter();
  const { colors, space } = useBulleTheme();

  const [step, setStep] = useState<Step>('kind');
  // See memory/new: a ref, so the BackHandler closure reads the current step.
  const stepRef = useRef<Step>('kind');
  stepRef.current = step;
  const [kind, setKind] = useState<EventKind | null>(null);
  const [at, setAt] = useState<Date>(defaultAt());

  const save = () => {
    if (!kind) return;
    const nowIso = new Date().toISOString();
    const event: BulleEvent = {
      id: randomId(),
      // The kind IS the title. Asking for a free-text title as well would be a form; the
      // label "Échographie" is what anyone would type anyway.
      title: t(`events.kinds.${kind}`),
      kind,
      at: at.toISOString(),
      createdAt: nowIso,
      updatedAt: nowIso,
    };
    useEventsStore.getState().addEvent(event);
    goBack();
  };

  // Kind first. Choosing the thing before its time is the order people think in.
  if (step === 'kind') {
    return (
      <Screen>
        {/* See memory/new: the default arrow no-ops with no history. */}
        <Stack.Screen
          options={{
            headerLeft: () => (
              <HeaderAction label={t('common.back')} onPress={() => goBack('/today')} />
            ),
          }}
        />
        <Text variant="display">{t('events.newTitle')}</Text>
        <View>
          <SectionHeader title={t('events.kindQuestion')} />
          {KINDS.map((k, index) => (
            <Row
              key={k}
              title={t(`events.kinds.${k}`)}
              onPress={() => {
                setKind(k);
                setStep('date');
              }}
              chevron
              divider={index < KINDS.length - 1}
            />
          ))}
        </View>
      </Screen>
    );
  }

  const isDate = step === 'date';

  return (
    // scroll={false}: the picker sizes itself and nothing here may scroll — the native
    // picker would eat the gesture anyway.
    <Screen scroll={false}>
      <Stack.Screen
        options={{
          // Overrides the native back, which would otherwise abandon the whole screen from
          // the time step rather than return to the date.
          headerLeft: () => (
            <HeaderAction
              label={t('common.back')}
              onPress={() => setStep(isDate ? 'kind' : 'date')}
            />
          ),
          headerRight: () =>
            isDate ? (
              <HeaderAction label={t('common.continue')} onPress={() => setStep('time')} />
            ) : (
              <HeaderAction label={t('common.save')} onPress={save} />
            ),
        }}
      />

      <View style={{ gap: space[2] }}>
        <Text variant="display">{t(`events.kinds.${kind}`)}</Text>
        <Text variant="caption">
          {isDate ? t('events.dateQuestion') : t('events.timeQuestion')}
        </Text>
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
          onValueChange={(_event, date) => setAt((cur) => withDate(cur, date))}
        />
      ) : (
        <DateTimePicker
          key="time"
          mode="time"
          presentation="inline"
          accentColor={colors.sage}
          value={at}
          onValueChange={(_event, date) => setAt((cur) => withTime(cur, date))}
        />
      )}
    </Screen>
  );
}
