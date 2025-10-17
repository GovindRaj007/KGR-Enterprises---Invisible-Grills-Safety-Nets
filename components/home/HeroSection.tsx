'use client';

import Image from 'next/image';
import { Shield,Star, CheckCircle2 } from 'lucide-react';
import ConsultationForm from '@/components/shared/ConsultationForm';
import { SEO_BRANDING_TAGLINE } from '@/constants/seo';

const HeroSection = () => {
  const features = [
    "Best Invisible Grills",
    "Quality Safety Nets",
    "Free Site Inspection",
    "Professional Installation",
    "Warranty-Backed Service",
    "24/7 Support"
  ];

  return (
    <section className="relative min-h-[85vh] md:min-h-screen overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5">
      {/* 3D animated background (mobile-first) */}
      <div className="absolute inset-0 bg-3d-elements"></div>
      {/* subtle content overlay to keep hero text readable on all sizes */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent md:from-black/10 md:to-transparent pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          
          {/* Left Content - Mobile Optimized */}
          <div className="space-y-4 md:space-y-6 animate-fade-in lg:-mt-36">
            {/* Trust Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 md:px-4 md:py-2 bg-safety/10 rounded-full border border-safety/20">
              <Shield className="h-4 w-4 md:h-5 md:w-5 text-safety" />
              <span className="text-xs md:text-sm font-semibold text-safety">
                {SEO_BRANDING_TAGLINE}
              </span>
            </div>

            {/* Main Heading - Mobile Optimized */}
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold leading-tight">
              <span className="text-gradient block">
                Best Invisible Grills & Safety Nets
              </span>
              <span className="block text-lg md:text-2xl lg:text-3xl font-semibold mt-2 text-safety">
                in Hyderabad, Bangalore, Chennai & Andhra Pradesh
              </span>
            </h1>

            {/* Description - Concise for mobile */}
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
              Professional invisible grills, balcony safety nets, children protection nets, 
              bird nets & pet safety solutions. Trusted by 5000+ families across South India.
            </p>

            {/* Features Grid - 2 columns on mobile */}
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-2 text-xs md:text-base"
                >
                  <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 text-accent flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            

            {/* Social Proof - Compact on mobile */}
            <div className="flex items-center gap-3 pt-3 border-t border-border/50">
              <div className="flex items-center space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 md:h-4 md:w-4 fill-safety text-safety" />
                ))}
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                <span className="text-xs md:text-sm font-semibold">4.9/5</span>
                <span className="text-xs md:text-sm text-muted-foreground">
                  5000+ Families
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Image & Form */}
          <div className="space-y-4 md:space-y-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
            {/* Hero Image - Aspect ratio preserved */}
            <div className="relative group rounded-xl md:rounded-2xl overflow-hidden shadow-strong">
              <div className="relative h-64 md:h-80 lg:h-96">
                <Image 
                  src="/images/hero-image.jpg"
                  alt="Professional Invisible Grills and Safety Nets Installation in Hyderabad"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>

            {/* Quick Contact Form - Compact on mobile */}
            <div className="hidden md:block">
              <ConsultationForm />
            </div>
          </div>
        </div>

        {/* Mobile Form - Below fold for better initial load */}
        <div className="md:hidden mt-6">
          <ConsultationForm />
        </div>
      </div>

      {/* Decorative elements removed on desktop to reduce visual clutter */}
    </section>
  );
};

export default HeroSection;