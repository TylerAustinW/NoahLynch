export const ROUTES = {
    HOME: "/",
    TOUR_DATES: "/tour-dates",
    EPK: "/epk",
    WRONG_NOTE: "/wrongnote",

    MUSIC: {
        BASE: "/music",
    },

    CHECKIN: {
        BASE: "/checkin",
        SUCCESS: "/checkin/success",
        API: "/api/checkin",
    },

    EXTERNAL: {
        SPOTIFY_ARTIST: "https://open.spotify.com/artist/66Y8vZBPqiYJTGdOXUbnLl",
        APPLE_MUSIC: "https://music.apple.com/us/artist/noah-lynch/1502742835",
        YOUTUBE: "https://youtube.com/@noahlynchmusic",
        INSTAGRAM: "https://instagram.com/Noahlynchmusic",
        TIKTOK: "https://tiktok.com/@noahlynchmusic",
        FACEBOOK: "https://facebook.com/Noahlynchmusic",
        BANDSINTOWN: "https://www.bandsintown.com/a/13543902-noah-lynch",
        SONGKICK: "https://www.songkick.com/artists/10314654-noah-lynch",
        MERCH: "https://noah-lynch.creator-spring.com",
    },

    ASSETS: {
        HERO_VIDEO: "/videos/noah-lynch-hero-video.mp4",
        MOBILE_BG: "/portraits/Mobile-Background.jpg",
        GRAIN_TEXTURE: "/overlays/grain-texture-overlay.png",
        PORTRAIT_GUITAR: "/portraits/noah-lynch-portrait-guitar.jpeg",
        STUDIO_BW: "/portraits/noah-lynch-studio-black-white.jpg",
        STUDIO_SESSION: "/portraits/noah-lynch-studio-session.jpeg",
        MAGNOLIA_SESSION: "/venues/magnolia-blues/noah-lynch-magnolia-blues-session.jpg",
    },

    API: {
        CHECKIN: "/api/checkin",
    },

    SECTIONS: {
        HERO: "#hero",
        BIOGRAPHY: "#biography",
        TOUR_DATES: "#tour-dates",
        MUSIC: "#music",
        STUDIO_SESSIONS: "#studio-sessions",
        CONTACT: "#contact",
    },
} as const;

export type AppRoute = typeof ROUTES;
export type RouteKey = keyof typeof ROUTES;
export type ExternalRoute = keyof typeof ROUTES.EXTERNAL;
export type AssetRoute = keyof typeof ROUTES.ASSETS;
