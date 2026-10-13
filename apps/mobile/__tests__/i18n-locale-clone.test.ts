/**
 * Marketing pages render `/fr` and `/en` in one process, so each locale gets its own
 * i18next instance. `t()` has to work on the same turn the clone is created: the static
 * export does not wait for an init callback. A miss returns the key itself.
 */
import { describe, expect, it, vi } from 'vitest';

// i18n/index.ts imports expo-localization, whose native entry pulls Flow-typed
// react-native that the node runner cannot parse. This test never reads the device.
vi.mock('expo-localization', () => ({
  getLocales: () => [{ languageCode: 'fr', regionCode: 'FR' }],
}));

import { en } from '@/i18n/en';
import { fr } from '@/i18n/fr';
import { getI18nForLang, initI18n } from '@/i18n';

describe('getI18nForLang', () => {
  it('translates each locale immediately, on its own instance', () => {
    initI18n('fr');

    const english = getI18nForLang('en');
    const french = getI18nForLang('fr');

    expect(english).not.toBe(french);
    expect(english.t('common.tagline')).toBe(en.common.tagline);
    expect(french.t('common.tagline')).toBe(fr.common.tagline);
    expect(english.t('common.tagline')).not.toBe('common.tagline');
  });
});
