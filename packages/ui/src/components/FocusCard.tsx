'use client';
/**
 * The Focus card (spec §5.1, §15.6) — the answer to "what now?".
 *
 * ONE task. Never a count, never a backlog, never a second card. It is the only surface in
 * the app allowed a terracotta CTA, and the only card on the home screen.
 *
 * Anatomy is fixed: overline (project) · title (task) · caption (effort) · actions.
 * "Plus tard" is a ghost and carries no counter — see `tasks.ts`, deferral is session state
 * that is never written down, precisely so it can never become a guilt surface.
 */
import React from 'react';
import { Pressable, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useBulleTheme } from '../theme/context.js';
import { Button } from './Button.js';
import { Text } from './Text.js';

export interface FocusCardProps {
  /** The project this task belongs to. */
  projectTitle: string;
  taskTitle: string;
  /** Pre-formatted effort, e.g. "~20 min". */
  effortLabel: string;
  doneLabel: string;
  laterLabel: string;
  onDone: () => void;
  onLater: () => void;
  /**
   * Opens the task's details. Only the TEXT is pressable, never the whole card: the card
   * carries its own actions, and a card-wide target would swallow taps meant for them.
   */
  onOpen?: () => void;
}

export function FocusCard({
  projectTitle,
  taskTitle,
  effortLabel,
  doneLabel,
  laterLabel,
  onDone,
  onLater,
  onOpen,
}: FocusCardProps) {
  const { colors, radius, space } = useBulleTheme();

  return (
    <Animated.View
      entering={FadeIn.duration(350)}
      style={{
        backgroundColor: colors.surface,
        borderRadius: radius.m,
        padding: space[5],
        gap: space[2],
      }}
    >
      <Pressable onPress={onOpen} disabled={!onOpen} accessibilityRole={onOpen ? 'button' : undefined}>
        <Text variant="overline">{projectTitle}</Text>
        <Text variant="title">{taskTitle}</Text>
        <Text variant="caption">{effortLabel}</Text>
      </Pressable>

      <View style={{ flexDirection: 'row', gap: space[3], marginTop: space[3] }}>
        <Button label={doneLabel} tone="accent" onPress={onDone} />
        <Button label={laterLabel} tone="ghost" onPress={onLater} />
      </View>
    </Animated.View>
  );
}
