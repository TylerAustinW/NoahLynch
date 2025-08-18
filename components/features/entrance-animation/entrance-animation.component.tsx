"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function EntranceAnimation() {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
		}, 2500);

		return () => clearTimeout(timer);
	}, []);

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-zinc-950"
					initial={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.8, ease: "easeInOut" }}
				>
					{/* Grain texture background */}
					<div className="absolute inset-0 bg-[url('/overlays/grain-texture-overlay.png')] bg-repeat opacity-5" />

					{/* Text content */}
					<div className="relative text-center z-10">
						{/* Noah Lynch in cursive */}
						<motion.h1
							className="text-white text-7xl md:text-8xl lg:text-9xl font-light tracking-wide drop-shadow-2xl"
							style={{ fontFamily: "var(--font-dancing-script)" }}
							initial={{ scale: 2, opacity: 0 }}
							animate={{
								scale: 1,
								opacity: 1,
							}}
							transition={{
								duration: 1.5,
								ease: [0.25, 0.1, 0.25, 1],
							}}
						>
							Noah Lynch
						</motion.h1>

						{/* MUSIC text below */}
						<motion.div
							className="mt-4"
							initial={{ scale: 2, opacity: 0, y: 20 }}
							animate={{
								scale: 1,
								opacity: 1,
								y: 0,
							}}
							transition={{
								duration: 1.5,
								delay: 0.3,
								ease: [0.25, 0.1, 0.25, 1],
							}}
						>
							<span className="text-amber-600 text-2xl md:text-3xl font-bold tracking-[0.3em] uppercase drop-shadow-xl">
								Music
							</span>
						</motion.div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
