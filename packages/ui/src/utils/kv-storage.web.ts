/**
 * Key→JSON KV storage — WEB.
 *
 * An in-memory Map pre-loaded from AsyncStorage by `initStorage`, with fire-and-forget
 * writes. Reads therefore stay SYNCHRONOUS here too, which is the point: the store layer
 * needs no platform branch, and hydration is the same plain function on both sides.
 *
 * Deliberately does NOT import expo-sqlite. The native build uses it, but on web it would
 * pull the wa-sqlite WASM engine into the bundle to back storage we do not use.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

export type StorageHandle = object;

const cache = new Map<string, string>();

/**
 * Sentinel so `getStorage()` returns something truthy once ready, keeping the
 * `if (getStorage())` guards identical across platforms.
 */
const WEB_STORAGE_READY: StorageHandle = {};
let initialized = false;

/**
 * `databaseName` is accepted and ignored: the web has one AsyncStorage namespace per
 * origin, so bulle isolation is by key, not by file. Multi-bulle on web therefore shares a
 * store — acceptable because the web build is a companion, not the primary client.
 */
export async function initStorage(_databaseName: string): Promise<StorageHandle | null> {
  const keys = await AsyncStorage.getAllKeys();
  if (keys.length > 0) {
    const pairs = await AsyncStorage.multiGet(keys as string[]);
    for (const [key, value] of pairs) {
      if (value != null) cache.set(key, value);
    }
  }
  initialized = true;
  return WEB_STORAGE_READY;
}

export function getStorage(): StorageHandle | null {
  return initialized ? WEB_STORAGE_READY : null;
}

export function closeStorage(): void {
  cache.clear();
  initialized = false;
}

export function readCollection<T>(key: string): T | null {
  const raw = cache.get(key) ?? null;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function writeCollection<T>(key: string, data: T): void {
  const value = JSON.stringify(data);
  cache.set(key, value);
  void AsyncStorage.setItem(key, value); // fire-and-forget; the cache is the read path
}

export function removeCollection(key: string): void {
  cache.delete(key);
  void AsyncStorage.removeItem(key);
}
