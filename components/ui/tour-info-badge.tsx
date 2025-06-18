'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
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
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900/60 hover:bg-zinc-800/70 backdrop-blur-sm border border-zinc-700/50 rounded-full text-sm font-medium text-zinc-300 hover:text-zinc-100 transition-all duration-300"
      >
        <Clock className="w-4 h-4" />
        <span>View Tour History</span>
      </Link>
    );
  }

  return (
    <Link
      href="/tour-dates"
      className="group relative inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-amber-900/40 to-amber-800/30 hover:from-amber-900/50 hover:to-amber-800/40 backdrop-blur-sm border border-amber-600/50 hover:border-amber-500/70 rounded-full transition-all duration-300"
    >
      {/* Pulsing indicator for upcoming show */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
      </span>
      
      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="text-amber-100">Next Show:</span>
        <span className="text-amber-200/90">{formatDate(nextShow.date)}</span>
        <span className="text-zinc-400">•</span>
        <span className="flex items-center gap-1 text-amber-200/80">
          <MapPin className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{nextShow.city}, {nextShow.state}</span>
          <span className="sm:hidden">{nextShow.city}</span>
        </span>
      </div>
    </Link>
  );
}