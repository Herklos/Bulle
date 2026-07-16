'use client';
/**
 * Pause mode (spec §3.1).
 *
 * This is the screen someone may open on the worst day of their life. Everything about it
 * is a deliberate subtraction:
 *
 *  - No orb, no fil, no readiness, no countdown, no week number.
 *  - NO ANIMATION. Not a fade, not a spring. Motion reads as cheer.
 *  - No illustration and no performative sympathy ("we're so sorry 💔"). One short, sober
 *    message.
 *  - Three options, equally weighted: export, delete, keep. Deletion is real.
 *  - No win-back, no upsell, ever.
 *
 * If you are editing this file, re-read §3 first.
 */
import React, { useState } from 'react';
import { Alert, Platform, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button, Text } from '@bulle/ui/components';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { useBulleStore } from '@/store/useBulleStore';
import { useBulleRegistryStore, useActiveBulle } from '@/store/useBulleRegistryStore';
import { usePlanStore } from '@/store/usePlanStore';
import { exitPause } from '@/lib/use-pause';
import { exportBulle } from '@/lib/export';

export default function PauseScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { space } = useBulleTheme();
  const active = useActiveBulle();
  const bulle = useBulleStore((s) => s.bulle);
  const [busy, setBusy] = useState(false);

  const handleExport = async () => {
    setBusy(true);
    try {
      await exportBulle({
        bulle,
        projects: usePlanStore.getState().projects,
        tasks: usePlanStore.getState().tasks,
      });
    } finally {
      setBusy(false);
    }
  };

  const doDelete = async () => {
    if (!active) return;
    setBusy(true);
    await useBulleRegistryStore.getState().deleteBulle(active.id);
    router.replace('/onboarding');
  };

  const handleDelete = () => {
    // Deletion is irreversible, so it gets a confirmation — but a plain one, with no
    // guilt-trip copy and no attempt to talk anyone out of it.
    if (Platform.OS === 'web') {
      // eslint-disable-next-line no-alert
      if (typeof confirm === 'function' && !confirm(t('pause.deleteConfirmBody'))) return;
      void doDelete();
      return;
    }
    Alert.alert(t('pause.deleteConfirmTitle'), t('pause.deleteConfirmBody'), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('pause.delete'), style: 'destructive', onPress: () => void doDelete() },
    ]);
  };

  const handleResume = async () => {
    await exitPause();
    router.replace('/today');
  };

  return (
    <Screen center>
      <View style={{ gap: space[5] }}>
        <Text variant="titleXL">{t('pause.title')}</Text>
        <Text variant="body" color="inkSoft">
          {t('pause.body')}
        </Text>

        <View style={{ gap: space[3], marginTop: space[4] }}>
          <Button label={t('pause.export')} onPress={handleExport} disabled={busy} block />
          <Button label={t('pause.keep')} tone="ghost" onPress={() => router.replace('/more')} block />
          <Button label={t('pause.delete')} tone="ghost" onPress={handleDelete} disabled={busy} block />
        </View>

        {bulle?.pause.paused && (
          <Button label={t('pause.resume')} tone="ghost" onPress={handleResume} block />
        )}
      </View>
    </Screen>
  );
}
