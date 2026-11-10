/**
 * Download remaining Instagram post images (posts 7-22) from veloriaa_posts.csv
 * CDN links (they expire!), convert to web JPGs, and merge the manifest
 * with the already-downloaded posts 1-6 from veloriaa_image_links.csv.
 */
import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const CSV_PATH = "/home/z/my-project/upload/veloriaa_posts.csv";
const OUT_DIR = "/home/z/my-project/public/images/ig";
const MANIFEST = "/home/z/my-project/scripts/ig-posts.json";

const raw = fs.readFileSync(CSV_PATH, "utf-8").replace(/^\uFEFF/, "");
const rows = parse(raw, { columns: true, skip_empty_lines: true });

fs.mkdirSync(OUT_DIR, { recursive: true });
const existing = fs.existsSync(MANIFEST)
  ? JSON.parse(fs.readFileSync(MANIFEST, "utf-8"))
  : [];
const have = new Set(existing.map((e) => `p${e.post}s${e.slide}`));

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  Referer: "https://www.instagram.com/",
};

let added = 0;
for (const r of rows) {
  const postNo = parseInt(r["Post #"], 10);
  const slideRaw = (r["Slide"] || "").trim();
  const m = slideRaw.match(/(\d+)\s+of\s+(\d+)/);
  const slideIdx = m ? parseInt(m[1], 10) : 1;
  const key = `p${postNo}s${slideIdx}`;
  if (have.has(key)) {
    console.log(`skip ${key} (already downloaded)`);
    continue;
  }
  const url = (r["Image link (direct CDN, expires)"] || "").trim();
  const name = (r["Post name"] || "").trim();
  const postLink = (r["Post link"] || "").trim();
  try {
    const res = await fetch(url, { headers });
    if (!res.ok) {
      console.error(`FAIL ${key}: HTTP ${res.status}`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const out = path.join(OUT_DIR, `post-${postNo}-${slideIdx}.jpg`);
    await sharp(buf).jpeg({ quality: 88, mozjpeg: true }).toFile(out);
    const meta = await sharp(out).metadata();
    existing.push({
      post: postNo,
      slide: slideIdx,
      name,
      postLink,
      file: `post-${postNo}-${slideIdx}.jpg`,
      w: meta.width,
      h: meta.height,
      kb: Math.round(buf.length / 1024),
    });
    have.add(key);
    added++;
    console.log(
      `ok ${key} ${meta.width}x${meta.height} ${Math.round(buf.length / 1024)}KB — ${name}`
    );
  } catch (e) {
    console.error(`ERR ${key}: ${e.message}`);
  }
}

existing.sort((a, b) => a.post - b.post || a.slide - b.slide);
fs.writeFileSync(MANIFEST, JSON.stringify(existing, null, 2));
console.log(`\nAdded ${added}. Manifest now has ${existing.length} entries.`);
