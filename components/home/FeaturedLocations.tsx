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
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Our Service Locations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
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
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {location.name || key.charAt(0).toUpperCase() + key.slice(1)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
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
                            className="block text-sm hover:text-primary transition-colors"
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
                          className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View All Services Link */}
                  <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                    <Link href={`/locations/${key}`}>
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
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