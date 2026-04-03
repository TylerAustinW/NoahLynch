"use client";

import { useEffect, useState } from "react";
import { ChevronUp, Home } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function EPKMobileActions() {
  const [isVisible, setIsVisible] = useState(false);
  const [showScroll, setShowScrollToTop] = useState(false);
  const [reducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const viewportHeight = window.innerHeight;

      setIsVisible(scrolled > 200);

      setShowScrollToTop(scrolled > viewportHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed right-6 bottom-6 z-50 md:hidden">
          <div className="flex flex-col gap-3">
            {showScroll && (
              <motion.button
                className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700/50 bg-zinc-900/90 text-zinc-300 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400 focus:ring-2 focus:ring-amber-500/50 focus:outline-none"
                onClick={scrollToTop}
                aria-label="Scroll to top of page"
                initial={{
                  opacity: 0,
                  scale: reducedMotion ? 1 : 0.8,
                  y: reducedMotion ? 0 : 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: reducedMotion ? 1 : 0.8,
                  y: reducedMotion ? 0 : 20,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                whileHover={reducedMotion ? {} : { scale: 1.05 }}
                whileTap={reducedMotion ? {} : { scale: 0.95 }}
              >
                <div className="flex flex-col items-center">
                  <ChevronUp className="h-5 w-5" />
                  <span className="mt-0.5 text-[10px] font-medium">TOP</span>
                </div>
              </motion.button>
            )}

            <motion.div
              initial={{
                opacity: 0,
                scale: reducedMotion ? 1 : 0.8,
                y: reducedMotion ? 0 : 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: reducedMotion ? 1 : 0.8,
                y: reducedMotion ? 0 : 20,
              }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
            >
              <Link
                href="/"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-400/50 bg-amber-500/90 text-zinc-900 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-amber-300 hover:bg-amber-400 hover:shadow-xl hover:shadow-amber-500/25 focus:ring-2 focus:ring-amber-500/50 focus:outline-none"
                aria-label="Go back to home page"
              >
                <div className="flex flex-col items-center">
                  <Home className="h-5 w-5" />
                  <span className="mt-0.5 text-[10px] font-bold">HOME</span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
