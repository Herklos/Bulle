/**
 * RevenueCat wiring.
 *
 * Native only. On web `react-native-purchases` has no implementation, so every function
 * here degrades to "not premium" rather than throwing — the web build is a companion and
 * must not crash because it cannot sell anything.
 *
 * The public SDK key is safe in client code. The SECRET key must never appear here.
 */
import { Platform } from 'react-native';
import type { CustomerInfo, PurchasesOffering } from 'react-native-purchases';
import { PREMIUM_ENTITLEMENT, PREMIUM_OFFERING } from './premium';

/**
 * Public SDK key. Currently the RevenueCat **Test Store** key, because Bulle is not yet in
 * App Store Connect or Play Console. Swap for the appl_… / goog_… keys once the store-side
 * apps exist; the entitlement identifier does not change.
 */
const API_KEY = process.env.EXPO_PUBLIC_REVENUECAT_KEY ?? 'test_dUUNyHfuSwVAdxDUZvCjiphyaVb';

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
