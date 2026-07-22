'use client';
/**
 * Web navigation. Two modes in one file, chosen by width:
 *   < 1024px → a JS bottom tab bar (the mobile-web experience)
 *   >= 1024px → the DesktopSidebar, with the tab bar hidden
 *
 * Expo Router resolves this over `_layout.tsx` on web automatically, which is how the same
 * routes get a real native tab bar on device and an appropriate web one here.
 */
import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useBulleTheme } from '@bulle/ui/theme';
import { Glyph } from '@bulle/ui/primitives';
import { DesktopSidebar } from '@/components/DesktopSidebar';
import { useIsWideScreen } from '@/lib/useIsWideScreen';
import { usePauseState } from '@/lib/use-pause';

export default function TabLayout() {
  const { t } = useTranslation();
  const { colors, type } = useBulleTheme();
  const isWide = useIsWideScreen();
  const paused = usePauseState();

  const tabs = (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.sage,
        tabBarInactiveTintColor: colors.inkSoft,
        tabBarStyle: isWide
          ? { display: 'none' } // the sidebar navigates; two navigations would be one too many
          : {
              backgroundColor: colors.bg,
              borderTopColor: colors.line,
              borderTopWidth: 1,
              elevation: 0,
            },
        tabBarLabelStyle: { fontSize: type.overline.size, fontFamily: 'Inter_500Medium' },
      }}
    >
      <Tabs.Screen
        name="today"
        options={{
          title: t('tabs.today'),
          tabBarIcon: ({ color }) => <Glyph name="today" size={22} tint={color as string} />,
        }}
      />
      <Tabs.Screen
        name="journey"
        options={{
          title: t('tabs.journey'),
          // `href: null` removes the tab entirely rather than hiding it — a Pause-mode user
          // must not be able to reach the Journey by any route.
          href: paused ? null : undefined,
          tabBarIcon: ({ color }) => <Glyph name="chemin" size={22} tint={color as string} />,
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          title: t('tabs.plan'),
          tabBarIcon: ({ color }) => <Glyph name="plan" size={22} tint={color as string} />,
        }}
      />
      <Tabs.Screen
        name="memories"
        options={{
          title: t('tabs.memories'),
          tabBarIcon: ({ color }) => <Glyph name="souvenirs" size={22} tint={color as string} />,
        }}
      />
    </Tabs>
  );

  return (
    <View style={{ flex: 1, flexDirection: isWide ? 'row' : 'column', backgroundColor: colors.bg }}>
      {isWide && <DesktopSidebar />}
      <View style={{ flex: 1 }}>{tabs}</View>
    </View>
  );
}
