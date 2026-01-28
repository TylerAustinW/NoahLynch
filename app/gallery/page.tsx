import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LiveGallerySection from "@/components/features/live-gallery/live-gallery-section";
import Navbar from "@/components/layout/navbar.component";
import { SOCIAL_LINKS } from "@/lib/config/constants";
import {
  getFeaturedPhoto,
  getPhotoPath,
  venuePhotoCollections,
} from "@/lib/data/venues/venue-photos.data";
import { formatDate } from "@/lib/utils/date.utils";

export const metadata: Metadata = {
  title: "Gallery - Noah Lynch",
  description:
    "View exclusive photos from Noah Lynch's live performances across various venues. Experience the energy and atmosphere of live shows through our photo gallery.",
  openGraph: {
    title: "Noah Lynch - Live Performance Gallery",
    description:
      "View exclusive photos from Noah Lynch's live performances across various venues. Experience the energy and atmosphere of live shows through our photo gallery.",
  },
};

export default function GalleryPage() {
  const totalVenues = venuePhotoCollections.length;
  const totalPhotos = venuePhotoCollections.reduce((sum, venue) => sum + venue.photos.length, 0);
  const years = venuePhotoCollections
    .map((venue) => Number(venue.date.split("-")[0]))
    .filter((year) => !Number.isNaN(year));
  const uniqueYears = Array.from(new Set(years)).sort((a, b) => a - b);
  const yearRange =
    uniqueYears.length > 1
      ? `${uniqueYears[0]}-${uniqueYears[uniqueYears.length - 1]}`
      : uniqueYears[0]?.toString() ?? "-";

  const latestVenue = venuePhotoCollections[0];
  const latestPhoto = latestVenue ? getFeaturedPhoto(latestVenue) : null;
  const latestPhotoPath =
    latestVenue && latestPhoto
      ? getPhotoPath(latestVenue.id, latestPhoto.filename)
      : "/portraits/noah-lynch-portrait-guitar.jpeg";
  const latestVenueName = latestVenue?.venue ?? "Recent live performance";
  const latestVenueLocation = latestVenue ? `${latestVenue.city}, ${latestVenue.state}` : "";
  const latestVenueDate = latestVenue ? formatDate(latestVenue.date) : "";
  const latestPhotoCount = latestVenue?.photos.length ?? 0;

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={latestPhotoPath}
          alt={`${latestVenueName} performance`}
          fill
          className="object-cover opacity-15"
          sizes="100vw"
          priority
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/90 to-zinc-950" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main className="pt-20">
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-amber-400/80 mb-4">
                  Gallery
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Live moments, loud memories.
                </h1>
                <p className="text-base sm:text-lg text-zinc-300 max-w-xl">
                  A growing archive of Noah Lynch performances across Mississippi and beyond. Tap
                  any venue to open the full set and relive the night.
                </p>

                <div className="mt-8 grid sm:grid-cols-3 gap-4">
                  <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/60 backdrop-blur-sm p-4">
                    <div className="text-3xl font-semibold text-amber-300">{totalVenues}</div>
                    <div className="text-xs uppercase tracking-widest text-zinc-400 mt-1">
                      Venues
                    </div>
                  </div>
                  <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/60 backdrop-blur-sm p-4">
                    <div className="text-3xl font-semibold text-amber-300">{totalPhotos}</div>
                    <div className="text-xs uppercase tracking-widest text-zinc-400 mt-1">
                      Photos
                    </div>
                  </div>
                  <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/60 backdrop-blur-sm p-4">
                    <div className="text-3xl font-semibold text-amber-300">{yearRange}</div>
                    <div className="text-xs uppercase tracking-widest text-zinc-400 mt-1">
                      Years
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="#gallery-grid"
                    className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-amber-300"
                  >
                    Explore the sets
                  </Link>
                  <a
                    href={SOCIAL_LINKS.INSTAGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-zinc-700/70 bg-zinc-900/70 px-6 py-3 text-sm font-semibold text-zinc-100 transition-colors hover:border-amber-400/60 hover:text-amber-200"
                  >
                    Follow on Instagram
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={latestPhotoPath}
                    alt={`${latestVenueName} highlight`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-amber-400/80 mb-2">
                    Latest set
                  </p>
                  <h2 className="text-2xl font-semibold text-white">{latestVenueName}</h2>
                  {(latestVenueLocation || latestVenueDate) && (
                    <p className="text-sm text-zinc-300 mt-2">
                      {latestVenueLocation}
                      {latestVenueLocation && latestVenueDate ? " - " : ""}
                      {latestVenueDate}
                    </p>
                  )}
                  <p className="text-sm text-zinc-400 mt-2">{latestPhotoCount} photos</p>
                  <Link
                    href="#gallery-grid"
                    className="inline-flex items-center text-sm font-semibold text-amber-300 mt-4 hover:text-amber-200"
                  >
                    View the full set below
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <LiveGallerySection />
        </main>
      </div>
    </div>
  );
}
