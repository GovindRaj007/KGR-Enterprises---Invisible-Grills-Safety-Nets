import type { Metadata } from "next";
export const dynamic = 'force-static';
import OptimizedImage from "@/components/shared/OptimizedImage";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import nextDynamic from 'next/dynamic';
import { PRIMARY, SECONDARY, } from '@/constants/contacts';
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import HeroWithHeaderWrapper from "@/components/layout/HeroWithHeaderWrapper";
const ConsultationForm = nextDynamic(() => import('@/components/shared/ConsultationFormClient'), { loading: () => <div className="p-4">Loading...</div> });

export const metadata: Metadata = {
  title: "Contact Us - KGR Invisible Grills & Safety Nets",
  description:
    `Contact KGR Invisible Grills & Safety Nets for free consultation on invisible grills and safety nets. Call ${PRIMARY.spaced} or visit us in Hyderabad. Available Mon-Sat 8AM-8PM.`,
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    'max-snippet': -1,
  },
  keywords: [
    // Contact & Action Keywords
    "contact KGR Enterprises",
    "get in touch",
    "contact us",
    "reach out",
    "schedule consultation",
    // Service Request Keywords
    "free consultation",
    "free quote",
    "free site inspection",
    "installation estimate",
    "consultation with experts",
    "talk to specialist",
    // Urgency & Quick Action Keywords
    "call now",
    "urgent service",
    "same-day appointment",
    "quick response",
    "fast service",
    "immediate assistance",
    // Contact Method Keywords
    "phone support",
    "email support",
    "contact form",
    "office location",
    "business hours",
    "customer service",
    // Local Contact Keywords
    "Hyderabad office",
    "Bangalore location",
    "Chennai contact",
    "service center",
    "nearest office",
    "local support",
    // Sales & Lead Keywords
    "get started",
    "book appointment",
    "reserve slot",
    "inquiry form",
    "business inquiry",
    // Long-tail Contact Keywords
    "how to contact KGR",
    "customer support phone",
    "contact safety experts",
    "reach installation team",
    "schedule free inspection",
    "24/7 customer support",
  ],
  openGraph: {
    title: "Contact KGR Invisible Grills & Safety Nets - Free Consultation",
    description:
      "Get in touch for professional safety solutions. Free site inspection and quote.",
  url: "https://invisiblegrillsandsafetynets.in/contact",
    images: [
      {
        url: "/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact KGR Invisible Grills & Safety Nets",
      },
    ],
  },
};

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [
        {
          label: "Primary",
          value: PRIMARY.display,
          href: PRIMARY.tel,
        },
        {
          label: "Alternate",
          value: SECONDARY.display,
          href: SECONDARY.tel,
        },
       
      ],
    },
    {
      icon: Mail,
      title: "Email Address",
      details: [
        {
          label: "Business Inquiries",
          value: "kgr@invisiblegrillsandsafetynets.in",
          href: "mailto:kgr@invisiblegrillsandsafetynets.in",
        },
      ],
    },
    {
      icon: MapPin,
      title: "Main Branches",
      details: [
        {
          label: "Hyderabad",
          value: "15-21-150/17, JK Heights, Balaji Nagar, Kukatpally, Hyderabad - 500072, Telangana",
        },
        {
          label: "Bangalore",
          value:
            "367, 2nd A Main Rd, Sharadamba Nagar, Muthyala Nagar, Gokula Extension, Mathikere, Bengaluru - 560054, Karnataka",
        },
        {
          label: "Chennai",
          value:
            "25, Sathya Moorthy Street, Kamaraj Nagar,NGO Colony, Choolaimedu, Greater Chennai - 600094, Tamil Nadu",
        },
        {
          label: "Vijayawada",
          value: "3-12, Ayyappa Nagar, Benz Circle, Vijayawada - 521134, Andhra Pradesh",
        },
        {
          label: "Visakhapatnam",
          value:
            "50-79-31/1, Ganesh Nagar, Seetamma Peta, Dwaraka Nagar, Visakhapatnam - 530016, Andhra Pradesh",
        },
      ],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        { label: "Monday - Saturday", value: "8:00 AM - 8:00 PM" },
        { label: "Sunday", value: "8:00 AM - 6:00 PM" },
      ],
    },
  ];

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'KGR Enterprises',
    'alternateName': 'KGR Invisible Grills & Safety Nets',
    'url': 'https://invisiblegrillsandsafetynets.in',
    'telephone': PRIMARY.phone,
    'email': 'kgr@invisiblegrillsandsafetynets.in',
    'logo': 'https://invisiblegrillsandsafetynets.in/logo.png',
    'description': 'Contact KGR Enterprises for professional invisible grills, safety nets, and pigeon nets across South India. Free consultation and site inspection available.',
    'address': [
      {
        '@type': 'PostalAddress',
        'streetAddress': '15-21-150/17, JK Heights, Balaji Nagar, Kukatpally',
        'addressLocality': 'Hyderabad',
        'addressRegion': 'Telangana',
        'postalCode': '500072',
        'addressCountry': 'IN'
      },
      {
        '@type': 'PostalAddress',
        'streetAddress': '367, 2nd A Main Rd, Sharadamba Nagar, Muthyala Nagar, Gokula Extension, Mathikere, Bengaluru - 560054, Karnataka',
        'addressLocality': 'Bangalore',
        'addressRegion': 'Karnataka',
        'postalCode': '560054',
        'addressCountry': 'IN'
      }
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': PRIMARY.phone,
      'contactType': 'Customer Support',
      'hoursAvailable': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        'opens': '08:00',
        'closes': '20:00'
      }
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'bestRating': '5',
      'worstRating': '1',
      'ratingCount': '1126',
      'reviewCount': '1126'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <HeroWithHeaderWrapper>
        <section className="relative overflow-hidden" style={{ borderRadius: '1rem' }}>
          <OptimizedImage
            src="/images/hero-image.jpg" 
            alt="Contact KGR Enterprises for invisible grills, safety nets and custom safety solutions" 
            className=" w-full h-full absolute inset-0"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative container mx-auto px-4 py-20 md:py-28 lg:py-36 text-center">
            <div className="max-w-3xl mx-auto">
              <Breadcrumbs
                items={[
                  { label: "Contact" },
                ]}
                darkMode={true}
              />
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
                Get In <span className="text-gradient">Touch</span>
              </h1>
              <p className="text-xl text-white/90">
                Have questions? We are here to help. Contact us for a free
                consultation and site inspection.
              </p>
            </div>
          </div>
        </section>
      </HeroWithHeaderWrapper>

      <div className="container mx-auto px-4 mb-4">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-4 md:p-8">
                <h2 className="text-2xl font-bold mb-6 text-card-foreground">Send Us a Message</h2>
                <ConsultationForm />
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="mt-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-card-foreground">What to Expect</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-safety/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-safety font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-card-foreground">Quick Response</h3>
                      <p className="text-sm text-card-foreground/75">
                        We will call you within 15 minutes to understand your
                        requirements
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-safety/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-safety font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-card-foreground">
                        Free Site Inspection
                      </h3>
                      <p className="text-sm text-card-foreground/75">
                        Our expert team will visit your location for
                        measurements and assessment
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-safety/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-safety font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-card-foreground">
                        Transparent Quotation
                      </h3>
                      <p className="text-sm text-card-foreground/75">
                        Receive a detailed quote with no hidden charges
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-safety/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-safety font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-card-foreground">
                        Professional Installation
                      </h3>
                      <p className="text-sm text-card-foreground/75">
                        Scheduled installation by our certified team with warranty
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-6">
            {contactInfo.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-safety/20 flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-safety" />
                      </div>
                      <h3 className="font-semibold text-card-foreground">{section.title}</h3>
                    </div>
                    <div className="space-y-3">
                      {section.details.map((detail, idx) => (
                        <div key={idx} className="space-y-1">
                          <p className="text-xs text-card-foreground/60">
                            {detail.label}
                          </p>
                          {detail.href ? (
                            <a
                              href={detail.href}
                              className="text-sm font-medium text-card-foreground hover:text-safety transition-colors block min-h-0"
                            >
                              {detail.value}
                            </a>
                          ) : (
                            <p className="text-sm font-medium text-card-foreground">
                              {detail.value}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Emergency Contact */}
            <Card className="bg-gradient-to-br from-safety/10 to-primary/10 border-safety/20 !backdrop-blur-none">
              <CardContent className="p-6 text-center !text-foreground">
                <Phone className="h-12 w-12 mx-auto mb-4 text-safety" />
                <h3 className="text-lg font-semibold mb-2">
                  Emergency Services
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  24/7 emergency installation and repair services available
                </p>
                <a
                  href="tel:+918328376098"
                  className="inline-block w-full px-6 py-3 bg-safety text-white rounded-lg font-medium hover:bg-safety/90 transition-colors"
                >
                  Call Now
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
