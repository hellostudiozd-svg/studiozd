/**
 * Page banners (heroes) that the studio can replace without touching code.
 *
 * Drop a photo into new-hero-photos/<folder>/ and push. The GitHub Action runs
 * scripts/publish-hero-photos.mjs, which records it in heroUploads.js, and the
 * pages below use it as their banner on every screen size.
 *
 * This is SEPARATE from new-photos/: a hero photo changes only the banner, and
 * a gallery photo never changes a banner.
 */

import heroUploads from './heroUploads.js';

/**
 * Folder name in new-hero-photos/ → the banners it replaces.
 *   work    — category id in works.js → /works/<segment>
 *   service — slug in services.js     → /services/<slug>
 *   page    — a top-level page        → /works or /services
 */
export const HERO_FOLDERS = {
  weddings: { noun: 'Wedding', work: 'wedding', service: 'wedding-photography' },
  bridal: { noun: 'Bridal portrait', work: 'bridal' },
  'pre-weddings': { noun: 'Pre-wedding', work: 'pre-wedding', service: 'pre-wedding-photography' },
  engagements: { noun: 'Engagement', work: 'engagement', service: 'engagement-photography' },
  receptions: { noun: 'Reception', work: 'reception', service: 'event-photography' },
  portraits: { noun: 'Portrait', work: 'portrait', service: 'portrait-photography' },
  'baby-family': { noun: 'Baby and family', work: 'baby', service: 'baby-family-photography' },
  maternity: { noun: 'Maternity', work: 'maternity', service: 'maternity-photography' },
  product: { noun: 'Product', work: 'product', service: 'product-photography' },
  commercial: { noun: 'Commercial', work: 'commercial', service: 'commercial-photography' },
  'cinematic-films': { noun: 'Cinematic film', service: 'cinematic-films' },
  reels: { noun: 'Reel', service: 'reels' },
  'custom-photography': { noun: 'Custom photography', service: 'custom-photography' },
  'all-works': { noun: 'Portfolio', page: 'works' },
  'services-page': { noun: 'Photography', page: 'services' },
};

const toHero = (upload) =>
  upload ? { src: `/assets/images/heroes/${upload.file}`, alt: upload.alt } : null;

const find = (key, value) => {
  const folder = Object.keys(HERO_FOLDERS).find((name) => HERO_FOLDERS[name][key] === value);
  return folder ? toHero(heroUploads[folder]) : null;
};

/** Uploaded banner for a works category page, or null to keep the default. */
export const heroForWorkCategory = (categoryId) => find('work', categoryId);

/** Uploaded banner for a service page, or null to keep the default. */
export const heroForService = (slug) => find('service', slug);

/** Uploaded banner for /works or /services, or null to keep the default. */
export const heroForPage = (page) => find('page', page);
