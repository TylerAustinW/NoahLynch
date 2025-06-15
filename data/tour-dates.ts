// Central place to maintain upcoming shows.
// Add new objects to the array below (or wire this up to a CMS / API later).
export interface TourDate {
  id: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  ticketUrl: string;
  featured?: boolean;
  description?: string;
  parkingInfo?: string;
  additionalInfo?: string;
  mapUrl?: string;
}

// Start with an empty list; the Tour section will automatically
// fall back to a “More Shows Coming Soon!” placeholder when this is empty.
export const tourDates: TourDate[] = [];
