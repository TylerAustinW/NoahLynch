"use client";

import { CopyrightIcon } from "lucide-react";
import { useState } from "react";

export default function Footer() {
    const [isHovered, setIsHovered] = useState(false);

    const instagramDM = () => {
        const Instagram = "116699279727021";
        window.location.href = `https://www.instagram.com/direct/t/${Instagram}/`;
    };
    return (
        <footer className="relative z-30 border-t border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4 md:py-6">
                <div className="flex items-center justify-center">
                    <button
                        onClick={instagramDM}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="group relative flex items-center gap-2 text-sm text-zinc-400 transition-all duration-300 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:ring-offset-2 focus:ring-offset-zinc-950 rounded-lg px-3 py-2"
                        aria-label="Contact website creator via email"
                    >
                        <CopyrightIcon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                        <span className="font-medium">
                            Created by <span className="text-amber-400/80 group-hover:text-amber-300 ">Tyler Williams </span>
                        </span>
                        <div
                            className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-zinc-800/95 text-white text-xs rounded-lg border border-amber-400/30 backdrop-blur-sm shadow-xl transition-all duration-200 ${
                                isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"
                            }`}
                        >
                            Contact creator
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-zinc-800/95" />
                        </div>
                    </button>
                </div>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[url('/overlays/grain-texture-overlay.png')] bg-repeat opacity-[0.02]" />
        </footer>
    );
}
