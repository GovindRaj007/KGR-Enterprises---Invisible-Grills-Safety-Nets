'use client';

import { MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { locationData } from '@/constants/locations';
import { servicesData } from '@/data/servicesData';

// Top services to feature for each location
const FEATURED_SERVICES = [
  'invisible-grills',
  'balcony-safety',
  'pigeon-nets',
  'children-protection'
];

const FeaturedLocations = () => {
  return (
    <section className="py-12 md:py-16" style={{
      background: "linear-gradient(180deg, #0F1729 0%, #0A111A 100%)"
    }}>
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold" style={{ color: "#F0F6FF" }}>
            Our Service Locations
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: "#C8D8EE" }}>
            Professional installation services available across major cities in South India
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(locationData).map(([key, location], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-full rounded-lg transition-all" style={{
                background: "linear-gradient(135deg, #1E2A42 0%, #121D2F 100%)",
                border: "1px solid rgba(30, 42, 66, 0.5)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                padding: "1.5rem"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(75, 159, 255, 0.2)";
                e.currentTarget.style.borderColor = "rgba(75, 159, 255, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
                e.currentTarget.style.borderColor = "rgba(30, 42, 66, 0.5)";
              }}
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: "rgba(75, 159, 255, 0.1)" }}>
                    <MapPin className="h-5 w-5" style={{ color: "#FF6B42" }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg" style={{ color: "#F0F6FF" }}>
                        {location.name || key.charAt(0).toUpperCase() + key.slice(1)}
                      </h3>
                      <p className="text-sm" style={{ color: "#C8D8EE" }}>
                        {location.state}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Top Services Links */}
                    <div className="space-y-2">
                      {FEATURED_SERVICES.map(serviceId => {
                        const service = servicesData[serviceId];
                        return (
                          <Link
                            key={serviceId}
                            href={`/services/${serviceId}/${key}`}
                            className="block text-sm transition-colors"
                            style={{ color: "#C8D8EE" }}
                          >
                            • {service.title} in {location.name}
                          </Link>
                        );
                      })}
                    </div>

                    {/* Areas Served */}
                    <div className="flex flex-wrap gap-2">
                      {location.areas.slice(0, 3).map((area) => (
                        <span
                          key={area}
                          className="text-xs px-2 py-1 rounded-md"
                          style={{
                            background: "rgba(46, 127, 217, 0.15)",
                            color: "#C8D8EE",
                            border: "1px solid rgba(46, 127, 217, 0.3)"
                          }}
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View All Services Link */}
                  <button className="w-full gap-2 text-sm py-2 rounded-lg transition-all" style={{
                    backgroundColor: "transparent",
                    color: "#FF6B42",
                    border: "1px solid rgba(75, 159, 255, 0.5)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(75, 159, 255, 0.1)";
                    e.currentTarget.style.boxShadow = "0 0 12px rgba(75, 159, 255, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  >
                    <Link href={`/locations/${key}/`} className="flex items-center justify-center gap-2">
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLocations;