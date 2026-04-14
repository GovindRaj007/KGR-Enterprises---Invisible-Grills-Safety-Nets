"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Phone,
  ArrowRight,
  Grid3X3,
  Store,
  Fence,
  Shirt,
  Zap,
} from "lucide-react";

const slides = [
  {
    id: 1,
    icon: Grid3X3,
    title: "Invisible Grills",
    subtitle: "Premium Stainless Steel Protection",
    description:
      "Experience unobstructed views with our marine-grade SS316 invisible grills. Child-safe, rust-proof, and aesthetically superior protection for your balcony and windows.",
    image: "/images/invisible-grill-1.jpg",
    keywords: ["Child Safety", "Rust-Proof", "10-Year Warranty"],
    href: "/services/invisible-grills",
    cta: "Explore Invisible Grills",
  },
  {
    id: 2,
    icon: Store,
    title: "Invisible Grills Dealer",
    subtitle: "Authorized Dealership & Wholesale",
    description:
      "Partner with us for wholesale invisible grills. Access dealer pricing, installation training, and exclusive territory rights to grow your business.",
    image: "/images/invisible-grill-2.jpg",
    keywords: ["Wholesale Pricing", "Dealer Training", "Territory Rights"],
    href: "/services/invisible-grills-dealer",
    cta: "Become a Dealer",
  },
  {
    id: 3,
    icon: Fence,
    title: "Safety Nets",
    subtitle: "Child & Pet Protection Solutions",
    description:
      "Comprehensive safety nets for balcony, windows, and outdoor areas. Premium quality, weather-resistant, and certified for maximum protection for your family.",
    image: "/images/balcony-net-1.jpg",
    keywords: ["Child Safety", "Pet Protection", "Weather Resistant"],
    href: "/services/balcony-safety",
    cta: "Explore Safety Nets",
  },
  {
    id: 4,
    icon: Shirt,
    title: "Ceiling Cloth Hangers",
    subtitle: "Space-Saving Drying Solutions",
    description:
      "Maximize your space with our premium ceiling-mounted cloth drying systems. Pulley-operated, rust-proof, and designed for the modern Indian home.",
    image: "/images/cloth-drying-pulley-1.jpg",
    keywords: ["Pulley System", "Space Saving", "Rust-Proof"],
    href: "/services/cloth-drying",
    cta: "Explore Hangers",
  },
  {
    id: 5,
    icon: Zap,
    title: "Sports Nets",
    subtitle: "Professional Grade Sports Protection",
    description:
      "High-quality sports nets for cricket, badminton, and other sports. Durable, weather-resistant, and perfect for recreational and professional use.",
    image: "/images/all-sports-net-1.jpg",
    keywords: ["Professional Grade", "Durable", "Weather Resistant"],
    href: "/services/all-sports-practice",
    cta: "Explore Sports Nets",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const minSwipeDistance = 50;

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 1000);
    },
    [isAnimating],
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide]);

  // Auto-slide with pause support
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(nextSlide, 6000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [nextSlide, isPaused]);

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swiped left - next slide
        nextSlide();
      } else {
        // Swiped right - previous slide
        prevSlide();
      }
    }

    setIsPaused(false);
  };

  const handleMouseDown = () => {
    setIsPaused(true);
  };

  const handleMouseUp = () => {
    setIsPaused(false);
  };

  const slide = slides[currentSlide];

  return (
    <section
      className="relative w-full min-h-[450px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[600px] overflow-hidden rounded-xl"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background Images */}
      {slides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide
              ? "opacity-100 hero-slide-active"
              : "opacity-0"
          }`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="h-full w-full object-cover"
          />
          {/* Subtle dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-black/20" />
        </div>
      ))}

      {/* Content */}
      <div className="container z-10 flex h-full items-center">
        <div className="max-w-3xl py-8 md:py-12">
          {/* Badge */}
          <div
            key={`badge-${currentSlide}`}
            className="hero-content-animate mb-3 md:mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm font-medium text-white backdrop-blur-sm"
          >
            <slide.icon
              className="h-3 w-3 md:h-4 md:w-4"
              style={{ color: "#FF6B42" }}
            />
            India's Premium Safety Solutions Specialist
          </div>

          {/* Title */}
          <h1
            key={`title-${currentSlide}`}
            className="hero-content-animate mb-2 md:mb-3 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-white"
            style={{ animationDelay: "0.1s" }}
          >
            {slide.title}
          </h1>

          {/* Subtitle */}
          <h2
            key={`subtitle-${currentSlide}`}
            className="hero-content-animate mb-3 md:mb-4 font-semibold text-sm sm:text-base md:text-lg lg:text-xl text-accent"
            style={{ color: "", animationDelay: "0.2s" }}
          >
            {slide.subtitle}
          </h2>

          {/* Description */}
          <p
            key={`desc-${currentSlide}`}
            className="hero-content-animate mb-3 md:mb-4 max-w-2xl text-sm md:text-base lg:text-lg line-clamp-2 md:line-clamp-3"
            style={{
              color: "rgba(248, 251, 255, 0.8)",
              animationDelay: "0.3s",
            }}
          >
            {slide.description}
          </p>

          {/* Keywords */}
          <div
            key={`keywords-${currentSlide}`}
            className="hero-content-animate mb-3 md:mb-4 flex flex-wrap gap-1 md:gap-2"
            style={{ animationDelay: "0.4s" }}
          >
            {slide.keywords.map((keyword, idx) => (
              <span
                key={idx}
                className="rounded-full border px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm text-white/90 backdrop-blur-sm"
                style={{
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                }}
              >
                {keyword}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div
            key={`cta-${currentSlide}`}
            className="hero-content-animate flex flex-col items-start gap-2 sm:flex-row md:gap-3 mb-6 md:mb-8"
            style={{ animationDelay: "0.5s" }}
          >
            <Button
              size="sm"
              className="cta-gradient text-white h-9 md:h-10 text-xs md:text-sm px-4 md:px-5 flex items-center gap-2"
              asChild
            >
              <Link href={slide.href}>
                {slide.cta}
                <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
              </Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-9 md:h-10 text-xs md:text-sm px-4 md:px-5 flex items-center gap-2 text-white"
              style={{
                borderColor: "rgba(255, 255, 255, 0.3)",
                backgroundColor: "rgba(255, 255, 255, 0.10)",
              }}
              asChild
            >
              <a href="tel:+917339306098" data-track="call">
                <Phone className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">+91 7339306098</span>
                <span className="sm:hidden">Call Now</span>
              </a>
            </Button>
          </div>

          {/* Rating */}
          <div
            key={`rating-${currentSlide}`}
            className="hero-content-animate flex flex-col items-start gap-1 md:gap-2 pt-4 md:pt-6 border-t border-white/20"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="flex items-center gap-1.5 md:gap-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 flex-shrink-0 fill-current"
                  style={{ color: "#FF6B42" }}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.202 4.665 24 6 15.595 0 9.748l8.332-1.73z" />
                </svg>
              ))}
              <span className="text-xs md:text-sm lg:text-base font-bold text-white leading-tight">
                4.9/5
              </span>
            </div>
            <span className="text-xs md:text-sm text-white/80 leading-tight">
              5000+ Families Trusted
            </span>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 md:gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-300 focus:outline-none min-h-0 min-w-0 flex-shrink-0 ${
              index === currentSlide
                ? "h-2 md:h-2.5 w-6 md:w-8 bg-accent shadow-lg shadow-accent/50"
                : "h-2 md:h-2.5 w-2 md:w-2.5 bg-white/40 hover:bg-white/60 hover:scale-125"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
