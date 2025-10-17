import { useEffect, useRef, useState } from 'react';

/**
 * useFocusOrScrollEffect - React hook for focus/scroll-based effect (for cards/forms)
 * Returns: [ref, isActive]
 */
type FocusOrScrollOptions = {
  threshold?: number;
  rootMargin?: string;
};

export function useFocusOrScrollEffect(options: FocusOrScrollOptions = {}) {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let focused = false;
    let visible = false;

    const handleFocus = () => {
      focused = true;
      setIsActive(true);
    };
    const handleBlur = () => {
      focused = false;
      if (!visible) setIsActive(false);
    };

    node.addEventListener('focusin', handleFocus);
    node.addEventListener('focusout', handleBlur);

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) setIsActive(true);
        else if (!focused) setIsActive(false);
      },
      {
        threshold: options.threshold ?? 0.2,
        rootMargin: options.rootMargin ?? '0px 0px -10% 0px',
      }
    );
    observer.observe(node);
    return () => {
      node.removeEventListener('focusin', handleFocus);
      node.removeEventListener('focusout', handleBlur);
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin]);

  return [ref, isActive];
}
