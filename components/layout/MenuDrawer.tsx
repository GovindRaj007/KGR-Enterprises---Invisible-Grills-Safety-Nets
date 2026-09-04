"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, MapPin, Phone, Home, Info, Briefcase, Image as ImageIcon, Mail, Pointer } from 'lucide-react';
import { WhatsAppIcon } from '@/components/shared/Icons';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { servicesData, serviceCategoriesWithoutClothHangers, getServiceRoute } from '@/data/servicesData';
import LocationServicesAccordion from '@/components/layout/LocationServicesAccordion';
import { PRIMARY } from '@/constants/contacts';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({ isOpen, onClose }) => {
  const [activeServiceTab, setActiveServiceTab] = useState('invisible-grills');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartYRef = useRef<number | null>(null);
  const DRAWER_TOP_OFFSET = '5rem';

  const menuItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'About', href: '/about', icon: Info },
    { label: 'Services', href: '/services', icon: Briefcase, hasSubmenu: true },
    { label: 'Locations', href: '/locations', icon: MapPin, hasSubmenu: true }, 
    { label: 'Gallery', href: '/gallery', icon: ImageIcon },
    { label: 'Contact', href: '/contact', icon: Mail },
  ];

  useEffect(() => {
    if (!isOpen) return;

    window.history.pushState({ drawer: 'menu' }, '', window.location.href);

    const handlePopState = () => {
      setExpandedItem(null);
      setDragOffset(0);
      onClose();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isOpen, onClose]);

  const handleClose = () => {
    setExpandedItem(null);
    setDragOffset(0);
    setIsDragging(false);
    onClose();
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    dragStartYRef.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (dragStartYRef.current === null) return;
    const delta = e.touches[0].clientY - dragStartYRef.current;
    if (delta > 0) {
      setDragOffset(Math.min(delta, 220));
    }
  };

  const handleTouchEnd = () => {
    if (dragOffset > 110) {
      handleClose();
    } else {
      setDragOffset(0);
    }
    setIsDragging(false);
    dragStartYRef.current = null;
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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'fixed',
          top: DRAWER_TOP_OFFSET,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: '#ffffff',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.1)',
          overflowY: 'auto',
          overflowX: 'hidden',
          transform: isOpen ? `translateY(${dragOffset}px)` : 'translateY(100%)',
          visibility: isOpen ? 'visible' : 'hidden',
          transition: isDragging
            ? 'none'
            : `transform 300ms cubic-bezier(0.4, 0, 0.2, 1), visibility 0s linear ${isOpen ? '0s' : '300ms'}`,
          willChange: 'transform',
          display: 'flex',
          flexDirection: 'column',
          touchAction: 'pan-y',
          overscrollBehavior: 'contain',
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
                      <div className="space-y-3 bg-white rounded-3xl shadow-sm mx-4 p-4">
                        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                          <Pointer className="h-4 w-4 transform rotate-180" />
                          Select the category
                        </div>
                        <Tabs value={activeServiceTab} onValueChange={setActiveServiceTab}>
                          <TabsList className="w-full grid grid-cols-2 gap-2 h-auto bg-gray-100 rounded-2xl p-1">
                            {Object.entries(serviceCategoriesWithoutClothHangers).map(([key, cat]) => (
                              <TabsTrigger
                                key={key}
                                value={key}
                                className="text-xs py-2 w-full text-center whitespace-nowrap rounded-xl shadow-sm transition-all duration-200 data-[state=inactive]:bg-white data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:bg-gray-50 data-[state=active]:bg-gray-900 data-[state=active]:text-white"
                              >
                                {cat.title}
                              </TabsTrigger>
                            ))}
                          </TabsList>

                          {Object.entries(serviceCategoriesWithoutClothHangers).map(([key, cat]) => (
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
                                    href={getServiceRoute(id)}
                                    prefetch={false}
                                    className="flex items-start gap-3 p-2 rounded-md transition-colors bg-white hover:bg-gray-100 border border-gray-200"       
                                    onClick={handleClose}
                                  >
                                    <div className="flex-1">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-medium text-sm text-gray-900">
                                          {service.title}
                                        </span>
                                        {service.id === 'cloth-drying' && (
                                          <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-700 text-[10px] font-semibold px-2 py-1">
                                            Cloth Hangers
                                          </span>
                                        )}
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
                      <div className="mx-3">
                        <LocationServicesAccordion variant="mobile" onLocationLinkClick={handleClose} />
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
              <WhatsAppIcon className="h-6 w-6 text-white" />
              Get Quote
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuDrawer;