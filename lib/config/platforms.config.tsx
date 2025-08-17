import { FaDeezer, FaSpotify } from "react-icons/fa";
import { SiTidal } from "react-icons/si";
import { Music, Play } from "lucide-react";
import type { Platform, PlatformConfig, PlatformName, PlatformRegistry } from "@/lib/types";

const PLATFORM_REGISTRY: PlatformRegistry = {
	spotify: {
		name: "Spotify",
		icon: <FaSpotify className="h-5 w-5 sm:h-6 sm:w-6" />,
		bgColor: "#1DB954",
		color: "#FFFFFF",
	},
	"apple-music": {
		name: "Apple Music",
		icon: <Music className="h-5 w-5 sm:h-6 sm:w-6" />,
		bgColor: "#FF2D55",
		color: "#FFFFFF",
	},
	"youtube-music": {
		name: "YouTube Music",
		icon: <Play className="h-5 w-5 sm:h-6 sm:w-6" />,
		bgColor: "#FF0000",
		color: "#FFFFFF",
	},
	deezer: {
		name: "Deezer",
		icon: <FaDeezer className="h-5 w-5 sm:h-6 sm:w-6" />,
		bgColor: "#191919",
		color: "#FFFFFF",
	},
	tidal: {
		name: "Tidal",
		icon: <SiTidal className="h-5 w-5 sm:h-6 sm:w-6" />,
		bgColor: "#000000",
		color: "#FFFFFF",
	},
};

export function getPlatformConfig(platformName: PlatformName): PlatformConfig {
	const config = PLATFORM_REGISTRY[platformName];
	if (!config) {
		throw new Error(`Unknown platform: ${platformName}. Available platforms: ${Object.keys(PLATFORM_REGISTRY).join(", ")}`);
	}
	return config;
}

export function createPlatformLink(platformName: PlatformName, url: string): Platform {
	const config = getPlatformConfig(platformName);
	return {
		...config,
		url,
	};
}
