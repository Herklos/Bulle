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
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  checklistProgress,
  chosenOption,
  currentWeekSA,
  groupByWindow,
  hasChecklist,
  isChoice,
  isCounted,
  isLingering,
  isResolved,
  rederiveTaskStatus,
  setTaskCount,
  setTaskTarget,
  stepTaskCount,
  taskCount,
  type Task,
} from '@bulle/sdk';
import { Checkbox, EmptyState, SectionHeader, Stepper, Text } from '@bulle/ui/components';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { HeaderBackButton } from '@/components/HeaderBackButton';
import { goBack, useHardwareBack } from '@/lib/go-back';
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
  // A web reload can open this project first in the stack, where the default arrow no-ops;
  // Android's hardware back has the same dead end. Land on the Préparer index either way.
  useHardwareBack('/plan');

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

  /**
   * Nudging a count writes `status` alongside it, which is what makes a counted task resolve
   * through the ordinary path — including the `completedBy` stamp the store adds when a task
   * leaves `todo`. Writing only `count` would complete the task for readiness but leave
   * Ensemble unable to see who did it.
   */
  const applyCount = (
    task: Task,
    next: { count: number; status: typeof task.status; target?: number },
  ) => {
    updateTask(task.id, next);
    if (next.status === 'done' && task.status !== 'done' && task.essential) {
      useReadinessStore.getState().pulse();
    }
  };

  const step = (task: Task, delta: number) => applyCount(task, stepTaskCount(task, delta));

  return (
    // Stack.Screen is a SIBLING of Screen, not a child: nested inside the ScrollView's
    // content container its options never reach the navigator and the header stays bare.
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <HeaderBackButton label={t('common.back')} onPress={() => goBack('/plan')} />
          ),
        }}
      />
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

      {tasks.length === 0 && <EmptyState glyph="plan" message={t('plan.tasksEmpty')} />}

      {groups.map((group) => (
        <View key={`${group.weekStart}-${group.weekEnd}`}>
          <SectionHeader
            title={t('plan.windowLabel', { start: group.weekStart, end: group.weekEnd })}
          />
          {group.tasks.map((task, index) => {
            const done = isResolved(task);
            const lingering = isLingering(task, weekSA);
            const counted = isCounted(task);
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
                {/* A counted task carries its stepper on the trailing edge instead: a
                    control three times the width of a checkbox cannot lead the row without
                    crushing the title it is meant to describe. The leading pad keeps both
                    kinds of row starting their text on the same vertical line. */}
                {!counted && !hasChecklist(task) && !isChoice(task) && (
                  <Checkbox
                    checked={done}
                    disabled={!canEdit}
                    onChange={() => toggle(task.id, task.essential, done)}
                    accessibilityLabel={task.title}
                  />
                )}
                {/* The title opens the task. The checkbox stays a checkbox: ticking is the
                    common action and must not cost a round trip through a detail screen. */}
                <Pressable
                  style={{
                    flex: 1,
                    gap: 2,
                    paddingLeft: counted || hasChecklist(task) || isChoice(task) ? 24 + space[4] : 0,
                  }}
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
                    {/* A checklist or an answered choice says so here rather than earning a
                        control of its own in the row: the detail screen is where they are
                        acted on, and a second widget per row would crowd out the title. */}
                    {hasChecklist(task)
                      ? ` · ${t('task.checklistProgress', checklistProgress(task))}`
                      : ''}
                    {isChoice(task) && chosenOption(task)
                      ? ` · ${chosenOption(task)!.label}`
                      : ''}
                    {/* Never "en retard". A closed window is not a failure. */}
                    {lingering ? ` · ${t('plan.lingering')}` : ''}
                  </Text>
                  {task.notes && <Text variant="caption">{task.notes}</Text>}
                </Pressable>
                {counted && (
                  <Stepper
                    count={taskCount(task)}
                    target={task.target!}
                    disabled={!canEdit}
                    ignored={task.status === 'dismissed'}
                    onStep={(delta) => step(task, delta)}
                    onSetCount={(next) => applyCount(task, setTaskCount(task, next))}
                    onSetTarget={(next) => applyCount(task, setTaskTarget(task, next))}
                    accessibilityLabel={task.title}
                  />
                )}
                {canEdit && (
                  <TaskMenu
                    // Ignoring is a toggle, not a one-way door. A row dismissed by mistake
                    // was previously unrecoverable from the list.
                    dismissLabel={
                      task.status === 'dismissed' ? t('plan.undismiss') : t('plan.dismiss')
                    }
                    deleteLabel={t('common.delete')}
                    onDismiss={() =>
                      updateTask(task.id, {
                        status:
                          task.status === 'dismissed'
                            ? rederiveTaskStatus(task)
                            : 'dismissed',
                      })
                    }
                    onDelete={() => usePlanStore.getState().removeTask(task.id)}
                  />
                )}
              </View>
            );
          })}
        </View>
      ))}
      </Screen>
    </>
  );
}
