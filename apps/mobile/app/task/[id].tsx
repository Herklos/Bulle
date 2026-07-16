'use client';
/**
 * One task, and what to actually do about it.
 *
 * A title is a reminder, not an instruction: "Rassembler les documents pour la maternité"
 * tells you nothing if you do not already know which documents. This screen is where the
 * answer lives, and it is why the corpus carries `details` at all.
 *
 * ONE link, at most. The `href` on each task is the official source (§5.4), resolved for the
 * bulle's country at instantiation. It was declared on the templates from the start and
 * never rendered anywhere, which quietly made the admin module's central promise (we did the
 * reading, here is the proof) invisible.
 */
import React from 'react';
import { Linking, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { currentWeekSA, daysLeftAfterBirth, isLingering, isResolved } from '@bulle/sdk';
import { Button, Text } from '@bulle/ui/components';
import { Glyph } from '@bulle/ui/primitives';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { goBack } from '@/lib/go-back';
import { usePlanStore } from '@/store/usePlanStore';
import { useBulleStore } from '@/store/useBulleStore';
import { useReadinessStore } from '@/store/useReadinessStore';
import { useCanEdit } from '@/lib/permissions/usePermissions';
import { useNow } from '@/lib/use-now';

export default function TaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const router = useRouter();
  const { colors, space } = useBulleTheme();
  const now = useNow();

  const bulle = useBulleStore((s) => s.bulle);
  const task = usePlanStore((s) => s.tasks.find((x) => x.id === id));
  const project = usePlanStore((s) => s.projects.find((p) => p.id === task?.projectId));
  const canEdit = useCanEdit('plan');

  // Deleted from under us (a peer's tombstone arriving) rather than never existing.
  if (!task || !bulle) return null;

  const done = isResolved(task);
  const weekSA = currentWeekSA(bulle.profile.dueDate, now);
  const lingering = isLingering(task, weekSA);

  const daysLeft = bulle.birthDate ? daysLeftAfterBirth(task, bulle.birthDate, now) : null;

  /** When this sits, in the unit that actually applies to it. */
  const when = () => {
    if (task.afterBirthDays !== undefined) {
      if (daysLeft === null) return t('task.afterBirthPending');
      if (daysLeft < 0) return t('birth.deadlinePassed');
      if (daysLeft === 0) return t('birth.deadlineToday');
      return t('birth.deadlineDays', { count: daysLeft });
    }
    return t('plan.windowLabel', { start: task.weekStart, end: task.weekEnd });
  };

  const complete = () => {
    usePlanStore.getState().updateTask(task.id, { status: done ? 'todo' : 'done' });
    if (!done && task.essential) useReadinessStore.getState().pulse();
    goBack('/plan');
  };

  return (
    <Screen>
      <Stack.Screen options={{ title: '' }} />

      <View style={{ gap: space[2] }}>
        <Text variant="overline">{project?.title ?? ''}</Text>
        <Text variant="display">{task.title}</Text>
        <Text variant="caption">
          {t(`plan.effort.${task.effort}`)} · {when()}
          {/* Never "en retard". A closed window is not a failure (§5.1). */}
          {lingering ? ` · ${t('plan.lingering')}` : ''}
        </Text>
      </View>

      {/* The one-line summary the corpus already had. Distinct from `details`: notes are the
          gist, details are the instructions. */}
      {task.notes && (
        <Text variant="body" color="inkSoft">
          {task.notes}
        </Text>
      )}

      {task.details?.map((paragraph, index) => (
        <Text key={index} variant="body">
          {paragraph}
        </Text>
      ))}

      {/* Optional tasks say so. Someone deciding whether this is worth their evening should
          not have to infer it from the absence of a marker (§6). */}
      {!task.essential && <Text variant="caption">{t('task.optional')}</Text>}

      {task.href && (
        <Button
          label={t('task.openSource')}
          tone="ghost"
          onPress={() => void Linking.openURL(task.href!)}
          block
        />
      )}

      {canEdit && (
        <Button
          label={done ? t('task.markTodo') : t('today.done')}
          onPress={complete}
          block
        />
      )}
    </Screen>
  );
}
