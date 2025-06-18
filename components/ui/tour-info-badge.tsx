'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';
import { tourDatesData } from '@/lib/tour-dates-data';
import { motion } from 'framer-motion';

export default function TourInfoBadge() {
  const [nextShow, setNextShow] = useState<typeof tourDatesData[0] | null>(null);

  useEffect(() => {
    // Find the next upcoming show
    const upcomingShows = tourDatesData
      .filter(show => show.upcoming === true)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    if (upcomingShows.length > 0) {
      setNextShow(upcomingShows[0]);
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  // If no upcoming shows, show link to view past shows
  if (!nextShow) {
    return (
      <Link
        href="/tour-dates"
        className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/60 border border-zinc-700/40 rounded-full text-sm text-zinc-300 hover:bg-zinc-800/60 hover:border-zinc-600/60 transition-all duration-300"
      >
        <Calendar className="w-4 h-4" />
        <span>View Tour History</span>
      </Link>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
    >
      <Link
        href="/tour-dates"
        className="group relative inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-amber-900/30 to-amber-800/20 border border-amber-600/40 rounded-full hover:from-amber-900/40 hover:to-amber-800/30 hover:border-amber-500/60 transition-all duration-300"
      >
        {/* Pulsing indicator for upcoming show */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm">
          <span className="text-amber-100/90 font-medium">Next Show:</span>
          <div className="flex items-center gap-2 text-amber-200/70">
            <span className="font-medium">{formatDate(nextShow.date)}</span>
            <span className="text-zinc-400">•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span className="hidden sm:inline">{nextShow.city}, {nextShow.state}</span>
              <span className="sm:hidden">{nextShow.city}</span>
            </span>
          </div>
        </div>
        
        {/* Hover effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/10 group-hover:to-transparent transition-all duration-300" />
      </Link>
    </motion.div>
  );
}