export interface EPKGalleryPhoto {
  src: string;
  alt: string;
  caption: string;
  featured?: boolean;
  people?: {
    name: string;
    x: number;
    y: number;
  }[];
}

export interface EPKGalleryCollection {
  id: string;
  venue: string;
  city: string;
  state: string;
  date: string;
  description?: string;
  featured?: boolean;
  photos: EPKGalleryPhoto[];
}

export interface EPKData {
  artist: {
    name: string;
    role?: string;
    tagline: string;
    location: string;
    genre: string;
  };
  bio: {
    short: string;
    long: string;
  };
  featuredVideos?: {
    title: string;
    videos: {
      videoId: string;
      title: string;
      description?: string;
      type: "performance" | "music-video" | "acoustic" | "interview";
    }[];
  };
  liveShow: {
    formats: {
      name: string;
      description: string;
      setup?: string[];
      idealFor?: string;
      videoUrl?: string;
      videoTitle?: string;
    }[];
    repertoire: string;
    venueTypes: string[];
    paSystem: boolean;
  };
  notableShows: {
    venue: string;
    description?: string;
  }[];
  releases: {
    title: string;
    date: string;
    highlights?: string;
    coverArt?: string;
    slug?: string;
  }[];
  gallery: {
    title: string;
    collections: EPKGalleryCollection[];
  };
  contact: {
    booking: string;
    social: {
      instagram: string;
      facebook: string;
      tiktok: string;
      youtube: string;
    };
  };
}

