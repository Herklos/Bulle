'use client';
/**
 * Due-date picker — native.
 *
 * Uses @expo/ui's DateTimePicker: a real UIDatePicker on iOS and a real Material picker on
 * Android. This is the first interaction anyone has with Bulle, so it is worth being the
 * platform's own control rather than a JS approximation.
 *
 * `presentation="inline"` is load-bearing on Android. The default there is `'dialog'`,
 * which opens on mount and expects the caller to UNMOUNT the component on confirm —
 * mounting it declaratively means confirming re-renders it and it immediately reopens,
 * trapping the user in a loop. Inline is also simply the right shape here: the date
 * question IS the screen, so the picker belongs in the view hierarchy, not over it.
 * (iOS accepts and ignores the prop; it is always inline.)
 */
import React from 'react';
import { DateTimePicker } from '@expo/ui/community/datetime-picker';
import { useBulleTheme } from '@bulle/ui/theme';

export interface DueDatePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
}

export function DueDatePicker({ value, onChange }: DueDatePickerProps) {
  const { colors } = useBulleTheme();
  return (
    <DateTimePicker
      mode="date"
      presentation="inline"
      accentColor={colors.sage}
      value={value ?? defaultDueDate()}
      onValueChange={(_event, date) => onChange(date)}
      /*
        The height is bounded deliberately. Left to itself the Compose calendar claims ~80%
        of the screen, which pushes the confirm button off the bottom — and because the
        native view swallows vertical drags, the surrounding ScrollView cannot scroll to
        reach it either. The user gets a date picker and no way to say yes to it.
      */
      style={{ height: 360 }}
    />
  );
}

/**
 * Roughly 30 weeks out — a plausible mid-pregnancy default, so the wheel opens near the
 * answer instead of on today (which is never the answer).
 */
export function defaultDueDate(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 30 * 7);
  return d;
}
