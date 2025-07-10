"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Sparkles, Ticket } from "lucide-react";
import Link from "next/link";
import { tourDatesData } from "@/lib/tour-dates-data";

export default function TourDatesPreview() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get upcoming shows and recent past shows
  const upcomingShows = tourDatesData
    .filter(show => show.upcoming === true)
    .slice(0, 2); // Show max 2 upcoming shows

  const recentPastShows = tourDatesData
    .filter(show => show.upcoming !== true)
    .slice(0, 3 - upcomingShows.length); // Fill remaining slots with past shows

  const showsToDisplay = [...upcomingShows, ...recentPastShows];
  const hasUpcomingShows = upcomingShows.length > 0;

  return (
    <section className="bg-zinc-950 py-20 px-6 md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-wider">
            {hasUpcomingShows ? "TOUR DATES" : "PREVIOUS TOUR DATES"}
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            {hasUpcomingShows
              ? "Don't miss Noah Lynch live in concert"
              : "A glimpse at recent performances across the country"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="grid gap-4 mb-8"
        >
          {showsToDisplay.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-lg backdrop-blur-sm border transition-all duration-300 p-6 ${
                tour.upcoming
                  ? "bg-gradient-to-r from-amber-900/30 to-zinc-900/30 border-amber-700/50 hover:border-amber-600"
                  : "bg-zinc-900/30 border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    {tour.upcoming && (
                      <Sparkles className="w-5 h-5 text-amber-500 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors">
                        {tour.venue}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400 mt-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>
                            {tour.city}, {tour.state}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(tour.date)}</span>
                        </div>
                      </div>
                      {tour.description && (
                        <p className="text-zinc-500 text-sm mt-2">
                          {tour.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {tour.upcoming && tour.ticketLink && (
                  <a
                    href={tour.ticketLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-300 text-sm"
                  >
                    <Ticket className="w-4 h-4" />
                    Get Tickets
                  </a>
                )}
              </div>

              {/* Decorative gradient on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-amber-500/0 to-amber-500/0 transition-all duration-500 pointer-events-none ${
                  tour.upcoming
                    ? "group-hover:from-amber-500/10 group-hover:to-transparent"
                    : "group-hover:from-amber-500/5 group-hover:to-transparent"
                }`}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/tour-dates"
            className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-medium transition-colors duration-300 group"
          >
            <span>View All Tour Dates</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
