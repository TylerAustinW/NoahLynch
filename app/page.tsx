import Navbar from "@/components/layout/navbar";
import BiographySection from "@/components/sections/biography-section";
import HeroSection from "@/components/sections/hero";
import MusicShowcaseSection from "@/components/sections/MusicShowcaseSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <HeroSection />
        <MusicShowcaseSection />
        <BiographySection />
      </main>
    </div>
  );
}
