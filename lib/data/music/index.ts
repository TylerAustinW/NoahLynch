export type {
  Release,
  Platform,
  ReleaseWithPlatforms,
  Review,
  PlatformName,
  ReleaseType,
  ReleaseData,
} from "../../types/music.types";

import {
  getAllReleasesData,
  getPreviousReleasesData,
  getUpcomingReleaseData,
} from "./releases.data";
import type { Platform, PlatformName, ReleaseData, ReleaseWithPlatforms } from "@/lib/types";
import React from "react";
import {
  AppleMusicIcon,
  DeezerIcon,
  SpotifyIcon,
  YouTubeMusicIcon,
} from "@/components/icons/platform-icons.component";

function createPlatformLink(platform: PlatformName, url: string): Platform {
  const platformConfigs: Record<PlatformName, Omit<Platform, "url">> = {
    spotify: {
      name: "Spotify",
      icon: React.createElement(SpotifyIcon, { className: "w-5 h-5" }),
      bgColor: "#1DB954",
      color: "#ffffff",
    },
    "apple-music": {
      name: "Apple Music",
      icon: React.createElement(AppleMusicIcon, { className: "w-5 h-5" }),
      bgColor: "#FA243C",
      color: "#ffffff",
    },
    "youtube-music": {
      name: "YouTube Music",
      icon: React.createElement(YouTubeMusicIcon, { className: "w-5 h-5" }),
      bgColor: "#FF0000",
      color: "#ffffff",
    },
    deezer: {
      name: "Deezer",
      icon: React.createElement(DeezerIcon, { className: "w-5 h-5" }),
      bgColor: "#FEAA2D",
      color: "#ffffff",
    },
  };

  return {
    ...platformConfigs[platform],
    url,
  };
}

function resolveReleasePlatforms(releaseData: ReleaseData): ReleaseWithPlatforms {
  const platforms: Platform[] = releaseData.platformLinks.map((platformLink) =>
    createPlatformLink(platformLink.platform, platformLink.url),
  );

  return {
    id: releaseData.id,
    title: releaseData.title,
    year: releaseData.year,
    description: releaseData.description,
    imageURL: releaseData.imageURL,
    type: releaseData.type,
    releasedBy: releaseData.releasedBy,
    ...(releaseData.writtenBy && { writtenBy: releaseData.writtenBy }),
    releaseDate: releaseData.releaseDate,
    platforms,
    ...(releaseData.featured !== undefined && { featured: releaseData.featured }),
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
