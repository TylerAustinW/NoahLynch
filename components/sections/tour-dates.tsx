'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';

interface TourDate {
  id: number;
  date: string;
  venue: string;
  city: string;
  state: string;
  time?: string;
  ticketLink?: string;
  soldOut?: boolean;
  description?: string;
}

const previousTourDates: TourDate[] = [
  {
    id: 1,
    date: '2024-10-15',
    venue: 'The Blue Note',
    city: 'Columbia',
    state: 'MO',
    time: '8:00 PM',
    description: 'Acoustic set featuring songs from "Honest"'
  },
  {
    id: 2,
    date: '2024-09-28',
    venue: 'Proud Larry\'s',
    city: 'Oxford',
    state: 'MS',
    time: '9:00 PM',
    description: 'Hometown show with full band'
  },
  {
    id: 3,
    date: '2024-09-10',
    venue: 'The Basement',
    city: 'Nashville',
    state: 'TN',
    time: '7:30 PM',
    description: 'Writers round with special guests'
  },
  {
    id: 4,
    date: '2024-08-22',
    venue: 'Red Rocks Amphitheatre',
    city: 'Morrison',
    state: 'CO',
    time: '7:00 PM',
    description: 'Opening for national touring act'
  },
  {
    id: 5,
    date: '2024-07-04',
    venue: 'Mississippi Delta Blues Festival',
    city: 'Greenville',
    state: 'MS',
    time: '6:00 PM',
    description: 'Festival performance on main stage'
  },
  {
    id: 6,
    date: '2024-06-18',
    venue: 'The Fillmore',
    city: 'San Francisco',
    state: 'CA',
    time: '8:00 PM',
    description: 'West Coast tour finale'
  },
  {
    id: 7,
    date: '2024-05-30',
    venue: 'House of Blues',
    city: 'New Orleans',
    state: 'LA',
    time: '9:00 PM',
    description: 'Late night blues session'
  },
  {
    id: 8,
    date: '2024-05-12',
    venue: 'The Tabernacle',
    city: 'Atlanta',
    state: 'GA',
    time: '8:00 PM',
    description: 'Southern tour kickoff'
  }
];

export default function TourDates() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

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
            Take a look at where Noah Lynch has performed across the country. 
            From intimate acoustic sets to festival stages, each show tells a story.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-4"
        >
          {previousTourDates.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
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