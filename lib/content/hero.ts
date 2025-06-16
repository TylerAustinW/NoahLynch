export interface HeroCTA {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "ghost";
}

export interface SocialLink {
  platform: "instagram" | "facebook" | "tiktok" | "youtube";
  href: string;
}

export interface HeroContent {
  backgroundImage: string;
  backgroundVideo?: string;
  title: string;
  highlight: string;
  quote: string;
  ctas: HeroCTA[];
  socialLinks: SocialLink[];
}

export const heroContent: HeroContent = {
  backgroundImage: "/honest-coverr.png",
  // Provide a high-quality muted MP4 for desktop visitors (optional)
  backgroundVideo: "/video/hero-bg.mp4", // <=== place file in public/video/
  title: "Honest",
  highlight: "Out Now",
  quote:
    "I hope this record means as much to you as it does to me, thank you for the endless support",
  ctas: [
    { label: "Listen Now", href: "/music/honest", variant: "primary" },
    {
      label: "Contact",
      href: "mailto:NoahLynchContact@gmail.com",
      variant: "secondary",
    },
    { label: "Explore Music", href: "#music", variant: "ghost" },
    { label: "Explore Merch", href: "/merch", variant: "ghost" },
  ],
  socialLinks: [
    { platform: "instagram", href: "https://instagram.com/noahlynchmusic" },
    { platform: "facebook", href: "https://facebook.com/noahlynchmusic" },
    { platform: "tiktok", href: "https://tiktok.com/@noahlynchmusic" },
    { platform: "youtube", href: "https://youtube.com/@noahlynch" },
  ],
};
