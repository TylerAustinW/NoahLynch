export interface Release {
  id: string;
  title: string;
  year: string;
  description: string;
  cover: string;
  type: "out-now" | "upcoming" | "previous";
  releaseDate: string;
  releasedBy: string;
  writtenBy?: string;
  featured?: boolean;
  linkText?: string;
  linkURL?: string;
  links: {
    spotify?: string;
    appleMusic?: string;
    youtubeMusic?: string;
    deezer?: string;
  };
}

export const RELEASES: Release[] = [
  {
    id: "chasing-a-feelin",
    title: "Chasing A Feelin'",
    year: "2025",
    type: "out-now",
    description:
      "Chasing a Feelin' is Noah Lynch's fourth official studio single. It's a story-driven track about holding onto something that's already slipping away. It captures the moment you realize you've been giving your all to someone who was never truly there. With heartfelt vocals, vivid storytelling, and a blend of acoustic warmth and modern edge, the song speaks to anyone who's ever tried to save a one-sided love. Showcasing his most honest and refined sound yet, it offers a glimpse of what's to come on his debut album.",
    cover: "/covers/chasing-a-feelin.png",
    releasedBy: "Ready Records",
    writtenBy: "Noah Lynch",
    releaseDate: "October 24, 2025",
    linkText: "LISTEN NOW!",
    links: {
      spotify: "https://open.spotify.com/album/3LZxsw9j2CVZL1VOaMeG3K",
      youtubeMusic: "https://www.youtube.com/watch?v=jEdLu0jFN7Y",
      appleMusic: "https://music.apple.com/us/album/chasing-a-feelin-single/1846472605",
      deezer: "https://www.deezer.com/us/album/839393512",
    },
  },
  {
    id: "honest",
    title: "Honest",
    year: "2025",
    type: "out-now",
    description:
      "\"Honest\" is Noah Lynch's personal reflection on embracing vulnerability during life's challenges. Written while anticipating fatherhood, the song encourages authenticity and reminds listeners that it's okay to not be okay. Noah hopes the track will foster understanding and connection through open communication.",
    cover: "/covers/honest-cover.jpeg",
    releasedBy: "Ready Records",
    writtenBy: "Noah Lynch",
    releaseDate: "May 9, 2025",
    featured: false,
    linkText: "LISTEN NOW!",
    links: {
      youtubeMusic:
        "https://music.youtube.com/playlist?list=OLAK5uy_n-dgJjbWh8Gvscv_R-2oNQTI7LYSZpwU4",
      spotify: "https://open.spotify.com/album/5HJACu3aHQnYqLjfaIP6hT",
      appleMusic: "https://music.apple.com/us/album/honest-single/1810499543",
      deezer: "https://www.deezer.com/us/album/747865561",
    },
  },
  {
    id: "good-things-take-time",
    title: "Good Things Take Time",
    year: "2024",
    type: "previous",
    description:
      '"Good Things Take Time" The 2nd release from "Noah Lynch" takes a deeper look into his personal life. With the instant success of "For You" Noah had doubt and worry when it came to his music career. This song highlights the emotion Noah was facing during this time, while also reminding himself that "Good Things Take Time"',
    cover: "/covers/single-good-things-take-time-cover.jpg",
    releasedBy: "Ready Records",
    writtenBy: "Noah Lynch",
    releaseDate: "July 27, 2024",
    linkText: "LISTEN NOW!",
    links: {
      youtubeMusic:
        "https://music.youtube.com/playlist?list=OLAK5uy_kBPfSe2-d9b9DNCDLrMFkMqQSvJB2LRSQ",
      spotify: "https://open.spotify.com/track/2tFn7noYlbBqzECeUuDgLn",
      appleMusic: "https://music.apple.com/album/good-things-take-time/1756853346?i=1756853347",
      deezer: "https://www.deezer.com/us/album/614383912",
    },
  },
  {
    id: "for-you",
    title: "For You",
    year: "2024",
    type: "previous",
    description:
      "For You is a soulful, heartfelt ballad that captures the moment love changes everything. It's a song about gratitude, peace, and unwavering devotion to someone who brings joy and strength through every season of life. With emotional lyrics and a timeless feel, For You is a tribute to the kind of love you never stop being thankful for.",
    cover: "/covers/single-for-you-cover.jpg",
    releasedBy: "Ready Records",
    writtenBy: "Noah Lynch",
    releaseDate: "June 1, 2024",
    linkText: "LISTEN NOW!",
    links: {
      youtubeMusic:
        "https://music.youtube.com/playlist?list=OLAK5uy_l8cmplc55OnsTminixgV_HdPR3XZS1wYA",
      spotify: "https://open.spotify.com/track/7eCRFPhvQglvAwxdTatzGB",
      appleMusic: "https://music.apple.com/album/for-you/1744360290?i=1744360291",
      deezer: "https://www.deezer.com/us/album/581142311",
    },
  },
];

export const getRelease = (id: string): Release | undefined => {
  return RELEASES.find((r) => r.id === id);
};

export const getFeatured = (): Release | undefined => {
  return RELEASES.find((r) => r.featured) || RELEASES[0];
};

export const getByType = (type: Release["type"]): Release[] => {
  return RELEASES.filter((r) => r.type === type);
};

export const getAll = (): Release[] => {
  return RELEASES;
};
