'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const baseLinkClasses =
  '-sm tracking-wider after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full md:text-sm';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  // New state for scroll direction and navbar visibility
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

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
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for background changes
      const isScrolled = currentScrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Gusto Advance: Handle navbar visibility based on scroll direction
      if (currentScrollY < 10) {
        // Always show navbar at the top of the page
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold - hide navbar
        // Only hide if not at the very top and mobile menu is closed
        if (!mobileOpen) {
          setIsVisible(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled, lastScrollY, mobileOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [mobileOpen]);

  // Ensure navbar is visible when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      setIsVisible(true);
    }
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
  };

  const closeMenu = () => {
    setMobileOpen(false);
  };

  const dynamicTextClasses = cn(
    (scrolled || mobileOpen) ? 'text-white' : 'text-zinc-800',
    'md:text-white'
  );

  const navLinks = (
    <>
      <motion.div className="relative">
        <Link
          href="#biography"
          className={baseLinkClasses}
          onClick={(e) => {
            handleNavClick(e, 'biography');
            closeMenu();
          }}
        >
          <motion.span className={dynamicTextClasses} transition={{ duration: 0.3, ease: 'easeInOut' }}>
            ABOUT
          </motion.span>
        </Link>
      </motion.div>
      <motion.div className="relative">
        <Link
          href="#music"
          className={baseLinkClasses}
          onClick={(e) => {
            handleNavClick(e, 'music');
            closeMenu();
          }}
        >
          <motion.span className={dynamicTextClasses} transition={{ duration: 0.3, ease: 'easeInOut' }}>
            MUSIC
          </motion.span>
        </Link>
      </motion.div>
      <motion.div className="relative">
        <Link
          href="#studio-sessions"
          className={baseLinkClasses}
          onClick={(e) => {
            handleNavClick(e, 'studio-sessions');
            closeMenu();
          }}
        >
          <motion.span className={dynamicTextClasses} transition={{ duration: 0.3, ease: 'easeInOut' }}>
            SESSIONS
          </motion.span>
        </Link>
      </motion.div>
      <motion.div className="relative">
        <Link
          href="/merch"
          className={baseLinkClasses}
          onClick={() => closeMenu()}
        >
          <motion.span className={dynamicTextClasses} transition={{ duration: 0.3, ease: 'easeInOut' }}>
            MERCH
          </motion.span>
        </Link>
      </motion.div>
    </>
  );

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 right-0 left-0 z-50 px-6 py-4 transition-all duration-300 md:px-12',
          'md:bg-black/50 md:backdrop-blur-sm',
          scrolled ? 'bg-black/50 backdrop-blur-sm' : 'bg-transparent'
        )}
        initial={{ y: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100,
          transition: { 
            duration: 0.3, 
            ease: 'easeInOut' 
          }
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1
              className={cn(
                'text-2xl font-bold tracking-wider',
                dynamicTextClasses
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
      </motion.header>

      {isMounted && (
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="fixed inset-0 z-[90] flex min-h-screen w-full items-center justify-center overflow-hidden bg-black/15 backdrop-blur-xl md:hidden"
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