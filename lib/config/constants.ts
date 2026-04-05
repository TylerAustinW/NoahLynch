export const SITE_URL = "https://www.noahlynch.com";
export const SITE_NAME = "Noah Lynch";
export const SITE_DESCRIPTION =
  "Discover Noah Lynch, a Mississippi-born singer-songwriter and musician blending blues, neo-rock, and acoustic vibes. Explore his music, upcoming shows, and studio sessions.";

export const SOCIAL_LINKS = {
  INSTAGRAM: "https://instagram.com/noahlynchmusic",
  FACEBOOK: "https://facebook.com/noahlynchmusic",
  TIKTOK: "https://tiktok.com/@noahlynchmusic",
  YOUTUBE: "https://youtube.com/@noahlynch",
  EMAIL: "NoahLynchContact@gmail.com",
} as const;

/**
 * Full social link definitions for UI rendering.
 * Single source of truth — used by social-sidebar, hero, EPK, etc.
 */
export interface SocialLinkData {
  platform: string;
  href: string;
  label: string;
  handle: string;
  /** Tailwind hover color classes */
  hoverColors: string;
  /** Tailwind focus ring classes */
  focusColors: string;
  /** Tailwind classes for the tooltip/handle badge */
  handleColors: string;
  /** Tailwind border-right color for tooltip arrow */
  arrowBorderColor: string;
}

export const SOCIAL_LINK_DATA: SocialLinkData[] = [
  {
    platform: "instagram",
    href: SOCIAL_LINKS.INSTAGRAM,
    label: "Follow Noah Lynch on Instagram",
    handle: "@noahlynchmusic",
    hoverColors: "hover:border-pink-500/50 hover:bg-pink-500/10 hover:text-pink-400",
    focusColors: "focus:ring-pink-500/50",
    handleColors: "bg-pink-500/90 text-white",
    arrowBorderColor: "border-r-pink-500/90",
  },
  {
    platform: "facebook",
    href: SOCIAL_LINKS.FACEBOOK,
    label: "Follow Noah Lynch on Facebook",
    handle: "noahlynchmusic",
    hoverColors: "hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400",
    focusColors: "focus:ring-blue-500/50",
    handleColors: "bg-blue-500/90 text-white",
    arrowBorderColor: "border-r-blue-500/90",
  },
  {
    platform: "tiktok",
    href: SOCIAL_LINKS.TIKTOK,
    label: "Follow Noah Lynch on TikTok",
    handle: "@noahlynchmusic",
    hoverColors: "hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400",
    focusColors: "focus:ring-red-500/50",
    handleColors: "bg-red-500/90 text-white",
    arrowBorderColor: "border-r-red-500/90",
  },
  {
    platform: "youtube",
    href: SOCIAL_LINKS.YOUTUBE,
    label: "Subscribe to Noah Lynch on YouTube",
    handle: "@noahlynch",
    hoverColors: "hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400",
    focusColors: "focus:ring-red-500/50",
    handleColors: "bg-red-500/90 text-white",
    arrowBorderColor: "border-r-red-500/90",
  },
];

export const HASHTAGS = {
  MAIN: "#NoahLynchMusic",
  LIVE_MUSIC: "#LiveMusic",
  ACOUSTIC: "#AcousticVibes",
} as const;

export const ROUTES = {
  HOME: "/",
  MUSIC: "/music",
  TOUR_DATES: "/tour-dates",
  EPK: "/epk",
} as const;
