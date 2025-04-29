import { allReleases, getReleaseById, Platform, ReleaseWithPlatforms } from '@/lib/musicData';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
   params: { slug: string };
   searchParams: Record<string, string | string[] | undefined>;
}

export async function generateStaticParams() {
   return allReleases.map((release: ReleaseWithPlatforms) => ({ slug: release.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
   const slug = (await params).slug;
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

export default async function MusicReleasePage({ params }: PageProps) {
   const slug = (await params).slug;
   const release = getReleaseById(slug);

   if (!release) {
      notFound();
   }

   const isUpcoming = release.type === 'upcoming';
   const typeColor = isUpcoming ? 'text-amber-400' : 'text-cyan-400';
   const typeBgColor = isUpcoming ? 'bg-amber-900/50' : 'bg-cyan-900/50';
   const typeBorderColor = isUpcoming ? 'border-amber-700/50' : 'border-cyan-700/50';

   return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black text-white py-24 px-4 sm:px-6 lg:px-8">
         <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
               <div className="w-full md:w-1/2 flex-shrink-0">
                  <div className="relative aspect-square rounded-lg shadow-xl overflow-hidden border border-zinc-800/60">
                     <Image
                        src={release.imageURL}
                        alt={`${release.title} Cover Art`}
                        fill
                        priority
                        sizes="(max-width: 768px) 90vw, 50vw"
                        className="object-cover"
                     />
                     <div
                        className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold ${typeBgColor} ${typeColor} border ${typeBorderColor} backdrop-blur-sm`}
                     >
                        {release.type.toUpperCase()}
                     </div>
                  </div>
               </div>

               <div className="w-full md:w-1/2 flex flex-col">
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">{release.title}</h1>
                  <p className="text-lg text-zinc-400 mb-4">Single • {release.year}</p>

                  <div className="mb-6 space-y-1 text-sm text-zinc-300">
                     <p>
                        <span className="text-zinc-500">Released by:</span> {release.releasedBy}
                     </p>
                     <p>
                        <span className="text-zinc-500">Release date:</span> {release.releaseDate}
                     </p>
                  </div>

                  <p className="text-zinc-300 leading-relaxed mb-8">{release.description}</p>

                  <div className="mt-auto pt-6 border-t border-zinc-700/50">
                     {release.platforms && release.platforms.length > 0 ? (
                        <>
                           <h2 className="text-xl font-semibold mb-4">Listen Now:</h2>
                           <div className="flex flex-wrap gap-4 items-center">
                              {release.platforms.map((platform: Platform) => (
                                 <Link
                                    key={platform.name}
                                    href={platform.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-zinc-800/70 hover:bg-zinc-700/90 border border-zinc-700/50 rounded-full transition-all text-zinc-300 hover:text-white"
                                    aria-label={`Listen on ${platform.name}`}
                                 >
                                    {platform.icon}
                                    <span className="text-sm font-medium">{platform.name}</span>
                                 </Link>
                              ))}
                           </div>
                        </>
                     ) : (
                        <button className="w-full px-6 py-3 bg-amber-600 hover:bg-amber-500 text-black font-bold rounded-full transition-all duration-300">
                           {release.linkText || 'Coming Soon'}
                        </button>
                     )}
                     <div className="mt-8 text-center">
                        <Link
                           href="/#music"
                           className="text-sm text-zinc-400 hover:text-amber-200 transition-colors"
                        >
                           &larr; Back to All Music
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
