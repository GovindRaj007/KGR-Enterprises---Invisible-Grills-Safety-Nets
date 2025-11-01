import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import dynamic from 'next/dynamic';
import { PRIMARY, SECONDARY, } from '@/constants/contacts';
import { Card, CardContent } from "@/components/ui/card";
const ConsultationForm = dynamic(() => import('@/components/shared/ConsultationFormClient'), { loading: () => <div className="p-4">Loading...</div> });

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
         "invisible grills in Hyderabad",
    "Kgr invisible grills",
    "invisible grills near me",
    "invisible grills in Bangalore",
    "safety nets in Hyderabad",
    "safety net installation near me",
    "Kgr safety nets",
    "invisible grill installation",
    "best invisible grills in hyderabad",
    "best invisible grills in bangalore",
    "balcony safety nets in bangalore",
    "pigeon nets in hyderabad",
    "best invisible grills in chennai",
    "safety nets in bangalore",
    "balcony safety nets in hyderabad",
    "invisible grills in chennai",
    "safety nets in Chennai",
    "balcony safety nets in Chennai",
    "pigeon nets in chennai",
    "invisible grills in vijayawada",
    "safety nets in vijayawada",
    "balcony safety nets in vijayawada",
    "children safety nets in Hyderabad",
    "children safety nets in Visakhapatnam",
    "best invisible grills in visakhapatnam",
    "bird nets",
    "invisible grills",
    "pigeon nets",
    "duct area nets",
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
          value: "kgr.invisiblegrills.nets@gmail.com",
          href: "mailto:kgr.invisiblegrills.nets@gmail.com",
        },
      ],
    },
    {
      icon: MapPin,
      title: "Main Branches",
      details: [
        {
          label: "Hyderabad",
          value: "15-21-150/17, JK Heights, Balaji Nagar, Kukatpally - 500072",
        },
        {
          label: "Bangalore",
          value:
            "367, 2nd A Main Road, Gokula Extension, Mathikera, Bangalore Division - 560054",
        },
        {
          label: "Chennai",
          value:
            "25/9a, Sathya Moorthy Street, Kamaraj Nagar, Choolaimedu - 600094",
        },
        {
          label: "Andhra Pradesh",
          value: "3-12, Ayyappa Nagar, Benz Circle, Vijayawada - 520007",
        },
        {
          label: "Andhra Pradesh",
          value:
            "21-3/4/3, Viman Nagar, Kakani Nagar, Visakhapatnam, Andhra Pradesh 530009",
        },
      ],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        { label: "Monday - Saturday", value: "8:00 AM - 8:00 PM" },
        { label: "Sunday", value: "9:00 AM - 6:00 PM" },
      ],
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden mb-6">
        <img 
          src="/images/hero-image.jpg" 
          alt="Contact KGR Enterprises" 
          className="object-cover w-full h-full absolute inset-0"
          loading="eager"
          decoding="async"
          width="1920"
          height="1080"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative container mx-auto px-4 py-20 md:py-28 lg:py-36 text-center">
          <div className="max-w-3xl mx-auto">
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

      <div className="container mx-auto px-4 mb-4">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-4 md:p-8">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <ConsultationForm />
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="mt-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">What to Expect</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Quick Response</h3>
                      <p className="text-sm text-muted-foreground">
                        We will call you within 15 minutes to understand your
                        requirements
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Free Site Inspection
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Our expert team will visit your location for
                        measurements and assessment
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Transparent Quotation
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Receive a detailed quote with no hidden charges
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Professional Installation
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Scheduled installation by our certified team with 5-year
                        warranty
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
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold">{section.title}</h3>
                    </div>
                    <div className="space-y-3">
                      {section.details.map((detail, idx) => (
                        <div key={idx} className="space-y-1">
                          <p className="text-xs text-muted-foreground">
                            {detail.label}
                          </p>
                          {detail.href ? (
                            <a
                              href={detail.href}
                              className="text-sm font-medium hover:text-primary transition-colors block min-h-0"
                            >
                              {detail.value}
                            </a>
                          ) : (
                            <p className="text-sm font-medium">
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
            <Card className="bg-gradient-to-br from-safety/10 to-primary/10 border-safety/20">
              <CardContent className="p-6 text-center">
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
