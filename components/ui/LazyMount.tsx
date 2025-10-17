"use client";

import { useEffect, useRef, useState } from "react";

export default function LazyMount({ children, rootMargin = "200px" }: { children: React.ReactNode; rootMargin?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
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
      { root: null, rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [rootMargin]);

  return <div ref={ref}>{isMounted ? children : null}</div>;
}
