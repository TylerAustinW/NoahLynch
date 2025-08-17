"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";
import { formatDate } from "@/lib/utils/date.utils";
import { useEffect, useState, useCallback, useRef } from "react";
import {
	getFeaturedPhoto,
	getPhotoPath,
	hasMultiplePhotos,
	type VenuePhotoCollection,
	venuePhotoCollections,
} from "@/lib/data/venues/venue-photos.data";

export default function LiveGallerySection() {
	const [selectedVenue, setSelectedVenue] = useState<VenuePhotoCollection | null>(null);
	const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
	const touchStartRef = useRef<{ x: number; y: number } | null>(null);
	const touchEndRef = useRef<{ x: number; y: number } | null>(null);

	const handleVenueClick = (venue: VenuePhotoCollection) => {
		if (hasMultiplePhotos(venue)) {
			setSelectedVenue(venue);
			setCurrentPhotoIndex(0);
		}
	};

	const closeModal = () => {
		setSelectedVenue(null);
		setCurrentPhotoIndex(0);
	};

	const nextPhoto = useCallback(() => {
		if (selectedVenue) {
			setCurrentPhotoIndex((prev) => (prev === selectedVenue.photos.length - 1 ? 0 : prev + 1));
		}
	}, [selectedVenue]);

	const prevPhoto = useCallback(() => {
		if (selectedVenue) {
			setCurrentPhotoIndex((prev) => (prev === 0 ? selectedVenue.photos.length - 1 : prev - 1));
		}
	}, [selectedVenue]);

	const handleTouchStart = useCallback((e: React.TouchEvent) => {
		const touch = e.touches[0];
		touchStartRef.current = { x: touch.clientX, y: touch.clientY };
	}, []);

	const handleTouchEnd = useCallback(
		(e: React.TouchEvent) => {
			if (!touchStartRef.current) return;

			const touch = e.changedTouches[0];
			touchEndRef.current = { x: touch.clientX, y: touch.clientY };

			const deltaX = touchEndRef.current.x - touchStartRef.current.x;
			const deltaY = touchEndRef.current.y - touchStartRef.current.y;

			if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
				if (deltaX > 0) {
					prevPhoto();
				} else {
					nextPhoto();
				}
			}

			touchStartRef.current = null;
			touchEndRef.current = null;
		},
		[nextPhoto, prevPhoto],
	);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!selectedVenue) return;

			switch (e.key) {
				case "Escape":
					closeModal();
					break;
				case "ArrowLeft":
					prevPhoto();
					break;
				case "ArrowRight":
					nextPhoto();
					break;
			}
		};

		if (selectedVenue) {
			document.addEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "";
		};
	}, [nextPhoto, prevPhoto, selectedVenue]);

	return (
		<>
			<section className="py-16 px-4 bg-zinc-900/50">
				<div className="container mx-auto max-w-6xl">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="text-center mb-12"
					>
						<h2 id="live-gallery-title" className="text-3xl md:text-4xl font-bold text-white mb-4">
							Live from the Stage
						</h2>
					</motion.div>

					<div className="grid md:grid-cols-2 gap-8">
						{venuePhotoCollections.map((venue: VenuePhotoCollection, index: number) => {
							const featuredPhoto = getFeaturedPhoto(venue);
							const photoPath = getPhotoPath(venue.id, featuredPhoto.filename);
							const hasGallery = hasMultiplePhotos(venue);

							return (
								<motion.div
									key={venue.id}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.2 }}
									viewport={{ once: true }}
									className={`group relative overflow-hidden rounded-xl bg-zinc-800/50 border border-zinc-700/30 ${
										hasGallery ? "cursor-pointer touch-manipulation" : ""
									}`}
									onClick={() => handleVenueClick(venue)}
								>
									<div className="aspect-[4/3] relative overflow-hidden">
										<Image
											src={photoPath}
											alt={featuredPhoto.filename}
											fill
											className="object-cover transition-transform duration-500 group-hover:scale-105"
											sizes="(max-width: 768px) 100vw, 50vw"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

										{hasGallery && (
											<div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1">
												<span className="text-white text-sm font-medium">+{venue.photos.length - 1}</span>
											</div>
										)}
									</div>

									<div className="absolute bottom-0 left-0 right-0 p-6 text-white">
										<div className="space-y-2">
											<h3 className="text-xl font-bold">{venue.venue}</h3>

											<div className="flex items-center gap-4 text-sm text-zinc-300">
												<div className="flex items-center gap-1">
													<MapPin className="w-4 h-4" />
													<span>
														{venue.city}, {venue.state}
													</span>
												</div>
												<div className="flex items-center gap-1">
													<Calendar className="w-4 h-4" />
													<span>{formatDate(venue.date)}</span>
												</div>
											</div>

											{hasGallery && (
												<p className="text-xs text-amber-400 mt-2">
													Click to view gallery ({venue.photos.length} photos)
												</p>
											)}
										</div>
									</div>

									<div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								</motion.div>
							);
						})}
					</div>

					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						viewport={{ once: true }}
						className="text-center mt-12"
					>
						<p className="text-zinc-400 text-sm">
							Follow @noahlynchmusic on social media for more behind-the-scenes content
						</p>
					</motion.div>
				</div>
			</section>
			{selectedVenue && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<button
						type="button"
						onClick={closeModal}
						className="absolute inset-0 bg-black/90 backdrop-blur-sm z-0"
						aria-label="Close gallery"
					/>
					<div
						className="relative z-10 max-w-5xl max-h-full w-full"
						role="dialog"
						aria-modal="true"
						aria-labelledby="gallery-title"
					>
						<button
							onClick={closeModal}
							className="absolute -top-10 sm:-top-12 right-0 p-2 text-white hover:text-amber-400 transition-colors z-30 touch-manipulation bg-black/50 rounded-full w-10 h-10 sm:w-auto sm:h-auto sm:bg-transparent flex items-center justify-center"
							aria-label="Close gallery"
						>
							<X className="w-6 h-6 sm:w-8 sm:h-8" />
						</button>

						<div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-black/80 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 z-10">
							<span className="text-white text-xs sm:text-sm font-medium">
								{currentPhotoIndex + 1} of {selectedVenue.photos.length}
							</span>
						</div>

						<div
							className="relative w-full max-h-[80vh] flex items-center justify-center touch-manipulation"
							onTouchStart={handleTouchStart}
							onTouchEnd={handleTouchEnd}
						>
							<Image
								src={getPhotoPath(selectedVenue.id, selectedVenue.photos[currentPhotoIndex].filename)}
								alt={selectedVenue.photos[currentPhotoIndex].filename}
								className="max-w-full max-h-full object-contain rounded-lg"
								width={1200}
								height={800}
								unoptimized
							/>
						</div>

						{selectedVenue.photos.length > 1 && (
							<>
								<button
									onClick={prevPhoto}
									className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/80 backdrop-blur-sm rounded-full text-white hover:text-amber-400 transition-colors z-20 touch-manipulation w-12 h-12 sm:w-auto sm:h-auto flex items-center justify-center"
									aria-label="Previous photo"
								>
									<ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
								</button>
								<button
									onClick={nextPhoto}
									className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/80 backdrop-blur-sm rounded-full text-white hover:text-amber-400 transition-colors z-20 touch-manipulation w-12 h-12 sm:w-auto sm:h-auto flex items-center justify-center"
									aria-label="Next photo"
								>
									<ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
								</button>
							</>
						)}

						<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6 rounded-b-lg z-10">
							<h3 id="gallery-title" className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
								{selectedVenue.venue}
							</h3>
							<p className="text-sm sm:text-base text-zinc-300 mb-1">
								{selectedVenue.city}, {selectedVenue.state}
							</p>
							<p className="text-xs sm:text-sm text-zinc-400">{formatDate(selectedVenue.date)}</p>
						</div>

						{selectedVenue.photos.length > 1 && (
							<div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
								{selectedVenue.photos.map((_, index) => (
									<button
										key={index}
										onClick={() => setCurrentPhotoIndex(index)}
										className={`w-3 h-3 sm:w-2 sm:h-2 rounded-full transition-colors touch-manipulation ${
											index === currentPhotoIndex ? "bg-amber-400" : "bg-white/50"
										}`}
										aria-label={`Go to photo ${index + 1}`}
									/>
								))}
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}
