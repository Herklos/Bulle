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
const NOTIFICATIONS_KEY = 'bulle_notifications';

/** §5.12 q5. Orders which templates Préparer proposes first; gates nothing. */
export type Concern = 'organisation' | 'shopping' | 'admin' | 'everything';

const CONCERNS: Concern[] = ['organisation', 'shopping', 'admin', 'everything'];

interface SettingsState {
  language: Language;
  concern: Concern;
  /**
   * The morning digest (§5.11). ONE push per day, maximum, and that cap is a product rule
   * rather than a preference — there is deliberately no control here to ask for more.
   * Off unless the user opted in at onboarding.
   */
  notifications: boolean;
  isLoaded: boolean;
  load: () => Promise<void>;
  setLanguage: (language: Language) => Promise<void>;
  setConcern: (concern: Concern) => Promise<void>;
  setNotifications: (enabled: boolean) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  language: DEFAULT_LANGUAGE,
  concern: 'everything',
  notifications: false,
  isLoaded: false,

  load: async () => {
    const [stored, concern, notifications] = await Promise.all([
      secureGet(LANGUAGE_KEY),
      secureGet(CONCERN_KEY),
      secureGet(NOTIFICATIONS_KEY),
    ]);
    set({
      // No stored choice → follow the device. An explicit choice always wins over it.
      language: isSupportedLanguage(stored) ? stored : deviceLanguage(),
      concern: CONCERNS.includes(concern as Concern) ? (concern as Concern) : 'everything',
      notifications: notifications === 'true',
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

  /**
   * Turning notifications OFF purges the schedule rather than muting it — the same rule as
   * Pause mode (§3.1), for the same reason: a muted schedule still fires. Someone who turns
   * these off has said they do not want to be reminded, and a "Semaine 24" notification
   * arriving anyway is exactly the failure this product cannot afford.
   */
  setNotifications: async (enabled) => {
    set({ notifications: enabled });
    await secureSet(NOTIFICATIONS_KEY, String(enabled));
    if (!enabled) {
      try {
        const Notifications = await import('expo-notifications');
        await Notifications.cancelAllScheduledNotificationsAsync();
      } catch {
        // Web, or notifications never configured — nothing was scheduled.
      }
    }
  },
}));
