"use client";

import { Heart, MessageCircle, Star } from "lucide-react";
import React, { useState } from "react";

interface MobileTabsProps {
	specialThanksContent: React.ReactNode;
	spotlightReviewContent: React.ReactNode;
}

export default function MobileTabs({ specialThanksContent, spotlightReviewContent }: MobileTabsProps) {
	const [activeTab, setActiveTab] = useState("thanks");

	return (
		<div className="lg:hidden mb-12">
			<div className="flex border-b border-zinc-700/50">
				<button
					className={`w-1/2 py-4 px-4 text-center focus:outline-none relative group transition-all duration-300 ${
						activeTab === "thanks"
							? "text-amber-300 border-b-2 border-amber-500 bg-zinc-900/20"
							: "text-zinc-400 border-b-2 border-transparent hover:text-zinc-300 hover:bg-zinc-900/10"
					}`}
					onClick={() => setActiveTab("thanks")}
				>
					<div className="flex items-center justify-center gap-2">
						<Heart className="h-4 w-4" />
						<span className="font-medium">Special Thanks</span>
					</div>
				</button>
				<button
					className={`w-1/2 py-4 px-4 text-center focus:outline-none relative group transition-all duration-300 ${
						activeTab === "review"
							? "text-amber-300 border-b-2 border-amber-500 bg-zinc-900/20"
							: "text-zinc-400 border-b-2 border-transparent hover:text-zinc-300 hover:bg-zinc-900/10"
					}`}
					onClick={() => setActiveTab("review")}
				>
					<div className="flex items-center justify-center gap-2">
						<MessageCircle className="h-4 w-4" />
						<span className="font-medium">Spotlight Review</span>
					</div>
				</button>
			</div>

			<div className="mt-6">
				<div
					className={`rounded-2xl border border-zinc-700/50 bg-zinc-900/30 backdrop-blur-sm p-6 transition-all duration-300 ${
						activeTab !== "thanks" ? "hidden" : ""
					}`}
				>
					<h3 className="mb-6 text-2xl font-bold text-amber-200 text-center">Special Thanks</h3>
					<div>{specialThanksContent}</div>
				</div>

				<div
					className={`rounded-2xl border border-zinc-700/50 bg-zinc-900/30 backdrop-blur-sm p-6 transition-all duration-300 ${
						activeTab !== "review" ? "hidden" : ""
					}`}
				>
					<h3 className="mb-6 text-2xl font-bold text-amber-200 text-center flex items-center justify-center">
						<Star className="h-5 w-5 mr-2 text-amber-400" fill="currentColor" />
						<span>Spotlight Review</span>
						<Star className="h-5 w-5 ml-2 text-amber-400" fill="currentColor" />
					</h3>
					<div>{spotlightReviewContent}</div>
				</div>
			</div>
		</div>
	);
}
