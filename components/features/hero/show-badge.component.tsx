"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import { formatDate, isDateToday } from "@/lib/utils/date.utils";
import { getNextShow } from "@/lib/data/tour";

export default function ShowBadge() {
  const nextShow = getNextShow();
  const isTodayShow = nextShow ? isDateToday(nextShow.date) : false;

  if (!nextShow) {
    return (
      <div className="flex flex-wrap items-center gap-2 rounded-full border backdrop-blur-md px-3 py-2 sm:px-4 text-sm sm:text-base font-medium text-white w-full sm:w-auto justify-center sm:justify-start border-zinc-700/40 bg-zinc-900/80 lg:border-white/20 lg:bg-white/5 transition-all duration-300">
        <span className="text-xs sm:text-sm md:text-base">MORE SHOWS COMING SOON</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <Link
        href={nextShow.actionLink || "/tour-dates"}
        className="group block"
        aria-label={isTodayShow ? "View details for today's show" : "View tour dates and get tickets for the upcoming show"}
        aria-describedby="next-show-tooltip"
      >
        <div className="group/button flex flex-wrap items-center gap-2 rounded-full border backdrop-blur-md px-3 py-2 sm:px-4 text-sm sm:text-base font-medium text-white w-full sm:w-auto justify-center sm:justify-start transition-all duration-300 cursor-pointer border-zinc-700/40 bg-zinc-900/80 hover:bg-zinc-800/90 hover:border-zinc-600/50 lg:border-white/25 lg:bg-white/10 lg:hover:bg-white/20 lg:hover:border-white/40">
          <Calendar className="inline-block w-4 h-4 sm:w-5 sm:h-5 text-white/80 group-hover/button:text-white transition-colors duration-300" />
          <span className="text-xs sm:text-sm md:text-base text-white/90 group-hover/button:text-white transition-colors duration-300">
            {isTodayShow ? "Today's Show:" : "Next Show:"}
          </span>
          <span className="font-black text-amber-400 lg:text-amber-300 text-sm sm:text-lg md:text-xl group-hover/button:text-amber-300 lg:group-hover/button:text-amber-200 transition-colors duration-300 drop-shadow-sm whitespace-nowrap">
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
          {isTodayShow ? "Show is today — click for details & FREE entry!" : "Click for details & FREE entry!"}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-zinc-900/95"></div>
        </div>

        <div className="sm:hidden absolute top-full left-1/2 -translate-x-1/2 mt-2">
          <div className="bg-zinc-900/95 backdrop-blur-sm text-zinc-100 text-xs font-medium px-3 py-2 rounded-lg border border-zinc-700/50 shadow-lg whitespace-nowrap">
            {isTodayShow ? "Show is today — click for details & FREE entry!" : "Click for details & FREE entry!"}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-zinc-900/95"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
