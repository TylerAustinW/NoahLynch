"use client";

import ErrorBoundary from "@/components/ui/error-boundary";
import TourInfoBadge from "@/components/ui/tour-info-badge";
import { useInView } from "@/hooks/use-in-view";
import { motion } from "framer-motion";
import { ChevronDown, Heart } from "lucide-react";
import { Patrick_Hand } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";

const patrickHand = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});

export default function HeroSection(): React.ReactElement {
  const { ref } = useInView({ threshold: 0.1 });
  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Trigger the entrance animation once component mounts
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
        id="hero"
        className="relative flex min-h-screen items-center overflow-hidden pt-16 pb-0"
      >
        {/* Background Image */}
        <div className="absolute inset-0 h-full w-full">
          <Image
            src="/honest-coverr.png"
            alt="Noah Lynch - Honest"
            fill
            className="object-center"
            style={{
              objectPosition: "center 30%",
              transform: loaded ? "scale(1.05)" : "scale(1)",
              transition: "transform 30s ease-out",
            }}
            onError={() => setImageError(true)}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/75" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            {/* Title Section */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold uppercase text-white drop-shadow-2xl mb-2">
                Honest
              </h1>
              <p className="text-3xl md:text-5xl font-bold uppercase text-amber-300 drop-shadow-lg">
                Out Now
              </p>
            </div>

            {/* Primary Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 10 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex flex-wrap gap-4 mb-6"
            >
              <a
                href="/music/honest"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                aria-label="Listen to the latest album Honest"
              >
                Listen Now
              </a>
              <a
                href="mailto:NoahLynchContact@gmail.com"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30 rounded-full transition-all duration-300"
                aria-label="Contact Noah Lynch via email"
              >
                Get in Touch
              </a>
            </motion.div>

            {/* Secondary Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 10 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <a
                href="#music"
                className="inline-flex items-center px-6 py-3 text-sm font-medium text-zinc-100 bg-zinc-900/60 hover:bg-zinc-800/70 backdrop-blur-sm border border-zinc-700/50 rounded-full transition-all duration-300"
                aria-label="Explore Noah Lynch's music catalog"
              >
                Explore Music
              </a>
              <a
                href="/merch"
                className="inline-flex items-center px-6 py-3 text-sm font-medium text-zinc-100 bg-zinc-900/60 hover:bg-zinc-800/70 backdrop-blur-sm border border-zinc-700/50 rounded-full transition-all duration-300"
                aria-label="Browse merchandise"
              >
                Shop Merch
              </a>
            </motion.div>

            {/* Social Links and Tour Info - Aligned Horizontally */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 10 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
            >
              {/* Social Links */}
              <div className="flex items-center gap-5">
                <a
                  href="https://instagram.com/noahlynchmusic"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Noah Lynch on Instagram"
                  className="text-zinc-400 hover:text-pink-500 transition-all duration-300 transform hover:scale-110"
                >
                  <FaInstagram className="h-6 w-6" aria-hidden="true" />
                </a>
                <a
                  href="https://facebook.com/noahlynchmusic"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Noah Lynch on Facebook"
                  className="text-zinc-400 hover:text-blue-500 transition-all duration-300 transform hover:scale-110"
                >
                  <FaFacebookF className="h-6 w-6" aria-hidden="true" />
                </a>
                <a
                  href="https://tiktok.com/@noahlynchmusic"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Noah Lynch on Tiktok"
                  className="text-zinc-400 hover:text-pink-400 transition-all duration-300 transform hover:scale-110"
                >
                  <FaTiktok className="h-6 w-6" aria-hidden="true" />
                </a>
                <a
                  href="https://youtube.com/@noahlynch"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Subscribe to Noah Lynch on YouTube"
                  className="text-zinc-400 hover:text-red-500 transition-all duration-300 transform hover:scale-110"
                >
                  <FaYoutube className="h-6 w-6" aria-hidden="true" />
                </a>
              </div>
              
              {/* Tour Info Badge */}
              <TourInfoBadge />
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 sm:hidden"
          initial={{ opacity: 0 }}
          animate={{
            opacity: loaded ? 0.7 : 0,
            y: [0, 10, 0],
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            },
            opacity: {
              delay: 1.5,
              duration: 0.8,
            },
          }}
        >
          <div className="flex flex-col items-center">
            <span className="mb-1 text-xs font-medium text-zinc-300">
              Scroll
            </span>
            <ChevronDown className="h-5 w-5 text-zinc-300" aria-hidden="true" />
          </div>
        </motion.div>

        {/* Hand-written quote - Repositioned for better balance */}
        <motion.div 
          className="absolute bottom-16 right-8 z-10 p-4 max-w-xs text-right hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 0.9 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p
            className={`${patrickHand.className} text-lg text-zinc-100 leading-relaxed`}
          >
            "I hope this record means as much to you as it does to me, thank you
            for the endless support
            <br />
            <span className="inline-flex items-center gap-1 mt-2">
              - Noah
              <Heart
                className="h-5 w-5 text-zinc-100"
                aria-hidden="true"
              />
            </span>
          </p>
        </motion.div>
      </section>
    </ErrorBoundary>
  );
}