import type { DateFormatOptions } from "@/lib/types";

export function formatDate(dateString: string, options: DateFormatOptions = {}): string {
  const { includeYear = true, format = "long" } = options;

  const parts = dateString.split("-").map(Number);
  const year = parts[0] ?? new Date().getFullYear();
  const month = parts[1] ?? 1;
  const day = parts[2] ?? 1;

  const date = new Date(year, month - 1, day);

  const formatOptions: Intl.DateTimeFormatOptions = {
    month: format,
    day: "numeric",
  };

  if (includeYear) {
    formatOptions.year = "numeric";
  }

  return date.toLocaleDateString("en-US", formatOptions);
}

export function isDateToday(dateString: string): boolean {
  const parts = dateString.split("-").map(Number);
  const year = parts[0] ?? new Date().getFullYear();
  const month = parts[1] ?? 1;
  const day = parts[2] ?? 1;

  const date = new Date(year, month - 1, day);
  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

export function getGoogleMapsUrl(venue: string, city: string, state: string): string {
  const query = encodeURIComponent(`${venue} ${city} ${state}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
