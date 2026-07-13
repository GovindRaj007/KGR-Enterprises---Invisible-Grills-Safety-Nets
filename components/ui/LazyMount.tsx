"use client";

import { useEffect, useRef, useState } from "react";

export default function LazyMount({ children, rootMargin: initialRootMargin }: { children: React.ReactNode; rootMargin?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Detect mobile and set appropriate rootMargin
    const isMobile = window.innerWidth < 768;

    if (!ref.current) return;
    if (typeof IntersectionObserver === "undefined") {
      // Server or older browsers - mount immediately
      setIsMounted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsMounted(true);
            observer.disconnect();
          }
        });
      },
      { root: null, rootMargin: initialRootMargin || (isMobile ? "50px" : "100px") }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [initialRootMargin]);

  return <div ref={ref} suppressHydrationWarning>{isMounted ? children : null}</div>;
}
