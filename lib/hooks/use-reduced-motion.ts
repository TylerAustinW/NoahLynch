"use client";

import { useEffect, useState } from "react";

/**
 * Hook to detect user's prefers-reduced-motion setting.
 * Returns true if the user prefers reduced motion.
 *
 * Replaces the duplicated MediaQuery listener pattern that was
 * copy-pasted across navbar, hero, social-sidebar, and entrance-animation.
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return reducedMotion;
}
