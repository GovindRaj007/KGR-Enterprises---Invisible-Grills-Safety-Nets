/**
 * Normalizes internal links to ensure they are canonical
 * - Removes trailing slashes
 * - Removes query parameters
 * - Removes hash fragments
 * - Normalizes location names
 * @param path The path to normalize
 * @returns Normalized path
 */
export function normalizeInternalLink(path: string): string {
  // Remove query parameters and hash fragments
  const cleanPath = path.split('?')[0].split('#')[0];
  
  // Remove trailing slashes except for root
  if (cleanPath === '/') return cleanPath;
  return cleanPath.replace(/\/+$/, '');
}

/**
 * Normalizes location names for URLs
 * @param location Location name to normalize
 * @returns Normalized location name
 */
export function normalizeLocationName(location: string): string {
  return location.toLowerCase().replace(/[^a-z]/g, '');
}