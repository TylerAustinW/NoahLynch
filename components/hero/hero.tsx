"use client";

import { Button } from "@/components/ui/button";
import ErrorBoundary from "@/components/ui/error-boundary";
import PastShowsModal from "./past-shows-modal";
import ShowBadge from "./show-badge";
import { useInView } from "@/lib/hooks/use-in-view";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { useScrollLock } from "@/lib/hooks/use-scroll-lock";
import { getPastShows } from "@/lib/data/tour";
import { SOCIAL_LINKS, SOCIAL_LINK_DATA } from "@/lib/config/constants";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF, FaTiktok, FaYoutube } from "react-icons/fa6";
import type { IconType } from "react-icons";

const platformIcons: Record<string, IconType> = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  tiktok: FaTiktok,
  youtube: FaYoutube,
};

export default function HeroSection(): React.ReactElement {
  const { ref } = useInView({ threshold: 0.1 });
  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const reducedMotion = useReducedMotion();
  const [showPastShows, setShowPreviousShows] = useState(false);
  const pastShows = getPastShows();

  // Use the new scroll lock hook
  useScrollLock(showPastShows);

  useEffect(() => {
    setLoaded(true);
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
          <h1 className="font-patrick mb-4 text-5xl font-bold md:text-7xl">
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
        className="relative flex min-h-screen items-center overflow-hidden bg-zinc-950 pt-16 pb-0"
      >
        <div className="absolute top-0 h-full w-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover md:hidden"
          >
            <source src="/0416.mov" type="video/mp4" />
          </video>
          <Image
            quality={100}
            src="/20260410-DSC00265.jpg"
            alt="Noah Lynch"
            fill
            sizes="(min-width: 768px) 100vw, 0px"
            className="hidden object-cover md:block"
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
                    className="flex min-h-[32px] items-center justify-center rounded-full border border-zinc-700/40 bg-zinc-900/80 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-zinc-600/50 hover:bg-zinc-800/90 focus:ring-2 focus:ring-zinc-500/40 focus:ring-offset-2 focus:ring-offset-transparent focus:outline-none sm:min-h-[36px] sm:px-4 sm:py-2 lg:border-white/20 lg:bg-white/5 lg:hover:border-white/35 lg:hover:bg-white/15 lg:focus:ring-white/30"
                    aria-label="Explore Noah Lynch's music catalog"
                  >
                    Explore Music
                  </Link>
                </div>

                {/* Social Icons - Mobile only, directly under Listen Now */}
                <div className="flex gap-3 lg:hidden">
                  {SOCIAL_LINK_DATA.map((social) => {
                    const Icon = platformIcons[social.platform] || FaInstagram;
                    return (
                      <Link
                        key={social.platform}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700/40 bg-zinc-900/80 text-white backdrop-blur-sm transition-all duration-300 hover:border-zinc-600/50 hover:bg-zinc-800/90 focus:ring-2 focus:ring-zinc-500/40 focus:outline-none"
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    );
                  })}
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
