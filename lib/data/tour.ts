export interface Show {
  id: string;
  date: string;
  venue: string;
  city: string;
  state: string;
  time?: string;
  startTimeLocal?: string;
  endTimeLocal?: string;
  timezone?: string;
  ticketUrl?: string;
  actionText?: string;
  description?: string;
  featured?: boolean;
  status?: "scheduled" | "cancelled" | "sold-out";
}

export const SHOWS: Show[] = [
  {
    id: "show-2026-08-01-overbrook",
    date: "2026-08-01",
    venue: "Overbrook Songwriters Festival",
    city: "Brookhaven",
    state: "MS",
    startTimeLocal: "16:30",
    timezone: "America/Chicago",
    time: "4:30 PM",
    featured: true,
    status: "scheduled",
    description: "Songwriters festival performance.",
  },
  {
    id: "show-2026-04-04-shaggys-rez",
    date: "2026-04-04",
    venue: "Shaggy's on the Rez",
    city: "Brandon",
    state: "MS",
    startTimeLocal: "16:00",
    endTimeLocal: "20:00",
    timezone: "America/Chicago",
    time: "4:00 PM – 8:00 PM",
    featured: true,
    status: "cancelled",
    description: "due to weather conditions.",
  },
  {
    id: "show-2026-05-30-roof",
    date: "2026-05-30",
    venue: "The Roof at 1311",
    city: "Vicksburg",
    state: "MS",
    startTimeLocal: "19:00",
    endTimeLocal: "22:00",
    timezone: "America/Chicago",
    time: "7:00 PM – 10:00 PM",
    featured: true,
    status: "scheduled",
    description: "Noah is going back to The Roof at 1311 on May 30, 2026.",
  },
  {
    id: "show-2026-06-27-shaggys-rez",
    date: "2026-06-27",
    venue: "Shaggy's on the Rez",
    city: "Brandon",
    state: "MS",
    startTimeLocal: "11:30",
    endTimeLocal: "14:30",
    timezone: "America/Chicago",
    time: "11:30 AM – 2:30 PM",
    featured: true,
    status: "scheduled",
  },
  {
    id: "show-2026-05-23-backwater",
    date: "2026-05-23",
    venue: "Backwater Grill",
    city: "Brandon",
    state: "MS",
    startTimeLocal: "13:00",
    endTimeLocal: "16:00",
    timezone: "America/Chicago",
    time: "1:00 PM – 4:00 PM",
    ticketUrl:
      "https://www.bandsintown.com/e/107170464-noah-lynch-at-backwater-grill-taphouse-and-oyster-bar?came_from=267&utm_medium=web&utm_source=artist_page&utm_campaign=event",
    actionText: "Tickets",
    featured: true,
    status: "scheduled",
  },
  {
    id: "show-2026-04-10-station-jxn",
    date: "2026-04-10",
    venue: "The Station JXN",
    city: "Jackson",
    state: "MS",
    startTimeLocal: "18:00",
    endTimeLocal: "21:00",
    timezone: "America/Chicago",
    time: "6:00 PM – 9:00 PM",
    featured: true,
    status: "scheduled",
  },
  {
    id: "show-2026-03-13-backwater",
    date: "2026-03-13",
    venue: "Backwater Grill",
    city: "Brandon",
    state: "MS",
    startTimeLocal: "18:00",
    endTimeLocal: "21:00",
    timezone: "America/Chicago",
    time: "6:00 PM – 9:00 PM",
    ticketUrl:
      "https://www.bandsintown.com/e/107170464-noah-lynch-at-backwater-grill-taphouse-and-oyster-bar?came_from=267&utm_medium=web&utm_source=artist_page&utm_campaign=event",
    actionText: "Tickets",
    featured: true,
    status: "scheduled",
  },
  {
    id: "show-2026-01-29-roof",
    date: "2026-01-29",
    venue: "The Roof at 1311",
    city: "Vicksburg",
    state: "MS",
    startTimeLocal: "18:00",
    endTimeLocal: "21:00",
    timezone: "America/Chicago",
    time: "6:00 PM – 9:00 PM",
    featured: true,
    status: "scheduled",
  },
  {
    id: "show-2026-01-16-sunset",
    date: "2026-01-16",
    venue: "Sunset Grill",
    city: "Brandon",
    state: "MS",
    startTimeLocal: "19:00",
    endTimeLocal: "23:00",
    timezone: "America/Chicago",
    time: "7:00 PM – 11:00 PM",
    description: "First gig of 2026!",
    featured: true,
    status: "scheduled",
  },
  {
    id: "show-2025-10-03-ole-brook",
    date: "2025-10-03",
    venue: "Ole Brook Festival",
    city: "Brookhaven",
    state: "MS",
    startTimeLocal: "18:00",
    endTimeLocal: "19:00",
    timezone: "America/Chicago",
    time: "6:00 PM – 7:00 PM",
    ticketUrl: "https://www.bandsintown.com/e/107374328?&came_from=210",
    actionText: "Event Info",
    featured: true,
    status: "scheduled",
    description: "Live performance at Ole Brook Festival.",
  },
  {
    id: "show-2025-09-06-backwater",
    date: "2025-09-06",
    venue: "Backwater Grill",
    city: "Brandon",
    state: "MS",
    startTimeLocal: "18:00",
    timezone: "America/Chicago",
    time: "6:00 PM",
    ticketUrl:
      "https://www.bandsintown.com/e/107170464-noah-lynch-at-backwater-grill-taphouse-and-oyster-bar?came_from=267&utm_medium=web&utm_source=artist_page&utm_campaign=event",
    actionText: "Tickets",
    featured: false,
    status: "scheduled",
    description: "Join Noah Lynch for a live performance at Backwater Grill.",
  },
  {
    id: "show-2025-09-01-sunset",
    date: "2025-09-01",
    venue: "Sunset Grill",
    city: "Brandon",
    state: "MS",
    startTimeLocal: "12:00",
    timezone: "America/Chicago",
    time: "12:00 PM",
    featured: false,
    status: "scheduled",
    description: "Join Noah Lynch for a live performance at Sunset Grill.",
  },
  {
    id: "show-2025-08-16-roof",
    date: "2025-08-16",
    venue: "The Roof at 1311",
    city: "Vicksburg",
    state: "MS",
    startTimeLocal: "19:00",
    timezone: "America/Chicago",
    time: "7:00 PM",
    featured: false,
    status: "scheduled",
    description: "Amazing performance at The Roof on the 3rd floor with a packed crowd.",
  },
  {
    id: "show-2025-06-14-magnolia",
    date: "2025-06-14",
    venue: "Magnolia Blues BBQ",
    city: "Brookhaven",
    state: "MS",
    timezone: "America/Chicago",
    featured: false,
    status: "scheduled",
  },
  {
    id: "show-2025-02-01-rushing",
    date: "2025-02-01",
    venue: "Rushing Roadhouse",
    city: "Jefferson County",
    state: "MS",
    timezone: "America/Chicago",
    featured: false,
    status: "scheduled",
    description: "Live acoustic performance at Rushing Roadhouse.",
  },
  {
    id: "show-2026-06-13-ocean-springs",
    date: "2026-06-13",
    venue: "The Bayou Restaurant & Tiki Bar",
    city: "Ocean Springs",
    state: "MS",
    startTimeLocal: "19:00",
    endTimeLocal: "22:00",
    timezone: "America/Chicago",
    time: "7:00 PM – 10:00 PM",
    featured: true,
    status: "scheduled",
  },
  {
    id: "show-2026-06-20-jelly-stone",
    date: "2026-06-20",
    venue: "Jelly Stone Park",
    city: "Pelahatchie",
    state: "MS",
    startTimeLocal: "19:00",
    endTimeLocal: "21:00",
    timezone: "America/Chicago",
    time: "7:00 PM – 9:00 PM",
    featured: false,
    status: "scheduled",
    description: "Live performance at Jelly Stone Park.",
  },
];

