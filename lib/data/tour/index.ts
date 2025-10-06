// Re-export everything from the tour system
export type { TourDate, Venue, ShowNotificationConfig } from "./models/tour.model";
export { ShowStatus } from "./models/tour.model";
export { tourRepository } from "./repository/tour.repository";
export { VENUES } from "./data/shows.data";

// Import the repository to use for function exports
import { tourRepository } from "./repository/tour.repository";

// Convenience exports for common operations
export const getAllShows = () => tourRepository.getAllShows();
export const getUpcomingShows = () => tourRepository.getUpcomingShows();
export const getPastShows = () => tourRepository.getPastShows();
export const getNextShow = () => tourRepository.getNextShow();
export const getFeaturedShows = () => tourRepository.getFeaturedShows();
export const getShowsSortedByDate = () => tourRepository.getShowsSortedByDate();
export const addShow = (showData: Parameters<typeof tourRepository.addShow>[0]) =>
  tourRepository.addShow(showData);
export const updateShow = (id: string, updates: Parameters<typeof tourRepository.updateShow>[1]) =>
  tourRepository.updateShow(id, updates);
export const removeShow = (id: string) => tourRepository.removeShow(id);
export const findShowById = (id: string) => tourRepository.findShowById(id);
export const isShowUpcoming = (show: Parameters<typeof tourRepository.isShowUpcoming>[0]) =>
  tourRepository.isShowUpcoming(show);
export const getAllVenues = () => tourRepository.getAllVenues();
export const getVenueById = (id: string) => tourRepository.getVenueById(id);
export const getShowsByVenue = (venueId: string) => tourRepository.getShowsByVenue(venueId);
