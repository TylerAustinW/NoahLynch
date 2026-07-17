"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const profilePhotos = [
  {
    src: "/portraits/IMG_2058_VSCO.jpeg",
    alt: "Noah Lynch - Professional Studio Photo",
  },
  {
    src: "/portraits/IMG_2045.jpeg",
    alt: "Noah Lynch - Live Performance at The Roof",
  },
];

export default function EPKProfileCarousel() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % profilePhotos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + profilePhotos.length) % profilePhotos.length);
  };

  return (
    <div className="group relative mx-auto aspect-3/4 max-w-sm overflow-hidden rounded-2xl border border-zinc-800/50 shadow-2xl lg:max-w-none">
      <Image
        src={profilePhotos[currentPhotoIndex]?.src || "/images/profile-1.jpg"}
        alt={profilePhotos[currentPhotoIndex]?.alt || "Noah Lynch"}
        fill
        sizes="(max-width: 1024px) 100vw, 40vw"
        className="object-cover object-top transition-opacity duration-500"
        priority
        quality={80}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

      {profilePhotos.length > 1 && (
        <>
          <button
            onClick={prevPhoto}
            className="absolute top-1/2 left-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-all hover:bg-black/70 md:opacity-0 md:group-hover:opacity-100"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextPhoto}
            className="absolute top-1/2 right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-all hover:bg-black/70 md:opacity-0 md:group-hover:opacity-100"
            aria-label="Next photo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {profilePhotos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPhotoIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentPhotoIndex ? "w-8 bg-white" : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`View photo ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
