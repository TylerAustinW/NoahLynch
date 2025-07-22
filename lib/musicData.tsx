export type {
  Release,
  Platform,
  ReleaseWithPlatforms,
  Review,
  PlatformName,
  ReleaseType,
  ReleaseData,
} from './types/music';

import {
  getAllReleasesData,
  getPreviousReleasesData,
  getUpcomingReleaseData,
} from './data/releases';
import { createPlatformLink } from './config/platforms';
import type { ReleaseWithPlatforms, ReleaseData, Platform, PlatformName } from './types/music';

function resolveReleasePlatforms(releaseData: ReleaseData): ReleaseWithPlatforms {
  const platforms: Platform[] = releaseData.platformLinks.map((platformLink) =>
    createPlatformLink(platformLink.platform, platformLink.url)
  );

  return {
    id: releaseData.id,
    title: releaseData.title,
    year: releaseData.year,
    description: releaseData.description,
    imageURL: releaseData.imageURL,
    type: releaseData.type,
    releasedBy: releaseData.releasedBy,
    releaseDate: releaseData.releaseDate,
    platforms,
    ...(releaseData.linkText && { linkText: releaseData.linkText }),
    ...(releaseData.linkURL && { linkURL: releaseData.linkURL }),
  };
}

export const allReleases: ReleaseWithPlatforms[] =
  getAllReleasesData().map(resolveReleasePlatforms);

export const previousReleases: ReleaseWithPlatforms[] =
  getPreviousReleasesData().map(resolveReleasePlatforms);

export const upcomingRelease: ReleaseWithPlatforms | null = (() => {
  const upcomingData = getUpcomingReleaseData();
  return upcomingData ? resolveReleasePlatforms(upcomingData) : null;
})();

export const getReleaseById = (id: string): ReleaseWithPlatforms | undefined => {
  return allReleases.find((release) => release.id === id);
};

export const PlatformLink = (name: string, url: string): Platform => {
  const platformNameMap: Record<string, string> = {
    Spotify: 'spotify',
    'Apple Music': 'apple-music',
    'YouTube Music': 'youtube-music',
    Deezer: 'deezer',
    Tidal: 'tidal',
  };

  const platformName = platformNameMap[name];
  if (!platformName) {
    throw new Error(`Unknown platform: ${name}`);
  }

  return createPlatformLink(platformName as PlatformName, url);
};
