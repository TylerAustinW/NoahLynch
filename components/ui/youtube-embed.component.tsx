"use client";

import { ExternalLink, Play } from "lucide-react";
import Image from "next/image";

interface YouTubeEmbedProps {
	videoId: string;
	title: string;
	description?: string;
	className?: string;
}

export default function YouTubeEmbed({ videoId, title, description, className = "" }: YouTubeEmbedProps) {
	const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
	const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

	const handleClick = () => {
		window.open(watchUrl, "_blank", "noopener,noreferrer");
	};

	return (
		<div className={`relative group ${className}`}>
			<div
				className="aspect-video bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-700/50 overflow-hidden shadow-2xl cursor-pointer transition-all duration-300 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10"
				onClick={handleClick}
			>
				<div className="relative w-full h-full">
					<Image
						src={thumbnailUrl}
						alt={`${title} video thumbnail`}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw"
						quality={75}
					/>

					<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

					<div className="absolute inset-0 flex items-center justify-center">
						<div className="w-16 h-16 bg-amber-500/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-400/90 shadow-2xl">
							<Play className="w-6 h-6 text-black ml-1" fill="currentColor" />
						</div>
					</div>

					<div className="absolute top-3 right-3">
						<div className="flex items-center gap-1 bg-red-600/90 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-medium">
							<ExternalLink className="w-3 h-3" />
							YouTube
						</div>
					</div>
				</div>
			</div>

			{(title || description) && (
				<div className="mt-4 space-y-2">
					{title && (
						<div className="flex items-start justify-between gap-3">
							<h3 className="text-lg font-medium text-white leading-tight">{title}</h3>
							<button
								onClick={handleClick}
								className="flex items-center gap-1 text-amber-200 hover:text-amber-100 transition-colors text-xs font-medium opacity-75 hover:opacity-100 flex-shrink-0 mt-1"
								aria-label={`Watch ${title} on YouTube`}
							>
								<ExternalLink className="w-3 h-3" />
								Watch
							</button>
						</div>
					)}
					{description && <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>}
				</div>
			)}
		</div>
	);
}
