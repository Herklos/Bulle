'use client';
/**
 * Checkbox (spec §15.6) — 24px, the tick drawn rather than faded in, plus `pop` and a
 * light haptic.
 *
 * The draw matters: a checkmark that appears is a state change, a checkmark that *draws
 * itself* is an acknowledgement. This is the single most-repeated interaction in the app,
 * so it is worth the extra 120ms of care.
 */
import React, { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useBulleTheme } from '../theme/context.js';
import { pop, tickDraw } from '../theme/motion.js';
import { GLYPHS } from '../primitives/Glyph.js';

const AnimatedPath = Animated.createAnimatedComponent(Path);

/** Length of the `check` glyph path, in its own 24-grid units. Measured once, not computed
 *  at runtime: `getTotalLength()` is unavailable in react-native-svg on native. */
const CHECK_LENGTH = 26;

export interface CheckboxProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  /** Describes what is being ticked — the box itself is not self-describing. */
  accessibilityLabel: string;
  disabled?: boolean;
}

export function Checkbox({ checked, onChange, accessibilityLabel, disabled }: CheckboxProps) {
  const { colors, touch } = useBulleTheme();
  const reduced = useReducedMotion();

  const progress = useSharedValue(checked ? 1 : 0);
  const scale = useSharedValue(1);

  useEffect(() => {
    progress.value = reduced
      ? (checked ? 1 : 0)
      : withTiming(checked ? 1 : 0, tickDraw);
  }, [checked, reduced, progress]);

  const tickProps = useAnimatedProps(() => ({
    strokeDashoffset: CHECK_LENGTH * (1 - progress.value),
  }));

  const boxStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const handlePress = () => {
    if (disabled) return;
    // withSequence, NOT a spring with a completion callback that starts another spring:
    // that callback runs on the UI thread as a non-worklet and re-enters the same shared
    // value, which blows the native stack ("Maximum call stack size exceeded") on the very
    // first tap. The sequence says the same thing declaratively and cannot recurse.
    if (!reduced) scale.value = withSequence(withSpring(1.12, pop), withSpring(1, pop));
    // Haptics are iOS/Android only; the web no-ops rather than throwing.
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    onChange(!checked);
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={accessibilityLabel}
      // The visual box is 24px, but the touch target must be 44 (§15.8 item 5).
      hitSlop={(touch.min - 24) / 2}
      style={{ opacity: disabled ? 0.4 : 1 }}
    >
      <Animated.View style={boxStyle}>
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 8,
            borderWidth: 1.75,
            borderColor: checked ? colors.sage : colors.line,
            backgroundColor: checked ? colors.sage : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24">
            <AnimatedPath
              d={GLYPHS.check}
              stroke={colors.bg}
              strokeWidth={2.25}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              strokeDasharray={CHECK_LENGTH}
              animatedProps={tickProps}
            />
          </Svg>
        </View>
      </Animated.View>
    </Pressable>
  );
}
