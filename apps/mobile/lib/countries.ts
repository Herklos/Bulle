/**
 * Countries the settings switcher offers, and the only ones `deviceCountry()` (i18n/index.ts)
 * trusts an automatic region read for.
 *
 * Not an exhaustive country list on purpose — see `@bulle/sdk`'s templateAppliesInCountry:
 * FR is the only country with its own administrative templates, so these are the francophone
 * markets the SDK already reasons about by name. A device region outside this set (a fresh
 * simulator's default "US", a traveller abroad) falls back to FR rather than being stamped
 * onto the profile as a country nothing in the app — including this switcher — recognizes.
 */
export const SUPPORTED_COUNTRIES: { code: string; labelKey: string }[] = [
  { code: 'FR', labelKey: 'settings.countryFr' },
  { code: 'BE', labelKey: 'settings.countryBe' },
  { code: 'CH', labelKey: 'settings.countryCh' },
  { code: 'CA', labelKey: 'settings.countryCa' },
];

export const SUPPORTED_COUNTRY_CODES: readonly string[] = SUPPORTED_COUNTRIES.map((c) => c.code);
