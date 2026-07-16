'use client';
/**
 * Onboarding progress: a single hairline that fills with sage.
 *
 * Deliberately not dots, not "3/6", not a bar with a percentage. It is the same visual
 * language as the fil — one continuous line you are travelling along — and it answers "how
 * much is left?" without turning the first 90 seconds into a form with a completion score.
 */
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useBulleTheme, motion } from '@bulle/ui/theme';

export interface StepProgressProps {
  /** 0..1 */
  progress: number;
}

export function StepProgress({ progress }: StepProgressProps) {
  const { colors } = useBulleTheme();
  const reduced = useReducedMotion();
  const width = useSharedValue(progress);

  useEffect(() => {
    width.value = reduced ? progress : withSpring(progress, motion.settle);
  }, [progress, reduced, width]);

  const style = useAnimatedStyle(() => ({ width: `${width.value * 100}%` }));

  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{ height: 2, backgroundColor: colors.line, borderRadius: 2, overflow: 'hidden' }}
    >
      <Animated.View style={[{ height: 2, backgroundColor: colors.sage, borderRadius: 2 }, style]} />
    </View>
  );
}
