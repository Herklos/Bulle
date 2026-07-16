'use client';
/**
 * Due-date picker — web.
 *
 * A native `<input type="date">`. The browser's own picker is better than anything we would
 * build, is keyboard accessible for free, and is localised by the OS — the same reasoning
 * that makes @expo/ui the right call on native.
 */
import React from 'react';
import { View } from 'react-native';
import { useBulleTheme } from '@bulle/ui/theme';
// NOT from './DueDatePicker': on web that resolves to THIS file, so the module imported
// from itself and the re-exported getter recursed until the stack blew. See due-date.ts.
import { defaultDueDate, type DueDatePickerProps } from './due-date';

function toInputValue(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function DueDatePicker({ value, onChange }: DueDatePickerProps) {
  const { colors, radius, space, touch, type } = useBulleTheme();

  return (
    <View>
      <input
        type="date"
        value={toInputValue(value ?? defaultDueDate())}
        onChange={(event) => {
          const next = event.target.valueAsDate;
          if (next) onChange(next);
        }}
        style={{
          minHeight: touch.min,
          padding: space[3],
          borderRadius: radius.s,
          border: `1px solid ${colors.line}`,
          background: colors.surface,
          color: colors.ink,
          fontFamily: 'Inter_400Regular',
          fontSize: type.body.size,
          width: '100%',
        }}
      />
    </View>
  );
}

export { defaultDueDate };
