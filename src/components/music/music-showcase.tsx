"use client";

import { RELEASES, type Release as NewRelease } from "@/lib/data/music";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";

const RegularCard = memo(({ release }: { release: NewRelease }) => {
  return (
    <Link href={`/music/${release.id}`} className="group block h-full w-[85vw] shrink-0 sm:w-80">
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-900/40 backdrop-blur-sm hover:border-amber-400/50 hover:bg-zinc-800/50">
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={release.cover}
            alt={`${release.title} - ${release.year}`}
            fill
            sizes="320px"
            className="object-cover"
            loading="lazy"
            quality={75}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100" />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="rounded-full bg-amber-400/90 p-3 backdrop-blur-sm">
              <Play className="h-6 w-6 text-black" fill="currentColor" />
            </div>
          </div>
        </div>

        <div className="flex grow flex-col p-4">
          <h4 className="mb-1 text-lg font-semibold text-white group-hover:text-amber-400">
            {release.title}
          </h4>
          <p className="mb-2 text-sm text-zinc-400">{release.year}</p>
          <p className="mt-auto text-xs text-zinc-500">{release.releasedBy}</p>
        </div>
      </div>
    </Link>
  );
});
RegularCard.displayName = "RegularCard";

export default function MusicShowcaseSection(): React.ReactElement {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const releases = RELEASES;

  const updateScrollButtons = useCallback(() => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

      const cardWidth = window.innerWidth >= 640 ? 320 : window.innerWidth * 0.85;
      const gap = 16;
      const itemWidth = cardWidth + gap;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setCurrentIndex(Math.min(newIndex, releases.length - 1));
    }
  }, [releases.length]);

  useEffect(() => {
    updateScrollButtons();
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
    return undefined;
  }, [updateScrollButtons]);

  const scrollTo = (direction: "left" | "right") => {
    if (containerRef.current) {
      const container = containerRef.current;
      const cardWidth = window.innerWidth >= 640 ? 320 : window.innerWidth * 0.85;
      const gap = 16;
      const scrollAmount = cardWidth + gap;
      const targetScroll =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  const scrollToCard = (index: number) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const cardWidth = window.innerWidth >= 640 ? 320 : window.innerWidth * 0.85;
      const gap = 16;
      const itemWidth = cardWidth + gap;
      const targetScroll = index * itemWidth;

      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="music"
      className="relative overflow-hidden bg-zinc-950 px-4 py-16 sm:py-20 md:px-6 md:py-24 lg:py-28"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-15"
      >
        <source src="/videos/0416.mov" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-white/4 blur-3xl" />
        <div className="absolute right-1/3 bottom-1/3 h-64 w-64 rounded-full bg-white/3 blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-12">
          <h2 className="mb-3 text-4xl font-bold text-zinc-200 sm:mb-4 sm:text-5xl lg:text-6xl">
            The Music
          </h2>
          <p className="mx-auto max-w-2xl text-base text-zinc-300 sm:text-lg">
            From intimate acoustic sessions to full productions, explore the musical journey
          </p>
        </div>

        {releases.length > 0 && (
          <div>
            <h3 className="mb-6 text-xl font-bold text-zinc-200 sm:mb-8 sm:text-2xl md:text-3xl">
              More Releases
            </h3>

            <div className="relative px-4 sm:px-8 md:px-12">
              <div className="absolute top-1/2 -left-2 z-20 hidden -translate-y-1/2 sm:-left-4 md:-left-6 md:block">
                <button
                  onClick={() => scrollTo("left")}
                  disabled={!canScrollLeft}
                  className={`rounded-full bg-white/10 p-3 text-white backdrop-blur-sm hover:border-white/30 hover:bg-white/20 focus:ring-2 focus:ring-amber-400/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50`}
                  aria-label="Previous releases"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              </div>

              <div className="absolute top-1/2 -right-2 z-20 hidden -translate-y-1/2 sm:-right-4 md:-right-6 md:block">
                <button
                  onClick={() => scrollTo("right")}
                  disabled={!canScrollRight}
                  className={`rounded-full bg-white/10 p-3 text-white backdrop-blur-sm hover:border-white/30 hover:bg-white/20 focus:ring-2 focus:ring-amber-400/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50`}
                  aria-label="Next releases"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              <div
                ref={containerRef}
                className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {releases.map((release) => (
                  <div key={release.id} className="snap-start">
                    <RegularCard release={release} />
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-center gap-2 md:hidden">
                {releases.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToCard(index)}
                    className={`h-2 rounded-full ${index === currentIndex ? "w-8 bg-amber-400" : "w-2 bg-zinc-600"} hover:bg-amber-400/70 focus:ring-2 focus:ring-amber-400/50 focus:outline-none`}
                    aria-label={`Go to release ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
