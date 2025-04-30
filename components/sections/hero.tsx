"use client";

import ErrorBoundary from "@/components/ui/error-boundary";
import { useInView } from "@/hooks/use-in-view";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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
        className="relative min-h-screen flex items-center justify-center pt-16 bg-black"
      >
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Noah Lynch
            <br />
            <span className="text-5xl md:text-7xl text-amber-100 font-bold mb-4">
              Musician
            </span>
          </h1>
          <p className="text-zinc-400 mb-8 max-w-md text-lg">
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
        className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      >
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/noah-studio.jpeg"
            alt="Noah Lynch - Honest"
            fill
            className="object-cover"
            priority
            style={{
              objectPosition: "center 30%",
              transform: loaded ? "scale(1.05)" : "scale(1)",
              transition: "transform 30s ease-out",
            }}
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div
            className={`max-w-xl transition-all duration-1000 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-block mb-4 bg-zinc-900/70 backdrop-blur-sm px-4 py-2 rounded-full border border-zinc-700/30">
              <span className="text-amber-200/90 font-medium">
                Coming May 2025
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              New Single
              <br />
              <span className="text-5xl md:text-7xl text-white font-bold mb-4 drop-shadow-md">
                Honest
              </span>
            </h1>
            <p className="text-zinc-200 mb-8 max-w-md text-lg leading-relaxed">
              Mississippi-Born Musician, Singer-Songwriter
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#music"
                className="px-6 py-3 bg-zinc-900/50 hover:bg-zinc-800/60 border border-zinc-700/40 hover:border-zinc-600/60 text-white rounded-full transition-all duration-300 font-medium"
              >
                Explore Music
              </a>
              <a
                href="/merch"
                className="px-6 py-3 bg-zinc-900/50 hover:bg-zinc-800/60 border border-zinc-700/40 hover:border-zinc-600/60 text-white rounded-full transition-all duration-300 font-medium"
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
