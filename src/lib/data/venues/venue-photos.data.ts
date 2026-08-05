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
  {
    id: "jelly-stone-park/2026",
    venue: "Jelly Stone Park",
    city: "Pelahatchie",
    state: "MS",
    date: "2026-06-20",
    photos: [
      { filename: "jelly (1).jpeg", featured: false },
      { filename: "jelly (2).jpeg", featured: false },
      { filename: "jelly (3).jpeg", featured: true },
      { filename: "jelly (4).jpeg", featured: false },
      { filename: "jelly (5).jpeg", featured: false },
      { filename: "jelly (6).jpeg", featured: false },
    ],
  },

  {
    id: "Bayou-Restaurant-Tiki-Bar/2026",
    venue: "Bayou Restaurant & Tiki Bar",
    city: "Ocean Springs",
    state: "MS",
    date: "2026-06-13",
    photos: [
      { filename: "IMG_7485.jpeg", featured: false },
      { filename: "IMG_7414.jpeg", featured: false },
      { filename: "IMG_7450.jpeg", featured: true },
      { filename: "IMG_7456.jpeg", featured: false },
      { filename: "IMG_7458.jpeg", featured: false },
      { filename: "IMG_7497.jpeg", featured: false },
      { filename: "IMG_7499.jpeg", featured: false },
    ],
  },

  {
    id: "the-roof/2025",
    venue: "The Roof at 1311",
    city: "Vicksburg",
    state: "MS",
    date: "2025-08-16",
    photos: [
      { filename: "NoahAtTheRoof.jpg", featured: false },
      { filename: "NoahAtTheRoof2.jpg", featured: true },
      { filename: "NoahAtTheRoof3.jpg", featured: false },
      { filename: "NoahAtTheRoof4.jpg", featured: false },
      { filename: "NoahAtTheRoof5.jpg", featured: false },
      { filename: "NoahAtTheRoofGuitars.jpg", featured: false },
    ],
  },

  {
    id: "The-Station-JXN",
    venue: "The Station JXN",
    city: "Jackson",
    state: "MS",
    date: "2026-04-10",
    photos: [
      { filename: "669644692_18430258063190873_128529939075063808_n.jpg", featured: true },
      { filename: "670284721_18430258027190873_2031478971641954450_n.jpg", featured: false },
      { filename: "670402760_18430258072190873_5888583650218238265_n.jpg", featured: false },
      { filename: "DSC00591.jpeg", featured: false },
    ],
  },

  {
    id: "backwater-grill/2025",
    venue: "Backwater Grill",
    city: "Brandon",
    state: "MS",
    date: "2025-09-06",
    photos: [
      { filename: "BackWaterGrill-NoahLynch.jpg", featured: true },
      { filename: "BackwaterGrill-NoahLynch2.jpg", featured: false },
      { filename: "IMG_6716.jpg", featured: false },
      { filename: "IMG_6717.jpg", featured: false },
      { filename: "IMG_6718.jpg", featured: false },
      { filename: "IMG_6719.jpg", featured: false },
    ],
  },

  {
    id: "sunset-grill/2025",
    venue: "Sunset Grill",
    city: "Brandon",
    state: "MS",
    date: "2025-09-01",
    photos: [
      { filename: "noah-jamie-landscape.jpg", featured: false },
      { filename: "noah-sunset-grill.jpg", featured: true },
      { filename: "noah-sunset.jpg", featured: false },
      { filename: "Sunset-Grill (4).jpg", featured: false },
      { filename: "Sunset-Grill (5).jpg", featured: false },
      { filename: "Sunset-Grill (6).jpg", featured: false },
    ],
  },

  {
    id: "Ole-Brook-Festival/2025",
    venue: "Ole Brook Festival",
    city: "Brookhaven",
    state: "MS",
    date: "2025-10-04",
    photos: [
      {
        filename: "IMG_7287.jpg",
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
    id: "magnolia-blues/2025",
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

  {
    id: "Shaggys on The Rez",
    venue: "Shaggy's on the Rez",
    city: "Brandon",
    state: "MS",
    date: "2026-06-27",
    photos: [
      { filename: "Shaggy1.jpg", featured: true },
      { filename: "Shaggy2.jpg", featured: false },
      { filename: "Shaggy3.jpg", featured: false },
      { filename: "Shaggy4.jpg", featured: false },
    ],
  },

  {
    id: "overbrook/2026",
    venue: "Overbrook Songwriters Festival",
    city: "Brookhaven",
    state: "MS",
    date: "2026-08-01",
    photos: [
      { filename: "overbrook (1).jpeg", featured: true },
      { filename: "overbrook (2).jpeg", featured: false },
      { filename: "overbrook (3).jpeg", featured: false },
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
