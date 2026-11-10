"""Compose a 4:5 portrait hero asset from the square iPhone photo.

The source (post-21-1.jpg) is 1080x1080. A portrait arch frame would
center-crop it and clip the phone/charm, so we extend the top with a
heavily blurred fabric wash (soft bokeh continuation) and keep the full
square photo below it. A gradient-alpha blend hides the seam.
"""
from PIL import Image, ImageFilter, ImageEnhance

SRC = "/home/z/my-project/public/images/ig/post-21-1.jpg"
OUT = "/home/z/my-project/public/images/ig/post-21-1-hero.jpg"

W, H = 1080, 1350          # 4:5 portrait
TOP = 270                  # blurred fabric headroom above the photo

im = Image.open(SRC).convert("RGB")
assert im.size == (W, H - TOP), im.size

# --- blurred top wash -------------------------------------------------------
strip = im.crop((0, 0, W, 72)).resize((W, TOP * 2))
strip = strip.filter(ImageFilter.GaussianBlur(64))
strip = ImageEnhance.Brightness(strip).enhance(1.03)
strip = strip.resize((W, TOP))

canvas = Image.new("RGB", (W, H), (238, 231, 221))
canvas.paste(strip, (0, 0))
canvas.paste(im, (0, TOP))

# --- feather the seam -------------------------------------------------------
BAND = 90
seam_box = (0, TOP - BAND // 2, W, TOP + BAND // 2)
seam = canvas.crop(seam_box).filter(ImageFilter.GaussianBlur(16))
mask = Image.new("L", (W, BAND), 0)
px = mask.load()
for y in range(BAND):
    d = abs(y - BAND // 2) / (BAND / 2)
    v = int(200 * (1 - d))
    for x in range(W):
        px[x, y] = v
canvas.paste(seam, seam_box[:2], mask)

canvas.save(OUT, quality=90)
print("saved", OUT, canvas.size)
