import { EVENTS_DATA, VENUES } from "../data/shows.data";
import { isShowUpcoming, resolveShows, sortShowsForDisplay } from "../helpers";
import type { TourDate, TourEvent, Venue } from "../models/tour.model";

class TourRepository {
  private events: TourEvent[] = [...EVENTS_DATA];

  private get shows(): TourDate[] {
    return resolveShows(this.events, VENUES);
  }

  getAllShows(): TourDate[] {
    return this.shows;
  }

  getUpcomingShows(): TourDate[] {
    return sortShowsForDisplay(this.shows.filter((show) => isShowUpcoming(show)), "asc");
  }

  getPastShows(): TourDate[] {
    return sortShowsForDisplay(this.shows.filter((show) => !isShowUpcoming(show)), "desc");
  }

  getNextShow(): TourDate | null {
    return this.getUpcomingShows()[0] ?? null;
  }

  getFeaturedShows(): TourDate[] {
    return this.getUpcomingShows().filter((show) => show.featured);
  }

  getShowsSortedByDate(): TourDate[] {
    return [...this.getUpcomingShows(), ...this.getPastShows()];
  }

  addShow(showData: Omit<TourEvent, "id">): TourEvent {
    const newShow: TourEvent = {
      ...showData,
      id: this.generateId(showData.date, showData.venueId),
      status: showData.status ?? "scheduled",
    };

    this.events.push(newShow);
    return newShow;
  }

  updateShow(id: string, updates: Partial<TourEvent>): void {
    const index = this.events.findIndex((show) => show.id === id);
    if (index !== -1) {
      this.events[index] = { ...this.events[index]!, ...updates };
    }
  }

  removeShow(id: string): void {
    this.events = this.events.filter((show) => show.id !== id);
  }

  findShowById(id: string): TourDate | undefined {
    return this.shows.find((show) => show.id === id);
  }

  isShowUpcoming(show: TourDate): boolean {
    return isShowUpcoming(show);
  }

  getAllVenues(): Venue[] {
    return Object.values(VENUES);
  }

  getVenueById(id: string): Venue | undefined {
    return VENUES[id];
  }

  getShowsByVenue(venueId: string): TourDate[] {
    return this.shows.filter((show) => show.venueId === venueId);
  }

  private generateId(date: string, venueId: string): string {
    return `show-${date}-${venueId}`;
  }
}

export const tourRepository = new TourRepository();
