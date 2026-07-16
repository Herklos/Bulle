'use client';
/**
 * Add a task of your own to a project (§5.3).
 *
 * Custom tasks are ALWAYS optional. §6 is explicit: only essential tasks enter the readiness
 * denominator, and custom ones default to optional. That is not a limitation to apologise
 * for, it is the point — if typing a task could lower your readiness, the honest move would
 * be to not write it down, and an app that punishes you for planning has inverted itself.
 * The hint under the field says so out loud rather than leaving it to be discovered.
 *
 * Three coarse "when" choices instead of a week picker: someone adding "acheter un
 * tire-lait" knows "bientôt", not "semaines 29 à 33".
 */
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  currentWeekSA,
  customTaskWindow,
  dominantDomain,
  randomId,
  type CustomTaskWhen,
  type Effort,
  type Task,
} from '@bulle/sdk';
import { Row, SectionHeader, Text, TextField } from '@bulle/ui/components';
import { Glyph } from '@bulle/ui/primitives';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { goBack, useHardwareBack } from '@/lib/go-back';
import { HeaderAction } from '@/components/HeaderAction';
import { usePlanStore } from '@/store/usePlanStore';
import { useBulleStore } from '@/store/useBulleStore';
import { useNow } from '@/lib/use-now';

const EFFORTS: Effort[] = ['S', 'M', 'L'];
const WHENS: CustomTaskWhen[] = ['thisWeek', 'soon', 'beforeBirth'];

export default function NewTaskScreen() {
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const { t } = useTranslation();
  // Android's back must never strand a half-written entry outside the app.
  useHardwareBack('/plan');
  const router = useRouter();
  const { space } = useBulleTheme();
  const now = useNow();

  const bulle = useBulleStore((s) => s.bulle);
  const project = usePlanStore((s) =>
    s.projects.find((p) => p.id === projectId),
  );
  /*
    Select the raw array and filter in a memo. A selector that returns `s.tasks.filter(...)`
    builds a NEW array on every call, and zustand compares snapshots by reference — so the
    store looks changed on every render and the screen loops until React throws "Maximum
    update depth exceeded". `find` above is safe because it returns the element itself.
  */
  const allTasks = usePlanStore((s) => s.tasks);
  const siblings = useMemo(
    () => allTasks.filter((task) => task.projectId === projectId),
    [allTasks, projectId],
  );

  const [title, setTitle] = useState('');
  const [effort, setEffort] = useState<Effort>('S');
  const [when, setWhen] = useState<CustomTaskWhen>('soon');

  if (!project || !bulle) return null;

  const trimmed = title.trim();
  const weekSA = currentWeekSA(bulle.profile.dueDate, now);

  const save = () => {
    if (!trimmed) return;
    const nowIso = new Date().toISOString();
    const task: Task = {
      id: randomId(),
      projectId: project.id,
      title: trimmed,
      ...customTaskWindow(weekSA, when),
      effort,
      // A Project has a glyph but no domain of its own, so the bucket comes from the tasks
      // already in it — rather than asking someone to classify their own shopping.
      domain: dominantDomain(siblings),
      // Never essential — see the header.
      essential: false,
      status: 'todo',
      createdAt: nowIso,
      updatedAt: nowIso,
    };
    usePlanStore.getState().addTask(task);
    goBack('/plan');
  };

  return (
    <>
      {/* A sibling of Screen, not a child of it: nested inside the ScrollView's content
          container the options never reached the navigator and the header stayed bare. */}
      <Stack.Screen
        options={{
          // See memory/new: the default arrow no-ops with no history.
          headerLeft: () => (
            <HeaderAction label={t('common.back')} onPress={() => goBack('/plan')} />
          ),
          headerRight: () =>
            // Absent rather than greyed-out until there is something to save: a disabled
            // control invites tapping and explains nothing.
            trimmed ? <HeaderAction label={t('common.save')} onPress={save} /> : null,
        }}
      />
      <Screen>
        <View style={{ gap: space[2] }}>
          <Text variant="display">{t('plan.newTaskTitle')}</Text>
          <Text variant="caption">{project.title}</Text>
        </View>

        <TextField
          label={t('plan.taskLabel')}
          hint={t('plan.taskHint')}
          placeholder={t('plan.taskPlaceholder')}
          value={title}
          onChangeText={setTitle}
          autoFocus
          returnKeyType="done"
          onSubmitEditing={save}
          maxLength={120}
        />

        <View>
          <SectionHeader title={t('plan.effortQuestion')} />
          {EFFORTS.map((e, index) => (
            <Row
              key={e}
              title={t(`plan.effort.${e}`)}
              onPress={() => setEffort(e)}
              trailing={
                effort === e ? (
                  <Glyph name="check" size={18} color="sage" />
                ) : undefined
              }
              divider={index < EFFORTS.length - 1}
            />
          ))}
        </View>

        <View>
          <SectionHeader title={t('plan.whenQuestion')} />
          {WHENS.map((w, index) => (
            <Row
              key={w}
              title={t(`plan.when.${w}`)}
              onPress={() => setWhen(w)}
              trailing={
                when === w ? (
                  <Glyph name="check" size={18} color="sage" />
                ) : undefined
              }
              divider={index < WHENS.length - 1}
            />
          ))}
        </View>
      </Screen>
    </>
  );
}
