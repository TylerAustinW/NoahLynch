import { epkData } from '@/lib/data/epk-data';
import { Mail, Music, MapPin, Play, ArrowLeft } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa6';
import Image from 'next/image';
import Link from 'next/link';
import { Patrick_Hand } from 'next/font/google';
import EPKMobileActions from './mobile-actions';

const patrickHand = Patrick_Hand({
  weight: '400',
  subsets: ['latin'],
});

export default function EPKPage() {
  const { artist, bio, liveShow, notableShows, releases, gallery, contact } = epkData;

  return (
    <div className="min-h-screen bg-black text-white print:bg-white print:text-black">
      <div className="fixed inset-0 bg-[url('/texture.png')] bg-repeat opacity-5" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-1/3 -right-1/4 h-96 w-96 rounded-full bg-amber-500/8 blur-3xl" />
        <div className="absolute -bottom-1/3 -left-1/4 h-96 w-96 rounded-full bg-purple-500/8 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 rounded-full bg-purple-500/6 blur-3xl" />
      </div>

      {/* Back to Home Button - Desktop Only */}
      <div className="fixed top-6 left-6 z-20 hidden md:block">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 rounded-lg text-zinc-400 transition-all hover:text-amber-200 hover:border-amber-500/50 duration-300 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-8 tracking-tight">
              {artist.name}
            </h1>

            <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto">
              <p
                className={`${patrickHand.className} text-lg sm:text-xl md:text-2xl text-amber-200/90 font-light leading-relaxed px-2`}
              >
                {artist.tagline}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-sm text-amber-200/80">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">{artist.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4" />
                  <span className="font-medium">{artist.genre}</span>
                </div>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-amber-500/30">
                <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 text-sm">
                  <a
                    href={`mailto:${contact.booking}`}
                    className="flex items-center gap-2 text-amber-200 hover:text-amber-100 transition-colors font-medium group text-center"
                  >
                    <Mail className="w-4 h-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="break-all sm:break-normal">{contact.booking}</span>
                  </a>
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

      <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12 md:py-16 print:px-4 print:py-8">
        <div className="grid gap-6 sm:gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <div className="aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-xl sm:rounded-2xl border border-zinc-700/50 shadow-2xl print:border print:border-gray-300">
                <Image
                  src="/noah-studio.jpeg"
                  alt="Noah Lynch - Professional Studio Photo"
                  fill
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

          <div className="lg:col-span-3 space-y-4 sm:space-y-8">
            <div className="p-4 sm:p-6 md:p-8 bg-zinc-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-zinc-700/50 print:bg-white print:border-gray-300">
              <div className="mb-4 sm:mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 print:text-xl print:text-black">
                  The Story
                </h2>
                <p className={`${patrickHand.className} text-base sm:text-lg text-amber-200/80`}>
                  "Music isn't just what I do, it's who I am"
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <p className="text-zinc-300 text-base sm:text-lg leading-relaxed print:text-sm print:text-black">
                  {bio.short}
                </p>
                <p className="text-zinc-300 text-base sm:text-lg leading-relaxed print:text-sm print:text-black">
                  {bio.long}
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8 bg-zinc-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-zinc-700/30 print:bg-white print:border-gray-300">
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 print:text-xl print:text-black">
                  Live Performance
                </h2>
                <p className="text-amber-200 font-medium text-base sm:text-lg">{liveShow.format}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div>
                  <h4 className="font-medium text-amber-200 mb-3 print:text-black">Setup</h4>
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
                  <h4 className="font-medium text-amber-200 mb-3 print:text-black">Venues</h4>
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
              <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-700/50 print:bg-gray-50">
                <p className="text-zinc-300 text-sm print:text-black">{liveShow.repertoire}</p>
                {liveShow.paSystem && (
                  <p className="text-amber-200/80 text-sm mt-2 print:text-black">
                    PA system available upon request
                  </p>
                )}
              </div>
            </div>

            {/* Performance Gallery */}
            <div className="p-4 sm:p-6 md:p-8 bg-zinc-800/20 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-zinc-700/30 print:bg-white print:border-gray-300">
              <div className="mb-4 sm:mb-6 text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 print:text-xl print:text-black">
                  {gallery.title}
                </h2>
                {gallery.subtitle && (
                  <p className={`${patrickHand.className} text-base sm:text-lg text-amber-200/80`}>
                    "{gallery.subtitle}"
                  </p>
                )}
              </div>

              <div className="space-y-4 sm:space-y-6">
                {gallery.photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-[16/10] sm:aspect-[20/9] overflow-hidden rounded-lg border border-zinc-600/50 shadow-lg">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    {/* Caption Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
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

            <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-2">
              <div className="p-4 sm:p-6 bg-zinc-800/20 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-zinc-700/30 print:bg-white print:border-gray-300">
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 print:text-base print:text-black">
                    Career Highlights
                  </h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
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

              <div className="p-4 sm:p-6 bg-zinc-800/20 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-zinc-700/30 print:bg-white print:border-gray-300">
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 print:text-base print:text-black">
                    Latest Releases
                  </h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {releases.map((release, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-2 sm:p-3 bg-zinc-900/50 rounded-lg border border-zinc-700/50 print:bg-gray-50"
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

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-zinc-700/50 print:border-gray-300">
                  <p className="text-zinc-300 text-xs sm:text-sm font-medium mb-2 sm:mb-3 print:text-black text-center">
                    Available on all major platforms
                  </p>
                  <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                    {['Spotify', 'Apple Music', 'YouTube Music', 'Amazon Music'].map((platform) => (
                      <span
                        key={platform}
                        className="px-2 sm:px-3 py-1 bg-zinc-700/50 text-zinc-300 text-[10px] sm:text-xs rounded-full border border-zinc-600/50 print:bg-gray-100 print:text-black print:border-gray-300"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Actions */}
      <EPKMobileActions />
    </div>
  );
}
