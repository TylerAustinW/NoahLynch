import type { ReactNode } from 'react';

export type PlatformName = 'spotify' | 'apple-music' | 'youtube-music' | 'deezer' | 'tidal';

export type ReleaseType = 'out-now' | 'upcoming' | 'previous';

export interface Release {
  id: string;
  title: string;
  year: string;
  description: string;
  imageURL: string;
}

export interface PlatformConfig {
  name: string;
  icon: ReactNode;
  bgColor: string;
  color: string;
}

export interface Platform extends PlatformConfig {
  url: string;
}

export interface PlatformLinkData {
  platform: PlatformName;
  url: string;
}

export interface ReleaseData extends Release {
  type: ReleaseType;
  releasedBy: string;
  releaseDate: string;
  platformLinks: PlatformLinkData[];
  linkText?: string;
  linkURL?: string;
}

export interface ReleaseWithPlatforms extends Release {
  type: ReleaseType;
  releasedBy: string;
  releaseDate: string;
  platforms: Platform[];
  linkText?: string;
  linkURL?: string;
}

export interface Review {
  name: string;
  content: string;
  rating: number;
}
export type PlatformRegistry = Record<PlatformName, PlatformConfig>;
