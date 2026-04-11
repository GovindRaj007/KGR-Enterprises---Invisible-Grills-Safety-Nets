"use client";

import { useEffect, useRef } from 'react';

const TopAnnouncementBar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const announcements = [
    "• Free site inspection & consultation available",
    "• 15-year warranty on all installations",
    "• Marine-grade stainless steel materials",
    "• Professional team with 15+ years experience",
    "• Same-day installation appointments",
    "• Serving Hyderabad, Bangalore, Chennai & more",
  ];

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;

    let animationFrameId: number;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += 0.5;
      
      if (scrollPosition >= content.scrollWidth) {
        scrollPosition = 0;
      }

      container.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    const pauseAnimation = () => cancelAnimationFrame(animationFrameId);
    const resumeAnimation = () => {
      animationFrameId = requestAnimationFrame(scroll);
    };

    container.addEventListener('mouseenter', pauseAnimation);
    container.addEventListener('mouseleave', resumeAnimation);
    container.addEventListener('touchstart', pauseAnimation);
    container.addEventListener('touchend', resumeAnimation);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mouseenter', pauseAnimation);
      container.removeEventListener('mouseleave', resumeAnimation);
      container.removeEventListener('touchstart', pauseAnimation);
      container.removeEventListener('touchend', resumeAnimation);
    };
  }, []);

  return (
    <div 
      className="w-full overflow-hidden"
      style={{
        background: "#1a1a1a",
        height: '40px',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div
        ref={containerRef}
        className="w-full overflow-x-auto scrollbar-hide"
        style={{
          scrollBehavior: 'auto',
          WebkitOverflowScrolling: 'auto'
        }}
      >
        <div
          ref={contentRef}
          className="flex gap-8 py-0 whitespace-nowrap min-w-max px-4 md:px-6"
        >
          {[...announcements, ...announcements].map((text, idx) => (
            <div
              key={idx}
              className="text-xs md:text-sm font-medium text-white/80 flex items-center"
              style={{ minWidth: 'max-content' }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default TopAnnouncementBar;
