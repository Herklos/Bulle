/**
 * i18n. FR is the default and the design language; EN is a full second locale minus the
 * French administrative module (spec §7.1).
 *
 * `compatibilityJSON: 'v4'` + i18next's plural suffixes give `plan.ideas_one/_other` for
 * free, which matters because French and English pluralise differently at zero.
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
// No `.js` suffix here: the app uses bundler resolution, unlike packages/* which are
// NodeNext and need the extension (metro strips it for them — see metro.config.js).
import { DEFAULT_COUNTRY } from '@bulle/sdk';
import { fr } from './fr';
import { en } from './en';

export const SUPPORTED_LANGUAGES = ['fr', 'en'] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = 'fr';

export function isSupportedLanguage(value: string | undefined | null): value is Language {
  return !!value && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

/** The device's language if we support it, else FR. */
export function deviceLanguage(): Language {
  const tag = getLocales()[0]?.languageCode ?? undefined;
  return isSupportedLanguage(tag) ? tag : DEFAULT_LANGUAGE;
}

/**
 * The device's COUNTRY (ISO 3166-1 alpha-2), which is a different question from its
 * language and must not be derived from it.
 *
 * This is what decides whether the French administrative module applies. Reading it off the
 * language would hand the CAF and the 5-day mairie deadline to a French speaker in
 * Brussels, Geneva or Montréal, where none of it is true. `regionCode` is the device's
 * actual region, so fr-BE resolves to BE and en-FR resolves to FR, which are both the right
 * answers.
 *
 * Falls back to the launch market. A wrong guess is recoverable (the profile is editable);
 * having no country at all is not, because every template filter would then open.
 */
export function deviceCountry(): string {
  return getLocales()[0]?.regionCode?.toUpperCase() || DEFAULT_COUNTRY;
}

let initialised = false;

export function initI18n(language: Language = deviceLanguage()) {
  if (initialised) {
    if (i18n.language !== language) void i18n.changeLanguage(language);
    return i18n;
  }

  void i18n.use(initReactI18next).init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    lng: language,
    fallbackLng: DEFAULT_LANGUAGE,
    defaultNS: 'translation',
    interpolation: {
      // React already escapes. Double-escaping mangles apostrophes, which French is full of.
      escapeValue: false,
    },
    returnNull: false,
  });

  initialised = true;
  return i18n;
}

/**
 * A dedicated i18n INSTANCE per locale, for the marketing site.
 *
 * The static export renders `/fr` and `/en` in the same process. Calling
 * `changeLanguage()` on the shared singleton to render each would race: whichever finished
 * last would win, and one locale would be exported in the other's language. A cloned
 * instance per locale sidesteps that entirely, and costs one object.
 */
const _langInstances = new Map<Language, typeof i18n>();

export function getI18nForLang(language: Language): typeof i18n {
  const existing = _langInstances.get(language);
  if (existing) return existing;

  const instance = i18n.cloneInstance({ lng: language, initImmediate: false });
  _langInstances.set(language, instance);
  return instance;
}

export { i18n };
