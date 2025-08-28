"use client";

import Navbar from "@/components/layout/navbar.component";
import HeroSection from "@/components/features/hero/hero-section.component";
import MusicShowcaseSection from "@/components/features/music/music-showcase-section.component";
import StudioSessionsSection from "@/components/features/studio-sessions/studio-sessions-section.component";
import CheckInButton from "@/components/ui/checkin-button.component";
import EntranceAnimation from "@/components/features/entrance-animation/entrance-animation.component";
import PageFadeWrapper from "@/components/features/entrance-animation/page-fade-wrapper.component";
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
			<EntranceAnimation />
			<HeroSection />
			<PageFadeWrapper>
				<Navbar />
				<div className="w-full">
					<img 
						src="/covers/chasing-a-feelin-banner.png" 
						alt="Chasing a Feelin' by Noah Lynch" 
						className="w-full h-auto object-cover"
					/>
				</div>
				<MusicShowcaseSection />
				<StudioSessionsSection />
				<BiographySection />
				<CheckInButton variant="floating" />
			</PageFadeWrapper>
		</div>
	);
}
