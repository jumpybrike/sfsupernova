/**
 * Image URL Utilities
 * Centralized image path construction for CDN integration
 */

const CDN_BASE_URL = process.env.NEXT_PUBLIC_CDN_BASE_URL || '';

/**
 * Constructs a full image URL from a relative path
 * @param path - Relative path to the image (e.g., 'covers/war-of-worlds.jpg')
 * @returns Full URL to the CDN image
 */
export function getCdnImageUrl(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // If path is already a full URL (http:// or https://), return as-is
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
    return cleanPath;
  }

  // Construct CDN URL
  return `${CDN_BASE_URL}/${cleanPath}`;
}

/**
 * Constructs a cover image URL from a book ID
 * @param bookId - Book identifier (e.g., 'war-of-worlds')
 * @param extension - Image file extension (default: 'jpg')
 * @returns Full URL to the cover image
 */
export function getCoverImageUrl(bookId: string, extension: string = 'jpg'): string {
  return getCdnImageUrl(`covers/${bookId}.${extension}`);
}

/**
 * Constructs a gallery image URL from a catalog number
 * @param catalogNumber - Image catalog number (e.g., 'SCI-FI-1926-001')
 * @param extension - Image file extension (default: 'jpg')
 * @returns Full URL to the gallery image
 */
export function getGalleryImageUrl(catalogNumber: string, extension: string = 'jpg'): string {
  return getCdnImageUrl(`gallery/${catalogNumber}.${extension}`);
}

/**
 * Constructs a logo URL from a variant name
 * @param variant - Logo variant (e.g., 'logo-full', 'logo-compact')
 * @param extension - Image file extension (default: 'svg')
 * @returns Full URL to the logo
 */
export function getLogoUrl(variant: string, extension: string = 'svg'): string {
  return getCdnImageUrl(`logo/${variant}.${extension}`);
}

/**
 * Gets the CDN base URL
 * @returns The configured CDN base URL
 */
export function getCdnBaseUrl(): string {
  return CDN_BASE_URL;
}
