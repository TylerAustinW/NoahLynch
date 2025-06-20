import { Metadata } from "next";
import TourDates from "@/components/sections/tour-dates";
import Navbar from "@/components/layout/navbar";

export const metadata: Metadata = {
  title: "Tour Dates",
  description:
    "See where Noah Lynch has performed. View past tour dates and venues from across the country.",
  openGraph: {
    title: "Noah Lynch - Tour Dates",
    description:
      "See where Noah Lynch has performed. View past tour dates and venues from across the country.",
  },
};

export default function TourDatesPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-20">
        <TourDates />
      </div>
    </main>
  );
}
