"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X, Menu, Phone, MessageCircle, Home, Info, Briefcase, Image as ImageIcon, Mail, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { servicesData, serviceCategories } from "@/data/servicesData";
import { SEO_BANNER_TEXT } from "@/constants/seo";
import { PRIMARY } from '@/constants/contacts';

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

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", isServices: true },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const MOBILE_ICONS: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Home,
  About: Info,
  Services: Briefcase,
  Gallery: ImageIcon,
  Contact: Mail,
};

const Header = () => {
  const [hideHeader, setHideHeader] = useState(false);
  const [showSeoBanner, setShowSeoBanner] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const prevBannerRef = useRef<boolean | null>(null);
  const [activeTab, setActiveTab] = useState("invisible-grills");
  const [openMenu, setOpenMenu] = useState<string>("");
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    const handleScroll = () => {
      setHideHeader(
        window.scrollY > lastScrollY.current && window.scrollY > 100
      );
      lastScrollY.current = window.scrollY;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => setHideHeader(false), 250);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide SEO banner while mobile menu (sheet) is open and restore previous state on close
  // Note: depend only on `isMenuOpen` to avoid this effect re-running when showSeoBanner changes
  useEffect(() => {
    if (isMenuOpen) {
      // store previous value only if not already stored then hide
      if (prevBannerRef.current === null) prevBannerRef.current = showSeoBanner;
      setShowSeoBanner(false);
    } else {
      // restore previous value if we stored one, otherwise keep current
      if (prevBannerRef.current !== null) {
        setShowSeoBanner(prevBannerRef.current);
        prevBannerRef.current = null;
      }
    }
  }, [isMenuOpen, showSeoBanner]);

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
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 bg-background border border-border shadow-safety hover:bg-primary/5 hover:shadow-md hover:scale-[1.02] focus:bg-primary/10"
            onClick={() => setOpenMenu("")}
          >
            <div className="text-sm md:text-base font-semibold leading-snug text-foreground hover:text-primary transition-colors">
              {service.title}
            </div>
            <p className="line-clamp-2 text-xs md:text-sm leading-normal text-muted-foreground">
              {service.description}
            </p>
          </Link>
        );
      })}
    </div>
  );

  const renderContacts = (isMobile = false) =>
    CONTACTS.map(({ href, label, icon, isButton }) => (
      <a
        key={label}
        href={href}
        target={isButton ? "_blank" : undefined}
        rel={isButton ? "noopener noreferrer" : undefined}
        data-mobile={isMobile}
        className={
          isButton
            ? `inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium w-full justify-center`
      : `flex items-center gap-2 text-sm text-primary whitespace-nowrap justify-center w-full lg:border-none border border-border rounded-md px-4 py-2 hover:shadow-sm`
        }
      >
        {icon}
        {label}
      </a>
    ));

  const renderMenuItems = (isMobile = false) =>
    menuItems.map((item) => {
      if (item.isServices) {
        return (
          <div key="services" className={isMobile ? "space-y-3" : ""}>
            {!isMobile && (
              <NavigationMenuItem value="services">
                <NavigationMenuTrigger className="text-base">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent style={{ zIndex: 9999 }}>
                  <div className="p-4 w-[400px] lg:w-[550px] h-[60vh] overflow-y-auto">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="mb-4 w-full flex gap-2">
                        {Object.entries(serviceCategories).map(
                          ([categoryKey, category]) => (
                                  <TabsTrigger
                                    key={categoryKey}
                                    value={categoryKey}
                                    className="capitalize data-[state=inactive]:bg-muted data-[state=inactive]:border data-[state=inactive]:border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded py-1 px-3 text-sm"
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
            )}
            {isMobile && (
              <>
                <div className="px-4">
                  <Link
                    href="/services"
                    className={`flex items-center gap-3 py-3 px-2 rounded-md transition-colors ${pathname?.startsWith('/services') ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex-shrink-0">
                      {React.createElement(MOBILE_ICONS['Services'], { className: pathname?.startsWith('/services') ? 'h-5 w-5 text-white' : 'h-5 w-5 text-primary' })}
                    </span>
                    <span className="text-lg font-semibold leading-tight">Services</span>
                  </Link>
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full grid grid-cols-2 gap-2 h-auto">
                    {Object.entries(serviceCategories).map(([key, cat]) => (
                      <TabsTrigger
                        key={key}
                        value={key}
                        className="text-xs py-2 w-full text-center whitespace-nowrap mobile-wrap-tab data-[state=inactive]:bg-muted data-[state=inactive]:border data-[state=inactive]:border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded"
                      >
                        {cat.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {Object.entries(serviceCategories).map(([key, cat]) => (
                    <TabsContent
                      key={key}
                      value={key}
                      className="space-y-2 mt-4"
                    >
                      {cat.services.map((id) => {
                        const service =
                          servicesData[id as keyof typeof servicesData];
                        return (
                          <Link
                            key={id}
                            href={`/services/${id}`}
                            className="flex items-start gap-3 p-3 rounded-md bg-background border border-border shadow-safety hover:bg-muted transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <div className="flex-1">
                              <div className="font-medium text-sm">
                                {service.title}
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                {service.description}
                              </p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground mt-1" />
                          </Link>
                        );
                      })}
                    </TabsContent>
                  ))}
                </Tabs>
              </>
            )}
          </div>
        );
      }
      // Mobile-specific styling for main nav items
      if (isMobile) {
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 py-3 px-4 rounded-md transition-colors ${
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
            onClick={() => setIsMenuOpen(false)}
            onMouseEnter={() => {
              if (item.label === 'Gallery') import('@/components/gallery/preloadGallery');
            }}
            onFocus={() => {
              if (item.label === 'Gallery') import('@/components/gallery/preloadGallery');
            }}
            onTouchStart={() => {
              if (item.label === 'Gallery') import('@/components/gallery/preloadGallery');
            }}
          >
            <span className="flex-shrink-0">{React.createElement(MOBILE_ICONS[item.label], { className: pathname === item.href ? 'h-5 w-5 text-white' : 'h-5 w-5 text-primary' })}</span>
            <span className="text-lg font-semibold leading-tight">{item.label}</span>
          </Link>
        );
      }

      return (
        <Link
          key={item.label}
          href={item.href}
          className={`block py-3 px-4 text-base font-medium rounded-md transition-colors ${
            pathname === item.href
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
          onClick={() => setIsMenuOpen(false)}
          onMouseEnter={() => {
            if (item.label === 'Gallery') import('@/components/gallery/preloadGallery');
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
    <>
      {/* SEO Banner - 60px mobile, 48px desktop */}
{showSeoBanner && (
  <div className="w-full bg-gradient-to-r from-safety to-accent text-white fixed top-0 left-0 z-[99999] h-[60px] md:h-[48px]">
    <div className="flex items-center justify-between px-3 py-3 md:py-2 md:px-4 h-full">
      <div className="flex-1 overflow-hidden">
        <div className="font-bold text-xs md:text-sm lg:text-base whitespace-nowrap seo-marquee-track">
          <span className="seo-marquee-content animation-duration-50s">
            <span className="inline-block pr-8 md:pr-16 text-sm">{SEO_BANNER_TEXT}</span>
            <span className="inline-block pr-8 md:pr-16 text-sm">{SEO_BANNER_TEXT}</span>
          </span>
        </div>
      </div>
      <button
        className="ml-2 p-1.5 rounded-full hover:bg-white/20 transition-colors flex-shrink-0"
        aria-label="Close SEO Banner"
        onClick={() => setShowSeoBanner(false)}
      >
        <X className="h-4 w-4 md:h-5 md:w-5" />
      </button>
    </div>
    <style>{`
      @keyframes seo-marquee-scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      
      .seo-marquee-track {
        display: inline-block;
      }
      
      .seo-marquee-content {
        display: inline-block;
        animation: seo-marquee-scroll 50s linear infinite;
      }
    `}</style>
  </div>
)}

      {/* Header - positioned below banner when banner is visible */}
      <header
        className={`fixed ${
          showSeoBanner ? "top-[60px] md:top-[48px]" : "top-0"
        } left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-md transition-transform duration-300 ${
          hideHeader ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="container mx-auto px-3 md:px-4">
          <div className="flex items-center justify-between h-14 md:h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="KGR Enterprises - Best Safety Nets & Invisible Grills"
                width={140}
                height={140}
                className="h-[5.5rem] w-auto object-contain -ml-[22px]"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu
              className="hidden lg:flex"
              value={openMenu}
              onValueChange={setOpenMenu}
            >
              <NavigationMenuList>{renderMenuItems(false)}</NavigationMenuList>
            </NavigationMenu>

            {/* Desktop Contacts */}
            <div className="hidden lg:flex items-center space-x-4">
              {renderContacts(false)}
            </div>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant={isMenuOpen ? "ghost" : "default"}
                  size="sm"
                  className="h-10 w-10 p-0"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="sheet-brand w-[85vw] sm:w-[400px] overflow-y-auto"
              >
                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/logo.png"
                      alt="KGR Enterprises"
                      width={140}
                      height={60}
                      className="h-[3.5rem] w-auto object-contain -ml-[25px]"
                    />
                  </div>
                  <button
                    aria-label="Close menu"
                    className="flex items-center -mr-10 -mt-2 rounded-md hover:bg-muted/60 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X className="h-5 w-5 text-foreground" />
                  </button>
                </div>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <nav className="flex flex-col space-y-4 mt-4">
                  {renderMenuItems(true)}
                  <div className="pt-4 border-t">
                    <div className="flex flex-col items-stretch gap-3 mt-3">
                      {renderContacts(true)}
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from being hidden under fixed header */}
      <div
        className={
          showSeoBanner
            ? "h-[116px] md:h-[112px] lg:h-[116px]"  
            : "h-[56px] md:h-[64px] lg:h-[68px]"    
        }
      />
    </>
  );
};

export default Header;