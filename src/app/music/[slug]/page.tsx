import {
  AppleMusicIcon,
  DeezerIcon,
  SpotifyIcon,
  YouTubeMusicIcon,
} from "@/components/icons/icons";
import { Button } from "@/components/ui/button";
import ErrorBoundary from "@/components/ui/error-boundary";
import { SITE } from "@/lib/config";
import { RELEASES, getRelease, type Release as NewRelease } from "@/lib/data/music";
import { ArrowLeft, Heart } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateStaticParams() {
  return RELEASES.map((release: NewRelease) => ({
    slug: release.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const release = getRelease(slug);

  if (!release) {
    return {
      title: "Release Not Found",
    };
  }

  const siteUrl = SITE.url;
  const absoluteImageUrl = release.cover.startsWith("http")
    ? release.cover
    : `${siteUrl}${release.cover}`;

  return {
    title: release.title,
    description: release.description,
    alternates: {
      canonical: `/music/${slug}`,
    },
    openGraph: {
      type: "music.album",
      title: `${release.title} | ${SITE.name}`,
      description: release.description,
      url: `${siteUrl}/music/${slug}`,
      siteName: SITE.name,
      images: [
        {
          url: absoluteImageUrl,
          width: 800,
          height: 800,
          alt: `${release.title} Cover Art`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${release.title} | ${SITE.name}`,
      description: release.description,
      images: [absoluteImageUrl],
    },
  };
}

export default async function MusicReleasePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const release = getRelease(slug);

  if (!release) {
    notFound();
  }

  const isUpcoming = release.type === "upcoming";
  const typeColor = isUpcoming ? "text-amber-400" : "text-cyan-400";
  const typeBgColor = isUpcoming ? "bg-amber-900/50" : "bg-cyan-900/50";
  const typeBorderColor = isUpcoming ? "border-amber-700/50" : "border-cyan-700/50";

  const PlatformButtons = (
    <>
      <h3 className="mb-4 text-center text-xl font-semibold text-white md:text-left">
        Listen Now:
      </h3>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:justify-start md:gap-4">
        {release.links.spotify && (
          <Button
            asChild
            variant="outline"
            size="default"
            className="flex min-h-[48px] w-full flex-col items-center justify-center gap-2 border-zinc-700/50 text-white backdrop-blur-sm transition-all duration-300 hover:border-green-500/50 hover:bg-zinc-800/60 focus:ring-2 focus:ring-green-400/50 focus:outline-none sm:flex-row"
            style={{ backgroundColor: "#1DB954" }}
          >
            <Link
              href={release.links.spotify}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Listen on Spotify"
              className="flex items-center gap-2"
            >
              <SpotifyIcon className="h-6 w-6 text-white" />
              <span className="text-sm font-medium text-white">Spotify</span>
            </Link>
          </Button>
        )}
        {release.links.appleMusic && (
          <Button
            asChild
            variant="outline"
            size="default"
            className="flex min-h-[48px] w-full flex-col items-center justify-center gap-2 border-zinc-700/50 text-white backdrop-blur-sm transition-all duration-300 hover:border-red-500/50 hover:bg-zinc-800/60 focus:ring-2 focus:ring-red-400/50 focus:outline-none sm:flex-row"
            style={{ backgroundColor: "#FA243C" }}
          >
            <Link
              href={release.links.appleMusic}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Listen on Apple Music"
              className="flex items-center gap-2"
            >
              <AppleMusicIcon className="h-6 w-6 text-white" />
              <span className="text-sm font-medium text-white">Apple Music</span>
            </Link>
          </Button>
        )}
        {release.links.youtubeMusic && (
          <Button
            asChild
            variant="outline"
            size="default"
            className="flex min-h-[48px] w-full flex-col items-center justify-center gap-2 border-zinc-700/50 text-white backdrop-blur-sm transition-all duration-300 hover:border-red-500/50 hover:bg-zinc-800/60 focus:ring-2 focus:ring-red-400/50 focus:outline-none sm:flex-row"
            style={{ backgroundColor: "#FF0000" }}
          >
            <Link
              href={release.links.youtubeMusic}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Listen on YouTube Music"
              className="flex items-center gap-2"
            >
              <YouTubeMusicIcon className="h-6 w-6 text-white" />
              <span className="text-sm font-medium text-white">YouTube Music</span>
            </Link>
          </Button>
        )}
        {release.links.deezer && (
          <Button
            asChild
            variant="outline"
            size="default"
            className="flex min-h-[48px] w-full flex-col items-center justify-center gap-2 border-zinc-700/50 text-white backdrop-blur-sm transition-all duration-300 hover:border-orange-500/50 hover:bg-zinc-800/60 focus:ring-2 focus:ring-orange-400/50 focus:outline-none sm:flex-row"
            style={{ backgroundColor: "#FEAA2D" }}
          >
            <Link
              href={release.links.deezer}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Listen on Deezer"
              className="flex items-center gap-2"
            >
              <DeezerIcon className="h-6 w-6 text-white" />
              <span className="text-sm font-medium text-white">Deezer</span>
            </Link>
          </Button>
        )}
      </div>
    </>
  );

  const ListenNowLinks = (
    <div className="w-full border-t border-zinc-700/40 pt-6 md:pt-8">
      {(() => {
        if (isUpcoming && release.linkURL) {
          return (
            <Button
              asChild
              variant="primary"
              size="lg"
              className="w-full bg-amber-600 font-semibold text-black hover:bg-amber-500"
            >
              <Link href={release.linkURL} target="_blank" rel="noopener noreferrer">
                {release.linkText || "Coming Soon"}
              </Link>
            </Button>
          );
        }
        const hasLinks = Object.values(release.links).some((link) => link);
        if (hasLinks) {
          return PlatformButtons;
        }
        return <p className="text-center text-zinc-400">Details coming soon.</p>;
      })()}
    </div>
  );

  const SpecialThanksContent = (
    <div className="font-patrick text-center text-lg leading-relaxed text-amber-100/90 lg:text-xl">
      <p className="text-center font-medium">
        Bringing "Honest" to life has been one of the most meaningful creative experiences of my
        life, and I couldn't have done it without the support, talent, and heart of some truly
        incredible people. To <strong>Levi Ready</strong>, <strong>Isaac Moreno</strong>,{" "}
        <strong>Tyler Bridge</strong>, <strong>Jamie Wroten</strong>,{" "}
        <strong>Tyler Williams</strong>, <strong>Christopher Chittom</strong>,{" "}
        <strong>Evan Busbin</strong>, <strong>Hagen Brister</strong>, and{" "}
        <strong>Sherry Thibodeaux</strong>
        —thank you for your time, energy, and the unique ways each of you contributed to this song.
        <br />
        <br />
        And last but never least, to my amazing wife <strong>Hunter Lynch</strong> your love,
        strength, and unwavering belief in me are the foundation of everything I do. Thank you for
        being my home, my muse, and my greatest encouragement.
      </p>
      <p className="mt-6 text-center">
        With all my gratitude,
        <br />-{" "}
        <strong>
          Noah Lynch <Heart className="relative -top-px ml-1 inline-block h-4 w-4 text-red-400" />
        </strong>
      </p>
    </div>
  );

  const BackToMusicLink = (
    <div className="mb-8 text-center">
      <Button
        asChild
        variant="ghost"
        size="default"
        className="h-12 px-6 text-base sm:h-10 sm:px-4 sm:text-sm"
      >
        <Link href="/#music" className="inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to All Music
        </Link>
      </Button>
    </div>
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    name: release.title,
    byArtist: {
      "@type": "MusicGroup",
      name: SITE.name,
      url: SITE.url,
    },
    datePublished: release.releaseDate,
    producer: release.releasedBy,
    ...(release.writtenBy && { author: release.writtenBy }),
    description: release.description,
    image: release.cover,
    genre: "Acoustic Pop",
  };

  return (
    <ErrorBoundary>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative min-h-screen bg-zinc-950 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={release.cover}
            alt={`${release.title} Background`}
            fill
            sizes="100vw"
            className="object-cover opacity-20 blur-sm"
            quality={75}
            priority
          />
          <div className="absolute inset-0 bg-zinc-950/80"></div>
        </div>

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/3 -right-1/4 h-96 w-96 rounded-full bg-amber-500/8 blur-3xl" />
          <div className="absolute -bottom-1/3 -left-1/4 h-96 w-96 rounded-full bg-orange-500/8 blur-3xl" />
        </div>

        <main className="relative z-10">
          <div className="container mx-auto px-4 py-24 sm:py-28 md:px-6 lg:py-32">
            <div className="mx-auto max-w-7xl">
              {BackToMusicLink}

              <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                  {release.title}
                </h1>
                <p className="font-patrick text-xl text-amber-200/80 md:text-2xl">
                  "Every song tells a story"
                </p>
              </div>

              <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:gap-16 xl:gap-20">
                <div className="space-y-6">
                  <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-zinc-700/50 shadow-2xl">
                    <div className="relative aspect-square">
                      <Image
                        src={release.cover}
                        alt={`${release.title} Cover Art`}
                        fill
                        priority
                        sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 400px"
                        className="object-cover"
                        quality={75}
                      />
                      <div
                        className={`absolute top-4 right-4 rounded-full px-3 py-1.5 text-xs font-semibold ${typeBgColor} ${typeColor} border ${typeBorderColor} backdrop-blur-sm`}
                      >
                        {release.type.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-zinc-700/50 bg-zinc-900/30 p-6 backdrop-blur-sm">
                    <div className="space-y-3 text-center lg:text-left">
                      <p className="text-lg text-zinc-300">Single • {release.year}</p>
                      <div className="space-y-2 text-sm text-zinc-400">
                        <p>
                          <span className="text-zinc-500">Produced By:</span>{" "}
                          <span className="text-zinc-300">{release.releasedBy}</span>
                        </p>
                        {release.writtenBy && (
                          <p>
                            <span className="text-zinc-500">Written By:</span>{" "}
                            <span className="text-zinc-300">{release.writtenBy}</span>
                          </p>
                        )}
                        <p>
                          <span className="text-zinc-500">Release date:</span>{" "}
                          <span className="text-zinc-300">{release.releaseDate}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-2xl border border-zinc-700/50 bg-zinc-900/30 p-6 backdrop-blur-sm">
                    <h2 className="mb-4 text-2xl font-bold text-white">About This Release</h2>
                    <div className="prose prose-lg prose-invert max-w-none leading-relaxed text-zinc-300">
                      {release.description}
                    </div>
                  </div>

                  {(!isUpcoming ||
                    release.linkURL ||
                    Object.values(release.links).some((link) => link)) && (
                    <div className="rounded-2xl border border-zinc-700/50 bg-zinc-900/30 p-6 backdrop-blur-sm">
                      {ListenNowLinks}
                    </div>
                  )}
                </div>
              </div>

              {slug === "honest" && (
                <div className="mx-auto flex max-w-4xl flex-col rounded-2xl border border-zinc-700/50 bg-zinc-900/30 p-8 backdrop-blur-sm">
                  <h2 className="mb-6 text-center text-3xl font-bold text-amber-200">
                    Special Thanks
                  </h2>
                  {SpecialThanksContent}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}
