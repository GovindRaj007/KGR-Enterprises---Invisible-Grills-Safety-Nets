import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
// using native <img> instead of next/image
import Link from 'next/link';
import { servicesData, serviceSpecificLocationFAQs } from '@/data/servicesData';
import {
  generateServiceMetadata,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateServiceFAQSchema,
  generateLocationContent,
  PRIMARY_LOCATIONS,
} from '@/lib/seo-metadata';
import { PRIMARY } from '@/constants/contacts';
import { CheckCircle2, MapPin, Shield, Star, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type FAQ = { question: string; answer: string };

type Props = {
  params?: { slug: string } | Promise<{ slug: string }>;
  searchParams?: Record<string, string | string[] | undefined>;
};

// Generate static params for all services
export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }));
}

// Generate metadata for SEO with location keywords
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const service = slug ? servicesData[slug] : undefined;

  if (!service) {
    return { title: 'Service Not Found - KGR Enterprises' };
  }

  return generateServiceMetadata({
    serviceName: service.title,
    serviceSlug: slug,
    shortDescription: service.description,
    longDescription: service.detailedDescription,
    image: service.image,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const service = slug ? servicesData[slug] : undefined;

  if (!service) notFound();

  // Generate location-specific content
  const locationContents = PRIMARY_LOCATIONS.map((loc) =>
    generateLocationContent(service.title, loc.name)
  );

  const branches =  {
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
    };
    
  const mainLocationString = PRIMARY_LOCATIONS.slice(0, 4)
    .map((l) => l.name)
    .join(', ');

  const productName = service.title.replace(/\b(dealer|supplier|vendor)\b/gi, '').trim() || service.title;

  const faqs = [
    {
      question: `What is the cost of ${productName}?`,
    answer: `Costs vary by area, size and specifications. Contact ${PRIMARY.display} for a free quote and site inspection.`,
    },
    {
      question: `Do you provide ${productName} in Hyderabad, Bangalore and Chennai?`,
      answer: `Yes — we provide ${productName} across Hyderabad, Bangalore, Chennai, Vijayawada and major cities in Andhra Pradesh.`,
    },
    {
      question: `How long does ${productName} installation take?`,
      answer: `Installation typically takes 4-6 hours depending on size and site conditions.`,
    },
  ];

  const categoryFaqTemplates: Record<string, { question: string; answer: string }> = {
    'invisible-grills': {
      question: `Can ${productName} be customized to my balcony or window size?`,
      answer: `Yes — ${productName} systems are fully customizable. We measure on-site and offer mesh size and finish options to match your design and safety needs. Contact us for a free site survey.`,
    },
    'safety-nets': {
      question: `Are the safety nets weather and UV resistant?`,
      answer: `Yes — our safety nets use UV-stabilized HDPE material designed to withstand sun and rain with long-term durability.`,
    },
    'bird-protection': {
      question: `Will bird nets or spikes harm birds?`,
      answer: `No — our bird protection solutions are humane and designed to prevent nesting without causing harm to birds. We prioritize humane, long-lasting control.`,
    },
    'sports': {
      question: `Are sports nets suitable for both indoor and outdoor use?`,
      answer: `Yes — our sports nets are built for both indoor and outdoor environments with materials rated for weather exposure and heavy use.`,
    },
  };

  const categoryTemplate = categoryFaqTemplates[service.category];
  if (categoryTemplate) {
    faqs.push(categoryTemplate);
  } else {
    faqs.push({
      question: `Can you customize ${productName} to my requirements?`,
      answer: `Yes — we provide tailored solutions and on-site assessments to ensure the right fit and finish.`,
    });
  }

  try {
    const serviceFAQs = serviceSpecificLocationFAQs[slug];
    if (serviceFAQs) {
      PRIMARY_LOCATIONS.forEach((loc) => {
        const cityKey = loc.name.toLowerCase();
        const kebabKey = cityKey.replace(/ /g, '-');
        const stateKey = (loc.state || '').toLowerCase().replace(/ /g, '-');

        const candidates = [cityKey, kebabKey, stateKey].filter(Boolean);
        let cityFaqs: FAQ[] | null = null;
        for (const k of candidates) {
          if (serviceFAQs[k as keyof typeof serviceFAQs]) {
            cityFaqs = serviceFAQs[k as keyof typeof serviceFAQs] as FAQ[];
            break;
          }
        }

        if (Array.isArray(cityFaqs)) {
          cityFaqs.forEach((f: FAQ) => faqs.push(f));
        }
      });
    }
  } catch (e) {
    console.warn('Failed to merge service-specific FAQs', e);
  }

  // Structured data schemas
  const serviceSchema = generateServiceSchema({
    serviceName: service.title,
    description: service.detailedDescription,
    image: service.image,
    slug,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: service.title, url: `/services/${slug}` },
  ]);

  const faqSchema = generateServiceFAQSchema(faqs);

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'KGR Enterprises',
  url: 'https://invisiblegrillsandsafetynets.in',
  logo: 'https://invisiblegrillsandsafetynets.in/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
  telephone: PRIMARY.phone,
      contactType: 'Customer Support',
      areaServed: 'IN',
      availableLanguage: 'en',
    },
    sameAs: [
      'https://www.facebook.com/',
      'https://www.instagram.com/',
      'https://www.google.com/maps/place/KGR+Enterprises',
    ],
  };
    
  const BranchIcon = branches.icon;
  // Local Business Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'KGR Enterprises',
  image: 'https://invisiblegrillsandsafetynets.in/logo.png',
  telephone: PRIMARY.phone,
    priceRange: '₹₹',
  url: 'https://invisiblegrillsandsafetynets.in',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      addressCountry: 'IN',
    },
    areaServed: [
      { '@type': 'City', name: 'Hyderabad' },
      { '@type': 'City', name: 'Bangalore' },
      { '@type': 'City', name: 'Chennai' },
      { '@type': 'City', name: 'Vijayawada' },
    ],
    workingHours: 'Mo-Su 09:00-19:00',
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-background">
<div className="bg-muted/30 pt-4 md:py-4 md:mt-[26px]">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto">
      <nav className="flex md:items-center gap-2 text-base md:text-lg text-muted-foreground overflow-x-auto">
        <Link href="/" className="hover:text-primary whitespace-nowrap flex-shrink-0">
          Home
        </Link>
        <span className="flex-shrink-0">/</span>
        <Link href="/services" className="hover:text-primary whitespace-nowrap flex-shrink-0">
          Services
        </Link>
        <span className="flex-shrink-0">/</span>
        <span className="text-foreground truncate min-w-0">{service.title}</span>
      </nav>
    </div>
  </div>
