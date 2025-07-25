export type {
  TourDate,
  TourDateWithStatus,
  ShowNotificationConfig,
  DateFormatOptions,
  ValidationResult,
} from './types/tour';

import {
  getAllTourDates,
  getTourDatesByUpcoming,
  getTourDateById,
  getUpcomingTourDates,
  getPastTourDates,
  getFeaturedTourDates,
  hasUpcomingTourDates,
  getTourDatesSortedByClosest,
} from './data/tour/tour-dates';

import { enhanceTourDates, SHOW_INFO } from './config/tour';
import { formatDate, getDaysUntilShow } from './utils/date';
export const tourDatesData = getAllTourDates();
export const upcomingTourDates = getUpcomingTourDates();
export const pastTourDates = getPastTourDates();
export const featuredTourDates = getFeaturedTourDates();

export {
  getAllTourDates,
  getTourDatesByUpcoming,
  getTourDateById,
  getUpcomingTourDates,
  getPastTourDates,
  getFeaturedTourDates,
  hasUpcomingTourDates,
  getTourDatesSortedByClosest,
  enhanceTourDates,
  formatDate,
  getDaysUntilShow,
  SHOW_INFO,
};
