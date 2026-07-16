'use client';
/**
 * Button.
 *
 * Three tones, and the split is a design rule rather than a palette convenience:
 *  - `primary` (sage) — every action in the app, including the paywall. A paywall is not a
 *    celebration (§15.6), so it does not get the warm colour.
 *  - `accent` (terracotta) — the home Focus card's CTA and nothing else. If a second
 *    `accent` button appears on a screen, one of them is wrong.
 *  - `ghost` — deferrals and dismissals. Carries no weight on purpose: "Plus tard" must
 *    look as easy as it is meant to feel.
 */
import React from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { useBulleTheme } from '../theme/context.js';
import { Text } from './Text.js';

export type ButtonTone = 'primary' | 'accent' | 'ghost';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  tone?: ButtonTone;
  disabled?: boolean;
  loading?: boolean;
  /** Fills the available width. */
  block?: boolean;
}

export function Button({
  label,
  onPress,
  tone = 'primary',
  disabled,
  loading,
  block,
}: ButtonProps) {
  const { colors, radius, space, touch } = useBulleTheme();

  const bg =
    tone === 'primary' ? colors.sage : tone === 'accent' ? colors.terracotta : 'transparent';
  const fg = tone === 'ghost' ? colors.inkSoft : colors.bg;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled, busy: !!loading }}
      accessibilityLabel={label}
      style={({ pressed }) => ({
        minHeight: touch.min,
        paddingHorizontal: space[5],
        borderRadius: radius.s,
        backgroundColor: bg,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: block ? 'stretch' : 'flex-start',
        opacity: disabled ? 0.4 : pressed ? 0.85 : 1,
      })}
    >
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <View>
          <Text variant="bodyMed" style={{ color: fg }}>
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
