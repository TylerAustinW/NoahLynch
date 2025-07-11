import Navbar from "@/components/layout/navbar";
import BiographySection from "@/components/sections/biography-section";
import HeroSection from "@/components/sections/hero";
import MusicShowcaseSection from "@/components/sections/MusicShowcaseSection";
import StudioSessionsSection from "@/components/sections/studio-sessions-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <HeroSection />

        {/* Subtle Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

        <MusicShowcaseSection />

        {/* Subtle Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

        <StudioSessionsSection />

        {/* Subtle Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

        <BiographySection />
      </main>
    </div>
  );
}
