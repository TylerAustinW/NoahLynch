export const SOCIAL_LINKS = {
    INSTAGRAM: "https://instagram.com/noahlynchmusic",
    FACEBOOK: "https://facebook.com/noahlynchmusic",
    TIKTOK: "https://tiktok.com/@noahlynchmusic",
    YOUTUBE: "https://youtube.com/@noahlynch",
    EMAIL: "NoahLynchContact@gmail.com",
} as const;

export const HASHTAGS = {
    MAIN: "#NoahLynchMusic",
    LIVE_MUSIC: "#LiveMusic",
    ACOUSTIC: "#AcousticVibes",
} as const;

export const ROUTES = {
    HOME: "/",
    CHECKIN: "/checkin",
    CHECKIN_SUCCESS: "/checkin/success",
    MUSIC: "/music",
    TOUR_DATES: "/tour-dates",
    EPK: "/epk",
} as const;

export const API_ENDPOINTS = {
    CHECKIN: "/api/checkin",
} as const;

export const FILE_UPLOAD = {
    MAX_SIZE: 50 * 1024 * 1024,
    MAX_IMAGE_SIZE: 10 * 1024 * 1024,
    MAX_VIDEO_SIZE: 50 * 1024 * 1024,
    ACCEPTED_IMAGE_TYPES: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    ACCEPTED_VIDEO_TYPES: ["video/mp4", "video/webm", "video/quicktime"],
} as const;

export const SUPABASE_TABLES = {
    SHOWS: "shows",
    CHECKINS: "checkins",
    CHECKIN_MEDIA: "checkin_media",
} as const;

export const SUPABASE_BUCKETS = {
    CHECKIN_MEDIA: "checkin-media",
} as const;

export const FEATURE_FLAGS = {
    CHECKIN_ENABLED: false,
} as const;
