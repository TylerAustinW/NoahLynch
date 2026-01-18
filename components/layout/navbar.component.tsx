"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaInstagram, FaFacebookF, FaTiktok, FaYoutube } from "react-icons/fa6";
import { SOCIAL_LINKS } from "@/lib/config/constants";

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
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const isHomepage = window.location.pathname === "/";

    if (isHomepage) {
      e.preventDefault();
      const navElement = document.getElementById(id);
      if (navElement) {
        navElement.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `/#${id}`);
      }
    }
  };

  const closeMenu = () => {
    setMobileOpen(false);
  };

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
          "fixed top-0 right-0 left-0 z-50 py-3 transition-all duration-300",
          "bg-zinc-950/95 backdrop-blur-md border-b border-zinc-900/50",
          "opacity-100 pointer-events-auto translate-y-0",
          "safe-area-inset-top",
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
        <div className="mx-auto grid max-w-7xl grid-cols-3 items-center px-4 sm:px-6 md:px-16 min-h-[52px]">
          {/* Left: Navigation Links */}
          <nav className="hidden items-center gap-6 md:flex h-full justify-start">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-xs sm:text-sm font-serif text-zinc-300 hover:text-white transition-colors duration-200",
                  "tracking-wide whitespace-nowrap"
                )}
                onClick={
                  link.id
                    ? (e) => {
                        handleNavClick(e, link.id);
                        closeMenu();
                      }
                    : () => closeMenu()
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Center: Artist Name - Perfectly Centered */}
          <div className="flex items-center justify-center h-full">
            <motion.div
              className="flex items-center h-full"
              whileHover={reducedMotion ? {} : { scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" className="group flex items-center h-full">
                <h1
                  className={cn(
                    "text-base sm:text-lg md:text-2xl font-serif font-normal tracking-wide text-white transition-all duration-300",
                    "leading-none whitespace-nowrap"
                  )}
                >
                  NOAH LYNCH
                </h1>
              </Link>
            </motion.div>
          </div>

          {/* Right: Social Icons */}
          <div className="flex items-center justify-end gap-6 h-full">
            <nav className="hidden items-center gap-6 md:flex h-full">
              <Link
                href={SOCIAL_LINKS.INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Noah Lynch on Instagram"
                className="text-zinc-300 hover:text-white transition-colors duration-200"
              >
                <FaInstagram className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              </Link>
              <Link
                href={SOCIAL_LINKS.FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Noah Lynch on Facebook"
                className="text-zinc-300 hover:text-white transition-colors duration-200"
              >
                <FaFacebookF className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              </Link>
              <Link
                href={SOCIAL_LINKS.TIKTOK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Noah Lynch on TikTok"
                className="text-zinc-300 hover:text-white transition-colors duration-200"
              >
                <FaTiktok className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              </Link>
              <Link
                href={SOCIAL_LINKS.YOUTUBE}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe to Noah Lynch on YouTube"
                className="text-zinc-300 hover:text-white transition-colors duration-200"
              >
                <FaYoutube className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              </Link>
            </nav>

            <button
              type="button"
              className={cn(
                "relative z-50 h-11 w-11 border rounded-lg md:hidden flex items-center justify-center",
                "border-zinc-700 bg-zinc-900 transition-all duration-200",
                "hover:border-zinc-600 hover:bg-zinc-800 active:bg-zinc-800",
                "touch-manipulation",
                mobileOpen && "border-zinc-600 bg-zinc-800",
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
                    <CloseIcon className="h-4 w-4 text-white" />
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
                    <MenuIcon className="h-4 w-4 text-zinc-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {isMounted && (
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="fixed top-0 left-0 right-0 bottom-0 z-[100] flex items-center justify-center overflow-hidden bg-black md:hidden"
              style={{
                height: "100dvh",
                minHeight: "-webkit-fill-available",
                width: "100vw",
                paddingTop: "env(safe-area-inset-top)",
                paddingBottom: "env(safe-area-inset-bottom)",
                paddingLeft: "env(safe-area-inset-left)",
                paddingRight: "env(safe-area-inset-right)",
              }}
              initial={variants.overlay.initial}
              animate={variants.overlay.animate}
              exit={variants.overlay.exit}
              transition={variants.overlay.transition}
              onClick={closeMenu}
            >
              <nav id="mobile-menu" role="navigation" aria-label="Mobile navigation">
                <motion.div
                  className="flex flex-col items-center justify-center gap-6 sm:gap-8"
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
                      className="group"
                    >
                      <Link
                        href={link.href}
                        className="relative flex items-center justify-center text-2xl sm:text-3xl font-serif font-normal tracking-wide text-zinc-300 transition-all duration-200 hover:text-white active:text-white py-4"
                        onClick={
                          link.id
                            ? (e) => {
                                handleNavClick(e, link.id);
                                closeMenu();
                              }
                            : () => closeMenu()
                        }
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </nav>

              <motion.div
                className="pointer-events-none absolute left-0 right-0 p-4 text-center"
                style={{
                  bottom: "calc(1.5rem + env(safe-area-inset-bottom))",
                }}
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
        </AnimatePresence>
      )}
    </>
  );
}
