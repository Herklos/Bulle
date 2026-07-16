'use client';
/**
 * First-visit welcome for a feature area.
 *
 * Purely presentational: copy, persistence and navigation are the caller's job, so the same
 * component serves every tab without knowing about any of them.
 *
 * Bulle's take differs from the usual pattern in three ways, and each is a rule from the
 * spec rather than taste:
 *
 *  - The hero is the ORB, not a feature icon. It is the one thing that is unmistakably this
 *    product, and a coloured icon-in-a-circle is the template answer.
 *  - No accent band, no tinted hero. §15.4 bans alternating section backgrounds, and a
 *    welcome screen is exactly where products reach for one.
 *  - ONE primary CTA and a plain-text dismiss. No "explore" link competing with it: if a
 *    welcome needs two equal actions, it has not decided what it is for.
 *
 * The dismiss is always present and immediate — a first-run screen you cannot leave is the
 * oldest dark pattern there is.
 */
import React from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown, useReducedMotion } from 'react-native-reanimated';
import { useBulleTheme } from '../theme/context.js';
import { BulleOrb } from '../primitives/BulleOrb.js';
import { Glyph, type GlyphName } from '../primitives/Glyph.js';
import { Button } from './Button.js';
import { Text } from './Text.js';

export interface FeatureWelcomeBullet {
  glyph: GlyphName;
  text: string;
}

export interface FeatureWelcomeProps {
  visible: boolean;
  /** Backdrop, close, and the hardware back button all land here. */
  onDismiss: () => void;
  eyebrow: string;
  title: string;
  tagline: string;
  bullets: FeatureWelcomeBullet[];
  primaryLabel: string;
  onPrimary: () => void;
  /** Accessibility label for the close control. */
  closeLabel: string;
  /**
   * How full the hero orb is. Defaults to a suggestive 0.45 — not empty (bleak), not full
   * (a promise the screen has not earned).
   */
  orbFill?: number;
  /** 0..1; drives the orb's temperature so the welcome matches where the user actually is. */
  trimesterProgress?: number;
}

export function FeatureWelcome({
  visible,
  onDismiss,
  eyebrow,
  title,
  tagline,
  bullets,
  primaryLabel,
  onPrimary,
  closeLabel,
  orbFill = 0.45,
  trimesterProgress = 0.4,
}: FeatureWelcomeProps) {
  const { colors, layout, space, touch } = useBulleTheme();
  const insets = useSafeAreaInsets();
  const reduced = useReducedMotion();

  return (
    <Modal
      visible={visible}
      animationType={reduced ? 'none' : 'fade'}
      transparent={false}
      // Android's hardware back must dismiss, or the screen is a trap.
      onRequestClose={onDismiss}
      presentationStyle="fullScreen"
    >
      <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}>
        {/* Close, top-right, immediately. Never delayed, never hidden. */}
        <View style={{ alignItems: 'flex-end', paddingHorizontal: space[4] }}>
          <Pressable
            onPress={onDismiss}
            accessibilityRole="button"
            accessibilityLabel={closeLabel}
            hitSlop={touch.min / 2}
            style={{ minHeight: touch.min, minWidth: touch.min, alignItems: 'flex-end', justifyContent: 'center' }}
          >
            <Glyph name="close" size={22} color="inkSoft" />
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            paddingHorizontal: space[5],
            paddingBottom: insets.bottom + space[6],
          }}
        >
          <View
            style={{
              width: '100%',
              maxWidth: layout.maxContentWidth,
              alignSelf: 'center',
              alignItems: 'center',
              gap: space[6],
            }}
          >
            <Animated.View entering={reduced ? undefined : FadeIn.duration(500)}>
              <BulleOrb
                fill={orbFill}
                trimesterProgress={trimesterProgress}
                size={140}
                label={title}
              />
            </Animated.View>

            <Animated.View
              entering={reduced ? undefined : FadeInDown.delay(120).duration(420)}
              style={{ alignItems: 'center', gap: space[3] }}
            >
              <Text variant="overline">{eyebrow}</Text>
              <Text variant="display" style={{ textAlign: 'center' }}>
                {title}
              </Text>
              <Text variant="body" color="inkSoft" style={{ textAlign: 'center' }}>
                {tagline}
              </Text>
            </Animated.View>

            <Animated.View
              entering={reduced ? undefined : FadeInDown.delay(220).duration(420)}
              style={{ alignSelf: 'stretch', gap: space[4] }}
            >
              {bullets.map((bullet) => (
                <View
                  key={bullet.text}
                  style={{ flexDirection: 'row', gap: space[4], alignItems: 'center' }}
                >
                  <Glyph name={bullet.glyph} size={20} color="sage" />
                  <Text variant="body" style={{ flex: 1 }}>
                    {bullet.text}
                  </Text>
                </View>
              ))}
            </Animated.View>

            <Animated.View
              entering={reduced ? undefined : FadeInDown.delay(320).duration(420)}
              style={{ alignSelf: 'stretch' }}
            >
              <Button label={primaryLabel} onPress={onPrimary} block />
            </Animated.View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
