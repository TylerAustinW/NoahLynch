import type { TourDate, TourEvent, Venue } from "./models/tour.model";

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

export function resolveShows(
  events: TourEvent[],
  venues: Record<string, Venue>,
): TourDate[] {
  return events.reduce<TourDate[]>((resolved, event) => {
    const venue = venues[event.venueId];
    if (!venue) {
      return resolved;
    }

    const actionLink = event.actionLink ?? venue.defaultLink;
    const actionText = event.actionText ?? (actionLink ? "Tickets" : undefined);

    const show: TourDate = {
      id: event.id,
      venueId: event.venueId,
      date: event.date,
      venue: venue.name,
      city: venue.city,
      state: venue.state,
      country: venue.country,
      timezone: venue.timezone,
      featured: event.featured ?? false,
      status: event.status ?? "scheduled",
      ...(event.startTimeLocal ? { startTimeLocal: event.startTimeLocal } : {}),
      ...(event.endTimeLocal ? { endTimeLocal: event.endTimeLocal } : {}),
      ...(actionLink ? { actionLink } : {}),
      ...(actionText ? { actionText } : {}),
      ...(event.description ? { description: event.description } : {}),
    };

    resolved.push(show);
    return resolved;
  }, []);
}

export function formatTourDate(dateString: string): string {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year ?? 1970, (month ?? 1) - 1, day ?? 1));
  return DATE_FORMATTER.format(date).toUpperCase();
}

export function formatTourTimeRange(show: Pick<TourDate, "startTimeLocal" | "endTimeLocal">): string | null {
  if (!show.startTimeLocal && !show.endTimeLocal) {
    return null;
  }

  if (show.startTimeLocal && show.endTimeLocal) {
    return `${formatTourTime(show.startTimeLocal)} – ${formatTourTime(show.endTimeLocal)}`;
  }

  if (show.startTimeLocal) {
    return `Starts at ${formatTourTime(show.startTimeLocal)}`;
  }

  return `Until ${formatTourTime(show.endTimeLocal!)}`;
}

export function isShowTodayLocal(show: Pick<TourDate, "date" | "timezone">, now = new Date()): boolean {
  const zonedNow = getZonedNow(show.timezone, now);
  return show.date === zonedNow.date;
}

export function isShowUpcoming(show: Pick<TourDate, "date" | "timezone" | "startTimeLocal" | "endTimeLocal">, now = new Date()): boolean {
  const zonedNow = getZonedNow(show.timezone, now);
  const nowKey = `${zonedNow.date}T${zonedNow.time}`;
  const showKey = `${show.date}T${show.endTimeLocal ?? show.startTimeLocal ?? "23:59"}`;

  return showKey >= nowKey;
}

export function sortShowsForDisplay(shows: TourDate[], direction: "asc" | "desc" = "asc"): TourDate[] {
  return [...shows].sort((a, b) => {
    const aKey = `${a.date}T${a.startTimeLocal ?? "23:59"}`;
    const bKey = `${b.date}T${b.startTimeLocal ?? "23:59"}`;

    return direction === "asc" ? aKey.localeCompare(bKey) : bKey.localeCompare(aKey);
  });
}

function formatTourTime(timeString: string): string {
  const [hourString, minuteString = "00"] = timeString.split(":");
  const hour = Number(hourString);
  const minutes = minuteString.padStart(2, "0");
  const period = hour >= 12 ? "PM" : "AM";
  const normalizedHour = hour % 12 || 12;

  return `${normalizedHour}:${minutes} ${period}`;
}

function getZonedNow(timezone: string, now = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = Object.fromEntries(
    formatter
      .formatToParts(now)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );

  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    time: `${parts.hour}:${parts.minute}`,
  };
}
