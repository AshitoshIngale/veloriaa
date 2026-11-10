#!/usr/bin/env python3
"""VELORIAA SEO assets — one-shot builder.

1. /public/images/og-image.jpg     — 1200x630 (1.91:1) branded social preview
                                     from the uploaded VELORIAA banner.
2. /src/app/favicon.ico            — 16/32/48 from the existing brand mark.
3. /src/app/apple-icon.png         — 180x180 apple-touch-icon (alpha flattened
                                     onto the ivory brand background).
4. /public/favicon.png             — 64x64 convenience copy.
5. In-place recompression of /public/images/ig/*.jpg (no renames, no resize —
   dimensions are preserved so OG/product references stay valid).
"""
from PIL import Image
from pathlib import Path

ROOT = Path("/home/z/my-project")
IVORY = (250, 247, 241, 255)  # #FAF7F1 brand background

BANNER = ROOT / "upload/pasted_image_1794222323561.png"
ICON = ROOT / "src/app/icon.png"

# ---------------------------------------------------------------- OG image
banner = Image.open(BANNER).convert("RGB")
w, h = banner.size
target_ratio = 1200 / 630
new_h = round(w / target_ratio)
if new_h <= h:
    top = (h - new_h) // 2
    og = banner.crop((0, top, w, top + new_h))
else:
    new_w = round(h * target_ratio)
    left = (w - new_w) // 2
    og = banner.crop((left, 0, left + new_w, h))
og = og.resize((1200, 630), Image.LANCZOS)
og_path = ROOT / "public/images/og-image.jpg"
og.save(og_path, "JPEG", quality=88, optimize=True, progressive=True)
print(f"og-image.jpg        {og.size}  {og_path.stat().st_size/1024:.0f} KB")

# ------------------------------------------------------------- favicon set
mark = Image.open(ICON).convert("RGBA")

ico_path = ROOT / "src/app/favicon.ico"
mark.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
print(f"favicon.ico         sizes 16/32/48  {ico_path.stat().st_size/1024:.0f} KB")

apple = Image.new("RGBA", (180, 180), IVORY)
m180 = mark.resize((150, 150), Image.LANCZOS)
apple.paste(m180, (15, 15), m180)
apple_path = ROOT / "src/app/apple-icon.png"
apple.convert("RGB").save(apple_path, "PNG", optimize=True)
print(f"apple-icon.png      180x180  {apple_path.stat().st_size/1024:.0f} KB")

fav64 = ROOT / "public/favicon.png"
mark.resize((64, 64), Image.LANCZOS).save(fav64, "PNG", optimize=True)
print(f"favicon.png         64x64  {fav64.stat().st_size/1024:.0f} KB")

# ------------------------------------------------- compress IG jpgs (in place)
total_before = total_after = 0
for jpg in sorted((ROOT / "public/images/ig").glob("*.jpg")):
    before = jpg.stat().st_size
    im = Image.open(jpg).convert("RGB")
    im.save(jpg, "JPEG", quality=82, optimize=True, progressive=True)
    after = jpg.stat().st_size
    total_before += before
    total_after += after
    print(f"{jpg.name:<24} {before/1024:6.0f} -> {after/1024:6.0f} KB  ({im.size[0]}x{im.size[1]})")

print(f"{'TOTAL':<24} {total_before/1024:6.0f} -> {total_after/1024:6.0f} KB  "
      f"({100 - total_after*100/total_before:.0f}% saved)")
