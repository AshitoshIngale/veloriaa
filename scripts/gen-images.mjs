import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const outDir = '/home/z/my-project/public/images';
fs.mkdirSync(outDir, { recursive: true });

const STYLE =
  'editorial minimal product photography, warm ivory cream and soft beige tones, gentle diffused natural window light, muted earthy palette, premium craft brand aesthetic, clean uncluttered composition, shallow depth of field, photorealistic, high quality, no text, no words, no logos, no watermark';

const jobs = [
  {
    file: 'hero.png',
    size: '864x1152',
    prompt:
      'elegant female hands pouring melted golden candle wax from a metal pitcher into an amber glass jar on a linen covered wooden table, dried pampas grass nearby, warm cozy atmosphere, ' +
      STYLE,
  },
  {
    file: 'product-candle.png',
    size: '1024x1024',
    prompt:
      'flat lay of a DIY candle making kit: soy wax flakes in a kraft paper pouch, amber glass jars, cotton wicks, wooden stirring stick, small brass scissors and kraft labels neatly arranged on warm beige linen fabric, ' +
      STYLE,
  },
  {
    file: 'product-pottery.png',
    size: '1024x1024',
    prompt:
      'air dry clay pottery starter kit: smooth white clay block, wooden sculpting tools, a small unfinished ceramic bowl and rolling pin arranged on a warm beige linen cloth, ' +
      STYLE,
  },
  {
    file: 'product-macrame.png',
    size: '1024x1024',
    prompt:
      'macrame wall hanging craft kit: natural cotton cord bundles, a wooden dowel with a half woven macrame knot pattern, small wooden comb and scissors on a warm beige linen surface, ' +
      STYLE,
  },
  {
    file: 'product-embroidery.png',
    size: '1024x1024',
    prompt:
      'embroidery starter kit: wooden embroidery hoop with linen fabric and a partially stitched botanical leaf pattern in muted terracotta and sage thread, needle and thread spools beside it on warm beige linen, ' +
      STYLE,
  },
  {
    file: 'product-soap.png',
    size: '1024x1024',
    prompt:
      'DIY soap making kit: pale cream soap bars, dried lavender sprigs, a glass bottle of essential oil, kraft paper molds and a small metal whisk arranged on warm beige linen fabric, ' +
      STYLE,
  },
  {
    file: 'product-planter.png',
    size: '1024x1024',
    prompt:
      'terracotta plant pot painting kit: three small unpainted terracotta pots, clay paint dishes in muted sage cream and blush tones, paint brushes and a small eucalyptus sprig on warm beige linen, ' +
      STYLE,
  },
  {
    file: 'story.png',
    size: '1344x768',
    prompt:
      'overhead view of a warm sunlit craft workshop table with several pairs of hands making things together: candle jars, clay bowls, embroidery hoops, dried flowers, spools of thread on beige linen, cozy communal atmosphere, ' +
      STYLE,
  },
  {
    file: 'featured.png',
    size: '864x1152',
    prompt:
      'an open premium kraft gift box revealing a beautifully organized craft kit with wax supplies, small glass jars, tools wrapped in tissue paper, tied with natural twine and a dried flower sprig, on a beige linen background, ' +
      STYLE,
  },
];

async function generate(zai, job, attempt = 1) {
  try {
    const response = await zai.images.generations.create({
      prompt: job.prompt,
      size: job.size,
    });
    const base64 = response?.data?.[0]?.base64;
    if (!base64) throw new Error('empty response');
    const buffer = Buffer.from(base64, 'base64');
    if (buffer.length < 20000) throw new Error('image too small, likely failed');
    fs.writeFileSync(path.join(outDir, job.file), buffer);
    console.log(`OK ${job.file} (${Math.round(buffer.length / 1024)} KB)`);
    return true;
  } catch (err) {
    console.error(`FAIL ${job.file} attempt ${attempt}: ${err.message}`);
    if (attempt < 3) {
      await new Promise((r) => setTimeout(r, 4000 * attempt));
      return generate(zai, job, attempt + 1);
    }
    return false;
  }
}

async function main() {
  const zai = await ZAI.create();
  const queue = [...jobs];
  const results = [];
  const CONCURRENCY = 3;

  async function worker(wid) {
    while (queue.length > 0) {
      const job = queue.shift();
      if (!job) break;
      const ok = await generate(zai, job);
      results.push({ file: job.file, ok });
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, (_, i) => worker(i)));

  const failed = results.filter((r) => !r.ok);
  console.log(`DONE. success=${results.length - failed.length}/${results.length}`);
  if (failed.length) {
    console.log('FAILED:', failed.map((f) => f.file).join(', '));
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error('FATAL', e);
  process.exit(1);
});
