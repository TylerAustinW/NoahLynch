"use client";

import Image from "next/image";
import Link from "next/link";
import { Patrick_Hand } from "next/font/google";
import { Music, ExternalLink, Star, Calendar, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const patrickHand = Patrick_Hand({
	weight: "400",
	subsets: ["latin"],
});

interface Release {
	title: string;
	date: string;
	highlights?: string;
	coverArt?: string;
	slug?: string;
}

interface LatestReleasesProps {
	releases: Release[];
	className?: string;
}

export default function LatestReleases({ releases, className = "" }: LatestReleasesProps) {
	return (
		<div className={`space-y-6 ${className}`}>
			{releases.map((release, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: index * 0.1, duration: 0.5 }}
				>
					<Link
						href={release.slug ? `/music/${release.slug}` : "#"}
						className="group block"
					>
						<div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900/90 via-zinc-800/50 to-zinc-900/90 backdrop-blur-md border border-zinc-700/40 shadow-2xl transition-all duration-500 hover:border-amber-500/60 hover:shadow-amber-500/20 hover:-translate-y-1">
							{/* Background Pattern */}
							<div className="absolute inset-0 bg-[url('/overlays/grain-texture-overlay.png')] bg-repeat opacity-[0.03]" />
							
							{/* Gradient Overlay */}
							<div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

							<div className="relative flex items-center p-6 lg:p-8">
								{/* Cover Art */}
								<div className="relative flex-shrink-0 mr-6 lg:mr-8">
									<div className="relative w-24 h-24 lg:w-32 lg:h-32 xl:w-36 xl:h-36 rounded-xl overflow-hidden shadow-2xl ring-1 ring-zinc-600/50 group-hover:ring-amber-500/50 transition-all duration-300">
										{release.coverArt ? (
											<Image
												src={release.coverArt}
												alt={`${release.title} cover art`}
												fill
												sizes="(max-width: 1024px) 96px, (max-width: 1280px) 128px, 144px"
												className="object-cover transition-transform duration-500 group-hover:scale-110"
											/>
										) : (
											<div className="w-full h-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
												<Music className="w-8 h-8 lg:w-10 lg:h-10 text-white/90" />
											</div>
										)}
									</div>
									
									{/* Decorative Corner Element */}
									<div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
										<Sparkles className="w-2.5 h-2.5 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
									</div>
								</div>

								{/* Content */}
								<div className="flex-1 min-w-0 space-y-3">
									{/* Title and External Link */}
									<div className="flex items-start justify-between gap-4">
										<h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-white group-hover:text-amber-300 transition-colors duration-300 leading-tight">
											{release.title}
										</h3>
										<ExternalLink className="w-5 h-5 text-zinc-400 group-hover:text-amber-400 transition-colors duration-300 flex-shrink-0 mt-1" />
									</div>

									{/* Date */}
									<div className="flex items-center gap-2 text-zinc-300 group-hover:text-zinc-200 transition-colors duration-300">
										<Calendar className="w-4 h-4 text-amber-500/80" />
										<span className="text-sm lg:text-base font-medium tracking-wide">
											{release.date}
										</span>
									</div>

									{/* Highlights Badge */}
									{release.highlights && (
										<div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600/20 to-amber-500/20 border border-amber-500/30 rounded-full backdrop-blur-sm">
											<Star className="w-4 h-4 text-amber-400 fill-amber-400/20" />
											<span className="text-sm lg:text-base font-medium text-amber-300 tracking-wide">
												{release.highlights}
											</span>
										</div>
									)}

									{/* Professional Subtitle */}
									<p className={`${patrickHand.className} text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300 text-base lg:text-lg italic leading-relaxed`}>
										"Every note tells a story worth sharing"
									</p>
								</div>
							</div>

							{/* Bottom Accent Line */}
							<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
						</div>
					</Link>
				</motion.div>
			))}
		</div>
	);
}