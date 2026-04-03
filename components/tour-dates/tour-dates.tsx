"use client";

import {
  formatTourDate,
  formatTourTimeRange,
  isShowTodayLocal,
  type TourDate,
} from "@/lib/data/tour";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Image from "next/image";

interface TourDatesSectionProps {
  upcoming: TourDate[];
  past: TourDate[];
}

export default function TourDatesSection({ upcoming, past }: TourDatesSectionProps) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 z-0">
        <Image
          src="/portraits/noah-lynch-portrait-guitar.jpeg"
          alt="Noah Lynch with guitar"
          fill
          className="object-cover opacity-40 blur-sm sm:object-[40%_30%] md:object-[45%_25%] lg:object-[20%_20%]"
          sizes="100vw"
          priority
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/85 via-zinc-950/70 to-zinc-950/90" />
      </div>

      <div className="relative z-20">
        <Navbar />
      </div>

      <div className="relative z-10 w-full pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 py-8 text-center sm:py-10 md:py-16"
        >
          <h1 className="mb-2 text-4xl font-bold text-zinc-200 sm:mb-4 sm:text-5xl md:text-6xl">
            TOUR DATES
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-zinc-400 sm:text-base">
            All event times are shown in each venue&apos;s local timezone.
          </p>
        </motion.div>

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-12">
          {upcoming.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-lg text-zinc-300">MORE SHOWS COMING SOON</p>
            </div>
          )}
          {upcoming.map((show, index) => {
            const timeLabel = formatTourTimeRange(show);
            const isToday = isShowTodayLocal(show);

            return (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.2 }}
                className="border-b border-zinc-700/40 last:border-b-0"
              >
                <div className="w-full py-6 sm:py-5 md:py-6">
                  <div className="flex flex-col items-center space-y-3 text-center sm:hidden">
                    <div className="mb-1">
                      <span className="text-lg font-medium" style={{ letterSpacing: "0.05em" }}>
                        {formatTourDate(show.date)}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-base font-bold tracking-wide text-white uppercase">
                        {show.venue}
                      </div>
                      <div className="text-sm tracking-wide text-zinc-300 uppercase">
                        {show.city}
                        {show.state ? `, ${show.state}` : ""}
                      </div>
                      <div className="text-sm tracking-wide text-amber-300 uppercase">
                        {timeLabel ?? "TIME TBA"}
                      </div>
                    </div>

                    <div className="flex w-full justify-center pt-2">
                      {show.actionLink ? (
                        <a
                          href={show.actionLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block w-full border border-zinc-500 px-6 py-3 text-center text-sm font-medium tracking-wider text-zinc-300 uppercase transition-all duration-300 hover:border-amber-500 hover:text-amber-400 active:bg-amber-500/10"
                        >
                          {show.actionText || "Tickets"}
                        </a>
                      ) : (
                        <button
                          disabled
                          className="inline-block w-full cursor-not-allowed border border-zinc-600 px-6 py-3 text-center text-sm font-medium tracking-wider text-zinc-600 uppercase"
                        >
                          {isToday ? "Show Is Today" : "Free Entry"}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="hidden grid-cols-1 items-center gap-4 sm:grid md:grid-cols-12 md:gap-6">
                    <div className="text-left md:col-span-3">
                      <span className="text-lg font-medium" style={{ letterSpacing: "0.05em" }}>
                        {formatTourDate(show.date)}
                      </span>
                    </div>

                    <div className="text-left md:col-span-3">
                      <div className="text-sm font-bold tracking-wide text-white uppercase md:text-base">
                        {show.venue}
                      </div>
                    </div>

                    <div className="text-left md:col-span-2">
                      <div className="text-sm tracking-wide text-zinc-300 uppercase md:text-base">
                        {show.city}
                        {show.state ? `, ${show.state}` : ""}
                      </div>
                    </div>

                    <div className="text-left md:col-span-2 md:text-center">
                      <div className="text-xs font-medium tracking-wide text-amber-300 uppercase md:text-sm">
                        {timeLabel ?? "Time TBA"}
                      </div>
                    </div>

                    <div className="flex justify-start md:col-span-2 md:justify-end">
                      {show.actionLink ? (
                        <a
                          href={show.actionLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block border border-zinc-500 px-6 py-2 text-xs font-medium tracking-wider text-zinc-300 uppercase transition-all duration-300 hover:border-amber-500 hover:text-amber-400 md:text-sm"
                        >
                          {show.actionText || "Tickets"}
                        </a>
                      ) : (
                        <button
                          disabled
                          className="inline-block cursor-not-allowed border border-zinc-600 px-6 py-2 text-xs font-medium tracking-wider text-zinc-600 uppercase md:text-sm"
                        >
                          {isToday ? "Show Is Today" : "Free Entry"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {past.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="mx-auto mt-16 w-full max-w-6xl px-4 sm:px-6 md:mt-20 md:px-12"
          >
            <div className="py-8 text-center md:py-12">
              <h3 className="mb-8 text-base font-bold tracking-wider text-zinc-500 uppercase sm:text-lg md:text-xl">
                PAST SHOWS
              </h3>
            </div>

            <div className="w-full">
              {past.map((show) => (
                <div key={show.id} className="border-b border-zinc-700/20 last:border-b-0">
                  <div className="w-full py-4 sm:py-3 md:py-4">
                    <div className="flex flex-col space-y-2 sm:hidden">
                      <div className="mb-1">
                        <span className="text-lg font-medium" style={{ letterSpacing: "0.05em" }}>
                          {formatTourDate(show.date)}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="text-sm font-semibold tracking-wide text-zinc-200 uppercase">
                          {show.venue}
                        </div>
                        <div className="text-xs tracking-wide text-zinc-300 uppercase">
                          {show.city}
                          {show.state ? `, ${show.state}` : ""}
                        </div>
                      </div>
                    </div>

                    <div className="hidden grid-cols-1 items-center gap-4 sm:grid md:grid-cols-10 md:gap-6">
                      <div className="text-left md:col-span-4">
                        <span className="text-lg font-medium" style={{ letterSpacing: "0.05em" }}>
                          {formatTourDate(show.date)}
                        </span>
                      </div>

                      <div className="text-left md:col-span-4">
                        <div className="text-sm font-bold tracking-wide text-white uppercase md:text-base">
                          {show.venue}
                        </div>
                      </div>

                      <div className="text-left md:col-span-2 md:text-right">
                        <div className="text-sm tracking-wide text-zinc-300 uppercase md:text-base">
                          {show.city}
                          {show.state ? `, ${show.state}` : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
