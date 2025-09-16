"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Clock, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button.component";
import { useFocusTrap } from "@/lib/hooks/use-focus-trap.hook";
import { formatDate } from "@/lib/utils/date.utils";
import { Patrick_Hand } from "next/font/google";
import type { TourDate } from "@/lib/data/tour";

const Font = Patrick_Hand({
	weight: "400",
	subsets: ["latin"],
});

interface PastShowsModalProps {
	isOpen: boolean;
	onClose: () => void;
	pastShows: TourDate[];
}

export default ({ isOpen, onClose, pastShows }: PastShowsModalProps) => {
	const modalRef = useFocusTrap({
		isActive: isOpen,
		restoreFocus: true,
		autoFocus: true,
	});

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={onClose}
				>
					<motion.div
						ref={modalRef}
						className="relative w-full max-w-2xl max-h-[80vh] mx-4 bg-zinc-900/95 backdrop-blur-sm rounded-2xl border border-zinc-700/50 overflow-hidden"
						initial={{ opacity: 0, scale: 0.9, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.9, y: 20 }}
						onClick={(e) => e.stopPropagation()}
					>
						<div className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-700/50 px-6 py-4 flex items-center justify-between">
							<h2 className={`text-xl sm:text-2xl font-bold text-amber-200 ${Font.className}`}>Previous Shows</h2>
							<Button onClick={onClose} variant="ghost" size="icon-sm" aria-label="Close modal">
								<X className="h-4 w-4" />
							</Button>
						</div>

						<div className="px-6 py-4">
							<div className="block sm:hidden">
								<motion.div
									className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
									style={{
										WebkitOverflowScrolling: "touch",
										scrollbarWidth: "none",
										msOverflowStyle: "none",
									}}
								>
									{pastShows.map((show, index) => (
										<motion.div
											key={show.id}
											className="snap-center shrink-0 w-[85vw] max-w-sm"
											initial={{ opacity: 0, x: 50 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: index * 0.1 }}
										>
											<div className="h-full rounded-xl bg-zinc-800/50 border border-zinc-700/30 p-4">
												<h3 className="font-semibold text-zinc-100 text-lg">{show.venue}</h3>
												<div className="flex items-center gap-2 text-zinc-300 text-sm mt-1">
													<MapPin className="h-4 w-4" />
													<span>
														{show.city}, {show.state}
													</span>
												</div>
												{show.description && <p className="text-zinc-400 text-sm mt-3 line-clamp-3">{show.description}</p>}
												<div className="mt-4 space-y-1">
													<div className="text-amber-200 font-medium">{formatDate(show.date)}</div>
													{show.time && (
														<div className="flex items-center gap-1 text-zinc-400 text-sm">
															<Clock className="h-3 w-3" />
															<span>{show.time}</span>
														</div>
													)}
												</div>
											</div>
										</motion.div>
									))}
								</motion.div>
								<div className="flex justify-center gap-1 mt-4">
									{pastShows.map((_, index) => (
										<div key={index} className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
									))}
								</div>
								<p className="text-center text-zinc-400 text-xs mt-3">Swipe to see more shows</p>
							</div>

							<div className="hidden sm:block overflow-y-auto max-h-[60vh]">
								<div className="space-y-4">
									{pastShows.map((show) => (
										<div
											key={show.id}
											className="group rounded-xl bg-zinc-800/50 border border-zinc-700/30 p-4 transition-all duration-300 hover:bg-zinc-800/70 hover:border-zinc-600/50"
										>
											<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
												<div className="flex-1">
													<h3 className="font-semibold text-zinc-100 text-lg">{show.venue}</h3>
													<div className="flex items-center gap-2 text-zinc-300 text-sm mt-1">
														<MapPin className="h-4 w-4" />
														<span>
															{show.city}, {show.state}
														</span>
													</div>
													{show.description && <p className="text-zinc-400 text-sm mt-2">{show.description}</p>}
												</div>
												<div className="flex flex-col sm:items-end gap-1">
													<div className="text-amber-200 font-medium">{formatDate(show.date)}</div>
													{show.time && (
														<div className="flex items-center gap-1 text-zinc-400 text-sm">
															<Clock className="h-3 w-3" />
															<span>{show.time}</span>
														</div>
													)}
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>

						<div className="sticky bottom-0 bg-zinc-900/95 backdrop-blur-sm border-t border-zinc-700/50 px-6 py-4">
							<p className="text-center text-zinc-400 text-sm">Follow Noah's socials for updates on upcoming shows!</p>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
