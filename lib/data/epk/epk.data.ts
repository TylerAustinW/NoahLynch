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
        format: string;
        setup: string[];
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
        tagline: "Singer–Songwriter | Guitarist | Storyteller",
        location: "Meadville, MS",
        genre: "Acoustic Soul – Soft Rock – Alt-Pop",
    },
    bio: {
        short: "Noah Lynch is a Mississippi-born singer-songwriter blending acoustic soul, soft rock, and alt-pop into emotionally rich, story-driven music. Known for his heartfelt guitar playing and honest lyrics, Noah delivers performances that feel both intimate and universal. His songs speak to the real — love, heartbreak, growth — all anchored in smooth grooves and Southern sincerity.",
        long: 'Noah Lynch is a solo artist from Meadville, Mississippi, crafting a sound rooted in acoustic soul, soft rock, and alternative pop. With over a decade of experience behind the guitar, Noah delivers stripped-back performances that spotlight the heart of each song. His lyrics speak to real-life moments — heartbreak, healing, and hope — with a calm confidence that draws listeners in. From backyard shows to packed venues, Noah has built a loyal following across Mississippi and beyond. His music has been featured on CraGs Radio UK, where tracks like "For You" and "Good Things Take Time" found international ears. Whether he\'s playing a small-town stage or recording his next single, Noah\'s focus is always the same: connect through the song. With a growing catalog and an unmistakable sound, Noah Lynch is quickly becoming a voice of his generation — one story, one song at a time.',
    },
    featuredVideos: {
        title: "Featured Performances",
        videos: [
            {
                videoId: "3rKv1BmopUQ",
                title: "Chasing a Feelin’ (Unreleased, Live at SunSet Grill)",
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
        format: "Solo Acoustic Performance",
        setup: ["2 acoustic guitars", "1 cajon (percussion)"],
        repertoire:
            "Cover songs from John Mayer, Edwin McCain, James Taylor, Lifehouse, The Fray, and more, with 3–5 original songs integrated into each set",
        venueTypes: ["Songwriter rounds", "Listening rooms", "Patios", "Restaurants", "Festivals"],
        paSystem: true,
    },
    notableShows: [
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
    ],
    releases: [
        {
            title: "Honest",
            date: "May 2025",
            coverArt: "/covers/honest-cover.jpeg",
            slug: "honest",
        },
        {
            title: "For You",
            date: "June 2024",
            highlights: "Featured on CraGs Radio UK",
            coverArt: "/covers/single-for-you-cover.jpg",
            slug: "for-you",
        },
        {
            title: "Good Things Take Time",
            date: "2024",
            highlights: "Featured on CraGs Radio UK",
            coverArt: "/covers/single-good-things-take-time-cover.jpg",
            slug: "good-things-take-time",
        },
    ],
    gallery: {
        title: "Live Performance Gallery",
        collections: [
            {
                id: "backwater-grill-2025",
                venue: "Backwater Grill",
                city: "Brandon",
                state: "MS",
                date: "2025-09-06",
                description: "Live acoustic performance",
                featured: true,
                photos: [
                    {
                        src: "/venues/backwater-grill/IMG_6718.jpg",
                        alt: "Noah Lynch performing at Backwater Grill",
                        caption: "",
                        featured: true,
                    },
                ],
            },
            {
                id: "sunset-grill-2025",
                venue: "Sunset Grill",
                city: "Brandon",
                state: "MS",
                date: "2025-09-01",
                description: "Live performance",
                featured: false,
                photos: [
                    {
                        src: "/venues/sunset-grill/noah-sunset-grill.jpg",
                        alt: "Noah Lynch performing at Sunset Grill",
                        caption: "",
                        featured: true,
                    },
                ],
            },
            {
                id: "the-roof-2025",
                venue: "The Roof at 1311",
                city: "Vicksburg",
                state: "MS",
                date: "2025-08-16",
                description: "120+ Draw - intimate rooftop performance",
                featured: false,
                photos: [
                    {
                        src: "/venues/the-roof/NoahAtTheRoof.jpg",
                        alt: "Noah Lynch performing at The Roof at 1311 in Vicksburg",
                        caption: "",
                        featured: true,
                    },
                ],
            },
            {
                id: "magnolia-blues-2025",
                venue: "Magnolia Blues BBQ",
                city: "Brookhaven",
                state: "MS",
                date: "2025-06-14",
                description: "Packed house, 90+ draw",
                featured: false,
                photos: [
                    {
                        src: "/venues/magnolia-blues/noah-lynch-magnolia-blues-session.jpg",
                        alt: "Noah Lynch performing at Magnolia Blues BBQ with packed crowd",
                        caption: "",
                        featured: true,
                        people: [
                            { name: "Noah", x: 25, y: 20 },
                            { name: "Blake", x: 50, y: 15 },
                            { name: "Jamie", x: 75, y: 25 },
                        ],
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
    return epkData.gallery.collections.find((collection) => collection.featured) || epkData.gallery.collections[0];
}

export function getFeaturedPhotoFromCollection(collection: EPKGalleryCollection): EPKGalleryPhoto | undefined {
    return collection.photos.find((photo) => photo.featured) || collection.photos[0];
}

export function getCollectionById(epkData: EPKData, id: string): EPKGalleryCollection | undefined {
    return epkData.gallery.collections.find((collection) => collection.id === id);
}

export function getAllCollections(epkData: EPKData): EPKGalleryCollection[] {
    return epkData.gallery.collections;
}

export function getCollectionsByVenue(epkData: EPKData, venue: string): EPKGalleryCollection[] {
    return epkData.gallery.collections.filter((collection) => collection.venue.toLowerCase().includes(venue.toLowerCase()));
}
