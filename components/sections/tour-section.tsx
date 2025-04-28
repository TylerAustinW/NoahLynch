'use client';

import { useInView } from '@/hooks/use-in-view';
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
         className="py-20 px-4 md:px-8 bg-gradient-to-b from-black via-zinc-950/99 to-black relative
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0
                  after:h-40 after:bg-gradient-to-t after:from-black after:to-transparent after:pointer-events-none"
      >
         {/* Background accents */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
            <div className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-amber-500/10 blur-[120px]" />
         </div>

         <div className="max-w-5xl mx-auto">
            <h1 className="text-center text-4xl font-bold text-white mb-10">Tour Dates</h1>
            <div className="flex flex-col items-center mb-8 gap-2">
               <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
                  Weekend Of Live Music
               </h2>
            </div>
         </div>
         <div className="mb-10">
            {tourDates.map(tour => (
               <motion.div
                  key={tour.id}
                  variants={tourItemVariants}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className="rounded-xl mx-auto max-w-2xl w-full bg-gradient-to-r from-zinc-900/80 to-black/70 border border-zinc-800/50 shadow-xl shadow-black/50 mb-8"
               >
                  <div className="p-6 flex flex-col justify-between">
                     <div>
                        <div className="flex items-center gap-4 mb-3">
                           <MapPin className="w-5 h-5 text-amber-200/70" />
                           <div>
                              <h3 className="text-2xl font-bold text-white">{tour.venue}</h3>
                              <p className="text-zinc-400">
                                 {tour.address}
                                 <br />
                                 {tour.city}, {tour.state} {tour.zipCode}
                              </p>
                           </div>
                        </div>

                        <div className="flex items-center gap-4 mt-6">
                           <Calendar className="w-5 h-5 text-amber-200/70" />
                           <div>
                              <h4 className="text-xl font-bold text-white">{tour.date}</h4>
                              <p className="text-zinc-400">{tour.time}</p>
                           </div>
                        </div>
                     </div>

                     <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <motion.div variants={buttonVariants}>
                           <Link
                              href="https://www.bandsintown.com/e/106676619-noah-lynch-at-magnolia-blues-bbq-company?came_from=281&utm_medium=web&utm_source=artist_page&utm_campaign=event"
                              className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900/70 hover:bg-zinc-800/80 border border-zinc-700/50 hover:border-zinc-600/60 text-white rounded-full transition-all"
                           >
                              Get Reminder
                              <Bell className="w-4 h-4" />
                           </Link>
                        </motion.div>

                        <motion.div variants={buttonVariants}>
                           <Link
                              href="https://www.expedia.com/Hotel-Search?adults=2&destination=Regal%20UA%20Westbrook&endDate=2025-06-15&latLong=31.5812%2C-90.4493&numRoom=1&startDate=2025-06-14&clickref=1110lqUGME&affcid=US.DIRECT.PHG.1011l45458.0&ref_id=1110lqUGME&my_ad=AFF.US.DIRECT.PHG.1011l45458.0&afflid=1110lqUGME&affdtl=PHG.1110lqUGME."
                              className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900/70 hover:bg-zinc-800/80 border border-zinc-700/50 hover:border-zinc-600/60 text-white rounded-full transition-all"
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

            <div className="text-center mt-12">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.5 }}
                  className="inline-block"
               >
                  <h1 className="px-8 py-3 bg-zinc-900/70 hover:bg-zinc-800/80 text-amber-200/90 rounded-full transition-all border border-zinc-700/50 hover:border-zinc-600/60 font-medium">
                     More Shows Coming Soon!
                  </h1>
               </motion.div>
            </div>
         </div>
      </section>
   );
}
