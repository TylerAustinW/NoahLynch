export type {
	Release,
	Platform,
	ReleaseWithPlatforms,
	Review,
	PlatformName,
	ReleaseType,
	ReleaseData,
} from "../../types/music.types";

import { getAllReleasesData, getPreviousReleasesData, getUpcomingReleaseData } from "./releases.data";
import type { Platform, ReleaseData, ReleaseWithPlatforms, PlatformName } from "@/lib/types";

function createPlatformLink(platform: PlatformName, url: string): Platform {
	const platformConfigs: Record<PlatformName, Omit<Platform, "url">> = {
		spotify: {
			name: "Spotify",
			icon: "🎵",
			bgColor: "#1DB954",
			color: "#ffffff",
		},
		"apple-music": {
			name: "Apple Music",
			icon: "🍎",
			bgColor: "#FA243C",
			color: "#ffffff",
		},
		"youtube-music": {
			name: "YouTube Music",
			icon: "▶️",
			bgColor: "#FF0000",
			color: "#ffffff",
		},
		deezer: {
			name: "Deezer",
			icon: "🎧",
			bgColor: "#FEAA2D",
			color: "#ffffff",
		},
		tidal: {
			name: "TIDAL",
			icon: "🌊",
			bgColor: "#000000",
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
		releaseDate: releaseData.releaseDate,
		platforms,
		...(releaseData.linkText && { linkText: releaseData.linkText }),
		...(releaseData.linkURL && { linkURL: releaseData.linkURL }),
	};
}

export const allReleases: ReleaseWithPlatforms[] = getAllReleasesData().map(resolveReleasePlatforms);
getPreviousReleasesData().map(resolveReleasePlatforms);
(() => {
	const upcomingData = getUpcomingReleaseData();
	return upcomingData ? resolveReleasePlatforms(upcomingData) : null;
})();
export const getReleaseById = (id: string): ReleaseWithPlatforms | undefined => {
	return allReleases.find((release) => release.id === id);
};
