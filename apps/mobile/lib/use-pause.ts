/**
 * Pause mode (spec §3.1) — a first-class design pillar, not a setting.
 *
 * When paused, the Journey, the countdown and readiness disappear entirely, and every
 * scheduled notification is PURGED rather than muted. That distinction is the whole point:
 * a muted schedule still fires "Semaine 24 🎉" the week after a loss. Cancelling the
 * schedule is the only implementation that is actually safe.
 */
import * as Notifications from 'expo-notifications';
import { useBulleStore } from '@/store/useBulleStore';

/** True when this bulle is paused. Cheap enough to call from any screen. */
export function usePauseState(): boolean {
  return useBulleStore((s) => s.bulle?.pause.paused ?? false);
}

export function isPaused(): boolean {
  return useBulleStore.getState().bulle?.pause.paused ?? false;
}

/**
 * Enter Pause. Purges the notification schedule FIRST — if the app is killed halfway
 * through, the worst outcome must be a paused-looking app that still has state, never a
 * live schedule with a paused flag.
 */
export async function enterPause(): Promise<void> {
  await cancelAllScheduled();
  useBulleStore.getState().setPause({ paused: true, pausedAt: new Date().toISOString() });
}

export async function exitPause(): Promise<void> {
  useBulleStore.getState().setPause({ paused: false });
}

async function cancelAllScheduled(): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch {
    // Web, or notifications never configured. Nothing was scheduled, so nothing to purge.
  }
}
