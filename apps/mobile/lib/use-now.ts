'use client';
/**
 * The current time, as React state.
 *
 * The SDK is pure and takes `now` as an argument, so something has to supply it. Reading
 * `Date.now()` inline during render would make every week calculation an un-memoisable
 * moving target and would never update on a day boundary anyway.
 *
 * Ticks hourly. A pregnancy week does not change faster than that, and an app that reads
 * "J-96" does not need second-accuracy — it needs to be right when you open it tomorrow.
 */
import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

const HOUR_MS = 60 * 60 * 1000;

export function useNow(): number {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), HOUR_MS);
    // A backgrounded app's timers are unreliable, and "left it open overnight" is the
    // common case. Re-read on foreground so the day count is never stale.
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') setNow(Date.now());
    });
    return () => {
      clearInterval(timer);
      sub.remove();
    };
  }, []);

  return now;
}
