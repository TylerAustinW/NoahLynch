import ScrollToTop from "@/components/layout/scroll-to-top";
import SocialSidebar from "@/components/layout/social-sidebar";
import { SITE } from "@/lib/config";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Dancing_Script, Inter, Patrick_Hand, Playfair_Display } from "next/font/google";
import React from "react";
import "./globals.css";

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
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

const siteUrl = SITE.url;
const defaultTitle = `${SITE.name} - Singer-Songwriter & Musician`;
const defaultOgImage = "/portraits/noah-lynch-portrait-guitar.jpeg";
const squareOgImage = "/portraits/noah-lynch-studio-session.jpeg";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#d97706",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: SITE.name,
  title: {
    default: defaultTitle,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    SITE.name,
    "musician",
    "singer-songwriter",
    "Mississippi musician",
    "blues",
    "neo-rock",
    "acoustic music",
    "indie artist",
    "Honest album",
    "Ready Records",
    "John Mayer inspired",
    "Stevie Ray Vaughan",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: "Ready Records",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: SITE.name,
    title: defaultTitle,
    description: SITE.description,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${SITE.name} - Mississippi-born Singer-Songwriter and Musician`,
        type: "image/jpeg",
      },
      {
        url: squareOgImage,
        width: 1080,
        height: 1080,
        alt: `${SITE.name} Music Studio Session`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@NoahLynch17",
    creator: "@NoahLynch17",
    title: defaultTitle,
    description: SITE.description,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${SITE.name} - Mississippi-born Singer-Songwriter and Musician`,
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
    author: SITE.name,
    "article:author": SITE.name,
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": SITE.name,
    "music:musician": SITE.name,
    "music:album": "Honest",
    "music:release_date": "2025-05-09",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        suppressHydrationWarning
        className={`${inter.className} ${dancingScript.variable} ${patrickHand.variable} ${playfairDisplay.variable}`}
      >
        <SocialSidebar />
        <ScrollToTop />
        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicGroup",
              name: SITE.name,
              url: siteUrl,
              genre: ["Acoustic Pop", "Singer-Songwriter"],
              description:
                "Mississippi-born singer-songwriter blending blues, neo-rock, and acoustic vibes.",
              sameAs: [
                "https://instagram.com/noahlynchmusic",
                "https://facebook.com/noahlynchmusic",
                "https://tiktok.com/@noahlynchmusic",
                "https://youtube.com/@noahlynch",
                "https://open.spotify.com/artist/4IKFKRnwaMGZQoExatIlHH",
                "https://music.apple.com/us/artist/noah-lynch/1744359568",
              ],
            }),
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
