"use client";

import { Button } from "@/components/ui/button.component";
import ErrorBoundary from "@/components/ui/error-boundary.component";
import PastShowsModal from "./past-shows-modal.component";
import ShowBadge from "./show-badge.component";
import { useInView } from "@/lib/hooks/use-in-view.hook";
import { useScrollLock } from "@/lib/hooks/use-scroll-lock.hook";
import { getPastShows } from "@/lib/data/tour";
import { SOCIAL_LINKS } from "@/lib/config/constants";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Patrick_Hand } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF, FaTiktok, FaYoutube } from "react-icons/fa6";

const Font = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});

export default function HeroSection(): React.ReactElement {
  const { ref } = useInView({ threshold: 0.1 });
  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [reducedMotion, setPrefersReducedMotion] = useState(false);
  const [showPastShows, setShowPreviousShows] = useState(false);
  const pastShows = getPastShows();

  // Use the new scroll lock hook
  useScrollLock(showPastShows);

  useEffect(() => {
    setLoaded(true);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showPastShows) {
        setShowPreviousShows(false);
      }
    };

    if (showPastShows) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [showPastShows]);

  if (imageError) {
    return (
      <section
        ref={ref}
        className="relative flex min-h-screen items-center justify-center bg-black pt-16"
      >
        <div className="text-center">
          <h1 className={`mb-4 text-5xl font-bold md:text-7xl ${Font.className}`}>
            Noah Lynch
            <br />
            <span className="mb-4 text-5xl font-bold text-amber-100 md:text-7xl">Musician</span>
          </h1>
        </div>
      </section>
    );
  }

  const animationVariants = {
    scroll: {
      y: reducedMotion ? [0] : [0, 10, 0],
      transition: {
        repeat: Infinity,
        duration: reducedMotion ? 0 : 1.5,
        ease: "easeInOut",
      },
    },
    fadeIn: {
      opacity: {
        delay: reducedMotion ? 0 : 1.5,
        duration: reducedMotion ? 0 : 0.8,
      },
    },
  };

  return (
    <ErrorBoundary>
      <section
        ref={ref}
        id="hero"
        className="relative flex min-h-screen items-center overflow-hidden pt-16 pb-0 bg-zinc-950"
      >
        <div className="absolute top-0 h-full w-full">
          <Image
            quality={75}
            src="/venues/the-roof/NoahAtTheRoof2.jpg"
            alt="Noah Lynch performing at The Roof"
            fill
            sizes="(max-width: 768px) 100vw, 0px"
            className="object-cover md:hidden"
            style={{
              objectPosition: "center center",
              transform: loaded ? "scale(1.02)" : "scale(1)",
              transition: "transform 30s ease-out",
            }}
            onError={() => setImageError(true)}
            priority
          />
          <Image
            quality={75}
            src="/venues/the-roof/NoahAtTheRoof2.jpg"
            alt="Noah Lynch performing at The Roof"
            fill
            sizes="(min-width: 768px) 100vw, 0px"
            className="object-cover hidden md:block"
            style={{
              objectPosition: "center 20%",
              transform: loaded ? "scale(1.02)" : "scale(1)",
              transition: "transform 30s ease-out",
            }}
            onError={() => setImageError(true)}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40" />
          <div className="pointer-events-none absolute inset-0 bg-[url('/overlays/grain-texture-overlay.png')] bg-repeat opacity-[0.01] md:opacity-[0.03]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div
            className={`max-w-xl transition-all duration-1000 ${loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="relative z-20 mb-4 sm:mb-6">
              <div className="w-full max-w-fit">
                <ShowBadge />
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <Button asChild variant="primary" size="default">
                    <Link href="/music/honest" aria-label="Listen to the latest album Honest">
                      Listen Now
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" size="default">
                    <Link
                      href={`mailto:${SOCIAL_LINKS.EMAIL}`}
                      aria-label="Contact Noah Lynch via email"
                    >
                      Contact
                    </Link>
                  </Button>
                  <Link
                    href={"#music"}
                    className="rounded-full border px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent min-h-[32px] flex items-center justify-center sm:px-4 sm:py-2 sm:min-h-[36px] border-zinc-700/40 bg-zinc-900/80 hover:bg-zinc-800/90 hover:border-zinc-600/50 focus:ring-zinc-500/40 lg:border-white/20 lg:bg-white/5 lg:hover:bg-white/15 lg:hover:border-white/35 lg:focus:ring-white/30"
                    aria-label="Explore Noah Lynch's music catalog"
                  >
                    Explore Music
                  </Link>
                </div>

                {/* Social Icons - Mobile only, directly under Listen Now */}
                <div className="flex gap-3 lg:hidden">
                  <Link
                    href={SOCIAL_LINKS.INSTAGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Noah Lynch on Instagram"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700/40 bg-zinc-900/80 backdrop-blur-sm text-white transition-all duration-300 hover:bg-zinc-800/90 hover:border-zinc-600/50 focus:outline-none focus:ring-2 focus:ring-zinc-500/40"
                  >
                    <FaInstagram className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href={SOCIAL_LINKS.FACEBOOK}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Noah Lynch on Facebook"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700/40 bg-zinc-900/80 backdrop-blur-sm text-white transition-all duration-300 hover:bg-zinc-800/90 hover:border-zinc-600/50 focus:outline-none focus:ring-2 focus:ring-zinc-500/40"
                  >
                    <FaFacebookF className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href={SOCIAL_LINKS.TIKTOK}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Noah Lynch on TikTok"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700/40 bg-zinc-900/80 backdrop-blur-sm text-white transition-all duration-300 hover:bg-zinc-800/90 hover:border-zinc-600/50 focus:outline-none focus:ring-2 focus:ring-zinc-500/40"
                  >
                    <FaTiktok className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href={SOCIAL_LINKS.YOUTUBE}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Subscribe to Noah Lynch on YouTube"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700/40 bg-zinc-900/80 backdrop-blur-sm text-white transition-all duration-300 hover:bg-zinc-800/90 hover:border-zinc-600/50 focus:outline-none focus:ring-2 focus:ring-zinc-500/40"
                  >
                    <FaYoutube className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 sm:hidden"
          initial={{ opacity: 0 }}
          animate={{
            opacity: loaded ? 1 : 0,
          }}
          transition={animationVariants.fadeIn}
        >
          <ChevronDown className="h-7 w-7 text-zinc-300" aria-hidden="true" />
        </motion.div>

        <PastShowsModal
          isOpen={showPastShows}
          onClose={() => setShowPreviousShows(false)}
          pastShows={pastShows}
        />
      </section>
    </ErrorBoundary>
  );
}
