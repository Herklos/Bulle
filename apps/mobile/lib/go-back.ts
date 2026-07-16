'use client';
/**
 * Going back, when there may be nothing to go back to.
 *
 * `router.back()` is a NO-OP with an empty history stack, and it fails exactly where it
 * matters: the screen renders, the button is there, tapping it does nothing, and the user is
 * stuck with no way out but killing the app. It happens whenever a screen is the first thing
 * in the stack rather than something pushed onto it:
 *
 *  - a deep link or a notification opening straight into /memory/new
 *  - a web reload on a pushed route, which starts a fresh history at that URL
 *  - a stack that was reset underneath (a bulle switch, a Pause redirect)
 *
 * None of those are exotic; the web one happens every time someone hits refresh.
 *
 * So: go back if there IS a back, otherwise go somewhere sensible. The fallback is the
 * point. `dismissTo` would still no-op on an empty stack, and `replace` alone would throw
 * away a real history the user expects.
 */
import { useEffect } from 'react';
import { BackHandler, Platform } from 'react-native';
import { router } from 'expo-router';

/** Where a screen lands when it has no history. Almost always the tab it belongs to. */
export type BackFallback = '/today' | '/plan' | '/journey' | '/memories' | '/more';

/**
 * Back, or the fallback. Never a no-op.
 *
 * Defaults to /today: it is the home of the app and the one route that is always valid, so a
 * screen with nothing better to say still leaves the user somewhere real.
 */
export function goBack(fallback: BackFallback = '/today'): void {
  if (router.canGoBack()) {
    router.back();
    return;
  }
  // `replace`, not `push`: this screen is a dead end, and leaving it on the stack would let
  // a second back press return to the very screen the user is escaping.
  router.replace(fallback as never);
}

/**
 * Android's hardware/gesture back, which is a THIRD path with the same dead end.
 *
 * The navigator handles it, and on an empty stack its handler declines, so the OS default
 * runs and backgrounds the app. From a deep link into /memory/new that means the only way
 * "back" is out of Bulle entirely, losing whatever was being written.
 *
 * Returning true claims the event; goBack then guarantees somewhere to land.
 */
export function useHardwareBack(fallback: BackFallback = '/today', onBack?: () => boolean): void {
  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      // A multi-step screen gets first refusal: on step 2 of "write a souvenir", back means
      // the kind step, not out of the flow. Leaving without this would silently bin the
      // draft, which is a worse bug than the dead end it replaces.
      if (onBack?.()) return true;
      goBack(fallback);
      return true;
    });
    return () => sub.remove();
  }, [fallback, onBack]);
}
