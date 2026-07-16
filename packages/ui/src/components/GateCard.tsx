'use client';
/**
 * The paywall gate (spec §15.6, §10).
 *
 * Sober by rule. A SAGE button, not terracotta: a paywall is not a celebration. Three
 * contextual benefits at most, the price stated plainly as a one-time purchase, and a
 * plain-text "plus tard" that is always available.
 *
 * NO dark patterns, and this is enforced by what the component cannot do: there is no
 * delayed close, no countdown, no "offer expires", and no way to render it without a
 * working dismiss. Bulle's whole pitch is trust; a manipulative paywall would cost more
 * than it earns.
 */
import React from 'react';
import { Pressable, View } from 'react-native';
import { useBulleTheme } from '../theme/context.js';
import { Glyph } from '../primitives/Glyph.js';
import { Button } from './Button.js';
import { Text } from './Text.js';

export interface GateCardProps {
  title: string;
  /** At most 3. Contextual to what the user just tried to do, never a generic feature list. */
  benefits: string[];
  /** e.g. "29,99 € · une fois, pour toute la grossesse". */
  priceLabel: string;
  ctaLabel: string;
  dismissLabel: string;
  onPurchase: () => void;
  onDismiss: () => void;
}

export function GateCard({
  title,
  benefits,
  priceLabel,
  ctaLabel,
  dismissLabel,
  onPurchase,
  onDismiss,
}: GateCardProps) {
  const { colors, radius, space, touch } = useBulleTheme();

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: radius.m,
        padding: space[5],
        gap: space[4],
      }}
    >
      <Text variant="titleXL">{title}</Text>

      <View style={{ gap: space[2] }}>
        {benefits.slice(0, 3).map((benefit) => (
          <View key={benefit} style={{ flexDirection: 'row', gap: space[3], alignItems: 'center' }}>
            <Glyph name="check" size={18} color="sage" />
            <Text variant="body" style={{ flex: 1 }}>
              {benefit}
            </Text>
          </View>
        ))}
      </View>

      <Text variant="caption">{priceLabel}</Text>

      <Button label={ctaLabel} onPress={onPurchase} block />

      <Pressable
        onPress={onDismiss}
        accessibilityRole="button"
        hitSlop={touch.min / 2}
        style={{ alignSelf: 'center', minHeight: touch.min, justifyContent: 'center' }}
      >
        <Text variant="caption">{dismissLabel}</Text>
      </Pressable>
    </View>
  );
}
