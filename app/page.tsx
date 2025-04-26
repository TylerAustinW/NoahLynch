import DiscographySection from "@/app/Music/discography/page";
import Navbar from "@/components/layout/navbar";
import BiographySection from "@/components/sections/biography-section";
import HeroSection from "@/components/sections/hero";
export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main>
        <HeroSection />
        <BiographySection />
        <DiscographySection />
      </main>
    </div>
  );
}
