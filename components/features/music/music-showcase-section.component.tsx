"use client";

import { useInView } from "@/lib/hooks/use-in-view.hook";
import { allReleases, type ReleaseWithPlatforms } from "@/lib/data/music";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button.component";

const SHOW_FEATURED_COMING_SOON = false;

const FeaturedCard = memo(({ release }: { release: ReleaseWithPlatforms }) => {
	return (
		<motion.div
			className="group relative overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-900/40 backdrop-blur-sm md:rounded-2xl"
		>
			<div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] md:aspect-[16/10]">
				<Image
					src={release.imageURL}
					alt={`${release.title} - ${release.year}`}
					fill
					sizes="(max-width: 768px) 100vw, 90vw"
					className="object-cover"
					priority
					quality={75}
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent sm:from-black/70 sm:via-black/20" />
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

				<div className="absolute top-3 left-3 rounded-full bg-amber-500/90 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm sm:top-4 sm:left-4 sm:px-4 sm:py-2 sm:text-sm">
					{release.type === "upcoming" ? "COMING SOON" : "LATEST RELEASE"}
				</div>
			</div>

			<div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8">
				<div className="max-w-2xl">
					<motion.h3
						className="mb-2 text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.6 }}
					>
						{release.title}
					</motion.h3>

					<motion.p
						className="mb-4 text-base text-zinc-300 sm:text-lg md:text-xl"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.6 }}
					>
						{release.year} • {release.releasedBy}
					</motion.p>

					<motion.div
						className="flex flex-col gap-3 sm:flex-row sm:gap-4"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.6 }}
					>
						<Button asChild variant="primary" size="sm" className="sm:h-10 sm:px-6 sm:text-sm sm:gap-2">
							<Link href={`/music/${release.id}`} aria-label={`Listen to ${release.title}`}>
								<Play className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover/btn:scale-110" fill="currentColor" />
								Listen Now
							</Link>
						</Button>
						<Button asChild variant="secondary" size="sm" className="sm:h-10 sm:px-6 sm:text-sm sm:gap-2">
							<Link href={`/music/${release.id}`} aria-label={`View details for ${release.title}`}>
								<ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
								View Details
							</Link>
						</Button>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
});
FeaturedCard.displayName = "FeaturedCard";

const RegularCard = memo(({ release }: { release: ReleaseWithPlatforms }) => {
	return (
		<Link href={`/music/${release.id}`} className="group block h-full w-[85vw] sm:w-80 flex-shrink-0">
			<motion.div
				className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-900/40 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/50 hover:bg-zinc-800/50"
			>
				<div className="relative aspect-square w-full overflow-hidden">
					<Image
						src={release.imageURL}
						alt={`${release.title} - ${release.year}`}
						fill
						sizes="320px"
						className="object-cover"
						loading="lazy"
						quality={75}
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100" />

					<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
						<div className="rounded-full bg-amber-400/90 p-3 backdrop-blur-sm">
							<Play className="h-6 w-6 text-black" fill="currentColor" />
						</div>
					</div>
				</div>

				<div className="flex flex-grow flex-col p-4">
					<h4 className="mb-1 text-lg font-semibold text-white transition-colors group-hover:text-amber-400">{release.title}</h4>
					<p className="mb-2 text-sm text-zinc-400">{release.year}</p>
					<p className="mt-auto text-xs text-zinc-500">{release.releasedBy}</p>
				</div>
			</motion.div>
		</Link>
	);
});
RegularCard.displayName = "RegularCard";

