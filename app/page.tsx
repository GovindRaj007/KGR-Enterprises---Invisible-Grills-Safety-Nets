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
import InvisibleGrillsNearYou from "@/components/home/InvisibleGrillsNearYou";
import { INVISIBLE_GRILL_PRICE } from "@/lib/local-seo-content";
import { PRIMARY } from "@/constants/contacts";

// Leads with the exact phrase people search ("invisible grills in bangalore")
// and names the other service cities, so the home page also ranks for them.
const TITLE = "Invisible Grills in Bangalore, Hyderabad & Chennai | KGR";
const DESCRIPTION =
  `Invisible grills near you in Bangalore, Hyderabad, Chennai, Vijayawada & Vizag. SS316 grills from ₹${INVISIBLE_GRILL_PRICE.from}/sq ft, 15-yr warranty. Free site visit.`;

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
      "Professional invisible grill installation and safety nets in Bangalore, Hyderabad, Chennai and Andhra Pradesh. SS316 marine-grade grills, pigeon nets and child-safe balcony protection.",
    url: "https://invisiblegrillsandsafetynets.in/",
    siteName: "KGR Enterprises",
    images: [
      {
        url: "/images/invisible-grill-1.jpg",
        width: 1200,
        height: 630,
        alt: "Invisible grills installed on an apartment balcony in Bangalore - KGR Enterprises",
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
      "Invisible grill installation and safety nets in Bangalore, Hyderabad, Chennai, Vijayawada and Visakhapatnam. SS316 grills and pigeon net solutions.",
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
      "Invisible grills are high-tensile stainless steel cable systems that protect balconies and windows without blocking your view. Our installations in Bangalore, Hyderabad, Chennai and Andhra Pradesh use marine-grade SS316 cable for long-lasting, rust-free performance.",
  },
  {
    question: "Are invisible grills safe?",
    answer:
      "Yes — when professionally installed they offer child safety, pet safety, and effective pigeon prevention without obstructing airflow or visibility.",
  },
  {
    question: "What is the cost of invisible grills in Bangalore?",
    answer:
      `Invisible grills in Bangalore start from ₹${INVISIBLE_GRILL_PRICE.from} per sq ft and usually cost ₹${INVISIBLE_GRILL_PRICE.from}–₹${INVISIBLE_GRILL_PRICE.to} per sq ft including installation, depending on cable grade (SS316 or SS304), thickness, spacing and area. The same pricing applies in Hyderabad, Chennai, Vijayawada and Visakhapatnam. Site inspection and quote are free.`,
  },
  {
    question: "Where can I find invisible grills near me?",
    answer:
      `KGR Enterprises has local installation teams in Bangalore, Hyderabad, Chennai, Vijayawada and Visakhapatnam, covering areas such as Whitefield, Electronic City, HSR Layout, Gachibowli, Kukatpally, OMR, Velachery, Benz Circle and MVP Colony. Call ${PRIMARY.display.trim()} for a free site visit, usually the same or next day.`,
  },
  {
    question: "How long does invisible grill installation take?",
    answer:
      "A typical apartment balcony takes 4–6 hours. There is no welding — aluminium tracks are anchored and the stainless steel cables are tensioned by hand — so the work is clean and quick.",
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
      <InvisibleGrillsNearYou />
      <section id="faq" className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Frequently Asked Questions About Invisible Grills in Bangalore, Hyderabad & Chennai</h2>
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
