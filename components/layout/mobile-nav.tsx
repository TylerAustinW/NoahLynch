'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}

const menuVariants = {
  closed: {
    x: '100%',
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.3,
    },
  },
  open: {
    x: 0,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.3,
    },
  },
};

const backdropVariants = {
  closed: {
    opacity: 0,
    transition: { duration: 0.3 },
    transitionEnd: {
      display: 'none',
    },
  },
  open: {
    opacity: 1,
    display: 'block',
    transition: { duration: 0.3 },
  },
};

export default function MobileNav({ isOpen, setIsOpen, handleNavClick }: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs bg-zinc-950 shadow-lg"
          >
            <div className="flex h-full flex-col p-6">
              <div className="mb-8 flex items-center justify-between">
                <span className="text-lg font-semibold text-white">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-grow flex-col space-y-6">
                <Link
                  href="#home"
                  className="text-lg font-medium text-zinc-300 hover:text-white"
                  onClick={(e) => { handleNavClick(e, 'home'); setIsOpen(false); }}
                >
                  HOME
                </Link>
                <Link
                  href="#music"
                  className="text-lg font-medium text-zinc-300 hover:text-white"
                  onClick={(e) => { handleNavClick(e, 'music'); setIsOpen(false); }}
                >
                  MUSIC
                </Link>
                <Link
                  href="#tour"
                  className="text-lg font-medium text-zinc-300 hover:text-white"
                  onClick={(e) => { handleNavClick(e, 'tour'); setIsOpen(false); }}
                >
                  TOUR
                </Link>
                 <Link
                  href="#biography"
                  className="text-lg font-medium text-zinc-300 hover:text-white"
                  onClick={(e) => { handleNavClick(e, 'biography'); setIsOpen(false); }}
                >
                  ABOUT
                </Link>
                <Link
                  href="/merch"
                  className="text-lg font-medium text-zinc-300 hover:text-white"
                   onClick={() => setIsOpen(false)}
                >
                  MERCH
                </Link>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 
