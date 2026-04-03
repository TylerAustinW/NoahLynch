import type { Metadata } from "next";
import TourDatesSection from "@/components/features/tour-dates/tour-dates-section.component";
import { getTourPageData } from "@/lib/data/tour/server";

export const metadata: Metadata = {
  title: "Tour Dates - Noah Lynch",
  description:
    "View Noah Lynch's upcoming shows and past performances. Don't miss the next live performance - check tour dates and get tickets.",
  openGraph: {
    title: "Noah Lynch - Tour Dates",
    description:
      "View Noah Lynch's upcoming shows and past performances. Don't miss the next live performance - check tour dates and get tickets.",
  },
};

export default async function TourDatesPage() {
  const { upcoming, past } = await getTourPageData();

  return (
    <main className="min-h-screen">
      <TourDatesSection upcoming={upcoming} past={past} />
    </main>
  );
}
