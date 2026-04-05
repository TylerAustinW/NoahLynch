import type { Metadata } from "next";
import TourDatesSection from "@/components/tour-dates/tour-dates";
import { getTourPageData } from "@/lib/data/tour/server";

export const metadata: Metadata = {
  title: "Tour Dates",
  description:
    "View Noah Lynch's upcoming shows and past performances. Don't miss the next live performance - check tour dates and get tickets.",
  alternates: {
    canonical: "/tour-dates",
  },
  openGraph: {
    title: "Tour Dates",
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
