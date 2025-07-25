import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, FileText, Home, Music } from 'lucide-react';

export const metadata = {
  title: 'Wrong Note - Noah Lynch',
  description: "Looks like you hit a wrong note! This page doesn't exist.",
  robots: 'noindex, nofollow',
};

/**
 * Custom 404 page with music theme
 * @returns {React.ReactElement} Wrong note page component
 */
export default function WrongNotePage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Musical note icon */}
        <div className="mb-8">
          <Music className="h-24 w-24 text-amber-400 mx-auto mb-4" />
          <div className="text-6xl font-bold text-amber-400 mb-2">404</div>
          <h1 className="text-3xl font-bold text-white mb-4">Wrong Note</h1>
          <p className="text-zinc-400 text-lg mb-8">Looks like you hit a wrong note! This page doesn't exist.</p>
        </div>

        {/* Navigation options */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button asChild variant="primary" size="default">
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </Button>

            <Button asChild variant="secondary" size="default">
              <Link href="/music" className="flex items-center gap-2">
                <Music className="h-4 w-4" />
                Music
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

        {/* Musical quote */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <blockquote className="text-zinc-500 italic text-sm">"Sometimes you have to play a wrong note to appreciate the right one."</blockquote>
          <cite className="text-zinc-600 text-xs mt-2 block">- Noah Lynch</cite>
        </div>
      </div>
    </div>
  );
}
