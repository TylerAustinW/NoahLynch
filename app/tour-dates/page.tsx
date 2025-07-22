import type { Metadata } from 'next';
import TourDates from '@/components/sections/tour-dates';
import Navbar from '@/components/layout/navbar';

export const metadata: Metadata = {
  title: 'Tour Dates - Noah Lynch',
  description:
    "View Noah Lynch's upcoming shows and past performances. Don't miss the next live performance - check tour dates and get tickets.",
  openGraph: {
    title: 'Noah Lynch - Tour Dates',
    description:
      "View Noah Lynch's upcoming shows and past performances. Don't miss the next live performance - check tour dates and get tickets.",
  },
};

export default function TourDatesPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <TourDates />
    </main>
  );
}
