"use client";

import { getNext, isShowTodayLocal } from "@/lib/data/tour";
import { formatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";
import Link from "next/link";

export default function ShowBadge() {
  const nextShow = getNext();
  const isTodayShow = nextShow ? isShowTodayLocal(nextShow) : false;

  if (!nextShow) {
    return (
      <div className="flex w-full flex-wrap items-center justify-center gap-2 rounded-full border border-zinc-700/30 bg-zinc-900/40 px-3 py-2 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 sm:w-auto sm:justify-start sm:px-4 sm:text-base">
        <span className="text-xs sm:text-sm md:text-base">MORE SHOWS COMING SOON</span>
      </div>
    );
  }

  const destinationUrl = "/tour-dates";

  return (
    <div className="relative">
      <Link
        href={destinationUrl}
        className="group block"
        aria-label={isTodayShow ? "View today's show details" : "View the next show details"}
        aria-describedby="next-show-tooltip"
      >
        <div className="group/button flex w-full cursor-pointer flex-wrap items-center justify-center gap-2 rounded-full border border-zinc-700/30 bg-zinc-900/40 px-3 py-2 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-zinc-600/50 hover:bg-zinc-800/60 sm:w-auto sm:justify-start sm:px-4 sm:text-base">
          <Calendar className="inline-block h-4 w-4 text-white/80 transition-colors duration-300 group-hover/button:text-white sm:h-5 sm:w-5" />
          <span className="text-xs text-white/90 transition-colors duration-300 group-hover/button:text-white sm:text-sm md:text-base">
            {isTodayShow ? "Today's Show:" : "Next Show:"}
          </span>
          <span className="text-sm font-black whitespace-nowrap text-amber-400 drop-shadow-sm transition-colors duration-300 group-hover/button:text-amber-300 sm:text-lg md:text-xl">
            {formatDate(nextShow.date)}
          </span>
          <span className="text-xs text-white/90 transition-colors duration-300 group-hover/button:text-white sm:text-sm md:text-base">
            • {nextShow.venue}
          </span>
        </div>
      </Link>

      <div
        id="next-show-tooltip"
        role="tooltip"
        className="pointer-events-none absolute top-1/2 left-full z-30 ml-3 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        <div className="rounded-lg border border-zinc-700/50 bg-zinc-900/95 px-3 py-2 text-xs font-medium whitespace-nowrap text-zinc-100 shadow-lg backdrop-blur-sm">
          {isTodayShow ? "Show is today — click for tour dates!" : "Click for tour dates!"}
          <div className="absolute top-1/2 right-full -translate-y-1/2 border-4 border-transparent border-r-zinc-900/95"></div>
        </div>

        <div className="absolute top-full left-1/2 mt-2 -translate-x-1/2 sm:hidden">
          <div className="rounded-lg border border-zinc-700/50 bg-zinc-900/95 px-3 py-2 text-xs font-medium whitespace-nowrap text-zinc-100 shadow-lg backdrop-blur-sm">
            {isTodayShow ? "Show is today — click for tour dates!" : "Click for tour dates!"}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-zinc-900/95"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
