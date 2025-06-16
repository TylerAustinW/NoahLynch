'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const baseLinkClasses =
  '-sm tracking-wider after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full md:text-sm';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const navElement = document.getElementById(id);
    if (navElement) {
      navElement.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `/#${id}`);
    }
    setMobileOpen(false);
  };

  const dynamicTextClasses = 'text-white drop-shadow-lg';

  const navLinks = (
    <>
      {/* ABOUT */}
      <motion.div className="relative">
        <Link
          href="#biography"
          className={baseLinkClasses}
          onClick={(e) => handleNavClick(e, 'biography')}
        >
          <motion.span className={dynamicTextClasses} transition={{ duration: 0.3, ease: 'easeInOut' }}>
            ABOUT
          </motion.span>
        </Link>
      </motion.div>

      {/* MUSIC */}
      <motion.div className="relative">
        <Link
          href="#music"
          className={baseLinkClasses}
          onClick={(e) => handleNavClick(e, 'music')}
        >
          <motion.span className={dynamicTextClasses} transition={{ duration: 0.3, ease: 'easeInOut' }}>
            MUSIC
          </motion.span>
        </Link>
      </motion.div>

      {/* MERCH */}
      <motion.div className="relative">
        <Link href="/merch" className={baseLinkClasses} onClick={() => setMobileOpen(false)}>
          <motion.span className={dynamicTextClasses} transition={{ duration: 0.3, ease: 'easeInOut' }}>
            MERCH
          </motion.span>
        </Link>
      </motion.div>
    </>
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
        {/* Gradient & texture overlay for a moody music vibe */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/60 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[url('/texture.png')] opacity-5" />

        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
          <h1 className={cn('text-2xl font-bold tracking-wider', dynamicTextClasses)}>
            NOAH LYNCH
          </h1>

          <nav className="hidden items-center space-x-8 md:flex">
            {navLinks}
          </nav>

          <button
            className="relative z-[60] p-2 text-white md:hidden"
            aria-label="Toggle Menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      {isMounted && (
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="fixed inset-0 z-[40] flex min-h-screen w-full items-center justify-center overflow-hidden bg-black/80 backdrop-blur-xl md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            >
              <motion.div
                className="flex flex-col items-center justify-center gap-10 text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1 }}
                onClick={(e) => e.stopPropagation()}
              >
                {navLinks}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
