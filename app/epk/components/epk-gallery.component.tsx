"use client";

import { ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface GalleryPhoto {
  src: string;
  alt: string;
}

interface GalleryCollection {
  id: string;
  venue: string;
  city: string;
  state: string;
  date: string;
  photos: GalleryPhoto[];
}

interface EPKGalleryProps {
  title: string;
  collections: GalleryCollection[];
}

export default function EPKGallery({ title, collections }: EPKGalleryProps) {
  const sortedCollections = [...collections].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const [selectedCollection, setSelectedCollection] = useState<GalleryCollection | null>(null);
  const [currentGalleryPhotoIndex, setCurrentGalleryPhotoIndex] = useState(0);
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<string, boolean>>({});
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

  const handleGalleryClick = (collection: GalleryCollection, photoIndex: number = 0) => {
    setSelectedCollection(collection);
    setCurrentGalleryPhotoIndex(photoIndex);
    const currentPhoto = collection.photos[photoIndex];
    if (currentPhoto) preloadImage(currentPhoto.src);
    if (photoIndex > 0) {
      const prev = collection.photos[photoIndex - 1];
      if (prev) preloadImage(prev.src);
    }
    if (photoIndex < collection.photos.length - 1) {
      const next = collection.photos[photoIndex + 1];
      if (next) preloadImage(next.src);
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
      if (selectedCollection.photos[preloadIndex]) {
        preloadImage(selectedCollection.photos[preloadIndex].src).catch(() => {});
      }
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
      if (selectedCollection.photos[preloadIndex]) {
        preloadImage(selectedCollection.photos[preloadIndex].src).catch(() => {});
      }
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
    <>
      <section id="gallery" className="mt-12">
        <div className="relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-8 overflow-hidden">
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
              {title}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedCollections.map((collection) => (
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
                    src={selectedCollection.photos[currentGalleryPhotoIndex]?.src || ""}
                    alt={selectedCollection.photos[currentGalleryPhotoIndex]?.alt || ""}
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
    </>
  );
}
