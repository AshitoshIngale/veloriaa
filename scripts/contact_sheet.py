"""Build a labeled contact sheet of all IG images for quick visual audit."""
from PIL import Image, ImageDraw
import glob, os

SRC = "/home/z/my-project/public/images/ig"
OUT = "/tmp/contact-sheet.jpg"

files = sorted(glob.glob(os.path.join(SRC, "post-*.jpg")))
cell, cols = 220, 6
rows = (len(files) + cols - 1) // cols
sheet = Image.new("RGB", (cols * cell, rows * (cell + 18)), "white")
draw = ImageDraw.Draw(sheet)

for i, f in enumerate(files):
    im = Image.open(f).convert("RGB")
    im.thumbnail((cell - 8, cell - 8))
    x = (i % cols) * cell
    y = (i // cols) * (cell + 18)
    sheet.paste(im, (x + (cell - im.width) // 2, y + (cell - im.height) // 2))
    draw.text((x + 6, y + cell + 2), os.path.basename(f), fill="black")

sheet.save(OUT, quality=82)
print(OUT, len(files), "images", sheet.size)
