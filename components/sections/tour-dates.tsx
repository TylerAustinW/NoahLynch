"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  Ticket,
  Sparkles,
  Music,
  Users,
  ArrowLeft,
  Home,
} from "lucide-react";
import { tourDatesData } from "@/lib/tour-dates-data";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { useState } from "react";

const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function TourDates() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    // Parse date components to avoid timezone issues
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysUntilShow = (dateString: string) => {
    // Parse date components to avoid timezone issues
    const [year, month, day] = dateString.split("-").map(Number);
    const showDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    showDate.setHours(0, 0, 0, 0);
    const diffTime = showDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Separate upcoming and past shows
  const upcomingShows = tourDatesData.filter(show => show.upcoming === true);
  const pastShows = tourDatesData.filter(show => show.upcoming !== true);

  return (
    <div className="relative min-h-screen">
      {/* Background Image with Blur */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/honest-coverr.png"
          alt="Background"
          fill
          className="object-cover"
          style={{
            objectPosition: "center 30%",
          }}
          priority
        />
        {/* Blur overlay */}
        <div className="absolute inset-0 backdrop-blur-md bg-black/60" />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-24 pb-16 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Back to Home Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-gold-400 hover:text-gold-300 transition-all duration-300 group"
            >
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-gold-400/30 rounded-full px-4 py-2 hover:border-gold-400/60 hover:bg-black/60 transition-all duration-300">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                <Home className="w-5 h-5" />
                <span className="font-medium text-sm">Back to Home</span>
              </div>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1
              className={`text-5xl md:text-7xl font-bold text-white mb-6 tracking-wider ${playfairDisplay.className}`}
            >
              TOUR DATES
            </h1>
            <p className="text-xl text-zinc-200 max-w-3xl mx-auto leading-relaxed">
              {upcomingShows.length > 0
                ? "Join Noah Lynch for an unforgettable live experience. Upcoming shows and past performances listed below."
                : "Explore where Noah Lynch has performed. New tour dates coming soon!"}
            </p>
          </motion.div>

          {/* Upcoming Shows Section */}
          {upcomingShows.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-20"
            >
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="w-7 h-7 text-gold-400" />
                <h2
                  className={`text-3xl md:text-4xl font-bold text-white ${playfairDisplay.className}`}
                >
                  Upcoming Shows
                </h2>
              </div>

              <div className="grid gap-6">
                {upcomingShows.map((tour, index) => {
                  const daysUntil = getDaysUntilShow(tour.date);
                  return (
                    <motion.div
                      key={tour.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.6 }}
                      onMouseEnter={() => setHoveredCard(tour.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-gold-500/20 via-gold-500/10 to-transparent backdrop-blur-lg border border-gold-400/50 hover:border-gold-400 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/20"
                    >
                      {/* Featured badge */}
                      {tour.featured && (
                        <div className="absolute top-4 right-4 bg-gold-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                          FEATURED
                        </div>
                      )}

                      <div className="p-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                              <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-gold-300 transition-colors">
                                {tour.venue}
                              </h3>
                              <div className="flex items-center gap-2 text-zinc-300">
                                <MapPin className="w-5 h-5" />
                                <span className="text-lg">
                                  {tour.city}, {tour.state}
                                </span>
                              </div>
                            </div>

                            {tour.description && (
                              <p className="text-zinc-200 text-lg mb-4 leading-relaxed">
                                {tour.description}
                              </p>
                            )}

                            <div className="flex flex-wrap items-center gap-6 text-base">
                              <div className="flex items-center gap-2 text-gold-300">
                                <Calendar className="w-5 h-5" />
                                <span className="font-medium">
                                  {formatDate(tour.date)}
                                </span>
                              </div>
                              {tour.time && (
                                <div className="flex items-center gap-2 text-zinc-300">
                                  <Clock className="w-5 h-5" />
                                  <span>{tour.time}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <Music className="w-5 h-5 text-gold-400" />
                                <span className="text-gold-400 font-bold">
                                  {daysUntil > 0
                                    ? `${daysUntil} days away`
                                    : daysUntil === 0
                                      ? "TODAY!"
                                      : "Event passed"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {tour.soldOut ? (
                              <span className="text-red-400 text-lg font-bold bg-red-900/30 px-6 py-3 rounded-full border border-red-500/50">
                                SOLD OUT
                              </span>
                            ) : tour.ticketLink ? (
                              <a
                                href={tour.ticketLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-stage-400 hover:bg-stage-500 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                              >
                                <Ticket className="w-5 h-5" />
                                Get Tickets
                              </a>
                            ) : (
                              <span className="text-gold-300 text-lg font-medium bg-gold-500/20 px-6 py-3 rounded-full border border-gold-500/50">
                                Tickets Soon
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Animated gradient on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-gold-500/0 via-gold-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        animate={{
                          x:
                            hoveredCard === tour.id
                              ? ["0%", "100%", "0%"]
                              : "0%",
                        }}
                        transition={{
                          duration: 3,
                          repeat: hoveredCard === tour.id ? Infinity : 0,
                          ease: "linear",
                        }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Past Shows Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: upcomingShows.length > 0 ? 0.6 : 0.3,
              duration: 0.8,
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Users className="w-7 h-7 text-zinc-400" />
              <h2
                className={`text-3xl md:text-4xl font-bold text-white ${playfairDisplay.className}`}
              >
                Past Performances
              </h2>
            </div>

            {/* Mobile Swipeable View */}
            <div className="block md:hidden">
              <motion.div
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
                style={{
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {pastShows.map((tour, index) => (
                  <motion.div
                    key={tour.id}
                    className="snap-center shrink-0 w-[85vw]"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="h-full rounded-xl bg-white/5 backdrop-blur-md border border-zinc-700/50 p-5">
                      <h3 className="text-xl font-bold text-zinc-100 mb-2">
                        {tour.venue}
                      </h3>
                      <div className="flex items-center gap-2 text-zinc-400 text-sm mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {tour.city}, {tour.state}
                        </span>
                      </div>

                      {tour.description && (
                        <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
                          {tour.description}
                        </p>
                      )}

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-zinc-500">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(tour.date)}</span>
                        </div>
                        {tour.time && (
                          <div className="flex items-center gap-2 text-zinc-500">
                            <Clock className="w-4 h-4" />
                            <span>{tour.time}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-4">
                        <span className="text-zinc-500 text-xs font-medium bg-zinc-800/50 px-3 py-1 rounded-full">
                          Past Event
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Dot Indicators */}
              <div className="flex justify-center gap-1.5 mt-4">
                {pastShows.map((_, index) => (
                  <div
                    key={index}
                    className="h-1.5 w-1.5 rounded-full bg-zinc-600"
                  />
                ))}
              </div>

              <p className="text-center text-zinc-500 text-xs mt-3">
                Swipe to see more performances
              </p>
            </div>

            {/* Desktop Grid View */}
            <div className="hidden md:grid gap-4">
              {pastShows.map((tour, index) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.6 }}
                  className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-md border border-zinc-700/50 hover:border-zinc-600 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                          <h3 className="text-xl md:text-2xl font-bold text-zinc-100 group-hover:text-gold-300 transition-colors">
                            {tour.venue}
                          </h3>
                          <div className="flex items-center gap-2 text-zinc-400">
                            <MapPin className="w-4 h-4" />
                            <span>
                              {tour.city}, {tour.state}
                            </span>
                          </div>
                        </div>

                        {tour.description && (
                          <p className="text-zinc-400 mb-3">
                            {tour.description}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-5 text-sm">
                          <div className="flex items-center gap-2 text-zinc-500">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(tour.date)}</span>
                          </div>
                          {tour.time && (
                            <div className="flex items-center gap-2 text-zinc-500">
                              <Clock className="w-4 h-4" />
                              <span>{tour.time}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <span className="text-zinc-500 text-sm font-medium bg-zinc-800/50 px-4 py-2 rounded-full">
                          Past Event
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-20 text-center"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-12 border border-zinc-700/50">
              <h3
                className={`text-2xl md:text-3xl font-bold text-white mb-4 ${playfairDisplay.className}`}
              >
                Book Noah Lynch
              </h3>
              <p className="text-zinc-300 mb-8 text-lg">
                Want to bring Noah Lynch to your venue or event?
              </p>
              <a
                href="mailto:NoahLynchContact@gmail.com"
                className="inline-flex items-center gap-2 bg-stage-400 hover:bg-stage-500 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
