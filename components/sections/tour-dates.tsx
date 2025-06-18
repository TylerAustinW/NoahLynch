'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Ticket, Sparkles } from 'lucide-react';
import { tourDatesData } from '@/lib/tour-dates-data';
import UpcomingShowNotification from '@/components/ui/upcoming-show-notification';

export default function TourDates() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntilShow = (dateString: string) => {
    const showDate = new Date(dateString);
    const today = new Date();
    const diffTime = showDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Separate upcoming and past shows
  const upcomingShows = tourDatesData.filter(show => show.upcoming === true);
  const pastShows = tourDatesData.filter(show => show.upcoming !== true);
  const nextShow = upcomingShows[0]; // Get the first upcoming show

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black py-16 px-6 md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-wider">
            TOUR DATES
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            {upcomingShows.length > 0 
              ? "Don't miss Noah Lynch live. Check out upcoming shows and past performances."
              : "Take a look at where Noah Lynch has performed across the country."}
          </p>
        </motion.div>

        {/* Hero section for next upcoming show */}
        {nextShow && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-16"
          >
            <UpcomingShowNotification show={nextShow} variant="card" />
          </motion.div>
        )}

        {/* Upcoming Shows Section */}
        {upcomingShows.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-500" />
              Upcoming Shows
            </h2>
            <div className="space-y-4">
              {upcomingShows.map((tour, index) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-amber-900/20 to-zinc-900/50 backdrop-blur-sm border border-amber-700/50 hover:border-amber-600 transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
                          <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-amber-500 transition-colors">
                            {tour.venue}
                          </h3>
                          <div className="flex items-center gap-2 text-zinc-400">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">
                              {tour.city}, {tour.state}
                            </span>
                          </div>
                        </div>
                        
                        {tour.description && (
                          <p className="text-zinc-400 text-sm md:text-base mb-2">
                            {tour.description}
                          </p>
                        )}
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(tour.date)}</span>
                          </div>
                          {tour.time && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{tour.time}</span>
                            </div>
                          )}
                          <span className="text-amber-500 font-medium">
                            {getDaysUntilShow(tour.date) > 0 
                              ? `In ${getDaysUntilShow(tour.date)} days`
                              : 'Today!'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {tour.soldOut ? (
                          <span className="text-red-500 text-sm font-medium bg-red-900/20 px-4 py-2 rounded-full">
                            Sold Out
                          </span>
                        ) : tour.ticketLink ? (
                          <a
                            href={tour.ticketLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-300"
                          >
                            <Ticket className="w-4 h-4" />
                            Get Tickets
                          </a>
                        ) : (
                          <span className="text-amber-500 text-sm font-medium bg-amber-900/20 px-4 py-2 rounded-full">
                            Tickets Soon
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/10 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Past Shows Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: upcomingShows.length > 0 ? 0.5 : 0.2, duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            {upcomingShows.length > 0 ? 'Past Shows' : 'Previous Tour Dates'}
          </h2>
          <div className="space-y-4">
            {pastShows.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.4 }}
                className="group relative overflow-hidden rounded-lg bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-amber-500 transition-colors">
                          {tour.venue}
                        </h3>
                        <div className="flex items-center gap-2 text-zinc-400">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">
                            {tour.city}, {tour.state}
                          </span>
                        </div>
                      </div>
                      
                      {tour.description && (
                        <p className="text-zinc-400 text-sm md:text-base mb-2">
                          {tour.description}
                        </p>
                      )}
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(tour.date)}</span>
                        </div>
                        {tour.time && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{tour.time}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-zinc-600 text-sm font-medium bg-zinc-800/50 px-4 py-2 rounded-full">
                        Past Event
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Decorative gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-zinc-400 mb-6">
            Want to book Noah Lynch for your venue or event?
          </p>
          <a
            href="mailto:booking@noahlynch.com"
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}