'use client';

import { useInView } from '@/hooks/use-in-view';
import { upcomingRelease } from '@/lib/musicData';
import { motion } from 'framer-motion';
import { Bell, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
interface TourDate {
  id: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  ticketUrl: string;
}

const tourDates: TourDate[] = [
  {
    id: 'magnolia-blues',
    date: 'Jun 14, 2025',
    time: '7:00 PM CDT',
    venue: 'Magnolia Blues BBQ Company',
    address: '505 W Monticello St',
    city: 'Brookhaven',
    state: 'MS',
    zipCode: '39601',
    ticketUrl:
      'https://www.bandsintown.com/e/106676619-noah-lynch-at-magnolia-blues-bbq-company?came_from=281&utm_medium=web&utm_source=artist_page&utm_campaign=event',
  },
];

const tourItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.3,
    },
  },
};

export default function TourSection(): React.ReactElement {
  const { ref, inView } = useInView({ threshold: 0.1, once: true });
  return (
    <section
      id="tour"
      ref={ref}
      className="relative overflow-hidden px-6 py-24 md:px-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-[url('/texture.png')] bg-repeat opacity-5"></div>

      <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-full overflow-hidden opacity-5">
        <div className="absolute -top-[30%] -right-[10%] h-[60%] w-[60%] rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="bg-red/5 absolute -bottom-[30%] -left-[10%] h-[60%] w-[60%] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl">
        <h1 className="mb-10 text-center text-4xl font-bold text-white">
          Tour Dates
        </h1>
        <div className="mb-8 flex flex-col items-center gap-2">
          <h2 className="text-center text-3xl font-bold text-white md:text-4xl">
            Weekend Of Live Music
          </h2>
        </div>
        <div className="mb-10">
          {tourDates.map((tour) => (
            <motion.div
              key={tour.id}
              variants={tourItemVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="mx-auto mb-8 w-full max-w-2xl rounded-xl border border-zinc-800/50 bg-zinc-900/30 shadow-lg shadow-black/30"
            >
              <div className="flex flex-col justify-between p-6">
                <div>
                  <div className="mb-3 flex items-center gap-4">
                    <MapPin className="h-5 w-5 text-amber-200/70" />
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {tour.venue}
                      </h3>
                      <p className="text-zinc-400">
                        {tour.address}
                        <br />
                        {tour.city}, {tour.state} {tour.zipCode}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <Calendar className="h-5 w-5 text-amber-200/70" />
                    <div>
                      <h4 className="text-xl font-bold text-white">
                        {tour.date}
                      </h4>
                      <p className="text-zinc-400">{tour.time}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <motion.div variants={buttonVariants}>
                    <Link
                      href="https://www.bandsintown.com/e/106676619-noah-lynch-at-magnolia-blues-bbq-company?came_from=281&utm_medium=web&utm_source=artist_page&utm_campaign=event"
                      className="flex items-center justify-center gap-2 rounded-full border border-zinc-700/50 bg-zinc-900/70 px-6 py-3 text-white transition-all hover:border-zinc-600/60 hover:bg-zinc-800/80"
                    >
                      Get Reminder
                      <Bell className="h-4 w-4" />
                    </Link>
                  </motion.div>

                  <div className="flex items-center justify-center gap-2 rounded-full border border-zinc-700/50 bg-zinc-900/70 px-6 py-3 text-white transition-all hover:border-zinc-600/60 hover:bg-zinc-800/80">
                    Get Directions
                    <MapPin className="h-5 w-5 text-amber-200/70" />
                  </div>

                  <motion.div variants={buttonVariants}>
                    <Link
                      href="https://www.expedia.com/Hotel-Search?adults=2&destination=Regal%20UA%20Westbrook&endDate=2025-06-15&latLong=31.5812%2C-90.4493&numRoom=1&startDate=2025-06-14&clickref=1110lqUGME&affcid=US.DIRECT.PHG.1011l45458.0&ref_id=1110lqUGME&my_ad=AFF.US.DIRECT.PHG.1011l45458.0&afflid=1110lqUGME&affdtl=PHG.1110lqUGME."
                      className="flex items-center justify-center gap-2 rounded-full border border-zinc-700/50 bg-zinc-900/70 px-6 py-3 text-white transition-all hover:border-zinc-600/60 hover:bg-zinc-800/80"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                      Book a Hotel
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}

          <div className="mt-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
              className="inline-block"
            >
              <h1 className="rounded-full border border-zinc-700/50 bg-zinc-900/70 px-8 py-3 font-medium text-amber-200/90 transition-all hover:border-zinc-600/60 hover:bg-zinc-800/80">
                More Shows Coming Soon!
              </h1>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
