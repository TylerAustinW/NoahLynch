import ExpandableBio from "@/components/ui/expandable-bio";
import YouTubeEmbed from "@/components/ui/youtube-embed";
import { epkData } from "@/lib/data/epk/epk.data";
import { ArrowLeft, Award, Mail, MapPin, Music, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaAmazon, FaApple, FaFacebookF, FaInstagram, FaSpotify, FaYoutube } from "react-icons/fa6";
import EPKGallery from "./_components/gallery";
import EPKMobileActions from "./_components/mobile-actions";
import EPKProfileCarousel from "./_components/profile-carousel";

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "Spotify":
      return <FaSpotify className="h-4 w-4" />;
    case "Apple Music":
      return <FaApple className="h-4 w-4" />;
    case "YouTube Music":
      return <FaYoutube className="h-4 w-4" />;
    case "Amazon Music":
      return <FaAmazon className="h-4 w-4" />;
    default:
      return null;
  }
};

const platformLinks: Record<string, string> = {
  Spotify: "https://open.spotify.com/artist/4IKFKRnwaMGZQoExatIlHH",
  "Apple Music": "https://music.apple.com/us/artist/noah-lynch/1744359568",
  "YouTube Music": "https://music.youtube.com/channel/UCXDKAVZ1IBGpMaUW7biqAug",
  "Amazon Music": "https://music.amazon.com/artists/B08SV61FDK/noah-lynch",
};

