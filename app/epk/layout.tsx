import type { Metadata } from "next";
import React from "react";
import "./epk.styles.css";

export const metadata: Metadata = {
  title: "EPK",
  description:
    "EPK for Noah Lynch - Mississippi singer-songwriter blending acoustic soul, soft rock, and alt-pop",
  keywords:
    "Noah Lynch, EPK, Electronic Press Kit, singer-songwriter, acoustic soul, Mississippi music, booking",
  robots: "index, follow",
  alternates: {
    canonical: "/epk",
  },
  openGraph: {
    title: "EPK",
    description: "Noah Lynch - Mississippi singer-songwriter",
    url: "https://www.noahlynch.com/epk",
    siteName: "Noah Lynch",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EPK",
    description: "Noah Lynch - Mississippi singer-songwriter",
  },
};

export default function EPKLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-white text-gray-900 print:bg-white">{children}</div>;
}
