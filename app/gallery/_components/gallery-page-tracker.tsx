"use client";

import { usePostHog } from "posthog-js/react";
import { useEffect } from "react";

export default function GalleryPageTracker() {
  const ph = usePostHog();

  useEffect(() => {
    ph.capture("gallery_page_view", {
      page: "/gallery",
      timestamp: new Date().toISOString(),
    });
  }, [ph]);

  useEffect(() => {
    const handleImageClick = () => {
      ph.capture("gallery_image_click", {
        page: "/gallery",
        action: "image_view",
      });
    };

    const handleFullGalleryClick = () => {
      ph.capture("gallery_full_link_click", {
        page: "/gallery",
        action: "view_full_gallery",
      });
    };

    const images = document.querySelectorAll(
      'img[alt*="Noah"], img[alt*="concert"], img[alt*="performance"]',
    );
    images.forEach((img) => {
      img.addEventListener("click", handleImageClick);
    });

    const fullGalleryLink = document.querySelector('a[href="/gallery"]');
    if (fullGalleryLink) {
      fullGalleryLink.addEventListener("click", handleFullGalleryClick);
    }

    return () => {
      images.forEach((img) => {
        img.removeEventListener("click", handleImageClick);
      });
      if (fullGalleryLink) {
        fullGalleryLink.removeEventListener("click", handleFullGalleryClick);
      }
    };
  }, [ph]);

  return null;
}
