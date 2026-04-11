'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
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
    <section id="services" className="py-12 md:py-16 lg:py-24 relative" style={{
      background: "linear-gradient(180deg, #121D2F 0%, #1E2A42 100%)"
    }}>
      {/* Curved top edge to blend with HeroSlider bottom wave */}
      {/* <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -top-[100px] left-0 right-0 w-full h-auto block"
        preserveAspectRatio="none"
        style={{ minHeight: "100px" }}
      >
        <defs>
          <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "hsl(215, 25%, 97%)", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#121D2F", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path
          d="M0,80 Q360,105 720,80 T1440,80 L1440,0 L0,0 Z"
          fill="url(#curveGradient)"
        />
      </svg> */}

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold" style={{ color: "#F0F6FF" }}>
            Our <span style={{ color: "#FF6B42" }}>Safety Solutions</span>
          </h2>
          <p className="text-sm md:text-base lg:text-xl max-w-2xl mx-auto" style={{ color: "#C8D8EE" }}>
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
          <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-2 sm:grid-cols-4 mb-6 md:mb-8 h-auto p-1 gap-1" style={{ backgroundColor: "transparent" }}>
            {Object.entries(serviceCategories).map(([key, category]) => (
              <TabsTrigger 
                key={key}
                value={key}
                className="flex flex-col p-2 md:p-4 h-auto text-center min-h-[50px] md:min-h-[80px] text-xs md:text-sm rounded-b transition-smooth border"
                style={{
                  color: activeCategory === key ? "#FF6B42" : "#C8D8EE",
                  backgroundColor: activeCategory === key ? "rgba(75, 159, 255, 0.1)" : "transparent",
                  border: "1px solid rgba(100, 140, 200, 0.4)",
                  borderTop: activeCategory === key ? "2px solid #FF6B42" : "2px solid rgba(150, 180, 220, 0.6)"
                }}
                onMouseEnter={(e: any) => {
                  if (activeCategory !== key) {
                    e.currentTarget.style.borderTop = "2px solid #FF6B42";
                    e.currentTarget.style.borderLeft = "1px solid rgba(75, 159, 255, 0.6)";
                    e.currentTarget.style.borderRight = "1px solid rgba(75, 159, 255, 0.6)";
                    e.currentTarget.style.borderBottom = "1px solid rgba(75, 159, 255, 0.6)";
                  }
                }}
                onMouseLeave={(e: any) => {
                  if (activeCategory !== key) {
                    e.currentTarget.style.borderTop = "2px solid rgba(150, 180, 220, 0.6)";
                    e.currentTarget.style.borderLeft = "1px solid rgba(100, 140, 200, 0.4)";
                    e.currentTarget.style.borderRight = "1px solid rgba(100, 140, 200, 0.4)";
                    e.currentTarget.style.borderBottom = "1px solid rgba(100, 140, 200, 0.4)";
                  }
                }}
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
                <h3 className="text-xl md:text-2xl font-bold" style={{ color: "#FF6B42" }}>{category.title}</h3>
                <p className="text-sm md:text-base max-w-2xl mx-auto" style={{ color: "#C8D8EE" }}>
                  {category.description}
                </p>
              </div>

              {/* Services Grid */}
              <div id="services-grid" className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {getPaginatedServices(key).map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.id}`}
                    className="group rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: "linear-gradient(135deg, #1E2A42 0%, #121D2F 100%)",
                      border: "1px solid rgba(75, 159, 255, 0.2)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(75, 159, 255, 0.2)";
                      e.currentTarget.style.borderColor = "rgba(75, 159, 255, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
                      e.currentTarget.style.borderColor = "rgba(75, 159, 255, 0.2)";
                    }}
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <img src={service.image} alt={`${service.title} - Professional Installation Services in Hyderabad, Bangalore, Chennai & Vijayawada`} className="object-cover group-hover:scale-110 transition-transform duration-500 w-full h-full absolute inset-0" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className="absolute top-3 left-3 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-semibold" style={{
                        color: "#F0F6FF",
                        backgroundColor: "rgba(0, 212, 255, 0.2)",
                        border: "1px solid rgba(0, 212, 255, 0.5)"
                      }}>
                        {category.title}
                      </div>
                    </div>
                    <div className="p-4 md:p-6 space-y-4">
                      <h4 className="text-lg md:text-xl font-bold leading-tight" style={{ color: "#F0F6FF" }}>
                        {service.title}
                      </h4>
                      
                      <p className="text-xs md:text-sm line-clamp-3" style={{ color: "#C8D8EE" }}>
                        {service.description}
                      </p>

                      {/* Features Preview */}
                      <div className="space-y-2">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-xs md:text-sm" style={{ color: "#C8D8EE" }}>
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#FF6B42" }}></div>
                            <span className="line-clamp-1">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      {/* <div className="flex gap-2 pt-2" style={{ borderTop: "1px solid rgba(36, 61, 99, 0.5)" }}>
                        <button
                          className="flex-1 px-3 py-2 rounded text-xs md:text-sm font-semibold transition-all duration-200"
                          style={{
                            backgroundColor: "transparent",
                          color: "#FF6B42",
                          border: "1px solid rgba(75, 159, 255, 0.5)"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "rgba(75, 159, 255, 0.1)";
                          e.currentTarget.style.boxShadow = "0 0 12px rgba(75, 159, 255, 0.2)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                          aria-label={`Learn more about ${service.title}`}
                        >
                          <Link href={`/services/${service.id}`} className="flex items-center justify-center gap-2">
                            <Info className="h-3 w-3 md:h-4 md:w-4" />
                            Details
                          </Link>
                        </button>
                        <button
                          className="flex-1 px-3 py-2 rounded text-xs md:text-sm font-semibold transition-all duration-200"
                          style={{
                          background: "linear-gradient(135deg, #FF6B42 0%, #F25024 100%)",
                          color: "#ffffff",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(255, 107, 66, 0.2)"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 107, 66, 0.4)";
                          e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 107, 66, 0.2)";
                            e.currentTarget.style.transform = "none";
                          }}
                          aria-label={`Call now to inquire about ${service.title}`}
                        >
                          <a href={PRIMARY.tel} className="flex items-center justify-center gap-2" rel="noopener">
                            <Phone className="h-3 w-3 md:h-4 md:w-4" />
                            Call
                          </a>
                        </button>
                      </div> */}

                      {/* Link */}
                <span className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors group-hover:text-accent mt-auto">
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {getTotalPages(key) > 1 && (
                <div className="flex items-center justify-center gap-3 md:gap-4 mt-6 md:mt-8">
                  <button
                    onClick={() => handlePageChange(key, Math.max(1, currentPages[key] - 1))}
                    disabled={currentPages[key] === 1}
                    className="px-3 py-2 rounded text-xs md:text-sm font-semibold transition-all duration-200 gap-1 md:gap-2 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: "transparent",
                      color: "#FF6B42",
                      border: "1px solid rgba(255, 107, 66, 0.5)"
                    }}
                    onMouseEnter={(e) => {
                      if (!e.currentTarget.disabled) {
                        e.currentTarget.style.backgroundColor = "rgba(0, 212, 255, 0.1)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </button>
                  
                  <div className="flex items-center gap-1 md:gap-2">
                    {Array.from({ length: getTotalPages(key) }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(key, page)}
                        className="h-8 w-8 md:h-10 md:w-10 p-0 text-xs md:text-sm rounded font-semibold transition-all duration-200"
                        style={{
                          backgroundColor: currentPages[key] === page ? "#FF6B42" : "transparent",
                          color: currentPages[key] === page ? "#ffffff" : "#FF6B42",
                          border: currentPages[key] === page ? "1px solid #FF6B42" : "1px solid rgba(255, 107, 66, 0.5)"
                        }}
                        onMouseEnter={(e) => {
                          if (currentPages[key] !== page) {
                            e.currentTarget.style.backgroundColor = "rgba(75, 159, 255, 0.1)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentPages[key] !== page) {
                            e.currentTarget.style.backgroundColor = "transparent";
                          }
                        }}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => handlePageChange(key, Math.min(getTotalPages(key), currentPages[key] + 1))}
                    disabled={currentPages[key] === getTotalPages(key)}
                    className="px-3 py-2 rounded text-xs md:text-sm font-semibold transition-all duration-200 gap-1 md:gap-2 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: "transparent",
                      color: "#FF6B42",
                      border: "1px solid rgba(255, 107, 66, 0.5)"
                    }}
                    onMouseEnter={(e) => {
                      if (!e.currentTarget.disabled) {
                        e.currentTarget.style.backgroundColor = "rgba(0, 212, 255, 0.1)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
                  </button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* CTA Section */}
        <div className="text-center mt-12 md:mt-16">
          <div className="max-w-2xl mx-auto rounded-lg transition-all duration-300 p-6 md:p-8 space-y-4" style={{
            background: "linear-gradient(135deg, #1E2A42 0%, #121D2F 100%)",
            border: "1px solid rgba(75, 159, 255, 0.2)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
          }}>
            <h3 className="text-xl md:text-2xl font-bold" style={{ color: "#F0F6FF" }}>Need Custom Safety Solution?</h3>
            <p className="text-sm md:text-base" style={{ color: "#C8D8EE" }}>
              Our experts provide personalized safety net solutions tailored to your specific requirements
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button 
                className=" md:px-6 md:py-3 rounded-lg text-base font-semibold transition-all duration-200 gap-2 flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #FF6B42 0%, #F25024 100%)",
                  color: "#ffffff",
                  boxShadow: "0 4px 12px rgba(255, 107, 66, 0.2)"
                }}
              >
                <a href={PRIMARY.tel} className="flex items-center gap-2">
                  <Phone className="h-4 w-4 md:h-5 md:w-5" />
                  Free Site Visit
                </a>
              </button>
              <button 
                className="md:px-6 md:py-3 flex justify-center rounded-lg text-base font-semibold transition-all duration-200"
                style={{
                  backgroundColor: "transparent",
                  color: "#FF6B42",
                  border: "1px solid rgba(255, 107, 66, 0.5)",
                  boxShadow: "0 0 0 transparent"
                }}
                
              >
                <Link href="/services" className="flex items-center gap-2">
                  View All Services
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;