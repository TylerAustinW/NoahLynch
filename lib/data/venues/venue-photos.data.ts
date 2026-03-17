export interface VenuePhoto {
  filename: string;
  featured?: boolean;
}

export interface VenuePhotoCollection {
  id: string;
  venue: string;
  city: string;
  state: string;
  date: string;
  photos: VenuePhoto[];
}

export const venuePhotoCollections: VenuePhotoCollection[] = [
  // NEW: Sunset Grill (2026) — added for the images uploaded in the conversation
  {
    id: "sunset-grill/2026",
    venue: "Sunset Grill",
    city: "Brandon",
    state: "MS",
    date: "2026-01-16",
    photos: [
      { filename: "sunset-grill-2026-6.jpg", featured: true },
      { filename: "sunset-grill-2026-1.jpg", featured: false },
      { filename: "sunset-grill-2026-2.jpg", featured: false },
      { filename: "sunset-grill-2026-3.jpg", featured: false },
      { filename: "sunset-grill-2026-4.jpg", featured: false },
      { filename: "sunset-grill-2026-5.jpg", featured: false },
    ],
  },

  {
    id: "backwater-grill/2026",
    venue: "Backwater Grill",
    city: "Brandon",
    state: "MS",
    date: "2026-03-14",
    photos: [
      { filename: "backwater-grill-2026-1.jpg", featured: true },
      { filename: "backwater-grill-2026-2.jpg", featured: false },
      { filename: "backwater-grill-2026-3.jpg", featured: false },
      { filename: "backwater-grill-2026-4.jpg", featured: false },
    ],
  },

  // existing collections (unchanged)
  {
    id: "ole-brook-festival",
    venue: "Ole Brook Festival",
    city: "Brookhaven",
    state: "MS",
    date: "2025-10-04",
    photos: [
      {
        filename: "thenoahlynchband.png",
        featured: true,
      },
      {
        filename: "noah-hunter.png",
        featured: false,
      },
      {
        filename: "image.png",
        featured: false,
      },
    ],
  },
  {
    id: "backwater-grill",
    venue: "Backwater Grill",
    city: "Brandon",
    state: "MS",
    date: "2025-09-06",
    photos: [
      {
        filename: "backwater-grill-noah-lynch.jpg",
        featured: true,
      },
      {
        filename: "backwater-grill-noah-lynch-2.jpg",
        featured: false,
      },
      {
        filename: "backwater-grill-1.jpg",
        featured: false,
      },
      {
        filename: "backwater-grill-2.jpg",
        featured: false,
      },
      {
        filename: "backwater-grill-3.jpg",
        featured: false,
      },
      {
        filename: "backwater-grill-4.jpg",
        featured: false,
      },
    ],
  },
  {
    id: "sunset-grill",
    venue: "Sunset Grill",
    city: "Brandon",
    state: "MS",
    date: "2025-09-01",
    photos: [
      {
        filename: "noah-jamie-landscape.jpg",
        featured: false,
      },
      {
        filename: "noah-sunset-grill.jpg",
        featured: true,
      },
      {
        filename: "noah-sunset.jpg",
        featured: false,
      },
      {
        filename: "sunset-grill-4.jpg",
        featured: false,
      },
      {
        filename: "sunset-grill-5.jpg",
        featured: false,
      },
      {
        filename: "sunset-grill-6.jpg",
        featured: false,
      },
    ],
  },
  {
    id: "the-roof",
    venue: "The Roof at 1311",
    city: "Vicksburg",
    state: "MS",
    date: "2025-08-16",
    photos: [
      {
        filename: "noah-at-the-roof.jpg",
        featured: false,
      },
      {
        filename: "noah-at-the-roof-2.jpg",
        featured: true,
      },
      {
        filename: "noah-at-the-roof-3.jpg",
        featured: false,
      },
      {
        filename: "noah-at-the-roof-4.jpg",
        featured: false,
      },
      {
        filename: "noah-at-the-roof-5.jpg",
        featured: false,
      },
      {
        filename: "noah-at-the-roof-guitars.jpg",
        featured: false,
      },
    ],
  },
  {
    id: "magnolia-blues",
    venue: "Magnolia Blues BBQ",
    city: "Brookhaven",
    state: "MS",
    date: "2025-06-14",
    photos: [
      {
        filename: "noah-lynch-magnolia-blues-session.jpg",
        featured: true,
      },
    ],
  },
];

export function getFeaturedPhoto(collection: VenuePhotoCollection): VenuePhoto {
  return collection.photos.find((photo) => photo.featured) || collection.photos[0]!;
}

export function getPhotoPath(venueId: string, filename: string): string {
  return `/venues/${venueId}/${filename}`;
}

export function hasMultiplePhotos(collection: VenuePhotoCollection): boolean {
  return collection.photos.length > 1;
}
