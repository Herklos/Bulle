'use client';
/**
 * Plus (spec §4.1).
 *
 * Family MANAGEMENT lives here rather than in a tab: a tab must earn daily taps, and
 * "manage members" does not. Family PRESENCE is woven into Aujourd'hui and the task rows.
 *
 * Pause is reachable in ≤2 taps from here (§3.1) and is deliberately NOT buried under a
 * "danger zone" or an accordion.
 */
import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Row, SectionHeader, Text } from '@bulle/ui/components';
import { Glyph } from '@bulle/ui/primitives';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { usePermissions } from '@/lib/permissions/usePermissions';
import { useSettingsStore } from '@/store/useSettingsStore';
import { SUPPORTED_LANGUAGES } from '@/i18n';

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { space } = useBulleTheme();
  const { isOwner } = usePermissions();

  return (
    <Screen>
      <Text variant="display">{t('settings.title')}</Text>

      {isOwner && (
        <View>
          <SectionHeader title={t('settings.family')} />
          <Row
            title={t('settings.invite')}
            subtitle={t('settings.inviteBody')}
            leading={<Glyph name="members" size={22} color="inkSoft" />}
            onPress={() => router.push('/more/invite')}
            chevron
            divider={false}
          />
        </View>
      )}

      <View>
        <SectionHeader title={t('settings.language')} />
        {SUPPORTED_LANGUAGES.map((lang, index) => (
          <Row
            key={lang}
            title={t(lang === 'fr' ? 'settings.languageFr' : 'settings.languageEn')}
            trailing={i18n.language === lang ? <Glyph name="check" size={18} color="sage" /> : undefined}
            // Goes through the store, not i18n directly: the store persists the choice, and
            // _layout applies it on boot. Calling changeLanguage alone switches the running
            // app and silently forgets by the next launch.
            onPress={() => void useSettingsStore.getState().setLanguage(lang)}
            divider={index < SUPPORTED_LANGUAGES.length - 1}
          />
        ))}
      </View>

      <View>
        <SectionHeader title={t('settings.pause')} />
        <Row
          title={t('pause.enter')}
          subtitle={t('pause.enterBody')}
          leading={<Glyph name="pause" size={22} color="inkSoft" />}
          onPress={() => router.push('/more/pause')}
          chevron
          divider={false}
        />
      </View>

      <View style={{ height: space[4] }} />
    </Screen>
  );
}
