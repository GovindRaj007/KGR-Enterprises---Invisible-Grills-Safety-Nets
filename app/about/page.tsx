import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import HeroWithHeaderWrapper from "@/components/layout/HeroWithHeaderWrapper";
import AboutSection from "@/components/about/AboutSection";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About Us - 15+ Years Experience in Safety Solutions",
  description: "KGR Enterprises has 15+ years of experience in invisible grills and safety nets installation. Certified team, 5000+ happy customers across Hyderabad, Bangalore, Chennai.",
  alternates: {
    canonical: 'https://invisiblegrillsandsafetynets.in/about',
  },
  keywords: [
    // Brand & Company Identity
    "KGR Enterprises",
    "safety experts since 2008",
    "15 years experience",
    "family-owned business",
    // Company Credibility & Trust
    "certified installation team",
    "5000+ satisfied customers",
    "industry leaders",
    "trusted safety provider",
    "best in class service",
    "professional expertise",
    // Founder & Team Keywords
    "experienced installers",
    "skilled technicians",
    "expert team",
    "certified professionals",
    "trained staff",
    // Company Values & Approach
    "quality-first approach",
    "customer satisfaction",
    "attention to detail",
    "dedication to excellence",
    "commitment to safety",
    // Service Commitment Keywords
    "installation expertise",
    "post-installation support",
    "warranty coverage",
    "maintenance support",
    "customer care focus",
    // Industry Keywords
    "safety solutions pioneer",
    "market leaders",
    "innovation in safety",
    "award winners in service",
    // Location Heritage
    "South India's trusted provider",
    "regional safety experts",
    "community trusted brand",
    // Long-tail About Keywords
    "why choose KGR Enterprises",
    "our safety commitment",
    "company experience highlights",
    "customer testimonials",
    "success stories",
    "reliable safety partner",
  ],
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    'max-snippet': -1,
  },
  openGraph: {
    title: "About KGR Enterprises - Invisible Grills & Safety Nets Experts",
    description: "Trusted safety solutions provider with 15+ years experience and 5000+ satisfied customers",
    url: "https://invisiblegrillsandsafetynets.in/about",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About KGR Enterprises"
      }
    ]
  }
};

export default function AboutPage() {

  return (
    <>
      <HeroWithHeaderWrapper>
        {/* Full-bleed background hero for About page (using next/image for optimization) */}
        <section className="relative overflow-hidden" style={{ borderRadius: '1rem' }}>
          <img 
            src="/images/hero-image.jpg" 
            alt="About KGR Enterprises" 
            className="object-cover w-full h-full absolute inset-0"
            loading="eager"
            decoding="async"
            width="1920"
            height="1080"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative container mx-auto px-4 py-20 md:py-28 lg:py-36 text-center">
            <div className="max-w-3xl mx-auto">
              <Breadcrumbs
                items={[
                  { label: "About" },
                ]}
                darkMode={true}
              />
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
                About{" "}
                <span className="text-gradient-on-dark">KGR Enterprises</span>
              </h1>
              <p className="text-xl text-white/90">
                Your Trusted Partner in Safety Solutions Since 2008
              </p>
            </div>
          </div>
        </section>
      </HeroWithHeaderWrapper>

      <AboutSection />

      <div className="container mx-auto px-4 mt-6">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          <Card>
            <CardContent className="p-4 md:p-6 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-card-foreground">Our Story</h2>
              <p className="text-card-foreground/80">
                Founded in 2008, KGR Enterprises has grown from a small local
                business to become one of South India&apos;s most trusted safety
                solutions providers. With over 15 years of experience, we have
                successfully completed 5000+ installations across Hyderabad,
                Bangalore, Chennai, and Andhra Pradesh.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 md:p-6 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-card-foreground">Our Mission</h2>
              <p className="text-card-foreground/80">
                To provide world-class safety solutions that protect families
                and properties while maintaining aesthetic appeal. We believe
                safety should never compromise on style.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <TestimonialsSection />
    </>
  );
}
