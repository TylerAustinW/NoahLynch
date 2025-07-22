import type { TourDate, TourDateWithStatus, ShowNotificationConfig } from '../types/tour';
import { getDaysUntilShow, isUpcoming, isPast, isToday } from '../utils/date';

/**
 * Show status configuration - toggle hasUpcomingShow to update display
 */
export const SHOW_INFO: ShowNotificationConfig = {
  hasUpcomingShow: true,
  date: 'August 16, 2025',
  time: '7:00 PM - 10:00 PM CDT',
  venue: 'The Roof at 1311',
  location: 'Vicksburg, MS',
  ticketUrl: '/tour-dates', // Link to full tour dates page
};

/**
 * Enhance tour date with calculated status information
 */
export function enhanceTourDate(tourDate: TourDate): TourDateWithStatus {
  const daysUntilShow = getDaysUntilShow(tourDate.date);

  return {
    ...tourDate,
    daysUntilShow,
    isUpcoming: isUpcoming(tourDate.date),
    isPast: isPast(tourDate.date),
    isToday: isToday(tourDate.date),
  };
}

/**
 * Enhance multiple tour dates with status information
 */
export function enhanceTourDates(tourDates: TourDate[]): TourDateWithStatus[] {
  return tourDates.map(enhanceTourDate);
}

/**
 * Get the next upcoming tour date
 */
export function getNextTourDate(tourDates: TourDate[]): TourDateWithStatus | null {
  const upcomingDates = tourDates
    .filter((date) => isUpcoming(date.date))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return upcomingDates.length > 0 ? enhanceTourDate(upcomingDates[0]) : null;
}

/**
 * Filter tour dates by status
 */
export function filterTourDatesByStatus(
  tourDates: TourDate[],
  status: 'upcoming' | 'past' | 'today'
): TourDateWithStatus[] {
  return enhanceTourDates(tourDates).filter((date) => {
    switch (status) {
      case 'upcoming':
        return date.isUpcoming;
      case 'past':
        return date.isPast;
      case 'today':
        return date.isToday;
      default:
        return false;
    }
  });
}

/**
 * Sort tour dates chronologically
 */
export function sortTourDates(tourDates: TourDate[], order: 'asc' | 'desc' = 'asc'): TourDate[] {
  return [...tourDates].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });
}
