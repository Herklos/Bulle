'use client';
/**
 * Screen scaffold: background, safe areas, and the content measure cap.
 *
 * The `maxContentWidth` cap is why the desktop layout doesn't feel like a stretched phone:
 * a 1400px-wide line of body text is a readability failure, not a use of space.
 */
import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBulleTheme } from '@bulle/ui/theme';

export interface ScreenProps {
  children: React.ReactNode;
  /** Set false for screens that own their own scrolling (e.g. a list). */
  scroll?: boolean;
  /** Primary actions belong in the lower 60% (§15.8 item 5); this keeps the top honest. */
  center?: boolean;
}

export function Screen({ children, scroll = true, center }: ScreenProps) {
  const { colors, space, layout } = useBulleTheme();
  const insets = useSafeAreaInsets();

  const inner = (
    <View
      style={{
        width: '100%',
        maxWidth: layout.maxContentWidth,
        alignSelf: 'center',
        paddingHorizontal: space[4],
        gap: space[5],
        flex: center ? 1 : undefined,
        justifyContent: center ? 'center' : undefined,
      }}
    >
      {children}
    </View>
  );

  if (!scroll) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.bg,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        {inner}
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{
        paddingTop: insets.top + space[4],
        paddingBottom: insets.bottom + space[7],
      }}
      keyboardShouldPersistTaps="handled"
    >
      {inner}
    </ScrollView>
  );
}
