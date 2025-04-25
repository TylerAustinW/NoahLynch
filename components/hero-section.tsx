"use client";

import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/use-in-view";
import { Calendar, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div
          className={`max-w-xl transition-all duration-1000 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-block mb-4 bg-amber-400/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-amber-400 font-medium">Coming May 2025</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            New Single
            <br />
            <span className="text-amber-400">Honest</span>
          </h1>

          <p className="text-gray-300 mb-8 max-w-md text-lg">
            Mississippi-Born Musician, Singer-Songwriter
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              variant="outline"
              className="bg-amber-400 text-black hover:bg-amber-500 border-none rounded-none px-6 group relative overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-black/0 group-hover:bg-black/10 transition-colors"></span>
              <Play className="mr-2 h-4 w-4" /> Listen Now
            </Button>

            <Button
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10 rounded-none px-6"
              asChild
            >
              <Link href="#tour">
                <Calendar className="mr-2 h-4 w-4" /> Tour Dates
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white/80 rounded-full mt-2 animate-bounce"></div>
        </div>
        <span className="mt-2 text-xs text-white/70 tracking-widest">
          SCROLL
        </span>
      </div>
    </section>
  );
}
