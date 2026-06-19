import HeroSection from "@/components/hero/hero";
import Navbar from "@/components/layout/navbar";
import MusicShowcaseSection from "@/components/music/music-showcase";
import dynamic from "next/dynamic";

const BiographySection = dynamic(() => import("@/components/biography/biography"), {
  loading: () => (
    <div className="flex min-h-[50vh] items-center justify-center bg-zinc-950">
      <div className="text-zinc-400">Loading...</div>
    </div>
  ),
});

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <HeroSection />
      <MusicShowcaseSection />
      <BiographySection />
    </div>
  );
}