export default function EPKPage() {
  const { artist, bio, featuredVideos, liveShow, notableShows, releases, gallery, contact } =
    epkData;

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white print:bg-white print:text-black">
      <div className="pointer-events-none absolute inset-0 z-10 bg-[url('/overlays/grain-texture-overlay.png')] bg-repeat opacity-[0.02]" />

      <header className="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/95 backdrop-blur-sm">
        <div className="absolute inset-0">
          <Image
            src="/venues/the-roof/2026/20260530-DSC03634.jpg"
            alt="Noah Lynch performing"
            fill
            className="object-cover opacity-10"
            sizes="100vw"
            priority
            quality={75}
          />
          <div className="absolute inset-0 bg-zinc-950/80" />
        </div>

        <div className="relative z-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-800/50 bg-zinc-900/80 px-4 py-2 font-medium text-zinc-300 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/50 hover:text-amber-400"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Home</span>
              </Link>

              <nav className="hidden items-center gap-6 md:flex lg:gap-8">
                <a
                  href="#bio"
                  className="font-medium text-zinc-400 transition-colors hover:text-white"
                >
                  Biography
                </a>
                <a
                  href="#music"
                  className="font-medium text-zinc-400 transition-colors hover:text-white"
                >
                  Music
                </a>
                <a
                  href="#videos"
                  className="font-medium text-zinc-400 transition-colors hover:text-white"
                >
                  Videos
                </a>
                <a
                  href="#gallery"
                  className="font-medium text-zinc-400 transition-colors hover:text-white"
                >
                  Gallery
                </a>
                <Link
                  href="/tour-dates"
                  className="font-medium text-zinc-400 transition-colors hover:text-white"
                >
                  Tour
                </Link>
              </nav>
            </div>

            <div className="py-8 sm:py-12 lg:py-20">
              <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="order-2 lg:order-1 lg:col-span-7">
                  <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
                    {artist.name}
                  </h1>
                  <p className="font-patrick mb-6 text-xl text-amber-300/90 sm:text-2xl lg:text-3xl">
                    {artist.role}
                  </p>
                  {artist.role && (
                    <p className="mb-4 text-sm font-semibold tracking-widest text-zinc-400 uppercase">
                      {artist.tagline}
                    </p>
                  )}
                  <div className="mb-8 flex flex-wrap gap-6 text-zinc-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-amber-400" />
                      <span className="font-medium">{artist.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Music className="h-5 w-5 text-amber-400" />
                      <span className="font-medium">{artist.genre}</span>
                    </div>
                  </div>
                  <div className="flex flex-row flex-wrap items-center gap-4 sm:flex-row sm:items-start">
                    <a
                      href={`mailto:${contact.booking}`}
                      className="inline-flex transform items-center gap-2 rounded-lg bg-amber-500 px-8 py-4 text-lg font-bold text-black shadow-lg shadow-amber-500/25 transition-all hover:scale-105 hover:bg-amber-400 hover:shadow-amber-500/40"
                    >
                      <Mail className="h-6 w-6" />
                      Book Now
                    </a>
                    <div className="flex items-center gap-3">
                      <a
                        href={contact.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition-all hover:bg-pink-600 hover:text-white"
                      >
                        <FaInstagram className="h-5 w-5" />
                      </a>
                      <a
                        href={contact.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition-all hover:bg-blue-600 hover:text-white"
                      >
                        <FaFacebookF className="h-5 w-5" />
                      </a>
                      <a
                        href={contact.social.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="YouTube"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition-all hover:bg-red-600 hover:text-white"
                      >
                        <FaYoutube className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="order-1 lg:order-2 lg:col-span-5">
                  <EPKProfileCarousel />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto mb-12 grid max-w-2xl grid-cols-2 gap-4">
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-6 text-center">
              <div className="mb-1 text-4xl font-bold text-amber-400">200k+</div>
              <div className="text-sm font-medium text-zinc-300">Total Streams</div>
            </div>
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-6 text-center">
              <div className="mb-1 text-4xl font-bold text-amber-400">4</div>
              <div className="text-sm font-medium text-zinc-300">Original Releases</div>
            </div>
          </div>

          <div className="mx-auto mb-16 max-w-2xl">
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-6 text-center">
              <div className="mb-3 flex items-center justify-center gap-2">
                <Award className="h-6 w-6 text-amber-400" />
                <h3 className="text-xl font-bold text-white">2025 Readers Choice Award</h3>
              </div>
              <p className="text-amber-300">Best Solo Musician - Enterprise-Journal</p>
            </div>
          </div>

          <div className="mx-auto mb-16 h-px max-w-4xl bg-linear-to-r from-transparent via-zinc-700 to-transparent" />

          <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
            <div className="space-y-8 lg:col-span-2">
              <section
                id="bio"
                className="rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-8"
              >
                <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-white">
                  <div className="h-8 w-1 rounded-full bg-amber-400" />
                  Biography
                </h2>
                <ExpandableBio content={bio.long} shortContent={bio.short} />
              </section>

              <div className="h-px bg-linear-to-r from-transparent via-zinc-700 to-transparent" />

              {featuredVideos && (
                <section
                  id="videos"
                  className="rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-8"
                >
                  <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-white">
                    <div className="h-8 w-1 rounded-full bg-amber-400" />
                    Featured Videos
                  </h2>
                  <div className="space-y-6">
                    {featuredVideos.videos.map((video) => (
                      <div key={video.videoId}>
                        {video.description && (
                          <p className="font-patrick mb-4 text-center text-lg text-amber-300/80">
                            &ldquo;{video.description}&rdquo;
                          </p>
                        )}
                        <YouTubeEmbed
                          videoId={video.videoId}
                          title={video.title}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <div className="h-px bg-linear-to-r from-transparent via-zinc-700 to-transparent" />

              <section className="rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-6">
                <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-white">
                  <div className="h-8 w-1 rounded-full bg-amber-400" />
                  Live Performance
                </h2>
                <div className="mb-6">
                  <h4 className="mb-4 text-lg font-semibold text-amber-300">Performance Formats</h4>
                  <div className="space-y-2">
                    {liveShow.formats.map((format, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-zinc-700/50 bg-zinc-800/30 p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <span className="mb-2 inline-block rounded border border-amber-500/30 bg-amber-500/20 px-3 py-1 text-sm font-semibold text-amber-300">
                              {format.name}
                            </span>
                            <p
                              className="mb-2 text-sm text-zinc-300"
                              dangerouslySetInnerHTML={{ __html: format.description }}
                            />
                            {format.idealFor && (
                              <p className="text-sm text-zinc-400 italic">{format.idealFor}</p>
                            )}
                            {format.videoUrl && (
                              <div className="mt-3 border-t border-zinc-700/30 pt-3">
                                <a
                                  href={format.videoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group inline-flex items-center gap-2 text-amber-400 transition-colors hover:text-amber-300"
                                >
                                  <div className="flex items-center gap-1.5 rounded border border-amber-500/20 bg-amber-500/10 px-2 py-1 text-sm">
                                    <Play className="h-4 w-4" fill="currentColor" />
                                    <span className="font-semibold">VIDEO</span>
                                  </div>
                                  <span className="text-sm group-hover:underline">
                                    {format.videoTitle || "Watch Performance Example"}
                                  </span>
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                        {format.setup && (
                          <div className="mt-3 pl-4">
                            <ul className="space-y-1">
                              {format.setup.map((item, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-sm text-zinc-400"
                                >
                                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 text-base font-semibold text-amber-300">Ideal Venues</h4>
                    <ul className="space-y-2">
                      {liveShow.venueTypes.map((type, index) => (
                        <li key={index} className="flex items-start gap-2 text-base text-zinc-300">
                          <div className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500" />
                          <span>{type}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 text-base font-semibold text-amber-300">
                      Notable Performances
                    </h4>
                    <ul className="space-y-2">
                      {notableShows.slice(0, 4).map((show, index) => (
                        <li key={index} className="flex items-start gap-2 text-base text-zinc-300">
                          <div className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500" />
                          <span>{show.venue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="rounded-lg bg-zinc-800/50 p-4">
                  <p className="text-sm text-zinc-300">{liveShow.repertoire}</p>
                  {liveShow.paSystem && (
                    <p className="mt-2 text-sm font-medium text-amber-300">
                      ✓ PA system available upon request
                    </p>
                  )}
                </div>
              </section>

              <div className="h-px bg-linear-to-r from-transparent via-zinc-700 to-transparent lg:hidden" />
            </div>

            <div className="space-y-8">
              <section
                id="music"
                className="rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-6"
              >
                <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-white">
                  <Music className="h-5 w-5 text-amber-400" />
                  Latest Releases
                </h3>
                <div className="space-y-3">
                  {releases.map((release, index) => (
                    <Link
                      key={index}
                      href={release.slug ? `/music/${release.slug}` : "#"}
                      className="group flex items-center gap-3 rounded-lg bg-zinc-800/50 p-3 transition-all hover:bg-zinc-700/50"
                    >
                      {release.coverArt ? (
                        <Image
                          src={release.coverArt}
                          alt={release.title}
                          width={48}
                          height={48}
                          className="rounded-lg"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500">
                          <Play className="h-5 w-5 text-black" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h4 className="overflow-hidden font-semibold text-ellipsis whitespace-nowrap text-white transition-colors group-hover:text-amber-400">
                          {release.title}
                        </h4>
                        <p className="text-xs text-zinc-400">{release.date}</p>
                      </div>
                      {release.highlights && (
                        <span className="rounded-full bg-amber-500/20 px-2 py-1 text-xs text-amber-300">
                          {release.highlights}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 border-t border-zinc-700/50 pt-6">
                  <p className="mb-4 text-center text-sm text-zinc-400">
                    Available on all platforms
                  </p>
                  <div className="flex justify-center gap-3">
                    {["Spotify", "Apple Music", "YouTube Music", "Amazon Music"].map((platform) => (
                      <a
                        key={platform}
                        href={platformLinks[platform]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-all hover:bg-zinc-700 hover:text-white"
                        title={platform}
                      >
                        {getPlatformIcon(platform)}
                      </a>
                    ))}
                  </div>
                </div>
              </section>
              <section className="rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-6">
                <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-white">
                  <Award className="h-5 w-5 text-amber-400" />
                  Career Highlights
                </h3>
                <div className="space-y-4">
                  {notableShows.map((show, index) => (
                    <div key={index} className="border-b border-zinc-700/50 pb-4 last:border-0">
                      <h4 className="font-semibold text-amber-300">{show.venue}</h4>
                      {show.description && (
                        <p className="mt-1 text-sm text-zinc-400">{show.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
          <div className="mb-16 h-px max-w-4xl bg-linear-to-r from-transparent via-zinc-700 to-transparent" />
          <EPKGallery title={gallery.title} collections={gallery.collections} />
          <div className="mt-8 flex justify-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700/30 bg-zinc-900/40 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-zinc-600/50 hover:bg-zinc-800/60 focus:ring-2 focus:ring-zinc-500/40 focus:outline-none"
            >
              View Full Gallery
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </main>
      <EPKMobileActions />
    </div>
  );
}
