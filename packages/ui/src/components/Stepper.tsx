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
import React, { useEffect } from 'react';
import { Pressable, View } from 'react-native';
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
  /** Describes WHAT is being counted — "3 sur 6" alone says nothing. */
  accessibilityLabel: string;
  disabled?: boolean;
}

export function Stepper({ count, target, onStep, accessibilityLabel, disabled }: StepperProps) {
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
      style={{ flexDirection: 'row', alignItems: 'center', gap: space[3] }}
      accessibilityLabel={`${accessibilityLabel}, ${count}/${target}`}
    >
      {button(-1, 'minus', count === 0)}
      <Animated.View style={numberStyle}>
        {/* Tabular-ish: a fixed min-width stops the row jittering as 9 becomes 10. */}
        <Text
          variant="bodyMed"
          color={complete ? 'sage' : 'ink'}
          style={{ minWidth: 44, textAlign: 'center' }}
        >
          {count}/{target}
        </Text>
      </Animated.View>
      {button(1, 'plus', complete)}
    </View>
  );
}
