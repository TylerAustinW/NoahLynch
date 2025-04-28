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
      year: '2023',
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

const contentVariants = {
   hidden: (direction: 'left' | 'right' | 'up' | 'down') => {
      const xValue = direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0;
      const yValue = direction === 'up' ? '-100%' : direction === 'down' ? '100%' : 0;

      return {
         x: xValue,
         y: yValue,
         opacity: 0,
         scale: 0.95,
      };
   },
   visible: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
         type: 'spring',
         stiffness: 80,
         damping: 20,
         when: 'beforeChildren',
         staggerChildren: 0.1,
      },
   },
   exit: (direction: 'left' | 'right' | 'up' | 'down') => {
      const xValue = direction === 'left' ? '100%' : direction === 'right' ? '-100%' : 0;
      const yValue = direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0;

      return {
         x: xValue,
         y: yValue,
         opacity: 0,
         scale: 0.95,
         transition: {
            type: 'spring',
            stiffness: 100,
            damping: 20,
            when: 'afterChildren',
            staggerChildren: 0.05,
            staggerDirection: -1,
         },
      };
   },
};

const platformIconVariants = {
   hidden: { opacity: 0, y: 20 },
   visible: {
      opacity: 1,
      y: 0,
      transition: {
         type: 'spring',
         stiffness: 200,
         damping: 15,
      },
   },
   exit: {
      opacity: 0,
      y: 20,
      transition: {
         type: 'spring',
         stiffness: 200,
         damping: 15,
      },
   },
};

const ReleaseCard = React.memo(
   ({ release, inView }: { release: ReleaseWithPlatforms; inView: boolean }) => {
      return (
         <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
            <div
               className={`transition-all duration-700 ${
                  inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
               }`}
               style={{ flex: '0 0 auto' }}
            >
               <div className="relative">
                  <Image
                     src={release.imageURL}
                     alt={`${release.title} - ${release.year}`}
                     width={400}
                     height={400}
                     className="w-full max-w-md h-auto shadow-xl rounded-sm"
                     draggable={false}
                     priority
                     loading="eager"
                  />
               </div>
            </div>

            <div className="max-w-lg">
               <h3 className="text-3xl font-bold mb-2">{release.title}</h3>
               <p className="text-gray-400 mb-6">Single • {release.year}</p>

               <p className="text-gray-300 mb-8 text-lg">{release.description}</p>

               {release.linkText ? (
                  <div className="mb-6">
                     <button className="text-lg font-bold mb-4 bg-sky-100/20 hover:bg-sky-100/30 px-3 py-1 rounded-full transition-colors">
                        <Link href={release.platforms[0]?.url || '#'}>{release.linkText}</Link>
                     </button>
                  </div>
               ) : null}

               <div className="flex flex-wrap gap-4 items-center">
                  {release.platforms.map((platform, index) => (
                     <motion.div key={index} variants={platformIconVariants}>
                        <Link
                           href={platform.url}
                           className="text-white hover:text-sky-300 transition-colors"
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
         }, 100);
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
         }, 100);
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
            }, 100);
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
            }, 100);
         }, 300); // Longer delay for tab changes
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
               <motion.div
                  key={previousReleases[activeIndex].id}
                  custom={direction}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="overflow-hidden"
               >
                  <ReleaseCard release={currentRelease} inView={inView} />
               </motion.div>
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
                                 ? 'bg-sky-100 w-4'
                                 : 'bg-gray-500 hover:bg-gray-400'
                           }`}
                           aria-label={`View ${release.title}`}
                           aria-selected={index === activeIndex}
                           role="tab"
                           disabled={isChangingTab}
                        />
                     ))}
                  </div>

                  {/* animation for the buttons */}
                  <div className="flex gap-2">
                     <button
                        onClick={handlePrev}
                        disabled={isChangingTab}
                        className="p-2 rounded-full bg-sky-100/10 hover:bg-sky-100/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous release"
                     >
                        <ChevronLeft className="w-5 h-5 text-sky-100" />
                     </button>
                     <button
                        onClick={handleNext}
                        disabled={isChangingTab}
                        className="p-2 rounded-full bg-sky-100/10 hover:bg-sky-100/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next release"
                     >
                        <ChevronRight className="w-5 h-5 text-sky-100" />
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
         className="py-24 px-6 md:px-12 bg-black/90 relative
                   after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0
                   after:h-40 after:bg-gradient-to-t after:from-black after:to-transparent after:pointer-events-none"
      >
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
               <h2 className="text-3xl md:text-5xl font-bold text-sky-100 mb-4 md:mb-0">
                  {releaseType === 'upcoming' ? 'UPCOMING RELEASES' : 'PREVIOUS RELEASES'}
               </h2>

               <div className="flex space-x-2 bg-black/50 p-1 rounded-full" role="tablist">
                  <button
                     onClick={() => handleTabChange('upcoming')}
                     className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        releaseType === 'upcoming'
                           ? 'bg-sky-100/20 text-sky-100'
                           : 'text-gray-400 hover:text-sky-100'
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
                     className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        releaseType === 'previous'
                           ? 'bg-sky-100/20 text-sky-100'
                           : 'text-gray-400 hover:text-sky-100'
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
                  <motion.div
                     key={releaseType}
                     custom={direction}
                     variants={contentVariants}
                     initial="hidden"
                     animate="visible"
                     exit="exit"
                  >
                     {releaseType === 'upcoming' ? (
                        <ReleaseCard release={upcomingRelease} inView={inView} />
                     ) : (
                        renderPreviousReleases()
                     )}
                  </motion.div>
               </AnimatePresence>
            </div>
         </div>
      </section>
   );
}
