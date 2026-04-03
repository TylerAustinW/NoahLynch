import { EVENTS_DATA, VENUES } from "./data/shows.data";
import { isShowUpcoming, resolveShows, sortShowsForDisplay } from "./helpers";
import type { TourDate, Venue } from "./models/tour.model";

/**
 * Tour data access layer.
 * Replaced class with plain functions — the data is static imports,
 * so mutation methods (addShow/updateShow/removeShow) were removed
 * since they only mutated an in-memory copy with no persistence.
 */

const allShows: TourDate[] = resolveShows(EVENTS_DATA, VENUES);

export function getAllShows(): TourDate[] {
  return allShows;
}

export function getUpcomingShows(): TourDate[] {
  return sortShowsForDisplay(
    allShows.filter((show) => isShowUpcoming(show)),
    "asc",
  );
}

export function getPastShows(): TourDate[] {
  return sortShowsForDisplay(
    allShows.filter((show) => !isShowUpcoming(show)),
    "desc",
  );
}

export function getNextShow(): TourDate | null {
  return getUpcomingShows()[0] ?? null;
}

export function getFeaturedShows(): TourDate[] {
  return getUpcomingShows().filter((show) => show.featured);
}

export function getShowsSortedByDate(): TourDate[] {
  return [...getUpcomingShows(), ...getPastShows()];
}

export function findShowById(id: string): TourDate | undefined {
  return allShows.find((show) => show.id === id);
}

export function getAllVenues(): Venue[] {
  return Object.values(VENUES);
}

export function getVenueById(id: string): Venue | undefined {
  return VENUES[id];
}

export function getShowsByVenue(venueId: string): TourDate[] {
  return allShows.filter((show) => show.venueId === venueId);
}

// Backwards compatibility — export an object matching the old class interface
export const tourRepository = {
  getAllShows,
  getUpcomingShows,
  getPastShows,
  getNextShow,
  getFeaturedShows,
  getShowsSortedByDate,
  findShowById,
  isShowUpcoming,
  getAllVenues,
  getVenueById,
  getShowsByVenue,
};
