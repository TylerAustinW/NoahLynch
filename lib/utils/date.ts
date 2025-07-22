import type { DateFormatOptions } from '../types/tour';

/**
 * Format a date string avoiding timezone issues
 * @param dateString - Date in YYYY-MM-DD format
 * @param options - Formatting options
 * @returns Formatted date string
 */
export function formatDate(dateString: string, options: DateFormatOptions = {}): string {
  const { includeYear = true, format = 'long' } = options;

  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  const formatOptions: Intl.DateTimeFormatOptions = {
    month: format,
    day: 'numeric',
  };

  if (includeYear) {
    formatOptions.year = 'numeric';
  }

  return date.toLocaleDateString('en-US', formatOptions);
}

/**
 * Calculate days until a show date
 * @param dateString - Date in YYYY-MM-DD format
 * @returns Number of days until show (negative if past)
 */
export function getDaysUntilShow(dateString: string): number {
  const [year, month, day] = dateString.split('-').map(Number);
  const showDate = new Date(year, month - 1, day);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  showDate.setHours(0, 0, 0, 0);

  const diffTime = showDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

/**
 * Check if a date is today
 * @param dateString - Date in YYYY-MM-DD format
 * @returns True if date is today
 */
export function isToday(dateString: string): boolean {
  return getDaysUntilShow(dateString) === 0;
}

/**
 * Check if a date is in the future
 * @param dateString - Date in YYYY-MM-DD format
 * @returns True if date is in the future
 */
export function isUpcoming(dateString: string): boolean {
  return getDaysUntilShow(dateString) > 0;
}

/**
 * Check if a date is in the past
 * @param dateString - Date in YYYY-MM-DD format
 * @returns True if date is in the past
 */
export function isPast(dateString: string): boolean {
  return getDaysUntilShow(dateString) < 0;
}

/**
 * Get relative time description (e.g., "in 5 days", "yesterday", "today")
 * @param dateString - Date in YYYY-MM-DD format
 * @returns Human-readable relative time
 */
export function getRelativeTime(dateString: string): string {
  const days = getDaysUntilShow(dateString);

  if (days === 0) return 'today';
  if (days === 1) return 'tomorrow';
  if (days === -1) return 'yesterday';
  if (days > 1) return `in ${days} days`;
  if (days < -1) return `${Math.abs(days)} days ago`;

  return '';
}

/**
 * Sort dates chronologically (earliest first)
 * @param dates - Array of date strings
 * @returns Sorted array of date strings
 */
export function sortDatesAsc(dates: string[]): string[] {
  return [...dates].sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
}

/**
 * Sort dates reverse chronologically (latest first)
 * @param dates - Array of date strings
 * @returns Sorted array of date strings
 */
export function sortDatesDesc(dates: string[]): string[] {
  return [...dates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
}
