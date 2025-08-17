"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/api";
import { SUPABASE_TABLES } from "@/lib/config/constants";
import type { CheckInGalleryItem, Show } from "@/lib/types/checkin.types";
import { ChevronDown, Filter, Loader2, X, ZoomIn } from "lucide-react";
import { track } from "@vercel/analytics";

interface CheckInGalleryProps {
	showId?: number;
	limit?: number;
}

export default function CheckInGallery({ showId, limit = 12 }: CheckInGalleryProps) {
	const [checkins, setCheckins] = useState<CheckInGalleryItem[]>([]);
	const [shows, setShows] = useState<Show[]>([]);
	const [selectedShowId, setSelectedShowId] = useState<number | null>(showId || null);
	const [loading, setLoading] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [hasMore, setHasMore] = useState(true);
	const [offset, setOffset] = useState(0);
	const [lightboxImage, setLightboxImage] = useState<CheckInGalleryItem | null>(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const { data: showsData } = await supabase
					.from(SUPABASE_TABLES.SHOWS)
					.select("*")
					.order("date", { ascending: false });

				setShows(showsData || []);

				let query = supabase
					.from("checkin_gallery")
					.select("*")
					.order("created_at", { ascending: false })
					.range(offset, offset + limit - 1);

				if (selectedShowId) {
					const selectedShow = showsData?.find((s) => s.id === selectedShowId);
					if (selectedShow) {
						query = query.eq("show_date", selectedShow.date);
					}
				}

				const { data, error } = await query;

				if (error) {
					setError("Failed to load check-ins");
					console.error("Error fetching checkins:", error);
					return;
				}

				const newCheckins = data || [];

				if (offset === 0) {
					setCheckins(newCheckins);
				} else {
					setCheckins((prev) => [...prev, ...newCheckins]);
				}

				setHasMore(newCheckins.length === limit);
			} catch (err) {
				setError("Failed to load check-ins");
				console.error("Error fetching data:", err);
			} finally {
				setLoading(false);
				setLoadingMore(false);
			}
		}

		void fetchData();
	}, [selectedShowId, limit, offset]);

	useEffect(() => {
		setOffset(0);
		setHasMore(true);
	}, [selectedShowId]);

	const loadMore = () => {
		if (!loadingMore && hasMore) {
			track("gallery_load_more_clicked", {
				current_offset: offset,
				selected_show: selectedShowId,
			});
			setLoadingMore(true);
			setOffset((prev) => prev + limit);
		}
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape" && lightboxImage) {
				setLightboxImage(null);
			}
		};

		if (lightboxImage) {
			document.addEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "";
		};
	}, [lightboxImage]);

	if (loading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{Array.from({ length: 8 }).map((_, i) => (
					<div key={i} className="bg-zinc-800 rounded-lg overflow-hidden animate-pulse">
						<div className="aspect-square bg-zinc-700"></div>
						<div className="p-4">
							<div className="h-4 bg-zinc-700 rounded mb-2"></div>
							<div className="h-3 bg-zinc-700 rounded w-2/3"></div>
						</div>
					</div>
				))}
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-12">
				<p className="text-zinc-400">{error}</p>
			</div>
		);
	}

	if (checkins.length === 0) {
		return (
			<div className="text-center py-12">
				<p className="text-zinc-400 text-lg">No check-ins yet.</p>
				<p className="text-zinc-500 text-sm mt-2">Be the first to share your show experience!</p>
			</div>
		);
	}

	const formatShowOption = (show: Show) => {
		const date = new Date(show.date + "T00:00:00");
		const formattedDate = date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
		return `${formattedDate} - ${show.venue}`;
	};

	return (
		<div className="space-y-6">
			{!showId && shows.length > 0 && (
				<div className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/30">
					<Filter className="w-4 h-4 text-zinc-400" />
					<label htmlFor="show-filter" className="text-sm font-medium text-zinc-300">
						Filter by show:
					</label>
					<select
						id="show-filter"
						value={selectedShowId || ""}
						onChange={(e) => setSelectedShowId(e.target.value ? Number(e.target.value) : null)}
						className="px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
					>
						<option value="">All shows</option>
						{shows.map((show) => (
							<option key={show.id} value={show.id}>
								{formatShowOption(show)}
							</option>
						))}
					</select>
					{selectedShowId && <span className="text-xs text-zinc-400">({checkins.length} check-ins)</span>}
				</div>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{checkins.map((checkin) => (
					<div
						key={checkin.checkin_id}
						className="bg-zinc-800/50 rounded-lg overflow-hidden backdrop-blur-sm hover:bg-zinc-800 transition-all duration-300 transform hover:scale-105"
					>
						<button
							className="aspect-square relative overflow-hidden cursor-pointer group w-full bg-zinc-900"
							onClick={() => {
								setLightboxImage(checkin);
								track("gallery_image_viewed", {
									checkin_id: checkin.checkin_id,
									venue: checkin.venue,
								});
							}}
							aria-label={`View ${checkin.file_type === "video" ? "video" : "photo"} by ${checkin.name} at ${checkin.venue}`}
						>
							{checkin.file_type === "video" ? (
								<>
									<video src={checkin.file_url} className="w-full h-full object-cover" muted playsInline />
									<div className="absolute inset-0 bg-black/40 flex items-center justify-center">
										<div className="bg-white/90 rounded-full p-3">
											<svg className="w-8 h-8 text-zinc-900" fill="currentColor" viewBox="0 0 24 24">
												<path d="M8 5v14l11-7z" />
											</svg>
										</div>
									</div>
								</>
							) : (
								<Image
									src={checkin.file_url}
									alt={`${checkin.name} at ${checkin.venue}`}
									className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
									fill
								/>
							)}
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
								<ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							</div>
						</button>

						<div className="p-4">
							<h3 className="font-semibold text-white mb-1">{checkin.name}</h3>
							<p className="text-sm text-zinc-400 mb-2">
								{checkin.venue}, {checkin.city}, {checkin.state}
							</p>
							<p className="text-xs text-zinc-500">
								{new Date(checkin.show_date + "T00:00:00").toLocaleDateString("en-US", {
									weekday: "short",
									month: "short",
									day: "numeric",
									year: "numeric",
								})}
							</p>
							{checkin.feedback && <p className="text-sm text-zinc-300 mt-3 line-clamp-2">"{checkin.feedback}"</p>}
						</div>
					</div>
				))}
			</div>

			{hasMore && !loading && (
				<div className="text-center pt-8">
					<button
						onClick={loadMore}
						disabled={loadingMore}
						className="inline-flex items-center gap-3 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium rounded-lg transition-all hover:scale-105 border border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{loadingMore ? (
							<>
								<Loader2 className="w-4 h-4 animate-spin" />
								Loading more...
							</>
						) : (
							<>
								<ChevronDown className="w-4 h-4" />
								Load More Check-ins
							</>
						)}
					</button>
				</div>
			)}

			{/* Lightbox Modal */}
			{lightboxImage && (
				<div
					className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
					onClick={() => setLightboxImage(null)}
					onKeyDown={(e) => e.key === "Enter" && setLightboxImage(null)}
					role="button"
					tabIndex={0}
					aria-label="Close lightbox"
				>
					<div className="relative max-w-4xl max-h-full">
						{/* Close button */}
						<button
							onClick={() => setLightboxImage(null)}
							className="absolute -top-12 right-0 p-2 text-white hover:text-amber-400 transition-colors"
							aria-label="Close lightbox"
						>
							<X className="w-8 h-8" />
						</button>

						<div className="relative max-w-full max-h-[80vh]">
							{lightboxImage.file_type === "video" ? (
								<video
									src={lightboxImage.file_url}
									controls
									autoPlay
									className="max-w-full max-h-[80vh] rounded-lg"
									onClick={(e) => e.stopPropagation()}
								>
									Your browser does not support the video tag.
								</video>
							) : (
								<Image
									src={lightboxImage.file_url}
									alt={`${lightboxImage.name} at ${lightboxImage.venue}`}
									className="max-w-full max-h-full object-contain rounded-lg"
									width={800}
									height={600}
									unoptimized
								/>
							)}
						</div>

						{/* Image details */}
						<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
							<h3 className="text-xl font-bold text-white mb-2">{lightboxImage.name}</h3>
							<p className="text-zinc-300 mb-1">
								{lightboxImage.venue}, {lightboxImage.city}, {lightboxImage.state}
							</p>
							<p className="text-sm text-zinc-400">
								{new Date(lightboxImage.show_date + "T00:00:00").toLocaleDateString("en-US", {
									weekday: "long",
									month: "long",
									day: "numeric",
									year: "numeric",
								})}
							</p>
							{lightboxImage.feedback && <p className="text-zinc-300 mt-3 italic">"{lightboxImage.feedback}"</p>}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
