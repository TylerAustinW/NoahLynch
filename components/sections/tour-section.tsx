"use client";

import { useInView } from "@/hooks/use-in-view";
import { motion } from "framer-motion";
import { Bell, Calendar, Clock, Info, Map, MapPin, Ticket } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

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
  featured: boolean;
  description?: string;
  parkingInfo?: string;
  additionalInfo?: string;
  mapUrl?: string;
}

const tourDates: TourDate[] = [
  {
    id: "magnolia-blues",
    date: "Jun 14, 2025",
    time: "7:00 PM CDT",
    venue: "Magnolia Blues BBQ Company",
    address: "505 W Monticello St",
    city: "Brookhaven",
    state: "MS",
    zipCode: "39601",
    ticketUrl:
      "https://www.bandsintown.com/e/106676619-noah-lynch-at-magnolia-blues-bbq-company?came_from=281&utm_medium=web&utm_source=artist_page&utm_campaign=event",
    featured: true,
    description:
      'Join Noah Lynch for an intimate evening of live music featuring songs from his latest album "Honest" and more. Experience authentic country music in the heart of Brookhaven.',
    parkingInfo:
      "Free parking available on-site and street parking available along W Monticello St.",
    additionalInfo:
      "All ages welcome. Food and beverages will be available for purchase from Magnolia Blues BBQ Company.",
    mapUrl: "https://maps.app.goo.gl/1T6X8vC4Gk3u7qeR7",
  },
];

const tourItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
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
  const [expandedDetails, setExpandedDetails] = useState<string | null>(null);

  const toggleDetails = (id: string) => {
    if (expandedDetails === id) {
      setExpandedDetails(null);
    } else {
      setExpandedDetails(id);
    }
  };

  return (
    <section
      id="tour"
      ref={ref}
      className="relative overflow-hidden px-6 pt-2 pb-8 md:px-8 md:pt-6 md:pb-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[url('/texture.png')] bg-repeat opacity-10 md:opacity-10"></div>

      <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-full overflow-hidden opacity-5">
        <div className="absolute -top-[30%] -right-[10%] h-[60%] w-[60%] rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="bg-red/5 absolute -bottom-[30%] -left-[10%] h-[60%] w-[60%] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl">
        <h1 className="mb-6 text-center text-4xl font-bold text-white">
          Tour Dates
        </h1>
        <div className="mb-6 flex flex-col items-center gap-2">
          <h2 className="text-center text-3xl font-bold text-white md:text-4xl">
            Weekend Of Live Music
          </h2>
        </div>
        <div className="mb-8">
          {tourDates.map((tour) => (
            <motion.div
              key={tour.id}
              variants={tourItemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className={`mx-auto mb-8 w-full max-w-3xl rounded-xl border ${
                tour.featured
                  ? "border-amber-600/50 bg-gradient-to-br from-zinc-900/80 to-black/80"
                  : "border-zinc-800/50 bg-zinc-900/30"
              } shadow-lg ${
                tour.featured ? "shadow-amber-900/10" : "shadow-black/30"
              } overflow-hidden`}
            >
              {tour.featured && (
                <div className="bg-amber-600/90 text-center py-1.5 px-3">
                  <span className="font-medium text-black uppercase text-sm tracking-wide">
                    Featured Event
                  </span>
                </div>
              )}

              <div className="flex flex-col justify-between p-6">
                <div>
                  <div className="mb-3 flex items-start gap-4">
                    <MapPin
                      className={`h-5 w-5 mt-1 ${
                        tour.featured ? "text-amber-400" : "text-amber-200/70"
                      }`}
                      aria-hidden="true"
                    />
                    <div>
                      <h3
                        className={`text-2xl font-bold ${
                          tour.featured ? "text-amber-100" : "text-white"
                        }`}
                      >
                        {tour.venue}
                      </h3>
                      <p className="text-zinc-400">
                        {tour.address}
                        <br />
                        {tour.city}, {tour.state} {tour.zipCode}
                      </p>

                      {tour.featured && tour.mapUrl && (
                        <a
                          href={tour.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center mt-2 text-amber-400/90 hover:text-amber-300 transition-colors text-sm font-medium"
                          aria-label={`View ${tour.venue} on Google Maps`}
                        >
                          <Map
                            className="h-3.5 w-3.5 mr-1.5"
                            aria-hidden="true"
                          />
                          View on Google Maps
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                    <div className="flex items-center gap-4">
                      <Calendar
                        className={`h-5 w-5 ${
                          tour.featured ? "text-amber-400" : "text-amber-200/70"
                        }`}
                        aria-hidden="true"
                      />
                      <div>
                        <h4
                          className={`text-xl font-bold ${
                            tour.featured ? "text-amber-100" : "text-white"
                          }`}
                        >
                          {tour.date}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Clock
                        className={`h-5 w-5 ${
                          tour.featured ? "text-amber-400" : "text-amber-200/70"
                        }`}
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-zinc-300">{tour.time}</p>
                      </div>
                    </div>
                  </div>

                  {tour.featured && tour.description && (
                    <div className="mt-6 bg-black/30 rounded-lg p-4 border border-zinc-800/50">
                      <p className="text-zinc-300 text-sm leading-relaxed">
                        {tour.description}
                      </p>
                    </div>
                  )}

                  {tour.featured && expandedDetails === tour.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 space-y-4"
                    >
                      {tour.parkingInfo && (
                        <div className="flex gap-3 items-start">
                          <div className="rounded-full bg-zinc-800/50 p-1.5 mt-0.5">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-amber-400"
                              aria-hidden="true"
                            >
                              <path
                                d="M19 14C20.6569 14 22 12.6569 22 11C22 9.34315 20.6569 8 19 8C17.3431 8 16 9.34315 16 11C16 12.6569 17.3431 14 19 14Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M5 14C6.65685 14 8 12.6569 8 11C8 9.34315 6.65685 8 5 8C3.34315 8 2 9.34315 2 11C2 12.6569 3.34315 14 5 14Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M5 14V17C5 18.0609 5.42143 19.0783 6.17157 19.8284C6.92172 20.5786 7.93913 21 9 21H15C16.0609 21 17.0783 20.5786 17.8284 19.8284C18.5786 19.0783 19 18.0609 19 17V14"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M5 8V4C5 3.46957 5.21071 2.96086 5.58579 2.58579C5.96086 2.21071 6.46957 2 7 2H9.59C10.0784 2.00005 10.5535 2.11705 10.9795 2.34156C11.4056 2.56607 11.7681 2.88881 12.03 3.28L12.97 4.72C13.2319 5.11119 13.5944 5.43393 14.0205 5.65844C14.4465 5.88295 14.9216 5.99995 15.41 6H17C17.5304 6 18.0391 6.21071 18.4142 6.58579C18.7893 6.96086 19 7.46957 19 8"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <div>
                            <h5 className="font-medium text-amber-200 text-sm">
                              Parking Information
                            </h5>
                            <p className="text-zinc-300 text-sm mt-1">
                              {tour.parkingInfo}
                            </p>
                          </div>
                        </div>
                      )}

                      {tour.additionalInfo && (
                        <div className="flex gap-3 items-start">
                          <div className="rounded-full bg-zinc-800/50 p-1.5 mt-0.5">
                            <Info
                              className="h-4 w-4 text-amber-400"
                              aria-hidden="true"
                            />
                          </div>
                          <div>
                            <h5 className="font-medium text-amber-200 text-sm">
                              Additional Information
                            </h5>
                            <p className="text-zinc-300 text-sm mt-1">
                              {tour.additionalInfo}
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <motion.div variants={buttonVariants} className="sm:flex-1">
                    <Link
                      href={tour.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 rounded-full ${
                        tour.featured
                          ? "border-2 border-amber-500/80 bg-amber-500/20 text-amber-100 hover:border-amber-400/90 hover:bg-amber-500/30"
                          : "border border-zinc-700/50 bg-zinc-900/70 text-white hover:border-zinc-600/60 hover:bg-zinc-800/80"
                      } px-6 py-3 font-medium transition-all w-full`}
                      aria-label={`Get tickets for Noah Lynch at ${tour.venue} on ${tour.date}`}
                    >
                      <Ticket className="h-4 w-4" aria-hidden="true" />
                      Get Tickets
                    </Link>
                  </motion.div>

                  <motion.div variants={buttonVariants} className="sm:flex-1">
                    <Link
                      href="https://www.expedia.com/Hotel-Search?adults=2&destination=Regal%20UA%20Westbrook&endDate=2025-06-15&latLong=31.5812%2C-90.4493&numRoom=1&startDate=2025-06-14&clickref=1110lqUGME&affcid=US.DIRECT.PHG.1011l45458.0&ref_id=1110lqUGME&my_ad=AFF.US.DIRECT.PHG.1011l45458.0&afflid=1110lqUGME&affdtl=PHG.1110lqUGME."
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 rounded-full border ${
                        tour.featured
                          ? "border-zinc-700/50 bg-black/40 text-white hover:border-zinc-600/60 hover:bg-zinc-900/70"
                          : "border-zinc-700/50 bg-zinc-900/70 text-white hover:border-zinc-600/60 hover:bg-zinc-800/80"
                      } px-6 py-3 font-medium transition-all w-full`}
                      aria-label={`Book a hotel near ${tour.venue} for ${tour.date}`}
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
                        aria-hidden="true"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                      Book a Hotel
                    </Link>
                  </motion.div>

                  <motion.div variants={buttonVariants}>
                    <Link
                      href={tour.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-full border border-zinc-700/50 bg-zinc-900/70 px-6 py-3 text-white transition-all hover:border-zinc-600/60 hover:bg-zinc-800/80 w-full sm:w-auto"
                      aria-label={`Set a reminder for Noah Lynch at ${tour.venue} on ${tour.date}`}
                    >
                      <Bell className="h-4 w-4" aria-hidden="true" />
                      Reminder
                    </Link>
                  </motion.div>

                  {tour.featured && (
                    <motion.button
                      variants={buttonVariants}
                      onClick={() => toggleDetails(tour.id)}
                      className="flex items-center justify-center gap-2 rounded-full border border-zinc-700/50 bg-zinc-900/70 px-6 py-3 text-white transition-all hover:border-zinc-600/60 hover:bg-zinc-800/80"
                      aria-expanded={expandedDetails === tour.id}
                      aria-controls={`details-${tour.id}`}
                    >
                      <Info className="h-4 w-4" aria-hidden="true" />
                      {expandedDetails === tour.id
                        ? "Hide Details"
                        : "Show Details"}
                    </motion.button>
                  )}
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
