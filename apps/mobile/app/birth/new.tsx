'use client';
/**
 * Record the birth.
 *
 * The one screen whose whole purpose is to start a clock. Until this date exists, every
 * post-birth deadline in the app is inert — the DPA cannot stand in for it, because babies
 * do not arrive on it and a deadline computed from an estimate is the wrong date.
 *
 * Deliberately sober. No confetti, no "Félicitations !!", no illustration. §8.1 bans
 * figurative baby imagery outright, and this screen is also reachable by someone whose
 * arrival did not end well — the copy states what the date is for and nothing else.
 */
import React, { useState } from 'react';
import { View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { DateTimePicker } from '@expo/ui/community/datetime-picker';
import { Button, Text } from '@bulle/ui/components';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { goBack, useHardwareBack } from '@/lib/go-back';
import { HeaderAction } from '@/components/HeaderAction';
import { useBulleStore } from '@/store/useBulleStore';

export default function NewBirthScreen() {
  const { t } = useTranslation();
  // Android's back must never strand a half-written entry outside the app.
  useHardwareBack('/more');
  const router = useRouter();
  const { colors, space } = useBulleTheme();

  const bulle = useBulleStore((s) => s.bulle);
  const [at, setAt] = useState<Date>(new Date());

  if (!bulle) return null;

  const save = () => {
    useBulleStore.getState().saveBulle({
      ...bulle,
      birthDate: at.toISOString(),
      updatedAt: new Date().toISOString(),
    });
    goBack('/more');
  };

  return (
    // scroll={false}: the picker sizes itself and swallows vertical drags, so nothing here
    // may rely on scrolling (see app/event/new.tsx).
    <Screen scroll={false}>
      <Stack.Screen options={{ headerRight: () => <HeaderAction label={t('common.save')} onPress={save} /> }} />

      <View style={{ gap: space[2] }}>
        <Text variant="display">{t('birth.title')}</Text>
        <Text variant="body" color="inkSoft">
          {t('birth.lead')}
        </Text>
        <Text variant="caption">{t('birth.question')}</Text>
      </View>

      <DateTimePicker
        mode="date"
        presentation="inline"
        accentColor={colors.sage}
        value={at}
        // Nobody records a birth that has not happened yet.
        maximumDate={new Date()}
        onValueChange={(_event, date) => setAt(date)}
      />

      <View style={{ flex: 1 }} />
      <Button label={t('birth.confirm')} onPress={save} block />
    </Screen>
  );
}
