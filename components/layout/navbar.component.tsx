"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const baseLinkClass =
  "relative group inline-flex items-center justify-center py-2 px-3 text-sm font-medium tracking-wide transition-all duration-300 hover:text-amber-400 h-[44px] leading-none";

const MenuIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect x="4" y="7" width="16" height="1.5" rx="0.75" fill="currentColor" opacity="0.9" />
    <rect x="4" y="11.25" width="14" height="1.5" rx="0.75" fill="currentColor" opacity="0.8" />
    <rect x="4" y="15.5" width="12" height="1.5" rx="0.75" fill="currentColor" opacity="0.7" />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
  const [reducedMotion, setReducedMotion] = useState(false);

  const scrollToSection = useCallback(
    (id: string, updateHistory = true) => {
      const navElement = document.getElementById(id);

      if (!navElement) {
        return false;
      }

      const navbarOffset = 96;
      const targetTop = navElement.getBoundingClientRect().top + window.scrollY - navbarOffset;

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: reducedMotion ? "auto" : "smooth",
      });

      if (updateHistory) {
        window.history.pushState(null, "", `/#${id}`);
      }

      return true;
    },
    [reducedMotion],
  );

  useEffect(() => {
    setIsMounted(true);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const scrollY = window.scrollY;
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyWidth = document.body.style.width;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.position = originalBodyPosition;
      document.body.style.top = originalBodyTop;
      document.body.style.width = originalBodyWidth;
      window.scrollTo(0, scrollY);
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled, lastScrollY, mobileOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      setIsVisible(true);
    }
  }, [mobileOpen]);

  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.replace(/^#/, "");

      if (!hash) {
        return;
      }

      window.setTimeout(() => {
        scrollToSection(hash, false);
      }, 50);
    };

    handleHashNavigation();
    window.addEventListener("hashchange", handleHashNavigation);

    return () => window.removeEventListener("hashchange", handleHashNavigation);
  }, [scrollToSection]);

  const closeMenu = () => {
    setMobileOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const isHomepage = window.location.pathname === "/";

    if (!isHomepage) {
      return;
    }

    e.preventDefault();

    const performScroll = () => {
      const didScroll = scrollToSection(id);

      if (!didScroll) {
        window.location.assign(`/#${id}`);
      }
    };

    if (mobileOpen) {
      closeMenu();
      window.setTimeout(performScroll, 80);
      return;
    }

    performScroll();
  };

  const textColor = "text-white transition-colors duration-300";

  const variants = {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: reducedMotion ? 0 : 0.3 },
    },
    menu: {
      initial: { opacity: 0, scale: reducedMotion ? 1 : 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: reducedMotion ? 1 : 0.95 },
      transition: { delay: reducedMotion ? 0 : 0.1, duration: 0.3 },
    },
    footer: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: reducedMotion ? 0 : 0.2, delay: 0.2 },
    },
  };

  const navLinks = [
    { href: "/#biography", label: "ABOUT", id: "biography" },
    { href: "/#music", label: "MUSIC", id: "music" },
    { href: "/tour-dates", label: "TOUR", id: null },
    { href: "/#studio-sessions", label: "SESSIONS", id: "studio-sessions" },
    { href: "/gallery", label: "GALLERY", id: null },
    { href: "/epk", label: "EPK", id: null },
  ];

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 py-3 sm:py-4 transition-all duration-300",
          "bg-zinc-900/80 backdrop-blur-sm md:bg-zinc-900/80 md:backdrop-blur-sm",
          "opacity-100 pointer-events-auto translate-y-0",
          "will-change-[backdrop-filter] transform-gpu",
        )}
        initial={{ y: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          transition: {
            duration: 0.3,
            ease: "easeInOut",
          },
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 md:px-12 min-h-[44px]">
          <motion.div
            className="flex items-center h-full"
            whileHover={reducedMotion ? {} : { scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="group flex items-center h-full">
              <h1
                className={cn(
                  "text-xl sm:text-2xl md:text-3xl font-bold tracking-wider text-white transition-all duration-300 group-hover:text-amber-400 leading-none",
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
                  transition={{ delay: 0.03 * index, duration: 0.2 }}
                  className="flex items-center h-full"
                >
                  <Link
                    href={link.href}
                    className={cn(baseLinkClass, textColor, "flex items-center justify-center")}
                    onClick={link.id ? (e) => handleNavClick(e, link.id) : undefined}
                  >
                    <span className="relative z-10">{link.label}</span>
                    <div className="absolute inset-0 rounded-lg bg-amber-500/10 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    <div className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <button
              type="button"
              className={cn(
                "relative z-50 h-10 w-10 border rounded-lg md:hidden flex items-center justify-center",
                "border-zinc-600/50 bg-zinc-900/80 backdrop-blur-sm transition-colors",
                "hover:border-amber-500/50 hover:bg-amber-500/10",
                mobileOpen && "border-amber-500/70 bg-amber-500/20",
              )}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{
                      rotate: reducedMotion ? 0 : -90,
                      opacity: 0,
                    }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: reducedMotion ? 0 : 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CloseIcon className="h-4 w-4 text-amber-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{
                      rotate: reducedMotion ? 0 : 90,
                      opacity: 0,
                    }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: reducedMotion ? 0 : -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MenuIcon className="h-4 w-4 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {isMounted &&
        createPortal(
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                className="fixed inset-0 z-[100] flex h-[100dvh] min-h-screen-dynamic w-screen items-center justify-center overflow-y-auto overscroll-contain bg-zinc-900/95 backdrop-blur-2xl md:hidden safe-area-inset safe-area-inset-top safe-area-inset-bottom"
                initial={variants.overlay.initial}
                animate={variants.overlay.animate}
                exit={variants.overlay.exit}
                transition={variants.overlay.transition}
                onClick={closeMenu}
              >
                <nav
                  id="mobile-menu"
                  role="navigation"
                  aria-label="Mobile navigation"
                  className="flex min-h-full w-full items-center justify-center px-6 py-24"
                >
                  <motion.div
                    className="flex w-full flex-col items-center justify-center gap-6 sm:gap-8"
                    initial={variants.menu.initial}
                    animate={variants.menu.animate}
                    exit={variants.menu.exit}
                    transition={variants.menu.transition}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                        className="group w-full"
                      >
                        <Link
                          href={link.href}
                          className="relative flex w-full items-center justify-center text-2xl sm:text-3xl font-bold tracking-wider text-white transition-all duration-300 hover:text-amber-400 active:text-amber-300 py-4"
                          onClick={link.id ? (e) => handleNavClick(e, link.id) : () => closeMenu()}
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
                  initial={variants.footer.initial}
                  animate={variants.footer.animate}
                  exit={variants.footer.exit}
                  transition={variants.footer.transition}
                >
                  <p className="text-xs sm:text-sm font-medium text-zinc-500">
                    Tap anywhere to close
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
