"use client";

import { PRIMARY } from "@/constants/contacts";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, MessageCircle } from "lucide-react";

export default function ServiceCTA() {
  return (
    <section className="section-bg-4 relative py-16 md:py-24">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl rounded-3xl border border-blue-600/30 bg-gradient-to-br from-blue-600/20 via-blue-600/10 to-transparent backdrop-blur-sm p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white/70 mb-8">
            Get a free site visit and quotation today. Our experts will assess your requirements 
            and provide the best solution for your needs.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row items-center justify-center">
            <Button
              size="lg"
              className="w-full sm:w-auto cta-gradient text-white hover:opacity-90"
              asChild
            >
              <a href="/contact" className="flex items-center gap-2">
                Get Free Quote
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white/30 bg-white/10 text-white hover:bg-white/20"
              asChild
            >
              <a href={`tel:${PRIMARY.phone}`} className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Call Now
              </a>
            </Button>

            <Button
              size="lg"
              className="w-full sm:w-auto bg-green-600 text-white hover:bg-green-700"
              asChild
            >
              <a
                href={`https://wa.me/${PRIMARY.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
