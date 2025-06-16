"use client";

import ErrorBoundary from "@/components/ui/error-boundary";
import { useInView } from "@/hooks/use-in-view";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronDown,
  Heart,
  MapPin,
  Music,
  Timer,
} from "lucide-react";
import { Patrick_Hand } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { heroContent } from "@/lib/content/hero";

const patrickHand = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});

// Function to calculate days until the event
const calculateDaysUntil = (targetDate: string) => {
  const target = new Date(targetDate);
  const today = new Date();
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

// Determine the animation intensity based on how close we are to the event
const getAnimationSettings = (days: number) => {
  if (days <= 0) {
    return {
      scale: [1, 1.25, 1],
      color: ["rgb(251, 191, 36)", "rgb(255, 255, 255)", "rgb(251, 191, 36)"],
      duration: 0.3,
    } as const;
  }
  if (days <= 7) {
    return {
      scale: [1, 1.2, 1],
      color: ["rgb(251, 191, 36)", "rgb(255, 255, 255)", "rgb(251, 191, 36)"],
      duration: 0.6,
    } as const;
  }
  if (days <= 14) {
    return {
      scale: [1, 1.15, 1],
      color: ["rgb(251, 191, 36)", "rgb(255, 255, 255)", "rgb(251, 191, 36)"],
      duration: 1,
    } as const;
  }
  if (days <= 30) {
    return {
      scale: [1, 1.1, 1],
      color: ["rgb(251, 191, 36)", "rgb(255, 255, 255)", "rgb(251, 191, 36)"],
      duration: 1.5,
    } as const;
  }
  return {
    scale: [1, 1.05, 1],
    color: ["rgb(255, 255, 255)", "rgb(251, 191, 36)", "rgb(255, 255, 255)"],
    duration: 2,
  } as const;
};

export default function HeroSection(): React.ReactElement {
  const { ref } = useInView({ threshold: 0.1 });
  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [daysUntil, setDaysUntil] = useState(0);

  const animationSettings = getAnimationSettings(daysUntil);

  // TODO: Replace with dynamic next show data once Songkick/Bandsintown is wired
  const eventDate = "Jun 14, 2025";
  const eventTime = "7:00 PM CDT";
  const eventVenue = "Magnolia Blues BBQ Company";
  const eventLocation = "Brookhaven, MS";

  useEffect(() => {
    setLoaded(true);
    setDaysUntil(calculateDaysUntil(eventDate));

    // Update countdown every day
    const interval = setInterval(() => {
      setDaysUntil(calculateDaysUntil(eventDate));
    }, 86400000);

    return () => clearInterval(interval);
  }, [eventDate]);

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
        <div className="absolute inset-0 h-full w-full">
          {/* Optional high-resolution video background for larger screens */}
          {heroContent.backgroundVideo ? (
            <video
              className="hidden h-full w-full object-cover md:block"
              autoPlay
              muted
              loop
              playsInline
              poster={heroContent.backgroundImage}
            >
              <source src={heroContent.backgroundVideo} type="video/mp4" />
            </video>
          ) : null}

          {/* Image fallback / mobile background */}
          <Image
            src={heroContent.backgroundImage}
            alt={`${heroContent.title} cover art`}
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
        <div className="relative z-10 container mx-auto px-6 md:px-12">
          <div
            className={`max-w-xl transition-all duration-1000 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="mb-4 text-5xl font-bold uppercase text-white drop-shadow-md">
              {heroContent.title}
              <br />
              <span className="mb-4 text-5xl font-bold uppercase text-amber-200/90 drop-shadow-md md:text-7xl">
                {heroContent.highlight}
                <br />
              </span>
            </h1>

            {/* Upcoming show card (static for now) */}
            <div className="relative mt-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="overflow-hidden rounded-xl border border-amber-500/30 bg-black/60 backdrop-blur-sm"
              >
                <div className="p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-amber-300" aria-hidden="true" />
                    <h3 className="text-lg font-bold uppercase text-amber-300">
                      Live Show Coming Soon
                    </h3>
                  </div>

                  <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-1 h-5 w-5 text-amber-200/70" aria-hidden="true" />
                      <div>
                        <div className="text-sm text-zinc-400">Date & Time</div>
                        <div className="font-medium text-white">{eventDate}</div>
                        <div className="font-medium text-white">{eventTime}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-5 w-5 text-amber-200/70" aria-hidden="true" />
                      <div>
                        <div className="text-sm text-zinc-400">Venue</div>
                        <div className="font-medium text-white">{eventVenue}</div>
                        <div className="font-medium text-white">{eventLocation}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Timer className="mt-1 h-5 w-5 text-amber-200/70" aria-hidden="true" />
                      <div>
                        <div className="text-sm text-zinc-400">Countdown</div>
                        <motion.div
                          className="font-bold text-white"
                          initial={{ scale: 1 }}
                          animate={{
                            scale: animationSettings.scale,
                            color: animationSettings.color,
                          }}
                          transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: animationSettings.duration,
                            ease: "easeInOut",
                          }}
                        >
                          <span className="text-xl">
                            {daysUntil === 0 ? "Today!" : daysUntil}
                          </span>
                          {daysUntil > 0 && (
                            <span className="ml-1">
                              {daysUntil === 1 ? "Day Left" : "Days Left"}
                            </span>
                          )}
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-4">
                    <a
                      href="https://www.bandsintown.com/e/106676619-noah-lynch-at-magnolia-blues-bbq-company?came_from=281&utm_medium=web&utm_source=artist_page&utm_campaign=event"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border-2 border-amber-500/80 bg-amber-500/20 px-6 py-3 font-medium text-amber-100 transition-all duration-300 hover:border-amber-400/90 hover:bg-amber-500/30"
                      aria-label="Get tickets for Noah Lynch at Magnolia Blues BBQ Company on June 14, 2025"
                    >
                      <Music className="h-4 w-4" aria-hidden="true" />
                      Get Tickets Now
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Dynamic CTA buttons driven by content */}
            <div className="mt-4 flex flex-col gap-4">
              {[heroContent.ctas.slice(0, 2), heroContent.ctas.slice(2)].map(
                (group, idx) => (
                  <div key={idx} className="flex flex-wrap gap-4">
                    {group.map((cta) => {
                      const variantClasses =
                        cta.variant === "primary"
                          ? "border-amber-500/60 bg-amber-500/20 text-amber-100 hover:border-amber-400/70 hover:bg-amber-500/30"
                          : cta.variant === "secondary"
                          ? "border-sky-500/60 bg-sky-500/20 text-sky-100 hover:border-sky-400/70 hover:bg-sky-500/30"
                          : "border-zinc-700/40 bg-zinc-900/50 text-white hover:border-zinc-600/60 hover:bg-zinc-800/60";
                      return (
                        <a
                          key={cta.label}
                          href={cta.href}
                          className={`rounded-full px-6 py-3 font-medium transition-all duration-300 ${variantClasses}`}
                          aria-label={cta.label}
                        >
                          {cta.label}
                        </a>
                      );
                    })}
                  </div>
                )
              )}
            </div>
            <div className="mt-6 flex gap-6 ">
              {heroContent.socialLinks.map((link) => {
                const Icon =
                  link.platform === "instagram"
                    ? FaInstagram
                    : link.platform === "facebook"
                    ? FaFacebookF
                    : link.platform === "tiktok"
                    ? FaTiktok
                    : FaYoutube;
                return (
                  <a
                    key={link.platform}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow Noah Lynch on ${link.platform}`}
                    className="text-zinc-400 transition-colors hover:text-amber-500"
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 sm:hidden"
          initial={{ opacity: 0 }}
          animate={{
            opacity: loaded ? 1 : 0,
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
            <span className="mb-1 text-xs font-medium text-zinc-300">Scroll</span>
            <ChevronDown className="h-6 w-6 text-zinc-300" aria-hidden="true" />
          </div>
        </motion.div>

        <div className="absolute bottom-12 right-4 z-10 hidden max-w-xs p-2 text-right md:block">
          <p className={`${patrickHand.className} text-md leading-tight text-zinc-50/100`}>
            “{heroContent.quote}
            <br />-{" "}
            <Heart className="inline-block h-6 w-6 text-zinc-200" aria-hidden="true" />
            Noah”
          </p>
        </div>
      </section>
    </ErrorBoundary>
  );
}
