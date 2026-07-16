'use client';
import React from 'react';
import { Redirect } from 'expo-router';

/** Bare "/" picks the default locale. FR is the launch market and the design language. */
export default function MarketingIndex() {
  return <Redirect href="/fr" />;
}
