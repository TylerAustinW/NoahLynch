import type { TourDate } from '@/lib/types/tour';

export const TOUR_DATES_DATA: TourDate[] = [
  {
    id: 1,
    date: '2025-06-14',
    venue: 'Magnolia Blues BBQ Company',
    city: 'Brookhaven',
    state: 'MS',
    upcoming: false,
  },
  {
    id: 2,
    date: '2025-02-01',
    venue: 'Rushing RoadHouse',
    city: 'Jefferson County',
    state: 'MS',
    upcoming: false,
  },
];

export const UPCOMING_TOUR_DATES_DATA: TourDate[] = [
  {
    id: 3,
    date: '2025-08-16',
    venue: 'The Roof at 1311',
    city: 'Vicksburg',
    state: 'MS',
    time: '7:00 PM CDT',
    ticketLink: 'https://www.bandsintown.com/e/107129318-noah-lynch-at-the-roof-at-1311?came_from=267&utm_medium=web&utm_source=artist_page&utm_campaign=ticket_rsvp',
    upcoming: true,
    featured: true,
    description: 'Free entry! Join Noah Lynch for a live performance at The Roof on the 3rd floor.',
  },
];

export function getAllTourDates(): TourDate[] {
  return [...UPCOMING_TOUR_DATES_DATA, ...TOUR_DATES_DATA];
}

export function getTourDatesByUpcoming(upcoming: boolean): TourDate[] {
  return getAllTourDates().filter((date) => date.upcoming === upcoming);
}

export function getTourDateById(id: number): TourDate | undefined {
  return getAllTourDates().find((date) => date.id === id);
}

export function getUpcomingTourDates(): TourDate[] {
  return UPCOMING_TOUR_DATES_DATA;
}

/**
 * Get past tour dates
 */
export function getPastTourDates(): TourDate[] {
  return TOUR_DATES_DATA.filter((date) => !date.upcoming);
}

/**
 * Get featured tour dates
 */
export function getFeaturedTourDates(): TourDate[] {
  return getAllTourDates().filter((date) => date.featured);
}

/**
 * Check if there are any upcoming tour dates
 */
export function hasUpcomingTourDates(): boolean {
  return UPCOMING_TOUR_DATES_DATA.length > 0;
}
