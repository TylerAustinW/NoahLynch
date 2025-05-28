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

export default function HeroSection(): React.ReactElement {
  const { ref } = useInView({ threshold: 0.1 });
  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [daysUntil, setDaysUntil] = useState(0);

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
        id="tour"
        className="relative flex min-h-screen items-center overflow-hidden pt-16 pb-0"
      >
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
        <div className="relative z-10 container mx-auto px-6 md:px-12">
          <div
            className={`max-w-xl transition-all duration-1000 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="mb-4 text-5xl font-bold uppercase text-white drop-shadow-md">
              Honest
              <br />
              <span className="mb-4 text-5xl font-bold uppercase text-amber-200/90 drop-shadow-md md:text-7xl">
                Out Now
                <br />
              </span>
            </h1>

            {/* Tour Date CTA - New Addition */}
            <div className="mt-6 mb-8 relative">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="overflow-hidden rounded-xl border border-amber-500/30 bg-black/60 backdrop-blur-sm"
              >
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar
                      className="h-5 w-5 text-amber-300"
                      aria-hidden="true"
                    />
                    <h3 className="text-lg font-bold uppercase text-amber-300">
                      Live Show Coming Soon
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <Calendar
                        className="h-5 w-5 text-amber-200/70 mt-1"
                        aria-hidden="true"
                      />
                      <div>
                        <div className="text-sm text-zinc-400">Date & Time</div>
                        <div className="text-white font-medium">
                          {eventDate}
                        </div>
                        <div className="text-white font-medium">
                          {eventTime}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin
                        className="h-5 w-5 text-amber-200/70 mt-1"
                        aria-hidden="true"
                      />
                      <div>
                        <div className="text-sm text-zinc-400">Venue</div>
                        <div className="text-white font-medium">
                          {eventVenue}
                        </div>
                        <div className="text-white font-medium">
                          {eventLocation}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Timer
                        className="h-5 w-5 text-amber-200/70 mt-1"
                        aria-hidden="true"
                      />
                      <div>
                        <div className="text-sm text-zinc-400">Countdown</div>
                        <motion.div
                          className="text-white font-bold"
                          initial={{ scale: 1 }}
                          animate={{
                            scale: [1, 1.05, 1],
                            color: [
                              "rgb(255, 255, 255)",
                              "rgb(251, 191, 36)",
                              "rgb(255, 255, 255)",
                            ],
                          }}
                          transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 2,
                            ease: "easeInOut",
                          }}
                        >
                          <span className="text-xl">{daysUntil}</span> Days Left
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-5">
                    <a
                      href="https://www.bandsintown.com/e/106676619-noah-lynch-at-magnolia-blues-bbq-company?came_from=281&utm_medium=web&utm_source=artist_page&utm_campaign=event"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border-2 border-amber-500/80 bg-amber-500/20 px-6 py-3 font-medium text-amber-100 transition-all duration-300 hover:border-amber-400/90 hover:bg-amber-500/30 flex items-center gap-2"
                      aria-label="Get tickets for Noah Lynch at Magnolia Blues BBQ Company on June 14, 2025"
                    >
                      <Music className="h-4 w-4" aria-hidden="true" />
                      Get Tickets Now
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mt-4 flex flex-col gap-4">
              <div className="flex flex-wrap gap-4">
                <a
                  href="/music/honest"
                  className="rounded-full border border-amber-500/60 bg-amber-500/20 px-6 py-3 font-medium text-amber-100 transition-all duration-300 hover:border-amber-400/70 hover:bg-amber-500/30"
                  aria-label="Listen to the latest album Honest"
                >
                  Listen Now
                </a>
                <a
                  href="mailto:NoahLynchContact@gmail.com"
                  className="rounded-full border border-sky-500/60 bg-sky-500/20 px-6 py-3 font-medium text-sky-100 transition-all duration-300 hover:border-sky-400/70 hover:bg-sky-500/30"
                  aria-label="Contact Noah Lynch via email"
                >
                  Contact
                </a>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#music"
                  className="rounded-full border border-zinc-700/40 bg-zinc-900/50 px-6 py-3 font-medium text-white transition-all duration-300 hover:border-zinc-600/60 hover:bg-zinc-800/60"
                  aria-label="Explore Noah Lynch's music catalog"
                >
                  Explore Music
                </a>
                <a
                  href="/merch"
                  className="rounded-full border border-zinc-700/40 bg-zinc-900/50 px-6 py-3 font-medium text-white transition-all duration-300 hover:border-zinc-600/60 hover:bg-zinc-800/60"
                  aria-label="Browse merchandise"
                >
                  Explore Merch
                </a>
              </div>
            </div>
            <div className="mt-6 flex gap-6 ">
              <a
                href="https://instagram.com/noahlynchmusic"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Noah Lynch on Instagram"
                className="text-zinc-400 transition-colors hover:text-pink-500"
              >
                <FaInstagram className="h-6 w-6" aria-hidden="true" />
              </a>
              <a
                href="https://facebook.com/noahlynchmusic"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Noah Lynch on Facebook"
                className="text-zinc-400 transition-colors hover:text-blue-500"
              >
                <FaFacebookF className="h-6 w-6" aria-hidden="true" />
              </a>
              <a
                href="https://tiktok.com/@noahlynchmusic"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Noah Lynch on Tiktok"
                className="text-zinc-400 transition-colors hover:text-red-500"
              >
                <FaTiktok className="h-6 w-6" aria-hidden="true" />
              </a>
              <a
                href="https://youtube.com/@noahlynch"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe to Noah Lynch on YouTube"
                className="text-zinc-400 transition-colors hover:text-red-500"
              >
                <FaYoutube className="h-6 w-6" aria-hidden="true" />
              </a>
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
            <span className="mb-1 text-xs font-medium text-zinc-300">
              Scroll
            </span>
            <ChevronDown className="h-6 w-6 text-zinc-300" aria-hidden="true" />
          </div>
        </motion.div>

        <div className="absolute bottom-12 right-4 z-10 p-2 max-w-xs text-right hidden md:block">
          <p
            className={`${patrickHand.className} text-md text-zinc-50/100 leading-tight `}
          >
            "I hope this record means as much to you as it does to me, thank you
            for the endless support
            <br />-{" "}
            <Heart
              className="h-6 w-6 text-zinc-200 inline-block"
              aria-hidden="true"
            />
            Noah"
          </p>
        </div>
      </section>
    </ErrorBoundary>
  );
}
