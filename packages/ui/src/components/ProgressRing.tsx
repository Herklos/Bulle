'use client';
/**
 * Progress ring (spec §15.6) — 4px sage on line, rounded caps.
 *
 * NO percentage in the centre, by rule. The number lives in the label beside the ring where
 * it can be read as a sentence ("4 sur 7"), rather than floating in a donut as a score. A
 * ring shows shape at a glance; a number in a ring turns a project into a KPI.
 */
import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useBulleTheme } from '../theme/context.js';

export interface ProgressRingProps {
  /** 0..1. */
  fill: number;
  size?: number;
  /** Ring thickness. */
  stroke?: number;
  children?: React.ReactNode;
}

export function ProgressRing({ fill, size = 44, stroke = 4, children }: ProgressRingProps) {
  const { colors } = useBulleTheme();
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1, fill));

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={colors.line} strokeWidth={stroke} fill="none" />
        {clamped > 0 && (
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={colors.sage}
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${c * clamped} ${c}`}
            // Start at 12 o'clock rather than 3 — a ring that fills from the top reads as
            // progress; from the right it reads as a pie chart.
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        )}
      </Svg>
      {children}
    </View>
  );
}
