'use client';

import { Button } from '@/components/ui/button';
import ErrorBoundary from '@/components/ui/error-boundary';
import { useInView } from '@/hooks/use-in-view';
import { pastTourDates, SHOW_INFO } from '@/lib/tour-dates-data';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Calendar, X, MapPin, Clock } from 'lucide-react';
import { Patrick_Hand } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa6';

const patrickHand = Patrick_Hand({
  weight: '400',
  subsets: ['latin'],
});

/**
 * Hero landing section with dynamic show status and social links
 * @returns {React.ReactElement} Hero section with background image and CTAs
 */
export default function HeroSection(): React.ReactElement {
  const { ref } = useInView({ threshold: 0.1 });
  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showPreviousShows, setShowPreviousShows] = useState(false);

  const previousShows = pastTourDates;

  useEffect(() => {
    setLoaded(true);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  /** Escape key handler for modal */
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showPreviousShows) {
        setShowPreviousShows(false);
      }
    };

    if (showPreviousShows) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [showPreviousShows]);

  if (imageError) {
    return (
      <section
        ref={ref}
        className="relative flex min-h-screen items-center justify-center bg-black pt-16"
      >
        <div className="text-center">
          <h1 className={`mb-4 text-5xl font-bold md:text-7xl ${patrickHand.className}`}>
            Noah Lynch
            <br />
            <span className="mb-4 text-5xl font-bold text-amber-100 md:text-7xl">Musician</span>
          </h1>
        </div>
      </section>
    );
  }

  const animationVariants = {
    scroll: {
      y: prefersReducedMotion ? [0] : [0, 10, 0],
      transition: {
        repeat: Infinity,
        duration: prefersReducedMotion ? 0 : 1.5,
        ease: 'easeInOut',
      },
    },
    fadeIn: {
      opacity: {
        delay: prefersReducedMotion ? 0 : 1.5,
        duration: prefersReducedMotion ? 0 : 0.8,
      },
    },
  };

  /**
   * Formats date string to avoid timezone issues
   * @param {string} dateString - Date in YYYY-MM-DD format
   * @returns {string} Formatted date string
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? dateString // fallback to raw string if parsing fails
      : date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
  };

  return (
    <ErrorBoundary>
      <section
        ref={ref}
        id="hero"
        className="relative flex min-h-screen items-center overflow-hidden pt-16 pb-0 bg-zinc-950"
      >
        <div className="absolute inset-0 h-full w-full">
          <Image
            src="/noah-studio.jpeg"
            alt="Noah Lynch in Studio"
            fill
            className="object-cover"
            style={{
              objectPosition: 'center top',
              transform: loaded ? 'scale(1.02)' : 'scale(1)',
              transition: 'transform 30s ease-out',
            }}
            onError={() => setImageError(true)}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50" />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div
            className={`max-w-xl transition-all duration-1000 ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="relative z-20 mb-4 sm:mb-6">
              <div className="w-full max-w-fit">
                {SHOW_INFO.hasUpcomingShow ? (
                  <div className="flex flex-wrap items-center gap-2 rounded-full bg-amber-500/20 px-3 py-2 sm:px-4 text-sm sm:text-lg font-semibold text-amber-200 border border-amber-500/50 shadow-sm w-full sm:w-auto justify-center sm:justify-start">
                    <Calendar className="inline-block w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                    <span className="text-xs sm:text-sm md:text-base">Next Show:</span>
                    <span className="font-bold text-white text-sm sm:text-base">{formatDate(SHOW_INFO.date)}</span>
                    <span className="text-xs sm:text-sm md:text-base">• {SHOW_INFO.venue}</span>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-2 rounded-full bg-zinc-800/60 px-3 py-2 sm:px-4 text-sm sm:text-lg font-semibold text-zinc-200 border border-zinc-700/50 shadow-sm w-full sm:w-auto justify-center sm:justify-start">
                    <span className="text-xs sm:text-sm md:text-base">No upcoming shows scheduled</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button asChild variant="primary" size="default">
                  <Link href="/music/honest" aria-label="Listen to the latest album Honest">
                    Listen Now
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="default">
                  <Link
                    href="mailto:NoahLynchContact@gmail.com"
                    aria-label="Contact Noah Lynch via email"
                  >
                    Contact
                  </Link>
                </Button>
                <Link
                  href="#music"
                  className="rounded-full bg-zinc-800/70 px-4 py-2 text-sm font-medium text-white border border-zinc-600 transition-all duration-300 hover:bg-zinc-700/80 hover:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 min-h-[36px] flex items-center justify-center sm:px-4 sm:py-2 sm:text-sm sm:min-h-[36px]"
                  aria-label="Explore Noah Lynch's music catalog"
                >
                  Explore Music
                </Link>
              </div>

              <div className="pt-1 lg:hidden">
                <div className="flex gap-4 justify-center sm:justify-start">
                  <Link
                    href="https://instagram.com/noahlynchmusic"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Noah Lynch on Instagram"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-all duration-300 hover:text-pink-400 hover:bg-pink-500/10 focus:outline-none focus:ring-1 focus:ring-pink-400/40"
                  >
                    <FaInstagram className="h-5 w-5" aria-hidden="true" />
                  </Link>
                  <Link
                    href="https://facebook.com/noahlynchmusic"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Noah Lynch on Facebook"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-all duration-300 hover:text-blue-400 hover:bg-blue-500/10 focus:outline-none focus:ring-1 focus:ring-blue-400/40"
                  >
                    <FaFacebookF className="h-5 w-5" aria-hidden="true" />
                  </Link>
                  <Link
                    href="https://tiktok.com/@noahlynchmusic"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Noah Lynch on TikTok"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-all duration-300 hover:text-red-400 hover:bg-red-500/10 focus:outline-none focus:ring-1 focus:ring-red-400/40"
                  >
                    <FaTiktok className="h-5 w-5" aria-hidden="true" />
                  </Link>
                  <Link
                    href="https://youtube.com/@noahlynch"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Subscribe to Noah Lynch on YouTube"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-all duration-300 hover:text-red-400 hover:bg-red-500/10 focus:outline-none focus:ring-1 focus:ring-red-400/40"
                  >
                    <FaYoutube className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Gradient divider at the bottom for section separation */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-zinc-950 pointer-events-none" />

        <motion.div
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 sm:hidden"
          initial={{ opacity: 0 }}
          animate={{
            opacity: loaded ? 1 : 0,
            ...animationVariants.scroll,
          }}
          transition={animationVariants.fadeIn}
        >
          <ChevronDown className="h-7 w-7 text-zinc-300" aria-hidden="true" />
        </motion.div>

        <AnimatePresence>
          {showPreviousShows && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPreviousShows(false)}
            >
              <motion.div
                className="relative w-full max-w-2xl max-h-[80vh] mx-4 bg-zinc-900/95 backdrop-blur-sm rounded-2xl border border-zinc-700/50 overflow-hidden"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-700/50 px-6 py-4 flex items-center justify-between">
                  <h2
                    className={`text-xl sm:text-2xl font-bold text-amber-200 ${patrickHand.className}`}
                  >
                    Previous Shows
                  </h2>
                  <Button
                    onClick={() => setShowPreviousShows(false)}
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Close modal"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="px-6 py-4">
                  <div className="block sm:hidden">
                    <motion.div
                      className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                      style={{
                        WebkitOverflowScrolling: 'touch',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                      }}
                    >
                      {previousShows.map((show, index) => (
                        <motion.div
                          key={show.id}
                          className="snap-center shrink-0 w-[85vw] max-w-sm"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="h-full rounded-xl bg-zinc-800/50 border border-zinc-700/30 p-4">
                            <h3 className="font-semibold text-zinc-100 text-lg">{show.venue}</h3>
                            <div className="flex items-center gap-2 text-zinc-300 text-sm mt-1">
                              <MapPin className="h-4 w-4" />
                              <span>
                                {show.city}, {show.state}
                              </span>
                            </div>
                            {show.description && (
                              <p className="text-zinc-400 text-sm mt-3 line-clamp-3">
                                {show.description}
                              </p>
                            )}
                            <div className="mt-4 space-y-1">
                              <div className="text-amber-200 font-medium">
                                {formatDate(show.date)}
                              </div>
                              {show.time && (
                                <div className="flex items-center gap-1 text-zinc-400 text-sm">
                                  <Clock className="h-3 w-3" />
                                  <span>{show.time}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                    <div className="flex justify-center gap-1 mt-4">
                      {previousShows.map((_, index) => (
                        <div key={index} className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
                      ))}
                    </div>
                    <p className="text-center text-zinc-400 text-xs mt-3">
                      Swipe to see more shows
                    </p>
                  </div>

                  <div className="hidden sm:block overflow-y-auto max-h-[60vh]">
                    <div className="space-y-4">
                      {previousShows.map((show) => (
                        <div
                          key={show.id}
                          className="group rounded-xl bg-zinc-800/50 border border-zinc-700/30 p-4 transition-all duration-300 hover:bg-zinc-800/70 hover:border-zinc-600/50"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-zinc-100 text-lg">{show.venue}</h3>
                              <div className="flex items-center gap-2 text-zinc-300 text-sm mt-1">
                                <MapPin className="h-4 w-4" />
                                <span>
                                  {show.city}, {show.state}
                                </span>
                              </div>
                              {show.description && (
                                <p className="text-zinc-400 text-sm mt-2">{show.description}</p>
                              )}
                            </div>
                            <div className="flex flex-col sm:items-end gap-1">
                              <div className="text-amber-200 font-medium">
                                {formatDate(show.date)}
                              </div>
                              {show.time && (
                                <div className="flex items-center gap-1 text-zinc-400 text-sm">
                                  <Clock className="h-3 w-3" />
                                  <span>{show.time}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-0 bg-zinc-900/95 backdrop-blur-sm border-t border-zinc-700/50 px-6 py-4">
                  <p className="text-center text-zinc-400 text-sm">
                    Follow Noah's socials for updates on upcoming shows!
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </ErrorBoundary>
  );
}
