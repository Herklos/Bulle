'use client';
/**
 * A project's tasks, grouped by week-window (spec §5.3).
 *
 * Windows, not dates. A group header reads "Semaines 34 à 37", never a deadline, and a task
 * whose window has closed says "toujours sur votre liste" rather than turning red. That is
 * the difference between a companion and a todo app.
 */
import React, { useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { currentWeekSA, groupByWindow, isLingering, isResolved } from '@bulle/sdk';
import { Checkbox, EmptyState, SectionHeader, Text } from '@bulle/ui/components';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { usePlanStore } from '@/store/usePlanStore';
import { useBulleStore } from '@/store/useBulleStore';
import { useReadinessStore } from '@/store/useReadinessStore';
import { useNow } from '@/lib/use-now';
import { useCanEdit } from '@/lib/permissions/usePermissions';
import { TaskMenu } from '@/components/TaskMenu';

export default function ProjectScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const router = useRouter();
  const { colors, space } = useBulleTheme();
  const now = useNow();

  const bulle = useBulleStore((s) => s.bulle);
  const project = usePlanStore((s) => s.projects.find((p) => p.id === id));
  const allTasks = usePlanStore((s) => s.tasks);
  const updateTask = usePlanStore((s) => s.updateTask);
  const canEdit = useCanEdit('plan');

  const tasks = useMemo(() => allTasks.filter((task) => task.projectId === id), [allTasks, id]);
  const groups = useMemo(() => groupByWindow(tasks), [tasks]);

  if (!project || !bulle) return null;

  const weekSA = currentWeekSA(bulle.profile.dueDate, now);

  const toggle = (taskId: string, essential: boolean, done: boolean) => {
    updateTask(taskId, { status: done ? 'todo' : 'done' });
    if (!done && essential) useReadinessStore.getState().pulse();
  };

  return (
    <Screen>
      <View style={{ gap: space[2] }}>
        <Text variant="display">{project.title}</Text>
        {project.description && <Text variant="body" color="inkSoft">{project.description}</Text>}
      </View>

      {/*
        Always rendered, even with no tasks: it carries the only way to add one, and the
        empty state below is otherwise a dead end.
      */}
      {canEdit && (
        <SectionHeader
          title={t('plan.tasks')}
          action={{
            label: t('plan.addTask'),
            onPress: () => router.push(`/task/new?projectId=${project.id}`),
          }}
        />
      )}

      {tasks.length === 0 && <EmptyState glyph="plan" message={t('plan.empty')} />}

      {groups.map((group) => (
        <View key={`${group.weekStart}-${group.weekEnd}`}>
          <SectionHeader
            title={t('plan.windowLabel', { start: group.weekStart, end: group.weekEnd })}
          />
          {group.tasks.map((task, index) => {
            const done = isResolved(task);
            const lingering = isLingering(task, weekSA);
            return (
              <View
                key={task.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: space[4],
                  paddingVertical: space[3],
                  borderBottomWidth: index < group.tasks.length - 1 ? 1 : 0,
                  borderBottomColor: colors.line,
                }}
              >
                <Checkbox
                  checked={done}
                  disabled={!canEdit}
                  onChange={() => toggle(task.id, task.essential, done)}
                  accessibilityLabel={task.title}
                />
                {/* The title opens the task. The checkbox stays a checkbox: ticking is the
                    common action and must not cost a round trip through a detail screen. */}
                <Pressable
                  style={{ flex: 1, gap: 2 }}
                  onPress={() => router.push(`/task/${task.id}` as never)}
                  accessibilityRole="button"
                >
                  <Text
                    variant="body"
                    color={done ? 'inkSoft' : 'ink'}
                    style={done ? { textDecorationLine: 'line-through' } : undefined}
                  >
                    {task.title}
                  </Text>
                  <Text variant="caption">
                    {t(`plan.effort.${task.effort}`)}
                    {/* Never "en retard". A closed window is not a failure. */}
                    {lingering ? ` · ${t('plan.lingering')}` : ''}
                  </Text>
                  {task.notes && <Text variant="caption">{task.notes}</Text>}
                </Pressable>
                {canEdit && (
                  <TaskMenu
                    dismissLabel={t('plan.dismiss')}
                    deleteLabel={t('common.delete')}
                    onDismiss={() => updateTask(task.id, { status: 'dismissed' })}
                    onDelete={() => usePlanStore.getState().removeTask(task.id)}
                  />
                )}
              </View>
            );
          })}
        </View>
      ))}
    </Screen>
  );
}
