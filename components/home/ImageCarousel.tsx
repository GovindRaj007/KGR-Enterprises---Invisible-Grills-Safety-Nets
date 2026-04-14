"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const showcaseImages = [
  {
    src: "/images/invisible-grill-1.jpg",
    alt: "Invisible Grills Installation",
    label: "Invisible Grills",
  },
  {
    src: "/images/balcony-invisible-grill-1.jpg",
    alt: "Balcony Invisible Grills",
    label: "Balcony Invisible Grills",
  },
  {
    src: "/images/balcony-net-1.jpg",
    alt: "Balcony Safety Net",
    label: "Balcony Safety Net",
  },
  {
    src: "/images/children-protection-net-1.jpg",
    alt: "Children Protection Nets",
    label: "Children Protection Nets",
  },
  { src: "/images/pegion-net-1.jpg", alt: "Pigeon Nets", label: "Pigeon Nets" },
  {
    src: "/images/cloth-drying-pulley-1.jpg",
    alt: "Ceiling Cloth Drying Hangers",
    label: "Ceiling Cloth Hangers",
  },
  {
    src: "/images/service-gallery-1.jpg",
    alt: "Our Services - KGR Enterprises",
    label: "Our Services",
  },
];

const ImageCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isMobile = useIsMobile();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const total = showcaseImages.length;

  const nextImage = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(nextImage, 3500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextImage]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipe = touchStartX.current - touchEndX.current;
    if (Math.abs(swipe) > 50) {
      if (swipe > 0) {
        setActiveIndex((prev) => (prev + 1) % total);
      } else {
        setActiveIndex((prev) => (prev - 1 + total) % total);
      }
    }
    setIsPaused(false);
  };

  const getPosition = (index: number) => {
    const diff = (index - activeIndex + total) % total;
    if (diff === 0) return "center";
    if (diff === 1 || diff === -total + 1) return "right";
    if (diff === total - 1 || diff === -1) return "left";
    return "hidden";
  };

  const carouselHandlers = {
    onMouseDown: () => setIsPaused(true),
    onMouseUp: () => setIsPaused(false),
    onMouseLeave: () => setIsPaused(false),
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };

  return (
    <section className="relative overflow-hidden pt-10 md:pt-14 pb-10 md:pb-16 bg-white">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
          <span className="mb-3 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700">
            Our Work
          </span>
          <h2 className="font-heading text-2xl font-bold text-gray-900 md:text-4xl">
            Explore Our Services
          </h2>
        </div>

        {/* Desktop View - Full-width auto-sliding carousel */}
        {!isMobile ? (
          <div
            className="relative mx-auto w-4/5 overflow-hidden rounded-2xl shadow-lg"
            {...carouselHandlers}
          >
            <div className="relative w-full h-96 md:h-[500px] lg:h-[600px]">
              {showcaseImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                    index === activeIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`h-full ${index === showcaseImages.length - 1 ? "w-[70%]" : "w-full"}`}
                    loading="lazy"
                  />
                  {/* Label Overlay - Hide for promotional card */}
                  {index !== showcaseImages.length - 1 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[hsl(222,47%,11%,0.85)] to-transparent px-6 pb-6 pt-12">
                      <p className="font-heading text-xl font-semibold text-white md:text-2xl lg:text-3xl">
                        {image.label}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Mobile View - 3D Carousel */
          <div
            className="relative mx-auto flex h-[400px] items-center justify-center sm:h-[460px]"
            style={{ perspective: "1200px" }}
            {...carouselHandlers}
          >
            {showcaseImages.map((image, index) => {
              const position = getPosition(index);
              const isCenter = position === "center";
              const isLeft = position === "left";
              const isRight = position === "right";
              const isVisible = isCenter || isLeft || isRight;

              return (
                <div
                  key={index}
                  className="absolute transition-all duration-700 ease-in-out"
                  style={{
                    width: isCenter ? "min(360px, 85vw)" : "min(180px, 40vw)",
                    height: isCenter ? "min(420px, 90vw)" : "min(300px, 65vw)",
                    maxHeight: isCenter ? "480px" : "340px",
                    transform: isCenter
                      ? "translateX(-50%) translateZ(60px) scale(1)"
                      : isLeft
                        ? "translateX(calc(-50% - min(150px, 35vw))) translateZ(-40px) rotateY(25deg) scale(0.85)"
                        : isRight
                          ? "translateX(calc(-50% + min(150px, 35vw))) translateZ(-40px) rotateY(-25deg) scale(0.85)"
                          : "translateX(-50%) translateZ(-100px) scale(0.6)",
                    left: "50%",
                    opacity: isVisible ? 1 : 0,
                    zIndex: isCenter ? 30 : isVisible ? 20 : 10,
                    pointerEvents: isCenter ? "auto" : "none",
                    filter: isCenter ? "none" : "blur(1.5px) brightness(0.7)",
                  }}
                >
                  <div className="h-full w-full overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  {/* Label - Hide for promotional card */}
                  {isCenter && index !== showcaseImages.length - 1 && (
                    <div className="absolute bottom-0 left-0 right-0 rounded-b-2xl bg-gradient-to-t from-[hsl(222,47%,11%,0.85)] to-transparent px-4 pb-4 pt-10">
                      <p className="text-center font-heading text-base font-semibold text-white md:text-lg">
                        {image.label}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        {/* Dot Indicators */}
        <div className="mt-4 flex justify-center gap-2 md:mt-6">
          {showcaseImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`rounded-full transition-all duration-300 focus:outline-none min-h-0 min-w-0 flex-shrink-0 ${
                index === activeIndex
                  ? "h-2 md:h-3 w-7 md:w-9 bg-accent shadow-lg shadow-accent/50"
                  : "h-2 md:h-3 w-2 md:w-3 bg-muted-foreground/30 hover:bg-muted-foreground/50 hover:scale-125"
              }`}
              aria-label={`View ${showcaseImages[index].label}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;
