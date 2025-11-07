export default function customImageLoader({ src }: { 
  src: string;
}) {
  // For absolute URLs, return as is
  if (src.startsWith('http')) {
    return src;
  }

  // For static exports, ensure path starts with /
  return src.startsWith('/') ? src : `/${src}`;
}