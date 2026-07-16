'use client';
/**
 * An onboarding answer.
 *
 * Still a flat row on the background with a hairline under it (§15.4 bans bordered cards),
 * but given real presence: a generous target, title-sized type, and a sage dot that only
 * appears on press. The restraint is in the chrome, not in the rhythm.
 *
 * Entrances stagger at 40ms, capped at 3 elements per §15.5 — the cap is why a five-option
 * question still feels composed rather than like a dealt hand of cards.
 */
import React from 'react';
import { Pressable, View } from 'react-native';
import Animated, { FadeInDown, useReducedMotion } from 'react-native-reanimated';
import { useBulleTheme } from '@bulle/ui/theme';
import { Text } from '@bulle/ui/components';

export interface OnboardingChoiceProps {
  label: string;
  onPress: () => void;
  /** Position in the group; drives the stagger. */
  index?: number;
  last?: boolean;
}

const STAGGER_MS = 40;
const MAX_STAGGERED = 3;

export function OnboardingChoice({ label, onPress, index = 0, last }: OnboardingChoiceProps) {
  const { colors, space, touch } = useBulleTheme();
  const reduced = useReducedMotion();
  const [pressed, setPressed] = React.useState(false);

  const entering = reduced
    ? undefined
    : FadeInDown.delay(Math.min(index, MAX_STAGGERED) * STAGGER_MS)
        .duration(350)
        .springify()
        .damping(18);

  return (
    <Animated.View entering={entering}>
      <Pressable
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        accessibilityRole="button"
        accessibilityLabel={label}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: space[4],
          minHeight: touch.min + space[4],
          paddingVertical: space[4],
          borderBottomWidth: last ? 0 : 1,
          borderBottomColor: colors.line,
        }}
      >
        {/* A quiet marker that fills on press. The only feedback the row needs. */}
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: pressed ? colors.sage : colors.line,
          }}
        />
        <Text variant="title" color={pressed ? 'sage' : 'ink'} style={{ flex: 1 }}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
