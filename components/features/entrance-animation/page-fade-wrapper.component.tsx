"use client";

import { motion } from "framer-motion";
import { type ReactNode, useState, useEffect } from "react";

interface PageFadeWrapperProps {
	children: ReactNode;
	delay?: number;
}

export default function PageFadeWrapper({ children, delay = 2.2 }: PageFadeWrapperProps) {
	const [shouldAnimate, setShouldAnimate] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShouldAnimate(true);
		}, delay * 1000);

		return () => clearTimeout(timer);
	}, [delay]);

	if (!shouldAnimate) {
		return <div style={{ opacity: 0 }}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				duration: 1,
				ease: "easeInOut",
			}}
		>
			{children}
		</motion.div>
	);
}
