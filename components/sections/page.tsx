'use client';

import { useInView } from '@/hooks/use-in-view';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaAmazon, FaApple, FaDeezer, FaSpotify, FaYoutube } from 'react-icons/fa';
import { SiPandora } from 'react-icons/si';

type ReleaseType = 'upcoming' | 'previous';

interface Release {
   id: string;
   title: string;
   year: string;
   description: string;
   imageURL: string;
}

interface Platform {
   name: string;
   url: string;
   icon: React.ReactNode;
}

interface ReleaseWithPlatforms extends Release {
   platforms: Platform[];
   linkText?: string;
}

const createPlatformLink = (name: string, url: string): Platform => {
   const icons = {
      Spotify: <FaSpotify className="w-6 h-6" />,
      'Apple Music': <FaApple className="w-6 h-6" />,
      'Amazon Music': <FaAmazon className="w-6 h-6" />,
      'YouTube Music': <FaYoutube className="w-6 h-6" />,
      Deezer: <FaDeezer className="w-6 h-6" />,
      Pandora: <SiPandora className="w-6 h-6" />,
   };

   return {
      name,
      url,
      icon: icons[name as keyof typeof icons] || <FaSpotify className="w-6 h-6" />,
   };
};

const previousReleases: ReleaseWithPlatforms[] = [
   {
      id: 'good-things-take-time',
      title: 'Good things take time',
      year: '2024',
      description:
         'The acknowledgment that "good things take time" serves as a reminder to practice patience in the face of challenges, it sends a reminder to be patient with yourself and not to rush the process of growth.',
      imageURL: '/gttt.jpg',
      platforms: [
         createPlatformLink('Spotify', 'https://open.spotify.com/track/2tFn7noYlbBqzECeUuDgLn'),
         createPlatformLink(
            'Apple Music',
            'https://music.apple.com/album/good-things-take-time/1756853346?i=1756853347'
         ),
         createPlatformLink('Amazon Music', 'https://music.amazon.com/albums/B0D971YCZT'),
         createPlatformLink(
            'YouTube Music',
            'https://music.youtube.com/playlist?list=OLAK5uy_kBPfSe2-d9b9DNCDLrMFkMqQSvJB2LRSQ'
         ),
         createPlatformLink(
            'Pandora',
            'https://pandora.com/artist/noah-lynch/good-things-take-time/ALhKVZ6x7dnkJPc'
         ),
         createPlatformLink('Deezer', 'https://www.deezer.com/us/album/614383912'),
      ],
      linkText: 'LISTEN NOW!',
   },
   {
      id: 'For You',
      title: 'For You',
      year: '2024',
      description:
         "A collection of acoustic demos showcasing Noah's songwriting process and musical evolution. These raw, unfiltered tracks provide an intimate look into the artist's creative journey.",
      imageURL: '/foryou.jpg',
      platforms: [
         createPlatformLink('Spotify', 'https://open.spotify.com/track/7eCRFPhvQglvAwxdTatzGB'),
         createPlatformLink(
            'Apple Music',
            'https://music.apple.com/album/for-you/1744360290?i=1744360291'
         ),
         createPlatformLink('Amazon Music', 'https://music.amazon.com/albums/B0D33XXDR2'),
         createPlatformLink(
            'YouTube Music',
            'https://music.youtube.com/playlist?list=OLAK5uy_l8cmplc55OnsTminixgV_HdPR3XZS1wYA'
         ),
         createPlatformLink(
            'Pandora',
            'https://pandora.com/artist/noah-lynch/for-you/for-you/TRj33rhPZpzmljV'
         ),
         createPlatformLink('Deezer', 'https://www.deezer.com/us/album/581142311'),
      ],
      linkText: 'LISTEN NOW!',
   },
];

const upcomingRelease: ReleaseWithPlatforms = {
   id: 'honest',
   title: 'Honest',
   year: '2025',
   description:
      "\"Honest\" is Noah Lynch's personal reflection on embracing vulnerability during life's challenges. Written while anticipating fatherhood, the song encourages authenticity and reminds listeners that it's okay to not be okay. Noah hopes the track will foster understanding and connection through open communication.",
   imageURL: '/honest-cover.jpeg',
   platforms: [],
   linkText: 'PRE-SAVE NOW!',
};

const coverArtVariants = {
   hidden: (direction: 'left' | 'right' | 'up' | 'down') => ({
      opacity: 0,
      scale: 0.98,
      x: direction === 'left' ? -20 : direction === 'right' ? 20 : 0,
   }),
   visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
         type: 'spring',
         stiffness: 50,
         damping: 15,
      },
   },
   exit: (direction: 'left' | 'right' | 'up' | 'down') => ({
      opacity: 0,
      scale: 0.98,
      x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,
      transition: {
         type: 'spring',
         stiffness: 50,
         damping: 15,
      },
   }),
};

