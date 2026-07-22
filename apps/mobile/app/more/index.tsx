'use client';
/**
 * Plus (spec §4.1).
 *
 * Built from Bulle's OWN Row and SectionHeader, not from a native list container, and that
 * is a reversal worth recording so it is not re-reverted.
 *
 * It was @expo/ui `List` first: one flat run of rows where invite, language, notifications,
 * premium, Pause and the legal line all sat at the same level with nothing saying they are
 * different KINDS of thing. That diagnosis was right and the screen did need grouping.
 *
 * The fix was then `FieldGroup`, reasoning that a settings screen is a form and both
 * platforms ship `Form` for exactly this. On Android that renders the Material 3 "connected
 * list": a filled rounded container per section, with another rounded card per row INSIDE
 * it. Boxes inside boxes — precisely what §15.6 bans (card borders, alternating section
 * backgrounds) and the opposite of §15.4's "hierarchy comes from space and type, not boxes".
 * It was more native and less Bulle, on the exact axis the spec says never to trade.
 *
 * So: sections from SectionHeader, rows from Row, separated by the 1px `line` and by space.
 * Same grouping, no boxes, and identical to Préparer and the Chemin — which is the point. A
 * settings screen that is the only screen built out of different parts is not a settings
 * screen, it is a foreign screen.
 *
 * The one native island left is the notifications Switch, wrapped in its own small Host.
 * A toggle is a control people expect to feel like their OS's toggle, and it is a leaf: it
 * imposes nothing on its neighbours, which is the whole reason the container was the problem
 * and this is not.
 *
 * Family MANAGEMENT lives here rather than in its own tab (a tab must earn daily taps, and
 * "manage members" does not). Pause is reachable in ≤2 taps from here (§3.1) and is
 * deliberately not buried under a "danger zone".
 */
import React from 'react';
import { Alert, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Host, Switch } from '@expo/ui';
import { DEFAULT_COUNTRY } from '@bulle/sdk';
import { Row, SectionHeader, Text } from '@bulle/ui/components';
import { Glyph } from '@bulle/ui/primitives';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { HeaderBackButton } from '@/components/HeaderBackButton';
import { goBack, useHardwareBack } from '@/lib/go-back';
import { usePauseState } from '@/lib/use-pause';
import { usePermissions } from '@/lib/permissions/usePermissions';
import { useSettingsStore } from '@/store/useSettingsStore';
import { usePremiumStore } from '@/store/usePremiumStore';
import { useBulleStore } from '@/store/useBulleStore';
import { useBulleRegistryStore } from '@/store/useBulleRegistryStore';
import { SUPPORTED_LANGUAGES } from '@/i18n';
import { SUPPORTED_COUNTRIES } from '@/lib/countries';

