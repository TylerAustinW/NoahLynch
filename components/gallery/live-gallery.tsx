"use client";

import {
  getFeaturedPhoto,
  getPhotoPath,
  hasMultiplePhotos,
  type VenuePhotoCollection,
  venuePhotoCollections,
} from "@/lib/data/venues/venue-photos.data";
import { formatDate } from "@/lib/utils/date.utils";
import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, Loader2, MapPin, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export default function LiveGallerySection() {
  const [selectedVenue, setSelectedVenue] = useState<VenuePhotoCollection | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [imageLoadingStates, setImageLoadingStates] = useState<{ [key: string]: boolean }>({});
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const touchEndRef = useRef<{ x: number; y: number } | null>(null);

  const handleVenueClick = (venue: VenuePhotoCollection) => {
    if (hasMultiplePhotos(venue)) {
      setSelectedVenue(venue);
      setCurrentPhotoIndex(0);
    }
  };

  const closeModal = () => {
    setSelectedVenue(null);
    setCurrentPhotoIndex(0);
  };

  const nextPhoto = useCallback(() => {
    if (selectedVenue) {
      const nextIndex =
        currentPhotoIndex === selectedVenue.photos.length - 1 ? 0 : currentPhotoIndex + 1;
      setCurrentPhotoIndex(nextIndex);
    }
  }, [selectedVenue, currentPhotoIndex]);

  const prevPhoto = useCallback(() => {
    if (selectedVenue) {
      const prevIndex =
        currentPhotoIndex === 0 ? selectedVenue.photos.length - 1 : currentPhotoIndex - 1;
      setCurrentPhotoIndex(prevIndex);
    }
  }, [selectedVenue, currentPhotoIndex]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
    }
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;
      const touch = e.changedTouches[0];
      if (touch) {
        touchEndRef.current = { x: touch.clientX, y: touch.clientY };
        const deltaX = touchEndRef.current.x - touchStartRef.current.x;
        const deltaY = touchEndRef.current.y - touchStartRef.current.y;
        const deltaTime = Date.now() - touchStartRef.current.time;
        const velocity = Math.abs(deltaX) / deltaTime;
        const threshold = velocity > 0.3 ? 30 : 50;

        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
          if (deltaX > 0) {
            prevPhoto();
          } else {
            nextPhoto();
          }
        }
      }
      touchStartRef.current = null;
      touchEndRef.current = null;
    },
    [nextPhoto, prevPhoto],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedVenue) return;
      switch (e.key) {
        case "Escape":
          closeModal();
          break;
        case "ArrowLeft":
          prevPhoto();
          break;
        case "ArrowRight":
          nextPhoto();
          break;
      }
    };

    if (selectedVenue) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [nextPhoto, prevPhoto, selectedVenue]);

  return (
    <>
      <section className="bg-zinc-900/50 px-4 py-16" suppressHydrationWarning>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 id="live-gallery-title" className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Live from the Stage
            </h2>
            <div id="Social-Link" className="text-md mb-4 text-zinc-200">
              <p className="text-md text-zinc-200">
                Follow @noahlynchmusic on social media for more behind-the-scenes content
              </p>
            </div>
            <div className="mb-4 h-1 w-full bg-zinc-700/20" />
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2" suppressHydrationWarning>
            {venuePhotoCollections
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .flatMap((venue: VenuePhotoCollection, index: number) => {
                const featuredPhoto = getFeaturedPhoto(venue);
                const photoPath = getPhotoPath(venue.id, featuredPhoto.filename);
                const hasGallery = hasMultiplePhotos(venue);

                const currentYear = new Date(venue.date).getFullYear();

                const elements = [];

                elements.push(
                  <motion.div
                    key={`${venue.id}-${index}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className={`group relative overflow-hidden rounded-xl border border-zinc-700/30 bg-zinc-800/50 ${
                      hasGallery ? "cursor-pointer touch-manipulation" : ""
                    }`}
                    onClick={() => handleVenueClick(venue)}
                  >
                    <div className="relative aspect-3/4 overflow-hidden bg-zinc-800">
                      <Image
                        src={photoPath}
                        alt={featuredPhoto.filename}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={75}
                        loading={index < 2 ? "eager" : "lazy"}
                        priority={index < 2}
                      />

                      {hasGallery && (
                        <div className="absolute top-4 right-4 rounded-full bg-black/70 px-3 py-1 backdrop-blur-sm">
                          <span className="text-sm font-medium text-white">
                            +{venue.photos.length - 1}
                          </span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4 rounded-full bg-amber-400/90 px-3 py-1.5 backdrop-blur-sm">
                        <span className="text-sm font-bold text-black">{currentYear}</span>
                      </div>
                    </div>

                    <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/90 via-black/70 to-transparent p-6 text-white">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white">{venue.venue}</h3>

                        <div className="flex items-center gap-4 text-sm text-white/90">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>
                              {venue.city}, {venue.state}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(venue.date)}</span>
                          </div>
                        </div>

                        {hasGallery && (
                          <p className="mt-2 text-xs text-amber-400">Click to view gallery</p>
                        )}
                      </div>
                    </div>
                  </motion.div>,
                );

                return elements;
              })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          ></motion.div>
        </div>
      </section>
      {selectedVenue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={closeModal}
            className="absolute inset-0 z-0 bg-black/90 backdrop-blur-sm"
            aria-label="Close gallery"
          />
          <div
            className="relative z-10 max-h-full w-full max-w-5xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-title"
          >
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 z-30 h-10 w-10 touch-manipulation rounded-full bg-black/50 p-2 text-white transition-colors hover:text-amber-400 sm:-top-12"
              aria-label="Close gallery"
            >
              <X className="h-6 w-6 sm:h-8 sm:w-8" />
            </button>

            <div
              className="relative flex max-h-[80vh] w-full touch-manipulation items-center justify-center"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{ touchAction: "pan-y pinch-zoom" }}
            >
              <div className="relative flex h-full w-full items-center justify-center">
                <div className="relative inline-block max-h-full max-w-full">
                  {imageLoadingStates[`${selectedVenue.id}-${currentPhotoIndex}`] && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-zinc-900/80">
                      <Loader2 className="h-8 w-8 animate-spin text-amber-400" />
                    </div>
                  )}
                  <Image
                    key={`${selectedVenue.id}-${currentPhotoIndex}`}
                    src={
                      selectedVenue.photos[currentPhotoIndex]
                        ? getPhotoPath(
                            selectedVenue.id,
                            selectedVenue.photos[currentPhotoIndex].filename,
                          )
                        : ""
                    }
                    alt={selectedVenue.photos[currentPhotoIndex]?.filename || ""}
                    className={`h-auto max-h-[80vh] w-auto max-w-full rounded-lg object-contain transition-opacity duration-300 ${
                      imageLoadingStates[`${selectedVenue.id}-${currentPhotoIndex}`]
                        ? "opacity-0"
                        : "opacity-100"
                    }`}
                    width={1200}
                    height={800}
                    sizes="(max-width: 768px) 95vw, (max-width: 1200px) 80vw, 1200px"
                    quality={75}
                    loading="lazy"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                    onLoad={() => {
                      setImageLoadingStates((prev) => ({
                        ...prev,
                        [`${selectedVenue.id}-${currentPhotoIndex}`]: false,
                      }));
                    }}
                    onLoadStart={() => {
                      setImageLoadingStates((prev) => ({
                        ...prev,
                        [`${selectedVenue.id}-${currentPhotoIndex}`]: true,
                      }));
                    }}
                  />
                </div>
              </div>
            </div>

            {selectedVenue.photos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute top-1/2 left-2 z-20 -translate-y-1/2 rounded-full bg-black/80 p-2 text-white backdrop-blur-sm transition-colors hover:text-amber-400 sm:left-4 sm:p-3"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute top-1/2 right-2 z-20 -translate-y-1/2 rounded-full bg-black/80 p-2 text-white backdrop-blur-sm transition-colors hover:text-amber-400 sm:right-4 sm:p-3"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