const contentVariants = {
   hidden: (direction: 'left' | 'right' | 'up' | 'down') => ({
      opacity: 0,
      y: 10,
   }),
   visible: {
      opacity: 1,
      y: 0,
      transition: {
         type: 'spring',
         stiffness: 50,
         damping: 15,
         when: 'beforeChildren',
         staggerChildren: 0.1,
      },
   },
   exit: (direction: 'left' | 'right' | 'up' | 'down') => ({
      opacity: 0,
      y: -10,
      transition: {
         type: 'spring',
         stiffness: 50,
         damping: 15,
      },
   }),
};

const platformIconVariants = {
   hidden: { opacity: 0, y: 10 },
   visible: {
      opacity: 1,
      y: 0,
      transition: {
         type: 'spring',
         stiffness: 50,
         damping: 15,
      },
   },
   exit: {
      opacity: 0,
      y: 10,
      transition: {
         type: 'spring',
         stiffness: 50,
         damping: 15,
      },
   },
};

const ReleaseCard = React.memo(
   ({ release, inView }: { release: ReleaseWithPlatforms; inView: boolean }) => {
      return (
         <div className="flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-16">
            <motion.div
               className="w-full md:w-5/12 flex-shrink-0 max-w-sm md:max-w-md"
               style={{ flexBasis: 'auto' }}
               variants={coverArtVariants}
               initial="hidden"
               animate="visible"
               exit="exit"
            >
               <div className="relative aspect-square mx-auto md:mx-0">
                  <Image
                     src={release.imageURL}
                     alt={`${release.title} - ${release.year}`}
                     fill
                     sizes="(max-width: 768px) 90vw, 40vw"
                     className="object-cover shadow-xl rounded-sm border border-zinc-800/50"
                     draggable={false}
                     priority
                     loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
               </div>
            </motion.div>

            <motion.div
               className="w-full md:w-7/12 mt-6 md:mt-0 flex flex-col"
               variants={contentVariants}
               initial="hidden"
               animate="visible"
               exit="exit"
            >
               <div>
                  <h3 className="text-3xl font-bold mb-2 text-white">{release.title}</h3>
                  <p className="text-zinc-500 mb-4">Single • {release.year}</p>

                  <p className="text-zinc-300 mb-6 text-lg leading-relaxed">
                     {release.description}
                  </p>

                  {release.linkText ? (
                     <div className="mb-4">
                        <button className="text-lg font-medium bg-zinc-900/70 hover:bg-zinc-800/80 border border-zinc-700/50 hover:border-zinc-600/60 px-5 py-2 rounded-full transition-all">
                           <Link href={release.platforms[0]?.url || '#'}>{release.linkText}</Link>
                        </button>
                     </div>
                  ) : null}

                  <div className="flex flex-wrap gap-4 items-center">
                     {release.platforms.map((platform, index) => (
                        <motion.div key={index} variants={platformIconVariants}>
                           <Link
                              href={platform.url}
                              className="text-zinc-400 hover:text-amber-200 transition-colors"
                              aria-label={`Listen on ${platform.name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                           >
                              {platform.icon}
                           </Link>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </motion.div>
         </div>
      );
   }
);

ReleaseCard.displayName = 'ReleaseCard';

export default function DiscographySection(): React.ReactElement {
   const { ref, inView } = useInView({ threshold: 0.1 });
   const [releaseType, setReleaseType] = useState<ReleaseType>('upcoming');
   const [activeIndex, setActiveIndex] = useState(0);
   const containerRef = useRef<HTMLDivElement>(null);
   const [isChangingTab, setIsChangingTab] = useState(false);
   const [direction, setDirection] = useState<'left' | 'right' | 'up' | 'down'>('right');

   useEffect(() => {
      const allReleases = [...previousReleases, upcomingRelease];
      allReleases.forEach(release => {
         const preloadImage = new window.Image();
         preloadImage.src = release.imageURL;
      });
   }, []);

   useEffect(() => {
      if (releaseType !== 'previous' || previousReleases.length <= 1) return;

      const handleKeyDown = (e: KeyboardEvent) => {
         if (e.key === 'ArrowLeft') {
            handlePrev();
         } else if (e.key === 'ArrowRight') {
            handleNext();
         }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
   }, [releaseType, activeIndex]);

   const handleNext = useCallback(() => {
      if (isChangingTab) return;
      setDirection('left');
      setIsChangingTab(true);

      // Small delay to ensure AnimatePresence has time to work
      setTimeout(() => {
         setActiveIndex(prevIndex => (prevIndex < previousReleases.length - 1 ? prevIndex + 1 : 0));

         setTimeout(() => {
            setIsChangingTab(false);
         }, 300);
      }, 50);
   }, [isChangingTab, previousReleases.length]);

   const handlePrev = useCallback(() => {
      if (isChangingTab) return;
      setDirection('right');
      setIsChangingTab(true);

      // Small delay to ensure AnimatePresence has time to work
      setTimeout(() => {
         setActiveIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : previousReleases.length - 1));

         setTimeout(() => {
            setIsChangingTab(false);
         }, 300);
      }, 50);
   }, [isChangingTab, previousReleases.length]);

   const handleDotClick = useCallback(
      (index: number) => {
         if (isChangingTab || index === activeIndex) return;

         setDirection(index > activeIndex ? 'left' : 'right');
         setIsChangingTab(true);

         setTimeout(() => {
            setActiveIndex(index);

            setTimeout(() => {
               setIsChangingTab(false);
            }, 300);
         }, 50);
      },
      [activeIndex, isChangingTab]
   );

   const handleTabChange = useCallback(
      (type: ReleaseType) => {
         if (releaseType === type || isChangingTab) return;

         // Use up/down directions for tab changes
         setDirection(type === 'upcoming' ? 'up' : 'down');
         setIsChangingTab(true);

         setTimeout(() => {
            setReleaseType(type);
            setActiveIndex(0);

            setTimeout(() => {
               setIsChangingTab(false);
            }, 300);
         }, 300);
      },
      [releaseType, isChangingTab]
   );

   const currentRelease = useMemo(() => {
      return releaseType === 'upcoming' ? upcomingRelease : previousReleases[activeIndex];
   }, [releaseType, activeIndex]);

   const renderPreviousReleases = () => {
      return (
         <div
            ref={containerRef}
            className="relative"
            role="region"
            aria-label="Previous releases carousel"
            tabIndex={0}
         >
            <AnimatePresence mode="wait" custom={direction}>
               <div key={previousReleases[activeIndex].id} className="overflow-hidden">
                  <ReleaseCard release={currentRelease} inView={inView} />
               </div>
            </AnimatePresence>

            {previousReleases.length > 1 && (
               <div className="flex justify-between items-center mt-8">
                  <div className="flex gap-2 items-center" role="tablist">
                     {previousReleases.map((release, index) => (
                        <button
                           key={index}
                           onClick={() => handleDotClick(index)}
                           className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === activeIndex
                                 ? 'bg-zinc-300 w-4'
                                 : 'bg-zinc-700 hover:bg-zinc-600'
                           }`}
                           aria-label={`View ${release.title}`}
                           aria-selected={index === activeIndex}
                           role="tab"
                           disabled={isChangingTab}
                        />
                     ))}
                  </div>

                  <div className="flex gap-2">
                     <button
                        onClick={handlePrev}
                        disabled={isChangingTab}
                        className="p-2 rounded-full bg-zinc-900/70 hover:bg-zinc-800/80 border border-zinc-700/50 hover:border-zinc-600/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous release"
                     >
                        <ChevronLeft className="w-5 h-5 text-zinc-300" />
                     </button>
                     <button
                        onClick={handleNext}
                        disabled={isChangingTab}
                        className="p-2 rounded-full bg-zinc-900/70 hover:bg-zinc-800/80 border border-zinc-700/50 hover:border-zinc-600/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next release"
                     >
                        <ChevronRight className="w-5 h-5 text-zinc-300" />
                     </button>
                  </div>
               </div>
            )}

            <div className="sr-only" aria-live="polite">
               Now showing {previousReleases[activeIndex].title} from{' '}
               {previousReleases[activeIndex].year}
            </div>
         </div>
      );
   };

   return (
      <section
         id="music"
         ref={ref}
         className="py-20 px-4 md:px-8 bg-gradient-to-b from-black via-zinc-950/99 to-black relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-40 after:bg-gradient-to-t after:from-black after:to-transparent after:pointer-events-none"
      >
         <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
               <h2 className="text-3xl md:text-4xl font-bold text-white text-center md:text-left">
                  {releaseType === 'upcoming' ? 'UPCOMING RELEASES' : 'PREVIOUS RELEASES'}
               </h2>
               <div
                  className="flex space-x-2 bg-black/70 p-1 rounded-full border border-zinc-800/50"
                  role="tablist"
               >
                  <button
                     onClick={() => handleTabChange('upcoming')}
                     className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        releaseType === 'upcoming'
                           ? 'bg-zinc-800/80 text-white border border-zinc-700/50'
                           : 'text-zinc-400 hover:text-white'
                     }`}
                     role="tab"
                     aria-selected={releaseType === 'upcoming'}
                     aria-controls="upcoming-tab"
                     disabled={isChangingTab}
                  >
                     Upcoming
                  </button>
                  <button
                     onClick={() => handleTabChange('previous')}
                     className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        releaseType === 'previous'
                           ? 'bg-zinc-800/80 text-white border border-zinc-700/50'
                           : 'text-zinc-400 hover:text-white'
                     }`}
                     role="tab"
                     aria-selected={releaseType === 'previous'}
                     aria-controls="previous-tab"
                     disabled={isChangingTab}
                  >
                     Previous
                  </button>
               </div>
            </div>

            <div
               className="min-h-[500px]"
               id={releaseType === 'upcoming' ? 'upcoming-tab' : 'previous-tab'}
               role="tabpanel"
            >
               <AnimatePresence mode="wait" custom={direction}>
                  <div key={releaseType}>
                     {releaseType === 'upcoming' ? (
                        <div className="mx-auto max-w-xl w-full">
                           <ReleaseCard release={upcomingRelease} inView={inView} />
                        </div>
                     ) : (
                        <div className="mx-auto max-w-xl w-full">{renderPreviousReleases()}</div>
                     )}
                  </div>
               </AnimatePresence>
            </div>
         </div>
      </section>
   );
}
