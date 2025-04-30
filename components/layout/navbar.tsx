"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `/#${id}`);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-4",
        scrolled ? "bg-black/50 backdrop-blur-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-white font-bold text-2xl tracking-wider">
            NOAH LYNCH
          </h1>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#biography"
            className="text-sm tracking-wider text-zinc-400 hover:text-white transition-colors relative after:absolute after:w-0 after:h-[1px] after:bg-white/40 after:bottom-[-4px] after:left-0 hover:after:w-full after:transition-all after:duration-300"
            onClick={(e) => handleNavClick(e, "biography")}
          >
            ABOUT
          </Link>
          <Link
            href="#music"
            className="text-sm tracking-wider text-zinc-400 hover:text-white transition-colors relative after:absolute after:w-0 after:h-[1px] after:bg-white/40 after:bottom-[-4px] after:left-0 hover:after:w-full after:transition-all after:duration-300"
            onClick={(e) => handleNavClick(e, "music")}
          >
            MUSIC
          </Link>
          <Link
            href="#tour"
            className="text-sm tracking-wider text-zinc-400 hover:text-white transition-colors relative after:absolute after:w-0 after:h-[1px] after:bg-white/40 after:bottom-[-4px] after:left-0 hover:after:w-full after:transition-all after:duration-300"
            onClick={(e) => handleNavClick(e, "tour")}
          >
            TOUR
          </Link>
          <Link
            href="/merch"
            className="text-sm tracking-wider text-zinc-400 hover:text-white transition-colors relative after:absolute after:w-0 after:h-[1px] after:bg-white/40 after:bottom-[-4px] after:left-0 hover:after:w-full after:transition-all after:duration-300"
          >
            MERCH
          </Link>
        </nav>
      </div>
    </header>
  );
}
