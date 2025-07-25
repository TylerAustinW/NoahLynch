import Navbar from '@/components/layout/navbar';
import HeroSection from '@/components/sections/hero-section';
import MusicShowcaseSection from '@/components/sections/music-showcase-section';
import StudioSessionsSection from '@/components/sections/studio-sessions-section';
import dynamic from 'next/dynamic';

// Lazy load BiographySection to prevent CSS preload warning
const BiographySection = dynamic(
  () => import('@/components/sections/biography-section'),
  {
    loading: () => (
      <div className="min-h-[50vh] bg-zinc-950 flex items-center justify-center">
        <div className="text-zinc-400">Loading...</div>
      </div>
    ),
  }
);

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <main>
        <HeroSection />
        <MusicShowcaseSection />
        <StudioSessionsSection />
        <BiographySection />
      </main>
    </div>
  );
}
