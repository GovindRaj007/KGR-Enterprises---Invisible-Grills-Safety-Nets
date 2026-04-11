"use client";

import React from 'react';

interface LastSectionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const LastSectionWrapper: React.FC<LastSectionWrapperProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <section 
      className={`relative py-12 md:py-16 lg:py-20 mx-4 md:mx-6 mb-8 rounded-3xl overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(18, 29, 47, 0.5) 50%, rgba(30, 42, 66, 0.4) 100%)',
        border: '1px solid rgba(255, 107, 66, 0.1)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 8px 32px rgba(75, 159, 255, 0.08)',
      }}
    >
      {/* Accent gradient corner */}
      <div 
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full -mr-[200px] -mt-[200px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, #FF6B42 0%, transparent 70%)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-8">
        {children}
      </div>
    </section>
  );
};

export default LastSectionWrapper;
