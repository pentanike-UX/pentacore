/**
 * partner_4, 10, 11, 12 — 모서리 단색 배경을 알파로 제거 (일회성·재실행 가능)
 * 사용: node scripts/remove-partner-solid-bg.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const partnersDir = path.join(__dirname, "../public/about/partners");
const INDICES = [4, 10, 11, 12];
const TOLERANCE = 42;

function idx(x, y, w, channels) {
  return (y * w + x) * channels;
}

async function processOne(n) {
  const filepath = path.join(partnersDir, `partner_${n}.png`);
  const input = sharp(filepath);
  const { data, info } = await input.ensureAlpha().raw().toBuffer({
    resolveWithObject: true,
  });
  const w = info.width;
  const h = info.height;
  const ch = info.channels;
  if (ch !== 4) throw new Error(`expected RGBA, got ${ch} channels`);

  const i0 = idx(0, 0, w, ch);
  const bg = { r: data[i0], g: data[i0 + 1], b: data[i0 + 2] };

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = idx(x, y, w, ch);
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const d = Math.max(
        Math.abs(r - bg.r),
        Math.abs(g - bg.g),
        Math.abs(b - bg.b),
      );
      if (d <= TOLERANCE) data[i + 3] = 0;
    }
  }

  const tmp = filepath + ".tmp.png";
  await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(tmp);
  fs.renameSync(tmp, filepath);
  console.log("ok", path.basename(filepath), `${w}x${h}`);
}

for (const n of INDICES) {
  await processOne(n);
}
