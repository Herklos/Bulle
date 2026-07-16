import { Platform, useWindowDimensions } from 'react-native';
import { layout } from '@bulle/ui/theme';

/**
 * True on web at >= 1024px. ALWAYS false on native.
 *
 * A tablet in landscape is wide enough for a sidebar, but native already has a real tab bar
 * that users expect, and replacing it with a web-style rail would be worse on both counts.
 * Native gets native navigation; the sidebar is a web affordance.
 */
export function useIsWideScreen(): boolean {
  const { width } = useWindowDimensions();
  return Platform.OS === 'web' && width >= layout.desktopBreakpoint;
}
