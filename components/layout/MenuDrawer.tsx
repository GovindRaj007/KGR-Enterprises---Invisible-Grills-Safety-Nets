"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, MapPin, Phone, MessageCircle, Home, Info, Briefcase, Image as ImageIcon, Mail } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { servicesData, serviceCategories } from '@/data/servicesData';
import { PRIMARY } from '@/constants/contacts';
import { PRIMARY_LOCATIONS } from '@/lib/seo-metadata';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({ isOpen, onClose }) => {
  const [activeServiceTab, setActiveServiceTab] = useState('invisible-grills');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const menuItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'About', href: '/about', icon: Info },
    { label: 'Services', href: '/services', icon: Briefcase, hasSubmenu: true },
    { label: 'Locations', href: '/locations', icon: MapPin, hasSubmenu: true },
    { label: 'Gallery', href: '/gallery', icon: ImageIcon },
    { label: 'Contact', href: '/contact', icon: Mail },
  ];

  const handleClose = () => {
    setExpandedItem(null);
    onClose();
  };

  const toggleSubmenu = (itemLabel: string) => {
    setExpandedItem(expandedItem === itemLabel ? null : itemLabel);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 999,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'opacity',
        }}
        onClick={handleClose}
        role="button"
        aria-label="Close menu"
      />

      {/* Menu Drawer */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: '#ffffff',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.1)',
          maxHeight: '90vh',
          height: '90vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform',
          display: 'flex',
          flexDirection: 'column',
          touchAction: 'pan-y',
        }}
      >
        {/* Menu Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Menu Header - Drag Handle - Sticky */}
          <div className="sticky top-0 bg-white flex justify-center py-2 z-10">
            <div className="w-12 h-1 bg-gray-300 rounded-full" />
          </div>

          <div className="p-6 space-y-0">

            {/* Menu Items */}
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isExpanded = expandedItem === item.label;

              if (item.hasSubmenu && item.label === 'Services') {
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className="w-full flex items-center justify-between py-4 px-4 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <Icon size={24} className="text-gray-800 flex-shrink-0" />
                        <span className="text-lg font-semibold text-gray-900">
                          {item.label}
                        </span>
                      </div>
                      <ChevronRight 
                        size={24} 
                        className={`text-gray-600 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                      />
                    </button>

                    {/* Services Submenu */}
                    {isExpanded && (
                      <div className="space-y-3 pl-4 pr-4 pb-4 bg-gray-50 rounded-lg mx-4">
                        <Tabs value={activeServiceTab} onValueChange={setActiveServiceTab}>
                          <TabsList className="w-full grid grid-cols-2 gap-2 h-auto bg-transparent">
                            {Object.entries(serviceCategories).map(([key, cat]) => (
                              <TabsTrigger
                                key={key}
                                value={key}
                                className="text-xs py-2 w-full text-center whitespace-nowrap data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-700 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded"
                              >
                                {cat.title}
                              </TabsTrigger>
                            ))}
                          </TabsList>
                          
                          {Object.entries(serviceCategories).map(([key, cat]) => (
                            <TabsContent
                              key={key}
                              value={key}
                              className="space-y-2 mt-3"
                            >
                              {cat.services.map((id) => {
                                const service = servicesData[id as keyof typeof servicesData];
                                return (
                                  <Link
                                    key={id}
                                    href={`/services/${id}`}
                                    className="flex items-start gap-3 p-2 rounded-md transition-colors bg-white hover:bg-gray-100 border border-gray-200"
                                    onClick={handleClose}
                                  >
                                    <div className="flex-1">
                                      <div className="font-medium text-sm text-gray-900">
                                        {service.title}
                                      </div>
                                      <p className="text-xs line-clamp-2 mt-1 text-gray-600">
                                        {service.description}
                                      </p>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                                  </Link>
                                );
                              })}
                            </TabsContent>
                          ))}
                        </Tabs>
                      </div>
                    )}
                  </div>
                );
              }

              if (item.hasSubmenu && item.label === 'Locations') {
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className="w-full flex items-center justify-between py-4 px-4 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <Icon size={24} className="text-gray-800 flex-shrink-0" />
                        <span className="text-lg font-semibold text-gray-900">
                          {item.label}
                        </span>
                      </div>
                      <ChevronRight 
                        size={24} 
                        className={`text-gray-600 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                      />
                    </button>

                    {/* Locations Submenu */}
                    {isExpanded && (
                      <div className="space-y-2 pl-4 pr-4 pb-4 bg-gray-50 rounded-lg mx-4">
                        {PRIMARY_LOCATIONS.map((location) => (
                          <Link
                            key={location.name.toLowerCase()}
                            href={`/locations/${location.name.toLowerCase()}/`}
                            className="flex items-start gap-3 p-2 rounded-md transition-colors bg-white hover:bg-gray-100 border border-gray-200"
                            onClick={handleClose}
                          >
                            <MapPin className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="font-medium text-sm text-gray-900">
                                {location.name}
                              </div>
                              <p className="text-xs line-clamp-1 mt-1 text-gray-600">
                                {location.state}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={handleClose}
                  className="flex items-center gap-4 py-4 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Icon size={24} className="text-gray-800 flex-shrink-0" />
                  <span className="text-lg font-semibold text-gray-900">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Bottom Section with Contacts */}
          <div className="space-y-3 p-6 bg-white flex flex-col items-center">
            {/* Phone */}
            <a
              href={PRIMARY.tel}
              className="flex items-center justify-center gap-4 py-4 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors w-full"
            >
              <Phone size={24} />
              <span className="font-semibold">{PRIMARY.display}</span>
            </a>

            {/* WhatsApp */}
            <a
              href={`${PRIMARY.wa}?text=Hi%2C%20I%20need%20a%20quote`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-4 py-4 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold w-full"
            >
              <MessageCircle size={24} />
              Get Quote
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuDrawer;
