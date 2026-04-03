import Navbar from "@/components/layout/navbar";
import HeroSection from "@/components/hero/hero";
import MusicShowcaseSection from "@/components/music/music-showcase";
import StudioSessionsSection from "@/components/studio-sessions/studio-sessions";
import EntranceAnimation from "@/components/entrance-animation/entrance-animation";
import PageFadeWrapper from "@/components/entrance-animation/page-fade-wrapper";
import dynamic from "next/dynamic";

const BiographySection = dynamic(
  () => import("@/components/biography/biography"),
  {
    loading: () => (
      <div className="flex min-h-[50vh] items-center justify-center bg-zinc-950">
        <div className="text-zinc-400">Loading...</div>
      </div>
    ),
  },
);

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <EntranceAnimation />
      <Navbar />
      <HeroSection />
      <PageFadeWrapper>
        <MusicShowcaseSection />
        <StudioSessionsSection />
        <BiographySection />
      </PageFadeWrapper>
    </div>
  );
}
