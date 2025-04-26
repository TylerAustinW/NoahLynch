"use client";

import { useInView } from "@/hooks/use-in-view";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const { ref } = useInView({ threshold: 0.1 });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center pt-16 overflow-hidden
                 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0
                 after:h-40 after:bg-gradient-to-t after:from-black after:to-transparent after:pointer-events-none"
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
        />
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/0 to-black/80" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div
          className={`max-w-xl transition-all duration-1000 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-block mb-4 bg-sky-100/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-sky-100 font-medium">Coming May 2025</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            New Single
            <br />
            <span className="text-5xl md:text-7xl text-sky-100 font-bold mb-4">
              Honest
            </span>
          </h1>

          <p className="text-gray-300 mb-8 max-w-md text-lg">
            Mississippi-Born Musician, Singer-Songwriter
          </p>

          <div className="flex flex-wrap gap-4"></div>
        </div>
      </div>
    </section>
  );
}
