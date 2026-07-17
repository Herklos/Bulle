/**
 * RevenueCat wiring.
 *
 * Native only. On web `react-native-purchases` has no implementation, so every function
 * here degrades to "not premium" rather than throwing — the web build is a companion and
 * must not crash because it cannot sell anything.
 *
 * The public SDK key is safe in client code. The SECRET key must never appear here.
 */
import { Linking, Platform } from 'react-native';
import type { CustomerInfo, PurchasesOffering } from 'react-native-purchases';
import { PREMIUM_ENTITLEMENT, PREMIUM_OFFERING } from './premium';

/**
 * Public SDK key, one per store — RevenueCat issues a distinct key per platform app
 * (`appl_…` / `goog_…` / the Web Billing key), unlike the single Test Store key this
 * replaced. Falls back to the Test Store key when a platform's env var isn't set (e.g. local
 * `expo start` without `EXPO_PUBLIC_REVENUECAT_KEY_*` configured).
 */
const FALLBACK_API_KEY = 'test_dUUNyHfuSwVAdxDUZvCjiphyaVb';

const API_KEY =
  Platform.select({
    ios: process.env.EXPO_PUBLIC_REVENUECAT_KEY_IOS,
    android: process.env.EXPO_PUBLIC_REVENUECAT_KEY_ANDROID,
    web: process.env.EXPO_PUBLIC_REVENUECAT_KEY_WEB,
  }) ?? FALLBACK_API_KEY;

let configured = false;

function available(): boolean {
  return Platform.OS !== 'web';
}

/**
 * Configure once, as early as possible.
 *
 * Deliberately NOT passing an appUserID: Bulle has no accounts, so RevenueCat's anonymous
 * id is exactly right. Tying the purchase to the seed-derived userId would be worse — the
 * seed is the one secret we never want leaving the device, and a purchase does not need to
 * know who you are.
 */
export async function configurePurchases(): Promise<void> {
  if (!available() || configured) return;
  try {
    const Purchases = (await import('react-native-purchases')).default;
    const { LOG_LEVEL } = await import('react-native-purchases');

    /*
      The JS module imports fine even when the native side is absent — every method is then
      a call on a null bridge, and the first one (`setLogLevel`) throws
      "Cannot read property 'setLogLevel' of null" from deep inside the vendor bundle. That
      stack names nothing actionable, so check first and say the real thing: the native
      module is missing, which means the dependency was added after the last native build
      and autolinking has not seen it. `npx expo run:android` (or `run:ios`) fixes it; a
      Metro reload never will.
    */
    if (typeof Purchases?.setLogLevel !== 'function') {
      console.warn(
        '[revenuecat] native module missing — rebuild the app (npx expo run:android / run:ios). ' +
          'Continuing without purchases.',
      );
      return;
    }

    if (__DEV__) await Purchases.setLogLevel(LOG_LEVEL.DEBUG);
    await Purchases.configure({ apiKey: API_KEY });
    configured = true;
  } catch (error) {
    // A purchase system that fails to boot must never take the app with it. Everything
    // downstream reads "not premium", which is the safe direction: the user keeps the free
    // product rather than seeing a crash.
    console.warn('[revenuecat] configure failed; continuing without purchases', error);
  }
}

export function hasPremium(info: CustomerInfo | null): boolean {
  return !!info?.entitlements.active[PREMIUM_ENTITLEMENT];
}

export async function getCustomerInfo(): Promise<CustomerInfo | null> {
  if (!available() || !configured) return null;
  try {
    const Purchases = (await import('react-native-purchases')).default;
    return await Purchases.getCustomerInfo();
  } catch {
    return null;
  }
}

export async function getOffering(): Promise<PurchasesOffering | null> {
  if (!available() || !configured) return null;
  try {
    const Purchases = (await import('react-native-purchases')).default;
    const offerings = await Purchases.getOfferings();
    return offerings.all[PREMIUM_OFFERING] ?? offerings.current ?? null;
  } catch (error) {
    console.warn('[revenuecat] getOfferings failed', error);
    return null;
  }
}

export interface PurchaseResult {
  info: CustomerInfo | null;
  /** True when the user backed out. NOT an error — never show them one. */
  cancelled: boolean;
}

/** Buy the lifetime package. */
export async function purchasePremium(): Promise<PurchaseResult> {
  if (!available() || !configured) return { info: null, cancelled: false };
  try {
    const Purchases = (await import('react-native-purchases')).default;
    const offering = await getOffering();
    const pkg = offering?.lifetime ?? offering?.availablePackages[0];
    if (!pkg) return { info: null, cancelled: false };
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    return { info: customerInfo, cancelled: false };
  } catch (error) {
    // userCancelled is a normal outcome of a paywall, not a failure. Surfacing an error
    // toast for it is the classic way to make a paywall feel like a trap.
    const cancelled = (error as { userCancelled?: boolean })?.userCancelled === true;
    if (!cancelled) console.warn('[revenuecat] purchase failed', error);
    return { info: null, cancelled };
  }
}

/**
 * Redeem a promo/offer code.
 *
 * iOS only has a real in-app path: `presentCodeRedemptionSheet()` opens StoreKit's native
 * sheet. Android's Play Billing Library has no equivalent call — Play redeems codes through
 * its own Store UI, not the purchasing app — so this opens Play's redeem page instead. Not
 * app-specific, but it is the only in-app-triggerable entry point that exists.
 */
export async function redeemPromoCode(): Promise<void> {
  if (Platform.OS === 'ios') {
    if (!available()) return;
    try {
      const Purchases = (await import('react-native-purchases')).default;
      await Purchases.presentCodeRedemptionSheet();
    } catch (error) {
      console.warn('[revenuecat] code redemption sheet failed', error);
    }
    return;
  }
  if (Platform.OS === 'android') {
    await Linking.openURL('https://play.google.com/redeem');
  }
}

/**
 * Restore. Legally required by both stores for a non-consumable, and practically required
 * here: with no account, reinstalling is the ONLY way back to a purchase.
 */
export async function restorePremium(): Promise<CustomerInfo | null> {
  if (!available() || !configured) return null;
  try {
    const Purchases = (await import('react-native-purchases')).default;
    return await Purchases.restorePurchases();
  } catch (error) {
    console.warn('[revenuecat] restore failed', error);
    return null;
  }
}
