/**
 * SecureStore wrapper with a web fallback.
 *
 * This holds the registry, and the registry holds the SEED PHRASE — the only thing that can
 * ever recover a bulle. On native that means the Keychain / Keystore.
 *
 * On web it means localStorage, which is a real and deliberate downgrade: a browser cannot
 * offer Keychain-grade storage, and pretending otherwise would be worse than being clear
 * about it. It is why the mandatory backup step (§9) exists, and why the web build is
 * positioned as a companion to the native app rather than the place you'd keep your only
 * copy of the key.
 */

import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export async function secureGet(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    if (typeof localStorage === 'undefined') return null; // SSR / static prerender
    return localStorage.getItem(key);
  }
  return SecureStore.getItemAsync(key);
}

export async function secureSet(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web') {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(key, value);
    return;
  }
  await SecureStore.setItemAsync(key, value);
}

export async function secureDelete(key: string): Promise<void> {
  if (Platform.OS === 'web') {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(key);
    return;
  }
  await SecureStore.deleteItemAsync(key);
}
