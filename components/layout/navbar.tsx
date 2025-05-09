'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

const baseLinkClasses =
  '-sm tracking-wider after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:transition-all after:duration-300 hover:after:w-full md:text-sm';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [mobileOpen]);

  const linkVariants = useMemo(() => {
    return {
      initial: { color: scrolled ? 'rgba(161, 161, 170, 1)' : 'rgba(63, 63, 70, 1)' }, // zinc-400 when scrolled, zinc-700 when not
      hover: { color: scrolled ? 'rgba(255, 255, 255, 1)' : 'rgba(24, 24, 27, 1)' }, // white when scrolled, zinc-900 when not
    };
  }, [scrolled]);

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
  };

  const closeMenu = () => {
    setMobileOpen(false);
  };

  const navLinks = (
    <>
      <motion.div className="relative" initial="initial" whileHover="hover">
        <Link
          href="#biography"
          className={cn(
            baseLinkClasses,
            scrolled ? 'after:bg-white/40' : 'after:bg-zinc-700/40',
          )}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            handleNavClick(e, 'biography');
            closeMenu();
          }}
        >
          <motion.span variants={linkVariants} transition={{ duration: 0.3 }}>
            ABOUT
          </motion.span>
        </Link>
      </motion.div>
      <motion.div className="relative" initial="initial" whileHover="hover">
        <Link
          href="#music"
          className={cn(
            baseLinkClasses,
            scrolled ? 'after:bg-white/40' : 'after:bg-zinc-700/40',
          )}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            handleNavClick(e, 'music');
            closeMenu();
          }}
        >
          <motion.span variants={linkVariants} transition={{ duration: 0.3 }}>
            MUSIC
          </motion.span>
        </Link>
      </motion.div>
      <motion.div className="relative" initial="initial" whileHover="hover">
        <Link
          href="#tour"
          className={cn(
            baseLinkClasses,
            scrolled ? 'after:bg-white/40' : 'after:bg-zinc-700/40',
          )}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            handleNavClick(e, 'tour');
            closeMenu();
          }}
        >
          <motion.span variants={linkVariants} transition={{ duration: 0.3 }}>
            TOUR
          </motion.span>
        </Link>
      </motion.div>
      <motion.div className="relative" initial="initial" whileHover="hover">
        <Link
          href="/merch"
          className={cn(
            baseLinkClasses,
            scrolled ? 'after:bg-white/40' : 'after:bg-zinc-700/40',
          )}
          onClick={() => closeMenu()}
        >
          <motion.span variants={linkVariants} transition={{ duration: 0.3 }}>
            MERCH
          </motion.span>
        </Link>
      </motion.div>
    </>
  );

  return (
    <>
      <header
        className={cn(
          'fixed top-0 right-0 left-0 z-50 px-6 py-4 transition-all duration-300 md:px-12',
          scrolled ? 'bg-black/50 backdrop-blur-sm' : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1
              className={cn(
                'text-2xl font-bold tracking-wider',
                scrolled ? 'text-white' : 'text-zinc-800',
              )}
            >
              NOAH LYNCH
            </h1>
          </div>

          <nav className="hidden items-center space-x-8 md:flex">
            {navLinks}
          </nav>

          <button
            className={cn(
              'relative z-[999] p-2 md:hidden',
              scrolled ? 'text-zinc-300' : 'text-zinc-700',
            )}
            aria-label="Toggle Menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {isMounted && (
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="fixed inset-0 z-[90] flex min-h-screen w-full items-center justify-center overflow-hidden bg-black/95 backdrop-blur-xl md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}
            >
              <motion.div
                className="flex flex-col items-center justify-center gap-10 text-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1 }}
                onClick={(e) => e.stopPropagation()}
              >
                {navLinks}
              </motion.div>
              <motion.div
                className="pointer-events-none absolute bottom-8 left-0 right-0 p-4 text-center text-sm font-medium text-zinc-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p>Tap anywhere to close</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
