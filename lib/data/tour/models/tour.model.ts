export type TourEventStatus = "scheduled" | "cancelled" | "postponed" | "sold-out";

export interface TourEvent {
  id: string;
  venueId: string;
  date: string; // YYYY-MM-DD in venue local date
  startTimeLocal?: string; // HH:mm in venue local time
  endTimeLocal?: string; // HH:mm in venue local time
  actionLink?: string;
  actionText?: string;
  description?: string;
  featured?: boolean;
  status?: TourEventStatus;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  timezone: string; // IANA timezone, ex: America/Chicago
  defaultLink?: string;
}

export interface TourDate {
  id: string;
  venueId: string;
  date: string;
  venue: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
  startTimeLocal?: string;
  endTimeLocal?: string;
  actionLink?: string;
  actionText?: string;
  description?: string;
  featured?: boolean;
  status: TourEventStatus;
}

export interface ShowNotificationConfig {
  hasUpcomingShow: boolean;
  date: string;
  time: string;
  venue: string;
  location: string;
  ticketUrl: string;
}
