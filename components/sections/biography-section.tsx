"use client";

import { useInView } from "@/hooks/use-in-view";
import Image from "next/image";

export default function BiographySection() {
  const { ref, inView } = useInView({ threshold: 0.1, once: true });
  return (
    <section
      id="biography"
      ref={ref}
      className="relative overflow-hidden px-6 py-24 md:px-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-[url('/texture.png')] bg-repeat opacity-5"></div>

      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-full overflow-hidden opacity-5">
        <div className="absolute -right-[10%] -top-[30%] h-[60%] w-[60%] rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="bg-red/5 absolute -bottom-[30%] -left-[10%] h-[60%] w-[60%] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl">
        <h2 className="mb-8 text-3xl font-bold text-white md:text-5xl">
          Biography
        </h2>

        <div className="grid items-center gap-12 md:grid-cols-2">
          <div
            className={`space-y-6 transition-all duration-700 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <p className="text-lg leading-relaxed text-zinc-300">
              Introducing Noah Lynch, a Mississippi-born musician whose journey
              with music began at the age of 6 when he first picked up a guitar.
              From those early days, Noah&apos;s passion for music has only
              grown stronger, fueling his desire to share his artistry with the
              world.
            </p>

            <p className="text-lg leading-relaxed text-zinc-300">
              Drawing inspiration from legends like John Mayer and Stevie Ray
              Vaughan, Noah&apos;s music blends the soulful melodies of blues
              with the infectious energy of neo-rock. His sound is a reflection
              of his upbringing in a small town nestled in Mississippi, where
              music isn&apos;t the typical claim to fame.
            </p>

            <p className="text-lg leading-relaxed text-zinc-300">
              Noah&apos;s upbringing was marked by the serenade of his guitar
              strings and the melodies that echoed through his soul. His
              authentic approach to songwriting captures the essence of human
              emotion, creating connections with listeners around the world.
            </p>

            <div className="pt-4">
              <a
                href="#music"
                className="group inline-flex items-center border-b border-transparent font-medium text-amber-200/90 transition-all hover:border-amber-500/30"
              >
                Explore Noah&apos;s Music
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div
            className={`transition-all delay-300 duration-700 ${
              inView ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
          >
            <div className="relative">
              <div className="absolute -inset-4 rotate-3 transform border border-zinc-800/80 opacity-70"></div>
              <div className="relative overflow-hidden rounded shadow-xl shadow-black/50">
                <Image
                  src="/noah-portrait.jpeg"
                  alt="Noah Lynch portrait"
                  width={600}
                  height={600}
                  className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
              </div>
              <div className="absolute -inset-4 z-[-1] -rotate-2 transform border border-zinc-800/80 opacity-70"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
