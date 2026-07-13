import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for triggering animations when elements come into view
 * Replacement for Framer Motion to reduce bundle size
 * 
 * Usage:
 * const { ref, isVisible } = useInViewAnimation();
 * <div ref={ref} className={isVisible ? 'animate-fadeInUp' : 'opacity-0'}>Content</div>
 */
export function useInViewAnimation(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Once visible, we don't need to observe anymore
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1,
      ...options,
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}
