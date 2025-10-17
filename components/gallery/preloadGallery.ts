// Preload the gallery client/module so navigation to /gallery is faster.
// This warms the module cache by starting the dynamic import used by the GalleryClient.
export default function preloadGallery() {
  // Import the same module path used by GalleryClient's dynamic import.
  // We intentionally don't await — we just start the network/load.
  void import('./GallerySection');
}
