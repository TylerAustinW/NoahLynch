"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Instagram, Twitter, Youtube, Facebook } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-4",
        scrolled ? "bg-black/90 backdrop-blur-sm" : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-amber-400 font-bold text-2xl">
          NOAH LYNCH
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#contact" className="text-sm tracking-wider hover:text-amber-400 transition-colors">
            CONTACT
          </Link>
          <Link href="#music" className="text-sm tracking-wider hover:text-amber-400 transition-colors">
            MUSIC
          </Link>
          <Link href="#tour" className="text-sm tracking-wider hover:text-amber-400 transition-colors">
            LIVE
          </Link>
          <Link href="#biography" className="text-sm tracking-wider hover:text-amber-400 transition-colors">
            ABOUT
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
            <Instagram className="h-4 w-4 text-white hover:text-amber-400 transition-colors" />
          </Link>
          <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
            <Facebook className="h-4 w-4 text-white hover:text-amber-400 transition-colors" />
          </Link>
          <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
            <Twitter className="h-4 w-4 text-white hover:text-amber-400 transition-colors" />
          </Link>
          <Link href="https://youtube.com" target="_blank" aria-label="YouTube">
            <Youtube className="h-4 w-4 text-white hover:text-amber-400 transition-colors" />
          </Link>
        </div>
      </div>
    </header>
  )
}
