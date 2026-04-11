"use client";

import React from 'react';
import { Shield, MapPin, Star, Phone, Award } from 'lucide-react';

type Service = {
  title: string;
  image?: string;
};

export default function ServiceHero({ service, mainLocationString }: { service: Service; mainLocationString: string }) {
  return (
    <div className="min-h-[320px] rounded-3xl shadow-2xl p-6 md:p-10 lg:p-12" style={{
      background: "linear-gradient(135deg, #121D2F 0%, #1E2A42 50%, #1E2A42 100%)",
      border: "1px solid #1E2A42"
    }}>
      <div className="inline-flex items-center gap-2 backdrop-blur-md border rounded-full px-4 py-2 mb-6" style={{
        backgroundColor: "rgba(75, 159, 255, 0.08)",
        borderColor: "rgba(75, 159, 255, 0.25)"
      }}>
        <Shield className="h-4 w-4 md:h-5 md:w-5" style={{ color: "#F0F6FF" }} />
        <span className="text-sm md:text-base font-semibold" style={{ color: "#F0F6FF" }}>Professional Installation</span>
      </div>

      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4" style={{ color: "#F0F6FF" }}>{service.title}</h1>

      <div className="flex items-start gap-2 mb-8 md:mb-10">
        <MapPin className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0 mt-1" style={{ color: "#FF6B42" }} />
        <p className="text-base md:text-xl font-medium" style={{ color: "#C8D8EE" }}>in {mainLocationString}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="backdrop-blur-md border rounded-2xl p-4 md:p-5" style={{
          backgroundColor: "rgba(75, 159, 255, 0.08)",
          borderColor: "rgba(75, 159, 255, 0.25)"
        }}>
          <div className="flex items-center gap-3">
            <div className="rounded-xl p-2.5 flex-shrink-0" style={{
              backgroundColor: "rgba(255, 107, 66, 0.15)"
            }}>
              <Star className="h-4 w-4 md:h-6 md:w-6" style={{ color: "#FF6B42", fill: "#FF6B42" }} />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-bold leading-tight whitespace-normal" style={{ color: "#F0F6FF" }}>4.9/5</p>
              <p className="text-xs md:text-sm whitespace-normal" style={{ color: "#C8D8EE" }}>Rating</p>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-md border rounded-2xl p-4 md:p-5" style={{
          backgroundColor: "rgba(75, 159, 255, 0.08)",
          borderColor: "rgba(75, 159, 255, 0.25)"
        }}>
          <div className="flex items-center gap-3">
            <div className="rounded-xl p-2.5 flex-shrink-0" style={{
              backgroundColor: "rgba(0, 200, 150, 0.15)"
            }}>
              <Shield className="h-4 w-4 md:h-6 md:w-6" style={{ color: "#00C896" }} />
            </div>
            <div>
              <p className="text-lg md:text-xl font-bold leading-tight whitespace-normal" style={{ color: "#F0F6FF" }}>Quality</p>
              <p className="text-xs md:text-sm whitespace-normal" style={{ color: "#C8D8EE" }}>Service</p>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-md border rounded-2xl p-4 md:p-5" style={{
          backgroundColor: "rgba(75, 159, 255, 0.08)",
          borderColor: "rgba(75, 159, 255, 0.25)"
        }}>
          <div className="flex items-center gap-3">
            <div className="rounded-xl p-2.5 flex-shrink-0" style={{
              backgroundColor: "rgba(75, 159, 255, 0.15)"
            }}>
              <Phone className="h-4 w-4 md:h-6 md:w-6" style={{ color: "#FF6B42" }} />
            </div>
            <div>
              <p className="text-lg md:text-xl font-bold leading-tight whitespace-normal" style={{ color: "#F0F6FF" }}>Free</p>
              <p className="text-xs md:text-sm whitespace-normal" style={{ color: "#C8D8EE" }}>Site Inspection</p>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-md border rounded-2xl px-2 py-4 md:p-5" style={{
          backgroundColor: "rgba(75, 159, 255, 0.08)",
          borderColor: "rgba(75, 159, 255, 0.25)"
        }}>
          <div className="flex items-center gap-3">
            <div className="rounded-xl p-2.5 flex-shrink-0" style={{
              backgroundColor: "rgba(46, 127, 217, 0.15)"
            }}>
              <Award className="h-4 w-4 md:h-6 md:w-6" style={{ color: "#2E7FD9" }} />
            </div>
            <div>
              <p className="text-md md:text-xl font-bold leading-tight whitespace-normal" style={{ color: "#F0F6FF" }}>Certified</p>
              <p className="text-xs md:text-sm whitespace-normal" style={{ color: "#C8D8EE" }}>Professionals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
