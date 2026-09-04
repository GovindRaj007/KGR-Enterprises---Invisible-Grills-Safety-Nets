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
  const [announcementTranslateY, setAnnouncementTranslateY] = useState(0);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollY = useRef(0);
  const isScrollingDown = useRef(true);
  const isMobileRef = useRef(false);
  const lastAnnouncementTranslateY = useRef(0);
  const lastHeaderHidden = useRef(false);
  const lastCtaVisible = useRef(false);
  const announcementHeight = 40;
  const headerHeight = 70;

  // Search open/close handlers with body scroll lock
  const openSearch = () => {
    setSearchOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeSearch = () => {
    setSearchOpen(false);
    document.body.style.overflow = 'auto';
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
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      isMobileRef.current = mobile;
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      isScrollingDown.current = currentScrollY > lastScrollY.current;

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

      // Mobile: Hide header and show CTA based on scroll direction and viewport threshold
      if (isMobileRef.current) {
        const scrollThreshold = viewportHeight / 2;

        // Hide header when scrolling down past half viewport
        let newHeaderHidden = false;
        let newCtaVisible = false;
        
        if (currentScrollY > scrollThreshold && isScrollingDown.current && !isAtBottom) {
          newHeaderHidden = true;
          newCtaVisible = true;
        } else if (!isScrollingDown.current) {
          // Show header and hide CTA immediately when scrolling up
          newHeaderHidden = false;
          newCtaVisible = false;
        } else if (isAtBottom) {
          // Hide CTA when at bottom of page
          newHeaderHidden = lastHeaderHidden.current;
          newCtaVisible = false;
        } else {
          // Maintain previous state when scrolling down but under threshold
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
  }, []);

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
        className="fixed left-0 right-0 z-40"
        style={{
          top: `${announcementHeight}px`,
          width: '100%',
          // Same untransitioned transform as the announcement bar, so the
          // header tracks the scroll exactly and never separates from the hero.
          transform: `translateY(${announcementTranslateY}px)`,
          willChange: 'transform',
        }}
      >
        <div
          style={{
            borderTopLeftRadius: 'clamp(1rem, 2vw, 2rem)',
            borderTopRightRadius: 'clamp(1rem, 2vw, 2rem)',
            opacity: headerHidden ? 0 : 1,
            transform: headerHidden ? 'translateY(-100%)' : 'translateY(0)',
            pointerEvents: headerHidden ? 'none' : 'auto',
            willChange: 'opacity, transform',
            transition: 'opacity 300ms ease-out, transform 300ms ease-out',
          }}
        >
          <Header menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)} onSearchOpen={openSearch} />
        </div>
      </div>

      {/* Bottom CTA - Always in DOM, slides up when header hides, slides down when header shows */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          opacity: isMobile ? (ctaVisible ? 1 : 0) : 0,
          transform: isMobile ? (ctaVisible ? 'translateY(0)' : 'translateY(100%)') : 'translateY(100%)',
          pointerEvents: ctaVisible && isMobile ? 'auto' : 'none',
          transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
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
        onClose={() => setMenuOpen(false)}
      />

      {/* Search Drawers — rendered at root level, outside any transformed parent */}
      <MobileSearchDrawer isOpen={searchOpen} onClose={closeSearch} />
      <DesktopSearchPanel isOpen={searchOpen} onClose={closeSearch} />
    </div>
  );
};

export default MainLayout;
