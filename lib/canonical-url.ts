export const BASE_URL = 'https://invisiblegrillsandsafetynets.in';

export function getCanonicalUrl(path: string = ''): string {
  // Remove hash fragments and query parameters
  const pathWithoutFragments = path.split('#')[0].split('?')[0];
  // Ensure path starts with a slash if it's not empty
  const normalizedPath = pathWithoutFragments ? (pathWithoutFragments.startsWith('/') ? pathWithoutFragments : `/${pathWithoutFragments}`) : '';
  // Ensure trailing slash (matching trailingSlash: true in next.config.ts)
  const pathWithTrailingSlash = normalizedPath ? (normalizedPath.endsWith('/') ? normalizedPath : `${normalizedPath}/`) : '';
  // Combine base URL with path
  return `${BASE_URL}${pathWithTrailingSlash}`;
}