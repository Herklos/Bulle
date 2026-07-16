'use client';
/**
 * A text action for the native Stack header.
 *
 * Confirm actions live in the header on the picker screens because an inline @expo/ui picker
 * sizes to its own content and paints over anything below it — see app/event/new.tsx. It is
 * also simply where both platforms put the confirm action on a form sheet, so it is the
 * right shape even where nothing forces it.
 */
import React from 'react';
import { Pressable } from 'react-native';
import { useBulleTheme } from '@bulle/ui/theme';
import { Text } from '@bulle/ui/components';

export interface HeaderActionProps {
  label: string;
  onPress: () => void;
}

export function HeaderAction({ label, onPress }: HeaderActionProps) {
  const { colors, space, touch } = useBulleTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      hitSlop={space[2]}
      style={{ minHeight: touch.min, justifyContent: 'center', paddingHorizontal: space[2] }}
    >
      <Text variant="body" style={{ color: colors.sage }}>
        {label}
      </Text>
    </Pressable>
  );
}
