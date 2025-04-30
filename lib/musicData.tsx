import React from 'react';
import {
  FaAmazon,
  FaApple,
  FaDeezer,
  FaSpotify,
  FaYoutube,
} from 'react-icons/fa';
import { SiPandora } from 'react-icons/si';

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
}

export interface ReleaseWithPlatforms extends Release {
  platforms: Platform[];
  linkText?: string;
  type: 'upcoming' | 'previous';
  releasedBy: string;
  releaseDate: string;
}

export const createPlatformLink = (name: string, url: string): Platform => {
  const getIcon = (platformName: string): React.ReactNode => {
    switch (platformName) {
      case 'Spotify':
        return <FaSpotify className="h-6 w-6" />;
      case 'Apple Music':
        return <FaApple className="h-6 w-6" />;
      case 'Amazon Music':
        return <FaAmazon className="h-6 w-6" />;
      case 'YouTube Music':
        return <FaYoutube className="h-6 w-6" />;
      case 'Deezer':
        return <FaDeezer className="h-6 w-6" />;
      case 'Pandora':
        return <SiPandora className="h-6 w-6" />;
      default:
        return null;
    }
  };

  return {
    name,
    url,
    icon: getIcon(name),
  };
};

export const previousReleases: ReleaseWithPlatforms[] = [
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
      createPlatformLink(
        'Spotify',
        'https://open.spotify.com/track/2tFn7noYlbBqzECeUuDgLn',
      ),
      createPlatformLink(
        'Apple Music',
        'https://music.apple.com/album/good-things-take-time/1756853346?i=1756853347',
      ),
      createPlatformLink(
        'Amazon Music',
        'https://music.amazon.com/albums/B0D971YCZT',
      ),
      createPlatformLink(
        'YouTube Music',
        'https://music.youtube.com/playlist?list=OLAK5uy_kBPfSe2-d9b9DNCDLrMFkMqQSvJB2LRSQ',
      ),
      createPlatformLink(
        'Pandora',
        'https://pandora.com/artist/noah-lynch/good-things-take-time/ALhKVZ6x7dnkJPc',
      ),
      createPlatformLink('Deezer', 'https://www.deezer.com/us/album/614383912'),
    ],
    linkText: 'LISTEN NOW!',
  },
  {
    id: 'for-you',
    title: 'For You',
    year: '2024',
    description:
      'For You is a soulful, heartfelt ballad that captures the moment love changes everything. It’s a song about gratitude, peace, and unwavering devotion to someone who brings joy and strength through every season of life. With emotional lyrics and a timeless feel, For You is a tribute to the kind of love you never stop being thankful for.',
    imageURL: '/foryou.jpg',
    type: 'previous',
    releasedBy: 'Ready Records',
    releaseDate: 'June 1, 2024',
    platforms: [
      createPlatformLink(
        'Spotify',
        'https://open.spotify.com/track/7eCRFPhvQglvAwxdTatzGB',
      ),
      createPlatformLink(
        'Apple Music',
        'https://music.apple.com/album/for-you/1744360290?i=1744360291',
      ),
      createPlatformLink(
        'Amazon Music',
        'https://music.amazon.com/albums/B0D33XXDR2',
      ),
      createPlatformLink(
        'YouTube Music',
        'https://music.youtube.com/playlist?list=OLAK5uy_l8cmplc55OnsTminixgV_HdPR3XZS1wYA',
      ),
      createPlatformLink(
        'Pandora',
        'https://pandora.com/artist/noah-lynch/for-you/for-you/TRj33rhPZpzmljV',
      ),
      createPlatformLink('Deezer', 'https://www.deezer.com/us/album/581142311'),
    ],
    linkText: 'LISTEN NOW!',
  },
];

export const upcomingRelease: ReleaseWithPlatforms = {
  id: 'honest',
  title: 'Honest',
  year: '2025',
  type: 'upcoming',
  description:
    "\"Honest\" is Noah Lynch's personal reflection on embracing vulnerability during life's challenges. Written while anticipating fatherhood, the song encourages authenticity and reminds listeners that it's okay to not be okay. Noah hopes the track will foster understanding and connection through open communication.",
  imageURL: '/honest-cover.jpeg',
  releasedBy: 'Ready Records',
  releaseDate: 'May 9, 2025',
  platforms: [],
  linkText: 'PRE-SAVE NOW!',
};

export const allReleases: ReleaseWithPlatforms[] = [
  upcomingRelease,
  ...previousReleases,
];

export const getReleaseById = (
  id: string,
): ReleaseWithPlatforms | undefined => {
  return allReleases.find((release) => release.id === id);
};