export const epkData: EPKData = {
  artist: {
    name: "Noah Lynch",
    role: "Frontman – Noah Lynch Band",
    tagline: "Singer–Songwriter",
    location: "Meadville, MS",
    genre: "Acoustic Soul – Soft Rock – Alt-Pop",
  },
  bio: {
    short:
      "Noah Lynch is a singer-songwriter, guitarist, and frontman of the Noah Lynch Band, a six-piece group based in Mississippi. Blending acoustic soul, soft rock, and alternative pop influences, the band delivers energetic live performances built around strong musicianship, authentic songwriting, and audience connection.",
    long: "After more than a decade of performing throughout Mississippi and the Gulf Coast, Noah officially formed the Noah Lynch Band in early 2026 to bring a fuller, more dynamic sound to the stage. The band's live show combines original music with crowd favorites, making them a strong fit for festivals, concert series, community events, and live music venues.Noah's music has been featured on Crags Radio UK and has earned a growing regional following through consistent touring and memorable performances. Whether performing for hundreds at a festival or creating an intimate connection in a listening room, the mission remains the same: great songs, great musicianship, and an unforgettable live experience.",
  },
  featuredVideos: {
    title: "Featured Performances",
    videos: [
      {
        videoId: "_91aCGaYlaY",
        title: "Better Days (Live) Original - Noah Lynch Band",
        type: "performance",
      },
      {
        videoId: "cPixagF6mkM",
        title: '"Upside Down" (Jack Johnson Cover) - Live at Ole Brook Festival 2025',
        type: "performance",
      },
    ],
  },
  liveShow: {
    formats: [
      {
        name: "Full Band",
        description:
          "<strong>6-piece band</strong> — high energy, dynamic sound featuring Guitar 1 and vocals, Guitar 2, Backup vocals, Piano, Bass, and Full drum set.",
        idealFor: "Large venues and events",
        videoUrl: "https://www.youtube.com/watch?v=_91aCGaYlaY",
        videoTitle: "Better Days (Live) Original - Noah Lynch Band",
      },
    ],
    repertoire:
      "A crowd-friendly mix of acoustic/pop-rock covers in the lane of John Mayer, Jack Johnson, Edwin McCain, James Taylor, Lifehouse, and The Fray — with 3–5 original Noah Lynch songs woven into each set.",
    venueTypes: ["Songwriter rounds", "Listening rooms", "Patios", "Restaurants", "Festivals"],
    paSystem: true,
  },
  notableShows: [
    {
      venue: "2025 Readers Choice - Best Solo Musician",
      description: "Readers Choice Award Winner",
    },
    {
      venue: "Ole Brook Festival 2025",
      description: "Headliner",
    },
    {
      venue: "International Radio Airplay",
      description: "3 singles played on international radio stations",
    },
    {
      venue: "The Roof at 1311",
      description: "120+ Draw",
    },
    {
      venue: "3rd Studio Single - Honest",
      description: "Out Now (Produced by Ready Records)",
    },
    {
      venue: "4th Studio Single - Chasing a Feelin'",
      description: "Out Now (Produced by Ready Records)",
    },
  ],
  releases: [
    {
      title: "Chasing A Feelin'",
      date: "October 2025",
      coverArt: "/covers/chasing-a-feelin.png",
      slug: "chasing-a-feelin",
    },
    {
      title: "Honest",
      date: "May 2025",
      coverArt: "/covers/honest-cover.jpeg",
      slug: "honest",
    },
    {
      title: "For You",
      date: "June 2024",
      highlights: "Featured on Crags Radio UK",
      coverArt: "/covers/single-for-you-cover.jpg",
      slug: "for-you",
    },
    {
      title: "Good Things Take Time",
      date: "2024",
      highlights: "Featured on Crags Radio UK",
      coverArt: "/covers/single-good-things-take-time-cover.jpg",
      slug: "good-things-take-time",
    },
  ],
  gallery: {
    title: "Live Performance Gallery",
    collections: [
      {
        id: "the-roof-2026",
        venue: "The Roof at 1311",
        city: "Vicksburg",
        state: "MS",
        date: "2026-05-30",
        description: "2026 live performance gallery",
        featured: true,
        photos: [
          {
            src: "/venues/the-roof/2026/20260530-DSC03634.jpg",
            alt: "Noah Lynch performing at The Roof in 2026",
            caption: "2026 live set at The Roof",
            featured: true,
          },
          {
            src: "/venues/the-roof/2026/20260530-DSC03638.jpg",
            alt: "Noah Lynch performing at The Roof in 2026",
            caption: "Noah Lynch live at The Roof in 2026",
          },
          {
            src: "/venues/the-roof/2026/DSC03657.jpg",
            alt: "Noah Lynch performing at The Roof in 2026",
            caption: "Acoustic storytelling at The Roof in 2026",
          },
          {
            src: "/venues/the-roof/2026/DSC03696.jpg",
            alt: "Noah Lynch performing at The Roof in 2026",
            caption: "The Roof 2026 performance moment",
          },
        ],
      },
      {
        id: "bayou-restaurant-2026",
        venue: "DaBayou Restaurant & Tiki Bar",
        city: "Ocean Springs",
        state: "MS",
        date: "2026-06-13",
        description: "2026 live performance gallery",
        featured: false,
        photos: [
          {
            src: "/venues/Bayou-Restaurant-Tiki-Bar/2026/IMG_7414.jpeg",
            alt: "Noah Lynch performing at DaBayou Restaurant & Tiki Bar in 2026",
            caption: "Live acoustic performance at DaBayou Restaurant & Tiki Bar in 2026",
            featured: true,
          },
          {
            src: "/venues/Bayou-Restaurant-Tiki-Bar/2026/IMG_7450.jpeg",
            alt: "Noah Lynch performing at DaBayou Restaurant & Tiki Bar in 2026",
            caption: "2026 live set at DaBayou Restaurant & Tiki Bar",
          },
          {
            src: "/venues/Bayou-Restaurant-Tiki-Bar/2026/IMG_7456.jpeg",
            alt: "Noah Lynch performing at DaBayou Restaurant & Tiki Bar in 2026",
            caption: "Noah Lynch live at DaBayou Restaurant & Tiki Bar in 2026",
          },
          {
            src: "/venues/Bayou-Restaurant-Tiki-Bar/2026/IMG_7458.jpeg",
            alt: "Noah Lynch performing at DaBayou Restaurant & Tiki Bar in 2026",
            caption: "Another 2026 performance moment at DaBayou Restaurant & Tiki Bar",
          },
          {
            src: "/venues/Bayou-Restaurant-Tiki-Bar/2026/IMG_7485.jpeg",
            alt: "Noah Lynch performing at DaBayou Restaurant & Tiki Bar in 2026",
            caption: "DaBayou Restaurant & Tiki Bar 2026 performance moment",
          },
          {
            src: "/venues/Bayou-Restaurant-Tiki-Bar/2026/IMG_7497.jpeg",
            alt: "Noah Lynch performing at DaBayou Restaurant & Tiki Bar in 2026",
            caption: "Live moment at DaBayou Restaurant & Tiki Bar in 2026",
          },
          {
            src: "/venues/Bayou-Restaurant-Tiki-Bar/2026/IMG_7499.jpeg",
            alt: "Noah Lynch performing at DaBayou Restaurant & Tiki Bar in 2026",
            caption: "Final performance shot at DaBayou Restaurant & Tiki Bar in 2026",
          },
        ],
      },
      {
        id: "ole-brook-festival-2025",
        venue: "Ole Brook Festival",
        city: "Brookhaven",
        state: "MS",
        date: "2025-10-04",
        description: "Festival performance with The Noah Lynch Band",
        featured: false,
        photos: [
          {
            src: "/venues/Ole-Brook-Festival/2025/IMG_7287.jpg",
            alt: "The Noah Lynch Band performing at Ole Brook Festival",
            caption: "Full band performance at Ole Brook Festival",
            featured: true,
          },
          {
            src: "/venues/Ole-Brook-Festival/2025/noah-hunter.png",
            alt: "Noah Lynch with Hunter at Ole Brook Festival",
            caption: "Noah Lynch and Hunter performing at Ole Brook Festival",
          },
          {
            src: "/venues/Ole-Brook-Festival/2025/image.png",
            alt: "Noah Lynch at Ole Brook Festival",
            caption: "Live performance at Ole Brook Festival",
          },
        ],
      },
    ],
  },
  contact: {
    booking: "noahlynchcontact@gmail.com",
    social: {
      instagram: "https://instagram.com/noahlynchmusic",
      facebook: "https://facebook.com/noahlynchmusic",
      tiktok: "https://tiktok.com/@noahlynchmusic",
      youtube: "https://youtube.com/@noahlynch",
    },
  },
};

export function getFeaturedCollection(epkData: EPKData): EPKGalleryCollection | undefined {
  return (
    epkData.gallery.collections.find((collection) => collection.featured) ||
    epkData.gallery.collections[0]
  );
}

export function getFeaturedPhotoFromCollection(
  collection: EPKGalleryCollection,
): EPKGalleryPhoto | undefined {
  return collection.photos.find((photo) => photo.featured) || collection.photos[0];
}

export function getCollectionById(epkData: EPKData, id: string): EPKGalleryCollection | undefined {
  return epkData.gallery.collections.find((collection) => collection.id === id);
}

export function getAllCollections(epkData: EPKData): EPKGalleryCollection[] {
  return epkData.gallery.collections;
}

export function getCollectionsByVenue(epkData: EPKData, venue: string): EPKGalleryCollection[] {
  return epkData.gallery.collections.filter((collection) =>
    collection.venue.toLowerCase().includes(venue.toLowerCase()),
  );
}
