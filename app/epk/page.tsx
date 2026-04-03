import ExpandableBio from "@/components/ui/expandable-bio.component";
import YouTubeEmbed from "@/components/ui/youtube-embed.component";
import { epkData } from "@/lib/data/epk/epk.data";
import {
  ArrowLeft,
  Award,
  Mail,
  MapPin,
  Music,
  Play,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaAmazon, FaApple, FaFacebookF, FaInstagram, FaSpotify, FaYoutube } from "react-icons/fa6";
import EPKMobileActions from "./components/epk-mobile-actions.component";
import EPKProfileCarousel from "./components/epk-profile-carousel.component";
import EPKGallery from "./components/epk-gallery.component";

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "Spotify":
      return <FaSpotify className="w-4 h-4" />;
    case "Apple Music":
      return <FaApple className="w-4 h-4" />;
    case "YouTube Music":
      return <FaYoutube className="w-4 h-4" />;
    case "Amazon Music":
      return <FaAmazon className="w-4 h-4" />;
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
    <div className="min-h-screen bg-zinc-950 text-white print:bg-white print:text-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/overlays/grain-texture-overlay.png')] bg-repeat opacity-[0.02] pointer-events-none z-10" />

      <header className="relative bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-zinc-800/50">
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 rounded-lg text-zinc-300 transition-all hover:text-amber-400 hover:border-amber-400/50 duration-300 font-medium"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Home</span>
              </Link>

              <nav className="hidden lg:flex items-center gap-8">
                <a
                  href="#bio"
                  className="text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  Biography
                </a>
                <a
                  href="#music"
                  className="text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  Music
                </a>
                <a
                  href="#videos"
                  className="text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  Videos
                </a>
                <a
                  href="#gallery"
                  className="text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  Gallery
                </a>
              </nav>
            </div>

            <div className="py-8 sm:py-12 lg:py-20">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-7 order-2 lg:order-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-300 text-sm font-semibold">
                      <Award className="w-4 h-4 mr-2" />
                      2025 Readers Choice - Best Solo Musician
                    </span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
                    {artist.name}
                  </h1>
                  <p className="font-patrick text-xl sm:text-2xl lg:text-3xl text-amber-300/90 mb-6">
                    {artist.tagline}
                  </p>
                  <div className="flex flex-wrap gap-6 mb-8 text-zinc-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-amber-400" />
                      <span className="font-medium">{artist.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Music className="w-5 h-5 text-amber-400" />
                      <span className="font-medium">{artist.genre}</span>
                    </div>
                  </div>
                  <div className="flex flex-row sm:flex-row flex-wrap gap-4 items-center sm:items-start">
                    <a
                      href={`mailto:${contact.booking}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-all transform hover:scale-105"
                    >
                      <Mail className="w-5 h-5" />
                      Book Now
                    </a>
                    <div className="flex items-center gap-3">
                      <a
                        href={contact.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 hover:bg-pink-600 text-zinc-300 hover:text-white transition-all"
                      >
                        <FaInstagram className="w-5 h-5" />
                      </a>
                      <a
                        href={contact.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 hover:bg-blue-600 text-zinc-300 hover:text-white transition-all"
                      >
                        <FaFacebookF className="w-5 h-5" />
                      </a>
                      <a
                        href={contact.social.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="YouTube"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 hover:bg-red-600 text-zinc-300 hover:text-white transition-all"
                      >
                        <FaYoutube className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 order-1 lg:order-2">
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 max-w-2xl mx-auto">
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50 p-6 text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">200k+</div>
              <div className="text-sm text-zinc-400">Total Streams</div>
            </div>
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50 p-6 text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">4</div>
              <div className="text-sm text-zinc-400">Original Releases</div>
            </div>
          </div>

          {/* Readers Choice Section */}
          <div className="mb-12 max-w-2xl lg:max-w-3xl mx-auto">
            <div className="relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-6 lg:p-7 overflow-hidden">
              <div className="absolute inset-0">
                <Image
                  src="/portraits/noah-lynch-studio-session.jpeg"
                  alt="Noah Lynch in studio"
                  fill
                  className="object-cover opacity-6 rounded-2xl"
                  sizes="(max-width: 1024px) 50vw, 896px"
                  quality={75}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/90 via-zinc-900/95 to-zinc-900/95 rounded-2xl" />
              </div>
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 items-start lg:items-center">
                  <div className="relative w-full sm:w-32 lg:w-36 aspect-[3/4] rounded-lg lg:rounded-xl overflow-hidden border border-zinc-700/50 flex-shrink-0">
                    <Image
                      src="/IMG_7130.jpeg"
                      alt="Noah Lynch - 2025 Readers Choice Award Winner for Best Solo Musician"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 128px, 176px"
                    />
                  </div>
                  <div className="lg:py-1">
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 lg:mb-3 flex items-center gap-2 lg:gap-3">
                      <Award className="w-5 h-5 lg:w-6 lg:h-6 text-amber-400" />
                      2025 Readers Choice Award Winner
                    </h3>
                    <p className="text-sm lg:text-base text-zinc-400 mb-2 lg:mb-3">
                      Best Solo Musician - Enterprise-Journal
                    </p>
                    <span className="inline-flex items-center px-3 py-1 lg:px-3.5 lg:py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-300 text-sm lg:text-sm font-semibold">
                      <Award className="w-4 h-4 lg:w-[18px] lg:h-[18px] mr-2" />
                      Readers Choice Award
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 lg:items-start">
            <div className="lg:col-span-2 space-y-8">
              <section
                id="bio"
                className="relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-8 overflow-hidden"
              >
                <div className="absolute inset-0">
                  <Image
                    src="/venues/the-roof/NoahAtTheRoofGuitars.jpg"
                    alt="Noah Lynch performing at The Roof"
                    fill
                    className="object-cover opacity-5 rounded-2xl"
                    sizes="50vw"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/90 via-zinc-900/95 to-zinc-900/95 rounded-2xl" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className="w-1 h-8 bg-amber-400 rounded-full" />
                    Biography
                  </h2>
                  <ExpandableBio content={bio.long} shortContent={bio.short} />
                </div>
              </section>

              {featuredVideos && (
                <section
                  id="videos"
                  className="relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-8 overflow-hidden"
                >
                  <div className="absolute inset-0">
                    <Image
                      src="/venues/the-roof/NoahAtTheRoof5.jpg"
                      alt="Noah Lynch performing at The Roof"
                      fill
                      className="object-cover opacity-10 rounded-2xl"
                      sizes="50vw"
                      quality={75}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/90 via-zinc-900/95 to-zinc-900/95 rounded-2xl" />
                  </div>
                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <div className="w-1 h-8 bg-amber-400 rounded-full" />
                      Featured Videos
                    </h2>
                    <div className="space-y-6">
                      {featuredVideos.videos.map((video) => (
                        <div key={video.videoId}>
                          {video.description && (
                            <p className="font-patrick text-lg text-amber-300/80 mb-4 text-center">
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

              <section className="relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-4 overflow-hidden">
                <div className="absolute inset-0">
                  <Image
                    src="/venues/backwater-grill/IMG_6718.jpg"
                    alt="Noah Lynch performing"
                    fill
                    className="object-cover opacity-8 rounded-2xl"
                    sizes="50vw"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/90 via-zinc-900/95 to-zinc-900/95 rounded-2xl" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <div className="w-1 h-6 bg-amber-400 rounded-full" />
                    Live Performance
                  </h2>
                  <div className="mb-4">
                    <h4 className="font-semibold text-amber-300 mb-3 text-sm">
                      Performance Formats
                    </h4>
                    <div className="space-y-2">
                      {liveShow.formats.map((format, index) => (
                        <div
                          key={index}
                          className="bg-zinc-800/30 border border-zinc-700/50 rounded-lg p-3"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <span className="inline-block px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded text-amber-300 font-semibold text-xs mb-2">
                                {format.name}
                              </span>
                              <p
                                className="text-zinc-300 text-xs mb-1"
                                dangerouslySetInnerHTML={{ __html: format.description }}
                              />
                              {format.idealFor && (
                                <p className="text-zinc-400 text-xs italic">{format.idealFor}</p>
                              )}
                              {format.videoUrl && (
                                <div className="mt-2 pt-2 border-t border-zinc-700/30">
                                  <a
                                    href={format.videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors group"
                                  >
                                    <div className="flex items-center gap-1 px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded text-xs">
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
                                    className="flex items-start gap-2 text-zinc-400 text-xs"
                                  >
                                    <div className="w-1 h-1 bg-amber-500 rounded-full mt-1" />
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
                  <div className="grid md:grid-cols-2 gap-3 mb-3">
                    <div>
                      <h4 className="font-semibold text-amber-300 mb-2 text-sm">Ideal Venues</h4>
                      <ul className="space-y-1">
                        {liveShow.venueTypes.map((type, index) => (
                          <li key={index} className="flex items-start gap-2 text-zinc-300 text-sm">
                            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5" />
                            <span>{type}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-300 mb-2 text-sm">
                        Notable Performances
                      </h4>
                      <ul className="space-y-1">
                        {notableShows.slice(0, 4).map((show, index) => (
                          <li key={index} className="flex items-start gap-2 text-zinc-300 text-sm">
                            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5" />
                            <span>{show.venue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-zinc-800/50 rounded-lg p-3">
                    <p className="text-zinc-300 text-xs">{liveShow.repertoire}</p>
                    {liveShow.paSystem && (
                      <p className="text-amber-300 text-xs mt-2 font-medium">
                        ✓ PA system available upon request
                      </p>
                    )}
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column - Highlights & Music */}
            <div className="space-y-8">
              <section className="relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-6 overflow-hidden">
                <div className="absolute inset-0">
                  <Image
                    src="/portraits/noah-lynch-studio-session.jpeg"
                    alt="Noah Lynch in studio"
                    fill
                    className="object-cover opacity-6 rounded-2xl"
                    sizes="33vw"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/90 via-zinc-900/95 to-zinc-900/95 rounded-2xl" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <Award className="w-5 h-5 text-amber-400" />
                    Career Highlights
                  </h3>
                  <div className="space-y-4">
                    {notableShows.map((show, index) => (
                      <div key={index} className="pb-4 border-b border-zinc-700/50 last:border-0">
                        <h4 className="font-semibold text-amber-300">{show.venue}</h4>
                        {show.description && (
                          <p className="text-sm text-zinc-400 mt-1">{show.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section
                id="music"
                className="relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-6 overflow-hidden"
              >
                <div className="absolute inset-0">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-8 rounded-2xl"
                  >
                    <source src="/videos/noah-lynch-hero-video.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/90 via-zinc-900/95 to-zinc-900/95 rounded-2xl" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <Music className="w-5 h-5 text-amber-400" />
                    Latest Releases
                  </h3>
                  <div className="space-y-3">
                    {releases.map((release, index) => (
                      <Link
                        key={index}
                        href={release.slug ? `/music/${release.slug}` : "#"}
                        className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-700/50 transition-all group"
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
                          <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                            <Play className="w-5 h-5 text-black" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white group-hover:text-amber-400 transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                            {release.title}
                          </h4>
                          <p className="text-xs text-zinc-400">{release.date}</p>
                        </div>
                        {release.highlights && (
                          <span className="px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-full">
                            {release.highlights}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-zinc-700/50">
                    <p className="text-sm text-zinc-400 mb-4 text-center">
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
                            className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
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
