"use client";

import { useReducedMotion } from "@/lib/hooks/use-reduced-motion.hook";
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
    <div className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
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
                  className={`absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent ${social.arrowBorderColor}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
