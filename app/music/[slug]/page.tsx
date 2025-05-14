import {
  allReleases,
  getReleaseById,
  Platform,
  ReleaseWithPlatforms,
  Review,
} from '@/lib/musicData';
import { ArrowLeft, Heart, Quote, Star } from 'lucide-react';
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
      <div className="grid grid-cols-3 gap-2 md:gap-4 justify-center md:justify-start">
        {release.platforms.map((platform: Platform) => {
          const buttonStyle: React.CSSProperties = {};
          const iconStyle: React.CSSProperties = {};

          if (platform.bgColor) {
            buttonStyle.backgroundColor = platform.bgColor;
            iconStyle.color = platform.color || '#FFFFFF'; 
          } else if (platform.color) {
            iconStyle.color = platform.color;
          }

          return (
            <Link
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 rounded-lg border border-zinc-700/50 bg-zinc-800/70 px-2 py-1.5 sm:px-4 sm:py-2 text-zinc-300 transition-all hover:bg-zinc-700/90 hover:text-white group"
              style={platform.bgColor ? buttonStyle : {}}
              aria-label={`Listen on ${platform.name}`}
            >
              <div style={iconStyle} className="group-hover:opacity-80 transition-opacity">
                {platform.icon}
              </div>
              <span 
                className="text-xs sm:text-sm font-medium hidden sm:inline"
                style={platform.bgColor ? { color: platform.color || '#FFFFFF' } : {}}
              >
                {platform.name}
              </span>
              <span 
                className="text-[10px] sm:hidden"
                style={platform.bgColor ? { color: platform.color || '#FFFFFF' } : {}}
              >
                {platform.name.split(' ')[0]}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );

  const ListenNowLinks = (
    <div className="w-full border-t border-zinc-700/60 pt-4 md:pt-6">
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
    <div className={`${patrickHand.className} text-center md:text-lg lg:text-xl leading-relaxed text-amber-100/90`}>
      <p className="text-center font-medium">
        Bringing "Honest" to life has been one of the most meaningful creative experiences of my life, and I couldn't have done it without the support, talent, and heart of some truly incredible people.
        To Levi Ready, Isaac Moreno, <strong>Tyler Bridge</strong>, <strong>Jamie Wroten</strong>, <strong>Tyler Williams</strong>, <strong>Christopher Chittom</strong>, <strong>Evan Busbin</strong>, <strong>Hagen Brister</strong>, and <strong>Sherry Thibodeaux</strong>—thank you for your time, energy, and the unique ways each of you contributed to this song.
        <br />
        <br />
        And last but never least, to my amazing wife <strong>Hunter Lynch</strong> your love, strength, and unwavering belief in me are the foundation of everything I do. Thank you for being my home, my muse, and my greatest encouragement.
      </p>
      <p className="mt-4 text-center">
        With all my gratitude,
        <br />
        - <strong>Noah Lynch <Heart className="h-4 w-4 text-red-400 inline-block ml-1 relative -top-px" /></strong>
      </p>
    </div>
  );
  
  const spotlightReviewData: Review = {
    name: 'Josh Harding',
    content: `"In all my life, I have never felt so deeply connected to a song. Yeah, I've had songs that I play constantly to bring a tear every now and then, but within seconds you made me fall apart and breakdown."

    Your voice, energy, and passion for "Honest" saved me from having a complete mental breakdown. You, Sir, are a true talent in music and will go incredibly far..."`, 
    rating: 5,
  };

  const SpotlightReviewContent = (
    <div className="relative flex flex-col flex-grow">
      <div className="absolute -left-4 top-0 opacity-30">
        <Quote className="h-16 w-16 text-zinc-600/30 rotate-180" fill="currentColor" />
      </div>
      
      <div className={`${patrickHand.className} text-base md:text-lg lg:text-xl tracking-wide leading-relaxed text-amber-100/90 z-10 relative whitespace-pre-wrap`}>
        {spotlightReviewData.content}
      </div>
      
      <div className="absolute -right-4 bottom-0 opacity-30">
        <Quote className="h-16 w-16 text-amber-400/30" fill="currentColor" />
      </div>
      
      <div className="mt-auto pt-4 text-right">
        <p className="text-amber-200 font-semibold text-sm">{spotlightReviewData.name}</p>
        <div className="flex justify-end">
          {Array.from({ length: spotlightReviewData.rating }).map((_, i) => (
            <Star 
              key={i} 
              className="h-3 w-3 md:h-4 md:w-4 text-amber-400" 
              fill="currentColor" 
            />
          ))}
        </div>
      </div>
    </div>
  );

  const BackToMusicLink = (
    <div className="mb-6 md:mb-8 text-center">
      <Link
        href="/#music"
        className="text-sm text-zinc-400 transition-colors hover:text-amber-200 duration-300"
      >
         <ArrowLeft className="h-4 w-4 inline-block mr-1 relative -top-px" /> Back to All Music
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
            {/* === Restructured Top Section === */}
            <div className="flex flex-col items-center md:flex-row md:items-start md:gap-10 mb-12">
              {/* Album Cover - Centered on mobile, left on desktop */}
              <div className="w-full max-w-sm md:w-2/5 lg:w-1/3 flex-shrink-0 mb-6 md:mb-0">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-zinc-800/60 shadow-xl">
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
              </div>

              {/* Song Details - Centered text on mobile, left on desktop */}
              <div className="flex w-full flex-col text-center md:text-left md:w-3/5 lg:w-2/3">
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
                <div className="prose prose-sm prose-invert max-w-none text-zinc-300 leading-relaxed mb-6">
                  {release.description}
                </div>
              </div>
            </div>

            {/* === Moved Listen Now Section === */}
            {/* Render ListenNowLinks only if not upcoming OR if upcoming and link exists, avoid redundant checks inside */}
            {(!isUpcoming || (isUpcoming && release.linkURL) || (release.platforms && release.platforms.length > 0)) && (
              <div className="my-8 md:my-12 px-4 md:px-0">
                {BackToMusicLink}
                <div className="mt-4">
                  {ListenNowLinks}
                </div>
              </div>
            )}

            {/* === Conditional sections for Honest song only === */}
            {slug === 'honest' && (
              <>
                {/* Mobile Tabbed Interface */}
                <MobileTabs specialThanksContent={SpecialThanksContent} spotlightReviewContent={SpotlightReviewContent} />
                
                {/* Desktop Two-Column Layout - Added lg:items-start */}
                <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 mb-10 lg:items-start">
                  {/* Special Thanks Section */}
                  <div className="p-6 border border-zinc-700/60 rounded-lg bg-black/30 shadow-lg backdrop-blur-sm flex flex-col">
                    <h2 className="mb-6 text-2xl font-semibold text-amber-100 text-center">
                      Special Thanks
                    </h2>
                    {SpecialThanksContent}
                  </div>
                  
                  {/* Spotlight Review Section */}
                  <div className="p-6 border border-zinc-700/60 rounded-lg bg-black/30 shadow-lg backdrop-blur-sm flex flex-col">
                    <h2 className="mb-6 text-2xl font-semibold text-amber-100 text-center flex items-center justify-center">
                      <Star className="h-5 w-5 mr-2 text-amber-300" fill="currentColor" />
                      <span>Spotlight Review</span>
                      <Star className="h-5 w-5 ml-2 text-amber-300" fill="currentColor" />
                    </h2>
                    {SpotlightReviewContent}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Suspense>
    </div>
  );
}
