import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/FooterClient";
import FloatingContact from "@/components/layout/FloatingContact";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://safetypronets.com"),
  title: {
    default:
      "KGR Enterprises - Best Invisible Grills & Safety Nets Services in Hyderabad",
    template: "%s | KGR Enterprises",
  },
  description:
    "Professional safety nets installation in Hyderabad, Bangalore, Chennai, and Andhra Pradesh. Balcony nets, children protection, bird nets, invisible grills. Free inspection. Call +91 95517 67356.",
  keywords: [
    "safety nets Hyderabad",
    "balcony safety nets",
    "children protection nets",
    "bird nets",
    "invisible grills",
    "pigeon nets",
    "duct area nets",
    "Bangalore",
    "Chennai",
    "Vijayawada",
    "Visakhapatnam",
  ],
  authors: [{ name: "KGR Enterprises" }],
  creator: "KGR Enterprises",
  publisher: "KGR Enterprises",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://safetypronets.com",
    title:
      "KGR Enterprises - Best Invisible Grills & Safety Nets Installation in Hyderabad",
    description:
      "Trusted safety nets installation services for balconies, children protection, and bird control. Professional team, quality materials, 5-year warranty.",
    siteName: "KGR Enterprises",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KGR Enterprises - Safety Nets Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@safetypronets",
    title:
      "KGR Enterprises - Best Invisible Grills & Safety Nets in Hyderabad",
    description:
      "Professional safety nets installation services. Balcony nets, children protection, bird control. Call +91 95517 67356.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="canonical" href="https://safetypronets.com" />

        {/* ✅ Structured Data: Organization + LocalBusiness + Reviews */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "KGR Enterprises",
              "url": "https://safetypronets.com",
              "logo": "https://safetypronets.com/logo.png",
              "sameAs": [
                "https://www.facebook.com/safetypronets",
                "https://www.instagram.com/safetypronets"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+919551767356",
                "contactType": "customer service",
                "areaServed": "IN",
                "availableLanguage": "English"
              },
              "department": [
                {
                  "@type": "LocalBusiness",
                  "name": "KGR Enterprises - Hyderabad Branch",
                  "image": "https://safetypronets.com/og-image.jpg",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "15-21-150/17, JK Heights, Balaji Nagar, Kukatpally",
                    "addressLocality": "Hyderabad",
                    "addressRegion": "Telangana",
                    "postalCode": "500072",
                    "addressCountry": "IN"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "17.48134",
                    "longitude": "78.40828"
                  },
                  "areaServed": "Hyderabad",
                  "priceRange": "₹₹",
                  "telephone": "+919551767356",
                  "openingHours": "Mo-Sa 08:00-20:00, Su 09:00-18:00"
                },
                {
                  "@type": "LocalBusiness",
                  "name": "KGR Enterprises - Bangalore Branch",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "367, 2nd A Main Road, Gokula Extension, Mathikera, Bangalore Division",
                    "addressLocality": "Bangalore",
                    "addressRegion": "Karnataka",
                    "postalCode": "560054",
                    "addressCountry": "IN"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "13.04237",
                    "longitude": "77.55302"
                  },
                  "areaServed": "Bangalore",
                  "priceRange": "₹₹",
                  "telephone": "+919551767356"
                },
                {
                  "@type": "LocalBusiness",
                  "name": "KGR Enterprises - Chennai Branch",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "25/9a, Sathya Moorthy Street, Kamaraj Nagar, Choolaimedu",
                    "addressLocality": "Chennai",
                    "addressRegion": "Tamil Nadu",
                    "postalCode": "600094",
                    "addressCountry": "IN"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "13.06523",
                    "longitude": "80.22148"
                  },
                  "areaServed": "Chennai",
                  "priceRange": "₹₹",
                  "telephone": "+919551767356"
                },
                {
                  "@type": "LocalBusiness",
                  "name": "KGR Enterprises - Vijayawada Branch",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "3-12, Ayyappa Nagar, Benz Circle",
                    "addressLocality": "Vijayawada",
                    "addressRegion": "Andhra Pradesh",
                    "postalCode": "520007",
                    "addressCountry": "IN"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "16.48304",
                    "longitude": "80.66898"
                  },
                  "areaServed": "Vijayawada",
                  "priceRange": "₹₹",
                  "telephone": "+919551767356"
                },
                {
                  "@type": "LocalBusiness",
                  "name": "KGR Enterprises - Visakhapatnam Branch",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "21-3/4/3, Viman Nagar, Kakani Nagar",
                    "addressLocality": "Visakhapatnam",
                    "addressRegion": "Andhra Pradesh",
                    "postalCode": "530009",
                    "addressCountry": "IN"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "17.7347",
                    "longitude": "83.3123"
                  },
                  "areaServed": "Visakhapatnam",
                  "priceRange": "₹₹",
                  "telephone": "+919551767356"
                }
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "230"
              },
              "review": [
                {
                  "@type": "Review",
                  "author": "Priya Sharma",
                  "datePublished": "2025-03-14",
                  "reviewBody": "Very professional invisible grill installation. The team did a great job!",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5"
                  }
                },
                {
                  "@type": "Review",
                  "author": "Ravi Kumar",
                  "datePublished": "2025-02-10",
                  "reviewBody": "Affordable pricing and quick installation. Highly recommend for balcony safety nets.",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5"
                  }
                }
              ]
            })
          }}
        />
      </head>

      <body className={inter.className}>
        <TooltipProvider>
          <div className="min-h-screen bg-background relative overflow-x-hidden">
            <Header />
            <main className="w-full">{children}</main>
            <Footer />
            <FloatingContact />
          </div>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </body>
    </html>
  );
}
