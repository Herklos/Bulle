/**
 * Shared native Stack header styling.
 *
 * Without this the header renders the platform default (white on Android), which sits a
 * shade off the ivory background and reads as a seam across the top of every pushed screen.
 * It is the kind of detail nobody names but everybody notices.
 *
 * `title: ''` throughout: the screens carry their own Fraunces display heading, and a
 * duplicate title in Inter above it is chrome saying the same thing twice.
 */
import type { BulleTheme } from '@bulle/ui/theme';

export function stackScreenOptions(theme: BulleTheme, isWide: boolean) {
  return {
    // On desktop the sidebar navigates, so a per-screen header is redundant chrome.
    headerShown: !isWide,
    title: '',
    headerStyle: { backgroundColor: theme.colors.bg },
    headerTintColor: theme.colors.ink,
    headerShadowVisible: false,
  } as const;
}
