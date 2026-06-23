"use client";

import { track } from "@vercel/analytics/react";
import { useEffect } from "react";

export default function GalleryPageTracker() {
  useEffect(() => {
    track("gallery_page_view", {
      page: "/gallery",
      timestamp: new Date().toISOString(),
    });

    const handleImageClick = () => {
      track("gallery_image_click", {
        page: "/gallery",
        action: "image_view",
      });
    };

    const handleFullGalleryClick = () => {
      track("gallery_full_link_click", {
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
  }, []);

  return null;
}
