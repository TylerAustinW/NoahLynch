import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-").map(Number) as [number, number, number];
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTime(timeString: string): string {
  const [hourString, minuteString = "00"] = timeString.split(":");
  const hour = Number(hourString);
  const minutes = minuteString.padStart(2, "0");
  const period = hour >= 12 ? "PM" : "AM";
  const normalizedHour = hour % 12 || 12;

  return `${normalizedHour}:${minutes} ${period}`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
