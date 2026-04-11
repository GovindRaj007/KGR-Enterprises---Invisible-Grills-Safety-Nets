"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, MessageCircle, Search, MapPin } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { servicesData, serviceCategories } from "@/data/servicesData";
import { PRIMARY } from '@/constants/contacts';
import { PRIMARY_LOCATIONS } from '@/lib/seo-metadata';
import MobileSearchDrawer from "./../../components/search/MobileSearchDrawer";
import DesktopSearchPanel from "./../../components/search/DesktopSearchPanel";

const CONTACTS = [
  {
    type: "phone",
    href: PRIMARY.tel,
    label: PRIMARY.display,
    icon: <Phone className="h-4 w-4" />,
    isButton: false,
  },
  {
    type: "whatsapp",
    href: `${PRIMARY.wa}?text=Hi%2C%20I%20need%20a%20quote`,
    label: "Get Quote",
    icon: <MessageCircle className="h-4 w-4" />,
    isButton: true,
  },
];

import { normalizeInternalLink } from "@/lib/url-utils";

const menuItems = [
  { label: "Home", href: normalizeInternalLink("/") },
  { label: "About", href: normalizeInternalLink("/about") },
  { label: "Services", href: normalizeInternalLink("/services"), isServices: true },
  { label: "Locations", href: normalizeInternalLink("/locations"), isLocations: true },
  { label: "Gallery", href: normalizeInternalLink("/gallery") },
  { label: "Contact", href: normalizeInternalLink("/contact") },
];

