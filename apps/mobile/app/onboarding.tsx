'use client';
/**
 * Onboarding (spec §5.12) — conversational, six exchanges, all skippable except the due date.
 *
 * There is NO account creation screen, because there are no accounts. The identity is a seed
 * phrase minted here and kept in the Keychain. That is the single biggest structural
 * difference from every competitor, and the reason the first card can say "nothing leaves
 * your phone" honestly.
 *
 * Design notes:
 *  - The orb opens the app. It is the identity, and §5.12 asks for it to inflate at the end;
 *    showing it (nearly empty, breathing) on the welcome screen makes that payoff land.
 *  - One question per screen, Fraunces for the question because a question is narrative,
 *    Inter for the answers because an answer is UI.
 *  - A hairline tracks progress. Not dots, not "3/6" — the same language as the fil.
 *  - Question 4 is phrased without clinical labels on purpose (§3.2): someone who has had a
 *    loss should not have to pick "high-risk" from a dropdown to be treated gently.
 */
import React, { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import Animated, { FadeIn, FadeInDown, useReducedMotion } from 'react-native-reanimated';
import { randomId, type BulleProfile, type Companionship } from '@bulle/sdk';
import { deviceCountry } from '@/i18n';
import { initStorage } from '@bulle/ui/utils/kv-storage';
import { BulleOrb, Glyph } from '@bulle/ui/primitives';
import { Button, Text } from '@bulle/ui/components';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { DueDatePicker, defaultDueDate } from '@/components/DueDatePicker';
import { OnboardingChoice } from '@/components/OnboardingChoice';
import { StepProgress } from '@/components/StepProgress';
import { BulleInflating } from '@/components/BulleInflating';
import { generatePassphrase } from '@/lib/identity';
import { useBulleRegistryStore } from '@/store/useBulleRegistryStore';
import { useBulleStore } from '@/store/useBulleStore';
import { useSettingsStore, type Concern } from '@/store/useSettingsStore';

type Step =
  | 'welcome'
  | 'dueDate'
  | 'firstBaby'
  | 'companionship'
  | 'profile'
  | 'concern'
  | 'notifications';

/** The questions, in order. `welcome` is not a question, so it carries no progress. */
const QUESTION_STEPS: Step[] = [
  'dueDate',
  'firstBaby',
  'companionship',
  'profile',
  'concern',
  'notifications',
];

/** Long-form date, in the user's language. Shown on the confirm button. */
function formatDueDate(date: Date, language: string): string {
  return new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export default function OnboardingScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { space, touch } = useBulleTheme();
  const reduced = useReducedMotion();

  const [step, setStep] = useState<Step>('welcome');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [firstBaby, setFirstBaby] = useState(true);
  const [companionship, setCompanionship] = useState<Companionship>('couple');
  const [flags, setFlags] = useState<Partial<BulleProfile>>({});
  const [concern, setConcern] = useState<Concern>('everything');
  const [creating, setCreating] = useState(false);

  /** One step back. Every answer is already in state, so returning re-shows the choice. */
  const goBack = () => {
    const index = QUESTION_STEPS.indexOf(step);
    setStep(index <= 0 ? 'welcome' : QUESTION_STEPS[index - 1]);
  };

  const profile = useMemo<BulleProfile | null>(
    () =>
      dueDate ? { dueDate: dueDate.toISOString(), firstBaby, companionship, ...flags } : null,
    [dueDate, firstBaby, companionship, flags],
  );

  const progress = useMemo(() => {
    const index = QUESTION_STEPS.indexOf(step);
    return index === -1 ? 0 : index / QUESTION_STEPS.length;
  }, [step]);

  const finish = async (resolvedFlags: Partial<BulleProfile> = flags) => {
    const finalDue = dueDate ?? defaultDueDate();
    setCreating(true);

    // The seed IS the identity. Minted here, stored in the Keychain, never sent anywhere.
    const seedPhrase = generatePassphrase();
    const entry = await useBulleRegistryStore.getState().createBulle({
      label: t('common.appName'),
      seedPhrase,
      role: 'owner',
    });

    /**
     * Open the new bulle's storage BEFORE writing to it.
     *
     * `persist()` in the stores is guarded by `if (getStorage())` and silently does nothing
     * when storage is not open yet. DatabaseProvider opens it in an effect, i.e. after this
     * function returns, so the very first write of a bulle's life was dropped on the floor
     * and then the hydrate replaced the in-memory copy with the nothing it found on disk.
     * On web that was fatal and total: onboarding completed, landed on /today, and rendered
     * an empty app with no error anywhere.
     *
     * initStorage is idempotent, so DatabaseProvider re-opening the same file after this
     * costs a re-read and changes nothing.
     */
    await initStorage(entry.dbFileName);

    const nowIso = new Date().toISOString();
    useBulleStore.getState().saveBulle({
      id: entry.id,
      name: t('common.appName'),
      profile: {
        dueDate: finalDue.toISOString(),
        firstBaby,
        companionship,
        // Stamped once, from the device region. Country decides WHICH institutions apply
        // (see templatesFor); the language only decides which words describe them.
        country: deviceCountry(),
        ...resolvedFlags,
      },
      pause: { paused: false },
      createdAt: nowIso,
      updatedAt: nowIso,
    });

    // The concern orders which templates Préparer proposes first. Device-local: it is a
    // first-run preference, not something the co-parent should inherit.
    void useSettingsStore.getState().setConcern(concern);

    // Let the orb finish inflating before handing over. The wait is real work (Argon2id),
    // so this is showing what is happening, not padding.
    setTimeout(() => router.replace('/today'), reduced ? 0 : 1400);
  };

  if (creating) {
    return (
      <Screen center scroll={false}>
        <BulleInflating label={t('onboarding.creating')} />
      </Screen>
    );
  }

  // ─── Welcome ───────────────────────────────────────────────────────────────
  if (step === 'welcome') {
    return (
      <Screen center scroll={false}>
        <View style={{ alignItems: 'center', gap: space[6] }}>
          <Animated.View entering={reduced ? undefined : FadeIn.duration(600)}>
            {/* Nearly empty, already breathing. Nothing is prepared yet, and the orb
                says so honestly before a single word does. */}
            <BulleOrb fill={0.06} trimesterProgress={0} size={168} label={t('common.tagline')} />
          </Animated.View>

          <Animated.View
            entering={reduced ? undefined : FadeInDown.delay(150).duration(450)}
            style={{ alignItems: 'center', gap: space[3] }}
          >
            <Text variant="display">{t('onboarding.welcomeTitle')}</Text>
            <Text variant="body" color="inkSoft" style={{ textAlign: 'center' }}>
              {t('onboarding.welcomeBody')}
            </Text>
          </Animated.View>

          <Animated.View
            entering={reduced ? undefined : FadeInDown.delay(260).duration(450)}
            style={{ alignSelf: 'stretch', gap: space[4] }}
          >
            <Button label={t('onboarding.start')} onPress={() => setStep('dueDate')} block />
            <Text variant="caption" style={{ textAlign: 'center' }}>
              {t('onboarding.privacyNote')}
            </Text>
          </Animated.View>
        </View>
      </Screen>
    );
  }

  // ─── Questions ─────────────────────────────────────────────────────────────
  return (
    <Screen>
      <View style={{ gap: space[6] }}>
        {/* Back before progress: a six-question flow with no way back is a trap, and the
            due-date step in particular is easy to tap past. Every answer lives in state, so
            returning simply re-shows it. */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: space[3] }}>
          <Pressable
            onPress={goBack}
            accessibilityRole="button"
            accessibilityLabel={t('common.back')}
            hitSlop={touch.min / 2}
          >
            <Glyph name="chevronLeft" size={20} color="inkSoft" />
          </Pressable>
          <View style={{ flex: 1 }}>
            <StepProgress progress={progress} />
          </View>
        </View>

        {step === 'dueDate' && (
          <View style={{ gap: space[5] }}>
            <Question text={t('onboarding.dueDateQuestion')} />
            <DueDatePicker value={dueDate ?? defaultDueDate()} onChange={setDueDate} />
            <Text variant="caption">{t('onboarding.dueDateHelp')}</Text>
            {/*
              The button states the date rather than saying "Continue".
              The picker opens on a plausible default, so a generic Continue would let
              someone tap straight past it and silently adopt a due date that is months
              wrong, which then poisons every week window, the Journey and the readiness.
              Naming the date makes accepting it an informed act instead of a reflex.
            */}
            <Button
              label={t('onboarding.dueDateConfirm', {
                date: formatDueDate(dueDate ?? defaultDueDate(), i18n.language),
              })}
              onPress={() => {
                setDueDate((current) => current ?? defaultDueDate());
                setStep('firstBaby');
              }}
              block
            />
          </View>
        )}

        {step === 'firstBaby' && (
          <View style={{ gap: space[4] }}>
            <Question text={t('onboarding.firstBabyQuestion')} />
            <View>
              <OnboardingChoice
                index={0}
                label={t('onboarding.yes')}
                onPress={() => {
                  setFirstBaby(true);
                  setStep('companionship');
                }}
              />
              <OnboardingChoice
                index={1}
                last
                label={t('onboarding.no')}
                onPress={() => {
                  setFirstBaby(false);
                  setStep('companionship');
                }}
              />
            </View>
          </View>
        )}

        {step === 'companionship' && (
          <View style={{ gap: space[4] }}>
            <Question text={t('onboarding.companionshipQuestion')} />
            <View>
              <OnboardingChoice
                index={0}
                label={t('onboarding.companionshipCouple')}
                onPress={() => {
                  setCompanionship('couple');
                  setStep('profile');
                }}
              />
              {/* "Just me" is an EQUAL option, not a fallback (§3.2). */}
              <OnboardingChoice
                index={1}
                last
                label={t('onboarding.companionshipSolo')}
                onPress={() => {
                  setCompanionship('solo');
                  setStep('profile');
                }}
              />
            </View>
          </View>
        )}

        {step === 'profile' && (
          <View style={{ gap: space[4] }}>
            <Question text={t('onboarding.profileQuestion')} />
            <View>
              {(
                [
                  ['profileNone', {}],
                  ['profileMultiples', { multiples: true }],
                  ['profileGentle', { gentle: true }],
                  ['profileSensitive', { sensitive: true }],
                ] as [string, Partial<BulleProfile>][]
              ).map(([key, value], index, all) => (
                <OnboardingChoice
                  key={key}
                  index={index}
                  last={index === all.length - 1}
                  label={t(`onboarding.${key}`)}
                  onPress={() => {
                    setFlags(value);
                    setStep('concern');
                  }}
                />
              ))}
            </View>
          </View>
        )}

        {step === 'concern' && (
          <View style={{ gap: space[4] }}>
            <Question text={t('onboarding.concernQuestion')} />
            <View>
              {(
                [
                  ['concernOrganisation', 'organisation'],
                  ['concernShopping', 'shopping'],
                  ['concernAdmin', 'admin'],
                  ['concernEverything', 'everything'],
                ] as [string, Concern][]
              ).map(([key, value], index, all) => (
                <OnboardingChoice
                  key={key}
                  index={index}
                  last={index === all.length - 1}
                  label={t(`onboarding.${key}`)}
                  onPress={() => {
                    setConcern(value);
                    setStep('notifications');
                  }}
                />
              ))}
            </View>
          </View>
        )}

        {step === 'notifications' && (
          <View style={{ gap: space[4] }}>
            <Question text={t('onboarding.notificationsQuestion')} />
            <View>
              <OnboardingChoice
                index={0}
                label={t('onboarding.notificationsYes')}
                onPress={() => void finish()}
              />
              <OnboardingChoice
                index={1}
                last
                label={t('onboarding.notificationsNo')}
                onPress={() => void finish()}
              />
            </View>
          </View>
        )}
      </View>
    </Screen>
  );
}

/** Questions are narrative, so they get Fraunces. Answers are UI, so they get Inter. */
function Question({ text }: { text: string }) {
  const reduced = useReducedMotion();
  return (
    <Animated.View entering={reduced ? undefined : FadeInDown.duration(400)}>
      <Text variant="titleXL">{text}</Text>
    </Animated.View>
  );
}
