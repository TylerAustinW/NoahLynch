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
    ticketLink:
      'https://www.bandsintown.com/e/107129318-noah-lynch-at-the-roof-at-1311?came_from=267&utm_medium=web&utm_source=artist_page&utm_campaign=ticket_rsvp',
    upcoming: true,
    featured: true,
    description: 'Join Noah Lynch for a live performance at The Roof on the 3rd floor.',
  },
  {
    id: 4,
    date: '2025-09-01',
    venue: 'Sunset Grill',
    city: 'Brandon',
    time: '12:00 PM CDT',
    ticketLink:
      'https://www.bandsintown.com/e/107167473-noah-lynch-at-sunset-grill?came_from=267&utm_medium=web&utm_source=artist_page&utm_campaign=ticket_rsvp',
    state: 'MS',
    upcoming: true,
    featured: false,
    description: 'Join Noah Lynch for a live performance at Sunset Grill.',
  },
  {
    id: 5,
    date: '2025-09-06',
    venue: 'Backwater Grill',
    city: 'Brandon',
    state: 'MS',
    time: '6:00 PM CDT',
    ticketLink:
      'https://www.bandsintown.com/e/107170464-noah-lynch-at-backwater-grill-taphouse-and-oyster-bar?came_from=267&utm_medium=web&utm_source=artist_page&utm_campaign=event',
    upcoming: true,
    featured: false,
    description: 'Join Noah Lynch for a live performance at Backwater Grill.',
  },
];

export function getAllTourDates(): TourDate[] {
  return [...UPCOMING_TOUR_DATES_DATA, ...TOUR_DATES_DATA];
}
export function getPastTourDates(): TourDate[] {
  return TOUR_DATES_DATA.filter((date) => !date.upcoming);
}
export function getTourDatesSortedByClosest(): TourDate[] {
  return getAllTourDates().sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (a.upcoming && b.upcoming) {
      return dateA.getTime() - dateB.getTime();
    }

    if (!a.upcoming && !b.upcoming) {
      return dateB.getTime() - dateA.getTime();
    }

    return a.upcoming ? -1 : 1;
  });
}
