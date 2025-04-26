"use client";

import { useInView } from "@/hooks/use-in-view";
import Image from "next/image";
import Link from "next/link";
export default function DiscographySection() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  return (
    <section
      id="music"
      ref={ref}
      className="py-24 px-6 md:px-12 bg-black/90 relative
                 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0
                 after:h-40 after:bg-gradient-to-t after:from-black after:to-transparent after:pointer-events-none"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-sky-100">
          UPCOMING RELEASES
        </h2>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          <div
            className={`transition-all duration-700 ${
              inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{ flex: "0 0 auto" }}
          >
            <div className="relative ">
              <Image
                src="/honest-cover.jpeg"
                alt="Honest - Single"
                width={400}
                height={400}
                className="w-full max-w-md h-auto shadow-xl"
                draggable={false}
              />
              <div className="absolute inset-0 flex items-center justify-center "></div>
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-300 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="max-w-lg">
              <div className="inline-block mb-4 bg-sky-100/20 px-3 py-1 rounded-full">
                <span className="text-sky-100 font-medium">
                  Coming May 2025
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-2">Honest</h3>
              <p className="text-gray-400 mb-6">Single • 2025</p>

              <p className="text-gray-300 mb-8 text-lg">
                "Honest" is Noah Lynch's most personal work to date, exploring
                themes of vulnerability and authenticity. The single showcases
                Noah's growth as both a songwriter and performer
              </p>

              <div className="flex space-x-6">
                <button className="text-lg font-bold mb-4 bg-sky-100/20 px-3 py-1 rounded-full">
                  <Link href="https://symphony.to/noah-lynch/honest">
                    PRE-SAVE NOW!
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
