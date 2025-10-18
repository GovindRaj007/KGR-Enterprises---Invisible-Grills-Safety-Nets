'use client';

import { useState } from 'react';
import Link from 'next/link';
// replaced next/image with native <img>
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, ArrowRight, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { PRIMARY } from '@/constants/contacts';
import { servicesData, serviceCategories } from '@/data/servicesData';

const ServicesSection = () => {
  const [activeCategory, setActiveCategory] = useState('invisible-grills');
  const [currentPages, setCurrentPages] = useState<{ [key: string]: number }>({
    'safety-nets': 1,
    'bird-protection': 1,
    'invisible-grills': 1,
    'sports': 1
  });

  const SERVICES_PER_PAGE = 9;

  const getServicesForCategory = (categoryKey: string) => {
    const category = serviceCategories[categoryKey as keyof typeof serviceCategories];
    if (!category) return [];
    
    return category.services.map(serviceId => 
      servicesData[serviceId as keyof typeof servicesData]
    ).filter(Boolean);
  };

  const getPaginatedServices = (categoryKey: string) => {
    const services = getServicesForCategory(categoryKey);
    const currentPage = currentPages[categoryKey] || 1;
    const startIndex = (currentPage - 1) * SERVICES_PER_PAGE;
    const endIndex = startIndex + SERVICES_PER_PAGE;
    return services.slice(startIndex, endIndex);
  };

  const getTotalPages = (categoryKey: string) => {
    const services = getServicesForCategory(categoryKey);
    return Math.ceil(services.length / SERVICES_PER_PAGE);
  };

  const handlePageChange = (category: string, page: number) => {
    setCurrentPages(prev => ({
      ...prev,
      [category]: page
    }));
    
    // Smooth scroll to services grid
    const element = document.getElementById('services-grid');
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-12 md:py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold">
            Our <span className="text-gradient">Safety Solutions</span>
          </h2>
          <p className="text-sm md:text-base lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive range of safety nets and protection systems for homes, offices, and commercial spaces
          </p>
        </div>

        <Tabs 
          value={activeCategory} 
          onValueChange={(value) => {
            setActiveCategory(value);
            setCurrentPages(prev => ({ ...prev, [value]: 1 }));
          }}
          className="w-full"
        >
          {/* Category Tabs */}
          <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-2 sm:grid-cols-4 mb-6 md:mb-8 h-auto p-1 gap-1">
            {Object.entries(serviceCategories).map(([key, category]) => (
              <TabsTrigger 
                key={key}
                value={key}
                className="flex flex-col p-2 md:p-4 h-auto text-center min-h-[50px] md:min-h-[80px] text-xs md:text-sm data-[state=inactive]:bg-muted data-[state=inactive]:border data-[state=inactive]:border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded transition-smooth"
              >
                <span className="font-semibold leading-tight">{category.title}</span>
                <span className="text-xs opacity-75 mt-1 hidden sm:block">
                  {getServicesForCategory(key).length} services
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab Content */}
          {Object.entries(serviceCategories).map(([key, category]) => (
            <TabsContent key={key} value={key} className="space-y-6 md:space-y-8">
              {/* Category Description */}
              <div className="text-center space-y-2">
                <h3 className="text-xl md:text-2xl font-bold text-primary">{category.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>

              {/* Services Grid */}
              <div id="services-grid" className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {getPaginatedServices(key).map((service) => (
                  <Card
                    key={service.id}
                    className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardHeader className="p-0">
                      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                        <img src={service.image} alt={service.title} className="object-cover group-hover:scale-110 transition-transform duration-500 w-full h-full absolute inset-0" />
                        <Badge className="absolute top-3 left-3 bg-primary/90">
                          {category.title}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 space-y-4">
                      <CardTitle className="text-lg md:text-xl group-hover:text-primary transition-colors">
                        {service.title}
                      </CardTitle>
                      
                      <p className="text-xs md:text-sm text-muted-foreground line-clamp-3">
                        {service.description}
                      </p>

                      {/* Features Preview */}
                      <div className="space-y-2">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-xs md:text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                            <span className="line-clamp-1">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-2 text-xs md:text-sm"
                          asChild
                        >
                          <Link href={`/services/${service.id}`}>
                            <Info className="h-3 w-3 md:h-4 md:w-4" />
                            Details
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 gap-2 text-xs md:text-sm"
                          asChild
                        >
                          <a href={PRIMARY.tel}>
                            <Phone className="h-3 w-3 md:h-4 md:w-4" />
                            Call
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {getTotalPages(key) > 1 && (
                <div className="flex items-center justify-center gap-3 md:gap-4 mt-6 md:mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(key, Math.max(1, currentPages[key] - 1))}
                    disabled={currentPages[key] === 1}
                    className="gap-1 md:gap-2 text-xs md:text-sm"
                  >
                    <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </Button>
                  
                  <div className="flex items-center gap-1 md:gap-2">
                    {Array.from({ length: getTotalPages(key) }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPages[key] === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(key, page)}
                        className="h-8 w-8 md:h-10 md:w-10 p-0 text-xs md:text-sm"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(key, Math.min(getTotalPages(key), currentPages[key] + 1))}
                    disabled={currentPages[key] === getTotalPages(key)}
                    className="gap-1 md:gap-2 text-xs md:text-sm"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* CTA Section */}
        <div className="text-center mt-12 md:mt-16">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-6 md:p-8 space-y-4">
              <h3 className="text-xl md:text-2xl font-bold">Need Custom Safety Solution?</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Our experts provide personalized safety net solutions tailored to your specific requirements
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Button size="lg" className="gap-2" asChild>
                  <a href={PRIMARY.tel}>
                    <Phone className="h-4 w-4 md:h-5 md:w-5" />
                    Free Site Visit
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="gap-2" asChild>
                  <Link href="/services">
                    View All Services
                    <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;