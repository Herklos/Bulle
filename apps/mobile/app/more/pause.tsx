'use client';
/**
 * The Pause confirmation (spec §3.1).
 *
 * Deliberately plain. No "are you sure?", no attempt to retain, no explanation of what the
 * user will "lose". Someone reaching this screen has a reason, and the app's only job is to
 * get out of the way quickly and without commentary.
 */
import React, { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button, Text } from '@bulle/ui/components';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { goBack } from '@/lib/go-back';
import { enterPause } from '@/lib/use-pause';

export default function SettingsPauseScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { space } = useBulleTheme();
  const [busy, setBusy] = useState(false);

  const handlePause = async () => {
    setBusy(true);
    await enterPause();
    router.replace('/pause');
  };

  return (
    <Screen center>
      <View style={{ gap: space[5] }}>
        <Text variant="titleXL">{t('pause.enter')}</Text>
        <Text variant="body" color="inkSoft">
          {t('pause.enterBody')}
        </Text>
        <Button label={t('pause.enter')} onPress={handlePause} loading={busy} block />
        <Button label={t('common.cancel')} tone="ghost" onPress={() => goBack('/more')} block />
      </View>
    </Screen>
  );
}
