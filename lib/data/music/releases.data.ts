import type { ReleaseData } from "@/lib/types/music.types";

export const RELEASES_DATA: ReleaseData[] = [
  {
    id: "honest",
    title: "Honest",
    year: "2025",
    type: "out-now",
    description:
      "\"Honest\" is Noah Lynch's personal reflection on embracing vulnerability during life's challenges. Written while anticipating fatherhood, the song encourages authenticity and reminds listeners that it's okay to not be okay. Noah hopes the track will foster understanding and connection through open communication.",
    imageURL: "/covers/honest-cover.jpeg",
    releasedBy: "Ready Records",
    releaseDate: "May 9, 2025",
    featured: false,
    platformLinks: [
      {
        platform: "youtube-music",
        url: "https://music.youtube.com/playlist?list=OLAK5uy_n-dgJjbWh8Gvscv_R-2oNQTI7LYSZpwU4",
      },
      {
        platform: "spotify",
        url: "https://open.spotify.com/album/5HJACu3aHQnYqLjfaIP6hT",
      },
      {
        platform: "apple-music",
        url: "https://music.apple.com/us/album/honest-single/1810499543",
      },
      {
        platform: "deezer",
        url: "https://www.deezer.com/us/album/747865561",
      },
    ],
    linkText: "LISTEN NOW!",
  },
  {
    id: "good-things-take-time",
    title: "Good Things Take Time",
    year: "2024",
    type: "previous",
    description:
      '"Good Things Take Time" The 2nd release from "Noah Lynch" takes a deeper look into his personal life. With the instant success of "For You" Noah had doubt and worry when it came to his music career. This song highlights the emotion Noah was facing during this time, while also reminding himself that "Good Things Take Time"',
    imageURL: "/covers/single-good-things-take-time-cover.jpg",
    releasedBy: "Ready Records",
    releaseDate: "July 27, 2024",
    platformLinks: [
      {
        platform: "youtube-music",
        url: "https://music.youtube.com/playlist?list=OLAK5uy_kBPfSe2-d9b9DNCDLrMFkMqQSvJB2LRSQ",
      },
      {
        platform: "spotify",
        url: "https://open.spotify.com/track/2tFn7noYlbBqzECeUuDgLn",
      },
      {
        platform: "apple-music",
        url: "https://music.apple.com/album/good-things-take-time/1756853346?i=1756853347",
      },
      {
        platform: "deezer",
        url: "https://www.deezer.com/us/album/614383912",
      },
    ],
    linkText: "LISTEN NOW!",
  },
  {
    id: "for-you",
    title: "For You",
    year: "2024",
    type: "previous",
    description:
      "For You is a soulful, heartfelt ballad that captures the moment love changes everything. It's a song about gratitude, peace, and unwavering devotion to someone who brings joy and strength through every season of life. With emotional lyrics and a timeless feel, For You is a tribute to the kind of love you never stop being thankful for.",
    imageURL: "/covers/single-for-you-cover.jpg",
    releasedBy: "Ready Records",
    releaseDate: "June 1, 2024",
    platformLinks: [
      {
        platform: "youtube-music",
        url: "https://music.youtube.com/playlist?list=OLAK5uy_l8cmplc55OnsTminixgV_HdPR3XZS1wYA",
      },
      {
        platform: "spotify",
        url: "https://open.spotify.com/track/7eCRFPhvQglvAwxdTatzGB",
      },
      {
        platform: "apple-music",
        url: "https://music.apple.com/album/for-you/1744360290?i=1744360291",
      },
      {
        platform: "deezer",
        url: "https://www.deezer.com/us/album/581142311",
      },
    ],
    linkText: "LISTEN NOW!",
  },
  {
    id: "chasing-a-feelin",
    title: "Chasing A Feelin'",
    year: "2025",
    featured: true,
    type: "out-now",
    description:
      "Chasing a Feelin' is Noah Lynch's fourth official studio single. It's a story-driven track about holding onto something that's already slipping away. It captures the moment you realize you've been giving your all to someone who was never truly there. With heartfelt vocals, vivid storytelling, and a blend of acoustic warmth and modern edge, the song speaks to anyone who's ever tried to save a one-sided love. Produced by Ready Records and written by Noah Lynch, Chasing a Feelin' showcases his most honest and refined sound yet, offering a glimpse of what's to come on his debut album.",
    imageURL: "/covers/chasing-a-feelin.png",
    releasedBy: "Ready Records",
    writtenBy: "Noah Lynch",
    releaseDate: "October 24, 2025",
    platformLinks: [],
    linkText: "LISTEN NOW!",
  },
];

export const UPCOMING_RELEASES_DATA: ReleaseData[] = [];

export function getAllReleasesData(): ReleaseData[] {
  return [...UPCOMING_RELEASES_DATA, ...RELEASES_DATA];
}
export function getPreviousReleasesData(): ReleaseData[] {
  return RELEASES_DATA.filter((release) => release.type === "previous");
}

export function getUpcomingReleaseData(): ReleaseData | null {
  return UPCOMING_RELEASES_DATA[0] || null;
}
