import { epkData } from "@/lib/data/epk/epk.data";
import { Mail, MapPin, Music } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import EPKProfileCarousel from "./profile-carousel";

export default function EPKHeroSection() {
  const { artist, contact } = epkData;

  return (
    <section className="relative py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700/50 bg-zinc-900/40 text-zinc-300 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/50 hover:bg-zinc-800/60 hover:text-amber-400 focus:ring-2 focus:ring-amber-400/50 focus:outline-none"
                >
                  <FaInstagram className="h-5 w-5" />
                </a>
                <a
                  href={contact.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700/50 bg-zinc-900/40 text-zinc-300 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/50 hover:bg-zinc-800/60 hover:text-amber-400 focus:ring-2 focus:ring-amber-400/50 focus:outline-none"
                >
                  <FaFacebookF className="h-5 w-5" />
                </a>
                <a
                  href={contact.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700/50 bg-zinc-900/40 text-zinc-300 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/50 hover:bg-zinc-800/60 hover:text-amber-400 focus:ring-2 focus:ring-amber-400/50 focus:outline-none"
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
    </section>
  );
}
