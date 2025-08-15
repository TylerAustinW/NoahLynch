import { allReleases, getReleaseById, type Platform, type ReleaseWithPlatforms, type Review, } from '@/lib/data/music';
import { ArrowLeft, Heart, Quote, Star } from 'lucide-react';
import type { Metadata } from 'next';
import { Patrick_Hand } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import MobileTabs from './mobile-tabs';
import Navbar from '@/components/layout/navbar';
import SocialSidebar from '@/components/layout/social-sidebar';
import ErrorBoundary from '@/components/ui/error-boundary';
import { Button } from '@/components/ui/button';

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const release = getReleaseById(slug);

  if (!release) {
    return {
      title: 'Release Not Found',
    };
  }

  const siteUrl = 'https://www.noahlynch.com';
  const absoluteImageUrl = release.imageURL.startsWith('http')
    ? release.imageURL
    : `${siteUrl}${release.imageURL}`;

  return {
    title: `${release.title} | Noah Lynch Music`,
    description: release.description,
    openGraph: {
      type: 'music.album',
      title: `${release.title} - Noah Lynch`,
      description: release.description,
      url: `${siteUrl}/music/${slug}`,
      siteName: 'Noah Lynch Music',
      images: [
        {
          url: absoluteImageUrl,
          width: 800,
          height: 800,
          alt: `${release.title} Cover Art`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${release.title} - Noah Lynch`,
      description: release.description,
      images: [absoluteImageUrl],
    },
  };
}

export default async function MusicReleasePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const release = getReleaseById(slug);

  if (!release) {
    notFound();
  }

  const isUpcoming = release.type === 'upcoming';
  const typeColor = isUpcoming ? 'text-amber-400' : 'text-cyan-400';
  const typeBgColor = isUpcoming ? 'bg-amber-900/50' : 'bg-cyan-900/50';
  const typeBorderColor = isUpcoming ? 'border-amber-700/50' : 'border-cyan-700/50';

  const PlatformButtons = (
    <>
      <h3 className="mb-4 text-xl font-semibold text-center md:text-left text-white">
        Listen Now:
      </h3>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 justify-center md:justify-start">
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
            <Button
              key={platform.name}
              asChild
              variant="outline"
              size="default"
              className="flex flex-col sm:flex-row items-center justify-center gap-2 min-h-[48px] hover:border-amber-500/50"
              style={platform.bgColor ? buttonStyle : {}}
            >
              <Link
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Listen on ${platform.name}`}
              >
                <div style={iconStyle} className="transition-opacity">
                  {platform.icon}
                </div>
                <span
                  className="text-sm font-medium"
                  style={platform.bgColor ? { color: platform.color || '#FFFFFF' } : {}}
                >
                  {platform.name}
                </span>
              </Link>
            </Button>
          );
        })}
      </div>
    </>
  );

  const ListenNowLinks = (
    <div className="w-full border-t border-zinc-700/40 pt-6 md:pt-8">
      {isUpcoming && release.linkURL ? (
        <Button
          asChild
          variant="primary"
          size="lg"
          className="w-full bg-amber-600 hover:bg-amber-500 text-black font-semibold"
        >
          <Link href={release.linkURL} target="_blank" rel="noopener noreferrer">
            {release.linkText || 'Coming Soon'}
          </Link>
        </Button>
      ) : release.platforms && release.platforms.length > 0 ? (
        PlatformButtons
      ) : (
        <p className="text-center text-zinc-400">Details coming soon.</p>
      )}
    </div>
  );

  const SpecialThanksContent = (
    <div
      className={`${patrickHand.className} text-center text-lg lg:text-xl leading-relaxed text-amber-100/90`}
    >
      <p className="text-center font-medium">
        Bringing "Honest" to life has been one of the most meaningful creative experiences of my
        life, and I couldn't have done it without the support, talent, and heart of some truly
        incredible people. To <strong>Levi Ready</strong>, <strong>Isaac Moreno</strong>,{' '}
        <strong>Tyler Bridge</strong>, <strong>Jamie Wroten</strong>,{' '}
        <strong>Tyler Williams</strong>, <strong>Christopher Chittom</strong>,{' '}
        <strong>Evan Busbin</strong>, <strong>Hagen Brister</strong>, and{' '}
        <strong>Sherry Thibodeaux</strong>
        —thank you for your time, energy, and the unique ways each of you contributed to this song.
        <br />
        <br />
        And last but never least, to my amazing wife <strong>Hunter Lynch</strong> your love,
        strength, and unwavering belief in me are the foundation of everything I do. Thank you for
        being my home, my muse, and my greatest encouragement.
      </p>
      <p className="mt-6 text-center">
        With all my gratitude,
        <br />-{' '}
        <strong>
          Noah Lynch <Heart className="h-4 w-4 text-red-400 inline-block ml-1 relative -top-px" />
        </strong>
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
      <div className="absolute -left-2 top-0 opacity-20">
        <Quote className="h-12 w-12 text-zinc-600/30 rotate-180" fill="currentColor" />
      </div>

      <div
        className={`${patrickHand.className} text-base lg:text-lg tracking-wide leading-relaxed text-amber-100/90 z-10 relative whitespace-pre-wrap pl-4`}
      >
        {spotlightReviewData.content}
      </div>

      <div className="absolute -right-2 bottom-4 opacity-20">
        <Quote className="h-12 w-12 text-amber-400/30" fill="currentColor" />
      </div>

      <div className="mt-auto pt-6 text-right">
        <p className="text-amber-200 font-semibold">{spotlightReviewData.name}</p>
        <div className="flex justify-end mt-1">
          {Array.from({ length: spotlightReviewData.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 text-amber-400" fill="currentColor" />
          ))}
        </div>
      </div>
    </div>
  );

  const BackToMusicLink = (
    <div className="mb-8 text-center">
      <Button asChild variant="ghost" size="sm">
        <Link href="/#music" className="inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to All Music
        </Link>
      </Button>
    </div>
  );

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-zinc-950 text-white">
        <Navbar />
        <SocialSidebar />

        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={release.imageURL}
            alt={`${release.title} Background`}
            fill
            sizes="100vw"
            className="object-cover opacity-20 blur-sm"
          />
          <div className="absolute inset-0 bg-zinc-950/80"></div>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[url('/grain-texture-overlay.png')] bg-repeat opacity-[0.03]" />

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/3 -right-1/4 h-96 w-96 rounded-full bg-amber-500/8 blur-3xl" />
          <div className="absolute -bottom-1/3 -left-1/4 h-96 w-96 rounded-full bg-orange-500/8 blur-3xl" />
        </div>

        <main className="relative z-10">
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-amber-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                  <p className="mt-4 text-zinc-400">Loading release...</p>
                </div>
              </div>
            }
          >
            <div className="container mx-auto px-4 py-24 sm:py-28 md:px-6 lg:py-32">
              <div className="mx-auto max-w-7xl">
                {BackToMusicLink}

                <div className="mb-12 text-center">
                  <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                    {release.title}
                  </h1>
                  <p className={`${patrickHand.className} text-xl text-amber-200/80 md:text-2xl`}>
                    "Every song tells a story"
                  </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 xl:gap-20 mb-12">
                  <div className="space-y-6">
                    <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-zinc-700/50 shadow-2xl">
                      <div className="relative aspect-square">
                        <Image
                          src={release.imageURL}
                          alt={`${release.title} Cover Art`}
                          fill
                          priority
                          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 400px"
                          className="object-cover"
                        />
                        <div
                          className={`absolute top-4 right-4 rounded-full px-3 py-1.5 text-xs font-semibold ${typeBgColor} ${typeColor} border ${typeBorderColor} backdrop-blur-sm`}
                        >
                          {release.type.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-zinc-700/50 bg-zinc-900/30 backdrop-blur-sm p-6">
                      <div className="space-y-3 text-center lg:text-left">
                        <p className="text-lg text-zinc-300">Single • {release.year}</p>
                        <div className="space-y-2 text-sm text-zinc-400">
                          <p>
                            <span className="text-zinc-500">Released by:</span>{' '}
                            <span className="text-zinc-300">{release.releasedBy}</span>
                          </p>
                          <p>
                            <span className="text-zinc-500">Release date:</span>{' '}
                            <span className="text-zinc-300">{release.releaseDate}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="rounded-2xl border border-zinc-700/50 bg-zinc-900/30 backdrop-blur-sm p-6">
                      <h2 className="mb-4 text-2xl font-bold text-white">About This Release</h2>
                      <div className="prose prose-lg prose-invert max-w-none text-zinc-300 leading-relaxed">
                        {release.description}
                      </div>
                    </div>

                    {(!isUpcoming ||
                      (isUpcoming && release.linkURL) ||
                      (release.platforms && release.platforms.length > 0)) && (
                      <div className="rounded-2xl border border-zinc-700/50 bg-zinc-900/30 backdrop-blur-sm p-6">
                        {ListenNowLinks}
                      </div>
                    )}
                  </div>
                </div>

                {slug === 'honest' && (
                  <>
                    <MobileTabs
                      specialThanksContent={SpecialThanksContent}
                      spotlightReviewContent={SpotlightReviewContent}
                    />

                    <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8">
                      <div className="rounded-2xl border border-zinc-700/50 bg-zinc-900/30 backdrop-blur-sm p-8 flex flex-col">
                        <h2 className="mb-6 text-3xl font-bold text-amber-200 text-center">
                          Special Thanks
                        </h2>
                        {SpecialThanksContent}
                      </div>

                      <div className="rounded-2xl border border-zinc-700/50 bg-zinc-900/30 backdrop-blur-sm p-8 flex flex-col">
                        <h2 className="mb-6 text-3xl font-bold text-amber-200 text-center flex items-center justify-center">
                          <Star className="h-6 w-6 mr-2 text-amber-400" fill="currentColor" />
                          <span>Spotlight Review</span>
                          <Star className="h-6 w-6 ml-2 text-amber-400" fill="currentColor" />
                        </h2>
                        {SpotlightReviewContent}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Suspense>
        </main>
      </div>
    </ErrorBoundary>
  );
}