export const getUpcoming = (): Show[] => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return SHOWS.filter((show) => {
    const showDate = new Date(show.date);
    showDate.setHours(0, 0, 0, 0);
    return showDate >= now && show.status !== "cancelled";
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getPast = (): Show[] => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return SHOWS.filter((show) => {
    const showDate = new Date(show.date);
    showDate.setHours(0, 0, 0, 0);
    return showDate < now;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getNext = (): Show | null => {
  return getUpcoming()[0] || null;
};

export const getFeatured = (): Show[] => {
  return getUpcoming().filter((show) => show.featured);
};

export const getAll = (): Show[] => {
  const allShows = [...getUpcoming(), ...getPast()];
  const seen = new Set<string>();
  return allShows.filter((show) => {
    if (seen.has(show.id)) {
      return false;
    }
    seen.add(show.id);
    return true;
  });
};

export const getById = (id: string): Show | undefined => {
  return SHOWS.find((show) => show.id === id);
};

export const getNextShow = (): Show | null => {
  return getNext();
};

export const isShowTodayLocal = (show: Show): boolean => {
  const today = new Date();
  const showDate = new Date(show.date);
  return (
    today.getFullYear() === showDate.getFullYear() &&
    today.getMonth() === showDate.getMonth() &&
    today.getDate() === showDate.getDate()
  );
};
