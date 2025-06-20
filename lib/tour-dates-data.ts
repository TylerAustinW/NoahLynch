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

export const tourDatesData: TourDate[] = [
  // Previous shows
  {
    id: 1,
    date: "2025-06-14",
    venue: "Magnolia Blues BBQ Company",
    city: "Brookhaven",
    state: "MS",
    upcoming: false,
  },
  {
    id: 2,
    date: "2025-02-01",
    venue: "Rushing RoadHouse",
    city: "Jefferson County",
    state: "MS",
    upcoming: false,
  },
];
