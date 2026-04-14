"use client";
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ArrowRight, Shield } from 'lucide-react';
import { PRIMARY, SECONDARY, } from '@/constants/contacts';
import { PRIMARY_LOCATIONS } from '@/lib/seo-metadata';

const Footer = () => {
  const services = [
    { name: 'Invisible Grills', href: '/services/invisible-grills' },
    { name: 'Balcony Safety Net', href: '/services/balcony-safety' },
    { name: 'Children Protection Nets', href: '/services/children-protection' },
    { name: 'Bird Protection Nets', href: '/services/pigeon-nets' },
    { name: 'All Sports Nets', href: '/services/all-sports-practice' },
  ];

  const locations = PRIMARY_LOCATIONS.map(loc => ({ name: loc.name, slug: loc.name.toLowerCase() }));

  return (
    <footer className="text-white relative" style={{
        background: "linear-gradient(180deg, #0F1729 0%, #070A10 100%)",
        borderTop: "1px solid #1E2A42"
      }}>
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-2 md:py-6 lg:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

            {/* Company Info */}
            <div className="space-y-2 md:space-y-3">
              <div className="space-y-4">
                <img src="/logo.png" alt="KGR Enterprises - Professional Invisible Grills and Safety Nets Installation Services" className="h-[4rem] w-auto object-cover -ml-[1rem] -mt-[5px] md:-mt-[10px]" />
                <p className="text-sm md:text-base leading-relaxed mt-0" style={{ color: "#8FAAC8" }}>
                  KGR Enterprises delivers best quality invisible grills and safety nets across
                  Hyderabad, Bangalore, Chennai, and Andhra Pradesh. Protecting families with
                  premium safety solutions.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Shield className="h-4 w-4 text-safety" />
                <span className="text-sm">ISO Certified Company</span>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-base md:text-lg font-semibold" style={{ color: "#FF6B42" }}>Our Services</h3>
              <ul className="space-y-2 md:space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.href}
                      className="text-sm md:text-base flex items-center space-x-2 group transition-colors"
                      style={{ color: "#C8D8EE" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#FF6B42";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#C8D8EE";
                      }}
                    >
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      <span>{service.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Areas */}
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-base md:text-lg font-semibold" style={{ color: "#FF6B42" }}>Service Areas</h3>
              <ul className="space-y-2 md:space-y-3">
                {locations.map((location, index) => (
                  <li key={index}>
                    <Link 
                      href={`/locations/${location.slug}/`} 
                      className="text-sm md:text-base flex items-center space-x-2 transition-colors" 
                    style={{ color: "#C8D8EE" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#FF6B42";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#C8D8EE";
                      }}
                    >
                      <MapPin className="h-3 w-3" />
                      <span>{location.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-base md:text-lg font-semibold" style={{ color: "#FF6B42" }}>Contact Info</h3>

              <div className="space-y-3 md:space-y-4">
                <a href={PRIMARY.tel} className="flex items-start space-x-3 group min-h-0 transition-colors" style={{ color: "#FF6B42" }} rel="noopener">
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base font-medium" aria-label="Primary Contact Number">{PRIMARY.display}</span>
                </a>

                <a href={SECONDARY.tel} className="flex items-start space-x-3 group min-h-0 transition-colors" style={{ color: "#C8D8EE" }} rel="noopener"
                   onMouseEnter={(e) => {
                     e.currentTarget.style.color = "#FF6B42";
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.color = "#C8D8EE";
                   }}
                >
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base font-medium" aria-label="Secondary Contact Number">{SECONDARY.display}</span>
                </a>

                <div className="flex items-start space-x-3">
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: "#FF6B42" }} />
                  <a href="mailto:kgr.invisiblegrills.nets@gmail.com" className="text-sm md:text-base transition-colors min-h-0 relative group" rel="noopener" style={{ color: "#C8D8EE" }}
                     onMouseEnter={(e) => {
                     e.currentTarget.style.color = "#FF6B42";
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.color = "#C8D8EE";
                   }}
                  >
                    kgr.invisiblegrills.nets@gmail.com
                  </a>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: "#FF6B42" }} />
                  <div className="text-sm md:text-base" style={{ color: "#C8D8EE" }}>
                    <div>Mon - Sat: 8:00 AM - 8:00 PM</div>
                    <div>Sun: 9:00 AM - 6:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div style={{ borderTop: "1px solid #1E2A42" }}>
          <div className="container mx-auto px-4 py-4 md:py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-xs md:text-sm text-center md:text-left" style={{ color: "#8FAAC8" }}>© 2025 KGR Enterprises. All rights reserved.</div>

              <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 text-xs md:text-sm">
                <Link href="/about" className="transition-colors min-h-0" style={{ color: "#C8D8EE" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#F0F6FF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#C8D8EE";
                  }}
                >About Us</Link>
                <Link href="/services" className="transition-colors min-h-0" style={{ color: "#C8D8EE" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#F0F6FF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#C8D8EE";
                  }}
                >Services</Link>
                <Link href="/contact" className="transition-colors min-h-0" style={{ color: "#C8D8EE" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#F0F6FF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#C8D8EE";
                  }}
                >Contact</Link>
              </div>
            </div>

            {/* SEO Keywords Footer */}
            <div className="text-center mt-4 pt-4" style={{ borderTop: "1px solid #1E2A42" }}>
              <p className="text-xs leading-relaxed" style={{ color: "#546B8F" }}>
                Best invisible grills services in Hyderabad, Bangalore, Chennai, Andhra Pradesh | Quality invisible grill for balcony | Best safety nets | Balcony Safety Net | Children Protection Nets | Bird Nets | Pigeon Nets | Professional safety net installation
              </p>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;