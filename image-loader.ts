export default function customImageLoader({ src }: { src: string }) {
  return src.startsWith('/') ? src : `/${src}`
}