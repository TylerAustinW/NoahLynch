import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/navbar.component";
import CheckInForm from "@/components/features/checkin/checkin-form.component";
import CheckInGallery from "@/components/features/checkin/checkin-gallery.component";
import { FEATURE_FLAGS, ROUTES } from "@/lib/config/constants";

export const metadata: Metadata = {
    title: "Check In - Noah Lynch",
    description: "Let Noah know you're here and share your experience from tonight's show!",
    openGraph: {
        title: "Check In - Noah Lynch",
        description: "Let Noah know you're here and share your experience from tonight's show!",
    },
};

export default function CheckInPage() {
    if (!FEATURE_FLAGS.CHECKIN_ENABLED) {
        redirect(ROUTES.HOME);
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <Navbar />
            <main className="pt-20">
                <section className="py-16 px-4">
                    <div className="container mx-auto max-w-4xl text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">Share Your Experience</h1>
                        <p className="text-xl text-zinc-400 mb-0">
                            Let Noah know you're here and share a photo from tonight's performance
                            <br />
                            <br />
                            <strong className="font-bold text-white">
                                By submitting this form you grant us permission to share your photo on our social media platforms
                            </strong>
                        </p>
                    </div>
                </section>

                <section className="py-16 px-4 bg-zinc-900/50">
                    <div className="container mx-auto max-w-2xl">
                        <Suspense
                            fallback={
                                <div className="bg-zinc-800/50 rounded-lg p-8 backdrop-blur-sm text-center">
                                    <div className="animate-spin w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                                    <p className="text-zinc-400">Loading check-in form...</p>
                                </div>
                            }
                        >
                            <CheckInForm />
                        </Suspense>
                    </div>
                </section>

                <section className="py-16 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Recent Check-ins</h2>
                        <CheckInGallery />
                    </div>
                </section>
            </main>
        </div>
    );
}
