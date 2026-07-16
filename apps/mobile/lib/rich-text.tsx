'use client';
/**
 * Inline markdown links inside article paragraphs: `[label](/path)`.
 *
 * Deliberately NOT a markdown library. The corpus only ever needs links, and a full parser
 * would let arbitrary markup into the articles — which then has to be styled, sanitised and
 * kept consistent with the design system. One regex is the whole feature.
 */
import React from 'react';
import { Linking, Text as RNText } from 'react-native';
import { useBulleTheme } from '@bulle/ui/theme';
import { Text } from '@bulle/ui/components';

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

export function RichText({ children }: { children: string }) {
  const { colors } = useBulleTheme();
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  LINK_RE.lastIndex = 0;
  while ((match = LINK_RE.exec(children)) !== null) {
    if (match.index > lastIndex) parts.push(children.slice(lastIndex, match.index));
    const [, label, href] = match;
    parts.push(
      <RNText
        key={`${href}-${match.index}`}
        accessibilityRole="link"
        onPress={() => void Linking.openURL(href.startsWith('/') ? href : href)}
        style={{ color: colors.sage, textDecorationLine: 'underline' }}
      >
        {label}
      </RNText>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < children.length) parts.push(children.slice(lastIndex));

  return <Text variant="body">{parts}</Text>;
}
