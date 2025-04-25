import { Facebook, Instagram, Music, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-16 px-6 md:px-12 bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <h3 className="text-amber-400 font-bold text-xl mb-4">
              NOAH LYNCH
            </h3>
            <p className="text-gray-400 mb-4">
              Mississippi-born musician crafting melodies that resonate with the
              soul.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                aria-label="Instagram"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                aria-label="Twitter"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                aria-label="YouTube"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                aria-label="Facebook"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                aria-label="Spotify"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Music className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#biography"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#music"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  Music
                </Link>
              </li>
              <li>
                <Link
                  href="#tour"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  Tour
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Music</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  Spotify
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  Apple Music
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  YouTube Music
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  SoundCloud
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  Bandcamp
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Noah Lynch. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
