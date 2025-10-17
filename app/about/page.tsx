import type { Metadata } from 'next';
import AboutSection from '@/components/about/AboutSection';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';

export const metadata: Metadata = {
  title: "About Us - 15+ Years Experience in Safety Solutions",
  description: "KGR Enterprises has 15+ years of experience in invisible grills and safety nets installation. Certified team, 5000+ happy customers across Hyderabad, Bangalore, Chennai.",
  openGraph: {
    title: "About KGR Enterprises - Invisible Grills & Safety Nets Experts",
    description: "Trusted safety solutions provider with 15+ years experience and 5000+ satisfied customers",
    url: "https://safetypronets.com/about",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About KGR Enterprises"
      }
    ],
  },
};

export default function AboutPage() {
  return (
    <div className="pt-8 lg:pt-24">
      <div className="container mx-auto px-4 mb-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            About <span className="text-gradient">KGR Enterprises</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Your Trusted Partner in Safety Solutions Since 2008
          </p>
        </div>
      </div>
      
      <AboutSection />
      
      <div className="container mx-auto px-4 pt-4">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h2 className="text-3xl font-bold mb-2">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            Founded in 2008, KGR Enterprises has grown from a small local business 
            to become one of South India&apos;s most trusted safety solutions providers. 
            With over 15 years of experience, we have successfully completed 5000+ 
            installations across Hyderabad, Bangalore, Chennai, and Andhra Pradesh.
          </p>

          <h2 className="text-3xl font-bold mb-2">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            To provide world-class safety solutions that protect families and 
            properties while maintaining aesthetic appeal. We believe safety 
            should never compromise on style.
          </p>

          <h2 className="text-3xl font-bold mb-2">Why Choose Us?</h2>
          <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
            <li>ISI Certified materials and installation processes</li>
            <li>Experienced team with 15+ years in the industry</li>
            <li>5-year comprehensive warranty on all installations</li>
            <li>24/7 customer support and emergency services</li>
            <li>Transparent pricing with no hidden costs</li>
            <li>Free site inspection and consultation</li>
          </ul>
        </div>
      </div>
      
      <TestimonialsSection />
    </div>
  );
}