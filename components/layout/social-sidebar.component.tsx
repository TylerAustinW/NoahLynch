"use client";

import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";

const socialLinks = [
    {
        href: "https://instagram.com/noahlynchmusic",
        label: "Follow Noah Lynch on Instagram",
        handle: "@noahlynchmusic",
        icon: FaInstagram,
        hoverColors: "hover:border-pink-500/50 hover:bg-pink-500/10 hover:text-pink-400",
        focusColors: "focus:ring-pink-500/50",
        handleColors: "bg-pink-500/90 text-white",
    },
    {
        href: "https://facebook.com/noahlynchmusic",
        label: "Follow Noah Lynch on Facebook",
        handle: "noahlynchmusic",
        icon: FaFacebookF,
        hoverColors: "hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400",
        focusColors: "focus:ring-blue-500/50",
        handleColors: "bg-blue-500/90 text-white",
    },
    {
        href: "https://tiktok.com/@noahlynchmusic",
        label: "Follow Noah Lynch on TikTok",
        handle: "@noahlynchmusic",
        icon: FaTiktok,
        hoverColors: "hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400",
        focusColors: "focus:ring-red-500/50",
        handleColors: "bg-red-500/90 text-white",
    },
    {
        href: "https://youtube.com/@noahlynch",
        label: "Subscribe to Noah Lynch on YouTube",
        handle: "@noahlynch",
        icon: FaYoutube,
        hoverColors: "hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400",
        focusColors: "focus:ring-red-500/50",
        handleColors: "bg-red-500/90 text-white",
    },
];

export default function SocialSidebar() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return (
        <div className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
            <div className="flex flex-col gap-4">
                {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                        <div key={index} className="group relative">
                            <a
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className={`flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700/40 bg-zinc-900/30 text-zinc-400 backdrop-blur-sm transition-all duration-300 ${social.hoverColors} focus:outline-none focus:ring-2 ${social.focusColors} focus:ring-offset-2 focus:ring-offset-zinc-950`}
                                style={{
                                    transform: prefersReducedMotion ? "none" : undefined,
                                    transition: prefersReducedMotion
                                        ? "color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease"
                                        : undefined,
                                }}
                            >
                                <Icon className="h-5 w-5" aria-hidden="true" />
                            </a>

                            <div
                                className={`absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ${social.handleColors} shadow-lg transition-all duration-300 ${
                                    prefersReducedMotion
                                        ? "opacity-0 group-hover:opacity-100"
                                        : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                                } pointer-events-none`}
                                aria-hidden="true"
                            >
                                {social.handle}
                                <div
                                    className={`absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent ${social.handleColors.includes("pink") ? "border-r-pink-500/90" : social.handleColors.includes("blue") ? "border-r-blue-500/90" : "border-r-red-500/90"}`}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
