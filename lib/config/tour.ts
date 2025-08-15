import type { ShowNotificationConfig, TourDate, TourDateWithStatus } from '@/lib/types/tour';
import { getDaysUntilShow, isPast, isToday, isUpcoming } from '@/lib/utils/date';

export const SHOW_INFO: ShowNotificationConfig = {
  hasUpcomingShow: true,
  date: '2025-08-16',
  time: '7:00 PM CDT',
  venue: 'The Roof at 1311',
  location: 'Vicksburg, MS',
  ticketUrl: '/tour-dates',
};

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

export function enhanceTourDates(tourDates: TourDate[]): TourDateWithStatus[] {
  return tourDates.map(enhanceTourDate);
}

export function getNextTourDate(tourDates: TourDate[]): TourDateWithStatus | null {
  const upcomingDates = tourDates
    .filter((date) => isUpcoming(date.date))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return upcomingDates.length > 0 ? enhanceTourDate(upcomingDates[0]) : null;
}
