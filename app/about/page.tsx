import type { Metadata } from "next";
import AboutSection from "@/components/about/AboutSection";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About Us - 15+ Years Experience in Safety Solutions",
  description:
    "KGR Enterprises has 15+ years of experience in invisible grills and safety nets installation. Certified team, 5000+ happy customers across Hyderabad, Bangalore, Chennai.",
    keywords: [
      "kgr invisible grills",
      "kgr safety nets",
      "kgr pegion nets",
      "invisible grills in hyderabad",
      "best invisible grills in hyderabad",
      "best safety nets in hyderabad",
      "best invisible grills in bangalore",
      "safety nets in hyderabad",
      "invisible grills in bangalore",
      "safety nets in bangalore",
      "invisible grills in chennai",
      "safety nets in chennai",
      "invisible grills in visakhapatnam",
      "safety nets in visakhapatnam",
      "best invisible grills in chennai",
      "best safety nets in chennai",
      "best invisible grills in visakhapatnam",
      "best safety nets in visakhapatnam",
  ],
  openGraph: {
    title: "About KGR Enterprises - Invisible Grills & Safety Nets Experts",
    description:
      "Trusted safety solutions provider with 15+ years experience and 5000+ satisfied customers",
    url: "https://invisiblegrillsandsafetynets.in/about",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About KGR Enterprises",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <div>
      {/* Full-bleed background hero for About page (using next/image for optimization) */}
      <section className="relative overflow-hidden mb-6">
        <img src="/images/hero-image.jpg" alt="About KGR Enterprises" className="object-cover w-full h-full absolute inset-0" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative container mx-auto px-4 py-20 md:py-28 lg:py-36 text-center">
          <div className="max-w-3xl mx-auto">
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

      <AboutSection />

      <div className="container mx-auto px-4 mt-6">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          <Card>
            <CardContent className="p-4 md:p-6 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold">Our Story</h2>
              <p className="text-muted-foreground">
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
              <h2 className="text-xl md:text-2xl font-bold">Our Mission</h2>
              <p className="text-muted-foreground">
                To provide world-class safety solutions that protect families
                and properties while maintaining aesthetic appeal. We believe
                safety should never compromise on style.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <TestimonialsSection />
    </div>
  );
}
