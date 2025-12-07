"use client";

import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const t = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(t);
  }, [images, interval]);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  if (!images || images.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div className="relative">
        <div className="relative h-64 md:h-96 lg:h-[500px] overflow-hidden bg-slate-100">
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
            className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-2 md:p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-slate-900" />
          </button>

          <button
            onClick={next}
            className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-2 md:p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-slate-900" />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`focus:outline-none rounded-full transition-all duration-200 ease-in-out min-h-0 min-w-0 ${
                  idx === current
                    ? "bg-white w-6 md:w-8 h-2  shadow-sm"
                    : "bg-white/60 w-3 h-3 opacity-70"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
