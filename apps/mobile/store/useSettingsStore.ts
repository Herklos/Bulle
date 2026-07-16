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
const CONCERN_KEY = 'bulle_concern';

/** §5.12 q5. Orders which templates Préparer proposes first; gates nothing. */
export type Concern = 'organisation' | 'shopping' | 'admin' | 'everything';

const CONCERNS: Concern[] = ['organisation', 'shopping', 'admin', 'everything'];

interface SettingsState {
  language: Language;
  concern: Concern;
  isLoaded: boolean;
  load: () => Promise<void>;
  setLanguage: (language: Language) => Promise<void>;
  setConcern: (concern: Concern) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  language: DEFAULT_LANGUAGE,
  concern: 'everything',
  isLoaded: false,

  load: async () => {
    const [stored, concern] = await Promise.all([secureGet(LANGUAGE_KEY), secureGet(CONCERN_KEY)]);
    set({
      // No stored choice → follow the device. An explicit choice always wins over it.
      language: isSupportedLanguage(stored) ? stored : deviceLanguage(),
      concern: CONCERNS.includes(concern as Concern) ? (concern as Concern) : 'everything',
      isLoaded: true,
    });
  },

  setLanguage: async (language) => {
    set({ language });
    await secureSet(LANGUAGE_KEY, language);
  },

  setConcern: async (concern) => {
    set({ concern });
    await secureSet(CONCERN_KEY, concern);
  },
}));
