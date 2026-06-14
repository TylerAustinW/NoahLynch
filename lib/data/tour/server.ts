import "server-only";

import { EVENTS_DATA, VENUES } from "./data/shows.data";
import { isShowUpcoming, resolveShows, sortShowsForDisplay } from "./helpers";
import type { TourDate } from "./models/tour.model";

export async function getTourPageData(): Promise<{ upcoming: TourDate[]; past: TourDate[] }> {
  const shows = resolveShows(EVENTS_DATA, VENUES);

  return {
    upcoming: sortShowsForDisplay(
      shows.filter((show) => isShowUpcoming(show) && show.status !== "cancelled"),
      "asc",
    ),
    past: sortShowsForDisplay(
      shows.filter((show) => !isShowUpcoming(show) || show.status === "cancelled"),
      "desc",
    ),
  };
}
