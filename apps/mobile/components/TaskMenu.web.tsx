'use client';
/**
 * The per-task overflow menu — web.
 *
 * @expo/ui's MenuView renders its trigger on web but never fires its actions, so the native
 * component would look right and silently do nothing. A small popover built from the design
 * system is the honest alternative.
 */
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useBulleTheme } from '@bulle/ui/theme';
import { Glyph } from '@bulle/ui/primitives';
import { Text } from '@bulle/ui/components';
import type { TaskMenuProps } from './TaskMenu';

export function TaskMenu({ dismissLabel, deleteLabel, onDismiss, onDelete }: TaskMenuProps) {
  const { colors, radius, space, touch } = useBulleTheme();
  const [open, setOpen] = useState(false);

  const item = (label: string, onPress: () => void, danger?: boolean) => (
    <Pressable
      onPress={() => {
        setOpen(false);
        onPress();
      }}
      accessibilityRole="menuitem"
      style={{ minHeight: touch.min, justifyContent: 'center', paddingHorizontal: space[4] }}
    >
      <Text variant="body" color={danger ? 'danger' : 'ink'}>
        {label}
      </Text>
    </Pressable>
  );

  return (
    <View>
      <Pressable
        onPress={() => setOpen((v) => !v)}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        hitSlop={touch.min / 2}
        style={{ padding: 8 }}
      >
        <Glyph name="more" size={20} color="inkSoft" />
      </Pressable>

      {open && (
        <>
          {/* Click-away. Covers the viewport beneath the menu so the next click closes it
              rather than falling through to a task row. */}
          <Pressable
            onPress={() => setOpen(false)}
            accessibilityLabel=""
            style={{ position: 'fixed', inset: 0 } as never}
          />
          <View
            accessibilityRole="menu"
            style={{
              position: 'absolute',
              right: 0,
              top: touch.min,
              minWidth: 180,
              backgroundColor: colors.surface,
              borderRadius: radius.s,
              paddingVertical: space[2],
              zIndex: 10,
            }}
          >
            {item(dismissLabel, onDismiss)}
            {item(deleteLabel, onDelete, true)}
          </View>
        </>
      )}
    </View>
  );
}
