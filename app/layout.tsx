import type { Metadata } from "next";
export const dynamic = 'force-static';
import { Inter } from "next/font/google";
import Script from 'next/script';
import "./globals.css";
import { getCanonicalUrl } from "@/lib/canonical-url";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MainLayout from "@/components/layout/MainLayout";
// GoogleAnalytics is disabled — GTM will manage GA4 (removed from layout)
import { PRIMARY } from '@/constants/contacts';

const inter = Inter({ subsets: ["latin"] });

// Build-time snapshot for static metadata
const buildDate = new Date().toISOString();

export const metadata: Metadata = {
  metadataBase: new URL("https://invisiblegrillsandsafetynets.in"),
  alternates: {
    canonical: 'https://invisiblegrillsandsafetynets.in',
  },
  verification: {
    google: "P8HUVCb--rZ-IF-X_ZwXQX1FOPvjQI5M0MWRtAwVMfc",
  },
  title: "KGR Enterprises – Premium Invisible Grills & Safety Nets Manufacturer in India",
  description: "Premium invisible grills and safety nets installation across Chennai, Hyderabad, Bangalore. Marine-grade stainless steel, superior protection, includes Warranty . Best quality, trusted service since 2008",
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
    "pigeon nets"
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
    "og:description": "Premium invisible grills and safety nets installation across Chennai, Hyderabad, Bangalore. Marine-grade stainless steel, superior protection, includes Warranty. Best quality, trusted service since 2008",
    "og:url": "https://invisiblegrillsandsafetynets.in/",
    "og:site_name": "KGR Enterprises",
    "article:modified_time": buildDate
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
    description: "Premium invisible grills and safety nets installation across Chennai, Hyderabad, Bangalore. Marine-grade stainless steel, superior protection, includes Warranty.",
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
  const phoneNumber = PRIMARY.phone || '+919337353030';
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
        "dateModified": buildDate,
        "description": "Premium invisible grills and safety nets installation across Chennai, Hyderabad, Bangalore. Marine-grade stainless steel, superior protection, includes Warranty. Best quality, trusted service since 2008",

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
        "description": "Premium invisible grills and safety nets installation across Chennai, Hyderabad, Bangalore. Marine-grade stainless steel, superior protection, includes Warranty.",
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
            "@id": "https://invisiblegrillsandsafetynets.in/locations/hyderabad/#localbusiness",
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
            "url": "https://invisiblegrillsandsafetynets.in/locations/hyderabad/"
          },
          {
            "@type": "LocalBusiness",
            "@id": "https://invisiblegrillsandsafetynets.in/locations/bangalore/#localbusiness",
            "name": "Invisible Grills & Safety Nets in Bangalore",
            "image": "https://invisiblegrillsandsafetynets.in/images/hero-image.jpg",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "367, 2nd A Main Rd, Sharadamba Nagar, Muthyala Nagar, Gokula Extension, Mathikere, Bengaluru - 560054, Karnataka",
              "addressLocality": "Bangalore",
              "addressRegion": "Karnataka",
              "postalCode": "560054",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "13.04266073172332",
              "longitude": "77.55298708465743"
            },
            "areaServed": "Bangalore",
            "priceRange": "₹₹",
            "telephone": phoneNumber,
            "url": "https://invisiblegrillsandsafetynets.in/locations/bangalore/"
          },
          {
            "@type": "LocalBusiness",
            "@id": "https://invisiblegrillsandsafetynets.in/locations/chennai/#localbusiness",
            "name": "Invisible Grills & Safety Nets in Chennai",
            "image": "https://invisiblegrillsandsafetynets.in/images/hero-image.jpg",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "25, Sathya Moorthy Street, Kamaraj Nagar,NGO Colony, Choolaimedu, Greater Chennai - 600094, Tamil Nadu",
              "addressLocality": "Chennai",
              "addressRegion": "Tamil Nadu",
              "postalCode": "600094",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "13.065460796383261",
              "longitude": "80.2214640558218"
            },
            "areaServed": "Chennai",
            "priceRange": "₹₹",
            "telephone": phoneNumber,
            "url": "https://invisiblegrillsandsafetynets.in/locations/chennai/"
          },
          {
            "@type": "LocalBusiness",
            "@id": "https://invisiblegrillsandsafetynets.in/locations/vijayawada/#localbusiness",
            "name": "Invisible Grills & Safety Nets in Vijayawada",
            "image": "https://invisiblegrillsandsafetynets.in/images/hero-image.jpg",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "3-12, Ayyappa Nagar, Benz Circle, Vijayawada - 521134, Andhra Pradesh",
              "addressLocality": "Vijayawada",
              "addressRegion": "Andhra Pradesh",
              "postalCode": "521134",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "16.483198690558233",
              "longitude": "80.66901608208298"
            },
            "areaServed": "Vijayawada",
            "priceRange": "₹₹",
            "telephone": phoneNumber,
            "url": "https://invisiblegrillsandsafetynets.in/locations/vijayawada/"
          },
          {
            "@type": "LocalBusiness",
            "@id": "https://invisiblegrillsandsafetynets.in/locations/visakhapatnam/#localbusiness",
            "name": "Invisible Grills & Safety Nets in Visakhapatnam",
            "image": "https://invisiblegrillsandsafetynets.in/images/hero-image.jpg",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "50-79-31/1, Ganesh Nagar, Seetamma Peta, Dwaraka Nagar, Visakhapatnam - 530016, Andhra Pradesh",
              "addressLocality": "Visakhapatnam",
              "addressRegion": "Andhra Pradesh",
              "postalCode": "530016",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "17.73464614605787",
              "longitude": "83.31177354232871"
            },
            "areaServed": "Visakhapatnam",
            "priceRange": "₹₹",
            "telephone": phoneNumber,
            "url": "https://invisiblegrillsandsafetynets.in/locations/visakhapatnam/"
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "1126",
          "reviewCount": "1126"
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
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
        {/* Google Tag Manager - head snippet (placed high in head) */}
        <Script id="gtm-head" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W8H6PR53');`}
        </Script>
        {/* Preload optimized images manifest so OptimizedImage can avoid an extra fetch */}
        <Script id="optimized-manifest" strategy="beforeInteractive">
          {`(function(){try{fetch('/optimized-images.json').then(function(r){if(r.ok){return r.json()}return {}}).then(function(m){window.__OPTIMIZED_IMAGES__=m}).catch(function(){window.__OPTIMIZED_IMAGES__={}})}catch(e){window.__OPTIMIZED_IMAGES__={}}})();`}
        </Script>
        {/* Fuse.js for client-side search - Load early to avoid timing issues */}
        <Script src="https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js" strategy="beforeInteractive" />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) - immediately after opening <body> */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W8H6PR53" height="0" width="0" style={{display:'none',visibility:'hidden'}} />
        </noscript>
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
