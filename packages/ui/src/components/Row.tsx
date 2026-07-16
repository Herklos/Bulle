'use client';
/**
 * A flat list row — the workhorse layout of the app.
 *
 * This exists so that §15.4's rule is the path of least resistance: hierarchy comes from
 * space and type, not from boxes. Rows sit directly on the background and are separated by
 * a 1px `line`. There is no `card` prop and no elevation, deliberately.
 */
import React from 'react';
import { Pressable, View } from 'react-native';
import { useBulleTheme } from '../theme/context.js';
import { Glyph } from '../primitives/Glyph.js';
import { Text } from './Text.js';

export interface RowProps {
  title: string;
  subtitle?: string;
  /** Rendered at the leading edge — a Glyph, a Checkbox, a ProgressRing. */
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  onPress?: () => void;
  /** Adds the trailing chevron. Only meaningful with `onPress`. */
  chevron?: boolean;
  /** Omit on the last row of a group. */
  divider?: boolean;
}

export function Row({
  title,
  subtitle,
  leading,
  trailing,
  onPress,
  chevron,
  divider = true,
}: RowProps) {
  const { colors, space, touch } = useBulleTheme();

  const body = (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: space[4],
        minHeight: touch.min + space[2],
        paddingVertical: space[3],
        borderBottomWidth: divider ? 1 : 0,
        borderBottomColor: colors.line,
      }}
    >
      {leading}
      <View style={{ flex: 1, gap: 2 }}>
        <Text variant="body">{title}</Text>
        {subtitle && <Text variant="caption">{subtitle}</Text>}
      </View>
      {trailing}
      {chevron && onPress && <Glyph name="chevronRight" size={18} color="inkSoft" />}
    </View>
  );

  if (!onPress) return body;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
    >
      {body}
    </Pressable>
  );
}
