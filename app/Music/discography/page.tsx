'use client';

import { useInView } from '@/hooks/use-in-view';
import { SpotifyAlbum } from '@/lib/spotify/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SpotifyAlbumsData } from './spotify-data';

type ReleaseType = 'upcoming' | 'previous';

export default function DiscographySection() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [releaseType, setReleaseType] = useState<ReleaseType>('upcoming');
  const [spotifyAlbums, setSpotifyAlbums] = useState<SpotifyAlbum[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        const dataPromise = SpotifyAlbumsData();
        const dataString = await dataPromise;
        const data = JSON.parse(dataString);

        if (data.error) {
          console.error('Error from Spotify server component:', data.error);
          setError(data.error);
          return;
        }

        if (data.items && Array.isArray(data.items)) {
          setSpotifyAlbums(data.items);
        } else {
          setError('No albums found for this artist');
        }
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
        setError('Failed to load album data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    // Only fetch when 'previous' tab is active or when component mounts
    if (releaseType === 'previous') {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [releaseType]);

  const renderContent = () => {
    if (releaseType === 'upcoming') {
      return renderUpcomingRelease();
    } else {
      return renderPreviousReleases();
    }
  };

  const renderUpcomingRelease = () => {
    return (
      <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
        <div
          className={`transition-all duration-700 ${
            inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ flex: '0 0 auto' }}
        >
          <div className="relative">
            <Image
              src="/honest-cover.jpeg"
              alt="Honest - Single"
              width={400}
              height={400}
              className="w-full max-w-md h-auto shadow-xl"
              draggable={false}
              priority
            />
          </div>
        </div>

        <div
          className={`transition-all duration-700 delay-300 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-lg">
            <div className="inline-block mb-4 bg-sky-100/20 px-3 py-1 rounded-full">
              <span className="text-sky-100 font-medium">Coming May 2025</span>
            </div>
            <h3 className="text-3xl font-bold mb-2">Honest</h3>
            <p className="text-gray-400 mb-6">Single • 2025</p>

            <p className="text-gray-300 mb-8 text-lg">
              &quot;Honest&quot; is Noah Lynch&apos;s most personal work to date, exploring themes
              of vulnerability and authenticity. The single showcases Noah&apos;s growth as both a
              songwriter and performer
            </p>

            <div className="flex space-x-6">
              <button className="text-lg font-bold mb-4 bg-sky-100/20 px-3 py-1 rounded-full">
                <Link href="https://symphony.to/noah-lynch/honest">PRE-SAVE NOW!</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPreviousReleases = () => {
    if (isLoading) {
      return (
        <div className="text-center py-12">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-10 w-10 rounded-full bg-sky-100/20 mb-4"></div>
            <div className="h-4 w-40 bg-sky-100/20 rounded"></div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => {
              if (releaseType === 'previous') {
                setIsLoading(true);
                SpotifyAlbumsData()
                  .then(data => {
                    const parsed = JSON.parse(data);
                    if (parsed.items) setSpotifyAlbums(parsed.items);
                    setIsLoading(false);
                  })
                  .catch(err => {
                    console.error(err);
                    setIsLoading(false);
                  });
              }
            }}
            className="px-4 py-2 bg-sky-100/20 rounded-full text-sky-100 text-sm"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (!spotifyAlbums.length) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-300">No previous releases found.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {spotifyAlbums.map((album, index) => (
          <div
            key={album.id}
            className={`bg-black/50 rounded-lg overflow-hidden shadow-lg transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="relative aspect-square">
              {album.images && album.images[0] ? (
                <Image
                  src={album.images[0].url}
                  alt={album.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-1 truncate">{album.name}</h3>
              <p className="text-gray-400 text-sm mb-2">
                {album.album_type.charAt(0).toUpperCase() + album.album_type.slice(1)} •{' '}
                {album.release_date.slice(0, 4)}
              </p>
              <div className="flex justify-between items-center mt-4">
                <div className="text-xs text-gray-400">
                  {album.total_tracks} {album.total_tracks === 1 ? 'track' : 'tracks'}
                </div>
                <Link
                  href={album.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-1 px-3 rounded-full text-sm transition-colors"
                >
                  Listen
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section
      id="music"
      ref={ref}
      className="py-24 px-6 md:px-12 bg-black/90 relative
                 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0
                 after:h-40 after:bg-gradient-to-t after:from-black after:to-transparent after:pointer-events-none"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-sky-100 mb-4 md:mb-0">
            {releaseType === 'upcoming' ? 'UPCOMING RELEASES' : 'PREVIOUS RELEASES'}
          </h2>

          <div className="flex space-x-2 bg-black/50 p-1 rounded-full">
            <button
              onClick={() => setReleaseType('upcoming')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                releaseType === 'upcoming'
                  ? 'bg-sky-100/20 text-sky-100'
                  : 'text-gray-400 hover:text-sky-100'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setReleaseType('previous')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                releaseType === 'previous'
                  ? 'bg-sky-100/20 text-sky-100'
                  : 'text-gray-400 hover:text-sky-100'
              }`}
            >
              Previous
            </button>
          </div>
        </div>

        {renderContent()}
      </div>
    </section>
  );
}
