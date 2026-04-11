
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  location: string;
  breadcrumbItems?: BreadcrumbItem[];
};

export default function LocationHero({ location, breadcrumbItems }: Props) {
  return (
    <section className="relative overflow-hidden mb-0">
      <img src="/images/hero-image.jpg" alt={`Invisible Grills in ${location}`} className="object-cover w-full h-full absolute inset-0" />
      <div className="absolute inset-0" style={{
        background: "linear-gradient(135deg, rgba(5, 13, 31, 0.4) 0%, rgba(15, 32, 64, 0.3) 100%)"
      }} />
      <div className="relative container mx-auto px-4 py-16 md:py-24 lg:py-32">
        {/* Breadcrumbs Overlay */}
        {breadcrumbItems && breadcrumbItems.length > 0 && (
          <div className="mb-8 md:mb-12">
            <Breadcrumbs items={breadcrumbItems} darkMode={true} />
          </div>
        )}
        
        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4" style={{ color: "#F0F6FF" }}>
            Invisible Grills and Safety Nets in {location}
          </h1>
          <p className="text-base md:text-lg max-w-3xl mx-auto" style={{ color: "#C8D8EE" }}>
            Trusted invisible grills and safety nets installation throughout {location}. Complimentary site inspection and reliable, quality workmanship guaranteed.
          </p>
        </div>
      </div>
    </section>
  );
}
