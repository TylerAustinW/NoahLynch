"use client";

import { Button } from "@/components/ui/button";
import ErrorBoundary from "@/components/ui/error-boundary";
import { SOCIAL_LINKS, SOCIALS } from "@/lib/config";
import { getPast } from "@/lib/data/tour";
import { useInView } from "@/lib/hooks/use-in-view";
import { useScrollLock } from "@/lib/hooks/use-scroll-lock";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF, FaTiktok, FaYoutube } from "react-icons/fa6";
import PastShowsModal from "./past-shows-modal";
import ShowBadge from "./show-badge";

const platformIcons: Record<string, IconType> = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  tiktok: FaTiktok,
  youtube: FaYoutube,
};

export default function HeroSection(): React.ReactElement {
  const { ref } = useInView({ threshold: 0.1 });
  const [imageError, setImageError] = useState(false);
  const [showPastShows, setShowPreviousShows] = useState(false);
  const pastShows = getPast();

  useScrollLock(showPastShows);

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

  return (
    <ErrorBoundary>
      <section
        ref={ref}
        id="hero"
        className="relative flex min-h-screen items-center overflow-hidden bg-zinc-950 pt-12 pb-0 md:min-h-screen md:pt-16"
      >
        <div className="absolute top-0 h-full w-full">
          <Image
            quality={90}
            src="/homepage/IMG_2055_VSCO-1.jpg"
            alt="Noah Lynch"
            fill
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              objectPosition: "center 60%",
            }}
            onError={() => setImageError(true)}
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/10 to-black/30" />
          <div className="pointer-events-none absolute inset-0 bg-[url('/overlays/grain-texture-overlay.png')] bg-repeat opacity-[0.01] md:opacity-[0.03]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="max-w-xl">
            <div className="mt-64">
              <div className="relative z-20 mb-4 sm:mb-6">
                <div className="w-full max-w-fit">
                  <ShowBadge />
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-3">
                    <Button
                      asChild
                      variant="primary"
                      size="default"
                      className="h-12 w-full px-6 text-base sm:h-12 sm:w-auto sm:px-8 sm:text-base"
                    >
                      <Link
                        href="/music/chasing-a-feelin"
                        aria-label="Listen to the latest single Chasing A Feelin'"
                      >
                        Listen Now
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="secondary"
                      size="default"
                      className="h-12 w-full px-6 text-base sm:h-12 sm:w-auto sm:px-8 sm:text-base"
                    >
                      <Link
                        href={`mailto:${SOCIALS.email}`}
                        aria-label="Contact Noah Lynch via email"
                      >
                        Contact
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="secondary"
                      size="default"
                      className="h-12 w-full rounded-full px-6 text-base sm:h-12 sm:w-auto sm:px-8 sm:text-base"
                    >
                      <Link href="#music" aria-label="Explore Noah Lynch's music catalog">
                        Explore Music
                      </Link>
                    </Button>
                  </div>

                  <div className="flex justify-center gap-3 lg:hidden">
                    {SOCIAL_LINKS.map((social) => {
                      const Icon = platformIcons[social.platform] || FaInstagram;
                      return (
                        <Link
                          key={social.platform}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700/30 bg-zinc-900/40 text-white backdrop-blur-sm transition-all duration-300 hover:border-zinc-600/50 hover:bg-zinc-800/60 focus:ring-2 focus:ring-zinc-500/40 focus:outline-none"
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
        </div>
        <PastShowsModal
          isOpen={showPastShows}
          onClose={() => setShowPreviousShows(false)}
          pastShows={pastShows}
        />
      </section>
    </ErrorBoundary>
  );
}
