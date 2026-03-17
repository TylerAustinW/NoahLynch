import { SHOWS_DATA, VENUES } from "../data/shows.data";
import type { TourDate, Venue } from "../models/tour.model";

class TourRepository {
  private shows: TourDate[] = [...SHOWS_DATA];

  getAllShows(): TourDate[] {
    return [...this.shows];
  }

  getUpcomingShows(): TourDate[] {
    return this.shows
      .filter((show) => this.isShowUpcoming(show))
      .sort((a, b) => this.parseShowDate(a.date).getTime() - this.parseShowDate(b.date).getTime());
  }

  getPastShows(): TourDate[] {
    return this.shows
      .filter((show) => !this.isShowUpcoming(show))
      .sort((a, b) => this.parseShowDate(b.date).getTime() - this.parseShowDate(a.date).getTime());
  }

  getNextShow(): TourDate | null {
    const upcomingShows = this.shows
      .filter((show) => this.isShowUpcoming(show))
      .sort((a, b) => this.parseShowDate(a.date).getTime() - this.parseShowDate(b.date).getTime());

    return upcomingShows.length > 0 ? upcomingShows[0]! : null;
  }

  getFeaturedShows(): TourDate[] {
    return this.shows.filter((show) => show.featured);
  }

  getShowsSortedByDate(): TourDate[] {
    return this.shows.sort((a, b) => {
      const aIsUpcoming = this.isShowUpcoming(a);
      const bIsUpcoming = this.isShowUpcoming(b);

      if (aIsUpcoming && bIsUpcoming) {
        return this.parseShowDate(a.date).getTime() - this.parseShowDate(b.date).getTime();
      }

      if (!aIsUpcoming && !bIsUpcoming) {
        return this.parseShowDate(b.date).getTime() - this.parseShowDate(a.date).getTime();
      }

      return aIsUpcoming ? -1 : 1;
    });
  }

  addShow(showData: Omit<TourDate, "id">): TourDate {
    const newShow: TourDate = {
      ...showData,
      id: this.generateId(showData.date, showData.venue),
    };

    this.shows.push(newShow);
    return newShow;
  }

  updateShow(id: string, updates: Partial<TourDate>): void {
    const index = this.shows.findIndex((show) => show.id === id);
    if (index !== -1) {
      this.shows[index] = { ...this.shows[index]!, ...updates };
    }
  }

  removeShow(id: string): void {
    this.shows = this.shows.filter((show) => show.id !== id);
  }

  findShowById(id: string): TourDate | undefined {
    return this.shows.find((show) => show.id === id);
  }

  isShowUpcoming(show: TourDate): boolean {
    const showDate = this.parseShowDate(show.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return showDate >= today;
  }

  private parseShowDate(date: string): Date {
    const [year, month, day] = date.split("-").map(Number);
    if (!year || !month || !day) {
      return new Date(date);
    }

    return new Date(year, month - 1, day);
  }

  private generateId(date: string, venue: string): string {
    const dateStr = date.replace(/-/g, "-");
    const venueStr = venue
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    return `show-${dateStr}-${venueStr}`;
  }

  getAllVenues(): Venue[] {
    return Object.values(VENUES);
  }

  getVenueById(id: string): Venue | undefined {
    return VENUES[id];
  }

  getShowsByVenue(venueId: string): TourDate[] {
    const venue = this.getVenueById(venueId);
    if (!venue) return [];

    return this.shows.filter((show) => show.venue === venue.name);
  }
}

export const tourRepository = new TourRepository();
