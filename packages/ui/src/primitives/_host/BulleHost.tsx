'use client';
import React, { createContext, useContext } from 'react';
import { Host } from '@expo/ui';
import type { UniversalHostProps } from '@expo/ui';
import { useBulleTheme } from '../../theme/context.js';

const HostContext = createContext(false);

interface BulleHostProps extends UniversalHostProps {
  children: React.ReactNode;
}

/**
 * Themed `@expo/ui` Host — `seedColor` defaults to sage (the theme's primary) so nested
 * native controls inherit the app's accent: SwiftUI tint on iOS, Material3 palette on
 * Android, CSS custom properties on web.
 *
 * `HostContext` marks descendants so nested native primitives render bare instead of each
 * creating their own bridge.
 */
export function BulleHost({ children, seedColor, ...rest }: BulleHostProps) {
  const { colors } = useBulleTheme();
  return (
    <Host seedColor={seedColor ?? colors.sage} {...rest}>
      <HostContext.Provider value={true}>{children}</HostContext.Provider>
    </Host>
  );
}

/**
 * Wraps `node` in a `BulleHost` unless it is already inside one — collapsing a tree of
 * self-hosting native primitives down to a SINGLE native bridge. Without this, every leaf
 * (each Button, Switch, Checkbox) would open its own bridge, which is the difference
 * between @expo/ui being usable across a whole screen and being usable for one control.
 *
 * `hostProps` (e.g. `matchContents`) applies only when this call actually creates the Host;
 * it is ignored when collapsing into an ancestor's, since a Host's sizing is fixed at mount.
 */
export function useHostWrap(
  node: React.ReactElement,
  hostProps?: Partial<UniversalHostProps>,
): React.ReactElement {
  const insideHost = useContext(HostContext);
  return insideHost ? node : <BulleHost {...hostProps}>{node}</BulleHost>;
}

export { HostContext };
