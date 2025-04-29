import Navbar from '@/components/layout/navbar';
import BiographySection from '@/components/sections/biography-section';
import HeroSection from '@/components/sections/hero';
import TourSection from '@/components/sections/tour-section';
import DiscographySection from './music/discography/page';

export default function Home() {
   return (
      <div className="min-h-screen bg-black text-white">
         <Navbar />
         <main>
            <HeroSection />
            <BiographySection />
            <DiscographySection />
            <TourSection />
         </main>
      </div>
   );
}
