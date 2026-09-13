/**
 * Home page hero photography — shown as a full-bleed grid beneath the
 * wordmark.
 *
 * These are Polaroid scans with the white border part of the image, all at
 * roughly 0.82 portrait. The grid gives every cell that exact aspect, so the
 * photos are never cropped and the borders stay intact. Adding a photo of a
 * different shape will crop to fill rather than distort.
 *
 * Add one by dropping the file into `public/` and appending an entry here;
 * the grid reflows to whatever the list holds.
 */
export interface HeroImage {
  src: string
  alt: string
  /** CSS object-position, for keeping the subject in frame if it is cropped. */
  position?: string
}

/** Natural aspect of the Polaroid scans, used for the grid cells. */
export const HERO_ASPECT = 0.822

export const heroImages: HeroImage[] = [
  { src: '/hero-pic.jpg', alt: 'A vintage patterned cardigan from the collection' },
  { src: '/img_4051.jpg', alt: 'A vintage piece from the collection' },
  { src: '/img_4052.jpg', alt: 'A vintage piece from the collection' },
  { src: '/img_4053.jpg', alt: 'A vintage piece from the collection' },
]
