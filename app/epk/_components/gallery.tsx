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
    if (currentPhoto) void preloadImage(currentPhoto.src);
    if (photoIndex > 0) {
      const prev = collection.photos[photoIndex - 1];
      if (prev) void preloadImage(prev.src);
    }
    if (photoIndex < collection.photos.length - 1) {
      const next = collection.photos[photoIndex + 1];
      if (next) void preloadImage(next.src);
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
        preloadImage(selectedCollection.photos[preloadIndex].src).catch(() => { });
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
        preloadImage(selectedCollection.photos[preloadIndex].src).catch(() => { });
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
        <div className="relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-8 backdrop-blur-sm">
          <div className="absolute inset-0">
            <Image
              src="/venues/the-roof/NoahAtTheRoof.jpg"
              alt="Noah Lynch gallery"
              fill
              className="rounded-2xl object-cover opacity-5"
              sizes="100vw"
              quality={75}
            />
            <div className="bg-liner-to-b absolute inset-0 rounded-2xl from-zinc-900/90 via-zinc-900/95 to-zinc-900/95" />
          </div>
          <div className="relative z-10">
            <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold text-white">
              <div className="h-8 w-1 rounded-full bg-amber-400" />
              {title}
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedCollections.map((collection) => (
                <div key={collection.id} className="space-y-4">
                  <div className="rounded-lg bg-zinc-800/50 p-4">
                    <h3 className="font-semibold text-amber-400">{collection.venue}</h3>
                    <p className="text-sm text-zinc-400">
                      {collection.city}, {collection.state} •{" "}
                      {new Date(`${collection.date}T12:00:00`).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  {collection.photos.slice(0, 1).map((photo, photoIdx) => (
                    <div
                      key={photoIdx}
                      className="group relative aspect-video cursor-pointer overflow-hidden rounded-lg"
                      onClick={() => handleGalleryClick(collection, photoIdx)}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="rounded-full bg-black/50 p-3 backdrop-blur-sm">
                          <svg
                            className="h-6 w-6 text-white"
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
                        <div className="absolute top-4 right-4 rounded-full bg-black/70 px-3 py-1 backdrop-blur-sm">
                          <span className="text-sm font-medium text-white">
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
              onClick={closeGalleryModal}
              className="absolute -top-10 right-0 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 p-2 text-white transition-colors hover:text-amber-400 sm:-top-12 sm:h-auto sm:w-auto sm:bg-transparent"
              aria-label="Close gallery"
            >
              <X className="h-6 w-6 sm:h-8 sm:w-8" />
            </button>

            <div className="relative flex max-h-[80vh] w-full items-center justify-center">
              <div className="relative flex h-full w-full items-center justify-center">
                <div className="relative inline-block max-h-full max-w-full">
                  {imageLoadingStates[`${selectedCollection.id}-${currentGalleryPhotoIndex}`] && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-zinc-900/80">
                      <Loader2 className="h-8 w-8 animate-spin text-amber-400" />
                    </div>
                  )}
                  <Image
                    key={`${selectedCollection.id}-${currentGalleryPhotoIndex}`}
                    src={selectedCollection.photos[currentGalleryPhotoIndex]?.src || ""}
                    alt={selectedCollection.photos[currentGalleryPhotoIndex]?.alt || ""}
                    className={`h-auto max-h-[80vh] w-auto max-w-full rounded-lg object-contain transition-opacity duration-300 ${imageLoadingStates[`${selectedCollection.id}-${currentGalleryPhotoIndex}`]
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
                  className="absolute top-1/2 left-2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/80 p-2 text-white backdrop-blur-sm transition-colors hover:text-amber-400 sm:left-4 sm:h-auto sm:w-auto sm:p-3"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
                <button
                  onClick={nextGalleryPhoto}
                  className="absolute top-1/2 right-2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/80 p-2 text-white backdrop-blur-sm transition-colors hover:text-amber-400 sm:right-4 sm:h-auto sm:w-auto sm:p-3"
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