interface HeaderProps {
  menuOpen: boolean;
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const [activeTab, setActiveTab] = useState("invisible-grills");
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  // Handle keyboard shortcuts for search
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
        document.body.style.overflow = "hidden";
      }
      // ESC to close search
      if (e.key === "Escape" && searchOpen) {
        setSearchOpen(false);
        document.body.style.overflow = "auto";
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [searchOpen]);

  const openSearch = () => {
    setSearchOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeSearch = () => {
    setSearchOpen(false);
    document.body.style.overflow = "auto";
  }

  const closeDropdown = () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  };

  const renderServiceLinks = (
    category: (typeof serviceCategories)[keyof typeof serviceCategories]
  ) => (
    <div className="grid gap-2">
      {category.services.map((serviceId) => {
        const service = servicesData[serviceId as keyof typeof servicesData];
        return (
          <Link
            key={serviceId}
            href={`/services/${serviceId}`}
            onClick={closeDropdown}
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 bg-transparent hover:bg-cyan-tint border-l-2 border-transparent hover:border-l-2 hover:border-cyan-400"
            style={{
              color: "#C8D8EE"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#FF6B42";
              e.currentTarget.style.borderLeftColor = "#FF6B42";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(75,159,255,0.40)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#C8D8EE";
              e.currentTarget.style.borderLeftColor = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div className="text-sm md:text-base font-semibold leading-snug transition-colors" style={{ color: "inherit" }}>
              {service.title}
            </div>
            <p className="line-clamp-2 text-xs md:text-sm leading-normal" style={{ color: "#8FAAC8" }}>
              {service.description}
            </p>
          </Link>
        );
      })}
    </div>
  );

  const renderContacts = () =>
    CONTACTS.map(({ href, label, icon, isButton }) => (
      <a
        key={label}
        href={href}
        target={isButton ? "_blank" : undefined}
        rel={isButton ? "noopener noreferrer" : undefined}
        className={
          isButton
            ? `hidden 1xl:inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm lg:text-base font-medium justify-center transition-all duration-300 border-none`
            : `flex items-center gap-2 text-sm lg:text-base whitespace-nowrap justify-center rounded-md px-2 py-2 transition-all duration-300`
        }
        style={
          isButton
            ? {
                background: "linear-gradient(135deg, #FF6B42 0%, #F25024 100%)",
                color: "#ffffff",
                fontWeight: "700",
                boxShadow: "0 4px 20px rgba(255, 107, 66, 0.40)"
              }
            : {
                color: "#2d3748",
                border: "none"
              }
        }
        onMouseEnter={(e: any) => {
          if (!isButton) {
            e.currentTarget.style.color = "#FF6B42";
            e.currentTarget.style.backgroundColor = "rgba(242, 80, 36, 0.08)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(255,107,66,0.20)";
          } else {
            e.currentTarget.style.boxShadow = "0 4px 30px rgba(255, 107, 66, 0.60), 0 0 60px rgba(255, 107, 66, 0.20)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }
        }}
        onMouseLeave={(e: any) => {
          if (!isButton) {
            e.currentTarget.style.color = "#2d3748";
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.boxShadow = "none";
          } else {
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(255, 107, 66, 0.40)";
            e.currentTarget.style.transform = "translateY(0)";
          }
        }}
      >
        {icon}
        {label}
      </a>
    ));

  const renderMenuItems = () =>
    menuItems.map((item) => {
      const isHome = item.label === 'Home';
      const normalizedPathname = pathname === '/' ? '/' : (pathname?.replace(/\/$/, '') || '');
      const normalizedHref = isHome ? '/' : item.href;
      const isActive = item.isServices ? pathname?.startsWith('/services') : item.isLocations ? pathname?.startsWith('/locations') : normalizedPathname === normalizedHref;
      
      if (item.isServices) {
        return (
          <NavigationMenuItem key="services" value="services">
            <NavigationMenuTrigger 
              className="py-2 px-2.5 text-sm lg:text-base xl:text-lg font-medium rounded transition-colors"
              style={{ 
                color: isActive ? '#FF6B42' : '#2d3748',
                textDecoration: isActive ? 'underline' : 'none',
                backgroundColor: 'transparent',
                border: 'none'
              }}
              onMouseEnter={(e: any) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#FF6B42';
                  e.currentTarget.style.textDecoration = 'underline';
                }
              }}
              onMouseLeave={(e: any) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#2d3748';
                  e.currentTarget.style.textDecoration = 'none';
                }
              }}
            >
              Services
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="p-4 w-[400px] lg:w-[550px] h-[60vh] overflow-y-auto rounded-md" style={{
                background: "linear-gradient(135deg, #121D2F 0%, #1E2A42 50%, #121D2F 100%)",
                border: "1px solid #1E2A42",
                backdropFilter: "blur(16px)"
              }}>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="mb-4 w-full flex gap-2" style={{ backgroundColor: "transparent" }}>
                    {Object.entries(serviceCategories).map(
                      ([categoryKey, category]) => (
                        <TabsTrigger
                          key={categoryKey}
                          value={categoryKey}
                          style={{
                            borderRadius: "8px",
                            padding: "8px 14px",
                            fontSize: "14px",
                            fontWeight: "500",
                            transition: "all 0.2s ease"
                          }}
                          className="bg-transparent text-[#C8D8EE] border border-transparent hover:border-white data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:border-white"
                        >
                          {category.title}
                        </TabsTrigger>
                      )
                    )}
                  </TabsList>
                  {Object.entries(serviceCategories).map(([key, cat]) => (
                    <TabsContent
                      key={key}
                      value={key}
                      className="space-y-2"
                    >
                      {renderServiceLinks(cat)}
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        );
      }

      if (item.isLocations) {
        return (
          <NavigationMenuItem key="locations" value="locations">
            <NavigationMenuTrigger 
              className="py-2 px-2.5 text-sm lg:text-base xl:text-lg font-medium rounded transition-colors"
              style={{ 
                color: isActive ? '#FF6B42' : '#2d3748',
                textDecoration: isActive ? 'underline' : 'none',
                backgroundColor: 'transparent',
                border: 'none'
              }}
              onMouseEnter={(e: any) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#FF6B42';
                  e.currentTarget.style.textDecoration = 'underline';
                }
              }}
              onMouseLeave={(e: any) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#2d3748';
                  e.currentTarget.style.textDecoration = 'none';
                }
              }}
            >
              Locations
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="p-6 w-[300px] rounded-md" style={{
                background: "linear-gradient(135deg, #121D2F 0%, #1E2A42 50%, #121D2F 100%)",
                border: "1px solid #1E2A42",
                backdropFilter: "blur(16px)"
              }}>
                <div className="space-y-2">
                  {PRIMARY_LOCATIONS.map((location) => (
                    <Link
                      key={location.name.toLowerCase()}
                      href={`/locations/${location.name.toLowerCase()}/`}
                      onClick={closeDropdown}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 bg-transparent hover:bg-cyan-tint border-l-2 border-transparent hover:border-l-2 hover:border-cyan-400"
                      style={{
                        color: "#C8D8EE"
                      }}
                      onMouseEnter={(e: any) => {
                        e.currentTarget.style.color = "#FF6B42";
                        e.currentTarget.style.borderLeftColor = "#FF6B42";
                        e.currentTarget.style.boxShadow = "0 2px 8px rgba(75,159,255,0.40)";
                      }}
                      onMouseLeave={(e: any) => {
                        e.currentTarget.style.color = "#C8D8EE";
                        e.currentTarget.style.borderLeftColor = "transparent";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div className="flex items-center gap-2 text-sm md:text-base font-semibold leading-snug transition-colors">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        {location.name}
                      </div>
                      <p className="line-clamp-1 text-xs md:text-sm leading-normal" style={{ color: "#8FAAC8" }}>
                        {location.state}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        );
      }

      return (
        <Link
          key={item.label}
          href={item.href}
          className={`block py-2 px-2.5 text-sm lg:text-base xl:text-lg font-medium rounded transition-colors`}
          style={{
            color: isActive ? '#FF6B42' : '#2d3748',
            textDecoration: isActive ? 'underline' : 'none'
          }}
          onMouseEnter={(e) => {
            if (!isActive) {
              e.currentTarget.style.color = '#FF6B42';
              e.currentTarget.style.textDecoration = 'underline';
            }
            if (item.label === 'Gallery') import('@/components/gallery/preloadGallery');
          }}
          onMouseLeave={(e) => {
            if (!isActive) {
              e.currentTarget.style.color = '#2d3748';
              e.currentTarget.style.textDecoration = 'none';
            }
          }}
          onFocus={() => {
            if (item.label === 'Gallery') import('@/components/gallery/preloadGallery');
          }}
        >
          {item.label}
        </Link>
      );
    });

  return (
    <header className="w-full relative z-40 " style={{ background: '#ffffff',borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}>
      <div className="px-3 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4 h-auto">
          
          {/* Mobile: Menu Button */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden flex-shrink-0 h-10 w-10 p-0 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" style={{ color: '#000000' }} />
          </button>

          {/* Logo: Centered on Mobile, Left on Desktop */}
          <Link href="/" className="flex items-center flex-1 lg:flex-none justify-center lg:justify-start">
            <img 
              src="/logo.png" 
              alt="KGR Enterprises" 
              className="h-[4.5rem] md:h-[5rem] w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation: Hidden on Mobile */}
          <NavigationMenu className="hidden lg:flex flex-1 justify-center">
            <NavigationMenuList className="flex gap-0">{renderMenuItems()}</NavigationMenuList>
          </NavigationMenu>

          {/* Search Icon + Desktop Contacts: Right Side */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={openSearch}
              aria-label="Search (⌘K)"
              className="h-10 w-10 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors flex-shrink-0"
              title="Search (Ctrl+K)"
            >
              <Search className="h-5 w-5" style={{ color: '#000000' }} />
            </button>

            {/* Desktop: Show Contact Buttons */}
            <div className="hidden lg:flex items-center gap-1">
              {renderContacts()}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Drawer */}
      <MobileSearchDrawer isOpen={searchOpen} onClose={closeSearch} />

      {/* Desktop Search Panel */}
      <DesktopSearchPanel isOpen={searchOpen} onClose={closeSearch} />
    </header>
  );
};

export default Header;