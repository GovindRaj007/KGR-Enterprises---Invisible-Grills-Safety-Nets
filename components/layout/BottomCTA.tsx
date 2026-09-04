"use client";

import React from 'react';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { WhatsAppIcon } from '@/components/shared/Icons';

// Menu Icon (3 lines)
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
  </svg>
);

// Search Icon (magnifying glass)
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.5 5.5a7.5 7.5 0 0 0 10.5 10.5Z" />
  </svg>
);

// Services Icon (4 stroked circles in 2x2 grid)
const ServicesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black">
    <circle cx="7" cy="7" r="2.5" />
    <circle cx="17" cy="7" r="2.5" />
    <circle cx="7" cy="17" r="2.5" />
    <circle cx="17" cy="17" r="2.5" />
  </svg>
);

interface BottomCTAProps {
  onMenuClick?: () => void;
  onSearchClick?: () => void;
}

const BottomCTA: React.FC<BottomCTAProps> = ({ onMenuClick, onSearchClick }) => {
  const navItems = [
    { Icon: MenuIcon, label: 'Menu', href: '#menu', action: onMenuClick },
    { Icon: SearchIcon, label: 'Search', href: '#search', action: onSearchClick },
    { Icon: ServicesIcon, label: 'Services', href: '/services', action: undefined },
    { Icon: WhatsAppIcon, label: 'WhatsApp', href: 'https://wa.me/919337353030', external: true, action: undefined },
    { Icon: Phone, label: 'Call', href: 'tel:+919337353030', external: true, action: undefined },
  ];

  return (
    <div className="w-full rounded-t-3xl bg-white shadow-2xl">
      {/* Navigation Grid */}
      <div className="grid grid-cols-5 gap-1 px-2 py-3 sm:px-3 sm:py-3 md:px-4 md:py-3">
        {navItems.map((item) => {
          const Icon = item.Icon;
          const isExternal = item.external;

          // Handle Menu item with custom action
          if (item.action) {
            return (
              <button
                key={item.label}
                onClick={item.action}
                className="flex flex-col items-center justify-center gap-0.5 py-2 sm:py-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <Icon className="text-black" />
                <span className="text-xs text-gray-700 font-medium text-center line-clamp-2">
                  {item.label}
                </span>
              </button>
            );
          }

          if (isExternal) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-0.5 py-2 sm:py-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <Icon className="text-black w-5 h-5" />
                <span className="text-xs text-gray-700 font-medium text-center line-clamp-2">
                  {item.label}
                </span>
              </a>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center justify-center gap-0.5 py-2 sm:py-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <Icon className="text-gray-800 w-5 h-5" />
              <span className="text-xs text-gray-700 font-medium text-center line-clamp-2">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomCTA;
