"use client";

import React from 'react';

interface HeroWithHeaderWrapperProps {
  children: React.ReactNode;
}

const HeroWithHeaderWrapper: React.FC<HeroWithHeaderWrapperProps> = ({ children }) => {
  return (
    <div 
      data-hero-section="true"
      className="w-full bg-white px-3 md:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8 pt-[29px] md:pt-[3rem] lg:pt-[49px] relative"
      style={{
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
        zIndex: 0,
      }}
    >
      {children}
    </div>
  );
};

export default HeroWithHeaderWrapper;
