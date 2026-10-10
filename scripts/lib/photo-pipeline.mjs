/**
 * Shared photo processing for the drop-in publishing scripts
 * (publish-new-photos.mjs and publish-hero-photos.mjs).
 */

import { access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

/** Must match RESPONSIVE_WIDTHS in src/utils/images.js. */
const WIDTHS = [480, 640, 960, 1280, 1600, 1920];

/** Must match RATIO_DIMENSIONS in src/data/works.js. */
const RATIOS = [
  ['1/1', 1], ['4/5', 0.8], ['3/4', 0.75], ['2/3', 0.667],
  ['4/3', 1.333], ['3/2', 1.5], ['16/9', 1.778], ['21/9', 2.333],
];

export const SOURCE_EXT = /\.(jpe?g|png|webp|avif|tiff?|heic|heif)$/i;

export const exists = async (file) => {
  try {
    await access(file, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

export const slugify = (name) =>
  name
    .replace(SOURCE_EXT, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const nearestRatio = (width, height) => {
  const actual = width / height;
  let best = RATIOS[0];
  for (const entry of RATIOS) {
    if (Math.abs(entry[1] - actual) < Math.abs(best[1] - actual)) best = entry;
  }
  return best[0];
};

/** Camera-style names (IMG_1234, DSC01234, 20261009_101112…) say nothing about the photo. */
const isCameraName = (slug) =>
  /^(img|dsc|dscn|dji|pxl|photo|image|whatsapp-image|screenshot)?[-\d]*$/.test(slug) ||
  /^(img|dsc|dscn|dji|pxl)-?\d/.test(slug) ||
  /^whatsapp-image/.test(slug);

export const altFrom = (slug, noun) => {
  if (isCameraName(slug)) return `${noun} photograph by Studioz D`;
  const words = slug.replace(/-/g, ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
};

/** Never overwrite an existing photograph — add -2, -3… instead. */
const uniqueSlug = async (outDir, base) => {
  let slug = base;
  let n = 2;
  while (await exists(path.join(outDir, `${slug}.webp`))) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
};

/**
 * Writes `<slug>.webp` plus the full responsive ladder (WebP + AVIF, 480 →
 * 1920) into `outDir`. Every rung is required (see checkVariants in
 * generate-images.mjs); rungs wider than the photo are written at its native
 * width — never upscaled.
 */
export const writeLadder = async (file, outDir, baseSlug) => {
  const slug = await uniqueSlug(outDir, baseSlug);

  const image = sharp(file, { failOn: 'none' }).rotate(); // honour EXIF orientation
  const meta = await image.metadata();
  // Width/height after EXIF rotation.
  const swap = (meta.orientation ?? 1) >= 5;
  const width = (swap ? meta.height : meta.width) ?? 0;
  const height = (swap ? meta.width : meta.height) ?? 0;
  if (!width || !height) throw new Error(`could not read dimensions of ${path.basename(file)}`);

  await image
    .clone()
    .resize({ width: Math.min(width, 1920), withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(outDir, `${slug}.webp`));

  for (const target of WIDTHS) {
    const resized = image.clone().resize({ width: Math.min(target, width), withoutEnlargement: true });
    await resized.clone().webp({ quality: 80 }).toFile(path.join(outDir, `${slug}-${target}.webp`));
    await resized.clone().avif({ quality: 62 }).toFile(path.join(outDir, `${slug}-${target}.avif`));
  }

  return { file: `${slug}.webp`, width, height, aspect: nearestRatio(width, height) };
};
