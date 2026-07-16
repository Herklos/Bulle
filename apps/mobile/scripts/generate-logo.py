#!/usr/bin/env python3
"""
Generates every icon variant from ONE definition of the orb.

The logo is the orb. Not a picture of the orb — the same geometry the app renders at
runtime (packages/ui/src/primitives/orb-shared.ts), drawn here with the same tokens. That
is why this is a script and not a .png someone exported from Figma once: when the palette
moves, the icons move with it.

Rendered at 4x and downsampled (LANCZOS) because there is no anti-aliasing in PIL's
ellipse; supersampling is the cheapest way to get a clean edge at 48px, which is the size
that actually matters for a favicon.

Run:  python3 scripts/generate-logo.py
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

# ─── Tokens. Mirror packages/ui/src/theme/tokens.ts ──────────────────────────
BG = (250, 247, 242)        # ivory  #FAF7F2
SURFACE = (255, 255, 255)
LINE = (233, 226, 216)      # #E9E2D8
SAGE = (124, 143, 114)      # #7C8F72 — the primary
DUSTY_BLUE = (143, 166, 191)  # #8FA6BF
INK = (46, 42, 38)          # #2E2A26

SS = 4  # supersample factor

ASSETS = Path(__file__).resolve().parent.parent / "assets"
PUBLIC = Path(__file__).resolve().parent.parent / "public" / "assets"


def lerp(a, b, t):
    return tuple(round(x + (y - x) * t) for x, y in zip(a, b))


def draw_orb(size, fill=0.62, margin_ratio=0.14, background=BG):
    """
    The orb, at `size` px. `fill` is the liquid level, matching the app's readiness.

    0.62 by default: an orb that is meaningfully full reads as a bubble, while an empty one
    reads as a grey circle. The icon has one job at 48px — be recognisably a filling bubble.
    """
    S = size * SS
    img = Image.new("RGB", (S, S), background)
    d = ImageDraw.Draw(img)

    margin = int(S * margin_ratio)
    box = [margin, margin, S - margin, S - margin]
    cx = cy = S // 2
    r = (S - 2 * margin) // 2

    # ── Halo: the only light-emitting element. Drawn on its own layer and blurred, then
    #    composited, so it glows outward rather than banding.
    halo = Image.new("RGB", (S, S), background)
    hd = ImageDraw.Draw(halo)
    accent = lerp(DUSTY_BLUE, SAGE, 0.5)
    hd.ellipse(box, fill=lerp(background, accent, 0.35))
    halo = halo.filter(ImageFilter.GaussianBlur(radius=S * 0.045))
    img.paste(halo, (0, 0))

    # ── Glass body: a radial gradient offset to the upper left supplies the implied light
    #    source. A flat fill here is what makes an orb look like a plastic ball.
    glass = Image.new("RGB", (S, S), background)
    gd = ImageDraw.Draw(glass)
    steps = 90
    light_x, light_y = cx - r * 0.35, cy - r * 0.35
    for i in range(steps, 0, -1):
        t = i / steps
        rr = int(r * 1.45 * t)
        col = lerp(SURFACE, LINE, 1 - t)
        gd.ellipse([light_x - rr, light_y - rr, light_x + rr, light_y + rr], fill=col)

    # Clip the gradient to the circle via a mask.
    mask = Image.new("L", (S, S), 0)
    ImageDraw.Draw(mask).ellipse(box, fill=255)
    img.paste(glass, (0, 0), mask)

    # ── Liquid, with the meniscus. Same maths as liquidPathString: the surface rides UP at
    #    both walls and dips in the centre.
    surface_y = (cy - r) + (2 * r) * (1 - fill)
    meniscus = int(r * 0.06)
    liquid = Image.new("RGB", (S, S), background)
    ld = ImageDraw.Draw(liquid)
    # Sweep the gradient vertically through the liquid: sage at the surface warming with
    # depth, echoing the app's sweep gradient without needing a real conic.
    for y in range(int(surface_y), cy + r + 1):
        t = (y - surface_y) / max(1, (cy + r) - surface_y)
        ld.line([(0, y), (S, y)], fill=lerp(accent, SAGE, t))

    # The liquid mask is an INTERSECTION of two masks, not a union.
    #
    # Building it by drawing the meniscus chord straight onto the circle mask paints across
    # the full width and spills the liquid outside the glass as two wings. The surface shape
    # and the glass boundary are separate constraints, so they have to be combined with a
    # multiply rather than by drawing one over the other.
    below_surface = Image.new("L", (S, S), 0)
    bd = ImageDraw.Draw(below_surface)
    bd.rectangle([0, int(surface_y), S, S], fill=255)
    # Meniscus: the liquid dips in the centre, so carve the dip out of the top edge…
    bd.chord([0, int(surface_y - meniscus * 3), S, int(surface_y + meniscus * 3)], 0, 180, fill=255)

    circle_mask = Image.new("L", (S, S), 0)
    ImageDraw.Draw(circle_mask).ellipse(box, fill=255)

    from PIL import ImageChops
    liquid_mask = ImageChops.multiply(below_surface, circle_mask)
    img.paste(liquid, (0, 0), liquid_mask)

    # ── Rim, over the liquid, so it reads as contained rather than pasted on.
    d = ImageDraw.Draw(img)
    d.ellipse(box, outline=LINE, width=max(1, int(S * 0.006)))

    return img.resize((size, size), Image.LANCZOS)


def save(img, *paths):
    for p in paths:
        p.parent.mkdir(parents=True, exist_ok=True)
        img.save(p)
        print(f"  {p.relative_to(p.parent.parent.parent)}  {img.size[0]}x{img.size[1]}")


def main():
    print("Generating Bulle icons from the orb geometry…")

    # App icon / logo. Generous margin so the orb survives iOS's rounded-rect mask.
    icon = draw_orb(1024, fill=0.62, margin_ratio=0.16)
    save(icon, ASSETS / "icon.png", ASSETS / "logo.png", PUBLIC / "icon.png", PUBLIC / "logo.png")

    # Android adaptive icon: the system crops to a circle/squircle and applies its own
    # safe zone, so the orb needs a much bigger margin or it gets its edges shaved.
    save(draw_orb(1024, fill=0.62, margin_ratio=0.26), ASSETS / "adaptive-icon.png")

    # Splash: the orb nearly empty, matching what onboarding shows a second later.
    save(draw_orb(1024, fill=0.08, margin_ratio=0.30), ASSETS / "splash-icon.png")

    # PWA.
    save(draw_orb(192, fill=0.62, margin_ratio=0.16), ASSETS / "icon-192.png", PUBLIC / "icon-192.png")
    save(draw_orb(512, fill=0.62, margin_ratio=0.16), ASSETS / "icon-512.png", PUBLIC / "icon-512.png")

    # Favicon. Tight margin and a fuller orb: at 48px it must be a shape, not a detail.
    fav = draw_orb(196, fill=0.66, margin_ratio=0.08)
    save(fav, ASSETS / "favicon.png", PUBLIC / "favicon.png")
    fav.resize((48, 48), Image.LANCZOS).save(ASSETS / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"  assets/favicon.ico  multi-size")

    # OG image, 1200x630. The orb off-centre, ivory field — it is the share card, so it
    # must survive being cropped square by some networks.
    og = Image.new("RGB", (1200, 630), BG)
    orb = draw_orb(460, fill=0.62, margin_ratio=0.10)
    og.paste(orb, (int(1200 * 0.62), (630 - 460) // 2))
    save(og, ASSETS / "og-image.png", PUBLIC / "og-image.png")

    print("Done.")


if __name__ == "__main__":
    main()
