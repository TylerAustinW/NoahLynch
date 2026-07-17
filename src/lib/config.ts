export const SITE = {
  name: "Noah Lynch",
  url: "https://www.noahlynch.com",
  description:
    "Discover Noah Lynch, a Mississippi-born singer-songwriter and musician blending blues, neo-rock, and acoustic vibes. Explore his music, upcoming shows",
};

export const SOCIALS = {
  instagram: "https://instagram.com/noahlynchmusic",
  facebook: "https://facebook.com/noahlynchmusic",
  tiktok: "https://tiktok.com/@noahlynchmusic",
  youtube: "https://youtube.com/@noahlynch",
  email: "NoahLynchContact@gmail.com",
};

export const SOCIAL_LINKS = [
  {
    platform: "instagram",
    href: SOCIALS.instagram,
    label: "Instagram",
    handle: "@noahlynchmusic",
    hoverColors: "hover:border-pink-500/50 hover:text-pink-400 hover:bg-pink-900/20",
    focusColors: "focus:border-pink-500 focus:text-pink-400",
    handleColors: "bg-zinc-900 text-zinc-300",
    arrowBorderColor: "border-r-zinc-900",
  },
  {
    platform: "facebook",
    href: SOCIALS.facebook,
    label: "Facebook",
    handle: "@noahlynchmusic",
    hoverColors: "hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-900/20",
    focusColors: "focus:border-blue-500 focus:text-blue-400",
    handleColors: "bg-zinc-900 text-zinc-300",
    arrowBorderColor: "border-r-zinc-900",
  },
  {
    platform: "tiktok",
    href: SOCIALS.tiktok,
    label: "TikTok",
    handle: "@noahlynchmusic",
    hoverColors: "hover:border-zinc-200/50 hover:text-zinc-200 hover:bg-zinc-200/10",
    focusColors: "focus:border-zinc-200 focus:text-zinc-200",
    handleColors: "bg-zinc-900 text-zinc-300",
    arrowBorderColor: "border-r-zinc-900",
  },
  {
    platform: "youtube",
    href: SOCIALS.youtube,
    label: "YouTube",
    handle: "@noahlynch",
    hoverColors: "hover:border-red-500/50 hover:text-red-400 hover:bg-red-900/20",
    focusColors: "focus:border-red-500 focus:text-red-400",
    handleColors: "bg-zinc-900 text-zinc-300",
    arrowBorderColor: "border-r-zinc-900",
  },
];

export const HASHTAGS = {
  main: "#NoahLynchMusic",
  liveMusic: "#LiveMusic",
  acoustic: "#AcousticVibes",
};

export const ROUTES = {
  home: "/",
  music: "/music",
  tourDates: "/tour-dates",
  epk: "/epk",
};
