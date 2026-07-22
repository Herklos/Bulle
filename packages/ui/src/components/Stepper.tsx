'use client';
/**
 * Stepper — the counted-task control. "3 / 6", minus on one side, plus on the other.
 *
 * It stands where the Checkbox stands, and it is deliberately built from the same parts: a
 * 24px glyph on a 44pt target, the same `pop`, the same light haptic. A counted task is not
 * a different kind of object, it is the same row answering a different question, and the
 * eye should not have to relearn the list to read it.
 *
 * No box, no border, no segmented control. The number IS the control's state; the two
 * glyphs are the only chrome it gets (§15.4 — hierarchy from space and type, not boxes).
 *
 * Reaching the target turns the number sage, which is the same acknowledgement the tick
 * gives, in the one colour the product uses to mean "good". It never turns red on the way
 * there: an unfinished stock is not a failure (§5.1).
 */
import React, { useEffect, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useBulleTheme } from '../theme/context.js';
import { pop } from '../theme/motion.js';
import { Glyph } from '../primitives/Glyph.js';
import { Text } from './Text.js';

export interface StepperProps {
  /** How many are owned. Already clamped by the caller (see `taskCount`). */
  count: number;
  /** How many are needed. Reaching it is what "done" means for this task. */
  target: number;
  /** Called with -1 or +1. The caller derives the new count and status. */
  onStep: (delta: number) => void;
  /**
   * Set the count outright. Omit to make the number read-only.
   *
   * Tapping ten times to record a bag of hand-me-downs is the kind of small indignity that
   * makes a tool feel like it was never used by its author.
   */
  onSetCount?: (next: number) => void;
  /** Set the target outright. Omit to make the target read-only. */
  onSetTarget?: (next: number) => void;
  /** Describes WHAT is being counted — "3 sur 6" alone says nothing. */
  accessibilityLabel: string;
  /** Dimmed and inert. Used for "pas pour nous", which stays legible rather than vanishing. */
  ignored?: boolean;
  disabled?: boolean;
}

/**
 * The inline number editor.
 *
 * Deliberately NOT a modal, a sheet, or a "modifier" button: the digit is already on screen,
 * so tapping it and typing over it adds exactly zero new elements to the row. Anything else
 * would be a second control competing with the one that is already there.
 */
function EditableNumber({
  value,
  onCommit,
  color,
  align,
  label,
}: {
  value: number;
  onCommit?: (next: number) => void;
  color: 'ink' | 'inkSoft' | 'sage';
  align: 'right' | 'left';
  label: string;
}) {
  const { colors } = useBulleTheme();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');

  if (!onCommit) {
    return (
      <Text variant="bodyMed" color={color} style={{ minWidth: 20, textAlign: align }}>
        {value}
      </Text>
    );
  }

  const commit = () => {
    setEditing(false);
    const parsed = Number.parseInt(draft, 10);
    // An empty or junk field means "I changed my mind", not "set it to zero". Silently
    // keeping the old value is the only behaviour that cannot lose data the user had.
    if (Number.isFinite(parsed) && parsed !== value) onCommit(parsed);
  };

  if (editing) {
    return (
      <TextInput
        value={draft}
        onChangeText={(text) => setDraft(text.replace(/[^0-9]/g, '').slice(0, 3))}
        onBlur={commit}
        onSubmitEditing={commit}
        keyboardType="number-pad"
        returnKeyType="done"
        autoFocus
        selectTextOnFocus
        accessibilityLabel={label}
        style={{
          minWidth: 28,
          textAlign: align,
          fontSize: 16,
          fontFamily: 'Inter_500Medium',
          padding: 0,
          color: colors.ink,
        }}
      />
    );
  }

  return (
    <Pressable
      onPress={() => {
        setDraft(String(value));
        setEditing(true);
      }}
      accessibilityRole="button"
      accessibilityLabel={label}
      // 12 all round over a ~20px glyph clears the 44pt floor (§15.8 item 5); 10 left it a
      // hair short at ~40.
      hitSlop={12}
    >
      <Text variant="bodyMed" color={color} style={{ minWidth: 20, textAlign: align }}>
        {value}
      </Text>
    </Pressable>
  );
}

export function Stepper({
  count,
  target,
  onStep,
  onSetCount,
  onSetTarget,
  accessibilityLabel,
  ignored,
  disabled,
}: StepperProps) {
  const { colors, touch, space } = useBulleTheme();
  const reduced = useReducedMotion();
  const complete = count >= target;

  const scale = useSharedValue(1);
  const numberStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  // Pops on ARRIVAL only. Every increment popping would turn a six-tap errand into six
  // little celebrations, which is exactly the badge-and-confetti register §15.1 rules out.
  useEffect(() => {
    if (complete && !reduced) {
      scale.value = withSequence(withSpring(1.12, pop), withSpring(1, pop));
    }
  }, [complete, reduced, scale]);

  const step = (delta: number) => {
    if (disabled) return;
    if (delta < 0 && count === 0) return;
    if (delta > 0 && complete) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    onStep(delta);
  };

  const button = (delta: number, glyph: 'minus' | 'plus', inert: boolean) => (
    <Pressable
      onPress={() => step(delta)}
      disabled={disabled || inert}
      accessibilityRole="button"
      accessibilityLabel={`${accessibilityLabel} ${delta > 0 ? '+1' : '-1'}`}
      // The glyph is 24px; the target must be 44 (§15.8 item 5).
      hitSlop={(touch.min - 24) / 2}
      style={{ opacity: disabled || inert ? 0.3 : 1 }}
    >
      <Glyph name={glyph} size={24} color="inkSoft" />
    </Pressable>
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: space[3],
        // Ignored stays readable rather than disappearing: "pas pour nous" is a decision the
        // user made and must remain visibly reversible, not a row that silently vanished.
        opacity: ignored ? 0.4 : 1,
      }}
      accessibilityLabel={`${accessibilityLabel}, ${count}/${target}`}
    >
      {button(-1, 'minus', count === 0)}
      <Animated.View style={numberStyle}>
        {/*
          Two numbers, each its own tap target, with a slash between them. The whole manual
          entry affordance is exactly this: the digits already on screen are the fields.
          A fixed min-width on the pair stops the row jittering as 9 becomes 10.
        */}
        <View
          style={{ flexDirection: 'row', alignItems: 'center', minWidth: 52, justifyContent: 'center' }}
        >
          <EditableNumber
            value={count}
            onCommit={disabled || ignored ? undefined : onSetCount}
            color={complete ? 'sage' : 'ink'}
            align="right"
            label={`${accessibilityLabel} — ${count}`}
          />
          <Text variant="bodyMed" color="inkSoft">
            /
          </Text>
          <EditableNumber
            value={target}
            onCommit={disabled || ignored ? undefined : onSetTarget}
            color="inkSoft"
            align="left"
            label={`${accessibilityLabel} — ${target}`}
          />
        </View>
      </Animated.View>
      {button(1, 'plus', complete)}
    </View>
  );
}
