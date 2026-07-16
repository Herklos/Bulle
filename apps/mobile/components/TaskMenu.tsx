'use client';
/**
 * The per-task overflow menu — native (iOS/Android).
 *
 * `MenuView` from @expo/ui renders a REAL SwiftUI `Menu` on iOS and a Compose
 * `DropdownMenu` on Android. This is the payoff of the @expo/ui bet: the menu is
 * indistinguishable from a first-party one because it IS the platform's.
 *
 * `TaskMenu.web.tsx` handles web, where MenuView renders the trigger but never fires its
 * actions.
 */
import React from 'react';
import { Pressable } from 'react-native';
import { MenuView } from '@expo/ui/community/menu';
import { useBulleTheme } from '@bulle/ui/theme';
import { Glyph } from '@bulle/ui/primitives';

export interface TaskMenuProps {
  dismissLabel: string;
  deleteLabel: string;
  onDismiss: () => void;
  onDelete: () => void;
}

export function TaskMenu({ dismissLabel, deleteLabel, onDismiss, onDelete }: TaskMenuProps) {
  const { touch } = useBulleTheme();

  return (
    <MenuView
      actions={[
        { id: 'dismiss', title: dismissLabel, image: 'minus.circle' },
        // `destructive` is the ONE sanctioned red in the app (§15.1: danger is for
        // destructive actions only, never for "late").
        { id: 'delete', title: deleteLabel, image: 'trash', attributes: { destructive: true } },
      ]}
      onPressAction={({ nativeEvent }) => {
        if (nativeEvent.event === 'dismiss') onDismiss();
        if (nativeEvent.event === 'delete') onDelete();
      }}
    >
      <Pressable accessibilityRole="button" hitSlop={touch.min / 2} style={{ padding: 8 }}>
        <Glyph name="more" size={20} color="inkSoft" />
      </Pressable>
    </MenuView>
  );
}
