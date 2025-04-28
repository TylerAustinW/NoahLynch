'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-4',
        scrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-sky-100 font-bold text-2xl">NOAH LYNCH</h1>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#music"
            className="text-sm tracking-wider hover:text-sky-100 transition-colors"
          >
            MUSIC
          </Link>
          <Link
            href="#biography"
            className="text-sm tracking-wider hover:text-sky-100 transition-colors"
          >
            ABOUT
          </Link>
        </nav>
      </div>
    </header>
  );
}
