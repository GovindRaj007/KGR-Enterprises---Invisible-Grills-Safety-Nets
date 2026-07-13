import type { Metadata } from "next";
export const dynamic = 'force-static';
import { HeroSlider } from "@/components/home/HeroSlider";
import HeroWithHeaderWrapper from "@/components/layout/HeroWithHeaderWrapper";
import ServicesSection from "@/components/services/ServicesSection";
import ImageCarouselClient from "@/components/home/ImageCarouselClient";
import AboutClient from "@/components/about/AboutClient";
import GalleryClient from "@/components/gallery/GalleryClient";
import TestimonialsClient from "@/components/testimonials/TestimonialsClient";
import ServiceLocationsSlider from "@/components/services/ServiceLocationsSlider";

export const metadata: Metadata = {
  title: "Invisible Grills Chennai — KGR Enterprises | Premium Invisible Grills & Safety Nets",
  description:
    "Invisible Grills Chennai: professional invisible grill installation and safety nets across Chennai, Bangalore, Hyderabad, Visakhapatnam, Rajahmundry, and Vijayawada. Marine-grade stainless steel grills, pigeon net solutions, and child-safe balcony protection from experienced installers.",
  openGraph: {
    locale: "en_IN",
    type: "website",
    title: "Invisible Grills Chennai — KGR Enterprises",
    description:
      "Professional invisible grill installation and safety nets in Chennai and neighbouring cities. Marine-grade stainless steel grills, pigeon nets, and child-safe balcony protection.",
    url: "https://invisiblegrillsandsafetynets.in/",
    siteName: "KGR Enterprises",
    images: [
      {
        url: "/images/invisible-grill-1.jpg",
        width: 1200,
        height: 630,
        alt: "Invisible Grills Chennai - KGR Enterprises",
        type: "image/jpeg",
      },
      {
        url: "/logo.png",
        width: 300,
        height: 300,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Invisible Grills Chennai — KGR Enterprises",
    description: "Invisible grill installation and safety nets in Chennai, Bangalore, Hyderabad and nearby cities. SS316 grills and pigeon net solutions.",
    images: ["/images/invisible-grill-1.jpg"],
    site: "@Kgr_Grills_Nets",
    creator: "@Kgr_Grills_Nets",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export default function HomePage() {
  return (
    <>
      <HeroWithHeaderWrapper>
        <div style={{ borderRadius: '1rem' }}>
          <HeroSlider />
        </div>
      </HeroWithHeaderWrapper>
      <ImageCarouselClient />
      <ServicesSection />
      <AboutClient />
      <GalleryClient />
      <ServiceLocationsSlider />
      <section id="faq" className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Invisible Grills Chennai — FAQ</h2>
        <div className="space-y-3">
          <details className="bg-white/5 p-4 rounded">
            <summary className="font-semibold">What are Invisible Grills?</summary>
            <p className="mt-2 text-sm text-muted-foreground">Invisible grills are high-tensile stainless steel cable systems that provide discreet protection for balconies and windows while preserving views. Our Chennai installations use marine-grade SS316 cables for long-lasting performance.</p>
          </details>

          <details className="bg-white/5 p-4 rounded">
            <summary className="font-semibold">Are Invisible Grills Safe?</summary>
            <p className="mt-2 text-sm text-muted-foreground">Yes — when professionally installed they offer child safety, pet safety, and effective pigeon prevention without obstructing airflow or visibility.</p>
          </details>

          <details className="bg-white/5 p-4 rounded">
            <summary className="font-semibold">How Much Do Invisible Grills Cost?</summary>
            <p className="mt-2 text-sm text-muted-foreground">Costs depend on size, material (SS316 or SS304), and location. We provide free site visits and transparent quotes for Chennai, Bangalore, Hyderabad, Visakhapatnam, Rajahmundry and Vijayawada.</p>
          </details>

          <details className="bg-white/5 p-4 rounded">
            <summary className="font-semibold">Why Choose Invisible Grills?</summary>
            <p className="mt-2 text-sm text-muted-foreground">They combine strength and aesthetics — our teams are trained installers with warranty-backed work, making us a trusted invisible grill company serving Chennai and nearby cities.</p>
          </details>

          <details className="bg-white/5 p-4 rounded">
            <summary className="font-semibold">Do Invisible Grills Prevent Pigeons?</summary>
            <p className="mt-2 text-sm text-muted-foreground">Yes. Coupled with pigeon nets and humane bird control, invisible grills are effective at preventing pigeons from nesting on balconies and ledges.</p>
          </details>

          <details className="bg-white/5 p-4 rounded">
            <summary className="font-semibold">Can Invisible Grills Protect Children?</summary>
            <p className="mt-2 text-sm text-muted-foreground">Absolutely — our installations prioritize child safety and meet robust strength and mounting standards to prevent falls and accidents.</p>
          </details>

          <details className="bg-white/5 p-4 rounded">
            <summary className="font-semibold">What Cities Do You Serve?</summary>
            <p className="mt-2 text-sm text-muted-foreground">We serve Chennai, Bangalore, Hyderabad, Visakhapatnam, Rajahmundry and Vijayawada with professional invisible grill installation and safety net services.</p>
          </details>
        </div>
      </section>
      <TestimonialsClient />
    </>
  );
}
