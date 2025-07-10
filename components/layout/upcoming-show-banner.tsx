"use client";

import { useEffect, useState } from "react";
import { tourDatesData } from "@/lib/tour-dates-data";
import UpcomingShowNotification from "@/components/ui/upcoming-show-notification";

interface UpcomingShowBannerProps {
  showOnlyOnHomePage?: boolean;
}

export default function UpcomingShowBanner({
  showOnlyOnHomePage = false,
}: UpcomingShowBannerProps) {
  const [nextShow, setNextShow] = useState<(typeof tourDatesData)[0] | null>(
    null
  );
  const [isHomePage, setIsHomePage] = useState(true);

  useEffect(() => {
    // Check if we're on the home page
    setIsHomePage(window.location.pathname === "/");

    // Find the next upcoming show
    const upcomingShows = tourDatesData
      .filter(show => show.upcoming === true)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (upcomingShows.length > 0) {
      setNextShow(upcomingShows[0]);
    }
  }, []);

  // Don't show if configured to show only on home page and we're not on home page
  if (showOnlyOnHomePage && !isHomePage) return null;

  if (!nextShow) return null;

  return <UpcomingShowNotification show={nextShow} variant="banner" />;
}
