'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ImageCarousel = () => {
  const images = [
    {
      src: "/images/service-gallery-3.jpg",
      title: "Invisible Grills Installation",
      description: "Modern security solutions for balconies and windows",
      alt: "Invisible Grills for Balconies in Hyderabad"
    },
    {
      src: "/images/service-gallery-1.jpg",
      title: "Professional Safety Nets",
      description: "Expert balcony safety net installation services",
      alt: "Balcony Safety Nets in Bangalore"
    },
    {
      src: "/images/service-gallery-2.jpg",
      title: "Children Protection Nets",
      description: "Child-safe nets for homes and apartments",
      alt: "Children Protection Nets in Chennai"
    },
    {
      src: "/images/service-gallery-4.jpg",
      title: "Bird Protection Solutions",
      description: "Eco-friendly bird control and pigeon nets",
      alt: "Bird Protection Nets in Hyderabad"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      goToNext();
    }
    if (touchStart - touchEnd < -75) {
      goToPrevious();
    }
  };

  return (
    <section 
      className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Images */}
      <div className="relative h-full w-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={image.src} alt={image.alt} className="object-cover w-full h-full absolute inset-0" />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Content Overlay - Mobile Optimized */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white space-y-2 md:space-y-4 max-w-xl md:max-w-2xl px-4">
          <h2 className="text-xl md:text-3xl lg:text-5xl font-bold leading-tight">
            {images[currentIndex].title}
          </h2>
          <p className="text-sm md:text-base lg:text-xl opacity-90">
            {images[currentIndex].description}
          </p>
        </div>
      </div>

      {/* Navigation Buttons - Smaller on mobile */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-8 w-8 md:h-10 md:w-10 p-0"
        onClick={goToPrevious}
        aria-label="Previous image"
      >
        <ChevronLeft className="h-5 w-5 md:h-8 md:w-8" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-8 w-8 md:h-10 md:w-10 p-0"
        onClick={goToNext}
        aria-label="Next image"
      >
        <ChevronRight className="h-5 w-5 md:h-8 md:w-8" />
      </Button>

      {/* Dots Indicator - Smaller on mobile */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : undefined}
            className={`focus:outline-none transition-all duration-200 ease-in-out min-h-0 min-w-0 ${index === currentIndex ? 'bg-white w-8 md:w-12 h-2 rounded-full shadow-sm' : 'bg-white/60 w-3 h-3 rounded-full opacity-70'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ImageCarousel;