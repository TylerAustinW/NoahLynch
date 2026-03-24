import type { TourDate, TourEvent, Venue } from "../models/tour.model";
import { resolveShows } from "../helpers";
import venuesData from "./venues.data.json";
import eventsData from "./shows.data.json";

export const VENUES: Record<string, Venue> = venuesData as Record<string, Venue>;
export const EVENTS_DATA: TourEvent[] = eventsData as TourEvent[];
export const SHOWS_DATA: TourDate[] = resolveShows(EVENTS_DATA, VENUES);
