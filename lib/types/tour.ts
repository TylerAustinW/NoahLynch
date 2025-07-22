export interface TourDate {
  id: number;
  date: string;
  venue: string;
  city: string;
  state: string;
  time?: string;
  ticketLink?: string;
  soldOut?: boolean;
  description?: string;
  featured?: boolean;
  upcoming?: boolean;
}

export interface TourDateWithStatus extends TourDate {
  daysUntilShow: number;
  isUpcoming: boolean;
  isPast: boolean;
  isToday: boolean;
}

export interface ShowNotificationConfig {
  hasUpcomingShow: boolean;
  date: string;
  time: string;
  venue: string;
  location: string;
  ticketUrl: string;
}

export interface DateFormatOptions {
  includeYear?: boolean;
  includeTime?: boolean;
  format?: 'short' | 'long' | 'numeric';
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
