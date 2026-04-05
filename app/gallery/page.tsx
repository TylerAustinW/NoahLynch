import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import LiveGallerySection from "@/components/gallery/live-gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "View exclusive photos from Noah Lynch's live performances across various venues. Experience the energy and atmosphere of live shows through our photo gallery.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Live Performance Gallery",
    description:
      "View exclusive photos from Noah Lynch's live performances across various venues. Experience the energy and atmosphere of live shows through our photo gallery.",
  },
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <main className="pt-16">
        <LiveGallerySection />
      </main>
    </div>
  );
}
