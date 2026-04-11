import dynamic from 'next/dynamic';
import { SEO_BRANDING_TAGLINE } from '@/constants/seo';

const ConsultationFormClient = dynamic(() => import('@/components/shared/ConsultationFormClient'), { loading: () => <div /> });

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{
      background: "linear-gradient(180deg, #0F1729 0%, #0A111A 100%)"
    }}>
      {/* 3D animated background */}
      <div className="absolute inset-0 bg-3d-elements" />
      {/* Content overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent md:from-black/10 md:to-transparent pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 lg:py-16 min-h-[85vh] md:min-h-screen  flex items-center">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 w-full">

          {/* Left: Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full" style={{
              backgroundColor: "rgba(75, 159, 255, 0.08)",
              border: "1px solid rgba(75, 159, 255, 0.25)"
            }}>
              <span className="text-xs md:text-sm lg:text-base font-semibold" style={{ color: "#FF6B42" }}>{SEO_BRANDING_TAGLINE}</span>
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              <span style={{ color: "#F0F6FF" }}>Best Invisible Grills & Safety Nets</span>
              <span className="block text-lg md:text-2xl lg:text-3xl xl:text-4xl font-semibold mt-2" style={{ color: "#FF6B42" }}>in Hyderabad, Bangalore, Chennai & Andhra Pradesh</span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl xl:text-2xl" style={{ color: "#C8D8EE" }}>
              Professional invisible grills, balcony safety net, children protection nets,
              bird nets & pet safety solutions. Trusted by 5000+ families across South India.
            </p>

            {/* Features Grid */}
            <div className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {['Best Invisible Grills','Quality Safety Nets','Free Site Inspection','Professional Installation','Warranty-Backed Service','24/7 Support'].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-xs md:text-base lg:text-lg" style={{ color: "#C8D8EE" }}>
                    <svg className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: "#FF6B42" }}>
                      <path d="M12 0C5.371 0 0 5.371 0 12s5.371 12 12 12 12-5.371 12-12S18.629 0 12 0zm-1.2 17.4l-5.6-5.6 1.68-1.68 3.92 3.92 7.12-7.12 1.68 1.68-8.88 8.8z"/>
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-3 pt-3" style={{ borderTop: "1px solid rgba(184, 204, 234, 0.2)" }}>
                <div className="flex items-center space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 fill-current" style={{ color: "#FF6B42" }} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.202 4.665 24 6 15.595 0 9.748l8.332-1.73z"/>
                    </svg>
                  ))}
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                  <span className="text-xs md:text-sm lg:text-base font-semibold" style={{ color: "#F0F6FF" }}>4.9/5</span>
                  <span className="text-xs md:text-sm lg:text-base" style={{ color: "#C8D8EE" }}>5000+ Families</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Image & Form */}
          <div className="space-y-4 md:space-y-6 animate-fade-in">
            <div className="relative group rounded-xl md:rounded-2xl overflow-hidden shadow-strong">
              <div className="relative aspect-[16/9] md:aspect-[4/3] lg:aspect-[3/2]">
                <img 
                  src="/images/hero-image.jpg" 
                  alt="Professional Invisible Grills and Safety Nets Installation" 
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 absolute inset-0" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>

            {/* Desktop Form */}
            <div className="hidden md:block">
              <ConsultationFormClient />
            </div>
          </div>
        </div>

        {/* Mobile Form */}
        <div className="md:hidden mt-6">
          <ConsultationFormClient />
        </div>
      </div>
    </section>
  );
}