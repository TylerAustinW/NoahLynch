"use client";

import {
  formatTourDate,
  formatTourTimeRange,
  isShowTodayLocal,
  type TourDate,
} from "@/lib/data/tour";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar.component";
import Image from "next/image";

interface TourDatesSectionProps {
  upcoming: TourDate[];
  past: TourDate[];
}

export default function TourDatesSection({ upcoming, past }: TourDatesSectionProps) {
  return (
    <section className="min-h-screen bg-zinc-950 w-full relative overflow-hidden">
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
          className="text-center py-8 sm:py-10 md:py-16 px-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-200 mb-2 sm:mb-4">
            TOUR DATES
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
            All event times are shown in each venue&apos;s local timezone.
          </p>
        </motion.div>

        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
          {upcoming.length === 0 && (
            <div className="text-center py-12">
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
                  <div className="flex flex-col sm:hidden space-y-3 items-center text-center">
                    <div className="mb-1">
                      <span className="text-lg font-medium" style={{ letterSpacing: "0.05em" }}>
                        {formatTourDate(show.date)}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-base font-bold text-white uppercase tracking-wide">
                        {show.venue}
                      </div>
                      <div className="text-sm text-zinc-300 uppercase tracking-wide">
                        {show.city}
                        {show.state ? `, ${show.state}` : ""}
                      </div>
                      <div className="text-sm text-amber-300 uppercase tracking-wide">
                        {timeLabel ?? "TIME TBA"}
                      </div>
                    </div>

                    <div className="pt-2 w-full flex justify-center">
                      {show.actionLink ? (
                        <a
                          href={show.actionLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block w-full text-center px-6 py-3 text-sm font-medium uppercase tracking-wider border border-zinc-500 text-zinc-300 hover:border-amber-500 hover:text-amber-400 transition-all duration-300 active:bg-amber-500/10"
                        >
                          {show.actionText || "Tickets"}
                        </a>
                      ) : (
                        <button
                          disabled
                          className="inline-block w-full text-center px-6 py-3 text-sm font-medium uppercase tracking-wider border border-zinc-600 text-zinc-600 cursor-not-allowed"
                        >
                          {isToday ? "Show Is Today" : "Free Entry"}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="hidden sm:grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center">
                    <div className="md:col-span-3 text-left">
                      <span className="text-lg font-medium" style={{ letterSpacing: "0.05em" }}>
                        {formatTourDate(show.date)}
                      </span>
                    </div>

                    <div className="md:col-span-3 text-left">
                      <div className="text-sm md:text-base font-bold text-white uppercase tracking-wide">
                        {show.venue}
                      </div>
                    </div>

                    <div className="md:col-span-2 text-left">
                      <div className="text-sm md:text-base text-zinc-300 uppercase tracking-wide">
                        {show.city}
                        {show.state ? `, ${show.state}` : ""}
                      </div>
                    </div>

                    <div className="md:col-span-2 text-left md:text-center">
                      <div className="text-xs md:text-sm font-medium uppercase tracking-wide text-amber-300">
                        {timeLabel ?? "Time TBA"}
                      </div>
                    </div>

                    <div className="md:col-span-2 flex justify-start md:justify-end">
                      {show.actionLink ? (
                        <a
                          href={show.actionLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-6 py-2 text-xs md:text-sm font-medium uppercase tracking-wider border border-zinc-500 text-zinc-300 hover:border-amber-500 hover:text-amber-400 transition-all duration-300"
                        >
                          {show.actionText || "Tickets"}
                        </a>
                      ) : (
                        <button
                          disabled
                          className="inline-block px-6 py-2 text-xs md:text-sm font-medium uppercase tracking-wider border border-zinc-600 text-zinc-600 cursor-not-allowed"
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
            className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-12 mt-16 md:mt-20"
          >
            <div className="text-center py-8 md:py-12">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-zinc-500 mb-8 uppercase tracking-wider">
                PAST SHOWS
              </h3>
            </div>

            <div className="w-full">
              {past.map((show) => (
                <div key={show.id} className="border-b border-zinc-700/20 last:border-b-0">
                  <div className="w-full py-4 sm:py-3 md:py-4">
                    <div className="flex flex-col sm:hidden space-y-2">
                      <div className="mb-1">
                        <span className="text-lg font-medium" style={{ letterSpacing: "0.05em" }}>
                          {formatTourDate(show.date)}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-zinc-200 uppercase tracking-wide">
                          {show.venue}
                        </div>
                        <div className="text-xs text-zinc-300 uppercase tracking-wide">
                          {show.city}
                          {show.state ? `, ${show.state}` : ""}
                        </div>
                      </div>
                    </div>

                    <div className="hidden sm:grid grid-cols-1 md:grid-cols-10 gap-4 md:gap-6 items-center">
                      <div className="md:col-span-4 text-left">
                        <span className="text-lg font-medium" style={{ letterSpacing: "0.05em" }}>
                          {formatTourDate(show.date)}
                        </span>
                      </div>

                      <div className="md:col-span-4 text-left">
                        <div className="text-sm md:text-base font-bold text-white uppercase tracking-wide">
                          {show.venue}
                        </div>
                      </div>

                      <div className="md:col-span-2 text-left md:text-right">
                        <div className="text-sm md:text-base text-zinc-300 uppercase tracking-wide">
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
