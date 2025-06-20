"use client";

import { useInView } from "@/hooks/use-in-view";
import { allReleases, ReleaseWithPlatforms } from "@/lib/musicData";
import { motion } from "framer-motion";
import { ExternalLink, Play, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";

const FeaturedCard = React.memo(
  ({ release }: { release: ReleaseWithPlatforms }) => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return (
      <motion.div
        className="group relative overflow-hidden rounded-xl border border-zinc-700/40 bg-zinc-900/30 backdrop-blur-sm md:rounded-2xl"
        whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] md:aspect-[16/10]">
          <Image
            src={release.imageURL}
            alt={`${release.title} - ${release.year}`}
            fill
            sizes="(max-width: 768px) 100vw, 90vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent sm:from-black/70 sm:via-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Featured Badge */}
          <div className="absolute top-3 left-3 rounded-full bg-amber-500/90 px-3 py-1.5 text-xs font-semibold text-black backdrop-blur-sm sm:top-4 sm:left-4 sm:px-4 sm:py-2 sm:text-sm">
            LATEST RELEASE
          </div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8">
          <div className="max-w-2xl">
            <motion.h3
              className="mb-2 text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {release.title}
            </motion.h3>

            <motion.p
              className="mb-4 text-base text-zinc-300 sm:text-lg md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {release.year} • {release.releasedBy}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col gap-3 sm:flex-row sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link
                href={`/music/${release.id}`}
                className="group/btn flex items-center justify-center gap-2 rounded-full bg-amber-500 px-7 py-3 font-semibold text-black transition-all duration-300 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-black min-h-[48px]"
              >
                <Play
                  className="h-5 w-5 transition-transform group-hover/btn:scale-110"
                  fill="currentColor"
                />
                Listen Now
              </Link>

              <Link
                href={`/music/${release.id}`}
                className="flex items-center justify-center gap-2 rounded-full border border-zinc-600/60 bg-zinc-900/60 px-7 py-3 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-zinc-500/80 hover:bg-zinc-800/80 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-black min-h-[48px]"
              >
                <ExternalLink className="h-4 w-4" />
                View Details
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }
);
FeaturedCard.displayName = "FeaturedCard";

const RegularCard = React.memo(
  ({ release }: { release: ReleaseWithPlatforms }) => {
    return (
      <Link href={`/music/${release.id}`} className="group block h-full w-80 flex-shrink-0">
        <motion.div
          className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-700/40 bg-zinc-900/30 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/50 hover:bg-zinc-800/40"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src={release.imageURL}
              alt={`${release.title} - ${release.year}`}
              fill
              sizes="320px"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="rounded-full bg-amber-500/90 p-3 backdrop-blur-sm">
                <Play className="h-6 w-6 text-black" fill="currentColor" />
              </div>
            </div>
          </div>

          <div className="flex flex-grow flex-col p-4">
            <h4 className="mb-1 text-lg font-semibold text-white transition-colors group-hover:text-amber-400">
              {release.title}
            </h4>
            <p className="mb-2 text-sm text-zinc-400">{release.year}</p>
            <p className="mt-auto text-xs text-zinc-500">
              {release.releasedBy}
            </p>
          </div>
        </motion.div>
      </Link>
    );
  }
);
RegularCard.displayName = "RegularCard";

export default function MusicShowcaseSection(): React.ReactElement {
  const { ref, inView } = useInView({ threshold: 0.1, once: true });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Find the featured release (Honest) and other releases
  const featuredRelease =
    allReleases.find(release => release.id === "honest") || allReleases[0];
  const otherReleases = allReleases.filter(
    release => release.id !== featuredRelease.id
  );

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
      return () => container.removeEventListener('scroll', updateScrollButtons);
    }
  }, []);

  const scrollTo = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 320; // Card width + gap
      const targetScroll = direction === 'left' 
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      ref={ref}
      id="music"
      className="relative overflow-hidden bg-zinc-950 px-4 py-16 sm:py-20 md:px-6 md:py-24 lg:py-28"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-15"
      >
        <source src="/noah.mp4" type="video/mp4" />
      </video>

      {/* Texture Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/texture.png')] bg-repeat opacity-5" />

      {/* Ambient Light Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/3 -right-1/4 h-96 w-96 rounded-full bg-amber-500/8 blur-3xl" />
        <div className="absolute -bottom-1/3 -left-1/4 h-96 w-96 rounded-full bg-orange-500/8 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-8 text-center sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-3 text-4xl font-bold text-white sm:mb-4 sm:text-5xl lg:text-6xl">
            The Music
          </h2>
          <p className="mx-auto max-w-2xl text-base text-zinc-400 sm:text-lg">
            From intimate acoustic sessions to full productions, explore the
            musical journey
          </p>
        </motion.div>

        {/* Featured Release */}
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <FeaturedCard release={featuredRelease} />
        </motion.div>

        {/* Other Releases Carousel */}
        {otherReleases.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="mb-6 text-xl font-bold text-white sm:mb-8 sm:text-2xl md:text-3xl">
              More Releases
            </h3>

            {/* Carousel Container */}
            <div className="relative">
              {/* Desktop Navigation Arrows */}
              <div className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 md:block">
                <button
                  onClick={() => scrollTo('left')}
                  disabled={!canScrollLeft}
                  className={`rounded-full bg-zinc-800/80 p-3 text-white backdrop-blur-sm transition-all hover:bg-zinc-700/80 focus:outline-none focus:ring-2 focus:ring-amber-400/50 disabled:opacity-50 disabled:cursor-not-allowed`}
                  aria-label="Previous releases"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              </div>
              
              <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 md:block">
                <button
                  onClick={() => scrollTo('right')}
                  disabled={!canScrollRight}
                  className={`rounded-full bg-zinc-800/80 p-3 text-white backdrop-blur-sm transition-all hover:bg-zinc-700/80 focus:outline-none focus:ring-2 focus:ring-amber-400/50 disabled:opacity-50 disabled:cursor-not-allowed`}
                  aria-label="Next releases"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              {/* Scrollable Container */}
              <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {otherReleases.map((release, index) => (
                  <motion.div
                    key={release.id}
                    className="snap-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  >
                    <RegularCard release={release} />
                  </motion.div>
                ))}
              </div>

              {/* Mobile Scroll Indicators */}
              <div className="mt-4 flex justify-center gap-2 md:hidden">
                {otherReleases.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === 0 
                        ? 'w-8 bg-amber-500' 
                        : 'w-2 bg-zinc-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
