import { describe, it, expect } from 'vitest';
import QRCode from 'qrcode';

/**
 * Regression test for the unscannable invite QR. Ported from wedding-os, where it was
 * written after the bug shipped (see app/(tabs)/more/invite.tsx).
 *
 * Root cause there: the invite URL embeds a signed capability cert plus ephemeral keys
 * (~1.4KB), which forces a high-density QR. Two separate commits "fixed" cosmetic issues by
 * shrinking the render size (200 -> 160 -> 184px) without checking module density, making
 * the code physically unscannable. 184px / 141 modules = 1.23px per module; real camera
 * decoders need roughly 2px per module or the modules blur together.
 *
 * That failure is invisible to every other kind of check: the component renders, the QR
 * looks like a QR, the test suite is green, and the only symptom is that a co-parent
 * standing next to you cannot join. Bulle inherits the same payload shape and the same
 * temptation to nudge the size, so it inherits the test.
 *
 * It does not render the component (react-native-qrcode-svg needs an RN environment). It
 * exercises the same underlying encoder: react-native-qrcode-svg's genMatrix calls
 * QRCode.create directly and maps its `size` prop 1:1 onto the module grid, with no added
 * quiet zone, so the px-per-module maths here is the real thing.
 */

/** The exact clamp used in app/(tabs)/more/invite.tsx. Keep the two in step. */
function qrSizeForWidth(width: number): number {
  return Math.max(250, Math.min(320, Math.round(width - 64)));
}

/**
 * A representative invite token, matching what createSpaceInviteLink/encodeLinkFragment
 * actually produce: a base64url JSON blob holding a signed cap cert and hex-encoded
 * ephemeral keys.
 */
function buildRepresentativeInviteUrl(): string {
  const hex = (n: number) => 'a'.repeat(n * 2);
  const b64 = (n: number) => 'A'.repeat(Math.ceil((n * 4) / 3));
  const cap = {
    v: 1,
    kind: 'member',
    iss: hex(32),
    issUserId: hex(20),
    sub: hex(32),
    subKem: hex(32),
    subUserId: hex(20),
    scope: {
      collections: ['content'],
      paths: [`spaces/${hex(16)}/members/*`],
      ops: ['read', 'write'],
    },
    nbf: 1750000000,
    exp: 1780000000,
    nonce: b64(16),
    sig: hex(64),
  };
  const token = {
    v: 1,
    spaceId: hex(16),
    spaceName: 'Notre bulle',
    cap,
    key: hex(32),
    kemPriv: hex(32),
    kemPub: hex(32),
    write: true,
  };
  const json = JSON.stringify(token);
  const b64url = Buffer.from(json)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  return `https://bulle.drakkar.software/join#${b64url}`;
}

/**
 * Camera decoders reliably resolve QR modules at roughly 2px per module or above. Below
 * that they blur together and scanning fails.
 */
const MIN_SCANNABLE_PX_PER_MODULE = 2.0;

describe('invite QR scannability', () => {
  const url = buildRepresentativeInviteUrl();

  it('matches the real invite payload order of magnitude', () => {
    // If this drifts, the density numbers below stop describing reality.
    expect(url.length).toBeGreaterThan(1000);
    expect(url.length).toBeLessThan(2000);
  });

  it.each([
    ['small phone (320)', 320],
    ['standard phone (375)', 375],
    ['large phone (414)', 414],
    ['tablet/web (768)', 768],
  ])('stays above the scannable px/module threshold on %s', (_label, width) => {
    const qrSize = qrSizeForWidth(width);
    const matrix = QRCode.create(url, { errorCorrectionLevel: 'L' });
    const pxPerModule = qrSize / matrix.modules.size;
    expect(pxPerModule).toBeGreaterThanOrEqual(MIN_SCANNABLE_PX_PER_MODULE);
  });

  it('pins ecl L: the default (M) is unscannable on a small phone', () => {
    // ecl="L" on the component is not a preference, and this is the exact reason. At this
    // payload L needs 125 modules and M needs 137. On a 320px phone that is 2.05 px/module
    // versus 1.87: L clears the line, M does not. The default would ship a QR that works on
    // the reviewer's big phone and fails on a small one.
    const l = QRCode.create(url, { errorCorrectionLevel: 'L' }).modules.size;
    const m = QRCode.create(url, { errorCorrectionLevel: 'M' }).modules.size;
    expect(m).toBeGreaterThan(l);
    expect(qrSizeForWidth(320) / l).toBeGreaterThanOrEqual(MIN_SCANNABLE_PX_PER_MODULE);
    expect(qrSizeForWidth(320) / m).toBeLessThan(MIN_SCANNABLE_PX_PER_MODULE);
  });

  it('has almost no headroom on the smallest phone, so the payload must not grow', () => {
    // 2.05 px/module at 320px is 2.5% above the floor. Anything added to the invite token
    // (another key, a longer space name) pushes the smallest phone under the line. This
    // test is here to make that a deliberate decision rather than a surprise.
    const modules = QRCode.create(url, { errorCorrectionLevel: 'L' }).modules.size;
    const smallest = qrSizeForWidth(320) / modules;
    expect(smallest).toBeGreaterThanOrEqual(MIN_SCANNABLE_PX_PER_MODULE);
    expect(smallest).toBeLessThan(2.2);
  });

  it('would have failed under the size that shipped broken (184px)', () => {
    // The exact production regression, kept as a worked example so the next person shrinking
    // this box to fix a layout nit sees what it costs.
    const matrix = QRCode.create(url, { errorCorrectionLevel: 'M' });
    expect(184 / matrix.modules.size).toBeLessThan(MIN_SCANNABLE_PX_PER_MODULE);
  });

  it('never lets the clamp fall below the floor that makes the maths work', () => {
    // The floor is the whole defence: a narrow screen must overflow the box rather than
    // shrink the QR into uselessness.
    expect(qrSizeForWidth(200)).toBe(250);
    expect(qrSizeForWidth(1200)).toBe(320);
  });
});
