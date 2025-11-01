export const BASE_URL = 'https://invisiblegrillsandsafetynets.in';

export function getCanonicalUrl(path: string = ''): string {
  // Remove hash fragments and query parameters
  const pathWithoutFragments = path.split('#')[0].split('?')[0];
  // Remove any trailing slashes
  const cleanPath = pathWithoutFragments.replace(/\/+$/, '');
  // Ensure path starts with a slash if it's not empty
  const normalizedPath = cleanPath ? (cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`) : '';
  // Combine base URL with path
  return `${BASE_URL}${normalizedPath}`;
}