'use client';

import { useInView } from '@/hooks/use-in-view';
import { allReleases, ReleaseWithPlatforms, upcomingRelease } from '@/lib/musicData';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';

const ShowcaseCard = React.memo(({ release }: { release: ReleaseWithPlatforms }) => {
   const isUpcoming = release.type === 'upcoming';
   const typeColor = isUpcoming ? 'text-amber-400' : 'text-cyan-400';
   const typeBgColor = isUpcoming ? 'bg-amber-900/50' : 'bg-cyan-900/50';
   const typeBorderColor = isUpcoming ? 'border-amber-700/50' : 'border-cyan-700/50';

   return (
      <Link href={`/music/${release.id}`} className="group block w-full h-full">
         <motion.div
            className="flex flex-col h-full bg-zinc-950/30 rounded-lg border border-zinc-800/60 shadow-lg shadow-black/30 overflow-hidden group-hover:border-zinc-700/80 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02, borderColor: 'rgba(161, 98, 7, 0.6)' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
         >
            <div className="relative w-full aspect-[4/3] overflow-hidden">
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
               <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               <div
                  className={`absolute top-2 right-2 px-2.5 py-1 rounded-full text-xs font-semibold ${typeBgColor} ${typeColor} border ${typeBorderColor} backdrop-blur-sm shadow-md`}
               >
                  {release.type.toUpperCase()}
               </div>
            </div>

            <div className="p-4 flex flex-col flex-grow">
               <h3 className="text-lg md:text-xl font-semibold text-white mb-1 group-hover:text-amber-100 transition-colors">
                  {release.title}
               </h3>
               <p className="text-sm text-zinc-400 mb-3 group-hover:text-zinc-300 transition-colors">
                  {release.year}
               </p>

               <div className="text-xs text-zinc-400 mt-auto pt-2 border-t border-zinc-700/60">
                  <p>
                     Released by:{' '}
                     <span className="font-medium text-zinc-300">{release.releasedBy}</span>
                  </p>
                  <p>
                     Release date:{' '}
                     <span className="font-medium text-zinc-300">{release.releaseDate}</span>
                  </p>
               </div>
            </div>
         </motion.div>
      </Link>
   );
});
ShowcaseCard.displayName = 'ShowcaseCard';

export default function MusicShowcaseSection(): React.ReactElement {
   const { ref, inView } = useInView({ threshold: 0.1 });
   const [activeIndex, setActiveIndex] = useState(0);
   const [direction, setDirection] = useState(0);

   const handleNext = useCallback(() => {
      setDirection(1);
      setActiveIndex(prevIndex => (prevIndex === allReleases.length - 1 ? 0 : prevIndex + 1));
   }, []);

   const handlePrev = useCallback(() => {
      setDirection(-1);
      setActiveIndex(prevIndex => (prevIndex === 0 ? allReleases.length - 1 : prevIndex - 1));
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
         id="music"
         ref={ref}
         className="py-12 px-4 md:px-8 bg-gradient-to-b from-black via-zinc-950/99 to-black relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-40 after:bg-gradient-to-t after:from-black after:to-transparent after:pointer-events-none overflow-hidden"
      >
         <div className="max-w-7xl mx-auto">
            <motion.h2
               className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-8"
               initial={{ opacity: 0, y: -20 }}
               animate={inView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.5, delay: 0.1 }}
            >
               Explore The Music
            </motion.h2>

            <motion.div
               className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
               initial={{ opacity: 0 }}
               animate={inView ? { opacity: 1 } : {}}
               transition={{ duration: 0.5, delay: 0.2, staggerChildren: 0.1 }}
            >
               {allReleases.map((release, index) => (
                  <motion.div
                     key={release.id}
                     className="flex"
                     variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                     initial="hidden"
                     animate={inView ? 'visible' : 'hidden'}
                     transition={{ delay: index * 0.1 }}
                  >
                     <ShowcaseCard release={release} />
                  </motion.div>
               ))}
            </motion.div>

            <div className="sm:hidden relative h-[550px] flex items-center justify-center">
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
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 rounded-full backdrop-blur-sm text-white disabled:opacity-30"
                  aria-label="Previous Release"
               >
                  <ChevronLeft className="w-6 h-6" />
               </button>
               <button
                  onClick={handleNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 rounded-full backdrop-blur-sm text-white disabled:opacity-30"
                  aria-label="Next Release"
               >
                  <ChevronRight className="w-6 h-6" />
               </button>
            </div>
         </div>
      </section>
   );
}
