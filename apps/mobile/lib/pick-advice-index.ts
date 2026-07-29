/**
 * Pure selection for the home advice pool (see use-home-advice.ts). Kept import-free (no
 * react-native, no i18n) so it can be unit-tested under plain Node/vitest without pulling in
 * react-native's Flow-typed source.
 */
export function pickAdviceIndex(length: number, avoid: number | null): number {
  if (length <= 1) return 0;
  let index = Math.floor(Math.random() * length);
  if (index === avoid) index = (index + 1) % length;
  return index;
}
