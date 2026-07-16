/**
 * Device settings. Global, NOT per-bulle, and never synced.
 *
 * Language belongs here rather than in the bulle: it is a property of this device and this
 * reader. Two co-parents sharing a bulle may well read in different languages, and syncing
 * the choice would have one of them silently change the other's app.
 *
 * Stored via secure-store's wrapper (localStorage on web, Keychain on native) because it
 * must survive with no bulle open — the language is needed on the onboarding screen, before
 * any bulle exists.
 */
import { create } from 'zustand';
import { secureGet, secureSet } from '@bulle/ui/utils/secure-store';
import { DEFAULT_LANGUAGE, deviceLanguage, isSupportedLanguage, type Language } from '@/i18n';

const LANGUAGE_KEY = 'bulle_language';

interface SettingsState {
  language: Language;
  isLoaded: boolean;
  load: () => Promise<void>;
  setLanguage: (language: Language) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  language: DEFAULT_LANGUAGE,
  isLoaded: false,

  load: async () => {
    const stored = await secureGet(LANGUAGE_KEY);
    // No stored choice → follow the device. An explicit choice always wins over it.
    set({ language: isSupportedLanguage(stored) ? stored : deviceLanguage(), isLoaded: true });
  },

  setLanguage: async (language) => {
    set({ language });
    await secureSet(LANGUAGE_KEY, language);
  },
}));
