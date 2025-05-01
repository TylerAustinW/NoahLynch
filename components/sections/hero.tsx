'use client';

import ErrorBoundary from '@/components/ui/error-boundary';
import { useInView } from '@/hooks/use-in-view';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import CountdownTimer from '@/components/ui/countdown-timer';

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
          <p className="mb-8 max-w-md text-lg text-zinc-400">
            Mississippi-Born Musician, Singer-Songwriter
          </p>
        </div>
      </section>
    );
  }

  return (
    <ErrorBoundary>
      <section
        ref={ref}
        className="relative flex min-h-screen items-center overflow-hidden pt-16"
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
            <div className="mb-4 inline-block rounded-full border border-zinc-700/30 bg-zinc-900/70 px-4 py-2 backdrop-blur-sm">
              <span className="font-medium text-amber-200/90">
                Coming May 9, 2025
              </span>
            </div>
            <h1 className="mb-4 text-5xl font-bold md:text-7xl">
              New Single
              <br />
              <span className="mb-4 text-5xl font-bold text-white drop-shadow-md md:text-7xl">
                Honest
              </span>
            </h1>
            <p className="mb-8 max-w-md text-lg leading-relaxed text-zinc-200">
              Mississippi-Born Musician, Singer-Songwriter
            </p>
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
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}
