"use client";

import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import TopAnnouncementBar from './TopAnnouncementBar';
import BottomCTA from './BottomCTA';
import MenuDrawer from './MenuDrawer';
import Footer from './FooterClient';
import FloatingContact from './FloatingContact';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [announcementTranslateY, setAnnouncementTranslateY] = useState(0);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const announcementRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const isScrollingDown = useRef(true);
  const isMobileRef = useRef(false);
  const announcementHeight = 40;
  const headerHeight = 70;
  const ctaHeight = 90;

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
      setAnnouncementTranslateY(-announcementTransform);

      // Mobile: Hide header and show CTA based on scroll direction and viewport threshold
      if (isMobileRef.current) {
        const viewportHeight = window.innerHeight;
        const scrollThreshold = viewportHeight / 2;

        // Hide header when scrolling down past half viewport
        if (currentScrollY > scrollThreshold && isScrollingDown.current) {
          setHeaderHidden(true);
          setCtaVisible(true);
        } else if (!isScrollingDown.current) {
          // Show header and hide CTA immediately when scrolling up
          setHeaderHidden(false);
          setCtaVisible(false);
        }
      } else {
        // Desktop: Never hide header, never show CTA
        setHeaderHidden(false);
        setCtaVisible(false);
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

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Top Announcement Bar */}
      <div
        ref={announcementRef}
        className="fixed top-0 left-0 right-0 z-[999]"
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
        className="fixed left-0 right-0 z-[998]"
        style={{
          top: `${headerTop}px`,
          width: '100%',
          background: '#ffffff',
          boxShadow: 'none',
          opacity: headerHidden ? 0 : 1,
          transform: headerHidden ? 'translateY(-100%)' : 'translateY(0)',
          pointerEvents: headerHidden ? 'none' : 'auto',
          willChange: 'opacity, transform, top',
          transition: 'top 100ms ease-out, opacity 300ms ease-out, transform 300ms ease-out',
        }}
      >
        <Header menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)} />
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
          opacity: isMobile ? (ctaVisible ? 1 : 0) : 0,
          transform: isMobile ? (ctaVisible ? 'translateY(0)' : 'translateY(100%)') : 'translateY(100%)',
          pointerEvents: ctaVisible && isMobile ? 'auto' : 'none',
          transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform, opacity',
        }}
      >
        <BottomCTA onMenuClick={() => setMenuOpen(true)} />
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

      {/* Floating Contact */}
      <FloatingContact />

      {/* Menu Drawer */}
      <MenuDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </div>
  );
};

export default MainLayout;
