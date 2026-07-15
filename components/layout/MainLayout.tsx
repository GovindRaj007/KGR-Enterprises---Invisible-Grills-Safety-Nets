"use client";

import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import TopAnnouncementBar from './TopAnnouncementBar';
import BottomCTA from './BottomCTA';
import MenuDrawer from './MenuDrawer';
import Footer from './FooterClient';

import MobileSearchDrawer from '@/components/search/MobileSearchDrawer';
import DesktopSearchPanel from '@/components/search/DesktopSearchPanel';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [announcementTranslateY, setAnnouncementTranslateY] = useState(0);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const announcementRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const isScrollingDown = useRef(true);
  const isMobileRef = useRef(false);
  const lastAnnouncementTranslateY = useRef(0);
  const lastHeaderHidden = useRef(false);
  const lastCtaVisible = useRef(false);
  const scrollDirectionLockRef = useRef<'up' | 'down' | null>(null);
  const announcementHeight = 40;
  const headerHeight = 70;

  // Ensure hydration is complete before running client-only code
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const setBodyScrollLock = (shouldLock: boolean) => {
    if (typeof document === 'undefined') return;
    const overflowValue = shouldLock ? 'hidden' : '';
    document.body.style.overflow = overflowValue;
    document.documentElement.style.overflow = overflowValue;
  };

  const openMenu = () => {
    setMenuOpen(true);
    setBodyScrollLock(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setBodyScrollLock(false);
  };

  // Search open/close handlers with body scroll lock
  const openSearch = () => {
    setSearchOpen(true);
    setBodyScrollLock(true);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setBodyScrollLock(false);
  };

  // Global keyboard shortcuts for search
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
      if (e.key === 'Escape' && searchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [searchOpen]);

  useEffect(() => {
    if (!menuOpen && !searchOpen) {
      setBodyScrollLock(false);
    }
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      isMobileRef.current = mobile;
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY.current;
      const direction = deltaY > 0 ? 'down' : deltaY < 0 ? 'up' : null;

      if (direction) {
        isScrollingDown.current = direction === 'down';
        scrollDirectionLockRef.current = direction;
      }

      // Calculate announcement bar movement
      const announcementTransform = Math.min(currentScrollY, announcementHeight);
      const newAnnouncementValue = -announcementTransform;
      if (newAnnouncementValue !== lastAnnouncementTranslateY.current) {
        setAnnouncementTranslateY(newAnnouncementValue);
        lastAnnouncementTranslateY.current = newAnnouncementValue;
      }

      // Check if user is at the bottom of the page (within 100px threshold)
      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const bottomThreshold = 100;
      const isAtBottom = currentScrollY + viewportHeight >= documentHeight - bottomThreshold;

      // Mobile: Hide header and show CTA based on scroll direction and viewport threshold.
      // Pause the transition whenever a drawer is open so the overlay remains stable.
      if (isMobileRef.current) {
        const scrollThreshold = viewportHeight / 2;
        const drawerOpen = menuOpen || searchOpen;

        let newHeaderHidden = false;
        let newCtaVisible = false;

        if (drawerOpen) {
          newHeaderHidden = false;
          newCtaVisible = false;
        } else if (direction === 'down' && currentScrollY > scrollThreshold && !isAtBottom) {
          newHeaderHidden = true;
          newCtaVisible = true;
        } else if (direction === 'up') {
          newHeaderHidden = false;
          newCtaVisible = false;
        } else if (isAtBottom) {
          newHeaderHidden = lastHeaderHidden.current;
          newCtaVisible = false;
        } else if (direction === null) {
          newHeaderHidden = lastHeaderHidden.current;
          newCtaVisible = lastCtaVisible.current;
        } else {
          newHeaderHidden = lastHeaderHidden.current;
          newCtaVisible = lastCtaVisible.current;
        }

        // Only update if values have changed
        if (newHeaderHidden !== lastHeaderHidden.current) {
          setHeaderHidden(newHeaderHidden);
          lastHeaderHidden.current = newHeaderHidden;
        }
        if (newCtaVisible !== lastCtaVisible.current) {
          setCtaVisible(newCtaVisible);
          lastCtaVisible.current = newCtaVisible;
        }
      } else {
        // Desktop: Never hide header, never show CTA
        if (lastHeaderHidden.current !== false) {
          setHeaderHidden(false);
          lastHeaderHidden.current = false;
        }
        if (lastCtaVisible.current !== false) {
          setCtaVisible(false);
          lastCtaVisible.current = false;
        }
      }

      lastScrollY.current = currentScrollY;
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMounted, menuOpen, searchOpen]);

  // Header top position: starts at announcementHeight, moves up with announcement
  const headerTop = announcementHeight + announcementTranslateY;
  const dropdownTop = headerTop + headerHeight;

  return (
    <div 
      className="min-h-screen bg-background relative overflow-x-hidden" 
      suppressHydrationWarning
      style={{
        '--header-top': `${headerTop}px`,
        '--dropdown-top': `${dropdownTop}px`,
      } as React.CSSProperties}
    >
      {/* Top Announcement Bar */}
      <div
        ref={announcementRef}
        className="fixed top-0 left-0 right-0 z-40"
        style={{
          transform: `translateY(${announcementTranslateY}px)`,
          willChange: 'transform',
        }}
      >
        <TopAnnouncementBar />
      </div>

      {/* Header - Fixed and moves in sync with announcement bar - Full Width */}
      <div
        ref={headerRef}
        className="fixed left-0 right-0 z-40"
        style={{
          top: `${headerTop}px`,
          width: '100%',
          borderTopLeftRadius: 'clamp(1rem, 2vw, 2rem)',
          borderTopRightRadius: 'clamp(1rem, 2vw, 2rem)',
          opacity: headerHidden ? 0 : 1,
          transform: headerHidden ? 'translateY(-100%)' : 'translateY(0)',
          pointerEvents: headerHidden ? 'none' : 'auto',
          willChange: 'opacity, transform, top',
          transition: 'top 100ms ease-out, opacity 300ms ease-out, transform 300ms ease-out',
        }}
      >
        <Header menuOpen={menuOpen} onMenuToggle={() => (menuOpen ? closeMenu() : openMenu())} onSearchOpen={openSearch} />
      </div>

      {/* Bottom CTA - Always in DOM, slides up when header hides, slides down when header shows */}
      <div
        ref={ctaRef}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          opacity: isMobile && !(menuOpen || searchOpen) ? (ctaVisible ? 1 : 0) : 0,
          transform: isMobile && !(menuOpen || searchOpen) ? (ctaVisible ? 'translateY(0)' : 'translateY(100%)') : 'translateY(100%)',
          pointerEvents: ctaVisible && isMobile && !(menuOpen || searchOpen) ? 'auto' : 'none',
          visibility: isMobile && !(menuOpen || searchOpen) && ctaVisible ? 'visible' : 'hidden',
          transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform, opacity',
        }}
      >
        <BottomCTA onMenuClick={() => setMenuOpen(true)} onSearchClick={openSearch} />
      </div>

      {/* Main Content - Dark Background with Hero Section Wrapper */}
      <main
        className="w-full relative"
        style={{
          paddingTop: `${announcementHeight + headerHeight}px`,
          background: "linear-gradient(180deg, #0F1729 0%, #0A111A 100%)",
          zIndex: 0,
        }}
      >
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Menu Drawer */}
      <MenuDrawer
        isOpen={menuOpen}
        onClose={closeMenu}
      />

      {/* Search Drawers — rendered at root level, outside any transformed parent */}
      <MobileSearchDrawer isOpen={searchOpen} onClose={closeSearch} />
      <DesktopSearchPanel isOpen={searchOpen} onClose={closeSearch} />
    </div>
  );
};

export default MainLayout;
