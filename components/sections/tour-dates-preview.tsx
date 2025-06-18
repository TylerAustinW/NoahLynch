'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface TourDate {
  id: number;
  date: string;
  venue: string;
  city: string;
  state: string;
  description?: string;
}

const recentTourDates: TourDate[] = [
  {
    id: 1,
    date: '2024-10-15',
    venue: 'The Blue Note',
    city: 'Columbia',
    state: 'MO',
    description: 'Acoustic set featuring songs from "Honest"'
  },
  {
    id: 2,
    date: '2024-09-28',
    venue: "Proud Larry's",
    city: 'Oxford',
    state: 'MS',
    description: 'Hometown show with full band'
  },
  {
    id: 3,
    date: '2024-08-22',
    venue: 'Red Rocks Amphitheatre',
    city: 'Morrison',
    state: 'CO',
    description: 'Opening for national touring act'
  }
];

export default function TourDatesPreview() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="bg-gradient-to-b from-black via-zinc-900 to-black py-20 px-6 md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-wider">
            PREVIOUS TOUR DATES
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            A glimpse at recent performances across the country
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="grid gap-4 mb-8"
        >
          {recentTourDates.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-lg bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 hover:border-zinc-700 transition-all duration-300 p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors mb-1">
                    {tour.venue}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-zinc-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{tour.city}, {tour.state}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(tour.date)}</span>
                    </div>
                  </div>
                  {tour.description && (
                    <p className="text-zinc-500 text-sm mt-2">{tour.description}</p>
                  )}
                </div>
              </div>
              
              {/* Decorative gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
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