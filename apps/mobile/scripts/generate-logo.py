#!/usr/bin/env python3
"""
Generates every icon variant from the master logo at the repo root.

The master (`logo.png`, RGBA with transparency) is a designed asset: a sleeping baby inside
a translucent bubble. This script does NOT redraw it — it composites it onto the ivory
background at the right sizes and margins per target, so there is exactly one place the
brand mark is authored and one place the sizes are decided.

An earlier version drew the orb procedurally from tokens.ts. That was defensible while the
mark did not exist; now that it does, redrawing it would be a second, worse source of truth.

Run:  python3 scripts/generate-logo.py
"""

from pathlib import Path
from PIL import Image

# Mirrors packages/ui/src/theme/tokens.ts — icons must sit on the same ivory as the app.
BG = (250, 247, 242)  # #FAF7F2

ROOT = Path(__file__).resolve().parents[3]
MASTER = ROOT / "logo.png"
ASSETS = Path(__file__).resolve().parent.parent / "assets"
PUBLIC = Path(__file__).resolve().parent.parent / "public" / "assets"


def compose(size: int, margin_ratio: float, background=BG, transparent=False) -> Image.Image:
    """
    The master, centred on a square canvas with `margin_ratio` breathing room.

    The margin is the whole point of this function: iOS masks to a rounded rect, Android
    crops to a circle/squircle with its own safe zone, and a favicon has none of that. One
    exported PNG cannot satisfy all three, which is why each target below passes its own.
    """
    master = Image.open(MASTER).convert("RGBA")

    canvas = Image.new("RGBA", (size, size), (*background, 0 if transparent else 255))
    inner = int(size * (1 - margin_ratio * 2))

    # Fit the master inside `inner` without distorting it — the bubble is very slightly
    # taller than wide, and stretching it to square is instantly visible.
    ratio = min(inner / master.width, inner / master.height)
    w, h = int(master.width * ratio), int(master.height * ratio)
    resized = master.resize((w, h), Image.LANCZOS)

    canvas.paste(resized, ((size - w) // 2, (size - h) // 2), resized)
    return canvas if transparent else canvas.convert("RGB")


def save(img: Image.Image, *paths: Path) -> None:
    for p in paths:
        p.parent.mkdir(parents=True, exist_ok=True)
        img.save(p)
        print(f"  {p.name:22} {img.size[0]}x{img.size[1]}")


def main() -> None:
    if not MASTER.exists():
        raise SystemExit(f"Missing {MASTER}. The master logo lives at the repo root.")

    print("Generating Bulle icons from logo.png…")

    # App icon. iOS masks to a rounded rect, so the mark needs room at the corners.
    save(compose(1024, 0.08), ASSETS / "icon.png", PUBLIC / "icon.png")

    # The logo itself, transparent, for the README and the web.
    save(compose(1024, 0.02, transparent=True), ASSETS / "logo.png", PUBLIC / "logo.png")

    # Android adaptive: the system crops to a circle/squircle AND applies its own safe zone,
    # so this needs a much bigger margin or the bubble's edges get shaved.
    save(compose(1024, 0.22), ASSETS / "adaptive-icon.png")

    # Splash.
    save(compose(1024, 0.30), ASSETS / "splash-icon.png")

    # PWA.
    save(compose(192, 0.08), ASSETS / "icon-192.png", PUBLIC / "icon-192.png")
    save(compose(512, 0.08), ASSETS / "icon-512.png", PUBLIC / "icon-512.png")

    # Favicon: tight margin. At 48px it must read as a shape, not a detail.
    fav = compose(196, 0.02)
    save(fav, ASSETS / "favicon.png", PUBLIC / "favicon.png")
    fav.resize((48, 48), Image.LANCZOS).save(
        ASSETS / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)]
    )
    print("  favicon.ico            multi-size")

    # OG card, 1200x630. Off-centre so it survives a square crop by networks that do that.
    og = Image.new("RGB", (1200, 630), BG)
    mark = compose(470, 0.02, transparent=True)
    og.paste(mark, (int(1200 * 0.60), (630 - 470) // 2), mark)
    save(og, ASSETS / "og-image.png", PUBLIC / "og-image.png")

    print("Done.")


if __name__ == "__main__":
    main()
