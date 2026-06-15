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
    tagline: "Singer–Songwriter",
    location: "Meadville, MS",
    genre: "Acoustic Soul – Soft Rock – Alt-Pop",
  },
  bio: {
    short:
      "Noah Lynch is a <strong>Mississippi-born singer-songwriter</strong> blending acoustic soul, soft rock, and alt-pop into <strong>emotionally rich, story-driven music</strong>. Known for his heartfelt guitar playing and honest lyrics, Noah delivers performances that feel both <strong>intimate and universal</strong>. His songs speak to the real — love, heartbreak, growth — all anchored in smooth grooves and Southern sincerity.",
    long: 'Noah Lynch is a solo artist from Meadville, Mississippi, crafting a sound rooted in <strong>acoustic soul, soft rock, and alternative pop</strong>. With <strong>over a decade of experience</strong> behind the guitar, Noah delivers stripped-back performances that spotlight the heart of each song. His lyrics speak to real-life moments — heartbreak, healing, and hope — with a calm confidence that draws listeners in. From backyard shows to packed venues, Noah has built a <strong>loyal following across Mississippi and beyond</strong>. His music has been <strong>featured on Crags Radio UK</strong>, where tracks like "For You" and "Good Things Take Time" found international ears. Whether he\'s playing a small-town stage or recording his next single, Noah\'s focus is always the same: <strong>connect through the song</strong>. With a growing catalog and an unmistakable sound, Noah Lynch is quickly becoming <strong>a voice of his generation</strong> — one story, one song at a time.',
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
      {
        videoId: "3rKv1BmopUQ",
        title: "Chasing a Feelin' (Unreleased, Live at SunSet Grill)",
        type: "performance",
      },
      {
        videoId: "EPYGIRsGPpw",
        title: 'Noah Lynch - "Collide" (Live Cover)',
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
      venue: "Magnolia Blues BBQ",
      description: "Packed house, 90+ draw",
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
        id: "backwater-grill-2026",
        venue: "Backwater Grill",
        city: "Brandon",
        state: "MS",
        date: "2026-03-14",
        description: "2026 live performance gallery",
        featured: false,
        photos: [
          {
            src: "/venues/backwater-grill/2026/backwater-grill-2026-1.jpg",
            alt: "Noah Lynch performing at Backwater Grill in 2026",
            caption: "Live acoustic performance at Backwater Grill in 2026",
            featured: true,
          },
          {
            src: "/venues/backwater-grill/2026/backwater-grill-2026-2.jpg",
            alt: "Noah Lynch performing at Backwater Grill in 2026",
            caption: "2026 live set at Backwater Grill",
          },
          {
            src: "/venues/backwater-grill/2026/backwater-grill-2026-3.jpg",
            alt: "Noah Lynch performing at Backwater Grill in 2026",
            caption: "Noah Lynch live at Backwater Grill in 2026",
          },
          {
            src: "/venues/backwater-grill/2026/backwater-grill-2026-4.jpg",
            alt: "Noah Lynch performing at Backwater Grill in 2026",
            caption: "Another 2026 performance moment at Backwater Grill",
          },
        ],
      },
      {
        id: "sunset-grill-2026",
        venue: "Sunset Grill",
        city: "Brandon",
        state: "MS",
        date: "2026-01-16",
        description: "2026 live performance gallery",
        featured: false,
        photos: [
          {
            src: "/venues/sunset-grill/2026/sunset-grill-2026-6.jpg",
            alt: "Noah Lynch performing at Sunset Grill in 2026",
            caption: "Live acoustic performance at Sunset Grill in 2026",
            featured: true,
          },
          {
            src: "/venues/sunset-grill/2026/Sunset-grill-2026-1.jpg",
            alt: "Noah Lynch performing at Sunset Grill in 2026",
            caption: "2026 live set at Sunset Grill",
          },
          {
            src: "/venues/sunset-grill/2026/Sunset-grill-2026-2.jpg",
            alt: "Noah Lynch performing at Sunset Grill in 2026",
            caption: "Noah Lynch live at Sunset Grill in 2026",
          },
          {
            src: "/venues/sunset-grill/2026/sunset-grill-2026-3.jpg",
            alt: "Noah Lynch performing at Sunset Grill in 2026",
            caption: "Acoustic storytelling at Sunset Grill in 2026",
          },
          {
            src: "/venues/sunset-grill/2026/sunset-grill-2026-4.jpg",
            alt: "Noah Lynch performing at Sunset Grill in 2026",
            caption: "Sunset Grill 2026 performance moment",
          },
          {
            src: "/venues/sunset-grill/2026/sunset-grill-2026-5.jpg",
            alt: "Noah Lynch performing at Sunset Grill in 2026",
            caption: "Another 2026 live moment at Sunset Grill",
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
        featured: true,
        photos: [
          {
            src: "/venues/Ole-Brook-Festival/IMG_7287.jpg",
            alt: "The Noah Lynch Band performing at Ole Brook Festival",
            caption: "Full band performance at Ole Brook Festival",
            featured: true,
          },
          {
            src: "/venues/Ole-Brook-Festival/noah-hunter.png",
            alt: "Noah Lynch with Hunter at Ole Brook Festival",
            caption: "Noah Lynch and Hunter performing at Ole Brook Festival",
          },
          {
            src: "/venues/Ole-Brook-Festival/image.png",
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

// Helper functions for EPK gallery collections
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
