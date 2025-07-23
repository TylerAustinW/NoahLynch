'use client';

import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Music,
  Users,
  ArrowLeft,
  Home,
  Mail,
  Hotel,
} from 'lucide-react';
import { tourDatesData, formatDate, getDaysUntilShow } from '@/lib/tour-dates-data';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function TourDates() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const upcomingShows = tourDatesData.filter((show) => show.upcoming === true);
  const pastShows = tourDatesData.filter((show) => show.upcoming !== true);

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-0">
        <Image
          src="/noah-studio.jpeg"
          alt="Noah Lynch Studio Background"
          fill
          className="object-cover"
          style={{
            objectPosition: 'center 40%',
          }}
          priority
        />
        <div className="absolute inset-0 backdrop-blur-[2px] bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/55" />
      </div>

      <div className="relative z-[51] pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 sm:mb-8 hidden md:block"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-amber-400 hover:text-amber-300 transition-all duration-300 group"
            >
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-amber-400/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 hover:border-amber-400/60 hover:bg-black/60 transition-all duration-300">
                <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                <Home className="w-4 sm:w-5 h-4 sm:h-5" />
                <span className="font-medium text-xs sm:text-sm">Back to Home</span>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-14"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-wider">
              LIVE PERFORMANCES
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
              {upcomingShows.length > 0
                ? 'Experience the magic of live music. Each performance is a unique journey through sound and emotion.'
                : 'Witness the evolution of an artist. Stay tuned for upcoming performances that will move your soul.'}
            </p>
          </motion.div>

          {upcomingShows.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-12 sm:mb-16"
            >
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <Sparkles className="w-5 sm:w-6 h-5 sm:h-6 text-amber-400" />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-400">
                  Coming Soon
                </h2>
              </div>

              <div className="grid gap-4 sm:gap-6">
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
                      className="group relative overflow-hidden rounded-lg sm:rounded-xl bg-black/40 backdrop-blur-md border border-amber-500/40 hover:border-amber-400 transition-all duration-300 hover:shadow-xl shadow-md hover:shadow-amber-500/20"
                    >
                      {tour.featured && (
                        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-to-r from-amber-400 to-amber-500 text-black px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold shadow-md shadow-amber-500/20">
                          UPCOMING SHOW
                        </div>
                      )}

                      <div className="p-4 sm:p-6 md:p-8">
                        <div className="flex flex-col gap-4 sm:gap-6">
                          <div className="flex-1">
                            <div className="flex flex-col gap-2 mb-4">
                              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors leading-tight">
                                {tour.venue}
                              </h3>
                              <div className="flex items-center gap-1.5 text-zinc-300">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm sm:text-base">
                                  {tour.city}, {tour.state}
                                </span>
                              </div>
                            </div>

                            {tour.description && (
                              <p className="text-zinc-300 text-sm sm:text-base mb-3 leading-relaxed line-clamp-2">
                                {tour.description}
                              </p>
                            )}

                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                              <div className="flex items-center gap-1.5 text-amber-400">
                                <Calendar className="w-4 h-4" />
                                <span className="font-medium">{formatDate(tour.date)}</span>
                              </div>
                              {tour.time && (
                                <div className="flex items-center gap-1.5 text-zinc-400">
                                  <Clock className="w-4 h-4" />
                                  <span>{tour.time}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1.5 bg-amber-500/15 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-amber-400/30">
                                <Music className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-400" />
                                <span className="text-amber-300 font-semibold text-xs sm:text-sm">
                                  {daysUntil > 0
                                    ? `In ${daysUntil} days`
                                    : daysUntil === 0
                                      ? 'TONIGHT!'
                                      : 'Thank you for attending'}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6">
                            {tour.soldOut ? (
                              <span className="text-amber-300 text-xs sm:text-sm font-bold bg-amber-900/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-amber-500/50">
                                FULL HOUSE
                              </span>
                            ) : tour.ticketLink ? (
                              <a
                                href={tour.ticketLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/30 text-xs sm:text-sm"
                              >
                                <Hotel className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                                Book a Hotel
                              </a>
                            ) : (
                              <span className="text-zinc-300 text-xs sm:text-sm font-medium bg-zinc-700/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-zinc-600/50">
                                Coming Soon
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        animate={{
                          x: hoveredCard === tour.id ? ['0%', '100%', '0%'] : '0%',
                        }}
                        transition={{
                          duration: 3,
                          repeat: hoveredCard === tour.id ? Infinity : 0,
                          ease: 'linear',
                        }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: upcomingShows.length > 0 ? 0.6 : 0.3,
              duration: 0.8,
            }}
          >
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <Users className="w-5 sm:w-6 h-5 sm:h-6 text-zinc-400" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-200">
                Previous Performances
              </h2>
            </div>

            <div className="block md:hidden">
              <motion.div
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
                style={{
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {pastShows.map((tour, index) => (
                  <motion.div
                    key={tour.id}
                    className="snap-center shrink-0 w-[90vw] sm:w-[75vw]"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="h-full rounded-lg bg-black/40 backdrop-blur-md border border-zinc-600/40 p-4 sm:p-5 shadow-md">
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-tight">
                        {tour.venue}
                      </h3>
                      <div className="flex items-center gap-1.5 text-zinc-400 text-xs sm:text-sm mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {tour.city}, {tour.state}
                        </span>
                      </div>

                      {tour.description && (
                        <p className="text-zinc-400 text-xs sm:text-sm mb-3 line-clamp-2">
                          {tour.description}
                        </p>
                      )}

                      <div className="space-y-1.5 text-xs sm:text-sm">
                        <div className="flex items-center gap-1.5 text-zinc-500">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{formatDate(tour.date)}</span>
                        </div>
                        {tour.time && (
                          <div className="flex items-center gap-1.5 text-zinc-500">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{tour.time}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-3">
                        <span className="text-zinc-400 text-[10px] sm:text-xs font-medium bg-zinc-700/40 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                          Memorable Night
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="flex justify-center gap-1.5 mt-4">
                {pastShows.map((_, index) => (
                  <div key={index} className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
                ))}
              </div>

              <p className="text-center text-zinc-500 text-[10px] sm:text-xs mt-3">
                Swipe to see more performances
              </p>
            </div>

            <div className="hidden md:grid gap-3">
              {pastShows.map((tour, index) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.6 }}
                  className="group relative overflow-hidden rounded-lg bg-black/30 backdrop-blur-md border border-zinc-600/40 hover:border-zinc-500 hover:bg-black/40 transition-all duration-300 shadow-md"
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col gap-2 mb-3">
                          <h3 className="text-lg md:text-xl font-bold text-zinc-100 group-hover:text-white transition-colors leading-tight">
                            {tour.venue}
                          </h3>
                          <div className="flex items-center gap-1.5 text-zinc-400">
                            <MapPin className="w-4 h-4" />
                            <span>
                              {tour.city}, {tour.state}
                            </span>
                          </div>
                        </div>

                        {tour.description && (
                          <p className="text-zinc-400 text-sm mb-2 line-clamp-2">
                            {tour.description}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                          <div className="flex items-center gap-1.5 text-zinc-500">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(tour.date)}</span>
                          </div>
                          {tour.time && (
                            <div className="flex items-center gap-1.5 text-zinc-500">
                              <Clock className="w-4 h-4" />
                              <span>{tour.time}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-center mt-4">
                        <span className="text-zinc-400 text-xs font-medium bg-zinc-700/40 px-3 py-1.5 rounded-full">
                          Memorable Night
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 sm:mt-20 text-center"
          >
            <div className="bg-black/30 backdrop-blur-md rounded-lg sm:rounded-xl p-8 sm:p-10 md:p-12 border border-zinc-600/40">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6">
                Bring the Music to You
              </h3>
              <p className="text-zinc-300 mb-6 sm:mb-8 text-sm sm:text-base">
                Ready to create an unforgettable experience? Let's make magic together.
              </p>
              <a
                href="mailto:NoahLynchContact@gmail.com"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
              >
                CONTACT ME <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
