import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { servicesData, serviceCategories } from '@/data/servicesData';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

type Props = {
  currentService: string;
  location: string;
}

const RelatedServices = ({ currentService, location }: Props) => {
  // Find which category the current service belongs to
  const currentCategory = Object.entries(serviceCategories).find(([_, category]) =>
    category.services.includes(currentService)
  )?.[0];

  if (!currentCategory) return null;

  // Get other services from the same category
  const relatedServices = serviceCategories[currentCategory as keyof typeof serviceCategories].services
    .filter(serviceId => serviceId !== currentService)
    .slice(0, 3);

  return (
    <section className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-semibold">Related Services in {location}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedServices.map((serviceId) => {
          const service = servicesData[serviceId as keyof typeof servicesData];
          return (
            <Card key={serviceId} className="bg-card border-border shadow-medium hover:bg-card-hover hover:shadow-strong transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="relative h-40 -mx-6 -mt-6 mb-6">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-card-foreground">{service.title}</h3>
                  <p className="text-sm text-card-foreground/75 line-clamp-2">
                    {service.description}
                  </p>
                </div>

                <Button variant="outline" size="sm" className="w-full gap-2 border-border text-safety hover:bg-card-hover" asChild>
                  <Link href={`/services/${service.id}/${location.toLowerCase()}`}>
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

export default RelatedServices;