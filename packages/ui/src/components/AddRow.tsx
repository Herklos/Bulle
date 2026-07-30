'use client';
/**
 * The app's single "add" affordance, as a quiet list row.
 *
 * A sage `plus` in the shared leading slot (`space[5]` wide, matching every other row's leading
 * spine) plus a sage label, at `Row` height (`touch.min + space[2]`). It closes a list — add an
 * appointment on Aujourd'hui, add a memory on Souvenirs — so the list always has a real,
 * tappable body rather than ending on a greyed "nothing here" caption.
 *
 * It lives here rather than as a per-screen local so the two callers can never drift apart on
 * the slot width or the row height, which is exactly what happened when it was copy-pasted.
 */
import React from 'react';
import { Pressable, View } from 'react-native';
import { useBulleTheme } from '../theme/context.js';
import { Glyph } from '../primitives/Glyph.js';
import { Text } from './Text.js';

export interface AddRowProps {
  label: string;
  onPress: () => void;
}

export function AddRow({ label, onPress }: AddRowProps) {
  const { space, touch } = useBulleTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: space[4],
        minHeight: touch.min + space[2],
        paddingVertical: space[3],
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <View style={{ width: space[5], alignItems: 'center' }}>
        <Glyph name="plus" size={20} color="sage" />
      </View>
      <Text variant="body" color="sage">
        {label}
      </Text>
    </Pressable>
  );
}
