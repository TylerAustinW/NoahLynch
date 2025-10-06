"use client";

import ExpandableBio from "@/components/ui/expandable-bio.component";
import YouTubeEmbed from "@/components/ui/youtube-embed.component";
import { epkData } from "@/lib/data/epk/epk.data";
import {
  ArrowLeft,
  Award,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Mail,
  MapPin,
  Music,
  Play,
  X,
} from "lucide-react";
import { Patrick_Hand } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaAmazon, FaApple, FaFacebookF, FaInstagram, FaSpotify, FaYoutube } from "react-icons/fa6";
import EPKMobileActions from "./components/epk-mobile-actions.component";

const patrickHand = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});

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

const profilePhotos = [
  {
    src: "/portraits/noah-lynch-studio-session.jpeg",
    alt: "Noah Lynch - Professional Studio Photo",
  },
  {
    src: "/venues/the-roof/NoahAtTheRoof2.jpg",
    alt: "Noah Lynch - Live Performance at The Roof",
  },
];

export default function EPKPage() {
  const { artist, bio, featuredVideos, liveShow, notableShows, releases, gallery, contact } =
    epkData;
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [selectedCollection, setSelectedCollection] = useState<
    (typeof gallery.collections)[0] | null
  >(null);
  const [currentGalleryPhotoIndex, setCurrentGalleryPhotoIndex] = useState(0);
  const [imageLoadingStates, setImageLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const preloadedImages = useRef<Set<string>>(new Set());

  const preloadImage = useCallback((src: string): Promise<void> => {
    return new Promise((resolve) => {
      if (preloadedImages.current.has(src)) {
        resolve();
        return;
      }
      const img = new window.Image();
      img.onload = () => {
        preloadedImages.current.add(src);
        resolve();
      };
      img.onerror = () => resolve();
      img.src = src;
    });
  }, []);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % profilePhotos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + profilePhotos.length) % profilePhotos.length);
  };

  const handleGalleryClick = (
    collection: (typeof gallery.collections)[0],
    photoIndex: number = 0,
  ) => {
    setSelectedCollection(collection);
    setCurrentGalleryPhotoIndex(photoIndex);
    preloadImage(collection.photos[photoIndex].src);
    if (photoIndex > 0) {
      preloadImage(collection.photos[photoIndex - 1].src);
    }
    if (photoIndex < collection.photos.length - 1) {
      preloadImage(collection.photos[photoIndex + 1].src);
    }
  };

  const closeGalleryModal = () => {
    setSelectedCollection(null);
    setCurrentGalleryPhotoIndex(0);
  };

  const nextGalleryPhoto = useCallback(() => {
    if (selectedCollection) {
      const nextIndex =
        currentGalleryPhotoIndex === selectedCollection.photos.length - 1
          ? 0
          : currentGalleryPhotoIndex + 1;
      setCurrentGalleryPhotoIndex(nextIndex);

      const preloadIndex = nextIndex === selectedCollection.photos.length - 1 ? 0 : nextIndex + 1;
      preloadImage(selectedCollection.photos[preloadIndex].src).catch(() => {});
    }
  }, [selectedCollection, currentGalleryPhotoIndex, preloadImage]);

  const prevGalleryPhoto = useCallback(() => {
    if (selectedCollection) {
      const prevIndex =
        currentGalleryPhotoIndex === 0
          ? selectedCollection.photos.length - 1
          : currentGalleryPhotoIndex - 1;
      setCurrentGalleryPhotoIndex(prevIndex);

      const preloadIndex = prevIndex === 0 ? selectedCollection.photos.length - 1 : prevIndex - 1;
      preloadImage(selectedCollection.photos[preloadIndex].src).catch(() => {});
    }
  }, [selectedCollection, currentGalleryPhotoIndex, preloadImage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCollection) return;

      switch (e.key) {
        case "Escape":
          closeGalleryModal();
          break;
        case "ArrowLeft":
          prevGalleryPhoto();
          break;
        case "ArrowRight":
          nextGalleryPhoto();
          break;
      }
    };

    if (selectedCollection) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [nextGalleryPhoto, prevGalleryPhoto, selectedCollection]);

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
                      2025 Best Local Solo Artist Winner
                    </span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
                    {artist.name}
                  </h1>
                  <p
                    className={`${patrickHand.className} text-xl sm:text-2xl lg:text-3xl text-amber-300/90 mb-6`}
                  >
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
                  <div className="relative aspect-[3/4] max-w-sm mx-auto lg:max-w-none overflow-hidden rounded-2xl border border-zinc-800/50 shadow-2xl group">
                    <Image
                      src={profilePhotos[currentPhotoIndex].src}
                      alt={profilePhotos[currentPhotoIndex].alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-top transition-opacity duration-500"
                      priority
                      quality={75}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    {profilePhotos.length > 1 && (
                      <>
                        <button
                          onClick={prevPhoto}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                          aria-label="Previous photo"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextPhoto}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                          aria-label="Next photo"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {profilePhotos.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentPhotoIndex(index)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                index === currentPhotoIndex
                                  ? "w-8 bg-white"
                                  : "bg-white/50 hover:bg-white/70"
                              }`}
                              aria-label={`View photo ${index + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
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
              <div className="text-3xl font-bold text-amber-400 mb-1">100k+</div>
              <div className="text-sm text-zinc-400">Total Streams</div>
            </div>
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50 p-6 text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">3</div>
              <div className="text-sm text-zinc-400">Original Releases</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 lg:items-start">
            <div className="lg:col-span-2 space-y-8">
              <section
                id="bio"
                className="relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-8 overflow-hidden"
              >
                {/* Background Image for Bio Section */}
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
                  {/* Background Image for Videos Section */}
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
                            <p
                              className={`${patrickHand.className} text-lg text-amber-300/80 mb-4 text-center`}
                            >
                              "{video.description}"
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
                {/* Background Image for Live Performance Section */}
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
                {/* Background Image for Career Highlights */}
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
                    <div className="pb-4 border-b border-zinc-700/50">
                      <h4 className="font-semibold text-amber-300">
                        2025 Best Local Solo Artist Winner
                      </h4>
                      <p className="text-sm text-zinc-400 mt-1">
                        Awarded for outstanding solo performances
                      </p>
                    </div>
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
                {/* Background Video for Music Section */}
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

          {/* Gallery Section */}
          <section id="gallery" className="mt-12">
            <div className="relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-8 overflow-hidden">
              {/* Background Image for Gallery Section */}
              <div className="absolute inset-0">
                <Image
                  src="/venues/the-roof/NoahAtTheRoof.jpg"
                  alt="Noah Lynch gallery"
                  fill
                  className="object-cover opacity-5 rounded-2xl"
                  sizes="100vw"
                  quality={75}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/90 via-zinc-900/95 to-zinc-900/95 rounded-2xl" />
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <div className="w-1 h-8 bg-amber-400 rounded-full" />
                  {gallery.title}
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gallery.collections.map((collection) => (
                    <div key={collection.id} className="space-y-4">
                      <div className="bg-zinc-800/50 rounded-lg p-4">
                        <h3 className="font-semibold text-amber-400">{collection.venue}</h3>
                        <p className="text-sm text-zinc-400">
                          {collection.city}, {collection.state} •{" "}
                          {new Date(collection.date + "T12:00:00").toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      {collection.photos.slice(0, 1).map((photo, photoIdx) => (
                        <div
                          key={photoIdx}
                          className="relative aspect-video overflow-hidden rounded-lg group cursor-pointer"
                          onClick={() => handleGalleryClick(collection, photoIdx)}
                        >
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
                              <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                />
                              </svg>
                            </div>
                          </div>
                          {collection.photos.length > 1 && (
                            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1">
                              <span className="text-white text-sm font-medium">
                                +{collection.photos.length - 1}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <EPKMobileActions />

      {/* Gallery Modal */}
      {selectedCollection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={closeGalleryModal}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm z-0"
            aria-label="Close gallery"
          />
          <div
            className="relative z-10 max-w-5xl max-h-full w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-title"
          >
            <button
              onClick={closeGalleryModal}
              className="absolute -top-10 sm:-top-12 right-0 p-2 text-white hover:text-amber-400 transition-colors z-30 bg-black/50 rounded-full w-10 h-10 sm:w-auto sm:h-auto sm:bg-transparent flex items-center justify-center"
              aria-label="Close gallery"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            <div className="relative w-full max-h-[80vh] flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative inline-block max-w-full max-h-full">
                  {imageLoadingStates[`${selectedCollection.id}-${currentGalleryPhotoIndex}`] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80 rounded-lg z-10">
                      <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
                    </div>
                  )}
                  <Image
                    key={`${selectedCollection.id}-${currentGalleryPhotoIndex}`}
                    src={selectedCollection.photos[currentGalleryPhotoIndex].src}
                    alt={selectedCollection.photos[currentGalleryPhotoIndex].alt}
                    className={`w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-lg transition-opacity duration-300 ${
                      imageLoadingStates[`${selectedCollection.id}-${currentGalleryPhotoIndex}`]
                        ? "opacity-0"
                        : "opacity-100"
                    }`}
                    width={1200}
                    height={800}
                    sizes="(max-width: 768px) 95vw, (max-width: 1200px) 80vw, 1200px"
                    quality={75}
                    loading="lazy"
                    onLoad={() => {
                      setImageLoadingStates((prev) => ({
                        ...prev,
                        [`${selectedCollection.id}-${currentGalleryPhotoIndex}`]: false,
                      }));
                    }}
                    onLoadStart={() => {
                      setImageLoadingStates((prev) => ({
                        ...prev,
                        [`${selectedCollection.id}-${currentGalleryPhotoIndex}`]: true,
                      }));
                    }}
                  />
                </div>
              </div>
            </div>

            {selectedCollection.photos.length > 1 && (
              <>
                <button
                  onClick={prevGalleryPhoto}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/80 backdrop-blur-sm rounded-full text-white hover:text-amber-400 transition-colors z-20 w-12 h-12 sm:w-auto sm:h-auto flex items-center justify-center"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={nextGalleryPhoto}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/80 backdrop-blur-sm rounded-full text-white hover:text-amber-400 transition-colors z-20 w-12 h-12 sm:w-auto sm:h-auto flex items-center justify-center"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
