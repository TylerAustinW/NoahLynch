"use client";

import { Button } from "@/components/ui/button.component";
import ErrorBoundary from "@/components/ui/error-boundary.component";
import CheckInButton from "@/components/ui/checkin-button.component";
import PastShowsModal from "./past-shows-modal.component";
import ShowBadge from "./show-badge.component";
import { useInView } from "@/lib/hooks/use-in-view.hook";
import { getPastTourDates } from "@/lib/data/tour/tour-dates.data";
import { SOCIAL_LINKS } from "@/lib/config/app.config";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Patrick_Hand } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF, FaTiktok, FaYoutube } from "react-icons/fa6";

const patrickHand = Patrick_Hand({
	weight: "400",
	subsets: ["latin"],
});

export default function HeroSection(): React.ReactElement {
	const { ref } = useInView({ threshold: 0.1 });
	const [loaded, setLoaded] = useState(false);
	const [imageError, setImageError] = useState(false);
	const [reducedMotion, setPrefersReducedMotion] = useState(false);
	const [showPastShows, setShowPreviousShows] = useState(false);

	const pastShows = getPastTourDates();

	useEffect(() => {
		setLoaded(true);

		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		setPrefersReducedMotion(mediaQuery.matches);

		const handleChange = (e: MediaQueryListEvent) => {
			setPrefersReducedMotion(e.matches);
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	useEffect(() => {
		const handleEscapeKey = (e: KeyboardEvent) => {
			if (e.key === "Escape" && showPastShows) {
				setShowPreviousShows(false);
			}
		};

		if (showPastShows) {
			document.addEventListener("keydown", handleEscapeKey);
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.removeEventListener("keydown", handleEscapeKey);
			document.body.style.overflow = "";
		};
	}, [showPastShows]);

	if (imageError) {
		return (
			<section ref={ref} className="relative flex min-h-screen items-center justify-center bg-black pt-16">
				<div className="text-center">
					<h1 className={`mb-4 text-5xl font-bold md:text-7xl ${patrickHand.className}`}>
						Noah Lynch
						<br />
						<span className="mb-4 text-5xl font-bold text-amber-100 md:text-7xl">Musician</span>
					</h1>
				</div>
			</section>
		);
	}

	const animationVariants = {
		scroll: {
			y: reducedMotion ? [0] : [0, 10, 0],
			transition: {
				repeat: Infinity,
				duration: reducedMotion ? 0 : 1.5,
				ease: "easeInOut",
			},
		},
		fadeIn: {
			opacity: {
				delay: reducedMotion ? 0 : 1.5,
				duration: reducedMotion ? 0 : 0.8,
			},
		},
	};

	return (
		<ErrorBoundary>
			<section
				ref={ref}
				id="hero"
				className="relative flex min-h-screen items-center overflow-hidden pt-16 pb-0 bg-zinc-950"
			>
				<div className="absolute inset-0 h-full w-full">
					<Image
						src="/portraits/Mobile-Background.jpg"
						alt="Noah Lynch
						Mobile Background"
						fill
						sizes="(max-width: 768px) 100vw, 0px"
						className="object-cover md:hidden"
						style={{
							objectPosition: "center center",
							transform: loaded ? "scale(1.02)" : "scale(1)",
							transition: "transform 30s ease-out",
						}}
						onError={() => setImageError(true)}
						priority
					/>
					<Image
						src="/portraits/noah-lynch-studio-black-white.jpg"
						alt="Noah Lynch in Studio"
						fill
						sizes="(min-width: 768px) 100vw, 0px"
						className="object-cover hidden md:block"
						style={{
							objectPosition: "center 20%",
							transform: loaded ? "scale(1.02)" : "scale(1)",
							transition: "transform 30s ease-out",
						}}
						onError={() => setImageError(true)}
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40" />
					<div className="pointer-events-none absolute inset-0 bg-[url('/overlays/grain-texture-overlay.png')] bg-repeat opacity-[0.01] md:opacity-[0.03]" />
				</div>

				<div className="relative z-10 container mx-auto px-4 md:px-6">
					<div
						className={`max-w-xl transition-all duration-1000 ${loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
					>
						<div className="relative z-20 mb-4 sm:mb-6">
							<div className="w-full max-w-fit">
								<ShowBadge />
							</div>
						</div>

						<div className="space-y-5">
							<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
								<Button asChild variant="primary" size="default">
									<Link href="/music/honest" aria-label="Listen to the latest album Honest">
										Listen Now
									</Link>
								</Button>
								<Button asChild variant="secondary" size="default">
									<Link href={`mailto:${SOCIAL_LINKS.EMAIL}`} aria-label="Contact Noah Lynch via email">
										Contact
									</Link>
								</Button>
								<CheckInButton
									variant="inherit"
									className="rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white/15 hover:border-white/35 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent min-h-[36px] flex items-center justify-center sm:px-4 sm:py-2 sm:text-sm sm:min-h-[36px]"
								/>
								<Link
									href={"#music"}
									className="rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white/15 hover:border-white/35 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent min-h-[36px] flex items-center justify-center sm:px-4 sm:py-2 sm:text-sm sm:min-h-[36px]"
									aria-label="Explore Noah Lynch's music catalog"
								>
									Explore Music
								</Link>
							</div>

							<div className="pt-1 lg:hidden">
								<div className="flex gap-4 justify-center sm:justify-start">
									<Link
										href={SOCIAL_LINKS.INSTAGRAM}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Follow Noah Lynch on Instagram"
										className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-all duration-300 hover:text-pink-400 hover:bg-pink-500/10 focus:outline-none focus:ring-1 focus:ring-pink-400/40"
									>
										<FaInstagram className="h-5 w-5" aria-hidden="true" />
									</Link>
									<Link
										href={SOCIAL_LINKS.FACEBOOK}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Follow Noah Lynch on Facebook"
										className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-all duration-300 hover:text-blue-400 hover:bg-blue-500/10 focus:outline-none focus:ring-1 focus:ring-blue-400/40"
									>
										<FaFacebookF className="h-5 w-5" aria-hidden="true" />
									</Link>
									<Link
										href={SOCIAL_LINKS.TIKTOK}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Follow Noah Lynch on TikTok"
										className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-all duration-300 hover:text-red-400 hover:bg-red-500/10 focus:outline-none focus:ring-1 focus:ring-red-400/40"
									>
										<FaTiktok className="h-5 w-5" aria-hidden="true" />
									</Link>
									<Link
										href={SOCIAL_LINKS.YOUTUBE}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Subscribe to Noah Lynch on YouTube"
										className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-all duration-300 hover:text-red-400 hover:bg-red-500/10 focus:outline-none focus:ring-1 focus:ring-red-400/40"
									>
										<FaYoutube className="h-5 w-5" aria-hidden="true" />
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>

				<motion.div
					className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 sm:hidden"
					initial={{ opacity: 0 }}
					animate={{
						opacity: loaded ? 1 : 0,
					}}
					transition={animationVariants.fadeIn}
				>
					<ChevronDown className="h-7 w-7 text-zinc-300" aria-hidden="true" />
				</motion.div>

				<PastShowsModal isOpen={showPastShows} onClose={() => setShowPreviousShows(false)} pastShows={pastShows} />
			</section>
		</ErrorBoundary>
	);
}
