export interface VenuePhoto {
    filename: string;
    alt: string;
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
        id: "the-roof",
        venue: "The Roof at 1311",
        city: "Vicksburg",
        state: "MS",
        date: "2025-08-16",
        photos: [
            {
                filename: "NoahAtTheRoof.jpg",
                alt: "Noah Lynch performing at The Roof at 1311 with sunset backdrop",
                featured: true,
            },
            {
                filename: "NoahAtTheRoof2.jpg",
                alt: "Noah Lynch at The Roof at 1311 - second performance shot",
            },
            {
                filename: "NoahAtTheRoof3.jpg",
                alt: "Noah Lynch at The Roof at 1311 - third performance shot",
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
                alt: "Noah Lynch performing at Magnolia Blues BBQ with packed crowd",
                featured: true,
            },
        ],
    },
];

export function getFeaturedPhoto(collection: VenuePhotoCollection): VenuePhoto {
    return collection.photos.find((photo) => photo.featured) || collection.photos[0];
}

export function getPhotoPath(venueId: string, filename: string): string {
    return `/venues/${venueId}/${filename}`;
}

export function hasMultiplePhotos(collection: VenuePhotoCollection): boolean {
    return collection.photos.length > 1;
}
