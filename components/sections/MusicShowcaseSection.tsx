'use client';

import { useInView } from '@/hooks/use-in-view';
import {
  allReleases,
  ReleaseWithPlatforms,
  upcomingRelease,
} from '@/lib/musicData';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';

const cardVariants = {
  initial: {
    opacity: 1,
    scale: 1,
    borderColor: 'rgba(63, 63, 70, 0.6)',
  },
  hover: {
    scale: 1.02,
    borderColor: 'rgba(161, 98, 7, 0.6)',
  },
};

const titleVariants = {
  initial: { color: 'rgba(255, 255, 255, 1)' },
  hover: { color: 'rgba(252, 237, 198, 1)' },
};

const textVariants = {
  initial: { color: 'rgba(161, 161, 170, 1)' },
  hover: { color: 'rgba(212, 212, 216, 1)' },
};

const ShowcaseCard = React.memo(
  ({ release }: { release: ReleaseWithPlatforms }) => {
    const isUpcoming = release.type === 'upcoming';
    const typeColor = isUpcoming ? 'text-amber-400' : 'text-cyan-400';
    const typeBgColor = isUpcoming ? 'bg-amber-900/50' : 'bg-cyan-900/50';
    const typeBorderColor = isUpcoming
      ? 'border-amber-700/50'
      : 'border-cyan-700/50';

    return (
      <Link href={`/music/${release.id}`} className="group block h-full w-full">
        <motion.div
          className="flex h-full flex-col overflow-hidden rounded-lg border bg-zinc-950/30 shadow-lg shadow-black/30"
          variants={cardVariants}
          initial="initial"
          whileHover="hover"
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={release.imageURL}
              alt={`${release.title} - ${release.year}`}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              draggable={false}
              priority={release.id === upcomingRelease.id}
              loading={release.id === upcomingRelease.id ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div
              className={`absolute top-2 right-2 rounded-full px-2.5 py-1 text-xs font-semibold ${typeBgColor} ${typeColor} border ${typeBorderColor} shadow-md backdrop-blur-sm`}
            >
              {release.type.toUpperCase()}
            </div>
          </div>

          <div className="flex flex-grow flex-col p-4">
            <motion.h3
              variants={titleVariants}
              transition={{ duration: 0.2 }}
              className="mb-1 text-lg font-semibold md:text-xl"
            >
              {release.title}
            </motion.h3>
            <motion.p
              variants={textVariants}
              transition={{ duration: 0.2 }}
              className="mb-3 text-sm"
            >
              {release.year}
            </motion.p>

            <div className="mt-auto border-t border-zinc-700/60 pt-2 text-xs text-zinc-400">
              <p>
                Released by:{' '}
                <span className="font-medium text-zinc-300">
                  {release.releasedBy}
                </span>
              </p>
              <p>
                Release date:{' '}
                <span className="font-medium text-zinc-300">
                  {release.releaseDate}
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  },
);
ShowcaseCard.displayName = 'ShowcaseCard';

export default function MusicShowcaseSection(): React.ReactElement {
  const { ref, inView } = useInView({ threshold: 0.1, once: true });
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prevIndex) =>
      prevIndex === allReleases.length - 1 ? 0 : prevIndex + 1,
    );
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? allReleases.length - 1 : prevIndex - 1,
    );
  }, []);

  const mobileSlideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section
      ref={ref}
      id="music"
      className="relative overflow-hidden px-4 pt-3 pb-6 md:px-6 md:pt-6 md:pb-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[url('/texture.png')] bg-repeat opacity-10 md:opacity-10"></div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.h2
          className="mb-6 text-center text-3xl font-bold text-white md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: -20 }}
        >
          Explore The Music
        </motion.h2>

        <motion.div
          className="hidden grid-cols-1 gap-8 sm:grid sm:grid-cols-2 md:gap-10 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2, staggerChildren: 0.1 }}
        >
          {allReleases.map((release, index) => (
            <motion.div
              key={release.id}
              className="flex"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ delay: index * 0.1 }}
            >
              <ShowcaseCard release={release} />
            </motion.div>
          ))}
        </motion.div>

        <div className="relative flex h-[550px] items-center justify-center sm:hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={mobileSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
              }}
              className="absolute w-full max-w-sm px-4"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -1000) {
                  handleNext();
                } else if (swipe > 1000) {
                  handlePrev();
                }
              }}
            >
              <ShowcaseCard release={allReleases[activeIndex]} />
            </motion.div>
          </AnimatePresence>

          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm hover:bg-black/50 disabled:opacity-30"
            aria-label="Previous Release"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm hover:bg-black/50 disabled:opacity-30"
            aria-label="Next Release"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
