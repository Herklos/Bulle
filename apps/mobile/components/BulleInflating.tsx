'use client';
/**
 * The "preparing your bubble" moment (spec §5.12: "the Bulle orb inflates gently").
 *
 * Not a spinner. A spinner says "the machine is busy"; this says "your bubble is forming",
 * which is what is actually happening — the seed phrase is being minted and the identity
 * derived via Argon2id, which genuinely takes a moment.
 *
 * It reuses the real BulleOrb rather than a bespoke loading graphic, so the very first
 * thing anyone sees IS the product's signature element, already breathing. The liquid
 * rising is the same mechanism that will show their readiness for the next nine months.
 */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, useReducedMotion } from 'react-native-reanimated';
import { BulleOrb } from '@bulle/ui/primitives';
import { useBulleTheme } from '@bulle/ui/theme';
import { Text } from '@bulle/ui/components';

/** Where the liquid settles. Deliberately low: nothing is prepared yet, and pretending
 *  otherwise would be the first lie the app tells. */
const RESTING_FILL = 0.14;

export interface BulleInflatingProps {
  label: string;
}

export function BulleInflating({ label }: BulleInflatingProps) {
  const { space } = useBulleTheme();
  const reduced = useReducedMotion();
  const [fill, setFill] = useState(0);

  // The orb springs on `fill` changes internally, so simply setting the target once on
  // mount produces the inflation. Under reduced motion it is already at rest.
  useEffect(() => {
    if (reduced) {
      setFill(RESTING_FILL);
      return;
    }
    const timer = setTimeout(() => setFill(RESTING_FILL), 120);
    return () => clearTimeout(timer);
  }, [reduced]);

  return (
    <View style={{ alignItems: 'center', gap: space[6] }}>
      <BulleOrb
        fill={fill}
        // Cool end of the gradient: this is the very beginning.
        trimesterProgress={0}
        size={200}
        label={label}
      />
      <Animated.View entering={reduced ? undefined : FadeIn.delay(200).duration(400)}>
        <Text variant="titleXL" style={{ textAlign: 'center' }}>
          {label}
        </Text>
      </Animated.View>
    </View>
  );
}
