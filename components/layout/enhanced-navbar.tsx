/**
 * Enhanced Navbar Component
 * Modern, accessible navigation with performance optimizations
 */

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { Button, IconButton } from '@/components/ui/enhanced-button';
import { SkipLinks } from '@/components/ui/skip-link';
import { 
  useFocusManagement, 
  useKeyboardNavigation, 
  useReducedMotion,
  useLiveRegion 
} from '@/hooks/use-accessibility';
import { designTokens } from '@/lib/design-tokens';
import { PerformanceMonitor } from '@/lib/performance';

interface NavItem {
  href: string;
  label: string;
  section?: string;
}

const navItems: NavItem[] = [
  { href: '#biography', label: 'ABOUT', section: 'biography' },
  { href: '#music', label: 'MUSIC', section: 'music' },
  { href: '#studio-sessions', label: 'SESSIONS', section: 'studio-sessions' },
  { href: '/merch', label: 'MERCH' },
];

const skipLinks = [
  { href: '#main-content', label: 'Skip to main content' },
  { href: '#music', label: 'Skip to music section' },
  { href: '#biography', label: 'Skip to about section' },
];

export default function EnhancedNavbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);
  const monitor = PerformanceMonitor.getInstance();
  
  // Accessibility hooks
  const { focusFirst, trapFocus } = useFocusManagement(mobileMenuRef);
  const { announce } = useLiveRegion();
  const prefersReducedMotion = useReducedMotion();

  // Scroll-based animations
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [0.95, 0.98]);
  const navBlur = useTransform(scrollY, [0, 100], [8, 16]);

  // Mount effect
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Body scroll lock for mobile menu
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = 'var(--scrollbar-width, 0px)';
      
      // Focus first item when menu opens
      setTimeout(focusFirst, 100);
      
      // Announce menu state
      announce('Navigation menu opened', 'assertive');
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      
      if (isMounted) {
        announce('Navigation menu closed', 'polite');
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen, focusFirst, announce, isMounted]);

  // Keyboard navigation for mobile menu
  const { onKeyDown } = useKeyboardNavigation(
    undefined,
    () => setIsOpen(false), // Close on Escape
    undefined
  );

  // Handle navigation clicks with performance monitoring
  const handleNavClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, section?: string) => {
      monitor.startMeasurement('smooth-scroll');
      
      if (section) {
        e.preventDefault();
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ 
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start'
          });
          window.history.pushState(null, '', `/#${section}`);
        }
      }
      
      setIsOpen(false);
      monitor.endMeasurement('smooth-scroll');
    },
    [monitor, prefersReducedMotion]
  );

  // Close menu on backdrop click
  const handleBackdropClick = React.useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  }, []);

  // Toggle menu with announcement
  const toggleMenu = React.useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Animation variants
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: 'easeOut'
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.95,
      transition: { duration: prefersReducedMotion ? 0 : 0.2 }
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: 'easeOut'
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : i * 0.1,
        duration: prefersReducedMotion ? 0 : 0.2,
        ease: 'easeOut'
      }
    })
  };

  return (
    <>
      {/* Skip Links */}
      <SkipLinks links={skipLinks} />

      {/* Main Navigation */}
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'px-6 py-4 md:px-12',
          'transition-all duration-300'
        )}
        style={{
          backgroundColor: `rgba(0, 0, 0, ${navOpacity})`,
          backdropFilter: `blur(${navBlur}px)`,
        }}
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              'text-2xl font-bold tracking-wider text-white',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500',
              'rounded-sm transition-colors duration-200'
            )}
            aria-label="Noah Lynch - Home"
          >
            NOAH LYNCH
          </Link>

          {/* Desktop Navigation */}
          <nav 
            className="hidden md:flex items-center space-x-8"
            aria-label="Main navigation"
          >
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative text-sm font-medium tracking-wider text-white',
                  'transition-all duration-200',
                  'hover:text-amber-400',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500',
                  'after:absolute after:bottom-[-4px] after:left-0 after:h-[1px]',
                  'after:w-0 after:bg-amber-400 after:transition-all after:duration-300',
                  'hover:after:w-full'
                )}
                onClick={(e) => handleNavClick(e, item.section)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <IconButton
            icon={isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            variant="ghost"
            className={cn(
              'md:hidden relative z-[60] text-white',
              'hover:bg-white/10 focus-visible:ring-amber-500'
            )}
            onClick={toggleMenu}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          />
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {isMounted && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={cn(
                'fixed inset-0 z-[55] md:hidden',
                'bg-black/20 backdrop-blur-xl'
              )}
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={handleBackdropClick}
              onKeyDown={(e) => {
                onKeyDown(e);
                if (e.key === 'Tab') {
                  trapFocus(e as any);
                }
              }}
            >
              <div
                ref={mobileMenuRef}
                id="mobile-menu"
                className={cn(
                  'flex h-full w-full items-center justify-center',
                  'p-6'
                )}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
              >
                <nav
                  className="flex flex-col items-center gap-8"
                  aria-label="Mobile navigation"
                >
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      variants={linkVariants}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          'text-xl font-medium tracking-wider text-white',
                          'transition-all duration-200',
                          'hover:text-amber-400 focus:text-amber-400',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500',
                          'rounded-sm px-2 py-1'
                        )}
                        onClick={(e) => handleNavClick(e, item.section)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Close instruction */}
                <motion.p
                  className={cn(
                    'absolute bottom-8 left-0 right-0 text-center',
                    'text-sm text-zinc-400 font-medium'
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.5 }}
                >
                  Tap anywhere to close or press Escape
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Live region for announcements */}
      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        role="status"
      />
    </>
  );
}