'use client';
/**
 * One souvenir, read back.
 *
 * Read-only apart from delete. Editing a memory is a slightly odd idea — it is a record of
 * what you thought at a moment, not a document — and the delete is here because "I wrote
 * that in a bad hour and want it gone" is a real and important need.
 */
import React from 'react';
import { Alert, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Text } from '@bulle/ui/components';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { goBack } from '@/lib/go-back';
import { HeaderAction } from '@/components/HeaderAction';
import { useMemoriesStore } from '@/store/useMemoriesStore';
import { useCanEdit } from '@/lib/permissions/usePermissions';

export default function MemoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { space } = useBulleTheme();
  const canEdit = useCanEdit('memories');

  const memory = useMemoriesStore((s) => s.memories.find((m) => m.id === id));

  // Deleted from under us (a peer's tombstone arriving) — leave rather than render nothing.
  if (!memory) return null;

  const when = new Intl.DateTimeFormat(i18n.language === 'en' ? 'en-GB' : 'fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(memory.createdAt));

  const remove = () => {
    Alert.alert(t('memories.delete'), memory.title ?? t(`memories.kinds.${memory.kind}`), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('memories.delete'),
        style: 'destructive',
        onPress: () => {
          useMemoriesStore.getState().removeMemory(memory.id);
          goBack('/memories');
        },
      },
    ]);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () =>
            canEdit ? <HeaderAction label={t('memories.delete')} onPress={remove} /> : null,
        }}
      />
      <Screen>
        <View style={{ gap: space[2] }}>
          <Text variant="overline">
            {memory.week !== undefined
              ? `${when} · ${t('memories.weekStamp', { week: memory.week })}`
              : when}
          </Text>
          {memory.title && <Text variant="display">{memory.title}</Text>}
        </View>

        {memory.body && <Text variant="body">{memory.body}</Text>}
      </Screen>
    </>
  );
}
