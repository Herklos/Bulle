'use client';
/**
 * Plus (spec §4.1).
 *
 * Built from @expo/ui's FieldGroup/ListItem/Switch: a REAL SwiftUI `Form` on iOS and a real
 * Material 3 grouped list on Android — not a JS approximation of one. A settings screen is
 * where platform conventions are strongest and where a hand-rolled list is most obviously
 * wrong: people know what their own OS's settings feel like.
 *
 * FieldGroup, not List, and the difference is the whole screen. `List` is one flat run of
 * rows, so invite, language, notifications, premium, Pause and the legal line all sat at the
 * same level with nothing to say they are different KINDS of thing — a wall of rows the eye
 * has to read linearly because nothing groups it. A settings screen is a form, and `Form` is
 * the control the platforms ship for exactly this. Sections give it the grouping for free,
 * in each platform's own idiom (inset groups on iOS, the M3 connected list on Android),
 * which is precisely the thing a hand-rolled version gets subtly wrong.
 *
 * The sections are ordered by how often they are wanted, not by importance: the pregnancy
 * itself, then the people in it, then the app, then the account, then the quiet exits.
 *
 * LAYOUT CONSTRAINT, learned the hard way and unchanged by the swap: this is a Compose lazy
 * container on Android. It must own its scrolling and be measured with a BOUNDED height, so:
 *   - the screen does NOT scroll (`Screen scroll={false}`) — a lazy list inside a ScrollView
 *     hands it infinite height,
 *   - and the Host must NOT use `matchContents`, which does the same.
 * Get either wrong and it is not a layout glitch, it is a hard native crash:
 * "Vertically scrollable component was measured with an infinity maximum height constraints".
 *
 * Every row must be a native @expo/ui child. On Android the container builds each row with
 * `getChildAt(index) as? ExpoComposeView ?: continue`, so a plain RN <View> is not merely
 * unstyled — it is SKIPPED, and the row vanishes on Android while looking fine on iOS.
 *
 * Everything sits inside ONE Host. That is the point of the host bridge: without it each
 * control opens its own native bridge and the screen costs a dozen of them.
 *
 * Family MANAGEMENT lives here rather than in its own tab (a tab must earn daily taps, and
 * "manage members" does not). Pause is reachable in ≤2 taps from here (§3.1) and is
 * deliberately not buried under a "danger zone".
 */
import React from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { FieldGroup, Host, ListItem, Switch } from '@expo/ui';
import { Text } from '@bulle/ui/components';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { usePermissions } from '@/lib/permissions/usePermissions';
import { useSettingsStore } from '@/store/useSettingsStore';
import { usePremiumStore } from '@/store/usePremiumStore';
import { useBulleStore } from '@/store/useBulleStore';
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
  const isPremium = usePremiumStore((s) => s.isPremium);
  const bulle = useBulleStore((s) => s.bulle);

  const bulles = registry?.bulles ?? [];

  // Says something either way. A restore that silently does nothing reads as a broken
  // button, and the user has no way to tell "nothing to restore" from "it failed".
  const restore = async () => {
    const ok = await usePremiumStore.getState().restore();
    Alert.alert(t(ok ? 'settings.restoreDone' : 'settings.restoreEmpty'));
  };

  return (
    <Screen scroll={false}>
      <Text variant="display">{t('settings.title')}</Text>

      {/*
        One Host wrapping every native control. `seedColor` is sage so the Switch and the
        list's selection tint pick up the palette rather than the platform's default blue.

        `flex: 1` and NO `matchContents` — see the layout constraint in the header.
      */}
      <Host style={{ flex: 1 }} seedColor={colors.sage}>
        <FieldGroup>
          {/* The pregnancy itself. First because it is the only group whose rows change what
              every other screen SAYS — the DPA re-aims every task window, the birth date
              starts every post-birth deadline. */}
          {!bulle?.birthDate && (
            <FieldGroup.Section title={t('settings.sections.pregnancy')}>
              {/* Owner-only: correcting the DPA re-aims every task window for everyone in
                  the bulle, which is not a guest's call. Announcing the birth below is NOT
                  owner-only and must stay that way — the co-parent is often the one with a
                  free hand, and gating it would be a regression. */}
              {isOwner && (
                <ListItem
                  onPress={() => router.push('/due-date/edit')}
                  supportingText={t('dueDate.editBody')}
                >
                  {t('dueDate.edit')}
                </ListItem>
              )}

              {/* Recording the birth is what starts every post-birth deadline (see
                  domain/postnatal.ts). The whole section disappears with it: a bulle has one
                  birth, and leaving the control there invites re-announcing it. */}
              <ListItem
                onPress={() => router.push('/birth/new')}
                supportingText={t('birth.announceBody')}
              >
                {t('birth.announce')}
              </ListItem>
            </FieldGroup.Section>
          )}

          {/* The people in it. Couple sync is free (§10), so this is never a gated group. */}
          {isOwner && (
            <FieldGroup.Section title={t('settings.sections.family')}>
              <ListItem
                onPress={() => router.push('/more/invite')}
                supportingText={t('settings.inviteBody')}
              >
                {t('settings.invite')}
              </ListItem>
            </FieldGroup.Section>
          )}

          <FieldGroup.Section title={t('settings.sections.app')}>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <ListItem
                key={lang}
                // Goes through the store, not i18n directly: the store persists the choice
                // and _layout applies it on boot. changeLanguage alone forgets by the next
                // launch.
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
          </FieldGroup.Section>

          {/* Switching bulles had no entry point at all before this: the transition route
              existed and was unreachable. Only with more than one, so a single-bulle user
              never sees a section for a concept they do not have. */}
          {bulles.length > 1 && (
            <FieldGroup.Section title={t('settings.sections.bulles')}>
              {bulles.map((entry) => (
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
            </FieldGroup.Section>
          )}

          {/* Premium had NO entry point outside a gate. Restore especially: both stores
              require it to be reachable, and with no account a reinstall leaves restore as
              the only way back to a purchase — a paying user should never have to go hunting
              for a paywall to get their own product back. */}
          <FieldGroup.Section title={t('settings.sections.account')}>
            {isPremium ? (
              <ListItem supportingText={t('settings.premiumActiveBody')}>
                {t('settings.premiumActive')}
              </ListItem>
            ) : (
              <ListItem
                onPress={() => router.push('/paywall')}
                supportingText={t('settings.premiumBody')}
              >
                {t('settings.premium')}
              </ListItem>
            )}

            <ListItem onPress={restore} supportingText={t('settings.restoreBody')}>
              {t('settings.restore')}
            </ListItem>
          </FieldGroup.Section>

          {/* Pause is reachable in <=2 taps and is deliberately NOT under a "danger zone"
              (§3.1). It sits in its own quiet section with the legal line rather than at the
              bottom of a list of unrelated rows: someone reaching for it should not have to
              scan past "Restore purchases" to find it.

              The regulatory line (§7.3) is the LAST row rather than a block beneath the
              container. Anything rendered below a lazy container competes with it for height
              and clips it — and this line has to be reachable, not cut off. */}
          <FieldGroup.Section title={t('settings.sections.quiet')}>
            <ListItem onPress={() => router.push('/more/pause')} supportingText={t('pause.enterBody')}>
              {t('pause.enter')}
            </ListItem>

            <ListItem supportingText={t('settings.aboutBody')}>{t('settings.about')}</ListItem>
          </FieldGroup.Section>
        </FieldGroup>
      </Host>
    </Screen>
  );
}
