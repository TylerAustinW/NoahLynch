"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, MapPin, X, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/utils/date.utils";
import { useEffect, useState, useCallback, useRef } from "react";
import {
  getFeaturedPhoto,
  getPhotoPath,
  hasMultiplePhotos,
  type VenuePhotoCollection,
  venuePhotoCollections,
} from "@/lib/data/venues/venue-photos.data";

export default function LiveGallerySection() {
  const [selectedVenue, setSelectedVenue] = useState<VenuePhotoCollection | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [imageLoadingStates, setImageLoadingStates] = useState<{ [key: string]: boolean }>({});
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const touchEndRef = useRef<{ x: number; y: number } | null>(null);
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

  const handleVenueClick = (venue: VenuePhotoCollection) => {
    if (hasMultiplePhotos(venue)) {
      setSelectedVenue(venue);
      setCurrentPhotoIndex(0);
      const firstPhoto = venue.photos[0];
      if (firstPhoto) {
        const firstImagePath = getPhotoPath(venue.id, firstPhoto.filename);
        preloadImage(firstImagePath);
      }
      if (venue.photos.length > 1) {
        const secondPhoto = venue.photos[1];
        if (secondPhoto) {
          const nextImagePath = getPhotoPath(venue.id, secondPhoto.filename);
          preloadImage(nextImagePath);
        }
      }
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
      const preloadIndex = nextIndex === selectedVenue.photos.length - 1 ? 0 : nextIndex + 1;
      const photoToPreload = selectedVenue.photos[preloadIndex];
      if (photoToPreload) {
        const preloadPath = getPhotoPath(selectedVenue.id, photoToPreload.filename);
        preloadImage(preloadPath).catch(() => {});
      }
    }
  }, [selectedVenue, currentPhotoIndex, preloadImage]);

  const prevPhoto = useCallback(() => {
    if (selectedVenue) {
      const prevIndex =
        currentPhotoIndex === 0 ? selectedVenue.photos.length - 1 : currentPhotoIndex - 1;
      setCurrentPhotoIndex(prevIndex);
      const preloadIndex = prevIndex === 0 ? selectedVenue.photos.length - 1 : prevIndex - 1;
      const photoToPreload = selectedVenue.photos[preloadIndex];
      if (photoToPreload) {
        const preloadPath = getPhotoPath(selectedVenue.id, photoToPreload.filename);
        preloadImage(preloadPath).catch(() => {});
      }
    }
  }, [selectedVenue, currentPhotoIndex, preloadImage]);

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

  useEffect(() => {
    const preloadInitialImages = async () => {
      const imagesToPreload = venuePhotoCollections.slice(0, 2).map((venue) => {
        const featured = getFeaturedPhoto(venue);
        return getPhotoPath(venue.id, featured.filename);
      });

      await Promise.all(imagesToPreload.map(preloadImage));
    };

    preloadInitialImages();
  }, [preloadImage]);

  return (
    <>
      <section className="py-16 px-4 bg-zinc-900/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 id="live-gallery-title" className="text-3xl md:text-4xl font-bold text-white mb-4">
              Live from the Stage
            </h2>
            <div id="Social-Link" className="text-zinc-200 text-md mb-4">
              <p className="text-zinc-200 text-md">
                Follow @noahlynchmusic on social media for more behind-the-scenes content
              </p>
            </div>
            <div className="h-1 w-full bg-zinc-700/20 mb-4" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {venuePhotoCollections.map((venue: VenuePhotoCollection, index: number) => {
              const featuredPhoto = getFeaturedPhoto(venue);
              const photoPath = getPhotoPath(venue.id, featuredPhoto.filename);
              const hasGallery = hasMultiplePhotos(venue);

              const currentYear = new Date(venue.date).getFullYear();
              const prevYear = index > 0 ? new Date(venuePhotoCollections[index - 1].date).getFullYear() : currentYear;
              const shouldShowYearDivider = index > 0 && currentYear !== prevYear;

              return (
                <div key={venue.id + "-" + index}>
                  {shouldShowYearDivider && (
                    <div className="md:col-span-2 flex flex-col items-center gap-3 my-2">
                      <div className="h-px w-full bg-zinc-700/30" />
                      <span className="text-sm text-zinc-300 font-semibold">{currentYear}</span>
                      <div className="h-px w-full bg-zinc-700/30" />
                    </div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className={`group relative overflow-hidden rounded-xl bg-zinc-800/50 border border-zinc-700/30 ${
                      hasGallery ? "cursor-pointer touch-manipulation" : ""
                    }`}
                    onClick={() => handleVenueClick(venue)}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-zinc-800">
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
                        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1">
                          <span className="text-white text-sm font-medium">+{venue.photos.length - 1}</span>
                        </div>
                      )}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/90 via-black/70 to-transparent">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white">{venue.venue}</h3>

                        <div className="flex items-center gap-4 text-sm text-white/90">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{venue.city}, {venue.state}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(venue.date)}</span>
                          </div>
                        </div>

                        {hasGallery && (
                          <p className="text-xs text-amber-400 mt-2">Click to view gallery</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          ></motion.div>
        </div>
      </section>
      {selectedVenue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={closeModal}
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
              onClick={closeModal}
              className="absolute -top-10 sm:-top-12 right-0 p-2 text-white hover:text-amber-400 transition-colors z-30 touch-manipulation bg-black/50 rounded-full w-10 h-10"
              aria-label="Close gallery"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            <div
              className="relative w-full max-h-[80vh] flex items-center justify-center touch-manipulation"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{ touchAction: "pan-y pinch-zoom" }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative inline-block max-w-full max-h-full">
                  {imageLoadingStates[`${selectedVenue.id}-${currentPhotoIndex}`] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80 rounded-lg z-10">
                      <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
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
                    className={`w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-lg transition-opacity duration-300 ${
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
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/80 backdrop-blur-sm rounded-full text-white hover:text-amber-400 transition-colors z-20"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/80 backdrop-blur-sm rounded-full text-white hover:text-amber-400 transition-colors z-20"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}