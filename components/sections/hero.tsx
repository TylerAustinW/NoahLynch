'use client';

import ErrorBoundary from '@/components/ui/error-boundary';
import { useInView } from '@/hooks/use-in-view';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import CountdownTimer from '@/components/ui/countdown-timer';
import { FaInstagram, FaFacebookF, FaTiktok, FaYoutube } from 'react-icons/fa6';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection(): React.ReactElement {
  const { ref } = useInView({ threshold: 0.1 });
  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (imageError) {
    return (
      <section
        ref={ref}
        className="relative flex min-h-screen items-center justify-center bg-black pt-16"
      >
        <div className="text-center">
          <h1 className="mb-4 text-5xl font-bold md:text-7xl">
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

  return (
    <ErrorBoundary>
      <section
        ref={ref}
        className="relative flex min-h-screen items-center overflow-hidden pt-16 pb-0"
      >
        <div className="absolute inset-0 h-full w-full">
          <Image
            src="/noah-studio.jpeg"
            alt="Noah Lynch - Honest"
            fill
            className="object-cover"
            priority
            style={{
              objectPosition: 'center 30%',
              transform: loaded ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 30s ease-out',
            }}
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/75" />
        </div>
        <div className="relative z-10 container mx-auto px-6 md:px-12">
          <div
            className={`max-w-xl transition-all duration-1000 ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h1 className="mb-4 text-5xl font-bold md:text-7xl">
              New Single
              <br />
              <span className="mb-4 text-5xl font-bold text-amber-200/90 drop-shadow-md md:text-7xl">
                Honest
              </span>
            </h1>
            <CountdownTimer 
              targetDate="2025-05-09T00:56:00-05:00"
              className="mb-8"
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#music"
                className="rounded-full border border-zinc-700/40 bg-zinc-900/50 px-6 py-3 font-medium text-white transition-all duration-300 hover:border-zinc-600/60 hover:bg-zinc-800/60"
              >
                Explore Music
              </a>
              <a
                href="/merch"
                className="rounded-full border border-zinc-700/40 bg-zinc-900/50 px-6 py-3 font-medium text-white transition-all duration-300 hover:border-zinc-600/60 hover:bg-zinc-800/60"
              >
                Explore Merch
              </a>
            </div>
            <div className="mt-6 flex gap-6 ">
              <a
                href="https://instagram.com/noahlynchmusic"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-zinc-400 transition-colors hover:text-pink-500"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com/noahlynchmusic"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-zinc-400 transition-colors hover:text-blue-500"
              >
                <FaFacebookF className="h-6 w-6" />
              </a>
              <a
                href="https://tiktok.com/@noahlynchmusic"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tiktok"
                className="text-zinc-400 transition-colors hover:text-red-500"
              >
                <FaTiktok className="h-6 w-6" />
              </a>
              <a
                href="https://youtube.com/@noahlynch"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-zinc-400 transition-colors hover:text-red-500"
              >
                <FaYoutube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <motion.div 
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 sm:hidden"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: loaded ? 1 : 0,
            y: [0, 10, 0]
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            },
            opacity: {
              delay: 1.5,
              duration: 0.8
            }
          }}
        >
          <div className="flex flex-col items-center">
            <span className="mb-1 text-xs font-medium text-zinc-300">Scroll</span>
            <ChevronDown className="h-6 w-6 text-zinc-300" />
          </div>
        </motion.div>
      </section>
    </ErrorBoundary>
  );
}
