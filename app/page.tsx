import Navbar from "@/components/layout/navbar";
import BiographySection from "@/components/sections/biography-section";
import HeroSection from "@/components/sections/hero";
import MusicShowcaseSection from "@/components/sections/MusicShowcaseSection";
import StudioSessionsSection from "@/components/sections/studio-sessions-section";
import UpcomingShowWrapper from "@/components/layout/upcoming-show-wrapper";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <HeroSection />
        <MusicShowcaseSection />
        <StudioSessionsSection />
        <BiographySection />
      </main>
      <UpcomingShowWrapper />
    </div>
  );
}