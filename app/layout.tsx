import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from 'next/script';
import "./globals.css";
import { getCanonicalUrl } from "@/lib/canonical-url";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/FooterClient";
import FloatingContact from "@/components/layout/FloatingContact";
import { PRIMARY } from '@/constants/contacts';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://invisiblegrillsandsafetynets.in"),
  alternates: {
    canonical: 'https://invisiblegrillsandsafetynets.in',
  },
  verification: {
    google: "P8HUVCb--rZ-IF-X_ZwXQX1FOPvjQI5M0MWRtAwVMfc",
  },
  title: "KGR Enterprises – Premium Invisible Grills & Safety Nets Manufacturer in India",
  description: "Premium invisible grills and safety nets installation across Hyderabad, Bangalore, Chennai. Marine-grade stainless steel, superior protection, 15-year warranty. Best quality, trusted service since 2008",
  applicationName: "KGR Enterprises",
  keywords: [
    "invisible grills in Hyderabad",
    "Kgr invisible grills",
    "invisible grills manufacturer",
    "invisible grills in Bangalore",
    "safety nets in Hyderabad",
    "marine grade stainless steel grills",
    "Kgr safety nets",
    "best invisible grills in hyderabad",
    "best invisible grills in bangalore",
    "balcony safety nets in bangalore",
    "best invisible grills in chennai",
    "invisible grills",
    "safety nets in bangalore",
    "balcony safety nets in hyderabad",
    "invisible grill installation near me",
    "invisible grills in chennai",
    "invisible grills in vijayawada",
    "safety nets in Chennai",
    "balcony safety nets in Chennai",
    "pigeon nets in chennai",
    "children safety nets",
    "bird nets"
  ],
  authors: [{ name: "KGR Enterprises" }],
  creator: "KGR Enterprises",
  publisher: "KGR Enterprises",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    "og:locale": "en-IN",
    "og:type": "website",
    "og:title": "KGR Enterprises – Premium Invisible Grills & Safety Nets Manufacturer in India",
    "og:description": "Premium invisible grills and safety nets installation across Hyderabad, Bangalore, Chennai. Marine-grade stainless steel, superior protection, 15-year warranty. Best quality, trusted service since 2008",
    "og:url": "https://invisiblegrillsandsafetynets.in/",
    "og:site_name": "KGR Enterprises",
    "article:modified_time": "2025-10-30T13:06:13+00:00"
  },
  openGraph: {
    images: [{
      url: "/images/hero-image.jpg",
      width: 1200,
      height: 630,
      type: "image/jpeg"
    }]
  },
  twitter: {
    card: "summary_large_image",
    site: "@Kgr_Grills_Nets",

    title: "KGR Enterprises – Premium Invisible Grills & Safety Nets Manufacturer in India",
    description: "Premium invisible grills and safety nets installation across Hyderabad, Bangalore, Chennai. Marine-grade stainless steel, superior protection, 15-year warranty.",
    images: ["/logo.png"],
    creator: "@Kgr_Grills_Nets"
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const phoneNumber = PRIMARY.phone || '+919618568669';
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [

      {
        "@type": "WebPage",
        "@id": "https://invisiblegrillsandsafetynets.in/",
        "url": "https://invisiblegrillsandsafetynets.in/",
        "name": "KGR Enterprises – Premium Invisible Grills & Safety Nets Manufacturer in India",
        "isPartOf": {
          "@id": "https://invisiblegrillsandsafetynets.in/#website"
        },
        "primaryImageOfPage": {
          "@id": "https://invisiblegrillsandsafetynets.in/#primaryimage"
        },
        "image": {
          "@id": "https://invisiblegrillsandsafetynets.in/#primaryimage"
        },
        "thumbnailUrl": "https://invisiblegrillsandsafetynets.in/logo.png",
        "datePublished": "2008-01-01T00:00:00+00:00",
        "dateModified": "2025-10-30T13:06:13+00:00",
        "description": "Premium invisible grills and safety nets installation across Hyderabad, Bangalore, Chennai. Marine-grade stainless steel, superior protection, 15-year warranty. Best quality, trusted service since 2008",
        "breadcrumb": {
          "@id": "https://invisiblegrillsandsafetynets.in/#breadcrumb"
        },
        "inLanguage": "en-IN",
        "potentialAction": [{
          "@type": "ReadAction",
          "target": ["https://invisiblegrillsandsafetynets.in/"]
        }]
      },
      {
        "@type": "ImageObject",
        "inLanguage": "en-US",
        "@id": "https://invisiblegrillsandsafetynets.in/#primaryimage",
        "url": "https://invisiblegrillsandsafetynets.in/logo.png",
        "contentUrl": "https://invisiblegrillsandsafetynets.in/logo.png",
        "width": 150,
        "height": 150,
        "caption": "kgr-logo"
      },
      {
        "@type": "WebSite",
        "@id": "https://invisiblegrillsandsafetynets.in/#website",
        "url": "https://invisiblegrillsandsafetynets.in/",
        "name": "KGR Enterprises",
        "description": "Premium invisible grills and safety nets installation across Hyderabad, Bangalore, Chennai. Marine-grade stainless steel, superior protection, 15-year warranty.",
        "publisher": {
          "@id": "https://invisiblegrillsandsafetynets.in/#organization"
        },
        "potentialAction": [{
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://invisiblegrillsandsafetynets.in/services?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }],
        "inLanguage": "en-IN"
      },
      {
        "@type": "Organization",
        "@id": "https://invisiblegrillsandsafetynets.in/#organization",
        "name": "KGR Enterprises",
        "url": "https://invisiblegrillsandsafetynets.in",
        "logo": {
          "@type": "ImageObject",
          "@id": "https://invisiblegrillsandsafetynets.in/#logo",
          "url": "https://invisiblegrillsandsafetynets.in/logo.png",
          "contentUrl": "https://invisiblegrillsandsafetynets.in/logo.png",
          "width": 150,
          "height": 150,
          "caption": "KGR Enterprises"
        },
        "image": {
          "@id": "https://invisiblegrillsandsafetynets.in/#logo"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": phoneNumber,
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": "English"
        },
        "department": [
          {
            "@type": "LocalBusiness",
            "@id": "https://invisiblegrillsandsafetynets.in/locations/hyderabad#localbusiness",
            "name": "Invisible Grills & Safety Nets in Hyderabad",
            "image": "https://invisiblegrillsandsafetynets.in/images/hero-image.jpg",
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
            "telephone": phoneNumber,
            "url": "https://invisiblegrillsandsafetynets.in/locations/hyderabad"
          },
          {
            "@type": "LocalBusiness",
            "@id": "https://invisiblegrillsandsafetynets.in/locations/bangalore#localbusiness",
            "name": "Invisible Grills & Safety Nets in Bangalore",
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
            "telephone": phoneNumber,
            "url": "https://invisiblegrillsandsafetynets.in/locations/bangalore"
          },
          {
            "@type": "LocalBusiness",
            "@id": "https://invisiblegrillsandsafetynets.in/locations/chennai#localbusiness",
            "name": "Invisible Grills & Safety Nets in Chennai",
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
            "telephone": phoneNumber,
            "url": "https://invisiblegrillsandsafetynets.in/locations/chennai"
          },
          {
            "@type": "LocalBusiness",
            "@id": "https://invisiblegrillsandsafetynets.in/locations/vijayawada#localbusiness",
            "name": "Invisible Grills & Safety Nets in Vijayawada",
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
            "telephone": phoneNumber,
            "url": "https://invisiblegrillsandsafetynets.in/locations/vijayawada"
          },
          {
            "@type": "LocalBusiness",
            "@id": "https://invisiblegrillsandsafetynets.in/locations/visakhapatnam#localbusiness",
            "name": "Invisible Grills & Safety Nets in Visakhapatnam",
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
            "telephone": phoneNumber,
            "url": "https://invisiblegrillsandsafetynets.in/locations/visakhapatnam"
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "230"
        }
      }
    ]
  };

  return (
    <html lang="en-IN">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="canonical" href={getCanonicalUrl()} />
        {/* Resource Hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Preload Critical Assets */}
        <link 
          rel="preload" 
          as="image" 
          href="/images/hero-image.jpg"
          imageSrcSet="/images/hero-image.jpg 1x, /images/hero-image@2x.jpg 2x"
          fetchPriority="high"
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
        {/* Google Analytics 4 - with performance optimization */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-339PTXCP6X" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-339PTXCP6X', { 
              'send_page_view': false,
              'cookie_flags': 'max-age=7200;secure;samesite=none'
            });
          `}
        </Script>
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
        </TooltipProvider>
      </body>
    </html>
  );
}
