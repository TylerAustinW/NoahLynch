"use client";

import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";

interface YouTubeEmbedProps {
	videoId: string;
	title: string;
	description?: string;
	className?: string;
	autoplay?: boolean;
}

export default function YouTubeEmbed({ videoId, title, description, className = "", autoplay = false }: YouTubeEmbedProps) {
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasError, setHasError] = useState(false);

	const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1${autoplay ? "&autoplay=1" : ""}`;
	const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

	const handleLoad = () => {
		setIsLoaded(true);
		setHasError(false);
	};

	const handleError = () => {
		setHasError(true);
		setIsLoaded(false);
	};

	if (hasError) {
		return (
			<div className={`relative group ${className}`}>
				<div className="aspect-video bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-700/50 flex items-center justify-center">
					<div className="text-center p-6">
						<div className="w-16 h-16 bg-zinc-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
							<Play className="w-6 h-6 text-zinc-400" />
						</div>
						<p className="text-zinc-400 text-sm mb-3">Video unavailable</p>
						<a
							href={watchUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 text-amber-200 hover:text-amber-100 transition-colors text-sm font-medium"
						>
							<ExternalLink className="w-4 h-4" />
							Watch on YouTube
						</a>
					</div>
				</div>
				{(title || description) && (
					<div className="mt-4">
						{title && <h3 className="text-lg font-medium text-white mb-2">{title}</h3>}
						{description && <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>}
					</div>
				)}
			</div>
		);
	}

	return (
		<div className={`relative group ${className}`}>
			<div className="aspect-video bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-700/50 overflow-hidden shadow-2xl">
				{!isLoaded && (
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="text-center">
							<div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
								<Play className="w-6 h-6 text-amber-200" />
							</div>
							<p className="text-zinc-400 text-sm">Loading video...</p>
						</div>
					</div>
				)}

				<iframe
					src={embedUrl}
					title={title}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen
					className="w-full h-full"
					onLoad={handleLoad}
					onError={handleError}
					loading="lazy"
				/>

				<div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
			</div>

			{(title || description) && (
				<div className="mt-4 space-y-2">
					{title && (
						<div className="flex items-start justify-between gap-3">
							<h3 className="text-lg font-medium text-white leading-tight">{title}</h3>
							<a
								href={watchUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-1 text-amber-200 hover:text-amber-100 transition-colors text-xs font-medium opacity-75 hover:opacity-100 flex-shrink-0 mt-1"
								aria-label={`Watch ${title} on YouTube`}
							>
								<ExternalLink className="w-3 h-3" />
								YouTube
							</a>
						</div>
					)}
					{description && <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>}
				</div>
			)}
		</div>
	);
}
