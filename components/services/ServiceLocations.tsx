import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ArrowRight } from 'lucide-react';
import { validLocations, locationData } from '@/constants/locations';
import { Button } from "@/components/ui/button";

type Props = {
  serviceSlug: string;
  serviceName: string;
}

const ServiceLocations = ({ serviceSlug, serviceName }: Props) => {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-semibold">Service Locations</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {validLocations.map((location) => {
          const locationInfo = locationData[location];
          return (
            <Card key={location} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {location.charAt(0).toUpperCase() + location.slice(1)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {locationInfo.state}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Professional {serviceName.toLowerCase()} services in {location.charAt(0).toUpperCase() + location.slice(1)}. 
                    {locationInfo.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {locationInfo.areas.slice(0, 3).map((area) => (
                      <span 
                        key={area} 
                        className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                  <Link href={`/services/${serviceSlug}/${location}`}>
                    View Details
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default ServiceLocations;