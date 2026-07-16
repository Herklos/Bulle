/**
 * The one notification Bulle sends (spec §5.11).
 *
 * A single repeating daily trigger at 08:00. The "at most one a day" cap is therefore a
 * property of the SHAPE, not a rule anything has to enforce: there is no per-task reminder,
 * no per-event reminder, and no code path that can schedule a second thing. See
 * domain/notifications.ts for what that deliberately makes impossible.
 *
 * This existed as a toggle for a long time with nothing behind it: "Un point le matin, un
 * seul par jour" was a promise the app never kept, because nothing anywhere called
 * scheduleNotificationAsync. A setting that lies is worse than a missing feature.
 *
 * The body is generic on purpose. A notification that names the focus task would be
 * computed HOURS before it fires, so it would go stale the moment anything changed, and
 * getting it right would need a background task reaching into the plan while the user is
 * asleep. "Une chose aujourd'hui" is true whenever it fires, and the app answers the
 * question the second it opens.
 */
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { planDigest, type DigestInput } from '@bulle/sdk';

/** Stable id, so rescheduling replaces rather than stacks. */
const DIGEST_ID = 'bulle-morning-digest';

/**
 * Cancel everything, then schedule at most one thing.
 *
 * Every caller ends here: the toggle, the boot path, entering and leaving Pause. Cancelling
 * first is what makes it idempotent, which matters because it runs on every app start.
 */
export async function syncNotifications(
  input: DigestInput,
  copy: { title: string; body: string },
): Promise<void> {
  // Web has no local scheduling worth the name, and the whole point is offline-capable
  // local delivery.
  if (Platform.OS === 'web') return;

  try {
    await Notifications.cancelScheduledNotificationAsync(DIGEST_ID).catch(() => {});

    const plan = planDigest(input);
    if (!plan.enabled) return;

    // Ask only when the user has actually opted in. Prompting on first launch, before
    // anyone has said they want anything, is how an app spends its one permission ask on
    // nothing.
    const { status } = await Notifications.getPermissionsAsync();
    const granted =
      status === 'granted' || (await Notifications.requestPermissionsAsync()).status === 'granted';
    if (!granted) return;

    await Notifications.scheduleNotificationAsync({
      identifier: DIGEST_ID,
      content: {
        title: copy.title,
        body: copy.body,
        // No badge. A number on the icon is a backlog count on the home screen, which is
        // the exact thing §5.1 exists to avoid.
        badge: undefined,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: plan.hour,
        minute: plan.minute,
      },
    });
  } catch (error) {
    // A failed schedule must never take the app with it. The cost of losing it is one
    // missed morning line; the cost of throwing here is a boot loop.
    console.warn('[notifications] schedule failed', error);
  }
}
