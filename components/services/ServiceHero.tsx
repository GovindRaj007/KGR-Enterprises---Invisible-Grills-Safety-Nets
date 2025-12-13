"use client";

import React from 'react';
import { Shield, MapPin, Star, Phone, Award } from 'lucide-react';

type Service = {
  title: string;
  image?: string;
};

export default function ServiceHero({ service, mainLocationString }: { service: Service; mainLocationString: string }) {
  return (
    <div className="min-h-[320px] rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 shadow-2xl p-6 md:p-10 lg:p-12">
      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 mb-6">
        <Shield className="h-4 w-4 md:h-5 md:w-5 text-white" />
        <span className="text-sm md:text-base font-semibold text-white">Professional Installation</span>
      </div>

      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">{service.title}</h1>

      <div className="flex items-start gap-2 mb-8 md:mb-10">
        <MapPin className="h-5 w-5 md:h-6 md:w-6 text-blue-200 flex-shrink-0 mt-1" />
        <p className="text-base md:text-xl text-blue-50 font-medium">in {mainLocationString}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-5">
          <div className="flex items-center gap-3">
            <div className="bg-amber-400/20 rounded-xl p-2.5 flex-shrink-0">
              <Star className="h-4 w-4 md:h-6 md:w-6 text-amber-300 fill-amber-300" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-bold text-white leading-tight whitespace-normal">4.9/5</p>
              <p className="text-xs md:text-sm text-blue-100 whitespace-normal">Rating</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-5">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-400/20 rounded-xl p-2.5 flex-shrink-0">
              <Shield className="h-4 w-4 md:h-6 md:w-6 text-emerald-300" />
            </div>
            <div>
              <p className="text-lg md:text-xl font-bold text-white leading-tight whitespace-normal">Quality</p>
              <p className="text-xs md:text-sm text-blue-100 whitespace-normal">Service</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-5">
          <div className="flex items-center gap-3">
            <div className="bg-sky-400/20 rounded-xl p-2.5 flex-shrink-0">
              <Phone className="h-4 w-4 md:h-6 md:w-6 text-sky-300" />
            </div>
            <div>
              <p className="text-lg md:text-xl font-bold text-white leading-tight whitespace-normal">Free</p>
              <p className="text-xs md:text-sm text-blue-100 whitespace-normal">Site Inspection</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-2 py-4 md:p-5">
          <div className="flex items-center gap-3">
            <div className="bg-purple-400/20 rounded-xl p-2.5 flex-shrink-0">
              <Award className="h-4 w-4 md:h-6 md:w-6 text-purple-300" />
            </div>
            <div>
              <p className="text-md md:text-xl font-bold text-white leading-tight whitespace-normal">Certified</p>
              <p className="text-xs md:text-sm text-blue-100 whitespace-normal">Professionals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
