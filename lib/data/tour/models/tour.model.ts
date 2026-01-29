export interface TourDate {
  id: string;
  date: string;
  venue: string;
  city: string;
  state: string;
  enabled: boolean;
  time?: string;
  actionLink?: string;
  actionText?: string;
  description?: string;
  featured?: boolean;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  state: string;
  defaultLink?: string;
}

export interface ShowNotificationConfig {
  hasUpcomingShow: boolean;
  date: string;
  time: string;
  venue: string;
  location: string;
  ticketUrl: string;
}
