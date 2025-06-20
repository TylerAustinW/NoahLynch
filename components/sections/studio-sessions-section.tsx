"use client";

import { useInView } from "@/hooks/use-in-view";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

interface StudioSession {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
}

const studioSessions: StudioSession[] = [
  {
    id: "1",
    title: 'Noah Lynch - "For You" Live (Studio Sessions)',
    description:
      "An intimate acoustic performance showcasing Noah's raw talent and emotional depth in this heartfelt studio session.",
    youtubeId: "0WHqv-pE3g8", 
  },
  {
    id: "2",
    title: 'Noah Lynch - "Good Things Take Time" Live (Studio Sessions)',
    description:
      "Watch Noah perform this inspiring track with soulful vocals and acoustic guitar in an intimate studio setting.",
    youtubeId: "uXSKQiTQoHo",
  },
  {
    id: "3",
    title: 'Noah Lynch - "Honest" Live (Studio Sessions)',
    description:
      'A powerful and vulnerable performance of "Honest" that captures the essence of Noah\'s songwriting and vocal delivery.',
    youtubeId: "UGPzNbSPwZk",
  },
];

const YouTubeThumbnail = ({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) => {
  const [thumbnailSrc, setThumbnailSrc] = useState(
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  );
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (thumbnailSrc.includes("maxresdefault")) {
      setThumbnailSrc(`https://img.youtube.com/vi/${videoId}/sddefault.jpg`);
    } else if (thumbnailSrc.includes("sddefault")) {
      setThumbnailSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
    } else if (thumbnailSrc.includes("hqdefault")) {
      setThumbnailSrc(`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div className="h-full w-full bg-zinc-800 flex items-center justify-center">
        <div className="text-center">
          <Play className="h-12 w-12 text-zinc-400 mx-auto mb-2" />
          <p className="text-xs text-zinc-400">Video Unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={thumbnailSrc}
      width={1920}
      height={1080}
      alt={`Video thumbnail for ${title}`}
      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      loading="lazy"
      onError={handleImageError}
      priority={false}
      quality={90}
    />
  );
};

const VideoCard = React.memo(
  ({
    session,
    onSelect,
  }: {
    session: StudioSession;
    onSelect: (session: StudioSession) => void;
  }) => {
    return (
      <motion.button
        className="group relative w-80 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm text-left transition-all hover:border-amber-900/50 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600/20"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        onClick={() => onSelect(session)}
        aria-label={`Play video: ${session.title}`}
        type="button"
      >
        <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
          <YouTubeThumbnail videoId={session.youtubeId} title={session.title} />
          <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
            <div
              className="rounded-full bg-amber-600 p-3 shadow-lg"
              aria-hidden="true"
            >
              <Play className="h-6 w-6 text-white" fill="white" />
            </div>
          </div>

        </div>

        <div className="p-3 sm:p-4">
          <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-white transition-colors group-hover:text-amber-400 sm:text-base">
            {session.title}
          </h3>
          <p className="line-clamp-3 text-xs text-zinc-400 sm:text-sm">
            {session.description}
          </p>
        </div>
      </motion.button>
    );
  }
);
VideoCard.displayName = "VideoCard";

export default function StudioSessionsSection(): React.ReactElement {
  const { ref, inView } = useInView({ threshold: 0.1, once: true });
  const [selectedVideo, setSelectedVideo] = useState<StudioSession | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      
      // Update current index for mobile indicators
      const cardWidth = 320; // Card width + gap
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(Math.min(newIndex, studioSessions.length - 1));
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
      id="studio-sessions"
      className="relative overflow-hidden bg-zinc-900 px-4 py-16 sm:py-20 md:px-6 md:py-24 lg:py-28"
      aria-labelledby="studio-sessions-heading"
    >
      <div
        className="absolute inset-0 bg-[url('/texture.png')] bg-repeat opacity-5"
        aria-hidden="true"
      ></div>
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-800/8 blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="mb-8 text-center sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2
            id="studio-sessions-heading"
            className="mb-3 text-4xl font-bold text-white sm:mb-4 sm:text-5xl lg:text-6xl"
          >
            Live Studio Sessions
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-zinc-400 sm:text-base md:text-lg">
            Experience the raw energy and creativity of Noah's live studio
            performances. Watch exclusive behind-the-scenes content and intimate
            acoustic sessions.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Desktop Navigation Arrows */}
          <div className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 md:block">
            <button
              onClick={() => scrollTo('left')}
              disabled={!canScrollLeft}
              className={`rounded-full bg-zinc-800/80 p-3 text-white backdrop-blur-sm transition-all hover:bg-zinc-700/80 focus:outline-none focus:ring-2 focus:ring-amber-400/50 disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-label="Previous videos"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>
          
          <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 md:block">
            <button
              onClick={() => scrollTo('right')}
              disabled={!canScrollRight}
              className={`rounded-full bg-zinc-800/80 p-3 text-white backdrop-blur-sm transition-all hover:bg-zinc-700/80 focus:outline-none focus:ring-2 focus:ring-amber-400/50 disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-label="Next videos"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            role="group"
            aria-label="Studio session videos"
          >
            {studioSessions.map((session, index) => (
              <motion.div
                key={session.id}
                className="snap-start"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
              >
                <VideoCard session={session} onSelect={setSelectedVideo} />
              </motion.div>
            ))}
          </div>

          {/* Mobile Scroll Indicators */}
          <div className="mt-4 flex justify-center gap-2 md:hidden">
            {studioSessions.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-amber-500' 
                    : 'w-2 bg-zinc-600'
                }`}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-8 text-center sm:mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="https://youtube.com/@noahlynch"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600/20 min-h-[48px]"
            aria-label="Visit Noah Lynch's YouTube channel to watch more studio sessions"
          >
            <Play className="h-4 w-4" aria-hidden="true" />
            Watch More on YouTube
          </a>
        </motion.div>
      </div>

      {selectedVideo && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedVideo(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
        >
          <motion.div
            className="relative w-full max-w-4xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <button
              className="absolute -top-10 right-0 text-white hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600/20 rounded"
              onClick={() => setSelectedVideo(null)}
              aria-label="Close video player"
              type="button"
            >
              Close
            </button>
            <h3 id="video-modal-title" className="sr-only">
              {selectedVideo.title}
            </h3>
          </motion.div>
        </motion.div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
