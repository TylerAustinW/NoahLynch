import Navbar from '@/components/layout/navbar';
import BiographySection from '@/components/sections/biography-section';
import HeroSection from '@/components/sections/hero';
import MusicShowcaseSection from '@/components/sections/music-showcase-section';
import StudioSessionsSection from '@/components/sections/studio-sessions-section';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <HeroSection />
        <div className="h-px bg-amber-500/20" />
        <MusicShowcaseSection />
        <div className="h-px bg-amber-500/20" />
        <StudioSessionsSection />
        <div className="h-px bg-amber-500/20" />
        <BiographySection />
      </main>
    </div>
  );
}
