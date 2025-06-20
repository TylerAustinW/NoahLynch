"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, X, Ticket } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { TourDate } from "@/lib/tour-dates-data";

interface UpcomingShowNotificationProps {
  show: TourDate;
  variant?: "floating" | "banner" | "card";
  onClose?: () => void;
}

export default function UpcomingShowNotification({
  show,
  variant = "floating",
  onClose,
}: UpcomingShowNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Check localStorage to see if user has closed this notification
    const closedNotifications = localStorage.getItem("closedShowNotifications");
    if (closedNotifications) {
      const closed = JSON.parse(closedNotifications);
      if (closed.includes(show.id)) {
        setIsVisible(false);
      }
    }
  }, [show.id]);

  const handleClose = () => {
    setIsVisible(false);
    setHasInteracted(true);

    // Save to localStorage
    const closedNotifications = localStorage.getItem("closedShowNotifications");
    const closed = closedNotifications ? JSON.parse(closedNotifications) : [];
    if (!closed.includes(show.id)) {
      closed.push(show.id);
      localStorage.setItem("closedShowNotifications", JSON.stringify(closed));
    }

    onClose?.();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysUntilShow = (dateString: string) => {
    const showDate = new Date(dateString);
    const today = new Date();
    const diffTime = showDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntil = getDaysUntilShow(show.date);

  if (variant === "banner") {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg"
          >
            <div className="relative px-4 py-3 md:px-6">
              <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <Ticket className="w-5 h-5" />
                    <span className="font-bold text-sm sm:text-base">
                      {daysUntil > 0
                        ? `Next Show in ${daysUntil} days!`
                        : "Show Today!"}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                    <span className="font-semibold">{show.venue}</span>
                    <span className="opacity-90">
                      {show.city}, {show.state}
                    </span>
                    <span className="opacity-90">{formatDate(show.date)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/tour-dates"
                    className="hidden sm:inline-flex items-center gap-1 bg-white text-amber-700 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-amber-50 transition-colors"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={handleClose}
                    className="p-1 hover:bg-amber-800/50 rounded-md transition-colors"
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

  if (variant === "card") {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg p-6 text-white shadow-xl"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Next Show</h3>
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

            <h4 className="text-2xl font-bold mb-2">{show.venue}</h4>

            <div className="space-y-2 mb-4">
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

            {show.description && (
              <p className="text-sm opacity-90 mb-4">{show.description}</p>
            )}

            <div className="flex gap-2">
              {show.ticketLink && (
                <a
                  href={show.ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-white text-amber-700 px-4 py-2 rounded-md text-center font-medium hover:bg-amber-50 transition-colors"
                >
                  Get Tickets
                </a>
              )}
              <Link
                href="/tour-dates"
                className="flex-1 bg-amber-800 text-white px-4 py-2 rounded-md text-center font-medium hover:bg-amber-900 transition-colors"
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
      {isVisible && !hasInteracted && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 right-4 left-4 sm:left-auto sm:right-6 z-50 max-w-full sm:max-w-sm"
        >
          <motion.div
            className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg shadow-2xl p-4 sm:p-5 text-white"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5" />
                <span className="font-bold text-sm">Upcoming Show!</span>
              </div>
              <button
                onClick={handleClose}
                className="p-1 hover:bg-white/20 rounded-md transition-colors"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h4 className="text-lg font-bold mb-2">{show.venue}</h4>

            <div className="space-y-1 text-sm mb-3">
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

            <div className="flex gap-2 text-sm">
              {show.ticketLink && (
                <a
                  href={show.ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-white text-amber-700 px-3 py-2 rounded-md text-center font-medium hover:bg-amber-50 transition-colors"
                >
                  Get Tickets
                </a>
              )}
              <Link
                href="/tour-dates"
                className="flex-1 bg-amber-800 text-white px-3 py-2 rounded-md text-center font-medium hover:bg-amber-900 transition-colors"
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
