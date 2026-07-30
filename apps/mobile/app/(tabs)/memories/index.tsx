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
import React, { useCallback, useMemo } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { memoryPreview, sortMemories } from '@bulle/sdk';
import { EmptyState, Row, Text } from '@bulle/ui/components';
import { Glyph } from '@bulle/ui/primitives';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { FeatureWelcomeFor, useFeatureWelcome } from '@/lib/feature-welcomes';
import { usePauseState } from '@/lib/use-pause';
import { useMemoriesStore } from '@/store/useMemoriesStore';
import { useCanEdit } from '@/lib/permissions/usePermissions';
import { useNow } from '@/lib/use-now';

/**
 * The "add a memory" affordance, as a quiet list row — the same pattern the home screen uses
 * for adding an appointment (sage `plus` + label, glyph 20 + `space[4]` gutter so it lands on
 * the row spine). It closes the populated list; the empty state carries its own button
 * instead. The old design hung a small "Ajouter" link off the corner of the 34px serif
 * title — a mismatched satellite, and the only root screen to do so.
 */
function AddRow({ label, onPress }: { label: string; onPress: () => void }) {
  const { space, touch } = useBulleTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: space[4],
        minHeight: touch.min,
        paddingVertical: space[3],
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <Glyph name="plus" size={20} color="sage" />
      <Text variant="body" color="sage">
        {label}
      </Text>
    </Pressable>
  );
}

export default function MemoriesScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const welcome = useFeatureWelcome('memories');
  const { space } = useBulleTheme();
  const canEdit = useCanEdit('memories');
  const now = useNow();

  const all = useMemoriesStore((s) => s.memories);
  const memories = useMemo(() => sortMemories(all), [all]);
  // Keepsakes stay reachable in Pause (the user may choose to keep them — see app/pause.tsx),
  // but the app-generated "Semaine N" stamp is pregnancy framing and is dropped there (§3.1).
  const paused = usePauseState();

  // Souvenirs are the one thing meant to be looked back on over months and years, so a bare
  // "30 juillet" goes ambiguous the moment the year turns. Show the year only when it differs
  // from the current one (derived from the injected `now`, never `Date.now()`), so recent
  // memories stay light and older ones disambiguate.
  const thisYear = new Date(now).getFullYear();
  const formatDate = useCallback(
    (iso: string) =>
      new Intl.DateTimeFormat(i18n.language === 'en' ? 'en-GB' : 'fr-FR', {
        day: 'numeric',
        month: 'long',
        year: new Date(iso).getFullYear() === thisYear ? undefined : 'numeric',
      }).format(new Date(iso)),
    [i18n.language, thisYear],
  );

  const renderItem = useCallback(
    ({ item: memory, index }: { item: (typeof memories)[number]; index: number }) => (
      <Row
        title={memoryPreview(memory)}
        subtitle={
          memory.week !== undefined && !paused
            ? `${formatDate(memory.createdAt)} · ${t('memories.weekStamp', { week: memory.week })}`
            : formatDate(memory.createdAt)
        }
        leading={
          <Glyph
            name={memory.kind === 'milestone' ? 'souvenirs' : 'leaf'}
            size={20}
            // A keepsake is not something to act on, so it does not wear sage (the action
            // colour). Same call the Chemin makes for the memories in a week card; the glyph
            // SHAPE (star vs leaf) still tells a moment from a note.
            color="inkSoft"
          />
        }
        onPress={() => router.push(`/memory/${memory.id}` as never)}
        chevron
        divider={index < memories.length - 1}
      />
    ),
    [memories.length, paused, t, formatDate, router],
  );

  return (
    <Screen scroll={false}>
      <FeatureWelcomeFor area="memories" visible={welcome.visible} onDismiss={welcome.dismiss} />

      {/* Title and, once there is anything to keep, one quiet orienting line — a tight pair
          (space[2]), matching Préparer. The "add" affordance is NOT hung off this row: an
          empty screen gets a centred button on its EmptyState, a populated one gets an AddRow
          at the foot of the list. Either way the invitation sits with the content it acts on,
          not in the opposite corner from it. */}
      <View style={{ gap: space[2] }}>
        <Text variant="display">{t('memories.title')}</Text>
        {memories.length > 0 && (
          <Text variant="body" color="inkSoft">
            {t('memories.intro')}
          </Text>
        )}
      </View>

      {memories.length === 0 ? (
        // Centred in the remaining height, with its own button: the one screen every new user
        // lands on should offer the way forward under the sentence, in the lower-centre where
        // a primary action belongs (§15.8), not as a link in the far corner.
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <EmptyState
            glyph="souvenirs"
            message={t('memories.placeholder')}
            action={
              canEdit
                ? { label: t('memories.addFull'), onPress: () => router.push('/memory/new') }
                : undefined
            }
          />
        </View>
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={memories}
          keyExtractor={(m) => m.id}
          renderItem={renderItem}
          ListFooterComponent={
            canEdit ? (
              <AddRow label={t('memories.addFull')} onPress={() => router.push('/memory/new')} />
            ) : null
          }
        />
      )}
    </Screen>
  );
}
