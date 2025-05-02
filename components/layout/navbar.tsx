'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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
    // Prevent scrolling when menu is open
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

  const navLinks = (
    <>
      <motion.div className="relative" initial="initial" whileHover="hover">
        <Link
          href="#biography"
          className="text-sm tracking-wider after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-white/40 after:transition-all after:duration-300 hover:after:w-full md:text-sm"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            handleNavClick(e, 'biography');
            setMobileOpen(false);
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
            setMobileOpen(false);
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
            setMobileOpen(false);
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
          onClick={() => setMobileOpen(false)}
        >
          <motion.span variants={linkVariants} transition={{ duration: 0.3 }}>
            MERCH
          </motion.span>
        </Link>
      </motion.div>
    </>
  );

  return (
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
          className="relative z-[100] p-2 text-zinc-300 md:hidden"
          aria-label="Toggle Menu"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMounted && (
        <AnimatePresence>
          {mobileOpen && (
            <div className="fixed inset-0 z-[60]">
              <motion.div
                className="fixed inset-0 bg-black/95 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                className="fixed inset-0 flex flex-col items-center justify-center gap-10 text-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1 }}
              >
                {navLinks}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      )}
    </header>
  );
}
