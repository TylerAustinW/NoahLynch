export type { Release, Platform, ReleaseWithPlatforms, Review, PlatformName, ReleaseType, ReleaseData } from "../../types/music";

import { getAllReleasesData, getPreviousReleasesData, getUpcomingReleaseData } from "../releases";
import { createPlatformLink } from "../../config/platforms";
import type { Platform, ReleaseData, ReleaseWithPlatforms } from "@/lib/types";

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
