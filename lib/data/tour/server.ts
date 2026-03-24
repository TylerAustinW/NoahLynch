import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { unstable_noStore as noStore } from "next/cache";
import { EVENTS_DATA, VENUES } from "./data/shows.data";
import { isShowUpcoming, resolveShows, sortShowsForDisplay } from "./helpers";
import type { TourDate, TourEvent, Venue } from "./models/tour.model";

async function readJsonFile<T>(relativePath: string): Promise<T> {
  const absolutePath = path.join(process.cwd(), relativePath);
  const fileContents = await readFile(absolutePath, "utf8");
  return JSON.parse(fileContents) as T;
}

export async function getTourPageData(): Promise<{ upcoming: TourDate[]; past: TourDate[] }> {
  const isProduction = globalThis.process?.env.NODE_ENV === "production";

  const shows = isProduction ? resolveShows(EVENTS_DATA, VENUES) : await getFileBackedShows();

  return {
    upcoming: sortShowsForDisplay(shows.filter((show) => isShowUpcoming(show)), "asc"),
    past: sortShowsForDisplay(shows.filter((show) => !isShowUpcoming(show)), "desc"),
  };
}

async function getFileBackedShows(): Promise<TourDate[]> {
  noStore();

  try {
    const [venues, events] = await Promise.all([
      readJsonFile<Record<string, Venue>>("lib/data/tour/data/venues.data.json"),
      readJsonFile<TourEvent[]>("lib/data/tour/data/shows.data.json"),
    ]);

    return resolveShows(events, venues);
  } catch {
    return resolveShows(EVENTS_DATA, VENUES);
  }
}
