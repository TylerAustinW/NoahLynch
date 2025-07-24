'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, X, Ticket } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatDate, getDaysUntilShow, type TourDate } from '@/lib/tour-dates-data';

interface Props {
  show: TourDate;
  variant?: 'floating' | 'banner' | 'card';
  onClose?: () => void;
}

export default function UpcomingShowNotification({ show, variant = 'floating', onClose }: Props) {
  const [isVisible, setIsVisible] = useState(true);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    // Check localStorage to see if user has closed this notification
    const closedNotifications = localStorage.getItem('closedShowNotifications');
    if (closedNotifications) {
      const closed = JSON.parse(closedNotifications);
      if (closed.includes(show.id)) {
        setIsVisible(false);
      }
    }
  }, [show.id]);

  const handleClose = () => {
    setIsVisible(false);
    setInteracted(true);

    // Save to localStorage
    const closedNotifications = localStorage.getItem('closedShowNotifications');
    const closed = closedNotifications ? JSON.parse(closedNotifications) : [];
    if (!closed.includes(show.id)) {
      closed.push(show.id);
      localStorage.setItem('closedShowNotifications', JSON.stringify(closed));
    }

    onClose?.();
  };

  const daysUntil = getDaysUntilShow(show.date);

  if (variant === 'banner') {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg"
          >
            <div className="relative px-3 py-2 sm:px-4 sm:py-3 md:px-6">
              <div className="mx-auto max-w-7xl flex items-center justify-between gap-2 sm:gap-4">
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Ticket className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-bold text-xs sm:text-sm md:text-base">
                      {daysUntil > 0 ? `Next Show in ${daysUntil} days!` : 'Show Today!'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 md:gap-4 text-xs">
                    <span className="font-semibold">{show.venue}</span>
                    <span className="opacity-90">
                      {show.city}, {show.state}
                    </span>
                    <span className="opacity-90">{formatDate(show.date)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Link
                    href="/tour-dates"
                    className="hidden sm:inline-flex items-center gap-1 bg-white text-amber-700 px-2 py-1 sm:px-3 sm:py-1.5 rounded text-xs sm:text-sm font-medium hover:bg-amber-50 transition-colors"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={handleClose}
                    className="p-0.5 sm:p-1 hover:bg-amber-800/50 rounded transition-colors"
                    aria-label="Close notification"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  if (variant === 'card') {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-md sm:rounded-lg p-4 sm:p-6 text-white shadow-xl"
          >
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <h3 className="text-lg sm:text-xl font-bold">Next Show</h3>
              {onClose && (
                <button
                  onClick={handleClose}
                  className="p-1 hover:bg-white/20 rounded-md transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <h4 className="text-xl sm:text-2xl font-bold mb-2">{show.venue}</h4>

            <div className="space-y-2 mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>
                  {show.city}, {show.state}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(show.date)}</span>
              </div>
              {show.time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{show.time}</span>
                </div>
              )}
            </div>

            {show.description && <p className="text-xs sm:text-sm opacity-90 mb-3 sm:mb-4">{show.description}</p>}

            <div className="flex gap-1 sm:gap-2">
              {show.ticketLink && (
                <a
                  href={show.ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-white text-amber-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded text-center text-sm sm:text-base font-medium hover:bg-amber-50 transition-colors"
                >
                  Get Tickets
                </a>
              )}
              <Link
                href="/tour-dates"
                className="flex-1 bg-amber-800 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded text-center text-sm sm:text-base font-medium hover:bg-amber-900 transition-colors"
              >
                All Dates
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Default floating variant
  return (
    <AnimatePresence>
      {isVisible && !interacted && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-3 right-3 left-3 sm:bottom-4 sm:right-4 sm:left-auto z-50 max-w-full sm:max-w-sm"
        >
          <motion.div
            className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-md sm:rounded-lg shadow-2xl p-3 sm:p-4 md:p-5 text-white"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <div className="flex justify-between items-start mb-2 sm:mb-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <Ticket className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-bold text-xs sm:text-sm">Upcoming Show!</span>
              </div>
              <button
                onClick={handleClose}
                className="p-1 hover:bg-white/20 rounded-md transition-colors"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h4 className="text-base sm:text-lg font-bold mb-2">{show.venue}</h4>

            <div className="space-y-1 text-xs sm:text-sm mb-2 sm:mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 opacity-80" />
                <span>
                  {show.city}, {show.state}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 opacity-80" />
                <span>{formatDate(show.date)}</span>
                {show.time && <span className="opacity-80">• {show.time}</span>}
              </div>
            </div>

            <div className="flex gap-1 sm:gap-2 text-xs sm:text-sm">
              {show.ticketLink && (
                <a
                  href={show.ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-white text-amber-700 px-2 py-1.5 sm:px-3 sm:py-2 rounded text-center text-xs sm:text-sm font-medium hover:bg-amber-50 transition-colors"
                >
                  Get Tickets
                </a>
              )}
              <Link
                href="/tour-dates"
                className="flex-1 bg-amber-800 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded text-center text-xs sm:text-sm font-medium hover:bg-amber-900 transition-colors"
              >
                View All
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
