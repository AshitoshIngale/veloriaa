/**
 * Download all Instagram post images from the uploaded CSV and convert
 * HEIC/WEBP to web-ready JPGs in public/images/ig/.
 */
import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const CSV_PATH = "/home/z/my-project/upload/veloriaa_image_links.csv";
const OUT_DIR = "/home/z/my-project/public/images/ig";

const raw = fs.readFileSync(CSV_PATH, "utf-8").replace(/^\uFEFF/, "");
const rows = parse(raw, {
  columns: true,
  skip_empty_lines: true,
});

fs.mkdirSync(OUT_DIR, { recursive: true });

const results = [];
for (const r of rows) {
  const postNo = parseInt(r["Post #"], 10);
  const slideMatch = r["Slide"].match(/(\d+)\s+of\s+(\d+)/);
  const slideIdx = slideMatch ? parseInt(slideMatch[1], 10) : 1;
  const name = (r["Post name"] || "").trim();
  const postLink = (r["Post link"] || "").trim();
  const url = (r["Image link (direct)"] || "").trim();

  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    Referer: "https://www.instagram.com/",
  };

  const res = await fetch(url, { headers });
  if (!res.ok) {
    console.error(`FAIL p${postNo}s${slideIdx}: HTTP ${res.status}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const out = path.join(OUT_DIR, `post-${postNo}-${slideIdx}.jpg`);
  await sharp(buf).jpeg({ quality: 88, mozjpeg: true }).toFile(out);
  const meta = await sharp(out).metadata();
  results.push({ post: postNo, slide: slideIdx, name, postLink, file: `post-${postNo}-${slideIdx}.jpg`, w: meta.width, h: meta.height, kb: Math.round(buf.length / 1024) });
  console.log(`ok p${postNo}s${slideIdx} ${meta.width}x${meta.height} ${Math.round(buf.length / 1024)}KB — ${name}`);
}

fs.writeFileSync(
  "/home/z/my-project/scripts/ig-posts.json",
  JSON.stringify(results, null, 2)
);
console.log(`\nDownloaded ${results.length} images.`);