</div>

        <div className="container mx-auto pb-2 md:py-4">
          <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-safety">
                  <Shield className="h-4 w-4 md:h-5 md:w-5" />
                  <Badge variant="secondary" className="text-xs md:text-sm">
                    Professional Installation
                  </Badge>
                </div>

                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  {service.title}
                  <span className="block text-sm md:text-base text-muted-foreground font-medium mt-2">
                    in {mainLocationString}
                  </span>
                </h1>

                <div className="flex flex-wrap gap-4 py-4 border-y">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-safety" />
                    <span>4.9/5 Rating</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-accent" />
                    <span>Quality Service</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>Free site inspection</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {((service.images && service.images.length) ? service.images : [service.image]).map((img, index) => (
                  <div key={index} className="relative h-48 md:h-64 rounded-lg overflow-hidden">
                    <img src={img} alt={`${service.title} ${index + 1}`} className="object-cover hover:scale-110 transition-transform duration-500 w-full h-full absolute inset-0" />
                  </div>
                ))}
              </div>

              <Card>
                <CardContent className="p-4 md:p-6 space-y-4">
                  <h2 className="text-xl md:text-2xl font-bold">About This Service</h2>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {service.detailedDescription}
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <Card>
                  <CardContent className="p-4 md:p-6 space-y-4">
                    <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Key Features
                    </h2>
                    <div className="space-y-2">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                          <span className="text-sm md:text-base">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 md:p-6 space-y-4">
                    <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                      <Star className="h-5 w-5 text-primary" />
                      Benefits
                    </h2>
                    <div className="space-y-2">
                      {service.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle2 className="h-4 w-4 text-safety flex-shrink-0" />
                          <span className="text-sm md:text-base">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-4 md:p-6 space-y-4">
                  <h2 className="text-lg md:text-xl font-bold">Technical Specifications</h2>
                  <div className="space-y-2">
                    {service.specifications.map((spec, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b last:border-0 text-sm md:text-base"
                      >
                        <span className="font-medium">{spec.label}</span>
                        <span className="text-muted-foreground">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <BranchIcon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold">{branches.title}</h3>
                    </div>
                    <div className="space-y-3">
                      {branches.details.map((detail, idx) => (
                        <div key={idx} className="space-y-1">
                          <p className="text-xs text-muted-foreground">
                            {detail.label}
                          </p>
                            <p className="text-sm font-medium">
                              {detail.value}
                            </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

              <Card>
                <CardContent className="p-4 md:p-6 space-y-6">
                  <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Service Locations
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {locationContents.map((loc, index) => (
                      <div key={index} className="space-y-2 p-3 rounded-lg bg-muted/30">
                        <h3 className="font-semibold text-sm md:text-base">{loc.heading}</h3>
                        <p className="text-sm text-muted-foreground">{loc.description}</p>
                        <div className="space-y-1">
                          {loc.features.slice(0, 2).map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <div className="w-1 h-1 rounded-full bg-primary"></div>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 md:p-6 space-y-4">
                  <h2 className="text-lg md:text-xl font-bold">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="space-y-2">
                        <h3 className="font-semibold text-base md:text-lg">{faq.question}</h3>
                        <p className="text-sm md:text-base text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 md:p-6 space-y-4">
                  <h2 className="text-lg md:text-xl font-bold">You May Also Need</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {Object.entries(servicesData)
                      .filter(([id, s]) => s.category === service.category && id !== slug)
                      .slice(0, 4)
                      .map(([id, relatedService]) => (
                        <Link
                          key={id}
                          href={`/services/${id}`}
                          className="flex items-center space-x-3 p-3 rounded-lg border hover:border-primary transition-colors group"
                        >
                            <div className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                            <img src={relatedService.image} alt={relatedService.title} className="object-cover w-full h-full absolute inset-0" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate group-hover:text-primary">
                              {relatedService.title}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {relatedService.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/services">View All Services</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        </div>
    </>
  );
}