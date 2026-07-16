'use client';
/**
 * The desktop rail (web, >= 1024px).
 *
 * It carries routes the native tab bar deliberately omits (Plus/settings), because a
 * sidebar has room a tab bar does not. That asymmetry is intentional: each platform gets
 * the navigation it actually has space for, rather than the lowest common denominator.
 */
import React from 'react';
import { Pressable, View } from 'react-native';
import { Link, useSegments } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useBulleTheme } from '@bulle/ui/theme';
import { Glyph, type GlyphName } from '@bulle/ui/primitives';
import { Text } from '@bulle/ui/components';
import { usePauseState } from '@/lib/use-pause';

interface NavItem {
  key: string;
  href: string;
  glyph: GlyphName;
  labelKey: string;
}

const NAV_ITEMS: NavItem[] = [
  { key: 'today', href: '/today', glyph: 'today', labelKey: 'tabs.today' },
  { key: 'journey', href: '/journey', glyph: 'chemin', labelKey: 'tabs.journey' },
  { key: 'plan', href: '/plan', glyph: 'plan', labelKey: 'tabs.plan' },
  { key: 'memories', href: '/memories', glyph: 'souvenirs', labelKey: 'tabs.memories' },
];

const SETTINGS_ITEM: NavItem = {
  key: 'more',
  href: '/more',
  glyph: 'settings',
  labelKey: 'tabs.more',
};

function SidebarLink({ item, active }: { item: NavItem; active: boolean }) {
  const { colors, radius, space, touch } = useBulleTheme();
  const { t } = useTranslation();
  const [hovered, setHovered] = React.useState(false);

  return (
    <Link href={item.href as never} asChild>
      <Pressable
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}
        accessibilityRole="link"
        accessibilityState={{ selected: active }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: space[3],
          minHeight: touch.min,
          paddingHorizontal: space[3],
          borderRadius: radius.s,
          // Active state is a wash of the accent, not a border or a pill outline (§15.4).
          backgroundColor: active
            ? colors.sage + '1F'
            : hovered
              ? colors.line + '80'
              : 'transparent',
        }}
      >
        <Glyph name={item.glyph} size={20} color={active ? 'sage' : 'inkSoft'} />
        <Text variant="bodyMed" color={active ? 'sage' : 'ink'}>
          {t(item.labelKey)}
        </Text>
      </Pressable>
    </Link>
  );
}

export function DesktopSidebar() {
  const { colors, layout, space } = useBulleTheme();
  const segments = useSegments();
  const paused = usePauseState();

  // `(tabs)/today` → "today"; `settings/index` → "settings".
  const parts = segments as string[];
  const activeKey = parts[0] === '(tabs)' ? parts[1] : parts[0];

  const items = paused ? NAV_ITEMS.filter((i) => i.key !== 'journey') : NAV_ITEMS;

  return (
    <View
      style={{
        width: layout.sidebarWidth,
        borderRightWidth: 1,
        borderRightColor: colors.line,
        paddingHorizontal: space[3],
        paddingVertical: space[5],
        gap: space[1],
      }}
    >
      <View style={{ paddingHorizontal: space[3], marginBottom: space[5] }}>
        <Text variant="titleXL">Bulle</Text>
      </View>

      {items.map((item) => (
        <SidebarLink key={item.key} item={item} active={activeKey === item.key} />
      ))}

      <View style={{ flex: 1 }} />

      <SidebarLink item={SETTINGS_ITEM} active={activeKey === 'more'} />
    </View>
  );
}
