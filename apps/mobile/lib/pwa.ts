/**
 * PWA detection.
 *
 * An installed PWA should behave like the app, not like the website: someone who added
 * Bulle to their home screen has already been sold, and showing them the landing page every
 * launch would be absurd.
 */
import { Platform } from 'react-native';

export function isPwaStandalone(): boolean {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  // `display-mode: standalone` covers Android/desktop installs; `navigator.standalone` is
  // the iOS Safari equivalent, which never implemented the media query.
  const mq = window.matchMedia?.('(display-mode: standalone)').matches ?? false;
  const iosStandalone = (window.navigator as { standalone?: boolean }).standalone === true;
  return mq || iosStandalone;
}
