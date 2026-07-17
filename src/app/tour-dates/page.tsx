import TourDatesSection from "@/components/tour-dates/tour-dates";
import { getPast, getUpcoming } from "@/lib/data/tour";
import type { Metadata } from "next";

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
  const upcoming = getUpcoming();
  const past = getPast();

  return (
    <main className="min-h-screen">
      <TourDatesSection upcoming={upcoming} past={past} />
    </main>
  );
}
