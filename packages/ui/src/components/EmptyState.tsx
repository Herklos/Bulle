'use client';
/**
 * Empty state (spec §15.6): a 32px glyph, one reassuring sentence, at most one action.
 *
 * Never an illustration, never "rien ici !". An empty screen in this app usually means the
 * couple is genuinely on top of things — it should read as "tout est calme", not as a
 * failure to fill a list. That is why `action` is optional and singular: sometimes the
 * right thing to offer is nothing at all.
 */
import React from 'react';
import { View } from 'react-native';
import { useBulleTheme } from '../theme/context.js';
import { Glyph, type GlyphName } from '../primitives/Glyph.js';
import { Button } from './Button.js';
import { Text } from './Text.js';

export interface EmptyStateProps {
  glyph: GlyphName;
  message: string;
  action?: { label: string; onPress: () => void };
}

export function EmptyState({ glyph, message, action }: EmptyStateProps) {
  const { space } = useBulleTheme();
  return (
    <View style={{ alignItems: 'center', gap: space[4], paddingVertical: space[6] }}>
      <Glyph name={glyph} size={32} color="inkSoft" />
      <Text variant="body" color="inkSoft" style={{ textAlign: 'center' }}>
        {message}
      </Text>
      {action && <Button label={action.label} onPress={action.onPress} />}
    </View>
  );
}
