"use client";

import { useInView } from "@/hooks/use-in-view";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Ticket } from "lucide-react";
import Link from "next/link";
import React from "react";
import { tourDates, TourDate } from "@/data/tour-dates";

export default function TourSection(): React.ReactElement {
  const { ref, inView } = useInView({ threshold: 0.1, once: true });
  const hasDates = tourDates.length > 0;

  return (
    <section
      id="tour"
      ref={ref}
      className="relative overflow-hidden px-6 pt-8 pb-16 md:px-8 bg-black/90"
    >
      <div className="pointer-events-none absolute inset-0 bg-[url('/texture.png')] bg-repeat opacity-5" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <h1 className="mb-10 text-center text-4xl font-bold text-white">
          Tour Dates
        </h1>

        {hasDates ? (
          <div className="space-y-8">
            {tourDates.map((tour: TourDate) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="rounded-xl border border-zinc-800/60 bg-zinc-900/60 p-6 shadow-lg"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-lg font-medium text-amber-200">
                      <MapPin className="h-4 w-4" />
                      {tour.venue}
                    </p>
                    <p className="text-zinc-400 text-sm leading-tight">
                      {tour.address}, {tour.city}, {tour.state} {tour.zipCode}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2 text-zinc-300">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {tour.date}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {tour.time}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <Link
                      className="inline-flex items-center gap-2 rounded-full border border-amber-500/60 bg-amber-500/10 px-6 py-2 text-sm font-medium text-amber-200 transition-colors hover:bg-amber-500/20"
                      href={tour.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Ticket className="h-4 w-4" />
                      Tickets
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mt-6 text-center"
          >
            <h2 className="inline-block rounded-full border border-zinc-700/60 bg-zinc-900/70 px-8 py-4 text-lg font-medium text-amber-200">
              More Shows Coming Soon!
            </h2>
          </motion.div>
        )}
      </div>
    </section>
  );
}
