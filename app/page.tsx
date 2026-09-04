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

const TITLE = "Invisible Grills & Safety Nets in Bangalore | KGR Enterprises";
const DESCRIPTION =
  "Invisible grill and safety net installation in Bangalore, Hyderabad, Chennai, Vijayawada and Visakhapatnam. Marine-grade SS316 grills and pigeon nets.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://invisiblegrillsandsafetynets.in/",
  },
  openGraph: {
    locale: "en_IN",
    type: "website",
    title: TITLE,
    description:
      "Professional invisible grill installation and safety nets in Bangalore and across South India. Marine-grade stainless steel grills, pigeon nets, and child-safe balcony protection.",
    url: "https://invisiblegrillsandsafetynets.in/",
    siteName: "KGR Enterprises",
    images: [
      {
        url: "/images/invisible-grill-1.jpg",
        width: 1200,
        height: 630,
        alt: "Invisible Grills in Bangalore - KGR Enterprises",
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
    title: TITLE,
    description:
      "Invisible grill installation and safety nets in Bangalore, Hyderabad, Chennai and nearby cities. SS316 grills and pigeon net solutions.",
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

// Single source for the FAQ: rendered as <details> below and emitted as
// FAQPage JSON-LD, so the markup and the structured data can never drift.
const homeFaqs = [
  {
    question: "What are invisible grills?",
    answer:
      "Invisible grills are high-tensile stainless steel cable systems that protect balconies and windows without blocking your view. Our Bangalore installations use marine-grade SS316 cable for long-lasting performance.",
  },
  {
    question: "Are invisible grills safe?",
    answer:
      "Yes — when professionally installed they offer child safety, pet safety, and effective pigeon prevention without obstructing airflow or visibility.",
  },
  {
    question: "How much do invisible grills cost?",
    answer:
      "Cost depends on size, material (SS316 or SS304), and location. We provide free site visits and transparent quotes across Bangalore, Hyderabad, Chennai, Vijayawada and Visakhapatnam.",
  },
  {
    question: "Why choose invisible grills?",
    answer:
      "They combine strength and aesthetics — our teams are trained installers with warranty-backed work, making us a trusted invisible grill company serving Bangalore and nearby cities.",
  },
  {
    question: "Do invisible grills prevent pigeons?",
    answer:
      "Yes. Coupled with pigeon nets and humane bird control, invisible grills are effective at preventing pigeons from nesting on balconies and ledges.",
  },
  {
    question: "Can invisible grills protect children?",
    answer:
      "Absolutely — our installations prioritise child safety and meet robust strength and mounting standards to prevent falls and accidents.",
  },
  {
    question: "Which cities do you serve?",
    answer:
      "We serve Bangalore, Hyderabad, Chennai, Vijayawada and Visakhapatnam with professional invisible grill installation and safety net services.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://invisiblegrillsandsafetynets.in/#faq",
  mainEntity: homeFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
  inLanguage: "en-IN",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Invisible Grills in Bangalore — FAQ</h2>
        <div className="space-y-3">
          {homeFaqs.map((faq) => (
            <details key={faq.question} className="bg-white/5 p-4 rounded">
              <summary className="font-semibold">{faq.question}</summary>
              <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <TestimonialsClient />
    </>
  );
}
