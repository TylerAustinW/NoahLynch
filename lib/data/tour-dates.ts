import type { TourDate } from '../types/tour';

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

export const UPCOMING_TOUR_DATES_DATA: TourDate[] = [];

/**
 * Get all tour dates
 */
export function getAllTourDates(): TourDate[] {
  return [...UPCOMING_TOUR_DATES_DATA, ...TOUR_DATES_DATA];
}

/**
 * Get tour dates by upcoming status
 */
export function getTourDatesByUpcoming(upcoming: boolean): TourDate[] {
  return getAllTourDates().filter((date) => date.upcoming === upcoming);
}

/**
 * Get tour date by ID
 */
export function getTourDateById(id: number): TourDate | undefined {
  return getAllTourDates().find((date) => date.id === id);
}

/**
 * Get upcoming tour dates
 */
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
