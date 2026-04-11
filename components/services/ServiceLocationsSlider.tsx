"use client";

import React , { useState, useRef, TouchEvent} from "react";
import Link from "next/link";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const services = [
  { name: "Invisible Grills", slug: "invisible-grills" },
  { name: "Invisible Grills for Balcony", slug: "invisible-grills-balcony" },
  { name: "Invisible Grills Dealer", slug: "invisible-grills-dealer" },
  { name: "Balcony Safety Net", slug: "balcony-safety" },
  { name: "Children Protection Nets", slug: "children-protection" },
];

const allAreas = [
  {
    city: "Vijayawada",
    slug: "vijayawada",
    state: "Andhra Pradesh",
    localities: ["Benz Circle", "Governorpet", "Labbipet", "Patamata", "Gunadala", "Auto Nagar"],
  },
  {
    city: "Visakhapatnam",
    slug: "visakhapatnam",
    state: "Andhra Pradesh",
    localities: ["MVP Colony", "Dwaraka Nagar", "Gajuwaka", "Madhurawada", "Seethammadhara", "Beach Road"],
  },
  {
    city: "Hyderabad",
    slug: "hyderabad",
    state: "Telangana",
    localities: ["Banjara Hills", "Jubilee Hills", "Gachibowli", "Madhapur", "Kondapur", "Hitech City"],
  },
  {
    city: "Bangalore",
    slug: "bangalore",
    state: "Karnataka",
    localities: ["Whitefield", "Koramangala", "Indiranagar", "HSR Layout", "Marathahalli", "Electronic City"],
  },
  {
    city: "Chennai",
    slug: "chennai",
    state: "Tamil Nadu",
    localities: ["Anna Nagar", "T Nagar", "Velachery", "Adyar", "Porur", "OMR"],
  },
];

interface Area {
  city: string;
  slug: string;
  state: string;
  localities: string[];
}

interface LocationSliderProps {
  areas: Area[];
}

function LocationSlider({ areas }: LocationSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const [dragPx, setDragPx] = useState(0);
  const isDragging = useRef(false);
  const minSwipeDistance = 50;

  // Calculate visible items and max index dynamically
  // Mobile: 1 item, Tablet: 2 items, Desktop: 3 items
  const [visibleItems, setVisibleItems] = useState(1);

  // Update visible items based on window width
  React.useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth >= 1024) {
        setVisibleItems(3);
      } else if (window.innerWidth >= 768) {
        setVisibleItems(2);
      } else {
        setVisibleItems(1);
      }
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  // Calculate max scroll position
  const maxIndex = Math.max(0, areas.length - visibleItems);
  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < maxIndex;

  const scrollLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const scrollRight = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    isDragging.current = true;
    setDragPx(0);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
    const diff = touchEndX.current - touchStartX.current;
    setDragPx(diff);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    setDragPx(0);
    const swipeDistance = touchStartX.current - touchEndX.current;
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0 && canScrollRight) {
        scrollRight();
      } else if (swipeDistance < 0 && canScrollLeft) {
        scrollLeft();
      }
    }
  };

  return (
    <div className="relative ">
      {/* Navigation Icon - Left */}
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors duration-200 shadow-lg"
          aria-label="Previous location"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      )}

      {/* Navigation Icon - Right */}
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors duration-200 shadow-lg"
          aria-label="Next location"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      )}

      {/* Cards Container */}
      <div 
        className="overflow-hidden w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className={`flex gap-4 md:px-2 ${isDragging.current ? "" : "transition-transform duration-500 ease-out"}`}
          style={{ 
            transform: visibleItems === 1 
              ? `translateX(calc(-${currentIndex * 87}% - ${currentIndex * 1}rem + ${dragPx}px))`
              : `translateX(calc(-${currentIndex * 100 / visibleItems}% - ${currentIndex * 1}rem + ${dragPx}px))`
          }}
        >
          {areas.map((area, index) => (
            <div
              key={index}
              className={`flex-shrink-0 ${
                visibleItems === 1
                  ? "w-[87%]"
                  : visibleItems === 2
                    ? "w-[calc(50%-8px)]"
                    : "w-[calc(33.333%-11px)]"
              }`}
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:bg-white/10 h-full">
                {/* City Header */}
                <div className="mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">{area.city}</h3>
                    <p className="text-xs text-white/70">{area.state}</p>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-4 space-y-1.5">
                  {services.map((service, idx) => (
                    <Link
                      key={idx}
                      href={`/services/${service.slug}/${area.slug}`}
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white transition-colors hover:bg-white/15"
                    >
                      <span className="truncate">{service.name}</span>
                      <ArrowRight className="h-3 w-3 shrink-0" />
                    </Link>
                  ))}
                </div>

                {/* Localities */}
                <div>
                  <p className="mb-2 text-xs font-medium text-white/60">Popular Areas:</p>
                  <p className="text-xs text-white/80">{area.localities.slice(0, 3).join(" • ")}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator - Only show dots for actual slideable positions */}
      {maxIndex > 0 && (
        <div className="mt-4 flex justify-center gap-2 md:mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`rounded-full transition-all duration-300 focus:outline-none min-h-0 min-w-0 flex-shrink-0 ${
                index === currentIndex
                  ? "h-2 md:h-3 w-7 md:w-9 bg-blue-500 shadow-lg shadow-blue-500/50"
                  : "h-2 md:h-3 w-2 md:w-3 bg-white/30 hover:bg-white/50 hover:scale-125"
              }`}
              aria-label={`View slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function ServiceAreas() {
  return (
    <section className="relative py-12 md:py-16 px-4  overflow-hidden ">
      <div className="absolute inset-0 opacity-10" />
      <div className="relative z-10 w-full">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl px-4 text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-600/20 border border-blue-600/50 px-4 py-1.5 text-sm font-medium text-blue-300">
            Service Areas
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl">
            Professional Installation Across Multiple Cities
          </h2>
          <p className="text-lg text-white/80">
            Slide to explore our service areas and find the perfect solution for your city.
          </p>
        </div>

        {/* Location Slider */}
        <LocationSlider areas={allAreas} />
      </div>
    </section>
  );
}

export default ServiceAreas;


