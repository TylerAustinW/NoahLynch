"use client";

import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/config/constants";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";

export default function SocialLinks() {
    return (
        <div className="pt-1 lg:hidden">
            <div className="flex gap-4 justify-center sm:justify-start">
                <Link
                    href={SOCIAL_LINKS.INSTAGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Noah Lynch on Instagram"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-all duration-300 hover:text-pink-400 hover:bg-pink-500/10 focus:outline-none focus:ring-1 focus:ring-pink-400/40"
                >
                    <FaInstagram className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                    href={SOCIAL_LINKS.FACEBOOK}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Noah Lynch on Facebook"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-all duration-300 hover:text-blue-400 hover:bg-blue-500/10 focus:outline-none focus:ring-1 focus:ring-blue-400/40"
                >
                    <FaFacebookF className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                    href={SOCIAL_LINKS.TIKTOK}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Noah Lynch on TikTok"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-all duration-300 hover:text-red-400 hover:bg-red-500/10 focus:outline-none focus:ring-1 focus:ring-red-400/40"
                >
                    <FaTiktok className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                    href={SOCIAL_LINKS.YOUTUBE}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Subscribe to Noah Lynch on YouTube"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-all duration-300 hover:text-red-400 hover:bg-red-500/10 focus:outline-none focus:ring-1 focus:ring-red-400/40"
                >
                    <FaYoutube className="h-5 w-5" aria-hidden="true" />
                </Link>
            </div>
        </div>
    );
}
