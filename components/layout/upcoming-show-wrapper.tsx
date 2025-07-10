"use client";

import { useEffect, useState } from "react";
import { tourDatesData } from "@/lib/tour-dates-data";
import UpcomingShowNotification from "@/components/ui/upcoming-show-notification";

export default function UpcomingShowWrapper() {
  const [nextShow, setNextShow] = useState<(typeof tourDatesData)[0] | null>(
    null
  );

  useEffect(() => {
    // Find the next upcoming show
    const upcomingShows = tourDatesData
      .filter(show => show.upcoming === true)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (upcomingShows.length > 0) {
      setNextShow(upcomingShows[0]);
    }
  }, []);

  if (!nextShow) return null;

  return <UpcomingShowNotification show={nextShow} variant="floating" />;
}
