import { createHash } from 'crypto';

export function generateContentHash(content: unknown): string {
  const hash = createHash('sha256');
  hash.update(JSON.stringify(content));
  return `"${hash.digest('hex')}"`;
}

export function generateETag(content: unknown, buildId?: string): string {
  const contentHash = generateContentHash(content);
  if (buildId) {
    return `W/"${contentHash}-${buildId}"`;
  }
  return `W/"${contentHash}"`;
}

export function matchETag(requestETag: string | null, generatedETag: string): boolean {
  if (!requestETag) return false;
  
  // Handle multiple ETags in the If-None-Match header
  const etags = requestETag.split(',').map(etag => etag.trim());
  return etags.includes(generatedETag) || etags.includes('*');
}