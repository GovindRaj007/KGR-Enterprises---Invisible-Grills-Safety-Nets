"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  ArrowRight,
  Clock,
  Phone,
} from "lucide-react";


const ServiceLocationsSlider = ({ variant = 'stats',slug }) => {
  const [currentLocation, setCurrentLocation] = useState(0);

  const locations = [
    {
      city: "Hyderabad",
      state: "Telangana",
      tagline: "Leading Installation Hub",
      services: [
        {
          name: "Invisible Grills in Hyderabad",
          link: "/services/invisible-grills/hyderabad",
        },
        {
          name: "Balcony Safety Nets in Hyderabad",
          link: "/services/balcony-safety/hyderabad",
        },
        {
          name: "Pigeon Nets in Hyderabad",
          link: "/services/pigeon-nets/hyderabad",
        },
        {
          name: "Children Protection Nets in Hyderabad",
          link: "/services/children-protection/hyderabad",
        },
      ],
      areas:
        "Kukatpally, Madhapur, Gachibowli, Hitech City and surrounding regions",
      projects: "500+",
      rating: "5.0",
      responseTime: "Same Day",
      gradient: "from-orange-500 via-red-500 to-pink-600",
      bgPattern: "from-orange-50 to-red-50",
      icon: "🏙️",
      link:
        slug === "" ? `/locations/hyderabad` : `/services/${slug}/hyderabad`,
    },
    {
      city: "Bangalore",
      state: "Karnataka",
      tagline: "Tech City Experts",
      services: [
        {
          name: "Invisible Grills in Bangalore",
          link: "/services/invisible-grills/bangalore",
        },
        {
          name: "Balcony Safety Nets in Bangalore",
          link: "/services/balcony-safety/bangalore",
        },
        {
          name: "Pigeon Nets in Bangalore",
          link: "/services/pigeon-nets/bangalore",
        },
        {
          name: "Children Protection Nets in Bangalore",
          link: "/services/children-protection/bangalore",
        },
      ],
      areas:
        "Whitefield, Electronic City, Koramangala, HSR and surrounding regions",
      projects: "450+",
      rating: "5.0",
      responseTime: "24 Hours",
      gradient: "from-blue-500 via-indigo-500 to-purple-600",
      bgPattern: "from-blue-50 to-indigo-50",
      icon: "🌆",
      link:
        slug === "" ? `/locations/bangalore` : `/services/${slug}/bangalore`,
    },
    {
      city: "Chennai",
      state: "Tamil Nadu",
      tagline: "Coastal Safety Solutions",
      services: [
        {
          name: "Invisible Grills in Chennai",
          link: "/services/invisible-grills/chennai",
        },
        {
          name: "Balcony Safety Nets in Chennai",
          link: "/services/balcony-safety/chennai",
        },
        {
          name: "Pigeon Nets in Chennai",
          link: "/services/pigeon-nets/chennai",
        },
        {
          name: "Children Protection Nets in Chennai",
          link: "/services/children-protection/chennai",
        },
      ],
      areas: "Velachery, OMR, Porur, Adyar, Anna Nagar and surrounding regions",
      projects: "380+",
      rating: "5.0",
      responseTime: "Same Day",
      gradient: "from-teal-500 via-cyan-500 to-blue-600",
      bgPattern: "from-teal-50 to-cyan-50",
      icon: "🏖️",
      link: slug === "" ? `/locations/chennai` : `/services/${slug}/chennai`,
    },
    {
      city: "Vijayawada",
      state: "Andhra Pradesh",
      tagline: "Growing Urban Center",
      services: [
        {
          name: "Invisible Grills in Vijayawada",
          link: "/services/invisible-grills/vijayawada",
        },
        {
          name: "Balcony Safety Nets in Vijayawada",
          link: "/services/balcony-safety/vijayawada",
        },
        {
          name: "Pigeon Nets in Vijayawada",
          link: "/services/pigeon-nets/vijayawada",
        },
        {
          name: "Children Protection Nets in Vijayawada",
          link: "/services/children-protection/vijayawada",
        },
      ],
      areas:
        "Benz Circle, Governorpet, Patamata, Auto Nagar and surrounding regions",
      projects: "200+",
      rating: "5.0",
      responseTime: "24 Hours",
      gradient: "from-green-500 via-emerald-500 to-teal-600",
      bgPattern: "from-green-50 to-emerald-50",
      icon: "🌇",
      link:
        slug === "" ? `/locations/vijayawada` : `/services/${slug}/vijayawada`,
    },
    {
      city: "Visakhapatnam",
      state: "Andhra Pradesh",
      tagline: "Port City Specialists",
      services: [
        {
          name: "Invisible Grills in Visakhapatnam",
          link: "/services/invisible-grills/visakhapatnam",
        },
        {
          name: "Balcony Safety Nets in Visakhapatnam",
          link: "/services/balcony-safety/visakhapatnam",
        },
        {
          name: "Pigeon Nets in Visakhapatnam",
          link: "/services/pigeon-nets/visakhapatnam",
        },
        {
          name: "Children Protection Nets in Visakhapatnam",
          link: "/services/children-protection/visakhapatnam",
        },
      ],
      areas:
        "MVP Colony, Madhurawada, Gajuwaka, Dwaraka Nagar and surrounding regions",
      projects: "250+",
      rating: "5.0",
      responseTime: "Same Day",
      gradient: "from-violet-500 via-purple-500 to-fuchsia-600",
      bgPattern: "from-violet-50 to-purple-50",
      icon: "⚓",
      link:
        slug === ""
          ? `/locations/visakhapatnam`
          : `/services/${slug}/visakhapatnam`,
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLocation((prev) => (prev + 1) % locations.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [locations.length]);

  const handleCardClick = (link) => {
    window.location.href = link;
  };

  const handleServiceClick = (e: React.MouseEvent, link: string) => {
    e.stopPropagation();
    window.location.href = link;
  };

  const handleLearnMore = (e, link) => {
    e.stopPropagation();
    window.location.href = link;
  };

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full p-3">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Service Locations
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Professional installation across major cities
            </p>
          </div>
        </div>

        {/* Location Slider */}
        <div className="relative">
          {/* Main Card Container */}
          <div
            className="relative overflow-hidden rounded-3xl shadow-2xl"
            style={{ 
              minHeight: variant === 'services' ? '560px' : '420px',
            }}
          >
            {locations.map((location, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(location.link)}
                className={`absolute inset-0 transition-all duration-700 ease-in-out cursor-pointer ${
                  index === currentLocation
                    ? "opacity-100 translate-x-0"
                    : index < currentLocation
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full"
                }`}
              >
                <div
                  className={`h-full bg-gradient-to-br ${location.gradient} relative overflow-hidden`}
                >
                  {/* Decorative Background Elements */}
                  <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                  <div className="relative z-10 h-full p-6 md:p-10 flex flex-col justify-between gap-0 md:gap-6">
                    {variant === "stats" ? (
                      <>
                        {/* Top Section */}
                        <div className="space-y-4">
                          {/* City Icon & Name */}
                          <div className="flex items-center gap-3">
                            <span className="text-5xl md:text-6xl">
                              {location.icon}
                            </span>
                            <div>
                              <h3 className="text-2xl md:text-5xl font-bold text-white">
                                {location.city}
                              </h3>
                              <p className="text-white/90 text-sm md:text-base font-medium">
                                {location.tagline}
                              </p>
                            </div>
                          </div>

                          {/* Stats Grid */}
                          <div className="grid grid-cols-3 gap-3 mt-6">
                            {/* Projects */}
                            <div className="flex-column md:justify-center bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4">
                              <div className="flex justify-center gap-2 mb-1">
                                <p className="flex justify-center text-2xl md:text-3xl font-bold text-white">
                                  {location.projects}    
                                </p>
                              </div>
                              <p className="flex justify-center text-xs text-white/80">
                                Projects Done
                              </p>
                            </div>

                            {/* Rating */}
                            <div className="flex-column md:justify-center bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4">
                              <div className="flex items-center justify-center gap-2 mb-1">
                                {/* <Star className="h-8 w-8 text-yellow-300 fill-yellow-300" /> */}
                                <p>⭐</p>
                                <p className="flex justify-center text-2xl md:text-3xl font-bold text-white">
                                  {location.rating}
                                </p>
                              </div>
                              <p className="flex justify-center text-xs text-white/80">Rating</p>
                            </div>

                            {/* Response Time */}
                            <div className="flex-column md:justify-center bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4">
                              <div className="flex items-center md:justify-center gap-2 mb-1">
                                <Clock className="h-4 w-4 text-white" />
                              </div>
                              <p className="flex justify-center text-xs font-semibold text-white">
                                {location.responseTime}
                              </p>
                              <p className="flex justify-center text-xs text-white/80">Response</p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-6">
                          {/* City Header */}
                          <div className="flex items-start gap-3">
                            <span className="text-5xl md:text-6xl">
                              {location.icon}
                            </span>
                            <div>
                              <h3 className="text-2xl md:text-4xl font-bold text-white">
                                {location.city}
                              </h3>
                              <p className="text-white/90 text-sm md:text-base font-medium">
                                {location.state}
                              </p>
                            </div>
                          </div>

                          {/* Services List */}
                          <div className="space-y-2">
                            {location.services?.map((service, serviceIndex) => (
                              <button
                                key={serviceIndex}
                                onClick={(e) =>
                                  handleServiceClick(e, service.link)
                                }
                                className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-3 text-left transition-all duration-200 group"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-white font-medium text-sm md:text-base flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full group-hover:scale-150 transition-transform" />
                                    {service.name}
                                  </span>
                                  <ArrowRight className="h-4 w-4 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {/* Bottom Section */}
                    <div className="space-y-2 mt-2">
                      {/* Areas Served */}
                      <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-4">
                        <p className="text-white/80 text-xs font-semibold mb-2">
                          AREAS COVERED
                        </p>
                        <p className="text-white font-medium text-sm md:text-base">
                          {location.areas}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={(e) => handleLearnMore(e, location.link)}
                          className="flex-1 bg-white hover:bg-white/90 text-slate-900 font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                        >
                          <span>View Details</span>
                          <ArrowRight className="h-5 w-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = "tel:+919618568669";
                          }}
                          className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg"
                        >
                          <Phone className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dot Indicators with City Names */}
          <div className="flex justify-center gap-3 mt-6 flex-wrap">
            {locations.map((location, index) => (
              <button
                key={index}
                onClick={() => setCurrentLocation(index)}
                className={`transition-all duration-300 rounded-full px-4 py-2 text-sm font-medium ${
                  index === currentLocation
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
                    : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                }`}
                aria-label={`Go to ${location.city}`}
              >
                {location.city}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceLocationsSlider;
