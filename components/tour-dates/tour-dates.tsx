"use client";

import { formatTourDate, formatTourTimeRange, type TourDate } from "@/lib/data/tour";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Image from "next/image";
import { getGoogleMapsUrl } from "@/lib/utils/date.utils";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import { useState, useEffect } from "react";

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

function ActionButton({
  isCancelled,
  show,
  variant = "mobile",
}: {
  isCancelled: boolean;
  show: TourDate;
  variant?: "mobile" | "desktop";
}) {
  if (isCancelled) {
    const cancelledClasses =
      variant === "mobile"
        ? "inline-block w-full cursor-not-allowed border border-red-800/50 px-6 py-3 text-center text-sm font-medium tracking-wider text-red-400/70 uppercase"
        : "inline-block cursor-not-allowed border border-red-800/50 px-6 py-2 text-xs font-medium tracking-wider text-red-400/70 uppercase md:text-sm";

    return (
      <button disabled className={cancelledClasses}>
        Cancelled
      </button>
    );
  }

  if (show.actionLink) {
    const linkClasses =
      variant === "mobile"
        ? "inline-block w-full border border-zinc-500 px-6 py-3 text-center text-sm font-medium tracking-wider text-zinc-300 uppercase transition-all duration-300 hover:border-amber-500 hover:text-amber-400 active:bg-amber-500/10"
        : "inline-block border border-zinc-500 px-6 py-2 text-xs font-medium tracking-wider text-zinc-300 uppercase transition-all duration-300 hover:border-amber-500 hover:text-amber-400 md:text-sm";

    return (
      <a href={show.actionLink} target="_blank" rel="noopener noreferrer" className={linkClasses}>
        {show.actionText || "Tickets"}
      </a>
    );
  }

  const directionsClasses =
    variant === "mobile"
      ? "inline-block w-full border border-zinc-500 px-6 py-3 text-center text-sm font-medium tracking-wider text-zinc-300 uppercase transition-all duration-300 hover:border-amber-500 hover:text-amber-400 active:bg-amber-500/10"
      : "inline-block border border-zinc-500 px-4 py-2 text-xs font-medium tracking-wider text-zinc-300 uppercase transition-all duration-300 hover:border-amber-500 hover:text-amber-400 md:px-5 md:text-sm";

  const googleMapsUrl = getGoogleMapsUrl(show.venue, show.city, show.state || "");

  return (
    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className={directionsClasses}>
      Directions
    </a>
  );
}

interface TourDatesSectionProps {
  upcoming: TourDate[];
  past: TourDate[];
}

