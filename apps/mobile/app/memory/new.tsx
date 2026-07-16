'use client';
/**
 * Write a souvenir — a note, or a moment.
 *
 * Kind first, then the words. The kind only changes the glyph and the prompt; it is not a
 * category system, and nothing filters on it. Two options exist because "un mot" and "un
 * moment" are genuinely different intentions, not because a taxonomy was wanted.
 *
 * The week is stamped automatically from the due date. Asking someone to tell the app what
 * week they are in, when the app already knows, is the kind of small insult that makes
 * software feel like paperwork.
 */
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  currentWeekSG,
  isMemoryEmpty,
  randomId,
  type Memory,
  type MemoryKind,
} from '@bulle/sdk';
import { Row, SectionHeader, Text, TextField } from '@bulle/ui/components';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { HeaderAction } from '@/components/HeaderAction';
import { useMemoriesStore } from '@/store/useMemoriesStore';
import { useBulleStore } from '@/store/useBulleStore';
import { getSession } from '@/lib/starfish';
import { useNow } from '@/lib/use-now';

const KINDS: MemoryKind[] = ['note', 'milestone'];

export default function NewMemoryScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { space } = useBulleTheme();
  const now = useNow();

  const bulle = useBulleStore((s) => s.bulle);

  const [kind, setKind] = useState<MemoryKind | null>(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const draft = useMemo(() => ({ title, body }), [title, body]);

  if (!bulle) return null;

  const save = () => {
    // A souvenir with neither a title nor a body is not worth storing.
    if (!kind || isMemoryEmpty(draft)) return;
    const nowIso = new Date().toISOString();
    const memory: Memory = {
      id: randomId(),
      kind,
      title: title.trim() || undefined,
      body: body.trim() || undefined,
      // SG, not SA: the Chemin speaks gestational weeks (§7.2).
      week: currentWeekSG(bulle.profile.dueDate, now),
      authorId: getSession()?.userId,
      createdAt: nowIso,
      updatedAt: nowIso,
    };
    useMemoriesStore.getState().addMemory(memory);
    router.back();
  };

  if (!kind) {
    return (
      <Screen>
        <Text variant="display">{t('memories.newTitle')}</Text>
        <View>
          <SectionHeader title={t('memories.kindQuestion')} />
          {KINDS.map((k, index) => (
            <Row
              key={k}
              title={t(`memories.kinds.${k}`)}
              subtitle={t(`memories.kindHints.${k}`)}
              onPress={() => setKind(k)}
              chevron
              divider={index < KINDS.length - 1}
            />
          ))}
        </View>
      </Screen>
    );
  }

  return (
    <>
      {/* A sibling of Screen, not a child: nested inside the ScrollView's content container
          the options never reach the navigator and the header stays bare. */}
      <Stack.Screen
        options={{
          headerLeft: () => <HeaderAction label={t('common.back')} onPress={() => setKind(null)} />,
          headerRight: () =>
            isMemoryEmpty(draft) ? null : (
              <HeaderAction label={t('common.save')} onPress={save} />
            ),
        }}
      />
      <Screen>
        <View style={{ gap: space[2] }}>
          <Text variant="display">{t(`memories.kinds.${kind}`)}</Text>
          <Text variant="caption">{t(`memories.kindHints.${kind}`)}</Text>
        </View>

        <TextField
          label={t('memories.titleLabel')}
          placeholder={t('memories.titlePlaceholder')}
          value={title}
          onChangeText={setTitle}
          maxLength={120}
        />

        <TextField
          label={t('memories.bodyLabel')}
          placeholder={t('memories.bodyPlaceholder')}
          value={body}
          onChangeText={setBody}
          autoFocus
          multiline
          // Room to write without the field growing the page under the keyboard.
          style={{ minHeight: 140, textAlignVertical: 'top' }}
        />
      </Screen>
    </>
  );
}
