/**
 * Drop-in photo publishing.
 *
 * Lets the studio add photographs WITHOUT touching code:
 *
 *   1. Put a photo into a category folder, e.g. new-photos/weddings/
 *   2. Push to GitHub.
 *
 * The GitHub Action in `.github/workflows/publish-new-photos.yml` then runs
 * this script, which, for every photo waiting in `new-photos/<folder>/`:
 *
 *   - writes the full responsive ladder (WebP + AVIF, 480 → 1920) into
 *     public/assets/images/works/, exactly like `npm run photos`
 *   - adds an entry at the TOP of src/data/uploads.js, so the newest photo
 *     is the first frame in its category gallery and on its service page
 *   - removes the original from new-photos/
 *
 * The Action commits the result, and Cloudflare deploys that commit.
 *
 * Alt text is taken from the filename: `bride-at-the-temple.jpg` becomes
 * "Bride at the temple". A camera name like `IMG_3948.jpg` falls back to the
 * category, e.g. "Wedding photograph by Studioz D".
 *
 * Run locally with: npm run publish-photos
 */

import { mkdir, readdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { SOURCE_EXT, exists, slugify, altFrom, writeLadder } from './lib/photo-pipeline.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const INBOX = path.join(ROOT, 'new-photos');
const OUT_DIR = path.join(ROOT, 'public', 'assets', 'images', 'works');
const MANIFEST = path.join(ROOT, 'src', 'data', 'uploads.js');

/** Folder name in new-photos/ → work category id in src/data/works.js. */
export const FOLDERS = {
  weddings: { id: 'wedding', noun: 'Wedding' },
  bridal: { id: 'bridal', noun: 'Bridal portrait' },
  groom: { id: 'groom', noun: 'Groom portrait' },
  'pre-weddings': { id: 'pre-wedding', noun: 'Pre-wedding' },
  engagements: { id: 'engagement', noun: 'Engagement' },
  receptions: { id: 'reception', noun: 'Reception' },
  portraits: { id: 'portrait', noun: 'Portrait' },
  couples: { id: 'couples', noun: 'Couple portrait' },
  'baby-family': { id: 'baby', noun: 'Baby and family' },
  maternity: { id: 'maternity', noun: 'Maternity' },
  product: { id: 'product', noun: 'Product' },
  commercial: { id: 'commercial', noun: 'Commercial' },
};

const publishOne = async (file, info) => {
  const base = slugify(path.basename(file)) || 'photo';
  const named = base.startsWith(info.id) ? base : `${info.id}-${base}`;
  const photo = await writeLadder(file, OUT_DIR, `studioz-d-${named}`);

  return {
    file: photo.file,
    category: info.id,
    aspect: photo.aspect,
    alt: altFrom(base, info.noun),
    addedAt: new Date().toISOString(),
  };
};

const MANIFEST_HEADER = `/**
 * Photos added through the new-photos/ folder, newest first.
 *
 * WRITTEN AUTOMATICALLY by scripts/publish-new-photos.mjs — do not edit by
 * hand unless you are removing a photo. To remove one, delete its entry here
 * and its files in public/assets/images/works/.
 */
`;

const run = async () => {
  if (!(await exists(INBOX))) {
    console.log('No new-photos/ folder — nothing to publish.');
    return;
  }

  await mkdir(OUT_DIR, { recursive: true });
  const manifest = (await exists(MANIFEST))
    ? (await import(`${pathToFileURL(MANIFEST).href}?t=${Date.now()}`)).default
    : [];
  const added = [];

  const folders = await readdir(INBOX, { withFileTypes: true });
  for (const entry of folders) {
    if (!entry.isDirectory()) continue;
    const info = FOLDERS[entry.name];
    const dir = path.join(INBOX, entry.name);
    const files = (await readdir(dir)).filter((f) => SOURCE_EXT.test(f)).sort();

    if (!info) {
      if (files.length) {
        console.warn(`  ! new-photos/${entry.name}/ is not a known category — skipped.`);
        console.warn(`    Use one of: ${Object.keys(FOLDERS).join(', ')}`);
      }
      continue;
    }

    for (const name of files) {
      const file = path.join(dir, name);
      try {
        const record = await publishOne(file, info);
        added.push(record);
        await rm(file);
        console.log(`  ✓ new-photos/${entry.name}/${name}  →  ${record.file} (${record.aspect})`);
      } catch (error) {
        console.error(`  ✗ new-photos/${entry.name}/${name}: ${error.message}`);
        process.exitCode = 1;
      }
    }
  }

  if (added.length === 0) {
    console.log('No new photos to publish.');
    return;
  }

  // Newest first. Within one push, keep the folder's alphabetical order.
  const next = [...added, ...manifest];
  await writeFile(
    MANIFEST,
    `${MANIFEST_HEADER}export const uploads = ${JSON.stringify(next, null, 2)};\n\nexport default uploads;\n`,
    'utf8'
  );
  console.log(`\n${added.length} photo(s) published to the top of their galleries.`);
};

run().catch((error) => {
  console.error('Publishing new photos failed:', error);
  process.exitCode = 1;
});