export default function TourDatesSection({ upcoming, past }: TourDatesSectionProps) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 z-0">
        <Image
          src="/venues/Bayou-Restaurant-Tiki-Bar/IMG_7497.jpeg"
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
          {upcoming.map((show, index) => {
            const timeLabel = formatTourTimeRange(show);
            const isCancelled = show.status === "cancelled";

            return (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.2 }}
                className={`border-b border-zinc-700/40 last:border-b-0${isCancelled ? "opacity-60" : ""}`}
              >
                <div className="w-full py-6 sm:py-5 md:py-6">
                  <div className="flex flex-col items-center space-y-3 text-center lg:hidden">
                    <div className="mb-1">
                      <span
                        className={`text-lg font-medium${isCancelled ? "text-zinc-500 line-through" : ""}`}
                        style={{ letterSpacing: "0.05em" }}
                      >
                        {formatTourDate(show.date)}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div
                        className={`text-base font-bold tracking-wide uppercase${isCancelled ? "text-zinc-500 line-through" : "text-white"}`}
                      >
                        {show.venue}
                      </div>
                      <div
                        className={`text-sm tracking-wide uppercase${isCancelled ? "text-zinc-500" : "text-zinc-300"}`}
                      >
                        {show.city}
                        {show.state ? `, ${show.state}` : ""}
                      </div>
                      {isCancelled ? (
                        <div className="text-sm font-semibold tracking-wide text-red-400 uppercase">
                          Cancelled — {show.description || "Weather Conditions"}
                        </div>
                      ) : (
                        <div className="text-sm tracking-wide text-amber-300 uppercase">
                          {timeLabel ?? "TIME TBA"}
                        </div>
                      )}
                    </div>

                    <div className="flex w-full justify-center pt-2">
                      {!isCancelled && show.startTimeLocal && show.endTimeLocal ? (
                        <ClientOnlyCalendarButton>
                          <AddToCalendarButton
                            name={`Noah Lynch at ${show.venue}`}
                            startDate={show.date}
                            endDate={show.date}
                            startTime={show.startTimeLocal}
                            endTime={show.endTimeLocal}
                            timeZone={show.timezone}
                            location={`${show.venue}, ${show.city}${show.state ? `, ${show.state}` : ""}`}
                            options={["Google", "Apple", "Outlook.com"]}
                            size="3"
                          />
                        </ClientOnlyCalendarButton>
                      ) : (
                        <ActionButton isCancelled={isCancelled} show={show} variant="mobile" />
                      )}
                    </div>
                  </div>

                  <div className="hidden grid-cols-1 items-center gap-4 lg:grid lg:grid-cols-12 lg:gap-6">
                    <div className="text-left md:col-span-2">
                      <span
                        className={`text-lg font-medium${isCancelled ? "text-zinc-500 line-through" : ""}`}
                        style={{ letterSpacing: "0.05em" }}
                      >
                        {formatTourDate(show.date)}
                      </span>
                    </div>

                    <div className="min-w-0 text-left md:col-span-3 lg:col-span-4">
                      <div
                        className={`truncate text-sm font-bold tracking-wide uppercase md:text-base${isCancelled ? "text-zinc-500 line-through" : "text-white"}`}
                      >
                        {show.venue}
                      </div>
                    </div>

                    <div className="min-w-0 text-left md:col-span-2 lg:col-span-2">
                      <div
                        className={`truncate text-sm tracking-wide uppercase md:text-base${isCancelled ? "text-zinc-500" : "text-zinc-300"}`}
                      >
                        {show.city}
                        {show.state ? `, ${show.state}` : ""}
                      </div>
                    </div>

                    <div className="text-left md:col-span-2 md:text-center lg:col-span-2">
                      {isCancelled ? (
                        <div className="truncate text-xs font-semibold tracking-wide text-red-400 uppercase md:text-sm">
                          Cancelled
                        </div>
                      ) : (
                        <div className="truncate text-xs font-medium tracking-wide text-amber-300 uppercase md:text-sm">
                          {timeLabel ?? "Time TBA"}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-start md:col-span-3 md:justify-end lg:col-span-2">
                      {!isCancelled && show.startTimeLocal && show.endTimeLocal ? (
                        <ClientOnlyCalendarButton>
                          <AddToCalendarButton
                            name={`Noah Lynch at ${show.venue}`}
                            startDate={show.date}
                            endDate={show.date}
                            startTime={show.startTimeLocal}
                            endTime={show.endTimeLocal}
                            timeZone={show.timezone}
                            location={`${show.venue}, ${show.city}${show.state ? `, ${show.state}` : ""}`}
                            options={["Google", "Apple", "Outlook.com"]}
                            size="2"
                          />
                        </ClientOnlyCalendarButton>
                      ) : (
                        <ActionButton isCancelled={isCancelled} show={show} variant="desktop" />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {past.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="mx-auto mt-16 w-full max-w-6xl px-4 sm:px-6 md:mt-20 md:px-12"
          >
            <div className="py-8 text-center md:py-12">
              <h3 className="mb-8 text-base font-bold tracking-wider text-zinc-500 uppercase sm:text-lg md:text-xl">
                PAST SHOWS
              </h3>
            </div>

            <div className="w-full">
              {past.map((show) => {
                const isCancelled = show.status === "cancelled";

                return (
                  <div
                    key={show.id}
                    className={`border-b border-zinc-700/20 last:border-b-0${isCancelled ? "opacity-70" : ""}`}
                  >
                    <div className="w-full py-4 sm:py-3 md:py-4">
                      <div className="flex flex-col space-y-2 lg:hidden">
                        <div className="mb-1">
                          <span
                            className={`text-lg font-medium${isCancelled ? "text-zinc-500 line-through" : ""}`}
                            style={{ letterSpacing: "0.05em" }}
                          >
                            {formatTourDate(show.date)}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div
                            className={`text-sm font-semibold tracking-wide uppercase${isCancelled ? "text-zinc-500 line-through" : "text-zinc-200"}`}
                          >
                            {show.venue}
                          </div>
                          <div
                            className={`text-xs tracking-wide uppercase${isCancelled ? "text-zinc-500" : "text-zinc-300"}`}
                          >
                            {show.city}
                            {show.state ? `, ${show.state}` : ""}
                          </div>
                          {isCancelled && (
                            <div className="text-xs font-semibold tracking-wide text-red-400 uppercase">
                              Cancelled — {show.description || "Weather Conditions"}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="hidden grid-cols-1 items-center gap-4 lg:grid lg:grid-cols-12 lg:gap-6">
                        <div className="text-left md:col-span-4">
                          <span
                            className={`text-lg font-medium${isCancelled ? "text-zinc-500 line-through" : ""}`}
                            style={{ letterSpacing: "0.05em" }}
                          >
                            {formatTourDate(show.date)}
                          </span>
                        </div>

                        <div className="text-left md:col-span-4">
                          <div
                            className={`text-sm font-bold tracking-wide uppercase md:text-base${isCancelled ? "text-zinc-500 line-through" : "text-white"}`}
                          >
                            {show.venue}
                          </div>
                        </div>

                        <div className="text-left md:col-span-2">
                          <div
                            className={`text-sm tracking-wide uppercase md:text-base${isCancelled ? "text-zinc-500" : "text-zinc-300"}`}
                          >
                            {show.city}
                            {show.state ? `, ${show.state}` : ""}
                          </div>
                        </div>

                        <div className="text-left md:col-span-2 md:text-right">
                          {isCancelled ? (
                            <div className="text-xs font-semibold tracking-wide text-red-400 uppercase md:text-sm">
                              Cancelled
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
