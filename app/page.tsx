import Navbar from "@/components/layout/navbar";
import HeroSection from "@/components/sections/hero";
import MusicShowcaseSection from "@/components/sections/MusicShowcaseSection";
import TourSection from "@/components/sections/tour-section";
import BiographySection from "@/components/sections/biography-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <HeroSection />
        <MusicShowcaseSection />
        <TourSection />
        <BiographySection />
      </main>
    </div>
  );
}
