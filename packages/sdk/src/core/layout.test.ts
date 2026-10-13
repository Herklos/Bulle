import { describe, it, expect } from 'vitest';
import { defaultSpaceLayout } from '@drakkar.software/starfish-spaces';
import { bulleLayout } from './layout.js';

const USER_ID = 'user-1';

describe('bulleLayout', () => {
  it('mints account caps with explicit collections, never the wildcard', () => {
    const scope = bulleLayout().accountScope(USER_ID);
    expect(scope.collections).not.toContain('*');
    expect(scope.collections).toEqual(expect.arrayContaining(['spaces', 'devices']));
  });

  it('mints linked-device caps with explicit collections, never the wildcard', () => {
    const scope = bulleLayout().linkedDeviceScope(USER_ID);
    expect(scope.collections).not.toContain('*');
    expect(scope.collections).toEqual(expect.arrayContaining(['spaces', 'devices']));
  });

  it('keeps every other layout field identical to starfish-spaces defaultSpaceLayout', () => {
    const layout = bulleLayout();
    const overridden = new Set(['accountScope', 'linkedDeviceScope']);
    for (const key of Object.keys(defaultSpaceLayout) as (keyof typeof defaultSpaceLayout)[]) {
      if (overridden.has(key)) continue;
      expect(layout[key], key).toBe(defaultSpaceLayout[key]);
    }
  });

  it('proves the wildcard it replaces exists upstream, so the override is load-bearing', () => {
    expect(defaultSpaceLayout.accountScope(USER_ID).collections).toEqual(['*']);
    expect(defaultSpaceLayout.linkedDeviceScope(USER_ID).collections).toEqual(['*']);
  });
});
