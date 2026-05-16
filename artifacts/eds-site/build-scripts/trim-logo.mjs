import { readFileSync, writeFileSync, statSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, "..", "public");
const SRC = resolve(PUBLIC, "logo.png");
const OUT_PNG = resolve(PUBLIC, "logo.png");
const OUT_WEBP = resolve(PUBLIC, "logo.webp");
const MAX_DIMENSION = 512;

const before = sharp(readFileSync(SRC));
const beforeMeta = await before.metadata();
const beforeSize = statSync(SRC).size;
console.log(`[trim-logo] before: ${beforeMeta.width}x${beforeMeta.height} · ${(beforeSize / 1024).toFixed(0)} KB`);

const trimmed = sharp(readFileSync(SRC)).trim({ threshold: 10 });
const trimmedMeta = await trimmed.metadata();

const scale = trimmedMeta.width && trimmedMeta.height
  ? Math.min(MAX_DIMENSION / Math.max(trimmedMeta.width, trimmedMeta.height), 1)
  : 1;

const pngBuffer = await sharp(readFileSync(SRC))
  .trim({ threshold: 10 })
  .resize({
    width: Math.round((trimmedMeta.width ?? MAX_DIMENSION) * scale),
    withoutEnlargement: true,
  })
  .png({ compressionLevel: 9, palette: false })
  .toBuffer();

const webpBuffer = await sharp(readFileSync(SRC))
  .trim({ threshold: 10 })
  .resize({
    width: Math.round((trimmedMeta.width ?? MAX_DIMENSION) * scale),
    withoutEnlargement: true,
  })
  .webp({ quality: 92, effort: 6 })
  .toBuffer();

writeFileSync(OUT_PNG, pngBuffer);
writeFileSync(OUT_WEBP, webpBuffer);

const finalMeta = await sharp(pngBuffer).metadata();
console.log(`[trim-logo] after:  ${finalMeta.width}x${finalMeta.height} · png ${(pngBuffer.length / 1024).toFixed(0)} KB · webp ${(webpBuffer.length / 1024).toFixed(0)} KB`);
console.log(`[trim-logo] saved to ${OUT_PNG} and ${OUT_WEBP}`);
