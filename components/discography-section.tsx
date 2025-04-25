"use client";

import { Button } from "@/components/ui/button";
import { useAudio } from "@/hooks/use-audio";
import { useInView } from "@/hooks/use-in-view";
import { Apple, Disc, AirplayIcon as Spotify, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DiscographySection() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const { playing, toggle } = useAudio("/music-preview.mp3");

  return (
    <section id="music" ref={ref} className="py-24 px-6 md:px-12 bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-amber-400">
          Discography
        </h2>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          <div
            className={`transition-all duration-700 ${
              inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{ flex: "0 0 auto" }}
          >
            <div className="relative group cursor-pointer" onClick={toggle}>
              <Image
                src="/honest-cover.jpeg"
                alt="Honest - Single"
                width={400}
                height={400}
                className="w-full max-w-md h-auto shadow-xl"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-full bg-amber-400 flex items-center justify-center">
                  {playing ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 9v6m4-6v6"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-300 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="max-w-lg">
              <div className="inline-block mb-4 bg-amber-400/20 px-3 py-1 rounded-full">
                <span className="text-amber-400 font-medium">
                  Coming May 2025
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-2">Honest</h3>
              <p className="text-gray-400 mb-6">Single • 2025</p>

              <p className="text-gray-300 mb-8 text-lg">
                "Honest" is Noah Lynch's most personal work to date, exploring
                themes of vulnerability and authenticity. The single showcases
                Noah's growth as both a songwriter and performer, blending
                acoustic elements with subtle electronic textures to create a
                sound that's both familiar and fresh.
              </p>

              <div className="mb-8">
                <h4 className="text-lg font-medium mb-4">Pre-save on</h4>
                <div className="flex space-x-6">
                  <Link
                    href="#"
                    aria-label="Pre-save on Apple Music"
                    className="group"
                  >
                    <Apple className="h-8 w-8 text-white group-hover:text-amber-400 transition-colors" />
                  </Link>
                  <Link
                    href="#"
                    aria-label="Pre-save on Spotify"
                    className="group"
                  >
                    <Spotify className="h-8 w-8 text-white group-hover:text-amber-400 transition-colors" />
                  </Link>
                  <Link
                    href="#"
                    aria-label="Pre-save on YouTube Music"
                    className="group"
                  >
                    <Youtube className="h-8 w-8 text-white group-hover:text-amber-400 transition-colors" />
                  </Link>
                  <Link
                    href="#"
                    aria-label="Pre-save on other platforms"
                    className="group"
                  >
                    <Disc className="h-8 w-8 text-white group-hover:text-amber-400 transition-colors" />
                  </Link>
                </div>
              </div>

              <Button
                variant="outline"
                className="bg-amber-400 text-black hover:bg-amber-500 border-none rounded-none px-6"
              >
                Pre-save Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
