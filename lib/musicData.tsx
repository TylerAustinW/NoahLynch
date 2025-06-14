import React from 'react';
import {
  FaDeezer,
  FaSpotify,
} from 'react-icons/fa';
import { SiTidal } from 'react-icons/si';
import { Music, Play } from 'lucide-react';

export interface Release {
  id: string;
  title: string;  
  year: string;
  description: string;
  imageURL: string;
}

export interface Platform {
  name: string;
  url: string;
  icon: React.ReactNode;
  color?: string;
  bgColor?: string;
}

export interface ReleaseWithPlatforms extends Release {
  platforms: Platform[];
  linkText?: string;
  type: 'out-now' | 'upcoming' | 'previous';
  releasedBy: string;
  releaseDate: string;
  linkURL?: string;
}

export interface Review {
  name: string;
  content: string;
  rating: number;
}

export const PlatformLink = (name: string, url: string): Platform => {
  let icon: React.ReactNode;
  let color: string | undefined;
  let bgColor: string | undefined;

  switch (name) {
    case 'Spotify':
      icon = <FaSpotify className="h-5 w-5 sm:h-6 sm:w-6" />;
      bgColor = '#1DB954';
      color = '#FFFFFF';
      break;
    case 'Apple Music':
      icon = <Music className="h-5 w-5 sm:h-6 sm:w-6" />;
      bgColor = '#FF2D55';
      color = '#FFFFFF';
      break;
    case 'YouTube Music':
      icon = <Play className="h-5 w-5 sm:h-6 sm:w-6" />;
      bgColor = '#FF0000';
      color = '#FFFFFF';
      break;
    case 'Deezer':
      icon = <FaDeezer className="h-5 w-5 sm:h-6 sm:w-6" />;
      bgColor = '#191919';
      color = '#FFFFFF';
      break;
    case 'Tidal':
      icon = <SiTidal className="h-5 w-5 sm:h-6 sm:w-6" />;
      bgColor = '#000000';
      color = '#FFFFFF';
      break;
    default:
      icon = null;
      color = undefined;
      bgColor = undefined;
  }

  return {
    name,
    url,
    icon,
    color,
    bgColor,
  };
};

const honestAsPreviousRelease: ReleaseWithPlatforms = {
  id: 'honest',
  title: 'Honest',
  year: '2025',
  type: 'out-now',
  description:
    "\"Honest\" is Noah Lynch's personal reflection on embracing vulnerability during life's challenges. Written while anticipating fatherhood, the song encourages authenticity and reminds listeners that it's okay to not be okay. Noah hopes the track will foster understanding and connection through open communication.",
  imageURL: '/honest-cover.jpeg',
  releasedBy: 'Ready Records',
  releaseDate: 'May 9, 2025',
  platforms: [
    PlatformLink('YouTube Music', 'https://music.youtube.com/playlist?list=OLAK5uy_n-dgJjbWh8Gvscv_R-2oNQTI7LYSZpwU4'),
    PlatformLink('Spotify', 'https://open.spotify.com/album/5HJACu3aHQnYqLjfaIP6hT'),
    PlatformLink('Apple Music', 'https://music.apple.com/us/album/honest-single/1810499543'),
    PlatformLink('Deezer', 'https://www.deezer.com/us/album/747865561'),
  ],
  linkText: 'LISTEN NOW!',
};

export const previousReleases: ReleaseWithPlatforms[] = [
  honestAsPreviousRelease,
  {
    id: 'good-things-take-time',
    title: 'Good things take time',
    year: '2024',
    description:
      '"Good Things Take Time" The 2nd release from "Noah Lynch" takes a deeper look into his personal life. With the instant success of "For You" Noah had doubt and worry when it came to his music career. This song highlights the emotion Noah was facing during this time, while also reminding himself that "Good Things Take Time"',
    imageURL: '/gttt.jpg',
    type: 'previous',
    releasedBy: 'Ready Records',
    releaseDate: 'July 27, 2024',
    platforms: [
      PlatformLink('YouTube Music', 'https://music.youtube.com/playlist?list=OLAK5uy_kBPfSe2-d9b9DNCDLrMFkMqQSvJB2LRSQ'),
      PlatformLink('Spotify', 'https://open.spotify.com/track/2tFn7noYlbBqzECeUuDgLn'),
      PlatformLink('Apple Music', 'https://music.apple.com/album/good-things-take-time/1756853346?i=1756853347'),
      PlatformLink('Deezer', 'https://www.deezer.com/us/album/614383912'),
    ],
    linkText: 'LISTEN NOW!',
  },
  {
    id: 'for-you',
    title: 'For You',
    year: '2024',
    description:
      "For You is a soulful, heartfelt ballad that captures the moment love changes everything. It's a song about gratitude, peace, and unwavering devotion to someone who brings joy and strength through every season of life. With emotional lyrics and a timeless feel, For You is a tribute to the kind of love you never stop being thankful for.",
    imageURL: '/foryou.jpg',
    type: 'previous',
    releasedBy: 'Ready Records',
    releaseDate: 'June 1, 2024',
    platforms: [
      PlatformLink('YouTube Music', 'https://music.youtube.com/playlist?list=OLAK5uy_l8cmplc55OnsTminixgV_HdPR3XZS1wYA'),
      PlatformLink('Spotify', 'https://open.spotify.com/track/7eCRFPhvQglvAwxdTatzGB'),
      PlatformLink('Apple Music', 'https://music.apple.com/album/for-you/1744360290?i=1744360291'),
      PlatformLink('Deezer', 'https://www.deezer.com/us/album/581142311'),
    ],
    linkText: 'LISTEN NOW!',
  },
];

export const upcomingRelease: ReleaseWithPlatforms | null = null;

export const allReleases: ReleaseWithPlatforms[] = upcomingRelease
  ? [upcomingRelease, ...previousReleases]
  : [...previousReleases];

export const getReleaseById = (
  id: string,
): ReleaseWithPlatforms | undefined => {
  return allReleases.find((release) => release.id === id);
};
