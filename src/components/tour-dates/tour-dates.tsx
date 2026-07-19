"use client";

import Navbar from "@/components/layout/navbar";
import { CANCELLED_SHOW_IDS, type Show as NewShow } from "@/lib/data/tour";
import { formatDate, formatTime } from "@/lib/utils";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

function ClientOnlyCalendarButton({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <>{children}</>;
}

interface TourDatesSectionProps {
  upcoming: NewShow[];
  past: NewShow[];
}

interface ShowCardProps {
  show: NewShow;
  index: number;
  isPast?: boolean;
}

function ShowCard({ show, index, isPast = false }: ShowCardProps) {
  const timeLabel = show.startTimeLocal ? formatTime(show.startTimeLocal) : show.time || "";
  const isCancelled = CANCELLED_SHOW_IDS.has(show.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: isPast ? 0 : 0.05 * index, duration: 0.2 }}
      className={`border-b border-zinc-700/40 last:border-b-0${isCancelled ? "opacity-60" : ""}${isPast && !isCancelled ? "opacity-70" : ""}`}
    >
      <div className="w-full py-6 sm:py-5 md:py-6">
        <div className="flex flex-col items-center space-y-3 text-center lg:hidden">
          <div className="mb-1">
            <span
              className={`text-lg font-medium${isCancelled ? "text-zinc-500 line-through" : ""}`}
              style={{ letterSpacing: "0.05em" }}
            >
              {formatDate(show.date)}
            </span>
          </div>

          <div className="space-y-1">
            <div
              className={`text-base font-bold tracking-wide uppercase${
                isCancelled ? "text-zinc-500 line-through" : "text-white"
              }`}
            >
              {show.venue}
            </div>
            <div
              className={`text-sm tracking-wide uppercase${
                isCancelled ? "text-zinc-500" : "text-zinc-300"
              }`}
            >
              {show.city}
              {show.state ? `, ${show.state}` : ""}
            </div>
            {isCancelled && (
              <div className="text-sm font-semibold tracking-wide text-red-400 uppercase">
                Cancelled — {show.description || "Weather Conditions"}
              </div>
            )}
            {!isCancelled && !isPast && (
              <div className="text-sm tracking-wide text-amber-300 uppercase">
                {timeLabel ? `Starts at ${timeLabel}` : "TIME TBA"}
              </div>
            )}
          </div>

          {!isPast && !isCancelled && (
            <div className="flex w-full justify-center pt-2">
              <ClientOnlyCalendarButton>
                <AddToCalendarButton
                  name={`Noah Lynch at ${show.venue}`}
                  startDate={show.date}
                  endDate={show.date}
                  startTime={show.startTimeLocal || ""}
                  endTime={show.endTimeLocal || ""}
                  timeZone={show.timezone || "America/Chicago"}
                  location={`${show.venue}, ${show.city}${show.state ? `, ${show.state}` : ""}`}
                  options={["Google", "Apple", "Outlook.com"]}
                  size="3"
                />
              </ClientOnlyCalendarButton>
            </div>
          )}
        </div>

        <div className="hidden grid-cols-1 items-center gap-4 lg:grid lg:grid-cols-12 lg:gap-6">
          <div className="text-left md:col-span-2">
            <span
              className={`text-lg font-medium${isCancelled ? "text-zinc-500 line-through" : ""}`}
              style={{ letterSpacing: "0.05em" }}
            >
              {formatDate(show.date)}
            </span>
          </div>

          <div className="min-w-0 text-left md:col-span-3 lg:col-span-4">
            <div
              className={`truncate text-sm font-bold tracking-wide uppercase md:text-base${
                isCancelled ? "text-zinc-500 line-through" : "text-white"
              }`}
            >
              {show.venue}
            </div>
          </div>

          <div className="min-w-0 text-left md:col-span-2 lg:col-span-2">
            <div
              className={`truncate text-sm tracking-wide uppercase md:text-base${
                isCancelled ? "text-zinc-500" : "text-zinc-300"
              }`}
            >
              {show.city}
              {show.state ? `, ${show.state}` : ""}
            </div>
          </div>

          <div className="text-left md:col-span-2 md:text-center lg:col-span-2">
            {!isCancelled && !isPast && (
              <div className="truncate text-xs font-medium tracking-wide text-amber-300 uppercase md:text-sm">
                {timeLabel ? `Starts at ${timeLabel}` : "Time TBA"}
              </div>
            )}
          </div>

          <div className="flex justify-start md:col-span-3 md:justify-end lg:col-span-2">
            {!isPast && !isCancelled && (
              <ClientOnlyCalendarButton>
                <AddToCalendarButton
                  name={`Noah Lynch at ${show.venue}`}
                  startDate={show.date}
                  endDate={show.date}
                  startTime={show.startTimeLocal || ""}
                  endTime={show.endTimeLocal || ""}
                  timeZone={show.timezone || "America/Chicago"}
                  location={`${show.venue}, ${show.city}${show.state ? `, ${show.state}` : ""}`}
                  options={["Google", "Apple", "Outlook.com"]}
                  size="2"
                />
              </ClientOnlyCalendarButton>
            )}
            {isCancelled && (
              <div className="truncate text-xs font-semibold tracking-wide text-red-400 uppercase md:text-sm">
                Cancelled — {show.description || "Weather Conditions"}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TourDatesSection({ upcoming, past }: TourDatesSectionProps) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 z-0">
        <Image
          src="/venues/Bayou-Restaurant-Tiki-Bar/2026/IMG_7497.jpeg"
          alt="Bayou Restaurant Tiki Bar venue"
          fill
          className="object-cover opacity-40 blur-sm sm:object-[40%_30%] md:object-[45%_25%] lg:object-[20%_20%]"
          sizes="100vw"
          priority
          quality={75}
        />
        <div className="absolute inset-0 bg-linear-to-b from-zinc-950/85 via-zinc-950/70 to-zinc-950/90" />
      </div>

      <div className="relative z-20">
        <Navbar />
      </div>

      <div className="relative z-10 w-full pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 py-8 text-center sm:py-10 md:py-16"
        >
          <div className="mb-4 flex justify-center sm:mb-6">
            <Image
              src="/branding/NoahSignature.png"
              alt="Noah Lynch Signature"
              width={300}
              height={120}
              sizes="(max-width: 640px) 160px, (max-width: 768px) 224px, 256px"
              className="h-auto w-40 sm:w-56 md:w-64"
              priority
              quality={75}
            />
          </div>
          <h1 className="mb-2 text-4xl font-bold text-zinc-200 sm:mb-4 sm:text-5xl md:text-6xl">
            TOUR DATES
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-zinc-400 sm:text-base">
            All event times are shown in each venue&apos;s local timezone.
          </p>
        </motion.div>

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-12">
          {upcoming.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-lg text-zinc-300">MORE SHOWS COMING SOON</p>
            </div>
          )}
          {upcoming.map((show, index) => (
            <ShowCard key={show.id} show={show} index={index} />
          ))}
        </div>

        {past.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="mx-auto mt-16 w-full max-w-6xl px-4 sm:px-6 md:mt-20 md:px-12"
          >
            <div className="py-8 text-center md:py-12">
              <h3 className="mb-8 text-base font-bold tracking-wider text-zinc-200 uppercase sm:text-lg md:text-xl">
                PAST SHOWS
              </h3>
            </div>

            <div className="w-full">
              {past.map((show, index) => (
                <ShowCard key={show.id} show={show} index={index} isPast />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