export default function MusicShowcaseSection(): React.ReactElement {
	const { ref, inView } = useInView({ threshold: 0.1, once: true });
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);

	const featured = allReleases.find((release) => release.featured === true) || allReleases[0];
	const releases = allReleases.filter((release) => release.id !== featured.id);

	const updateScrollButtons = useCallback(() => {
		if (containerRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

			const cardWidth = window.innerWidth >= 640 ? 320 : window.innerWidth * 0.85;
			const gap = 16;
			const itemWidth = cardWidth + gap;
			const newIndex = Math.round(scrollLeft / itemWidth);
			setCurrentIndex(Math.min(newIndex, releases.length - 1));
		}
	}, [releases.length]);

	useEffect(() => {
		updateScrollButtons();
		const container = containerRef.current;
		if (container) {
			container.addEventListener("scroll", updateScrollButtons);
			return () => container.removeEventListener("scroll", updateScrollButtons);
		}
		return undefined;
	}, [updateScrollButtons]);

	const scrollTo = (direction: "left" | "right") => {
		if (containerRef.current) {
			const container = containerRef.current;
			const cardWidth = window.innerWidth >= 640 ? 320 : window.innerWidth * 0.85;
			const gap = 16;
			const scrollAmount = cardWidth + gap;
			const targetScroll = direction === "left" ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount;

			container.scrollTo({
				left: targetScroll,
				behavior: "smooth",
			});
		}
	};

	const scrollToCard = (index: number) => {
		if (containerRef.current) {
			const container = containerRef.current;
			const cardWidth = window.innerWidth >= 640 ? 320 : window.innerWidth * 0.85;
			const gap = 16;
			const itemWidth = cardWidth + gap;
			const targetScroll = index * itemWidth;

			container.scrollTo({
				left: targetScroll,
				behavior: "smooth",
			});
		}
	};

	return (
		<section ref={ref} id="music" className="relative overflow-hidden bg-zinc-950 px-4 py-16 sm:py-20 md:px-6 md:py-24 lg:py-28">
			<video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover opacity-15">
				<source src="/videos/noah-lynch-hero-video.mp4" type="video/mp4" />
			</video>
			<div className="pointer-events-none absolute inset-0 bg-[url('/overlays/grain-texture-overlay.png')] bg-repeat opacity-[0.03]" />
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-white/4 blur-3xl" />
				<div className="absolute bottom-1/3 right-1/3 h-64 w-64 rounded-full bg-white/3 blur-2xl" />
			</div>

			<div className="relative z-10 mx-auto max-w-7xl">
				<motion.div
					className="mb-8 text-center sm:mb-12"
					initial={{ opacity: 0, y: -20 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
				>
					<h2 className="mb-3 text-4xl font-bold text-zinc-200 sm:mb-4 sm:text-5xl lg:text-6xl">The Music</h2>
					<p className="mx-auto max-w-2xl text-base text-zinc-300 sm:text-lg">
						From intimate acoustic sessions to full productions, explore the musical journey
					</p>
				</motion.div>

				{SHOW_FEATURED_COMING_SOON && (
					<motion.div
						className="mb-12 sm:mb-16"
						initial={{ opacity: 0, y: 40 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						<FeaturedCard release={featured} />
					</motion.div>
				)}

				{releases.length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8, delay: 0.4 }}
					>
						<h3 className="mb-6 text-xl font-bold text-zinc-200 sm:mb-8 sm:text-2xl md:text-3xl">More Releases</h3>

						<div className="relative px-4 sm:px-8 md:px-12">
							<div className="absolute -left-2 sm:-left-4 md:-left-6 top-1/2 z-20 hidden -translate-y-1/2 md:block">
								<button
									onClick={() => scrollTo("left")}
									disabled={!canScrollLeft}
									className={`rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400/50 disabled:opacity-50 disabled:cursor-not-allowed`}
									aria-label="Previous releases"
								>
									<ChevronLeft className="h-6 w-6" />
								</button>
							</div>

							<div className="absolute -right-2 sm:-right-4 md:-right-6 top-1/2 z-20 hidden -translate-y-1/2 md:block">
								<button
									onClick={() => scrollTo("right")}
									disabled={!canScrollRight}
									className={`rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400/50 disabled:opacity-50 disabled:cursor-not-allowed`}
									aria-label="Next releases"
								>
									<ChevronRight className="h-6 w-6" />
								</button>
							</div>

							<div
								ref={containerRef}
								className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4"
								style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
							>
								{releases.map((release, index) => (
									<motion.div
										key={release.id}
										className="snap-start"
										initial={{ opacity: 0, y: 20 }}
										animate={inView ? { opacity: 1, y: 0 } : {}}
										transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
									>
										<RegularCard release={release} />
									</motion.div>
								))}
							</div>

							<div className="mt-4 flex justify-center gap-2 md:hidden">
								{releases.map((_, index) => (
									<button
										key={index}
										onClick={() => scrollToCard(index)}
										className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-amber-400" : "w-2 bg-zinc-600"} hover:bg-amber-400/70 focus:outline-none focus:ring-2 focus:ring-amber-400/50`}
										aria-label={`Go to release ${index + 1}`}
									/>
								))}
							</div>
						</div>
					</motion.div>
				)}
			</div>

			<style jsx>{``}</style>
		</section>
	);
}
