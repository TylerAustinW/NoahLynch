"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils/date.utils";
import { getNextUpcomingShow } from "@/lib/data/tour/tour-dates.data";

export default function ShowBadge() {
    const nextShow = getNextUpcomingShow();

    if (!nextShow) {
        return (
            <div className="flex flex-wrap items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-3 py-2 sm:px-4 text-sm sm:text-base font-medium text-white/80 w-full sm:w-auto justify-center sm:justify-start">
                <span className="text-xs sm:text-sm md:text-base">No upcoming shows scheduled</span>
            </div>
        );
    }

    return (
        <div className="relative">
            <Link
                href={nextShow.ticketLink || "/tour-dates"}
                className="group block"
                aria-label="View tour dates and get tickets for the upcoming show"
                aria-describedby="next-show-tooltip"
            >
                <div className="group/button flex flex-wrap items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-3 py-2 sm:px-4 text-sm sm:text-base font-medium text-white w-full sm:w-auto justify-center sm:justify-start hover:bg-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer">
                    <Calendar className="inline-block w-4 h-4 sm:w-5 sm:h-5 text-white/80 group-hover/button:text-white transition-colors duration-300" />
                    <span className="text-xs sm:text-sm md:text-base text-white/90 group-hover/button:text-white transition-colors duration-300">
                        Next Show:
                    </span>
                    <span className="font-bold text-white text-sm sm:text-base group-hover/button:text-white transition-colors duration-300">
                        {formatDate(nextShow.date)}
                    </span>
                    <span className="text-xs sm:text-sm md:text-base text-white/90 group-hover/button:text-white transition-colors duration-300">
                        • {nextShow.venue}
                    </span>

                    <div className="ml-1 opacity-60 group-hover/button:opacity-100 transition-opacity duration-300">
                        <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 text-white/70 group-hover/button:text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </Link>

            <div
                id="next-show-tooltip"
                role="tooltip"
                className="absolute left-full top-1/2 -translate-y-1/2 ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30"
            >
                <div className="bg-zinc-900/95 backdrop-blur-sm text-zinc-100 text-xs font-medium px-3 py-2 rounded-lg border border-zinc-700/50 shadow-lg whitespace-nowrap">
                    Click for details & FREE entry!
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-zinc-900/95"></div>
                </div>

                <div className="sm:hidden absolute top-full left-1/2 -translate-x-1/2 mt-2">
                    <div className="bg-zinc-900/95 backdrop-blur-sm text-zinc-100 text-xs font-medium px-3 py-2 rounded-lg border border-zinc-700/50 shadow-lg whitespace-nowrap">
                        Click for details & FREE entry!
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-zinc-900/95"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
