"use client";

import React, { useEffect, useState, useRef, TouchEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
  altPrefix?: string;
  interval?: number;
};

export default function ServiceImageSlider({
  images,
  altPrefix = "",
  interval = 4000,
}: Props) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const dragOffset = useRef(0);
  const containerWidth = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-slide
  useEffect(() => {
    if (isPaused || !images || images.length <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, images, interval]);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    dragOffset.current = 0;
    if (containerRef.current) {
      containerWidth.current = containerRef.current.offsetWidth;
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
    const diff = touchEndX.current - touchStartX.current;
    dragOffset.current = (diff / (containerWidth.current || 1)) * 100;
  };

  const handleTouchEnd = () => {
    dragOffset.current = 0;
    const swipeDistance = touchStartX.current - touchEndX.current;
    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        next();
      } else {
        prev();
      }
    }
    setIsPaused(false);
  };

  if (!images || images.length === 0) return null;

  return (
    <section className="relative py-4 md:py-8 bg-white">
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl">
          <div
            ref={containerRef}
            className="overflow-hidden rounded-2xl shadow-xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
            onMouseLeave={() => setIsPaused(false)}
            style={{
              border: "1px solid rgba(75, 159, 255, 0.2)"
            }}
          >
            <div className="relative aspect-[5/4] sm:aspect-[4/3] md:aspect-[16/9] overflow-hidden">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    i === current
                      ? "opacity-100 translate-x-0"
                      : i < current
                      ? "opacity-0 -translate-x-full"
                      : "opacity-0 translate-x-full"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${altPrefix} - Image ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}

              {/* Arrows hidden on small screens */}
              <button
                onClick={prev}
                className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-2 md:p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
                style={{
                  backgroundColor: "rgba(255, 107, 66, 0.1)",
                  border: "1px solid rgba(255, 107, 66, 0.5)",
                  color: "#FF6B42",
                  boxShadow: "0 0 12px rgba(255, 107, 66, 0.2)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(75, 159, 255, 0.5)";
                  e.currentTarget.style.backgroundColor = "rgba(75, 159, 255, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 12px rgba(75, 159, 255, 0.2)";
                  e.currentTarget.style.backgroundColor = "rgba(75, 159, 255, 0.1)";
                }}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
              </button>

              <button
                onClick={next}
                className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 md:p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
                style={{
                  backgroundColor: "rgba(255, 107, 66, 0.1)",
                  border: "1px solid rgba(255, 107, 66, 0.5)",
                  color: "#FF6B42",
                  boxShadow: "0 0 12px rgba(255, 107, 66, 0.2)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(75, 159, 255, 0.5)";
                  e.currentTarget.style.backgroundColor = "rgba(75, 159, 255, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 12px rgba(75, 159, 255, 0.2)";
                  e.currentTarget.style.backgroundColor = "rgba(75, 159, 255, 0.1)";
                }}
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </button>

              {/* Dot Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`focus:outline-none rounded-full transition-all duration-200 ease-in-out min-h-0 min-w-0 ${
                      idx === current
                        ? "w-6 md:w-8 h-2"
                        : "w-3 h-3"
                    }`}
                    style={{
                      backgroundColor: idx === current ? "#FF6B42" : "rgba(255, 107, 66, 0.4)",
                      boxShadow: idx === current ? "0 0 12px rgba(75, 159, 255, 0.6)" : "none"
                    }}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
