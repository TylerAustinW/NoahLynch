'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const linkVariants = {
  initial: { color: 'rgba(161, 161, 170, 1)' },
  hover: { color: 'rgba(255, 255, 255, 1)' },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
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
          <motion.div className="relative" initial="initial" whileHover="hover">
            <Link
              href="#biography"
              className="text-sm tracking-wider after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-white/40 after:transition-all after:duration-300 hover:after:w-full"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                handleNavClick(e, 'biography')
              }
            >
              <motion.span
                variants={linkVariants}
                transition={{ duration: 0.3 }}
              >
                ABOUT
              </motion.span>
            </Link>
          </motion.div>

          <motion.div className="relative" initial="initial" whileHover="hover">
            <Link
              href="#music"
              className="text-sm tracking-wider after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-white/40 after:transition-all after:duration-300 hover:after:w-full"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                handleNavClick(e, 'music')
              }
            >
              <motion.span
                variants={linkVariants}
                transition={{ duration: 0.3 }}
              >
                MUSIC
              </motion.span>
            </Link>
          </motion.div>

          <motion.div className="relative" initial="initial" whileHover="hover">
            <Link
              href="#tour"
              className="text-sm tracking-wider after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-white/40 after:transition-all after:duration-300 hover:after:w-full"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                handleNavClick(e, 'tour')
              }
            >
              <motion.span
                variants={linkVariants}
                transition={{ duration: 0.3 }}
              >
                TOUR
              </motion.span>
            </Link>
          </motion.div>

          <motion.div className="relative" initial="initial" whileHover="hover">
            <Link
              href="/merch"
              className="text-sm tracking-wider after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-white/40 after:transition-all after:duration-300 hover:after:w-full"
            >
              <motion.span
                variants={linkVariants}
                transition={{ duration: 0.3 }}
              >
                MERCH
              </motion.span>
            </Link>
          </motion.div>
        </nav>
      </div>
    </header>
  );
}
