"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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

export default function EPKProfileCarousel() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % profilePhotos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex(
      (prev) => (prev - 1 + profilePhotos.length) % profilePhotos.length,
    );
  };

  return (
    <div className="relative aspect-[3/4] max-w-sm mx-auto lg:max-w-none overflow-hidden rounded-2xl border border-zinc-800/50 shadow-2xl group">
      <Image
        src={profilePhotos[currentPhotoIndex]?.src || "/images/profile-1.jpg"}
        alt={profilePhotos[currentPhotoIndex]?.alt || "Noah Lynch"}
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
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all md:opacity-0 md:group-hover:opacity-100"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all md:opacity-0 md:group-hover:opacity-100"
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
  );
}
