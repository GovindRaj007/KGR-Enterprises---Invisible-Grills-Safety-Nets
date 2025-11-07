import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { servicesData } from '@/data/servicesData';
import { getCanonicalUrl } from '@/lib/canonical-url';
import { PRIMARY } from '@/constants/contacts';
import { generateBreadcrumbSchema } from '@/lib/seo-metadata';
import { Phone, ArrowRight, MapPin, Clock, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import OptimizedImage from '@/components/shared/OptimizedImage';
import RelatedServices from '@/components/services/RelatedServices';

import { locationData, validLocations } from '@/constants/locations';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; location: string }>
}): Promise<Metadata> {
  const { slug, location } = await params;
  const service = servicesData[slug];
  const normalizedLocation = location.toLowerCase() as keyof typeof locationData;

  if (!service || !validLocations.includes(normalizedLocation)) {
    return {};
  }

  const locationFormatted = normalizedLocation.charAt(0).toUpperCase() + normalizedLocation.slice(1);
  
  // Generate location-specific keywords and description
  const locationInfo = locationData[normalizedLocation];
  const areas = locationInfo.areas.join(', ');
  const locationKeywords = [
    `${service.title} in ${locationFormatted}`,
    `${service.title} installation ${locationFormatted}`,
    `${service.title} services ${locationFormatted}`,
    `best ${service.title} in ${locationFormatted}`,
    `professional ${service.title} ${locationFormatted}`,
    ...locationInfo.areas.map(area => `${service.title} in ${area}`),
    ...service.features.map(feature => `${feature} in ${locationFormatted}`),
  ];

  const enhancedDescription = `Professional ${service.title.toLowerCase()} services in ${locationFormatted}. 
    Serving ${areas}. Expert installation with 15-year warranty, quality materials, and free site visit. 
    ${service.detailedDescription} Call now for best service in ${locationFormatted}.`;

  return {
    title: `${service.title} in ${locationFormatted} | Best Installation Services | KGR Enterprises`,
    description: enhancedDescription,
    keywords: locationKeywords.join(', '),
    alternates: {
      canonical: getCanonicalUrl(`/services/${slug}/${normalizedLocation}`),
    },
    openGraph: {
      title: `${service.title} in ${locationFormatted} | KGR Enterprises`,
      description: `Professional ${service.title.toLowerCase()} services in ${locationFormatted}. Expert installation and maintenance by KGR Enterprises.`,
      url: `https://invisiblegrillsandsafetynets.in/services/${slug}/${normalizedLocation}`,
      siteName: 'KGR Invisible Grills & Safety Nets',
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: `${service.title} - Professional Installation Services in ${locationFormatted}`,
        },
      ],
      type: 'article',
      locale: 'en-IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} in ${locationFormatted}`,
      description: `Professional ${service.title.toLowerCase()} services in ${locationFormatted}.`,
      site: '@Kgr_Grills_Nets',
      creator: '@Kgr_Grills_Nets',
      images: [service.image],
    },
    verification: {
      google: 'P8HUVCb--rZ-IF-X_ZwXQX1FOPvjQI5M0MWRtAwVMfc',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateStaticParams(): { slug: string; location: string }[] {
  return Object.keys(servicesData).flatMap(slug =>
    validLocations.map(location => ({
      slug,
      location: location.toLowerCase()
    }))
  )
}

type Props = {
  params: Promise<{
    slug: string
    location: string
  }>
}

export default async function ServiceLocationPage({ params }: Props) {
  const { slug, location } = await params;
  const service = servicesData[slug];
  const normalizedLocation = location.toLowerCase() as keyof typeof locationData;

  if (!service || !validLocations.includes(normalizedLocation)) {
    notFound();
  }

  const locationFormatted = normalizedLocation.charAt(0).toUpperCase() + normalizedLocation.slice(1);
  const locationInfo = locationData[normalizedLocation as keyof typeof locationData];

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: service.title, url: `/services/${slug}` },
    { name: `${service.title} in ${locationFormatted}`, url: `/services/${slug}/${normalizedLocation}` }
  ]);

  // Import baseUrl
  const baseUrl = 'https://invisiblegrillsandsafetynets.in';
  const currentDate = new Date().toISOString();
  const oneYearFromNow = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString();

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Service", "HomeAndConstructionBusiness"],
        "@id": `${baseUrl}/services/${slug}/${normalizedLocation}#service`,
        "name": `${service.title} in ${locationFormatted}`,
        "description": service.description,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${baseUrl}/services/${slug}/${normalizedLocation}`
        },
        "serviceType": ["Installation Service", "Home Safety", service.title],
        "category": "Home Safety & Security Equipment",
        "areaServed": {
          "@type": "City",
          "name": locationFormatted,
          "containsPlace": locationInfo.areas.map(area => ({
            "@type": "Place",
            "name": area
          }))
        },
        "provider": {
          "@type": "LocalBusiness",
          "@id": "https://invisiblegrillsandsafetynets.in#organization",
          "name": "KGR Enterprises",
          "telephone": PRIMARY.phone,
          "image": {
            "@type": "ImageObject",
            "url": service.image,
            "width": 1200,
            "height": 675
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": locationFormatted,
            "addressRegion": locationInfo.state,
            "addressCountry": "IN",
          },
          "priceRange": "₹₹₹",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": locationInfo.latitude,
            "longitude": locationInfo.longitude
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "19:00"
          }
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": `${service.title} Services in ${locationFormatted}`,
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Free Site Inspection",
                "description": `Professional ${service.title.toLowerCase()} consultation in ${locationFormatted}`
              },
              "areaServed": locationInfo.areas,
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "0",
                "priceCurrency": "INR",
                "description": "Free site inspection and consultation",
                "validFrom": currentDate,
                "validThrough": oneYearFromNow
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Standard ${service.title} Installation`,
                "description": `Professional installation with quality materials and 15-year warranty`
              },
              "areaServed": locationInfo.areas,
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "110",
                "priceCurrency": "INR",
                "unitText": "per square foot",
                "validFrom": currentDate,
                "validThrough": oneYearFromNow
              },
              "warranty": {
                "@type": "WarrantyPromise",
                "durationOfWarranty": "P15Y",
                "warrantyScope": "Labor and Materials"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Premium ${service.title} Installation`,
                "description": `Premium grade materials with extended warranty and priority support`
              },
              "areaServed": locationInfo.areas,
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "150",
                "priceCurrency": "INR",
                "unitText": "per square foot",
                "validFrom": currentDate,
                "validThrough": oneYearFromNow
              },
              "warranty": {
                "@type": "WarrantyPromise",
                "durationOfWarranty": "P20Y",
                "warrantyScope": "Labor and Materials"
              }
            }
          ]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "1000",
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [
          {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": `${locationFormatted} Customer`
            },
            "datePublished": currentDate,
            "reviewBody": `Excellent ${service.title.toLowerCase()} installation service in ${locationFormatted}. Professional team and great quality.`
          },
          {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": `Verified Customer`
            },
            "datePublished": currentDate,
            "reviewBody": `Best ${service.title.toLowerCase()} service provider in ${locationFormatted}. Quick installation and excellent after-service support.`
          }
        ]
      },
      breadcrumbSchema
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />
      {/* Breadcrumb Section - Full width background */}
      <div className="bg-muted/30 pt-6">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="flex items-baseline gap-2 text-base md:text-lg text-muted-foreground overflow-hidden">
              <Link href="/services" className="hover:text-primary shrink-0 leading-none">Services</Link>
              <span className="shrink-0 leading-none">/</span>
              <Link href={`/services/${slug}`} className="hover:text-primary overflow-hidden truncate leading-none">{service.title}</Link>
              <span className="shrink-0 leading-none">/</span>
              <span className="text-foreground shrink-0 leading-none">{locationFormatted}</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content - Centered and constrained */}
      <div className="container mx-auto px-4 pb-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          <article className="space-y-8 md:space-y-12">
            {/* Hero Section */}
            <header className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  {service.title} in {locationFormatted}
                </h1>
                
                <div className="flex flex-wrap gap-4 text-sm md:text-base">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{locationInfo.description}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Same-day service available</span>
                  </div>
                </div>
              </div>

              {/* Service Image */}
              {service.image && (
                <div className="relative w-full h-64 md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-lg">
                  <OptimizedImage
                    src={service.image}
                    alt={`${service.title} installation in ${locationFormatted}`}
                    width={1200}
                    height={675}
                    priority={true}
                    className="w-full h-full"
                  />
                </div>
              )}

              <div className="prose prose-lg max-w-none">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Looking for professional {service.title.toLowerCase()} services in {locationFormatted}? 
                  KGR Enterprises is your trusted local provider with years of experience delivering 
                  top-quality installations throughout {locationFormatted} and surrounding areas.
                </p>
              </div>
            </header>

            {/* Service Overview */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">About Our {service.title} Service</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {service.description || `We specialize in ${service.title.toLowerCase()} installation and maintenance 
                  for residential and commercial properties in ${locationFormatted}. Our expert team ensures 
                  safety, quality, and durability in every installation.`}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you need installation for a high-rise apartment, independent house, or commercial 
                  building in {locationFormatted}, we provide customized solutions that meet your specific 
                  requirements and safety standards.
                </p>
              </div>
            </section>

            {/* Service Areas */}
            <section>
              <Card className="overflow-hidden">
                <CardContent className="p-6 md:p-8 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-semibold">Areas We Serve in {locationFormatted}</h2>
                    <p className="text-muted-foreground">
                      We provide {service.title.toLowerCase()} services across all major areas in {locationFormatted}, including:
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {locationInfo.areas.map((area) => (
                      <div key={area} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm font-medium">{area}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    And many more areas across {locationFormatted}. Contact us to confirm service availability in your locality.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Why Choose Us */}
            <section className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-semibold">Why Choose KGR Enterprises in {locationFormatted}?</h2>
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <Card className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">Local Expertise</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Quick response times with a dedicated team familiar with {locationFormatted}&apos;s 
                          building regulations and safety requirements
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">Quality Materials</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          High-grade materials designed to withstand local weather conditions with 
                          superior durability and longevity
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">Professional Installation</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Certified installers trained in latest safety standards and installation 
                          techniques with years of experience
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">After-Installation Support</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Dedicated maintenance and support team in {locationFormatted} for ongoing 
                          service and emergency repairs
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Process Section */}
            <section className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-semibold">Our Installation Process in {locationFormatted}</h2>
              <Card>
                <CardContent className="p-6 md:p-8">
                  <div className="space-y-6">
                    {[
                      {
                        step: 1,
                        title: "Free Consultation & Site Visit",
                        description: `Our experts visit your location in ${locationFormatted} to assess requirements and provide accurate quotation`
                      },
                      {
                        step: 2,
                        title: "Custom Solution Design",
                        description: "We design a tailored solution based on your specific needs and property requirements"
                      },
                      {
                        step: 3,
                        title: "Professional Installation",
                        description: "Our certified team completes installation efficiently with minimal disruption to your routine"
                      },
                      {
                        step: 4,
                        title: "Quality Check & Support",
                        description: `Final inspection and ongoing maintenance support from our ${locationFormatted} team`
                      }
                    ].map((item, index) => (
                      <div key={item.step} className={`flex gap-4 pb-6 ${index !== 3 ? 'border-b' : ''}`}>
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                            {item.step}
                          </div>
                        </div>
                        <div className="flex-1 pt-1">
                          <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* FAQ Section */}
            <section className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-semibold">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3">How quickly can you install in {locationFormatted}?</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      Most installations are completed within 1-2 days depending on the project size. 
                      We offer same-day site visits for urgent requirements in {locationFormatted}.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3">Do you provide warranty?</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      Yes, we provide comprehensive warranty on both materials and installation work. 
                      Contact us for specific warranty details for your project.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3">What areas do you cover in {locationFormatted}?</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      We serve all areas across {locationFormatted} including {locationInfo.areas.slice(0, 3).join(', ')}, 
                      and surrounding localities. Call us to confirm service in your area.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Related Services */}
            <section className="pt-4 space-y-8">
              <div className="grid gap-6">
                <RelatedServices currentService={slug} location={locationFormatted} />
              </div>
            </section>

            {/* CTA Section */}
            <section className="pt-8" aria-labelledby="cta-heading">
              <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 border-primary/20 shadow-lg">
                <CardContent className="p-8 md:p-10 text-center space-y-6">
                  <div className="space-y-3">
                    <h2 id="cta-heading" className="text-2xl md:text-3xl font-bold">
                      Ready to Get Started in {locationFormatted}?
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                      Schedule a free consultation with our experts. We&apos;ll visit your location, 
                      assess your needs, and provide a transparent quote with no hidden charges.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="gap-2 text-base" asChild>
                      <a href={PRIMARY.tel}>
                        <Phone className="h-5 w-5" />
                        Call Now for Free Visit
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" className="gap-2 text-base" asChild>
                      <Link href="/services">
                        View All Services
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}