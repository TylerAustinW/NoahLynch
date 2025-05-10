import {
  allReleases,
  getReleaseById,
  Platform,
  ReleaseWithPlatforms,
} from '@/lib/musicData';
import { Heart } from 'lucide-react';
import { Metadata } from 'next';
import { Patrick_Hand } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const patrickHand = Patrick_Hand({
  weight: ['400'],
  subsets: ['latin'],
});
interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateStaticParams() {
  return allReleases.map((release: ReleaseWithPlatforms) => ({
    slug: release.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const release = getReleaseById(slug);

  if (!release) {
    return {
      title: 'Release Not Found',
    };
  }

  return {
    title: `${release.title} | Noah Lynch Music`,
    description: release.description,
    openGraph: {
      title: release.title,
      description: release.description,
      images: [
        {
          url: release.imageURL,
          width: 800,
          height: 800,
          alt: `${release.title} Cover Art`,
        },
      ],
    },
  };
}

export default async function MusicReleasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const release = getReleaseById(slug);

  if (!release) {
    notFound();
  }

  const isUpcoming = release.type === 'upcoming';
  const typeColor = isUpcoming ? 'text-amber-400' : 'text-cyan-400';
  const typeBgColor = isUpcoming ? 'bg-amber-900/50' : 'bg-cyan-900/50';
  const typeBorderColor = isUpcoming
    ? 'border-amber-700/50'
    : 'border-cyan-700/50';

  const ListenNowLinks = (
    <div className="mt-6 w-full border-t border-zinc-700/60 pt-6">
      {isUpcoming && release.linkURL ? (
        <Link
          href={release.linkURL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-full bg-amber-600 px-6 py-3 text-center font-bold text-black transition-all duration-300 hover:bg-amber-500"
        >
          {release.linkText || 'Coming Soon'}
        </Link>
      ) : release.platforms && release.platforms.length > 0 ? (
        <>
          <h2 className="mb-4 text-xl font-semibold text-center md:text-left">Listen Now:</h2>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            {release.platforms.map((platform: Platform) => (
              <Link
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-zinc-700/50 bg-zinc-800/70 px-4 py-2 text-zinc-300 transition-all hover:bg-zinc-700/90 hover:text-white"
                aria-label={`Listen on ${platform.name}`}
              >
                {platform.icon}
                <span className="text-sm font-medium">
                  {platform.name}
                </span>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-zinc-500">Details coming soon.</p>
      )}
    </div>
  );

  const BackToMusicLink = (
    <div className="mt-12 text-center">
      <Link
        href="/#music"
        className="text-sm text-zinc-400 transition-colors hover:text-amber-200"
      >
        &larr; Back to All Music
      </Link>
    </div>
  );

  return (
    <div className="relative min-h-screen text-white">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={release.imageURL}
          alt={`${release.title} Background`}
          fill
          priority
          sizes="100vw"
          className="object-cover blur-md brightness-50"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            <div className="w-full flex-shrink-0 md:w-1/2 flex flex-col items-center">
              <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg border border-zinc-800/60 shadow-xl">
                <Image
                  src={release.imageURL}
                  alt={`${release.title} Cover Art`}
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 400px"
                  className="object-cover"
                />
                <div
                  className={`absolute top-3 right-3 rounded-full px-3 py-1 text-sm font-semibold ${typeBgColor} ${typeColor} border ${typeBorderColor} backdrop-blur-sm`}
                >
                  {release.type.toUpperCase()}
                </div>
              </div>
              {ListenNowLinks}
            </div>

            <div className="flex w-full flex-col md:w-1/2">
              <h1 className="mb-2 text-4xl font-bold md:text-5xl">
                {release.title}
              </h1>
              <p className="mb-4 text-lg text-zinc-400">
                Single • {release.year}
              </p>
              <div className="mb-6 space-y-1 text-sm text-zinc-300">
                <p>
                  <span className="text-zinc-500">Released by:</span>{' '}
                  {release.releasedBy}
                </p>
                <p>
                  <span className="text-zinc-500">Release date:</span>{' '}
                  {release.releaseDate}
                </p>
              </div>
              <p className="mb-8 leading-relaxed text-zinc-300">
                {release.description}
              </p>
            </div>
          </div>

          {slug === 'honest' && (
            <div className="my-8 p-6 border border-zinc-700/60 rounded-lg bg-black/30 shadow-lg backdrop-blur-sm">
              <h2 className="mb-6 text-3xl font-semibold text-amber-100 text-center">
                Special Thanks
              </h2>
              <div className={`space-y-6 text-zinc-200 leading-relaxed ${patrickHand.className} text-base md:text-lg font-bold`}>
                <p className="text-center italic">
                  Bringing "Honest" to life has been one of the most meaningful creative experiences of my life, and I couldn't have done it without the support, talent, and heart of some truly incredible people.
                </p>
                <p>
                  To  Levi Ready, Isaac Moreno, Tyler Bridge, Jamie Wroten, Tyler Williams, Christopher Chittom, Evan Busbin, Hagen Brister, and Sherry Thibodeaux—thank you for your time, energy, and the unique ways each of you contributed to this song. Your support has meant more than words can say.
                </p>
                <p>
                  And last but never least, to my amazing wife Hunter Lynch—your love, strength, and unwavering belief in me are the foundation of everything I do. Thank you for being my home, my muse, and my greatest encouragement.
                </p>
                <p className="mt-8 text-center">
                  With all my gratitude,  
                  <br />
                  - <strong>Noah Lynch <Heart className="h-5 w-5 text-red-400 inline-block ml-1 relative -top-px" /></strong>
                </p>
              </div>
            </div>  
          )}

          {BackToMusicLink}
        </div>
      </div>
    </div>
  );
}
