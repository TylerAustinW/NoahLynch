"use client";

import { ExternalLink, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  description?: string;
  className?: string;
}

export default function YouTubeEmbed({
  videoId,
  title,
  description,
  className = "",
}: YouTubeEmbedProps) {
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  useEffect(() => {
    // Use YouTube oEmbed API to get the thumbnail URL
    fetch(`https://www.youtube.com/oembed?url=${watchUrl}&format=json`)
      .then((res) => res.json())
      .then((data) => {
        if (data.thumbnail_url) {
          setThumbnailUrl(data.thumbnail_url);
        } else {
          // Fallback to hqdefault if oEmbed fails
          setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
        }
      })
      .catch(() => {
        // Fallback to hqdefault if fetch fails
        setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
      });
  }, [videoId, watchUrl]);

  const handleClick = () => {
    window.open(watchUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`group relative ${className}`}>
      <div
        className="aspect-video cursor-pointer overflow-hidden rounded-xl border border-zinc-700/50 bg-zinc-900/50 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10"
        onClick={handleClick}
      >
        <div className="relative h-full w-full">
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={`${title} video thumbnail`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw"
              quality={75}
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-800">
              <Play className="h-12 w-12 text-zinc-600" />
            </div>
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/90 shadow-2xl backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-400/90">
              <Play className="ml-1 h-6 w-6 text-black" fill="currentColor" />
            </div>
          </div>

          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 rounded bg-red-600/90 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
              <ExternalLink className="h-3 w-3" />
              YouTube
            </div>
          </div>
        </div>
      </div>

      {(title || description) && (
        <div className="mt-4 space-y-2">
          {title && (
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg leading-tight font-medium text-white">{title}</h3>
              <button
                onClick={handleClick}
                className="mt-1 flex shrink-0 items-center gap-1 text-xs font-medium text-amber-200 opacity-75 transition-colors hover:text-amber-100 hover:opacity-100"
                aria-label={`Watch ${title} on YouTube`}
              >
                <ExternalLink className="h-3 w-3" />
                Watch
              </button>
            </div>
          )}
          {description && <p className="text-sm leading-relaxed text-zinc-400">{description}</p>}
        </div>
      )}
    </div>
  );
}
