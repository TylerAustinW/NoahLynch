import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar.component";
import LiveGallerySection from "@/components/features/live-gallery/live-gallery-section";

export const metadata: Metadata = {
  title: "Gallery - Noah Lynch",
  description:
    "View exclusive photos from Noah Lynch's live performances across various venues. Experience the energy and atmosphere of live shows through our photo gallery.",
  openGraph: {
    title: "Noah Lynch - Live Performance Gallery",
    description:
      "View exclusive photos from Noah Lynch's live performances across various venues. Experience the energy and atmosphere of live shows through our photo gallery.",
  },
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/overlays/grain-texture-overlay.png')] bg-repeat opacity-[0.02] pointer-events-none z-10" />
      <Navbar />
      <main className="pt-16">
        <LiveGallerySection />
      </main>
    </div>
  );
}
