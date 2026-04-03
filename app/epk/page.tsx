import ExpandableBio from "@/components/ui/expandable-bio.component";
import YouTubeEmbed from "@/components/ui/youtube-embed.component";
import { epkData } from "@/lib/data/epk/epk.data";
import { ArrowLeft, Award, Mail, MapPin, Music, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaAmazon, FaApple, FaFacebookF, FaInstagram, FaSpotify, FaYoutube } from "react-icons/fa6";
import EPKMobileActions from "./components/epk-mobile-actions.component";
import EPKProfileCarousel from "./components/epk-profile-carousel.component";
import EPKGallery from "./components/epk-gallery.component";

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

      <header className="relative border-b border-zinc-800/50 bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="absolute inset-0">
          <Image
            src="/venues/the-roof/NoahAtTheRoof2.jpg"
            alt="Noah Lynch performing"
            fill
            className="object-cover opacity-15"
            sizes="100vw"
            priority
            quality={75}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/85 to-zinc-950" />
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

              <nav className="hidden items-center gap-8 lg:flex">
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
              </nav>
            </div>

            <div className="py-8 sm:py-12 lg:py-20">
              <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="order-2 lg:order-1 lg:col-span-7">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/20 px-3 py-1 text-sm font-semibold text-amber-300">
                      <Award className="mr-2 h-4 w-4" />
                      2025 Readers Choice - Best Solo Musician
                    </span>
                  </div>
                  <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
                    {artist.name}
                  </h1>
                  <p className="font-patrick mb-6 text-xl text-amber-300/90 sm:text-2xl lg:text-3xl">
                    {artist.tagline}
                  </p>
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
                      className="inline-flex transform items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 font-bold text-black transition-all hover:scale-105 hover:bg-amber-400"
                    >
                      <Mail className="h-5 w-5" />
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
        {/* Main Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/venues/the-roof/NoahAtTheRoofGuitars.jpg"
            alt="Noah Lynch performing at The Roof"
            fill
            className="object-cover opacity-10"
            sizes="100vw"
            quality={75}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/90 to-zinc-950" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto mb-12 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-6 text-center backdrop-blur-sm">
              <div className="mb-1 text-3xl font-bold text-amber-400">200k+</div>
              <div className="text-sm text-zinc-400">Total Streams</div>
            </div>
            <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-6 text-center backdrop-blur-sm">
              <div className="mb-1 text-3xl font-bold text-amber-400">4</div>
              <div className="text-sm text-zinc-400">Original Releases</div>
            </div>
          </div>

          {/* Readers Choice Section */}
          <div className="mx-auto mb-12 max-w-2xl lg:max-w-3xl">
            <div className="relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-6 backdrop-blur-sm lg:p-7">
              <div className="absolute inset-0">
                <Image
                  src="/portraits/noah-lynch-studio-session.jpeg"
                  alt="Noah Lynch in studio"
                  fill
                  className="rounded-2xl object-cover opacity-6"
                  sizes="(max-width: 1024px) 50vw, 896px"
                  quality={75}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-zinc-900/90 via-zinc-900/95 to-zinc-900/95" />
              </div>
              <div className="relative z-10">
                <div className="flex flex-col items-start gap-4 sm:flex-row lg:items-center lg:gap-6">
                  <div className="relative aspect-[3/4] w-full flex-shrink-0 overflow-hidden rounded-lg border border-zinc-700/50 sm:w-32 lg:w-36 lg:rounded-xl">
                    <Image
                      src="/IMG_7130.jpeg"
                      alt="Noah Lynch - 2025 Readers Choice Award Winner for Best Solo Musician"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 128px, 176px"
                    />
                  </div>
                  <div className="lg:py-1">
                    <h3 className="mb-2 flex items-center gap-2 text-xl font-bold text-white lg:mb-3 lg:gap-3 lg:text-2xl">
                      <Award className="h-5 w-5 text-amber-400 lg:h-6 lg:w-6" />
                      2025 Readers Choice Award Winner
                    </h3>
                    <p className="mb-2 text-sm text-zinc-400 lg:mb-3 lg:text-base">
                      Best Solo Musician - Enterprise-Journal
                    </p>
                    <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/20 px-3 py-1 text-sm font-semibold text-amber-300 lg:px-3.5 lg:py-1.5 lg:text-sm">
                      <Award className="mr-2 h-4 w-4 lg:h-[18px] lg:w-[18px]" />
                      Readers Choice Award
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 lg:items-start lg:gap-8">
            <div className="space-y-8 lg:col-span-2">
              <section
                id="bio"
                className="relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-8 backdrop-blur-sm"
              >
                <div className="absolute inset-0">
                  <Image
                    src="/venues/the-roof/NoahAtTheRoofGuitars.jpg"
                    alt="Noah Lynch performing at The Roof"
                    fill
                    className="rounded-2xl object-cover opacity-5"
                    sizes="50vw"
                    quality={75}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-zinc-900/90 via-zinc-900/95 to-zinc-900/95" />
                </div>
                <div className="relative z-10">
                  <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-white">
                    <div className="h-8 w-1 rounded-full bg-amber-400" />
                    Biography
                  </h2>
                  <ExpandableBio content={bio.long} shortContent={bio.short} />
                </div>
              </section>

              {featuredVideos && (
                <section
                  id="videos"
                  className="relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-8 backdrop-blur-sm"
                >
                  <div className="absolute inset-0">
                    <Image
                      src="/venues/the-roof/NoahAtTheRoof5.jpg"
                      alt="Noah Lynch performing at The Roof"
                      fill
                      className="rounded-2xl object-cover opacity-10"
                      sizes="50vw"
                      quality={75}
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-zinc-900/90 via-zinc-900/95 to-zinc-900/95" />
                  </div>
                  <div className="relative z-10">
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
                  </div>
                </section>
              )}

              <section className="relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-4 backdrop-blur-sm">
                <div className="absolute inset-0">
                  <Image
                    src="/venues/backwater-grill/IMG_6718.jpg"
                    alt="Noah Lynch performing"
                    fill
                    className="rounded-2xl object-cover opacity-8"
                    sizes="50vw"
                    quality={75}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-zinc-900/90 via-zinc-900/95 to-zinc-900/95" />
                </div>
                <div className="relative z-10">
                  <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-white">
                    <div className="h-6 w-1 rounded-full bg-amber-400" />
                    Live Performance
                  </h2>
                  <div className="mb-4">
                    <h4 className="mb-3 text-sm font-semibold text-amber-300">
                      Performance Formats
                    </h4>
                    <div className="space-y-2">
                      {liveShow.formats.map((format, index) => (
                        <div
                          key={index}
                          className="rounded-lg border border-zinc-700/50 bg-zinc-800/30 p-3"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <span className="mb-2 inline-block rounded border border-amber-500/30 bg-amber-500/20 px-2 py-0.5 text-xs font-semibold text-amber-300">
                                {format.name}
                              </span>
                              <p
                                className="mb-1 text-xs text-zinc-300"
                                dangerouslySetInnerHTML={{ __html: format.description }}
                              />
                              {format.idealFor && (
                                <p className="text-xs text-zinc-400 italic">{format.idealFor}</p>
                              )}
                              {format.videoUrl && (
                                <div className="mt-2 border-t border-zinc-700/30 pt-2">
                                  <a
                                    href={format.videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 text-amber-400 transition-colors hover:text-amber-300"
                                  >
                                    <div className="flex items-center gap-1 rounded border border-amber-500/20 bg-amber-500/10 px-1.5 py-0.5 text-xs">
                                      <Play className="h-3 w-3" fill="currentColor" />
                                      <span className="font-semibold">VIDEO</span>
                                    </div>
                                    <span className="text-xs group-hover:underline">
                                      {format.videoTitle || "Watch Performance Example"}
                                    </span>
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                          {format.setup && (
                            <div className="mt-2 pl-3">
                              <ul className="space-y-0.5">
                                {format.setup.map((item, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2 text-xs text-zinc-400"
                                  >
                                    <div className="mt-1 h-1 w-1 rounded-full bg-amber-500" />
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
                  <div className="mb-3 grid gap-3 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 text-sm font-semibold text-amber-300">Ideal Venues</h4>
                      <ul className="space-y-1">
                        {liveShow.venueTypes.map((type, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-zinc-300">
                            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500" />
                            <span>{type}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm font-semibold text-amber-300">
                        Notable Performances
                      </h4>
                      <ul className="space-y-1">
                        {notableShows.slice(0, 4).map((show, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-zinc-300">
                            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500" />
                            <span>{show.venue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="rounded-lg bg-zinc-800/50 p-3">
                    <p className="text-xs text-zinc-300">{liveShow.repertoire}</p>
                    {liveShow.paSystem && (
                      <p className="mt-2 text-xs font-medium text-amber-300">
                        ✓ PA system available upon request
                      </p>
                    )}
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column - Highlights & Music */}
            <div className="space-y-8">
              <section className="relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-6 backdrop-blur-sm">
                <div className="absolute inset-0">
                  <Image
                    src="/portraits/noah-lynch-studio-session.jpeg"
                    alt="Noah Lynch in studio"
                    fill
                    className="rounded-2xl object-cover opacity-6"
                    sizes="33vw"
                    quality={75}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-zinc-900/90 via-zinc-900/95 to-zinc-900/95" />
                </div>
                <div className="relative z-10">
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
                </div>
              </section>

              <section
                id="music"
                className="relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-6 backdrop-blur-sm"
              >
                <div className="absolute inset-0">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full rounded-2xl object-cover opacity-8"
                  >
                    <source src="/videos/noah-lynch-hero-video.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-zinc-900/90 via-zinc-900/95 to-zinc-900/95" />
                </div>
                <div className="relative z-10">
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
                      {["Spotify", "Apple Music", "YouTube Music", "Amazon Music"].map(
                        (platform) => (
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
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Gallery Section — Client Component (interactive modal + image preloading) */}
          <EPKGallery title={gallery.title} collections={gallery.collections} />
        </div>
      </main>

      <EPKMobileActions />
    </div>
  );
}
