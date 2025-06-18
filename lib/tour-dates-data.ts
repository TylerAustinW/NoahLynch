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
}

export const tourDatesData: TourDate[] = [
  {
    id: 1,
    date: '2024-10-15',
    venue: 'The Blue Note',
    city: 'Columbia',
    state: 'MO',
    time: '8:00 PM',
    description: 'Acoustic set featuring songs from "Honest"',
    featured: true
  },
  {
    id: 2,
    date: '2024-09-28',
    venue: 'Proud Larry\'s',
    city: 'Oxford',
    state: 'MS',
    time: '9:00 PM',
    description: 'Hometown show with full band',
    featured: true
  },
  {
    id: 3,
    date: '2024-09-10',
    venue: 'The Basement',
    city: 'Nashville',
    state: 'TN',
    time: '7:30 PM',
    description: 'Writers round with special guests'
  },
  {
    id: 4,
    date: '2024-08-22',
    venue: 'Red Rocks Amphitheatre',
    city: 'Morrison',
    state: 'CO',
    time: '7:00 PM',
    description: 'Opening for national touring act',
    featured: true
  },
  {
    id: 5,
    date: '2024-07-04',
    venue: 'Mississippi Delta Blues Festival',
    city: 'Greenville',
    state: 'MS',
    time: '6:00 PM',
    description: 'Festival performance on main stage'
  },
  {
    id: 6,
    date: '2024-06-18',
    venue: 'The Fillmore',
    city: 'San Francisco',
    state: 'CA',
    time: '8:00 PM',
    description: 'West Coast tour finale'
  },
  {
    id: 7,
    date: '2024-05-30',
    venue: 'House of Blues',
    city: 'New Orleans',
    state: 'LA',
    time: '9:00 PM',
    description: 'Late night blues session'
  },
  {
    id: 8,
    date: '2024-05-12',
    venue: 'The Tabernacle',
    city: 'Atlanta',
    state: 'GA',
    time: '8:00 PM',
    description: 'Southern tour kickoff'
  },
  {
    id: 9,
    date: '2024-04-20',
    venue: 'The Bowery Ballroom',
    city: 'New York',
    state: 'NY',
    time: '8:30 PM',
    description: 'East Coast tour stop'
  },
  {
    id: 10,
    date: '2024-03-15',
    venue: 'The Troubadour',
    city: 'Los Angeles',
    state: 'CA',
    time: '9:00 PM',
    description: 'Intimate acoustic performance'
  }
];