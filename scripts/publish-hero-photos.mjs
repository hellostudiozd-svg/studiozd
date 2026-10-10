/**
 * Drop-in hero (banner) publishing.
 *
 * The banner twin of publish-new-photos.mjs:
 *
 *   1. Put a photo into new-hero-photos/<folder>/, e.g. new-hero-photos/weddings/
 *   2. Push to GitHub.
 *
 * The GitHub Action in `.github/workflows/publish-hero-photos.yml` then runs
 * this script, which, for every photo waiting there:
 *
 *   - writes the full responsive ladder into public/assets/images/heroes/
 *   - records it as that folder's banner in src/data/heroUploads.js
 *     (the newest photo wins; see src/data/heroes.js for which pages use it)
 *   - removes the original from new-hero-photos/
 *
 * The Action commits the result, and Cloudflare deploys that commit.
 *
 * Run locally with: npm run publish-heroes
 */

import { mkdir, readdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { SOURCE_EXT, exists, slugify, altFrom, writeLadder } from './lib/photo-pipeline.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const INBOX = path.join(ROOT, 'new-hero-photos');
const OUT_DIR = path.join(ROOT, 'public', 'assets', 'images', 'heroes');
const MANIFEST = path.join(ROOT, 'src', 'data', 'heroUploads.js');

const load = async (file) => import(`${pathToFileURL(file).href}?t=${Date.now()}`);

const MANIFEST_HEADER = `/**
 * Hero (banner) photos added through the new-hero-photos/ folder — the latest
 * one per folder.
 *
 * WRITTEN AUTOMATICALLY by scripts/publish-hero-photos.mjs — do not edit by
 * hand. To go back to the original banner, delete that folder's entry here.
 */
`;

const run = async () => {
  if (!(await exists(INBOX))) {
    console.log('No new-hero-photos/ folder — nothing to publish.');
    return;
  }

  const { HERO_FOLDERS } = await load(path.join(ROOT, 'src', 'data', 'heroes.js'));
  const manifest = (await exists(MANIFEST)) ? { ...(await load(MANIFEST)).default } : {};
  await mkdir(OUT_DIR, { recursive: true });
  let published = 0;

  const folders = await readdir(INBOX, { withFileTypes: true });
  for (const entry of folders) {
    if (!entry.isDirectory()) continue;
    const info = HERO_FOLDERS[entry.name];
    const dir = path.join(INBOX, entry.name);
    const files = (await readdir(dir)).filter((f) => SOURCE_EXT.test(f)).sort();
    if (files.length === 0) continue;

    if (!info) {
      console.warn(`  ! new-hero-photos/${entry.name}/ is not a known folder — skipped.`);
      console.warn(`    Use one of: ${Object.keys(HERO_FOLDERS).join(', ')}`);
      continue;
    }

    // One banner per page: if several photos arrive at once, the last one
    // alphabetically wins and the rest are discarded.
    for (const name of files) {
      const file = path.join(dir, name);
      try {
        const base = slugify(name) || 'banner';
        const photo = await writeLadder(file, OUT_DIR, `studioz-d-hero-${entry.name}-${base}`);
        manifest[entry.name] = {
          file: photo.file,
          aspect: photo.aspect,
          alt: altFrom(base, info.noun),
          addedAt: new Date().toISOString(),
        };
        await rm(file);
        published += 1;
        console.log(`  ✓ new-hero-photos/${entry.name}/${name}  →  ${photo.file} (${photo.aspect})`);
      } catch (error) {
        console.error(`  ✗ new-hero-photos/${entry.name}/${name}: ${error.message}`);
        process.exitCode = 1;
      }
    }
  }

  if (published === 0) {
    console.log('No new hero photos to publish.');
    return;
  }

  await writeFile(
    MANIFEST,
    `${MANIFEST_HEADER}export const heroUploads = ${JSON.stringify(manifest, null, 2)};\n\nexport default heroUploads;\n`,
    'utf8'
  );
  console.log(`\n${published} banner photo(s) published.`);
};

run().catch((error) => {
  console.error('Publishing hero photos failed:', error);
  process.exitCode = 1;
});
