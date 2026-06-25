import LiveGallerySection from "@/components/gallery/live-gallery";
import Navbar from "@/components/layout/navbar";
import type { Metadata } from "next";
import Image from "next/image";

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
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      <div className="pointer-events-none absolute inset-0 z-10 bg-[url('/overlays/grain-texture-overlay.png')] bg-repeat opacity-[0.02]" />
      <div className="absolute inset-0 z-0">
        <Image
          src="/venues/the-roof/2026/20260530-DSC03634.jpg"
          alt="Noah Lynch performing"
          fill
          className="object-cover opacity-10"
          sizes="100vw"
          priority
          quality={75}
        />
        <div className="absolute inset-0 bg-zinc-950/80" />
      </div>
      <div className="relative z-20">
        <Navbar />
        <main className="pt-16">
          <LiveGallerySection />
        </main>
      </div>
    </div>
  );
}
