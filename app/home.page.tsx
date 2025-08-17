import Navbar from "@/components/layout/navbar.component";
import HeroSection from "@/components/features/hero/hero-section.component";
import MusicShowcaseSection from "@/components/features/music/music-showcase-section.component";
import StudioSessionsSection from "@/components/features/studio-sessions/studio-sessions-section.component";
import LiveGallerySection from "@/components/features/live-gallery/live-gallery-section.component";
import CheckInButton from "@/components/ui/checkin-button.component";
import dynamic from "next/dynamic";

const BiographySection = dynamic(() => import("@/components/features/biography/biography-section.component"), {
	loading: () => (
		<div className="min-h-[50vh] bg-zinc-950 flex items-center justify-center">
			<div className="text-zinc-400">Loading...</div>
		</div>
	),
});

export default function Home() {
	return (
		<div className="min-h-screen bg-zinc-950 text-white">
			<Navbar />
			<main>
				<HeroSection />
				<MusicShowcaseSection />
				<StudioSessionsSection />
				<LiveGallerySection />
				<BiographySection />
			</main>
			<CheckInButton variant="floating" />
		</div>
	);
}
