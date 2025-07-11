"use client";

import ErrorBoundary from "@/components/ui/error-boundary";
import { useInView } from "@/hooks/use-in-view";
import { tourDatesData } from "@/lib/tour-dates-data";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Heart, Calendar, X, MapPin, Clock } from "lucide-react";
import { Patrick_Hand, Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";

const patrickHand = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

// Show Information - Update this object to change show status
// Set hasUpcomingShow to true and fill in details when a show is scheduled
const showInfo = {
  hasUpcomingShow: true,
  date: "August 16, 2025",
  time: "7:00 PM - 10:00 PM CDT",
  venue: "The Roof at 1311",
  location: "Vicksburg, MS",
  ticketUrl: "/tour-dates", // Link to full tour dates page
};

export default function HeroSection(): React.ReactElement {
  const { ref } = useInView({ threshold: 0.1 });
  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showPreviousShows, setShowPreviousShows] = useState(false);

  // Get previous shows data
  const previousShows = tourDatesData.filter(show => !show.upcoming);

  useEffect(() => {
    setLoaded(true);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Handle modal close with escape key
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showPreviousShows) {
        setShowPreviousShows(false);
      }
    };

    if (showPreviousShows) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "";
    };
  }, [showPreviousShows]);

  if (imageError) {
    return (
      <section
        ref={ref}
        className="relative flex min-h-screen items-center justify-center bg-black pt-16"
      >
        <div className="text-center">
          <h1
            className={`mb-4 text-5xl font-bold md:text-7xl ${patrickHand.className}`}
          >
            Noah Lynch
            <br />
            <span className="mb-4 text-5xl font-bold text-amber-100 md:text-7xl">
              Musician
            </span>
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
        ease: "easeInOut",
      },
    },
    fadeIn: {
      opacity: {
        delay: prefersReducedMotion ? 0 : 1.5,
        duration: prefersReducedMotion ? 0 : 0.8,
      },
    },
  };

  const formatDate = (dateString: string) => {
    // Parse date components to avoid timezone issues
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <ErrorBoundary>
      <section
        ref={ref}
        id="hero"
        className="relative flex min-h-screen items-center overflow-hidden pt-16 pb-0"
      >
        <div className="absolute inset-0 h-full w-full">
          <Image
            src="/honest-coverr.png"
            alt="Noah Lynch - Honest"
            fill
            className="object-center"
            style={{
              objectPosition: "center 30%",
              transform: loaded ? "scale(1.05)" : "scale(1)",
              transition: "transform 30s ease-out",
            }}
            onError={() => setImageError(true)}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/75" />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div
            className={`max-w-xl transition-all duration-1000 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="mb-6">
              <h1
                className={`text-6xl md:text-7xl font-medium ${playfairDisplay.className} tracking-wide`}
                style={{
                  background: "url(/texture.png), black",
                  backgroundSize: "150px 150px, cover",
                  backgroundRepeat: "repeat, no-repeat",
                  backgroundBlendMode: "multiply",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                HONEST
                <br />
                <span className="text-4xl md:text-5xl font-normal tracking-wider">
                  Out Now
                </span>
              </h1>

              {/* Show Status - Mobile: below title, Desktop: inline */}
              <div className="mt-3 sm:mt-2">
                {showInfo.hasUpcomingShow ? (
                  <Link
                    href={showInfo.ticketUrl || "#"}
                    className="inline-block group"
                  >
                    <div className="rounded-full bg-amber-500/20 backdrop-blur-sm px-3 py-1.5 text-xs sm:text-sm font-medium text-amber-200 border border-amber-500/50 transition-all duration-300 hover:bg-amber-500/30 hover:border-amber-400/70">
                      <Calendar className="inline-block w-3 h-3 mr-2" />
                      {showInfo.date} • {showInfo.venue}
                    </div>
                  </Link>
                ) : (
                  <button
                    onClick={() => setShowPreviousShows(true)}
                    className="inline-block rounded-full bg-zinc-800/60 backdrop-blur-sm px-3 py-1.5 text-xs sm:text-sm font-medium text-zinc-300 border border-zinc-700/50 transition-all duration-300 hover:bg-zinc-700/70 hover:border-zinc-600/60 hover:text-zinc-200 cursor-pointer"
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                    MORE SHOWS COMING SOON!
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/music/honest"
                  className="rounded-full border border-amber-500/70 bg-amber-500/20 px-7 py-3 font-medium text-amber-100 transition-all duration-300 hover:border-amber-400/80 hover:bg-amber-500/30 focus:outline-none focus:ring-1 focus:ring-amber-400/60 min-h-[48px] flex items-center justify-center"
                  aria-label="Listen to the latest album Honest"
                >
                  Listen Now
                </Link>
                <Link
                  href="mailto:NoahLynchContact@gmail.com"
                  className="rounded-full border border-sky-500/60 bg-sky-500/15 px-7 py-3 font-medium text-sky-100 transition-all duration-300 hover:border-sky-400/70 hover:bg-sky-500/25 focus:outline-none focus:ring-1 focus:ring-sky-400/50 min-h-[48px] flex items-center justify-center"
                  aria-label="Contact Noah Lynch via email"
                >
                  Contact
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="#music"
                  className="rounded-full border border-zinc-500/50 bg-zinc-800/40 px-6 py-3 font-medium text-zinc-200 transition-all duration-300 hover:border-zinc-400/60 hover:bg-zinc-700/50 focus:outline-none focus:ring-1 focus:ring-zinc-400/40 min-h-[48px] flex items-center justify-center"
                  aria-label="Explore Noah Lynch's music catalog"
                >
                  Explore Music
                </Link>
                <Link
                  href="/merch"
                  className="rounded-full border border-zinc-500/50 bg-zinc-800/40 px-6 py-3 font-medium text-zinc-200 transition-all duration-300 hover:border-zinc-400/60 hover:bg-zinc-700/50 focus:outline-none focus:ring-1 focus:ring-zinc-400/40 min-h-[48px] flex items-center justify-center"
                  aria-label="Browse merchandise"
                >
                  Explore Merch
                </Link>
              </div>

              {/* Social Links */}
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

        {/* Scroll Arrow - removed text, made slightly bigger */}
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

        <div className="absolute bottom-12 right-4 z-10 p-2 max-w-xs text-right hidden lg:block">
          <p
            className={`${patrickHand.className} text-md text-zinc-50/90 leading-tight`}
          >
            "I hope this record means as much to you as it does to me, thank you
            for the endless support
            <br />-{" "}
            <Heart
              className="h-6 w-6 text-zinc-200 inline-block"
              aria-hidden="true"
            />
            Noah"
          </p>
        </div>

        {/* Previous Shows Modal */}
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
                onClick={e => e.stopPropagation()}
              >
                {/* Header */}
                <div className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-700/50 px-6 py-4 flex items-center justify-between">
                  <h2
                    className={`text-xl sm:text-2xl font-bold text-amber-200 ${patrickHand.className}`}
                  >
                    Previous Shows
                  </h2>
                  <button
                    onClick={() => setShowPreviousShows(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-all duration-300 hover:text-zinc-200 hover:bg-zinc-800/50"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="px-6 py-4">
                  {/* Mobile Swipeable Carousel */}
                  <div className="block sm:hidden">
                    <motion.div
                      className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                      style={{
                        WebkitOverflowScrolling: "touch",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
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
                            <h3 className="font-semibold text-zinc-100 text-lg">
                              {show.venue}
                            </h3>
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
                        <div
                          key={index}
                          className="h-1.5 w-1.5 rounded-full bg-zinc-600"
                        />
                      ))}
                    </div>
                    <p className="text-center text-zinc-400 text-xs mt-3">
                      Swipe to see more shows
                    </p>
                  </div>

                  {/* Desktop Stacked View */}
                  <div className="hidden sm:block overflow-y-auto max-h-[60vh]">
                    <div className="space-y-4">
                      {previousShows.map(show => (
                        <div
                          key={show.id}
                          className="group rounded-xl bg-zinc-800/50 border border-zinc-700/30 p-4 transition-all duration-300 hover:bg-zinc-800/70 hover:border-zinc-600/50"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-zinc-100 text-lg">
                                {show.venue}
                              </h3>
                              <div className="flex items-center gap-2 text-zinc-300 text-sm mt-1">
                                <MapPin className="h-4 w-4" />
                                <span>
                                  {show.city}, {show.state}
                                </span>
                              </div>
                              {show.description && (
                                <p className="text-zinc-400 text-sm mt-2">
                                  {show.description}
                                </p>
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

                {/* Footer */}
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
