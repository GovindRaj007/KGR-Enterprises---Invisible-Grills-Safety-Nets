"use client";

// Rendered eagerly and server-side on purpose. The footer carries the site's
// internal link graph (every service and location page), and behind
// `dynamic(..., { ssr: false })` + LazyMount none of those links existed in the
// crawled HTML — leaving all five /locations/ pages orphaned.
import Footer from './Footer';

export default function FooterClient() {
  return <Footer />;
}
