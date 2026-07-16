'use client';
/**
 * Plus (spec §4.1).
 *
 * Built from @expo/ui's List/ListItem/Switch, so this is a REAL SwiftUI List on iOS and a
 * real Compose list on Android — not a JS approximation of one. A settings screen is where
 * platform conventions are strongest and where a hand-rolled list is most obviously wrong:
 * people know what their own OS's settings feel like.
 *
 * LAYOUT CONSTRAINT, learned the hard way: `List` is a Compose LazyColumn on Android. It
 * must own its scrolling and be measured with a BOUNDED height, so:
 *   - the screen does NOT scroll (`Screen scroll={false}`) — a lazy list inside a ScrollView
 *     hands it infinite height,
 *   - and the Host must NOT use `matchContents`, which does the same.
 * Get either wrong and it is not a layout glitch, it is a hard native crash:
 * "Vertically scrollable component was measured with an infinity maximum height constraints".
 *
 * Everything sits inside ONE Host. That is the point of the host bridge: without it each
 * control opens its own native bridge and the screen costs a dozen of them.
 *
 * Family MANAGEMENT lives here rather than in its own tab (a tab must earn daily taps, and
 * "manage members" does not). Pause is reachable in ≤2 taps from here (§3.1) and is
 * deliberately not buried under a "danger zone".
 */
import React from 'react';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Host, List, ListItem, Switch } from '@expo/ui';
import { Text } from '@bulle/ui/components';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { usePermissions } from '@/lib/permissions/usePermissions';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useBulleRegistryStore } from '@/store/useBulleRegistryStore';
import { SUPPORTED_LANGUAGES } from '@/i18n';

export default function MoreScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { colors } = useBulleTheme();
  const { isOwner } = usePermissions();

  const language = useSettingsStore((s) => s.language);
  const notifications = useSettingsStore((s) => s.notifications);
  const registry = useBulleRegistryStore((s) => s.registry);

  const bulles = registry?.bulles ?? [];

  return (
    <Screen scroll={false}>
      <Text variant="display">{t('settings.title')}</Text>

      {/*
        One Host wrapping every native control. `seedColor` is sage so the Switch and the
        list's selection tint pick up the palette rather than the platform's default blue.

        `flex: 1` and NO `matchContents` — see the layout constraint in the header.
      */}
      <Host style={{ flex: 1 }} seedColor={colors.sage}>
        <List>
          {isOwner && (
            <ListItem
              onPress={() => router.push('/more/invite')}
              supportingText={t('settings.inviteBody')}
            >
              {t('settings.invite')}
            </ListItem>
          )}

          {SUPPORTED_LANGUAGES.map((lang) => (
            <ListItem
              key={lang}
              // Goes through the store, not i18n directly: the store persists the choice and
              // _layout applies it on boot. changeLanguage alone forgets by the next launch.
              onPress={() => void useSettingsStore.getState().setLanguage(lang)}
              supportingText={language === lang ? t('settings.languageCurrent') : undefined}
            >
              {t(lang === 'fr' ? 'settings.languageFr' : 'settings.languageEn')}
            </ListItem>
          ))}

          <ListItem supportingText={t('settings.notificationsBody')}>
            {t('settings.notifications')}
            <ListItem.Trailing>
              <Switch
                value={notifications}
                onValueChange={(next) => void useSettingsStore.getState().setNotifications(next)}
              />
            </ListItem.Trailing>
          </ListItem>

          {/* Switching bulles had no entry point at all before this: the transition route
              existed and was unreachable. Only shown with more than one, so a single-bulle
              user never sees a control for a concept they do not have. */}
          {bulles.length > 1 &&
            bulles.map((entry) => (
              <ListItem
                key={entry.id}
                onPress={() => router.push(`/bulle-switch?id=${entry.id}`)}
                supportingText={
                  entry.id === registry?.activeBulleId ? t('settings.bulleActive') : undefined
                }
              >
                {entry.label}
              </ListItem>
            ))}

          <ListItem onPress={() => router.push('/more/pause')} supportingText={t('pause.enterBody')}>
            {t('pause.enter')}
          </ListItem>

          {/* The regulatory line (§7.3) is the LAST list item rather than a block beneath
              the list. Anything rendered below a LazyColumn competes with it for height and
              clips it — and this line has to be reachable, not cut off. */}
          <ListItem supportingText={t('settings.aboutBody')}>{t('settings.about')}</ListItem>
        </List>
      </Host>
    </Screen>
  );
}
