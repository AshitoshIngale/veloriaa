/** Contact sheet with labels for all downloaded IG post images. */
import sharp from "sharp";
import fs from "fs";
import path from "path";

const DIR = "/home/z/my-project/public/images/ig";
const OUT = "/tmp/render/contact-sheet.jpg";
fs.mkdirSync(path.dirname(OUT), { recursive: true });

const files = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith(".jpg"))
  .sort((a, b) => {
    const [, pa, sa] = a.match(/post-(\d+)-(\d+)/).map(Number);
    const [, pb, sb] = b.match(/post-(\d+)-(\d+)/).map(Number);
    return pa - pb || sa - sb;
  });

const TW = 240,
  TH = 300,
  COLS = 6,
  LABEL_H = 26;
const rows = Math.ceil(files.length / COLS);
const tiles = [];
for (let i = 0; i < files.length; i++) {
  const img = await sharp(path.join(DIR, files[i]))
    .resize(TW, TH - LABEL_H, { fit: "cover" })
    .toBuffer();
  const [, p, s] = files[i].match(/post-(\d+)-(\d+)/);
  const label = Buffer.from(
    `<svg width="${TW}" height="${LABEL_H}"><rect width="100%" height="100%" fill="#000"/><text x="8" y="19" font-family="sans-serif" font-size="16" fill="#fff">post ${p} - ${s}</text></svg>`
  );
  const x = (i % COLS) * TW,
    y = Math.floor(i / COLS) * TH;
  tiles.push({ input: img, left: x, top: y });
  tiles.push({ input: label, left: x, top: y + TH - LABEL_H });
}
await sharp({
  create: {
    width: COLS * TW,
    height: rows * TH,
    channels: 3,
    background: "#fff",
  },
})
  .composite(tiles)
  .jpeg({ quality: 82 })
  .toFile(OUT);
console.log(files.length, "tiles ->", OUT);
