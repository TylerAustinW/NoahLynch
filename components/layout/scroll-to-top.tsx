'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setPrefersReducedMotion] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Hide on EPK page since it has its own mobile actions
  if (pathname === '/epk') {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700/40 bg-zinc-900/80 text-zinc-300 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:ring-offset-2 focus:ring-offset-zinc-950"
          onClick={scrollToTop}
          aria-label="Scroll to top"
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
          transition={{ duration: 0.3, ease: 'easeOut' }}
          whileHover={reducedMotion ? {} : { scale: 1.1 }}
          whileTap={reducedMotion ? {} : { scale: 0.95 }}
        >
          <ChevronUp className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
