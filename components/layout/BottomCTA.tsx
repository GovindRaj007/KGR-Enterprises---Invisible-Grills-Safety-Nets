"use client";

import React from 'react';
import Link from 'next/link';
import { Home, Menu, Search, Wrench, MessageCircle, Phone } from 'lucide-react';

interface BottomCTAProps {
  onMenuClick?: () => void;
}

const BottomCTA: React.FC<BottomCTAProps> = ({ onMenuClick }) => {
  const navItems = [
    { icon: Home, label: 'Home', href: '/', action: undefined },
    { icon: Menu, label: 'Menu', href: '#menu', action: onMenuClick },
    { icon: Search, label: 'Search', href: '#search', action: undefined },
    { icon: Wrench, label: 'Services', href: '/services', action: undefined },
    { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/1234567890', external: true, action: undefined },
    { icon: Phone, label: 'Call', href: 'tel:+1234567890', external: true, action: undefined },
  ];

  return (
    <div className="w-full rounded-t-3xl bg-white shadow-2xl">
      {/* Navigation Grid */}
      <div className="grid grid-cols-6 gap-1 px-0 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isExternal = item.external;

          // Handle Menu item with custom action
          if (item.action) {
            return (
              <button
                key={item.label}
                onClick={item.action}
                className="flex flex-col items-center justify-center gap-0.5 py-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <Icon size={20} className="text-gray-800" />
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
                className="flex flex-col items-center justify-center gap-0.5 py-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <Icon size={20} className="text-gray-800" />
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
              className="flex flex-col items-center justify-center gap-0.5 py-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <Icon size={20} className="text-gray-800" />
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
