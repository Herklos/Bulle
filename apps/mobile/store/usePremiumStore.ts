/**
 * Premium state.
 *
 * Session-only and NOT persisted: RevenueCat's CustomerInfo is the source of truth, it is
 * cached by the SDK, and duplicating it into our own storage is how you end up with a
 * user who is premium in one place and not the other.
 *
 * Defaults to FALSE and stays false on every error path. That direction is deliberate: the
 * failure mode is "a paying user briefly sees a paywall", which a restore fixes in one tap.
 * The opposite default would hand the product away on any network hiccup.
 */
import { create } from 'zustand';
import type { CustomerInfo } from 'react-native-purchases';
import { getCustomerInfo, hasPremium, purchasePremium, restorePremium } from '@/lib/revenuecat';

interface PremiumState {
  isPremium: boolean;
  isLoaded: boolean;
  purchasing: boolean;
  refresh: () => Promise<void>;
  purchase: () => Promise<{ ok: boolean; cancelled: boolean }>;
  restore: () => Promise<boolean>;
  /** Test seam + the RevenueCat listener. */
  applyCustomerInfo: (info: CustomerInfo | null) => void;
}

export const usePremiumStore = create<PremiumState>((set) => ({
  isPremium: false,
  isLoaded: false,
  purchasing: false,

  applyCustomerInfo: (info) => set({ isPremium: hasPremium(info), isLoaded: true }),

  refresh: async () => {
    const info = await getCustomerInfo();
    set({ isPremium: hasPremium(info), isLoaded: true });
  },

  purchase: async () => {
    set({ purchasing: true });
    try {
      const { info, cancelled } = await purchasePremium();
      const ok = hasPremium(info);
      if (ok) set({ isPremium: true });
      return { ok, cancelled };
    } finally {
      set({ purchasing: false });
    }
  },

  restore: async () => {
    const info = await restorePremium();
    const ok = hasPremium(info);
    set({ isPremium: ok });
    return ok;
  },
}));
