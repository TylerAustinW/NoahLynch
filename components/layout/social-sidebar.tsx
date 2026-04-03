"use client";

import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { SOCIAL_LINK_DATA } from "@/lib/config/constants";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import type { IconType } from "react-icons";

const platformIcons: Record<string, IconType> = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  tiktok: FaTiktok,
  youtube: FaYoutube,
};

export default function SocialSidebar() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="fixed top-1/2 left-6 z-40 hidden -translate-y-1/2 lg:block">
      <div className="flex flex-col gap-4">
        {SOCIAL_LINK_DATA.map((social) => {
          const Icon = platformIcons[social.platform] || FaInstagram;
          return (
            <div key={social.platform} className="group relative">
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700/40 bg-zinc-900/30 text-zinc-400 backdrop-blur-sm transition-all duration-300 ${social.hoverColors} focus:ring-2 focus:outline-none ${social.focusColors} focus:ring-offset-2 focus:ring-offset-zinc-950`}
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
                className={`absolute top-1/2 left-14 -translate-y-1/2 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap ${social.handleColors} shadow-lg transition-all duration-300 ${
                  prefersReducedMotion
                    ? "opacity-0 group-hover:opacity-100"
                    : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                } pointer-events-none`}
                aria-hidden="true"
              >
                {social.handle}
                <div
                  className={`absolute top-1/2 right-full -translate-y-1/2 border-4 border-transparent ${social.arrowBorderColor}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
