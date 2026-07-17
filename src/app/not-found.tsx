import { Button } from "@/components/ui/button";
import { Calendar, FileText, Home, Music } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-8">
          <Music className="mx-auto mb-4 h-24 w-24 text-amber-400" />
          <div className="mb-2 text-6xl font-bold text-amber-400">404</div>
          <h1 className="mb-4 text-3xl font-bold text-white">Wrong Note</h1>
          <p className="mb-8 text-lg text-zinc-400">
            Looks like you hit a wrong note! This page doesn&apos;t exist.
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button asChild variant="primary" size="default">
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </Button>

            <Button asChild variant="secondary" size="default">
              <Link href="/#music" className="flex items-center gap-2">
                <Music className="h-4 w-4" />
                Music
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button asChild variant="outline" size="default">
              <Link href="/tour-dates" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Tour Dates
              </Link>
            </Button>

            <Button asChild variant="outline" size="default">
              <Link href="/epk" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                EPK
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-800 pt-8">
          <blockquote className="text-sm text-zinc-500 italic">
            "Sometimes you have to play a wrong note to appreciate the right one."
          </blockquote>
          <cite className="mt-2 block text-xs text-zinc-600">- Noah Lynch</cite>
        </div>
      </div>
    </div>
  );
}
