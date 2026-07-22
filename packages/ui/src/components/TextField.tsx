'use client';
/**
 * A single-line text field.
 *
 * A hairline underline, not a box. §15.4 bans card borders, and a rounded, outlined,
 * grey-filled input is the same object wearing a different hat — it is also the default
 * every framework hands you. The field is Inter body on the page background, separated from
 * it by the same 1px `line` every list uses, so a form reads as part of the page rather than
 * as a control panel dropped onto it.
 *
 * The underline is the only thing that moves: it turns sage on focus. That is the entire
 * focus treatment, and it doubles as the visible keyboard-focus indicator the quality floor
 * requires.
 */
import React, { useState } from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';
import { useBulleTheme } from '../theme/context.js';
import { Text } from './Text.js';

export interface TextFieldProps extends Omit<TextInputProps, 'placeholderTextColor'> {
  /** Sits above the field, always visible — never a placeholder masquerading as a label. */
  label?: string;
  /** Quiet helper line under the field. */
  hint?: string;
}

export function TextField({ label, hint, onFocus, onBlur, style, ...props }: TextFieldProps) {
  const { colors, space, touch, type } = useBulleTheme();
  const [focused, setFocused] = useState(false);

  return (
    <View style={{ gap: space[2] }}>
      {label && <Text variant="overline">{label}</Text>}
      <TextInput
        {...props}
        accessibilityLabel={props.accessibilityLabel ?? label}
        accessibilityHint={props.accessibilityHint ?? hint}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        placeholderTextColor={colors.inkSoft}
        // `style` last so a caller can set a multiline height without losing the underline.
        style={[
          {
            minHeight: touch.min,
            paddingVertical: space[2],
            fontFamily: type.body.family,
            fontSize: type.body.size,
            color: colors.ink,
            borderBottomWidth: 1,
            borderBottomColor: focused ? colors.sage : colors.line,
          },
          style,
        ]}
      />
      {hint && <Text variant="caption">{hint}</Text>}
    </View>
  );
}
