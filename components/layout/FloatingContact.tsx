'use client';

import { Button } from "@/components/ui/button";
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { PRIMARY } from '@/constants/contacts';

const FloatingContact = () => {
  const contactOptions = [
    {
      icon: FaPhoneAlt,
      label: "Call",
       action: PRIMARY.tel,
      bg: "bg-cyan-400",
      delay: "0ms"
    },
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
       action: `${PRIMARY.wa}?text=Hi%2C%20I%20need%20a%20quote%20for%20invisible%20grills%20and%20safety%20nets`,
      bg: "bg-whatsapp",
      delay: "100ms"
    }
  ];

  return (
    <div className="fixed right-4 bottom-4 md:bottom-6 z-50 flex flex-col space-y-3">
      {contactOptions.map((option, index) => {
        const IconComponent = option.icon;
        return (
          <Button
            key={index}
            asChild
            size="lg"
            className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${option.bg} text-white border-2 border-white/20 hover:scale-110 transition-all duration-300 animate-fade-in backdrop-blur-sm p-0`}
            style={{ 
              animationDelay: option.delay,
              boxShadow: option.label === "WhatsApp" 
                ? "0 4px 20px rgba(37, 211, 102, 0.50), 0 0 40px rgba(37, 211, 102, 0.20)"
                : "0 4px 20px rgba(0, 212, 255, 0.40), 0 0 40px rgba(0, 212, 255, 0.15)"
            }}
          >
            <a 
              href={option.action}
              target={option.action.startsWith('http') ? '_blank' : '_self'}
              rel={option.action.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={option.label}
              className="flex items-center justify-center relative group"
            >
              <IconComponent className="h-5 w-5 md:h-6 md:w-6 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
            </a>
          </Button>
        );
      })}
      
      {/* Pulse Indicator */}
      <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-safety rounded-full animate-pulse opacity-75 shadow-lg pointer-events-none"></div>
    </div>
  );
};

export default FloatingContact;