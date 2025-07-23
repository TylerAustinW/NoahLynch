'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const baseLinkClasses =
  'relative group inline-flex items-center justify-center py-3 px-4 text-sm font-medium tracking-wide transition-all duration-300 hover:text-amber-400 h-[60px] leading-none';

// Refined hamburger menu with subtle musical rhythm
const MenuIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    {/* Three lines with musical rhythm spacing and varying lengths */}
    <rect x="4" y="7" width="16" height="1.5" rx="0.75" fill="currentColor" opacity="0.9" />
    <rect x="4" y="11.25" width="14" height="1.5" rx="0.75" fill="currentColor" opacity="0.8" />
    <rect x="4" y="15.5" width="12" height="1.5" rx="0.75" fill="currentColor" opacity="0.7" />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    {/* Refined X with musical flow */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 7l10 10M17 7l-10 10"
      opacity="0.9"
    />
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
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

      const isScrolled = currentScrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
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

  useEffect(() => {
    if (mobileOpen) {
      setIsVisible(true);
    }
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
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
    scrolled ? 'text-white' : 'text-white',
    'transition-colors duration-300'
  );

  const animationVariants = {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: prefersReducedMotion ? 0 : 0.3 },
    },
    menu: {
      initial: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 },
      transition: { delay: prefersReducedMotion ? 0 : 0.1, duration: 0.3 },
    },
    footer: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: prefersReducedMotion ? 0 : 0.2, delay: 0.2 },
    },
  };

  const navLinks = [
    { href: '#biography', label: 'ABOUT', id: 'biography' },
    { href: '#music', label: 'MUSIC', id: 'music' },
    { href: '#studio-sessions', label: 'SESSIONS', id: 'studio-sessions' },
    { href: '/tour-dates', label: 'TOUR', id: null },
    { href: '/epk', label: 'EPK', id: null },
  ];

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 right-0 left-0 z-50 py-3 sm:py-4 transition-all duration-300',
          'bg-black/30 backdrop-blur-sm md:bg-black/30 md:backdrop-blur-sm',
          scrolled
            ? 'opacity-0 pointer-events-none -translate-y-full'
            : 'opacity-100 pointer-events-auto translate-y-0'
        )}
        initial={{ y: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          transition: {
            duration: 0.3,
            ease: 'easeInOut',
          },
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 md:px-12 min-h-[60px]">
          <motion.div
            className="flex items-center h-full"
            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="group flex items-center h-full">
              <h1
                className={cn(
                  'text-xl sm:text-2xl md:text-3xl font-bold tracking-wider text-white transition-all duration-300 group-hover:text-amber-400 leading-none',
                  scrolled && 'drop-shadow-sm'
                )}
              >
                NOAH LYNCH
              </h1>
            </Link>
          </motion.div>

          <div className="flex items-center h-full">
            <nav className="hidden items-center space-x-2 md:flex h-full">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  className="flex items-center h-full"
                >
                  <Link
                    href={link.href}
                    className={cn(baseLinkClasses, dynamicTextClasses, "flex items-center justify-center")}
                    onClick={
                      link.id
                        ? (e) => {
                            handleNavClick(e, link.id);
                            closeMenu();
                          }
                        : () => closeMenu()
                    }
                  >
                    <span className="relative z-10">{link.label}</span>
                    <div className="absolute inset-0 rounded-lg bg-amber-500/10 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    <div className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                </motion.div>
              ))}
            </nav>

          <motion.div whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'relative z-[999] border md:hidden',
                'border-zinc-600/50 bg-black/80 backdrop-blur-sm',
                'hover:border-amber-500/50 hover:bg-amber-500/10',
                mobileOpen && 'border-amber-500/70 bg-amber-500/20'
              )}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{
                      rotate: prefersReducedMotion ? 0 : -90,
                      opacity: 0,
                    }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: prefersReducedMotion ? 0 : 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CloseIcon className="h-4 w-4 text-amber-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{
                      rotate: prefersReducedMotion ? 0 : 90,
                      opacity: 0,
                    }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: prefersReducedMotion ? 0 : -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MenuIcon className="h-4 w-4 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
          </div>
        </div>
      </motion.header>

      {isMounted && (
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="fixed inset-0 z-[90] flex min-h-screen w-full items-center justify-center overflow-hidden bg-black/50 backdrop-blur-2xl md:hidden"
              initial={animationVariants.overlay.initial}
              animate={animationVariants.overlay.animate}
              exit={animationVariants.overlay.exit}
              transition={animationVariants.overlay.transition}
              onClick={closeMenu}
            >
              <nav id="mobile-menu" role="navigation" aria-label="Mobile navigation">
                <motion.div
                  className="flex flex-col items-center justify-center gap-6 sm:gap-8"
                  initial={animationVariants.menu.initial}
                  animate={animationVariants.menu.animate}
                  exit={animationVariants.menu.exit}
                  transition={animationVariants.menu.transition}
                  onClick={(e) => e.stopPropagation()}
                >
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                      className="group"
                    >
                      <Link
                        href={link.href}
                        className="relative flex items-center justify-center text-2xl sm:text-3xl font-bold tracking-wider text-white transition-all duration-300 hover:text-amber-400 active:text-amber-300 py-4"
                        onClick={
                          link.id
                            ? (e) => {
                                handleNavClick(e, link.id);
                                closeMenu();
                              }
                            : () => closeMenu()
                        }
                      >
                        <span className="relative z-10">{link.label}</span>
                        <div className="absolute inset-0 -inset-x-4 -inset-y-2 rounded-xl bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-active:opacity-100" />
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </nav>

              <motion.div
                className="pointer-events-none absolute bottom-6 left-0 right-0 p-4 text-center"
                initial={animationVariants.footer.initial}
                animate={animationVariants.footer.animate}
                exit={animationVariants.footer.exit}
                transition={animationVariants.footer.transition}
              >
                <p className="text-xs sm:text-sm font-medium text-zinc-500">
                  Tap anywhere to close
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
