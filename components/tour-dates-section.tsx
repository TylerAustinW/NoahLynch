"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "@/hooks/use-in-view";
import { useTourDates } from "@/hooks/use-tour-dates";
import { Bell, Calendar, Clock, MapPin, Ticket } from "lucide-react";
import Link from "next/link";
export default function TourDatesSection() {
  const { tourDates, loading } = useTourDates();
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="tour"
      ref={ref}
      className="py-24 px-6 md:px-12 bg-black relative"
    >
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-amber-400">
            Tour Dates
          </h2>

          <div className="mt-4 md:mt-0">
            <Button
              variant="outline"
              className="bg-transparent text-white border-amber-400 hover:bg-amber-400/10 rounded-none"
            >
              <Ticket className="mr-2 h-4 w-4" /> View All Shows
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {loading
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <Card
                    key={i}
                    className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 text-white overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <div className="p-6 flex flex-col md:flex-row md:items-center gap-6">
                        <Skeleton className="h-16 w-16 bg-zinc-800 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-6 w-48 bg-zinc-800" />
                          <Skeleton className="h-4 w-72 bg-zinc-800" />
                        </div>
                        <Skeleton className="h-10 w-32 bg-zinc-800" />
                      </div>
                    </CardContent>
                  </Card>
                ))
            : tourDates.map((event, index) => (
                <Card
                  key={index}
                  className={`bg-zinc-900/50 backdrop-blur-sm border-zinc-800 text-white overflow-hidden transition-all duration-700 hover:border-amber-400 ${
                    inView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="p-6 flex flex-col md:flex-row md:items-center gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex flex-col items-center justify-center border border-zinc-700 p-4 w-24 h-24">
                          <Calendar className="h-5 w-5 mb-1 text-amber-400" />
                          <span className="text-sm font-medium">
                            {event.date.split(",")[0]}
                          </span>
                          <span className="text-xs text-gray-400">
                            {event.time}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">
                          {event.venue}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-gray-400">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-amber-400" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-amber-400" />
                            <span>{event.fullTime}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-zinc-700 hover:border-amber-400 hover:bg-transparent"
                        >
                          <Bell className="mr-2 h-4 w-4" /> Get Tickets{" "}
                          <Link href={event.ticketLink}>
                            <Ticket className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </section>
  );
}