export default function MoreScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { colors } = useBulleTheme();
  const { isOwner } = usePermissions();
  // Pushed from the home header, so on a web reload it can be first in the stack where the
  // default arrow no-ops. Android's hardware back has the same dead end.
  useHardwareBack('/today');
  // Pause (§3.1). Réglages is reachable in ONE tap from the Pause screen ("garder" →
  // /more), so no pregnancy section may show here after a loss.
  const paused = usePauseState();

  const language = useSettingsStore((s) => s.language);
  const notifications = useSettingsStore((s) => s.notifications);
  const registry = useBulleRegistryStore((s) => s.registry);
  const isPremium = usePremiumStore((s) => s.isPremium);
  const bulle = useBulleStore((s) => s.bulle);

  const bulles = registry?.bulles ?? [];
  const country = bulle?.profile.country ?? DEFAULT_COUNTRY;

  // Says something either way. A restore that silently does nothing reads as a broken
  // button, and the user has no way to tell "nothing to restore" from "it failed".
  const restore = async () => {
    const ok = await usePremiumStore.getState().restore();
    Alert.alert(t(ok ? 'settings.restoreDone' : 'settings.restoreEmpty'));
  };

  return (
    // Scrolls again. The lazy native container needed a bounded height and therefore
    // scroll={false}; Bulle's own rows are ordinary views, so the Screen just scrolls and
    // the whole infinity-height constraint goes away with the container that caused it.
    <>
      {/* Sibling of Screen, not a child: nested in the ScrollView's content container the
          options never reach the navigator and the header stays bare. Explicit back button
          because the platform arrow is absent when this opens first (web reload). */}
      <Stack.Screen
        options={{
          headerLeft: () => (
            <HeaderBackButton label={t('common.back')} onPress={() => goBack('/today')} />
          ),
        }}
      />
      <Screen>
      <Text variant="display">{t('settings.title')}</Text>

      {/* The pregnancy. First because it is the only group whose rows change what every
          other screen SAYS: the DPA re-aims every task window, the birth date starts every
          post-birth deadline. Hidden in Pause: editing the DPA or announcing a birth is the
          exact pregnancy content §3.1 keeps off every Pause-reachable screen. */}
      {!paused && !bulle?.birthDate && (
        <View>
          <SectionHeader title={t('settings.sections.pregnancy')} />
          {/* Owner-only: correcting the DPA re-aims every window for everyone in the bulle.
              Announcing the birth below is NOT owner-only and must stay that way — the
              co-parent is often the one with a free hand. */}
          {isOwner && (
            <Row
              title={t('dueDate.edit')}
              subtitle={t('dueDate.editBody')}
              onPress={() => router.push('/due-date/edit')}
              chevron
            />
          )}
          <Row
            title={t('birth.announce')}
            subtitle={t('birth.announceBody')}
            onPress={() => router.push('/birth/new')}
            chevron
            divider={false}
          />
        </View>
      )}

      {/* Couple sync is free (§10), so this is never a gated group. */}
      {isOwner && (
        <View>
          <SectionHeader title={t('settings.sections.family')} />
          <Row
            title={t('settings.invite')}
            subtitle={t('settings.inviteBody')}
            onPress={() => router.push('/more/invite')}
            chevron
            divider={false}
          />
        </View>
      )}

      <View>
        <SectionHeader title={t('settings.sections.app')} />
        {SUPPORTED_LANGUAGES.map((lang) => (
          <Row
            key={lang}
            title={t(lang === 'fr' ? 'settings.languageFr' : 'settings.languageEn')}
            subtitle={language === lang ? t('settings.languageCurrent') : undefined}
            // Through the store, not i18n directly: the store persists the choice and
            // _layout applies it on boot. changeLanguage alone forgets by the next launch.
            onPress={() => void useSettingsStore.getState().setLanguage(lang)}
            // The tick marks the live one. A chevron here would promise a screen that does
            // not exist — tapping IS the choice.
            trailing={
              language === lang ? <Glyph name="check" size={20} color="sage" /> : undefined
            }
          />
        ))}

        <Row
          title={t('settings.notifications')}
          subtitle={t('settings.notificationsBody')}
          // The only native island on the screen. A toggle should feel like the OS's
          // toggle, and as a leaf it imposes nothing on its neighbours — which is exactly
          // why a native CONTAINER was the problem here and a native control is not.
          trailing={
            // seedColor on the Host, not a color prop on the Switch: Switch has none, and
            // the tint is the Host's job. Without it the toggle is the platform's default
            // blue on a screen with no blue in it.
            <Host matchContents seedColor={colors.sage}>
              <Switch
                value={notifications}
                onValueChange={(next) => void useSettingsStore.getState().setNotifications(next)}
              />
            </Host>
          }
          divider={false}
        />
      </View>

      {/* Owner-only, same reasoning as the due date above: this re-aims which administrative
          templates show up for everyone in the bulle, not just a device-local preference like
          language. Stays visible after birth too — post-birth admin tasks are country-gated
          the same way. */}
      {isOwner && (
        <View>
          <SectionHeader title={t('settings.sections.country')} />
          {SUPPORTED_COUNTRIES.map((c, index) => (
            <Row
              key={c.code}
              title={t(c.labelKey)}
              onPress={() => useBulleStore.getState().updateProfile({ country: c.code })}
              trailing={country === c.code ? <Glyph name="check" size={20} color="sage" /> : undefined}
              divider={index < SUPPORTED_COUNTRIES.length - 1}
            />
          ))}
        </View>
      )}

      {/* Switching bulles had no entry point at all before this: the transition route
          existed and was unreachable. Only with more than one, so a single-bulle user never
          sees a group for a concept they do not have. */}
      {bulles.length > 1 && (
        <View>
          <SectionHeader title={t('settings.sections.bulles')} />
          {bulles.map((entry, index) => (
            <Row
              key={entry.id}
              title={entry.label}
              subtitle={
                entry.id === registry?.activeBulleId ? t('settings.bulleActive') : undefined
              }
              onPress={() => router.push(`/bulle-switch?id=${entry.id}`)}
              chevron
              divider={index < bulles.length - 1}
            />
          ))}
        </View>
      )}

      {/* Premium had NO entry point outside a gate. Restore especially: with no account, a
          reinstall leaves restore as the only way back to a purchase, and a paying user
          should never have to hunt for a paywall to get their own product back. */}
      <View>
        <SectionHeader title={t('settings.sections.account')} />
        {isPremium ? (
          <Row title={t('settings.premiumActive')} subtitle={t('settings.premiumActiveBody')} />
        ) : (
          <Row
            title={t('settings.premium')}
            subtitle={t('settings.premiumBody')}
            onPress={() => router.push('/paywall')}
            chevron
          />
        )}
        <Row
          title={t('settings.restore')}
          subtitle={t('settings.restoreBody')}
          onPress={restore}
          chevron
          divider={false}
        />
      </View>

      {/* Pause is reachable in <=2 taps and deliberately NOT under a "danger zone" (§3.1).
          It sits with the legal line rather than at the bottom of a list of unrelated rows:
          someone reaching for it should not have to scan past "Restore purchases". */}
      <View>
        <SectionHeader title={t('settings.sections.quiet')} />
        <Row
          title={t('pause.enter')}
          subtitle={t('pause.enterBody')}
          onPress={() => router.push('/more/pause')}
          chevron
        />
        {/* The regulatory line (§7.3). No longer forced to be last to survive a lazy
            container's height fight — it is last because it belongs last. */}
        <Row title={t('settings.about')} subtitle={t('settings.aboutBody')} divider={false} />
      </View>
      </Screen>
    </>
  );
}
