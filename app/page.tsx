import BiographySection from "@/components/biography-section";
import DiscographySection from "@/components/discography-section";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import Navbar from "@/components/navbar";
import TourDatesSection from "@/components/tour-dates-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <HeroSection />
        <BiographySection />
        <DiscographySection />
        <TourDatesSection />
      </main>
      <Footer />
    </div>
  );
}
