"use client";

import { useInView } from "@/lib/hooks/use-in-view";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Music, ExternalLink, Award } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

const PORTRAIT_IMAGE = {
  src: "/venues/backwater-grill/IMG_6718.jpg",
  alt: "Noah Lynch - The Artist",
};

export default function BiographySection() {
  const { ref, inView } = useInView({ threshold: 0.1, once: true });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      id="biography"
      ref={ref}
      className="relative overflow-hidden bg-zinc-950 px-4 py-16 sm:py-20 md:px-6 md:py-24 lg:py-28"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/venues/the-roof/NoahAtTheRoofGuitars.jpg"
          alt="Noah Lynch performing at The Roof"
          fill
          className="object-cover opacity-30"
          sizes="100vw"
          priority={false}
          quality={40}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/90 to-zinc-950" />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-white/3 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/5 h-72 w-72 rounded-full bg-white/2 blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="mb-12 text-center md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-4 text-4xl font-bold text-zinc-200 md:text-5xl lg:text-6xl">
            The Story
          </h2>
          <p className="font-patrick mb-6 text-xl text-zinc-300 md:text-2xl">
            "Music isn't just what I do, it's who I am"
          </p>
          <div className="flex justify-center">
            <span className="inline-flex items-center rounded-lg border border-amber-500/30 bg-amber-500/20 px-4 py-2 font-semibold text-amber-300">
              <Award className="h-4 w-4" />
              2025 Best Local Solo Artist Winner
            </span>
          </div>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="max-w-none space-y-6 text-lg leading-relaxed text-white md:max-w-[65ch] md:text-xl">
              <p>
                <span className="text-xl font-bold text-amber-400 md:text-2xl">Noah Lynch</span> is
                an acoustic pop singer-songwriter who takes inspiration from{" "}
                <span className="font-semibold text-amber-400">John Mayer</span>, blending heartfelt
                storytelling with smooth, soulful melodies. Coming from a small town where pursuing
                music isn't the obvious path, Noah has carved his own journey, proving that passion
                and persistence can break through any limitation.
              </p>

              <motion.div
                initial={false}
                animate={{
                  height: isMounted && isMobile && !isExpanded ? 0 : "auto",
                  opacity: isMounted && isMobile && !isExpanded ? 0 : 1,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <p>
                  His{" "}
                  <Link
                    href="/music/for-you"
                    className="group/link relative inline-flex items-center gap-1 font-semibold text-amber-400 transition-colors hover:text-amber-300"
                    title='Listen to "For You"'
                  >
                    <span className="relative inline">
                      debut single
                      <svg
                        className="pointer-events-none absolute left-0 w-full"
                        style={{ bottom: "-1px", height: "6px" }}
                        viewBox="0 0 100 6"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M1 4.5C10 1 15 5 25 2C35 -1 40 5 50 3C60 1 65 5 75 2C85 -1 90 5 99 3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-amber-400/60"
                        />
                      </svg>
                    </span>
                    <ExternalLink className="h-3 w-3 opacity-60 md:hidden" />
                    <span className="pointer-events-none absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded-md border border-zinc-700/50 bg-zinc-900/95 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover/link:opacity-100 md:block">
                      Listen to "For You" →
                    </span>
                  </Link>{" "}
                  quickly gained traction, hitting{" "}
                  <span className="font-semibold text-amber-400">50,000 streams</span> and earning
                  airplay on the UK's Crags Radio, signaling the start of a promising career. With{" "}
                  <Link
                    href="/music/honest"
                    className="group/link relative inline-flex items-center gap-1 font-semibold text-amber-400 transition-colors hover:text-amber-300"
                    title='Listen to "Honest"'
                  >
                    <span className="relative inline">
                      honest
                      <svg
                        className="pointer-events-none absolute left-0 w-full"
                        style={{ bottom: "-1px", height: "6px" }}
                        viewBox="0 0 100 6"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M1 4.5C10 1 15 5 25 2C35 -1 40 5 50 3C60 1 65 5 75 2C85 -1 90 5 99 3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-amber-400/60"
                        />
                      </svg>
                    </span>
                    <ExternalLink className="h-3 w-3 opacity-60 md:hidden" />
                    <span className="pointer-events-none absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded-md border border-zinc-700/50 bg-zinc-900/95 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover/link:opacity-100 md:block">
                      Listen to "Honest" →
                    </span>
                  </Link>{" "}
                  lyrics and engaging performances, Noah connects deeply with audiences, turning
                  everyday experiences into songs that resonate long after the music stops.
                </p>
              </motion.div>

              {isMounted && isMobile && (
                <motion.button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="group inline-flex items-center gap-2 rounded-lg px-2 py-1 text-zinc-300 transition-colors hover:text-white focus:ring-2 focus:ring-zinc-400/50 focus:outline-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-base font-medium">
                    {isExpanded ? "Read Less" : "Read More"}
                  </span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </motion.button>
              )}
            </div>

            <motion.div
              className="pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link
                href={"#music"}
                className="group inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-7 py-4 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20 focus:ring-2 focus:ring-amber-400/50 focus:outline-none"
              >
                <Music className="h-5 w-5" />
                Explore The Music
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </motion.svg>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-zinc-800/50 shadow-2xl">
              <div className="relative aspect-[4/5] md:aspect-[3/4]">
                <Image
                  src={PORTRAIT_IMAGE.src}
                  alt={PORTRAIT_IMAGE.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  quality={75}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
