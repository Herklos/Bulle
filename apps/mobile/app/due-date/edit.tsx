'use client';
/**
 * Correct the due date.
 *
 * The DPA moves. It is an estimate, and the dating échographie around 12 SA routinely shifts
 * it by a few days in either direction — that is the scan's job. Until now the date was set
 * once at onboarding and then frozen, so the single most likely correction in a pregnancy
 * had nowhere to go, and the whole app silently drifted: the wrong week on the Chemin, the
 * wrong week on Aujourd'hui, every task window pointing at the wrong fortnight.
 *
 * Nothing here recomputes the plan, and that is the design paying off rather than an
 * omission. Tasks carry week-WINDOWS, not calendar dates (§4.2), and a window is already
 * relative to the DPA — so moving the date re-aims every task in the app by changing what
 * "this week" means. That is exactly why the spec chose windows over dates. Writing the new
 * date IS the reschedule.
 *
 * Readiness may move backward here, and that is allowed. It is monotonic EXCEPT on a profile
 * change (§6), which this is: a task whose window has not opened yet is no longer counted as
 * lingering, and the score honestly reflects the corrected timeline.
 */
import React, { useState } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { currentWeekSA } from '@bulle/sdk';
import { Button, Text } from '@bulle/ui/components';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { goBack, useHardwareBack } from '@/lib/go-back';
import { HeaderAction } from '@/components/HeaderAction';
import { DueDatePicker } from '@/components/DueDatePicker';
import { useBulleStore } from '@/store/useBulleStore';
import { useNow } from '@/lib/use-now';

export default function EditDueDateScreen() {
  const { t } = useTranslation();
  // Android's back must never strand this screen outside the app.
  useHardwareBack('/more');
  const { space } = useBulleTheme();
  const now = useNow();

  const bulle = useBulleStore((s) => s.bulle);
  const [date, setDate] = useState<Date | null>(
    bulle ? new Date(bulle.profile.dueDate) : null,
  );

  if (!bulle) return null;

  // Live, so the consequence is visible BEFORE committing. "Semaine 14" moving to "Semaine
  // 12" as you scrub is the whole answer to "did I pick the right day?", and it costs a line.
  const weekPreview = date ? currentWeekSA(date.toISOString(), now) : null;
  const currentWeek = currentWeekSA(bulle.profile.dueDate, now);
  const changed = date != null && date.toISOString() !== bulle.profile.dueDate;

  const save = () => {
    if (!date || !changed) {
      goBack('/more');
      return;
    }
    useBulleStore.getState().saveBulle({
      ...bulle,
      profile: { ...bulle.profile, dueDate: date.toISOString() },
      updatedAt: new Date().toISOString(),
    });
    goBack('/more');
  };

  return (
    // scroll={false}: the picker sizes itself and swallows vertical drags, so nothing here
    // may rely on scrolling (see components/DueDatePicker.tsx).
    <Screen scroll={false}>
      <Stack.Screen
        options={{
          headerRight: () =>
            changed ? <HeaderAction label={t('common.save')} onPress={save} /> : null,
        }}
      />

      <View style={{ gap: space[2] }}>
        <Text variant="display">{t('dueDate.editTitle')}</Text>
        <Text variant="body" color="inkSoft">
          {t('dueDate.editLead')}
        </Text>
      </View>

      <DueDatePicker value={date} onChange={setDate} />

      {/* Only once it actually differs. Restating the current week back at someone who has
          changed nothing is noise, and it would make the line look like an error state. */}
      {weekPreview !== null && weekPreview !== currentWeek && (
        <Text variant="caption" color="sage">
          {t('dueDate.editPreview', { from: currentWeek, to: weekPreview })}
        </Text>
      )}

      <View style={{ flex: 1 }} />
      <Button label={t('common.save')} onPress={save} disabled={!changed} block />
    </Screen>
  );
}
