"use client";

import Link from 'next/link';
import { servicesData, serviceCategories } from '@/data/servicesData';
import { ArrowRight } from 'lucide-react';

type Props = {
  currentService: string;
  location: string;
}

const RelatedServices = ({ currentService }: Omit<Props, 'location'>) => {
  // Find which category the current service belongs to
  const currentCategory = Object.entries(serviceCategories).find(([_, category]) =>
    category.services.includes(currentService)
  )?.[0];

  if (!currentCategory) return null;

  // Get other services from the same category
  const relatedServices = serviceCategories[currentCategory as keyof typeof serviceCategories].services
    .filter(serviceId => serviceId !== currentService)
    .slice(0, 4);

  return (
    <div className="flex flex-wrap gap-4">
      {relatedServices.map((serviceId) => {
        const service = servicesData[serviceId as keyof typeof servicesData];
        return (
          <Link
            key={serviceId}
            href={`/services/${service.id}`}
            className="group flex gap-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300 w-full md:w-auto  lg:max-w-[479px]"
          >
            {/* Image */}
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-slate-800">
              <img 
                src={service.image} 
                alt={service.title}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            
            {/* Content */}
            <div className="flex flex-1 flex-col justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-white/70 line-clamp-2">
                  {service.description}
                </p>
              </div>
              
              <div className="flex items-center gap-1 text-blue-400 group-hover:translate-x-1 transition-transform">
                <span className="text-xs font-medium">View Details</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default RelatedServices;