'use client';

import { motion } from 'framer-motion';
import { getTourDatesSortedByClosest } from '@/lib/tour-dates-data';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/navbar';
import Image from 'next/image';

export default function TourDatesMinimal() {
  const [isLoading, setIsLoading] = useState(true);

  const tourDates = getTourDatesSortedByClosest();
  const upcoming = tourDates.filter((date) => date.upcoming);
  const past = tourDates.filter((date) => !date.upcoming);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <section className="min-h-screen bg-zinc-950 w-full relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/noah-lynch-portrait-guitar.jpeg"
          alt="Noah Lynch with guitar"
          fill
          className="object opacity-40 blur-sm sm:object-[40%_30%] md:object-[45%_25%] lg:object-[20%_20%]"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/85 via-zinc-950/70 to-zinc-950/90" />
      </div>

      {/* Navbar */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full pt-20">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-8 sm:py-10 md:py-16 px-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-200 mb-2 sm:mb-4">
            LIVE
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-400">2025</h2>
        </motion.div>

        {/* Tour Dates List */}
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
          {upcoming.map((date, index) => (
            <motion.div
              key={date.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              className="border-b border-zinc-700/40 last:border-b-0"
            >
              <div className="w-full py-6 sm:py-5 md:py-6">
                {/* Mobile Layout: Stacked Vertical */}
                <div className="flex flex-col sm:hidden space-y-3">
                  {/* Date */}
                  <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                    {new Date(date.date)
                      .toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                      .toUpperCase()}
                  </div>

                  {/* Venue and Location */}
                  <div className="space-y-1">
                    <div className="text-base font-bold text-white uppercase tracking-wide">
                      {date.venue}
                    </div>
                    <div className="text-sm text-zinc-300 uppercase tracking-wide">
                      {date.city}
                      {date.state ? `, ${date.state}` : ''}
                    </div>
                  </div>

                  {/* Button */}
                  <div className="pt-2">
                    {date.ticketLink ? (
                      <a
                        href={date.ticketLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full text-center px-6 py-3 text-sm font-medium uppercase tracking-wider border border-zinc-500 text-zinc-300 hover:border-amber-500 hover:text-amber-400 transition-all duration-300 active:bg-amber-500/10"
                      >
                        Tickets
                      </a>
                    ) : (
                      <button
                        disabled
                        className="inline-block w-full text-center px-6 py-3 text-sm font-medium uppercase tracking-wider border border-zinc-600 text-zinc-600 cursor-not-allowed"
                      >
                        Coming Soon
                      </button>
                    )}
                  </div>
                </div>

                {/* Tablet+ Layout: Grid */}
                <div className="hidden sm:grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
                  {/* Date - Left Aligned */}
                  <div className="md:col-span-2 text-left">
                    <div className="text-sm md:text-base text-zinc-300 font-medium uppercase tracking-wide">
                      {new Date(date.date)
                        .toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                        .toUpperCase()}
                    </div>
                  </div>

                  {/* Venue Name - Center Left */}
                  <div className="md:col-span-4 text-left md:text-center">
                    <div className="text-sm md:text-base font-bold text-white uppercase tracking-wide">
                      {date.venue}
                    </div>
                  </div>

                  {/* Location - Center Right */}
                  <div className="md:col-span-4 text-left md:text-center">
                    <div className="text-sm md:text-base text-zinc-300 uppercase tracking-wide">
                      {date.city}
                      {date.state ? `, ${date.state}` : ''}
                    </div>
                  </div>

                  {/* Button - Right Aligned */}
                  <div className="md:col-span-2 flex justify-start md:justify-end">
                    {date.ticketLink ? (
                      <a
                        href={date.ticketLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2 text-xs md:text-sm font-medium uppercase tracking-wider border border-zinc-500 text-zinc-300 hover:border-amber-500 hover:text-amber-400 transition-all duration-300"
                      >
                        Tickets
                      </a>
                    ) : (
                      <button
                        disabled
                        className="inline-block px-6 py-2 text-xs md:text-sm font-medium uppercase tracking-wider border border-zinc-600 text-zinc-600 cursor-not-allowed"
                      >
                        Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Past Shows Section */}
        {past.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-12 mt-16 md:mt-20"
          >
            <div className="text-center py-8 md:py-12">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-zinc-500 mb-8 uppercase tracking-wider">
                PAST SHOWS
              </h3>
            </div>

            <div className="w-full">
              {past.map((date) => (
                <div key={date.id} className="border-b border-zinc-700/20 last:border-b-0">
                  <div className="w-full py-4 sm:py-3 md:py-4">
                    {/* Mobile Layout: Stacked Vertical */}
                    <div className="flex flex-col sm:hidden space-y-2">
                      {/* Date */}
                      <div className="text-xs text-zinc-300 font-medium uppercase tracking-wider">
                        {new Date(date.date)
                          .toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                          .toUpperCase()}
                      </div>

                      {/* Venue and Location */}
                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-zinc-200 uppercase tracking-wide">
                          {date.venue}
                        </div>
                        <div className="text-xs text-zinc-300 uppercase tracking-wide">
                          {date.city}
                          {date.state ? `, ${date.state}` : ''}
                        </div>
                      </div>
                    </div>

                    {/* Tablet+ Layout: Grid */}
                    <div className="hidden sm:grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
                      {/* Date */}
                      <div className="md:col-span-2 text-left">
                        <div className="text-xs md:text-sm text-zinc-300 font-medium uppercase tracking-wide">
                          {new Date(date.date)
                            .toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                            .toUpperCase()}
                        </div>
                      </div>

                      {/* Venue */}
                      <div className="md:col-span-4 text-left md:text-center">
                        <div className="text-xs md:text-sm font-semibold text-zinc-200 uppercase tracking-wide">
                          {date.venue}
                        </div>
                      </div>

                      {/* Location */}
                      <div className="md:col-span-4 text-left md:text-center">
                        <div className="text-xs md:text-sm text-zinc-300 uppercase tracking-wide">
                          {date.city}
                          {date.state ? `, ${date.state}` : ''}
                        </div>
                      </div>

                      {/* Empty space for alignment */}
                      <div className="md:col-span-2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* No Shows Message */}
        {tourDates.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 sm:py-16 md:py-20 px-4 sm:px-6"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 mb-3 sm:mb-4">
              No shows scheduled
            </p>
            <p className="text-sm sm:text-base text-zinc-600">
              Check back soon for upcoming performances
            </p>
          </motion.div>
        )}
      </div>

      {/* Grain texture overlay */}
      <div className="absolute inset-0 bg-[url('/grain-texture-overlay.png')] bg-repeat opacity-[0.02] pointer-events-none z-10" />
    </section>
  );
}
