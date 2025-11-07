import { MapPin } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { locationData } from '@/constants/locations';

const LocationsGrid = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Our Service Locations
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Professional installation services available across major cities in South India
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {Object.entries(locationData).map(([key, location]) => (
            <Link 
              key={key} 
              href={`/locations/${key}`}
              className="group"
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {location.name || key.charAt(0).toUpperCase() + key.slice(1)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {location.state}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {location.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {location.areas.slice(0, 3).map((area) => (
                        <span 
                          key={area}
                          className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground"
                        >
                          {area}
                        </span>
                      ))}
                      {location.areas.length > 3 && (
                        <span className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground">
                          +{location.areas.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationsGrid;