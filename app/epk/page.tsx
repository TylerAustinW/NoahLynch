import { epkData } from "@/lib/data/epk-data";
import { ArrowLeft, Mail, MapPin, Music, Play } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { Patrick_Hand } from "next/font/google";
import EPKMobileActions from "./mobile-actions";
import YouTubeEmbed from "@/components/ui/youtube-embed";
import ExpandableBio from "@/components/ui/expandable-bio";
import { Button } from "@/components/ui/button";

const patrickHand = Patrick_Hand({
    weight: "400",
    subsets: ["latin"],
});

export default function EPKPage() {
    const { artist, bio, featuredVideo, liveShow, notableShows, releases, gallery, contact } = epkData;

    return (
        <div className="min-h-screen bg-zinc-950 text-white print:bg-white print:text-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/overlays/grain-texture-overlay.png')] bg-repeat opacity-[0.02] pointer-events-none z-10" />

            <div className="z-50 fixed top-6 left-6 hidden md:block">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 rounded-lg text-zinc-400 transition-all hover:text-amber-400 hover:border-amber-400/50 duration-300 font-medium"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>
            </div>

            <div className="relative z-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-28">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 sm:mb-10 tracking-tight">
                            {artist.name}
                        </h1>

                        <div className="space-y-6 sm:space-y-8 max-w-2xl mx-auto">
                            <p
                                className={`${patrickHand.className} text-lg sm:text-xl md:text-2xl text-zinc-300 font-light leading-relaxed px-2`}
                            >
                                {artist.tagline}
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-sm text-zinc-300">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span className="font-medium">{artist.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Music className="w-4 h-4" />
                                    <span className="font-medium">{artist.genre}</span>
                                </div>
                            </div>

                            <div className="pt-4 sm:pt-6 border-t border-zinc-700">
                                <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 text-sm">
                                    <Button asChild variant="ghost">
                                        <a
                                            href={`mailto:${contact.booking}`}
                                            className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors font-medium group text-center"
                                        >
                                            <Mail className="w-4 h-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                                            <span className="break-all sm:break-normal">{contact.booking}</span>
                                        </a>
                                    </Button>
                                    <div className="flex items-center gap-3">
                                        <a
                                            href={contact.social.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Follow Noah Lynch on Instagram"
                                            className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-600/50 bg-zinc-800/50 text-zinc-400 transition-all duration-300 hover:border-pink-500/50 hover:bg-pink-500/10 hover:text-pink-400 print:border-gray-400 print:text-gray-600"
                                        >
                                            <FaInstagram className="w-4 h-4" />
                                        </a>
                                        <a
                                            href={contact.social.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Follow Noah Lynch on Facebook"
                                            className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-600/50 bg-zinc-800/50 text-zinc-400 transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400 print:border-gray-400 print:text-gray-600"
                                        >
                                            <FaFacebookF className="w-4 h-4" />
                                        </a>
                                        <a
                                            href={contact.social.tiktok}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Follow Noah Lynch on TikTok"
                                            className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-600/50 bg-zinc-800/50 text-zinc-400 transition-all duration-300 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 print:border-gray-400 print:text-gray-600"
                                        >
                                            <FaTiktok className="w-4 h-4" />
                                        </a>
                                        <a
                                            href={contact.social.youtube}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Subscribe to Noah Lynch on YouTube"
                                            className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-600/50 bg-zinc-800/50 text-zinc-400 transition-all duration-300 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 print:border-gray-400 print:text-gray-600"
                                        >
                                            <FaYoutube className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 md:py-12 print:px-4 print:py-8">
                <div className="grid gap-8 sm:gap-16 lg:grid-cols-5 lg:gap-20">
                    <div className="lg:col-span-2">
                        <div className="sticky top-8">
                            <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-xl sm:rounded-2xl border border-zinc-800/50 shadow-2xl print:border print:border-gray-300">
                                <Image
                                    src="/portraits/noah-lynch-studio-session.jpeg"
                                    alt="Noah Lynch - Professional Studio Photo"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                    className="object-cover object-top"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                            </div>

                            <div className="absolute -top-4 -right-4 z-10 hidden max-w-xs rounded-xl bg-zinc-900/90 p-4 backdrop-blur border border-amber-500/30 lg:block">
                                <p className={`${patrickHand.className} text-sm text-amber-200/90`}>
                                    "Every song is a piece of my soul, shared with the world"
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-3 space-y-6 sm:space-y-10">
                        <div className="p-6 sm:p-8 md:p-10 bg-zinc-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-zinc-700/50 print:bg-white print:border-gray-300">
                            <div className="mb-6 sm:mb-8">
                                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 print:text-xl print:text-black">
                                    The Story
                                </h2>
                                <p className={`${patrickHand.className} text-base sm:text-lg text-amber-200/80`}>
                                    "Music isn't just what I do, it's who I am"
                                </p>
                            </div>

                            <ExpandableBio content={bio.long} />
                        </div>

                        {featuredVideo && (
                            <div className="p-6 sm:p-8 md:p-10 bg-zinc-800/20 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-zinc-700/30 print:bg-white print:border-gray-300">
                                <div className="mb-6 sm:mb-8 text-center">
                                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 print:text-xl print:text-black">
                                        {featuredVideo.title}
                                    </h2>
                                    {featuredVideo.video.description && (
                                        <p className={`${patrickHand.className} text-base sm:text-lg text-amber-200/80`}>
                                            "{featuredVideo.video.description}"
                                        </p>
                                    )}
                                </div>

                                <YouTubeEmbed
                                    videoId={featuredVideo.video.videoId}
                                    title={featuredVideo.video.title}
                                    {...(featuredVideo.video.description && {
                                        description: featuredVideo.video.description,
                                    })}
                                    className="max-w-4xl mx-auto"
                                />
                            </div>
                        )}

                        <div className="p-6 sm:p-8 md:p-10 bg-zinc-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-zinc-700/30 print:bg-white print:border-gray-300">
                            <div className="mb-6 sm:mb-8">
                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 print:text-xl print:text-black">
                                    Live Performance
                                </h2>
                                <p className="text-amber-200 font-medium text-base sm:text-lg">{liveShow.format}</p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                                <div>
                                    <h4 className="font-medium text-amber-200 mb-4 print:text-black">Setup</h4>
                                    <ul className="text-zinc-300 space-y-2 text-sm print:text-black">
                                        {liveShow.setup.map((item, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <div className="w-1 h-1 bg-amber-500 rounded-full" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium text-amber-200 mb-4 print:text-black">Venues</h4>
                                    <ul className="text-zinc-300 space-y-2 text-sm print:text-black">
                                        {liveShow.venueTypes.map((type, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <div className="w-1 h-1 bg-amber-500 rounded-full" />
                                                {type}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="p-5 sm:p-6 bg-zinc-900/50 rounded-xl border border-zinc-700/50 print:bg-gray-50">
                                <p className="text-zinc-300 text-sm print:text-black">{liveShow.repertoire}</p>
                                {liveShow.paSystem && (
                                    <p className="text-amber-200/80 text-sm mt-2 print:text-black">
                                        PA system available upon request
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 md:p-10 bg-zinc-800/20 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-zinc-700/30 print:bg-white print:border-gray-300">
                            <div className="mb-6 sm:mb-8 text-center">
                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 print:text-xl print:text-black">
                                    {gallery.title}
                                </h2>
                            </div>

                            <div className="space-y-6 sm:space-y-8">
                                {gallery.photos.map((photo, index) => (
                                    <div key={index} className="relative group">
                                        <div className="relative aspect-[16/10] sm:aspect-[20/9] overflow-hidden rounded-lg border border-zinc-600/50 shadow-lg">
                                            <Image
                                                src={photo.src}
                                                alt={photo.alt}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
                                                className="object-cover object-center scale-110 transition-transform duration-500 group-hover:scale-115"
                                                priority={index === 0}
                                            />

                                            {photo.people && (
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    {photo.people.map((person, personIndex) => (
                                                        <div
                                                            key={personIndex}
                                                            className="absolute"
                                                            style={{ left: `${person.x}%`, top: `${person.y}%` }}
                                                        >
                                                            <div className="relative">
                                                                <div className="w-3 h-3 bg-amber-400 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                                                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 bg-zinc-900/95 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap backdrop-blur-sm border border-amber-500/30 shadow-xl">
                                                                    {person.name}
                                                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-zinc-900/95" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                        </div>

                                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                                            <div className="text-white">
                                                {photo.venue && (
                                                    <p className="text-amber-200 font-medium text-sm sm:text-base mb-1">
                                                        {photo.venue}
                                                    </p>
                                                )}
                                                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                                                    {photo.caption}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-6 sm:gap-8 lg:gap-10 lg:grid-cols-2">
                            <div className="p-6 sm:p-8 bg-zinc-800/20 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-zinc-700/30 print:bg-white print:border-gray-300">
                                <div className="mb-6 sm:mb-8">
                                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 print:text-base print:text-black">
                                        Career Highlights
                                    </h3>
                                </div>
                                <div className="space-y-4 sm:space-y-5">
                                    {notableShows.map((show, index) => (
                                        <div
                                            key={index}
                                            className="border-b border-zinc-700/50 pb-3 last:border-b-0 print:border-gray-300"
                                        >
                                            <h4 className="font-medium text-amber-200 print:text-black">{show.venue}</h4>
                                            {show.description && (
                                                <p className="text-zinc-400 text-sm mt-1 print:text-gray-600">
                                                    {show.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 sm:p-8 bg-zinc-800/20 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-zinc-700/30 print:bg-white print:border-gray-300">
                                <div className="mb-6 sm:mb-8">
                                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 print:text-base print:text-black">
                                        Latest Releases
                                    </h3>
                                </div>
                                <div className="space-y-4 sm:space-y-5">
                                    {releases.map((release, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-4 p-3 sm:p-4 bg-zinc-900/50 rounded-lg border border-zinc-700/50 print:bg-gray-50"
                                        >
                                            {release.coverArt ? (
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden flex-shrink-0 border border-zinc-600/50">
                                                    <Image
                                                        src={release.coverArt}
                                                        alt={`${release.title} cover art`}
                                                        width={48}
                                                        height={48}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <Play className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                                                </div>
                                            )}
                                            <div className="flex-grow min-w-0">
                                                <h4 className="font-medium text-white print:text-black text-sm truncate">
                                                    "{release.title}"
                                                </h4>
                                                <p className="text-zinc-400 text-xs print:text-gray-600">{release.date}</p>
                                                {release.highlights && (
                                                    <p className="text-zinc-300 text-xs mt-1 print:text-gray-700">
                                                        {release.highlights}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-zinc-700/50 print:border-gray-300">
                                    <p className="text-zinc-300 text-xs sm:text-sm font-medium mb-3 sm:mb-4 print:text-black text-center">
                                        Available on all major platforms
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                                        {["Spotify", "Apple Music", "YouTube Music", "Amazon Music"].map((platform) => (
                                            <Button
                                                key={platform}
                                                variant="ghost"
                                                className="px-2 sm:px-3 py-1 bg-zinc-700/50 text-zinc-300 text-[10px] sm:text-xs rounded-full border border-zinc-600/50 print:bg-gray-100 print:text-black print:border-gray-300"
                                            >
                                                {platform}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <EPKMobileActions />
        </div>
    );
}
