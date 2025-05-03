'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const linkVariants = {
  initial: { color: 'rgba(161, 161, 170, 1)' },
  hover: { color: 'rgba(255, 255, 255, 1)' },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only prevent scrolling when menu is open, but don't change position
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

  // Close menu on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
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

  const navLinks = (
    <>
      <motion.div className="relative" initial="initial" whileHover="hover">
        <Link
          href="#biography"
          className="text-sm tracking-wider after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-white/40 after:transition-all after:duration-300 hover:after:w-full md:text-sm"
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
          className="text-sm tracking-wider after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-white/40 after:transition-all after:duration-300 hover:after:w-full md:text-sm"
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
          className="text-sm tracking-wider after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-white/40 after:transition-all after:duration-300 hover:after:w-full md:text-sm"
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
          className="text-sm tracking-wider after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-white/40 after:transition-all after:duration-300 hover:after:w-full md:text-sm"
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
            <h1 className="text-2xl font-bold tracking-wider text-white">
              NOAH LYNCH
            </h1>
          </div>

          <nav className="hidden items-center space-x-8 md:flex">
            {navLinks}
          </nav>

          <button
            className="relative z-[999] p-2 text-zinc-300 md:hidden"
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
              {/* tool tip to show they can close the menu  with a tap anywhere that fades in and out*/}
              <motion.div
                className="absolute bottom-0 left-0 top-0 right-0 p-4 text-center text-bold text-zinc-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={closeMenu}
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
