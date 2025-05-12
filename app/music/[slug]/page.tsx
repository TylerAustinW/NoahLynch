import {
  allReleases,
  getReleaseById,
  Platform,
  ReleaseWithPlatforms,
} from '@/lib/musicData';
import { Heart, Quote, Star } from 'lucide-react';
import { Metadata } from 'next';
import { Patrick_Hand } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import MobileTabs from './mobile-tabs';

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

  const PlatformButtons = (
    <>
      <h2 className="mb-2 md:mb-4 text-base md:text-xl font-semibold text-center md:text-left">Listen Now:</h2>
      <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-center justify-center md:justify-start gap-2 md:gap-4">
        {release.platforms.map((platform: Platform) => (
          <Link
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 rounded-lg sm:rounded-full border border-zinc-700/50 bg-zinc-800/70 px-2 py-1.5 sm:px-4 sm:py-2 text-zinc-300 transition-all hover:bg-zinc-700/90 hover:text-white"
            aria-label={`Listen on ${platform.name}`}
          >
            <div className="text-amber-400/80">
              {platform.icon}
            </div>
            <span className="text-xs sm:text-sm font-medium hidden sm:inline">
              {platform.name}
            </span>
            <span className="text-[10px] sm:hidden">
              {platform.name.split(' ')[0]}
            </span>
          </Link>
        ))}
      </div>
    </>
  );

  const ListenNowLinks = (
    <div className="mt-4 md:mt-6 w-full border-t border-zinc-700/60 pt-4 md:pt-6">
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
        PlatformButtons
      ) : (
        <p className="text-center text-zinc-500">Details coming soon.</p>
      )}
    </div>
  );

  const SpecialThanksContent = (
    <div className={`space-y-4 text-zinc-200 leading-relaxed ${patrickHand.className} text-sm md:text-base font-extrabold`}>
      <p className="text-center italic">
        Bringing "Honest" to life has been one of the most meaningful creative experiences of my life, and I couldn't have done it without the support, talent, and heart of some truly incredible people.
      </p>
      <p>
        To Levi Ready, Isaac Moreno, Tyler Bridge, Jamie Wroten, Tyler Williams, Christopher Chittom, Evan Busbin, Hagen Brister, and Sherry Thibodeaux—thank you for your time, energy, and the unique ways each of you contributed to this song.
      </p>
      <p>
        And last but never least, to my amazing wife Hunter Lynch—your love, strength, and unwavering belief in me are the foundation of everything I do. Thank you for being my home, my muse, and my greatest encouragement.
      </p>
      <p className="mt-4 text-center">
        With all my gratitude,
        <br />
        - <strong>Noah Lynch <Heart className="h-4 w-4 text-red-400 inline-block ml-1 relative -top-px" /></strong>
      </p>
    </div>
  );
  
  const SpotlightReviewContent = (
    <div className="relative h-full">
      <div className="absolute -left-4 top-0 opacity-30">
        <Quote className="h-16 w-16 text-amber-500/40 rotate-180" fill="currentColor" />
      </div>
      
      <div className={`${patrickHand.className} text-base md:text-lg lg:text-xl tracking-wide leading-relaxed text-amber-100/90 z-10 relative`}>
        <p className="mb-3">"In all my life, I have never felt so deeply connected to a song. Yeah, I've had songs that I play constantly to bring a tear every now and then, but within seconds you made me fall apart and breakdown."</p>
        
        <p>Your voice, energy, and passion for "Honest" saved me from having a complete mental breakdown. You, Sir, are a true talent in music and will go incredibly far..."</p>
      </div>
      
      <div className="absolute -right-4 bottom-0 opacity-30">
        <Quote className="h-16 w-16 text-amber-500/40" fill="currentColor" />
      </div>
      
      <div className="mt-4 flex justify-end">
        <div className="flex flex-col items-end">
          <div className="flex mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className="h-3 w-3 md:h-4 md:w-4 text-amber-400" 
                fill="currentColor" 
              />
            ))}
          </div>
          <p className="text-amber-200 font-semibold text-sm">Josh Harding</p>
          <p className="text-zinc-400 text-xs">May 12, 2025</p>
        </div>
      </div>
    </div>
  );

  const BackToMusicLink = (
    <div className="mt-8 md:mt-12 text-center">
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

      <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
        <div className="relative z-10 px-3 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-5xl">
            {/* Main Content Area */}
            <div className="flex flex-col gap-6 md:flex-row md:gap-10 mb-12">
              {/* Album Cover - Left Side */}
              <div className="w-full flex-shrink-0 md:w-2/5 lg:w-1/3 flex flex-col items-center">
                <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-lg border border-zinc-800/60 shadow-xl">
                  <Image
                    src={release.imageURL}
                    alt={`${release.title} Cover Art`}
                    fill
                    priority
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 40vw, 350px"
                    className="object-cover"
                  />
                  <div
                    className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold ${typeBgColor} ${typeColor} border ${typeBorderColor} backdrop-blur-sm`}
                  >
                    {release.type.toUpperCase()}
                  </div>
                </div>
                
                {/* Mobile-only Listen Links */}
                <div className="md:hidden w-full mt-4">
                  {ListenNowLinks}
                </div>
              </div>

              {/* Song Details - Right Side */}
              <div className="flex w-full flex-col md:w-3/5 lg:w-2/3">
                <h1 className="mb-2 text-3xl font-bold md:text-4xl lg:text-5xl">
                  {release.title}
                </h1>
                <p className="mb-3 text-base text-zinc-400">
                  Single • {release.year}
                </p>
                <div className="mb-4 space-y-1 text-xs md:text-sm text-zinc-300">
                  <p>
                    <span className="text-zinc-500">Released by:</span>{' '}
                    {release.releasedBy}
                  </p>
                  <p>
                    <span className="text-zinc-500">Release date:</span>{' '}
                    {release.releaseDate}
                  </p>
                </div>
                <p className="mb-6 text-sm md:text-base leading-relaxed text-zinc-300">
                  {release.description}
                </p>
                
                {/* Desktop-only Listen Links */}
                <div className="hidden md:block">
                  {ListenNowLinks}
                </div>
              </div>
            </div>

            {/* Conditional sections for Honest song only */}
            {slug === 'honest' && (
              <>
                {/* Mobile Tabbed Interface */}
                <MobileTabs 
                  specialThanksContent={SpecialThanksContent}
                  spotlightReviewContent={SpotlightReviewContent}
                />
                
                {/* Desktop Two-Column Layout */}
                <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 mb-10">
                  {/* Special Thanks Section */}
                  <div className="p-6 border border-zinc-700/60 rounded-lg bg-black/30 shadow-lg backdrop-blur-sm h-full">
                    <h2 className="mb-6 text-2xl font-semibold text-amber-100 text-center">
                      Special Thanks
                    </h2>
                    {SpecialThanksContent}
                  </div>
                  
                  {/* Spotlight Review Section */}
                  <div className="p-6 border border-amber-900/30 rounded-lg bg-gradient-to-br from-amber-950/40 to-black/40 shadow-lg backdrop-blur-sm h-full">
                    <h2 className="mb-6 text-2xl font-semibold text-amber-100 text-center flex items-center justify-center">
                      <Star className="h-5 w-5 mr-2 text-amber-300" fill="currentColor" />
                      <span>Spotlight Review</span>
                      <Star className="h-5 w-5 ml-2 text-amber-300" fill="currentColor" />
                    </h2>
                    {SpotlightReviewContent}
                  </div>
                </div>
                
                {/* "This song is touching lives" banner */}
                <div className="mt-2 mb-8 text-center">
                  <span className="inline-block mx-auto bg-gradient-to-r from-amber-700/60 via-amber-300/80 to-amber-700/60 text-black font-semibold py-1.5 px-6 text-xs sm:text-sm rounded-full">
                    This song is touching lives ❤
                  </span>
                </div>
              </>
            )}

            {BackToMusicLink}
          </div>
        </div>
      </Suspense>
    </div>
  );
}
