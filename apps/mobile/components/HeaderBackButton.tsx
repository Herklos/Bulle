'use client';
/**
 * A chevron-left back action for the native Stack header.
 *
 * The platform arrow is absent when a screen opens first in the stack (deep link, notification,
 * web reload), so these screens supply an explicit `headerLeft`. It is a chevron rather than a
 * "Back" text button: a bare glyph is the platform-native shape for stack-back, reads at a
 * glance, and does not need translating. The label survives for VoiceOver.
 */
import React from 'react';
import { Pressable } from 'react-native';
import { useBulleTheme } from '@bulle/ui/theme';
import { Glyph } from '@bulle/ui/primitives';

export interface HeaderBackButtonProps {
  /** Accessibility label (e.g. t('common.back')). The glyph carries no text. */
  label: string;
  onPress: () => void;
}

export function HeaderBackButton({ label, onPress }: HeaderBackButtonProps) {
  const { colors, space, touch } = useBulleTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={space[2]}
      style={{ minHeight: touch.min, justifyContent: 'center', paddingHorizontal: space[2] }}
    >
      <Glyph name="chevronLeft" size={24} tint={colors.sage} />
    </Pressable>
  );
}
