"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronUp, Phone, Mail, MapPin, Clock, ArrowRight, Shield } from 'lucide-react';
import { PRIMARY, SECONDARY, } from '@/constants/contacts';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const services = [
    { name: 'Invisible Grills', href: '/services/invisible-grills' },
    { name: 'Balcony Safety Nets', href: '/services/balcony-safety' },
    { name: 'Children Protection Nets', href: '/services/children-protection' },
    { name: 'Bird Protection Nets', href: '/services/pigeon-nets' },
    { name: 'All Sports Nets', href: '/services/all-sports-practice' },
  ];

  const locations = ['Bangalore', 'Hyderabad', 'Chennai', 'Vijayawada', 'Andhra Pradesh'];

  return (
    <>
      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed left-4 bottom-20 md:bottom-6 z-50 w-11 h-11 rounded-full bg-safety text-white shadow-strong hover:scale-110 transition-all duration-300 flex items-center justify-center animate-float"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}

      <footer className="bg-[hsl(220_39%_11%)] text-white relative">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-2 md:py-6 lg:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

            {/* Company Info */}
            <div className="space-y-2 md:space-y-3">
              <div className="space-y-4">
                <Image
                  src="/images/logo.png"
                  alt="KGR Enterprises Logo"
                  width={160}
                  height={10}
                  className="h-[4rem] w-auto object-cover -ml-[1rem] -mt-[5px] md:-mt-[10px]"
                />
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-0">
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
              <h3 className="text-base md:text-lg font-semibold">Our Services</h3>
              <ul className="space-y-2 md:space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.href}
                      className="text-gray-300 hover:text-safety transition-colors text-sm md:text-base flex items-center space-x-2 group"
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
              <h3 className="text-base md:text-lg font-semibold">Service Areas</h3>
              <ul className="space-y-2 md:space-y-3">
                {locations.map((location, index) => (
                  <li key={index}>
                    <div className="text-gray-300 text-sm md:text-base flex items-center space-x-2">
                      <MapPin className="h-3 w-3" />
                      <span>{location}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-base md:text-lg font-semibold">Contact Info</h3>

              <div className="space-y-3 md:space-y-4">
                <a href={PRIMARY.tel} className="flex items-start space-x-3 text-safety hover:underline group min-h-0">
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base font-medium">{PRIMARY.display}</span>
                </a>

                <a href={SECONDARY.tel} className="flex items-start space-x-3 text-gray-300 hover:text-safety hover:underline group min-h-0">
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base font-medium">{SECONDARY.display}</span>
                </a>

                <div className="flex items-start space-x-3">
                  <Mail className="h-4 w-4 text-safety mt-0.5 flex-shrink-0" />
                  <a href="mailto:kgr.invisiblegrills.nets@gmail.com" className="text-sm md:text-base hover:text-safety transition-colors break-all min-h-0">
                    kgr.invisiblegrills.nets@gmail.com
                  </a>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-4 w-4 text-safety mt-0.5 flex-shrink-0" />
                  <div className="text-sm md:text-base text-gray-300">
                    <div>Mon - Sat: 8:00 AM - 8:00 PM</div>
                    <div>Sun: 9:00 AM - 6:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700">
          <div className="container mx-auto px-4 py-4 md:py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-xs md:text-sm text-gray-400 text-center md:text-left">© 2025 KGR Enterprises. All rights reserved.</div>

              <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 text-xs md:text-sm">
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors min-h-0">About Us</Link>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors min-h-0">Services</Link>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors min-h-0">Contact</Link>
              </div>
            </div>

            {/* SEO Keywords Footer */}
            <div className="text-center mt-4 pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-500 leading-relaxed">
                Best invisible grills services in Hyderabad, Bangalore, Chennai, Andhra Pradesh | Quality invisible grills for balconies | Best safety nets | Balcony Safety Nets | Children Protection Nets | Bird Nets | Pigeon Nets | Professional safety net installation
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;