import { useEffect, useState } from "react";

/**
 * Custom hook to get the actual viewport height on mobile devices.
 * This solves the issue where 100vh doesn't account for browser UI
 * (address bar, navigation bar) on mobile browsers.
 *
 * @returns The current viewport height in pixels, or null on server-side
 */
export const useViewportHeight = () => {
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateHeight = () => {
      // Use window.innerHeight for the actual visible viewport
      setViewportHeight(window.innerHeight);
    };

    // Set initial height
    updateHeight();

    // Update on resize and orientation change
    window.addEventListener("resize", updateHeight);
    window.addEventListener("orientationchange", updateHeight);

    // Also update when visual viewport changes (handles mobile keyboard, etc.)
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", updateHeight);
    }

    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("orientationchange", updateHeight);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", updateHeight);
      }
    };
  }, []);

  return viewportHeight;
};
