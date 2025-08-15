'use client';

import { Button } from '@/components/ui/button';
import ErrorBoundary from '@/components/ui/error-boundary';
import CheckInButton from '@/components/ui/checkin-button';
import { useInView } from '@/hooks/use-in-view';
import { useFocusTrap } from '@/hooks/use-focus-trap';
import { getPastTourDates } from '@/lib/data/tour/tour-dates';
import { SHOW_INFO } from '@/lib/config/tour';
import { formatDate } from '@/lib/utils/date';
import { SOCIAL_LINKS } from '@/lib/config/constants';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, ChevronDown, Clock, MapPin, X } from 'lucide-react';
import { Patrick_Hand } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa6';

const patrickHand = Patrick_Hand({
  weight: '400',
  subsets: ['latin'],
});

export default function HeroSection(): React.ReactElement {
  const { ref } = useInView({ threshold: 0.1 });
  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [reducedMotion, setPrefersReducedMotion] = useState(false);
  const [showPastShows, setShowPreviousShows] = useState(false);

  const pastShows = getPastTourDates();
  const modalRef = useFocusTrap({
    isActive: showPastShows,
    restoreFocus: true,
    autoFocus: true,
  });

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
      if (e.key === 'Escape' && showPastShows) {
        setShowPreviousShows(false);
      }
    };

    if (showPastShows) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [showPastShows]);

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
      y: reducedMotion ? [0] : [0, 10, 0],
      transition: {
        repeat: Infinity,
        duration: reducedMotion ? 0 : 1.5,
        ease: 'easeInOut',
      },
    },
    fadeIn: {
      opacity: {
        delay: reducedMotion ? 0 : 1.5,
        duration: reducedMotion ? 0 : 0.8,
      },
    },
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
            src="/Mobile-Background.jpg"
            alt="Noah Lynch Mobile Background"
            fill
            sizes="(max-width: 768px) 100vw, 0px"
            className="object-cover md:hidden"
            style={{
              objectPosition: 'center center',
              transform: loaded ? 'scale(1.02)' : 'scale(1)',
              transition: 'transform 30s ease-out',
            }}
            onError={() => setImageError(true)}
            priority
          />
          <Image
            src="/noah-lynch-studio-black-white.jpg"
            alt="Noah Lynch in Studio"
            fill
            sizes="(min-width: 768px) 100vw, 0px"
            className="object-cover hidden md:block"
            style={{
              objectPosition: 'center 20%',
              transform: loaded ? 'scale(1.02)' : 'scale(1)',
              transition: 'transform 30s ease-out',
            }}
            onError={() => setImageError(true)}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40" />
          <div className="pointer-events-none absolute inset-0 bg-[url('/grain-texture-overlay.png')] bg-repeat opacity-[0.01] md:opacity-[0.03]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div
            className={`max-w-xl transition-all duration-1000 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <div className="relative z-20 mb-4 sm:mb-6">
              <div className="w-full max-w-fit">
                {SHOW_INFO.hasUpcomingShow ? (
                  <div className="relative">
                    <Link
                      href={SHOW_INFO.ticketUrl}
                      className="group block"
                      aria-label="View tour dates and get tickets for the upcoming show"
                      aria-describedby="next-show-tooltip"
                    >
                      <div className="group/button flex flex-wrap items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-3 py-2 sm:px-4 text-sm sm:text-base font-medium text-white w-full sm:w-auto justify-center sm:justify-start hover:bg-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer">
                        <Calendar className="inline-block w-4 h-4 sm:w-5 sm:h-5 text-white/80 group-hover/button:text-white transition-colors duration-300" />
                        <span className="text-xs sm:text-sm md:text-base text-white/90 group-hover/button:text-white transition-colors duration-300">
                          Next Show:
                        </span>
                        <span className="font-bold text-white text-sm sm:text-base group-hover/button:text-white transition-colors duration-300">
                          {formatDate(SHOW_INFO.date)}
                        </span>
                        <span className="text-xs sm:text-sm md:text-base text-white/90 group-hover/button:text-white transition-colors duration-300">
                          • {SHOW_INFO.venue}
                        </span>

                        <div className="ml-1 opacity-60 group-hover/button:opacity-100 transition-opacity duration-300">
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 text-white/70 group-hover/button:text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </Link>

                    <div
                      id="next-show-tooltip"
                      role="tooltip"
                      className="absolute left-full top-1/2 -translate-y-1/2 ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30"
                    >
                      <div className="bg-zinc-900/95 backdrop-blur-sm text-zinc-100 text-xs font-medium px-3 py-2 rounded-lg border border-zinc-700/50 shadow-lg whitespace-nowrap">
                        Click for details & FREE entry!
                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-zinc-900/95"></div>
                      </div>

                      <div className="sm:hidden absolute top-full left-1/2 -translate-x-1/2 mt-2">
                        <div className="bg-zinc-900/95 backdrop-blur-sm text-zinc-100 text-xs font-medium px-3 py-2 rounded-lg border border-zinc-700/50 shadow-lg whitespace-nowrap">
                          Click for details & FREE entry!
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-zinc-900/95"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-3 py-2 sm:px-4 text-sm sm:text-base font-medium text-white/80 w-full sm:w-auto justify-center sm:justify-start">
                    <span className="text-xs sm:text-sm md:text-base">
                      No upcoming shows scheduled
                    </span>
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
                    href={`mailto:${SOCIAL_LINKS.EMAIL}`}
                    aria-label="Contact Noah Lynch via email"
                  >
                    Contact
                  </Link>
                </Button>
                <CheckInButton
                  variant="inherit"
                  className="rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white/15 hover:border-white/35 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent min-h-[36px] flex items-center justify-center sm:px-4 sm:py-2 sm:text-sm sm:min-h-[36px]"
                />
                <Link
                  href={'#music'}
                  className="rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white/15 hover:border-white/35 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent min-h-[36px] flex items-center justify-center sm:px-4 sm:py-2 sm:text-sm sm:min-h-[36px]"
                  aria-label="Explore Noah Lynch's music catalog"
                >
                  Explore Music
                </Link>
              </div>

              <div className="pt-1 lg:hidden">
                <div className="flex gap-4 justify-center sm:justify-start">
                  <Link
                    href={SOCIAL_LINKS.INSTAGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Noah Lynch on Instagram"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-all duration-300 hover:text-pink-400 hover:bg-pink-500/10 focus:outline-none focus:ring-1 focus:ring-pink-400/40"
                  >
                    <FaInstagram className="h-5 w-5" aria-hidden="true" />
                  </Link>
                  <Link
                    href={SOCIAL_LINKS.FACEBOOK}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Noah Lynch on Facebook"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-all duration-300 hover:text-blue-400 hover:bg-blue-500/10 focus:outline-none focus:ring-1 focus:ring-blue-400/40"
                  >
                    <FaFacebookF className="h-5 w-5" aria-hidden="true" />
                  </Link>
                  <Link
                    href={SOCIAL_LINKS.TIKTOK}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Noah Lynch on TikTok"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-all duration-300 hover:text-red-400 hover:bg-red-500/10 focus:outline-none focus:ring-1 focus:ring-red-400/40"
                  >
                    <FaTiktok className="h-5 w-5" aria-hidden="true" />
                  </Link>
                  <Link
                    href={SOCIAL_LINKS.YOUTUBE}
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

        <motion.div
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 sm:hidden"
          initial={{ opacity: 0 }}
          animate={{
            opacity: loaded ? 1 : 0,
          }}
          transition={animationVariants.fadeIn}
        >
          <ChevronDown className="h-7 w-7 text-zinc-300" aria-hidden="true" />
        </motion.div>

        <AnimatePresence>
          {showPastShows && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPreviousShows(false)}
            >
              <motion.div
                ref={modalRef}
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
                      {pastShows.map((show, index) => (
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
                      {pastShows.map((_, index) => (
                        <div key={index} className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
                      ))}
                    </div>
                    <p className="text-center text-zinc-400 text-xs mt-3">
                      Swipe to see more shows
                    </p>
                  </div>

                  <div className="hidden sm:block overflow-y-auto max-h-[60vh]">
                    <div className="space-y-4">
                      {pastShows.map((show) => (
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
