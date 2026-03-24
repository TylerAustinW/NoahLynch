import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { unstable_noStore as noStore } from "next/cache";
import { isShowUpcoming, resolveShows, sortShowsForDisplay } from "./helpers";
import type { TourDate, TourEvent, Venue } from "./models/tour.model";

async function readJsonFile<T>(relativePath: string): Promise<T> {
  const absolutePath = path.join(process.cwd(), relativePath);
  const fileContents = await readFile(absolutePath, "utf8");
  return JSON.parse(fileContents) as T;
}

export async function getTourPageData(): Promise<{ upcoming: TourDate[]; past: TourDate[] }> {
  noStore();

  const [venues, events] = await Promise.all([
    readJsonFile<Record<string, Venue>>("lib/data/tour/data/venues.data.json"),
    readJsonFile<TourEvent[]>("lib/data/tour/data/shows.data.json"),
  ]);

  const shows = resolveShows(events, venues);

  return {
    upcoming: sortShowsForDisplay(shows.filter((show) => isShowUpcoming(show)), "asc"),
    past: sortShowsForDisplay(shows.filter((show) => !isShowUpcoming(show)), "desc"),
  };
}
