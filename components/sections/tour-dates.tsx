'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Ticket, ArrowRight, ExternalLink } from 'lucide-react';
import { getTourDatesSortedByClosest } from '@/lib/data/tour/tour-dates';
import { formatDate, getDaysUntilShow } from '@/lib/tour-dates-data';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function TourDates() {
  const [visible, setVisible] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  const tourDates = getTourDatesSortedByClosest();
  const upcoming = tourDates.filter((date) => date.upcoming);
  const past = tourDates.filter((date) => !date.upcoming);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const loadMore = () => {
    setVisible((prev) => Math.min(prev + 3, tourDates.length));
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 z-0">
        <Image
          src="/noah-lynch-studio-session.jpeg"
          alt="Noah Lynch in studio"
          fill
          className="object-cover"
          style={{
            objectPosition: 'center 30%',
          }}
          priority
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50" />
      </div>

      {/* Texture overlay */}
      <div className="absolute inset-0 bg-[url('/grain-texture-overlay.png')] bg-repeat opacity-[0.03] z-10" />

      <div className="relative z-20 pt-24 sm:pt-32 pb-16 px-4 sm:px-6 md:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Live Shows
            </h2>
            <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto">
              Experience Noah Lynch live. Blues, neo-rock, and acoustic performances across
              Mississippi.
            </p>
          </motion.div>

          {/* Upcoming Shows */}
          {upcoming.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-16"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-amber-400 mb-8 text-center">
                Upcoming Shows
              </h3>

              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                {upcoming.slice(0, visible).map((date, index) => {
                  const daysUntil = getDaysUntilShow(date.date);

                  return (
                    <motion.div
                      key={date.id}
                      id={`tour-date-${index}`}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.6 }}
                      className="group"
                    >
                      <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/50 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 hover:border-amber-500/50 hover:bg-black/60 transition-all duration-300">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 md:gap-6">
                          {/* Date & Time */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
                                {formatDate(date.date)}
                              </span>
                              {daysUntil <= 7 && daysUntil > 0 && (
                                <span className="bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full text-xs font-medium">
                                  {daysUntil} days
                                </span>
                              )}
                            </div>

                            {date.time && (
                              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                <Clock className="w-4 h-4 text-zinc-400" />
                                <span className="text-zinc-300">{date.time}</span>
                              </div>
                            )}

                            <div className="flex items-start gap-2 mb-2 sm:mb-3">
                              <MapPin className="w-4 h-4 text-zinc-400 mt-1" />
                              <div className="text-zinc-300">
                                <div className="font-medium break-words text-sm sm:text-base">
                                  <span className="sm:hidden">{date.shortName || date.venue}</span>
                                  <span className="hidden sm:inline">{date.venue}</span>
                                </div>
                                <div className="text-sm text-zinc-400">
                                  {date.city}
                                  {date.state && `, ${date.state}`}
                                </div>
                              </div>
                            </div>

                            {date.description && (
                              <p className="text-zinc-400 text-sm mb-4">{date.description}</p>
                            )}
                          </div>

                          {/* Ticket Button */}
                          <div className="flex flex-col gap-2">
                            {date.ticketLink ? (
                              <Button asChild variant="primary">
                                <a
                                  href={date.ticketLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`Get tickets for ${date.venue}`}
                                >
                                  <Ticket className="w-3 h-3 sm:w-4 sm:h-4" />
                                  Get Tickets
                                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                                </a>
                              </Button>
                            ) : (
                              <Button variant="outline" disabled>
                                <Ticket className="w-3 h-3 sm:w-4 sm:h-4" />
                                Tickets Soon
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {visible < upcoming.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center mt-8"
                >
                  <Button variant="secondary" onClick={loadMore} aria-label="Load more shows">
                    Load More Shows
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Past Shows */}
          {past.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-400 mb-8 text-center">
                Past Performances
              </h3>

              <div className="grid gap-3 sm:gap-4 md:gap-6">
                {past.map((date, index) => (
                  <motion.div
                    key={date.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    className="bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-md sm:rounded-lg p-2 sm:p-3 md:p-4 hover:border-zinc-700/50 transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 md:gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-zinc-500" />
                          <span className="text-base sm:text-lg font-medium text-zinc-300">
                            {formatDate(date.date)}
                          </span>
                        </div>

                        <div className="flex items-start gap-2">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-zinc-500 mt-0.5 sm:mt-1" />
                          <div className="text-zinc-400">
                            <div className="font-medium break-words text-sm sm:text-base">
                              <span className="sm:hidden">{date.shortName || date.venue}</span>
                              <span className="hidden sm:inline">{date.venue}</span>
                            </div>
                            <div className="text-sm">
                              {date.city}
                              {date.state && `, ${date.state}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* No Shows Message */}
          {tourDates.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Calendar className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <p className="text-xl text-zinc-400 mb-2">No shows scheduled</p>
              <p className="text-zinc-500">Check back soon for upcoming performances</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
