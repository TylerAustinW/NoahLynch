'use client';

import { useInView } from '@/hooks/use-in-view';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import React, { useState } from 'react';

interface StudioSession {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
}

// Real Noah Lynch YouTube Studio Sessions
const studioSessions: StudioSession[] = [
  {
    id: '1',
    title: 'Noah Lynch - "For You" Live (Studio Sessions)',
    description: 'An intimate acoustic performance showcasing Noah\'s raw talent and emotional depth in this heartfelt studio session.',
    youtubeId: '0WHqv-pE3g8',
    duration: '3:45'
  },
  {
    id: '2',
    title: 'Noah Lynch - "Good Things Take Time" Live (Studio Sessions)',
    description: 'Watch Noah perform this inspiring track with soulful vocals and acoustic guitar in an intimate studio setting.',
    youtubeId: 'uXSKQiTQoHo',
    duration: '4:12'
  },
  {
    id: '3',
    title: 'Noah Lynch - "Honest" Live (Studio Sessions)',
    description: 'A powerful and vulnerable performance of "Honest" that captures the essence of Noah\'s songwriting and vocal delivery.',
    youtubeId: 'UGPzNbSPwZk',
    duration: '3:28'
  }
];

// YouTube thumbnail component with fallback handling
const YouTubeThumbnail = ({ videoId, title }: { videoId: string; title: string }) => {
  const [thumbnailSrc, setThumbnailSrc] = useState(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
  
  const handleImageError = () => {
    // Fallback to medium quality thumbnail if high quality fails
    if (thumbnailSrc.includes('hqdefault')) {
      setThumbnailSrc(`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`);
    } else if (thumbnailSrc.includes('mqdefault')) {
      // Final fallback to default thumbnail
      setThumbnailSrc(`https://img.youtube.com/vi/${videoId}/default.jpg`);
    }
  };

  return (
    <img
      src={thumbnailSrc}
      alt={`Video thumbnail for ${title}`}
      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      loading="lazy"
      onError={handleImageError}
    />
  );
};

const VideoCard = React.memo(({ session, onSelect }: { session: StudioSession; onSelect: (session: StudioSession) => void }) => {
  return (
    <motion.button
      className="group relative w-full cursor-pointer overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm text-left transition-all hover:border-amber-900/50 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600/20"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(session)}
      aria-label={`Play video: ${session.title}`}
      type="button"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
        <YouTubeThumbnail videoId={session.youtubeId} title={session.title} />
        <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <div className="rounded-full bg-amber-600 p-3 shadow-lg" aria-hidden="true">
            <Play className="h-6 w-6 text-white" fill="white" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs text-white" aria-label={`Duration: ${session.duration}`}>
          {session.duration}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-white transition-colors group-hover:text-amber-400">
          {session.title}
        </h3>
        <p className="line-clamp-3 text-xs text-zinc-400">
          {session.description}
        </p>
      </div>
    </motion.button>
  );
});
VideoCard.displayName = 'VideoCard';

export default function StudioSessionsSection(): React.ReactElement {
  const { ref, inView } = useInView({ threshold: 0.1, once: true });
  const [selectedVideo, setSelectedVideo] = useState<StudioSession | null>(null);

  return (
    <section
      ref={ref}
      id="studio-sessions"
      className="relative overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black px-4 py-16 md:px-6 md:py-20"
      aria-labelledby="studio-sessions-heading"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('/texture.png')] bg-repeat opacity-5" aria-hidden="true"></div>
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-900/10 blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 id="studio-sessions-heading" className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Live Studio Sessions
          </h2>
          <p className="mx-auto max-w-2xl text-base text-zinc-400 md:text-lg">
            Experience the raw energy and creativity of Noah's live studio performances. 
            Watch exclusive behind-the-scenes content and intimate acoustic sessions.
          </p>
        </motion.div>

        {/* Video Grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          role="group"
          aria-label="Studio session videos"
        >
          {studioSessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <VideoCard session={session} onSelect={setSelectedVideo} />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="https://youtube.com/@noahlynch"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600/20"
            aria-label="Visit Noah Lynch's YouTube channel to watch more studio sessions"
          >
            <Play className="h-4 w-4" aria-hidden="true" />
            Watch More on YouTube
          </a>
        </motion.div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedVideo(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
        >
          <motion.div
            className="relative w-full max-w-4xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <button
              className="absolute -top-10 right-0 text-white hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600/20 rounded"
              onClick={() => setSelectedVideo(null)}
              aria-label="Close video player"
              type="button"
            >
              Close
            </button>
            <h3 id="video-modal-title" className="sr-only">
              {selectedVideo.title}
            </h3>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}