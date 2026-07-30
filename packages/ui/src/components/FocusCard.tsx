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
import { Glyph } from '../primitives/Glyph.js';
import { useBulleTheme } from '../theme/context.js';
import { Button } from './Button.js';
import { Stepper } from './Stepper.js';
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
   * A counted task (§5.3) answers "how many", not "done yet". When set, the card shows the
   * stepper in place of the terracotta "Fait" — completing a stock in one tap would fill it
   * to target and lie about a cupboard nobody counted. The `count with +` IS the action here.
   */
  counted?: {
    count: number;
    target: number;
    onStep: (delta: number) => void;
    onSetCount?: (next: number) => void;
    onSetTarget?: (next: number) => void;
    accessibilityLabel: string;
  };
  /**
   * Opens the task's details. Only the TEXT is pressable, never the whole card: the card
   * carries its own actions, and a card-wide target would swallow taps meant for them.
   *
   * When set, the card shows a chevron. Without it the card was pressable and SILENT about
   * it — the affordance existed and nobody could know, which is the same as not having it.
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
  counted,
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
      <Pressable
        onPress={onOpen}
        disabled={!onOpen}
        accessibilityRole={onOpen ? 'button' : undefined}
        // The chevron rides the text block, so the row IS the target it advertises. Putting
        // it in the card's own corner would have it point at a card that does not respond.
        style={({ pressed }) => ({
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: space[3],
          opacity: pressed ? 0.6 : 1,
        })}
      >
        <View style={{ flex: 1, gap: space[1] }}>
          <Text variant="overline">{projectTitle}</Text>
          <Text variant="title">{taskTitle}</Text>
          <Text variant="caption">{effortLabel}</Text>
        </View>

        {/* The card was already openable and said nothing about it. A chevron is the app's
            existing word for "there is more behind this" (every Row uses it), so this costs
            no new vocabulary.

            Quiet on purpose: inkSoft at 18, aligned to the overline rather than centred, so
            it reads as a hint and not a second action. The boldness on this card is spent on
            the terracotta CTA, and §15.6 allows exactly one. */}
        {onOpen && (
          <View style={{ paddingTop: space[1] }}>
            <Glyph name="chevronRight" size={18} color="inkSoft" />
          </View>
        )}
      </Pressable>

      {/* `flexWrap`: the counted variant puts a full Stepper (two 44pt targets plus a number)
          beside the "Plus tard" ghost, which at Dynamic Type 130% on a narrow phone has no room
          on one line. Wrapping lets the ghost drop below rather than squeeze or clip; `gap`
          already spaces both axes. */}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: space[3],
          marginTop: space[3],
          alignItems: 'center',
        }}
      >
        {/* A counted task steps toward its target here; a plain one gets the terracotta CTA.
            Either way "Plus tard" stays a ghost beside it. */}
        {counted ? (
          <Stepper
            count={counted.count}
            target={counted.target}
            onStep={counted.onStep}
            onSetCount={counted.onSetCount}
            onSetTarget={counted.onSetTarget}
            accessibilityLabel={counted.accessibilityLabel}
          />
        ) : (
          <Button label={doneLabel} tone="accent" onPress={onDone} />
        )}
        <Button label={laterLabel} tone="ghost" onPress={onLater} />
      </View>
    </Animated.View>
  );
}
