import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from 'next/script';
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MainLayout from "@/components/layout/MainLayout";
import { PRIMARY } from '@/constants/contacts';
import { validLocations, locationData } from '@/constants/locations';

const SITE_URL = "https://invisiblegrillsandsafetynets.in";
const SITE_TITLE = "KGR Enterprises – Invisible Grills & Safety Nets in Bangalore";
const SITE_DESCRIPTION =
  "Premium invisible grills and safety nets installation in Bangalore, Hyderabad, Chennai, Vijayawada and Visakhapatnam. Marine-grade steel, 15-year warranty.";

const inter = Inter({ subsets: ["latin"] });

// Get current date for metadata
const currentDate = new Date().toISOString();

export const metadata: Metadata = {
  metadataBase: new URL("https://invisiblegrillsandsafetynets.in"),
  verification: {
    google: "P8HUVCb--rZ-IF-X_ZwXQX1FOPvjQI5M0MWRtAwVMfc",
  },
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: "KGR Enterprises",
  keywords: [
    // Primary focus city first.
    "invisible grills in Bangalore",
    "safety nets in Bangalore",
    "best invisible grills in Bangalore",
    "balcony safety nets in Bangalore",
    "pigeon nets in Bangalore",
    "invisible grill installation Bangalore",
    // Brand
    "KGR invisible grills",
    "KGR safety nets",
    "invisible grills manufacturer",
    // Generic / near-me intent
    "invisible grills",
    "safety nets",
    "invisible grill installation near me",
    "children safety nets",
    "bird nets",
    "marine grade stainless steel grills",
    // Other service cities
    "invisible grills in Hyderabad",
    "safety nets in Hyderabad",
    "invisible grills in Chennai",
    "safety nets in Chennai",
    "invisible grills in Vijayawada",
    "invisible grills in Visakhapatnam",
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
    "og:title": SITE_TITLE,
    "og:description": SITE_DESCRIPTION,
    "og:url": `${SITE_URL}/`,
    "og:site_name": "KGR Enterprises",
    "article:modified_time": currentDate
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "KGR Enterprises",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/`,
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

    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/hero-image.jpg"],
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
  const currentDate = new Date().toISOString();
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [

      {
        "@type": "WebPage",
        "@id": "https://invisiblegrillsandsafetynets.in/",
        "url": "https://invisiblegrillsandsafetynets.in/",
        "name": SITE_TITLE,
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
        "dateModified": currentDate,
        "description": SITE_DESCRIPTION,

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
        "description": SITE_DESCRIPTION,
        "publisher": {
          "@id": "https://invisiblegrillsandsafetynets.in/#organization"
        },
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
        // One LocalBusiness per branch, derived from constants/locations.ts so
        // the NAP data here can never drift from the location pages.
        "department": validLocations.map(slug => {
          const loc = locationData[slug];
          return {
            "@type": "LocalBusiness",
            "@id": `https://invisiblegrillsandsafetynets.in/locations/${slug}/#localbusiness`,
            "name": `Invisible Grills & Safety Nets in ${loc.name}`,
            "image": "https://invisiblegrillsandsafetynets.in/images/hero-image.jpg",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": loc.streetAddress,
              "addressLocality": loc.name,
              "addressRegion": loc.state,
              "postalCode": loc.postalCode,
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": loc.latitude.toString(),
              "longitude": loc.longitude.toString()
            },
            "areaServed": loc.name,
            "priceRange": "₹₹",
            "telephone": phoneNumber,
            "url": `https://invisiblegrillsandsafetynets.in/locations/${slug}/`
          };
        }),
      }
    ]
  };

  return (
    <html lang="en-IN">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
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
          fetchPriority="high"
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
        {/* Google Analytics 4 - with lazy loading strategy */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-339PTXCP6X" strategy="lazyOnload" />
        <Script id="google-analytics" strategy="lazyOnload">
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
        {/* Fuse.js for client-side search - Load early to avoid timing issues */}
        <Script src="https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js" strategy="beforeInteractive" />
      </head>
      <body className={inter.className}>
        <TooltipProvider>
          <MainLayout>
            {children}
          </MainLayout>
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
