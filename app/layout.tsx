import type { Metadata } from "next";
import { Dancing_Script, Inter, Patrick_Hand } from "next/font/google";
import "./globals.css";
import SocialSidebar from "@/components/layout/social-sidebar.component";
import ScrollToTop from "@/components/layout/scroll-to-top.component";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import React from "react";

const inter = Inter({ subsets: ["latin"] });
const dancingScript = Dancing_Script({
	subsets: ["latin"],
	variable: "--font-dancing-script",
});
const patrickHand = Patrick_Hand({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-patrick-hand",
	display: "swap",
});

const siteUrl = "https://www.noahlynch.com";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: "Noah Lynch - Singer-Songwriter & Musician",
		template: `%s | Noah Lynch`,
	},
	description:
		"Discover Noah Lynch, a Mississippi-born singer-songwriter and musician blending blues, neo-rock, and acoustic vibes. Explore his music, upcoming shows, and studio sessions.",
	keywords: [
		"Noah Lynch",
		"musician",
		"singer-songwriter",
		"Mississippi musician",
		"blues",
		"neo-rock",
		"acoustic music",
		"indie artist",
		"studio sessions",
		"Honest album",
		"Ready Records",
		"John Mayer inspired",
		"Stevie Ray Vaughan",
	],
	authors: [{ name: "Noah Lynch" }],
	creator: "Noah Lynch",
	publisher: "Ready Records",

	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteUrl,
		siteName: "Noah Lynch",
		title: "Noah Lynch - Singer-Songwriter & Musician",
		description:
			"Discover Noah Lynch, a Mississippi-born singer-songwriter and musician blending blues, neo-rock, and acoustic vibes. Explore his music, upcoming shows, and studio sessions.",
		images: [
			{
				url: "/portraits/noah-lynch-portrait-guitar.jpeg",
				width: 1200,
				height: 630,
				alt: "Noah Lynch - Mississippi-born Singer-Songwriter and Musician",
				type: "image/jpeg",
			},
			{
				url: "/portraits/noah-lynch-studio-session.jpeg",
				width: 1080,
				height: 1080,
				alt: "Noah Lynch Music Studio Session",
				type: "image/jpeg",
			},
		],
	},

	twitter: {
		card: "summary_large_image",
		site: "@NoahLynch17",
		creator: "@NoahLynch17",
		title: "Noah Lynch - Singer-Songwriter & Musician",
		description:
			"Discover Noah Lynch, a Mississippi-born singer-songwriter and musician blending blues, neo-rock, and acoustic vibes. Explore his music, upcoming shows, and studio sessions.",
		images: [
			{
				url: "/portraits/noah-lynch-portrait-guitar.jpeg",
				width: 1200,
				height: 630,
				alt: "Noah Lynch - Mississippi-born Singer-Songwriter and Musician",
			},
		],
	},

	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},

	other: {
		author: "Noah Lynch",
		"article:author": "Noah Lynch",
		"mobile-web-app-capable": "yes",
		"apple-mobile-web-app-status-bar-style": "black-translucent",
		"apple-mobile-web-app-title": "Noah Lynch",
		"music:musician": "Noah Lynch",
		"music:album": "Honest",
		"music:release_date": "2025-05-09",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />

				<meta name="format-detection" content="telephone=no" />
				<meta name="theme-color" content="#d97706" />
				<link rel="canonical" href={siteUrl} />
				<title></title>
			</head>
			<body className={`${inter.className} ${dancingScript.variable} ${patrickHand.variable}`}>
				<SocialSidebar />
				<ScrollToTop />
				{children}

				<script type="application/ld+json" />
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
