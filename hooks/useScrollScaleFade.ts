import { useEffect, useRef, useState } from 'react';

/**
 * useScrollScaleFade - React hook for scroll-based scale/fade-in effect (mobile-first)
 * @param {Object} options - { threshold, rootMargin, once }
 * @returns { [ref, isVisible] }
 */
type ScrollScaleFadeOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

export function useScrollScaleFade(options: ScrollScaleFadeOptions = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options.once !== false) observer.disconnect();
        } else if (options.once === false) {
          setIsVisible(false);
        }
      },
      {
        threshold: options.threshold ?? 0.2,
        rootMargin: options.rootMargin ?? '0px 0px -10% 0px',
      }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.once]);

  return [ref, isVisible];
}
