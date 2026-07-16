'use client';
/**
 * Souvenirs (spec §5) — what you keep.
 *
 * Notes and moments, newest first. There is no engine here and there must not be one:
 * nothing suggests, ranks, reminds or scores. The moment a memory acquires a completion
 * state or a nudge ("you have not written this week"), it stops being a keepsake and becomes
 * another thing to fall behind on.
 *
 * Photos and voice are deliberately not here yet — see MemoryKind in the SDK. Text syncs as
 * ordinary encrypted content; media needs its own path and would otherwise exist on one
 * parent's phone and silently not the other's.
 */
import React, { useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { memoryPreview, sortMemories } from '@bulle/sdk';
import { EmptyState, Row, Text } from '@bulle/ui/components';
import { Glyph } from '@bulle/ui/primitives';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { FeatureWelcomeFor, useFeatureWelcome } from '@/lib/feature-welcomes';
import { useMemoriesStore } from '@/store/useMemoriesStore';
import { useCanEdit } from '@/lib/permissions/usePermissions';

export default function MemoriesScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const welcome = useFeatureWelcome('memories');
  const { touch } = useBulleTheme();
  const canEdit = useCanEdit('memories');

  const all = useMemoriesStore((s) => s.memories);
  const memories = useMemo(() => sortMemories(all), [all]);

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(i18n.language === 'en' ? 'en-GB' : 'fr-FR', {
      day: 'numeric',
      month: 'long',
    }).format(new Date(iso));

  return (
    <Screen>
      <FeatureWelcomeFor area="memories" visible={welcome.visible} onDismiss={welcome.dismiss} />

      {/*
        The action sits on the title row rather than in a section header below it: this
        screen has one list, so a header would only repeat the word "Souvenirs" underneath
        itself. Always rendered, because it is the only way to add one and the empty state
        below is otherwise a dead end.
      */}
      <View
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Text variant="display">{t('memories.title')}</Text>
        {canEdit && (
          <Pressable
            onPress={() => router.push('/memory/new')}
            accessibilityRole="button"
            hitSlop={touch.min / 2}
          >
            <Text variant="body" color="sage">
              {t('memories.add')}
            </Text>
          </Pressable>
        )}
      </View>

      {memories.length === 0 ? (
        <EmptyState glyph="souvenirs" message={t('memories.placeholder')} />
      ) : (
        <View>
          {memories.map((memory, index) => (
            <Row
              key={memory.id}
              title={memoryPreview(memory)}
              subtitle={
                memory.week !== undefined
                  ? `${formatDate(memory.createdAt)} · ${t('memories.weekStamp', { week: memory.week })}`
                  : formatDate(memory.createdAt)
              }
              leading={
                <Glyph
                  name={memory.kind === 'milestone' ? 'souvenirs' : 'leaf'}
                  size={20}
                  color="sage"
                />
              }
              onPress={() => router.push(`/memory/${memory.id}` as never)}
              chevron
              divider={index < memories.length - 1}
            />
          ))}
        </View>
      )}
    </Screen>
  );
}
