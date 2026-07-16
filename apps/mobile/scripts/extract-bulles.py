#!/usr/bin/env python3
"""
Slices the root `bulles.png` sheet into one image per gestational week.

The sheet contains 21 labelled cells: weeks 1-13, then 16, 20, 24, 28, 32, 36, 38, 40.
It does NOT contain 40. Weeks 14, 15, 17-19, 21-23, 25-27, 29-31, 33-35, 37 and 39 have no
artwork, so this maps each missing week to the NEAREST AVAILABLE cell and writes a file for
it. That is a real editorial compromise, not a lossless extraction: week 21 and week 23 will
be the same picture. `WEEK_SOURCE` below records exactly which weeks are genuine and which
are stand-ins, so nothing pretends to be what it isn't.

Cells are found by detecting non-white blobs and filtering by size, rather than by a
hardcoded grid, so re-exporting the sheet at another size still works. The label strip under
each cell is cropped off by taking only the upper portion of each detected row band.

Run:  python3 scripts/extract-bulles.py
Out:  assets/bulles/week-01.png … week-40.png  (+ manifest.json)
"""

import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[3]
SOURCE = ROOT / "bulles.png"
OUT = Path(__file__).resolve().parent.parent / "assets" / "bulles"

# The weeks that genuinely have artwork on the sheet, in reading order.
LABELLED_WEEKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 16, 20, 24, 28, 32, 36, 38, 40]

# Rows as they appear on the sheet: 6 + 6 + 6 + 3.
ROW_COUNTS = [6, 6, 6, 3]

# Fraction of each row band that is illustration rather than the "WEEK n" label beneath it.
ART_FRACTION = 0.78

SIZE = 512  # output square


def nearest_labelled(week: int) -> int:
    return min(LABELLED_WEEKS, key=lambda w: (abs(w - week), w))


def whiten_to_alpha(img):
    """
    Turn the sheet's white background into transparency.

    Not cosmetic. The sheet is white-on-white, so a straight crop bakes an opaque white disc
    into every file — which looks fine on the ivory background and then punches a glaring
    hole through the middle of the app in dark mode ("mode nuit", the one that matters at
    4am). Alpha is derived from luminance so the illustration's own soft edges stay soft
    instead of being keyed out with a hard threshold.
    """
    img = img.convert("RGBA")
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            # Near-white → transparent; ramp over the last few levels so antialiased edges
            # fade rather than clip.
            lum = (r + g + b) / 3
            if lum >= 252:
                px[x, y] = (r, g, b, 0)
            elif lum > 238:
                px[x, y] = (r, g, b, int(a * (252 - lum) / 14))
    return img


def find_rows(img, threshold=246):
    """Row bands containing ink, found by scanning for rows that are not near-white."""
    gray = img.convert("L")
    w, h = gray.size
    px = gray.load()
    rows = []
    in_band = False
    start = 0
    for y in range(h):
        # Sample every 4th pixel: 4x faster and cannot miss an illustration this large.
        ink = any(px[x, y] < threshold for x in range(0, w, 4))
        if ink and not in_band:
            in_band, start = True, y
        elif not ink and in_band:
            in_band = False
            if y - start > h * 0.05:  # ignore thin noise
                rows.append((start, y))
    if in_band:
        rows.append((start, h))
    return rows


def find_cols(img, band, threshold=246):
    """Columns containing ink within a row band."""
    gray = img.convert("L")
    w, _ = gray.size
    px = gray.load()
    y0, y1 = band
    cols = []
    in_band = False
    start = 0
    for x in range(w):
        ink = any(px[x, y] < threshold for y in range(y0, y1, 4))
        if ink and not in_band:
            in_band, start = True, x
        elif not ink and in_band:
            in_band = False
            if x - start > w * 0.03:
                cols.append((start, x))
    if in_band:
        cols.append((start, w))
    return cols


def main():
    if not SOURCE.exists():
        raise SystemExit(f"Missing {SOURCE}. Put the sheet at the repo root.")

    img = Image.open(SOURCE).convert("RGBA")
    OUT.mkdir(parents=True, exist_ok=True)

    rows = find_rows(img)
    if len(rows) != len(ROW_COUNTS):
        print(f"! detected {len(rows)} row bands, expected {len(ROW_COUNTS)} — check the sheet")

    cells = []
    for band in rows:
        y0, y1 = band
        # Drop the label strip: keep only the top ART_FRACTION of the band.
        art_y1 = y0 + int((y1 - y0) * ART_FRACTION)
        for (x0, x1) in find_cols(img, (y0, art_y1)):
            cells.append((x0, y0, x1, art_y1))

    print(f"Detected {len(cells)} cells (expected {len(LABELLED_WEEKS)})")
    if len(cells) != len(LABELLED_WEEKS):
        print("! count mismatch — the week mapping below may be off; inspect the output")

    # Crop each cell to a centred square so every week renders at the same scale.
    crops = {}
    for week, box in zip(LABELLED_WEEKS, cells):
        x0, y0, x1, y1 = box
        cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
        half = max(x1 - x0, y1 - y0) // 2 + 8
        square = img.crop((cx - half, cy - half, cx + half, cy + half))
        crops[week] = whiten_to_alpha(square.resize((SIZE, SIZE), Image.LANCZOS))

    manifest = {}
    for week in range(1, 41):
        source_week = week if week in crops else nearest_labelled(week)
        path = OUT / f"week-{week:02d}.png"
        crops[source_week].save(path)
        manifest[str(week)] = {
            "file": f"bulles/week-{week:02d}.png",
            "sourceWeek": source_week,
            # Honest flag: false means this week reuses another week's artwork.
            "exact": week in crops,
        }

    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")

    exact = sum(1 for v in manifest.values() if v["exact"])
    print(f"Wrote 40 files to {OUT.relative_to(Path.cwd()) if OUT.is_relative_to(Path.cwd()) else OUT}")
    print(f"  {exact} weeks are genuine artwork, {40 - exact} reuse the nearest available week")
    print("  see manifest.json for the exact mapping")


if __name__ == "__main__":
    main()
