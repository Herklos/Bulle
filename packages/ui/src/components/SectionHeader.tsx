'use client';
/**
 * Section header. An overline plus optional trailing action.
 *
 * Deliberately not a "card header": sections are separated by space and type, never by a
 * box or a tinted band (§15.4). This component exists so that rule is easy to follow.
 */
import React from 'react';
import { Pressable, View } from 'react-native';
import { useBulleTheme } from '../theme/context.js';
import { Text } from './Text.js';

export interface SectionHeaderProps {
  title: string;
  action?: { label: string; onPress: () => void };
}

export function SectionHeader({ title, action }: SectionHeaderProps) {
  const { space, touch } = useBulleTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: space[2],
      }}
    >
      <Text variant="overline">{title}</Text>
      {action && (
        <Pressable
          onPress={action.onPress}
          accessibilityRole="button"
          hitSlop={touch.min / 2}
        >
          <Text variant="caption" color="sage">
            {action.label}
          </Text>
        </Pressable>
      )}
    </View>
  );
}
