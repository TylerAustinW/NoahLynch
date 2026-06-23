"use client";

import { usePostHog } from "posthog-js/react";
import { useEffect } from "react";

export default function EPKPageTracker() {
  const ph = usePostHog();

  useEffect(() => {
    ph.capture("epk_page_view", {
      page: "/epk",
      timestamp: new Date().toISOString(),
    });
  }, [ph]);

  useEffect(() => {
    const handleBookingClick = () => {
      ph.capture("epk_booking_click", {
        page: "/epk",
        action: "booking_button_click",
      });
    };

    const handleSocialClick = (platform: string) => {
      ph.capture("epk_social_click", {
        page: "/epk",
        platform,
      });
    };

    const handleMusicLinkClick = (platform: string) => {
      ph.capture("epk_music_link_click", {
        page: "/epk",
        platform,
      });
    };

    const bookingButton = document.querySelector('a[href^="mailto:"]');
    if (bookingButton) {
      bookingButton.addEventListener("click", handleBookingClick);
    }

    const socialLinks = document.querySelectorAll(
      'a[href*="instagram"], a[href*="facebook"], a[href*="youtube"]',
    );
    socialLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const href = link.getAttribute("href");
        if (href?.includes("instagram")) handleSocialClick("instagram");
        if (href?.includes("facebook")) handleSocialClick("facebook");
        if (href?.includes("youtube")) handleSocialClick("youtube");
      });
    });

    const musicLinks = document.querySelectorAll(
      'a[href*="spotify"], a[href*="apple"], a[href*="amazon"]',
    );
    musicLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const href = link.getAttribute("href");
        if (href?.includes("spotify")) handleMusicLinkClick("spotify");
        if (href?.includes("apple")) handleMusicLinkClick("apple_music");
        if (href?.includes("amazon")) handleMusicLinkClick("amazon_music");
      });
    });

    return () => {
      if (bookingButton) {
        bookingButton.removeEventListener("click", handleBookingClick);
      }
      socialLinks.forEach((link) => {
        link.removeEventListener("click", () => handleSocialClick);
      });
      musicLinks.forEach((link) => {
        link.removeEventListener("click", () => handleMusicLinkClick);
      });
    };
  }, [ph]);

  return null;
}
