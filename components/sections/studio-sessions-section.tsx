'use client';

import { useInView } from '@/hooks/use-in-view';
import { motion } from 'framer-motion';
import { Play, Clock, Eye } from 'lucide-react';
import React, { useState } from 'react';

interface StudioSession {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
  duration: string;
  views: string;
  date: string;
}

// Sample data - replace with actual YouTube video IDs and details
const studioSessions: StudioSession[] = [
  {
    id: '1',
    title: 'Live Studio Session - "Midnight Dreams"',
    description: 'An intimate performance featuring acoustic guitar and raw vocals, capturing the essence of late-night creativity.',
    youtubeId: 'dQw4w9WgXcQ', // Replace with actual video ID
    thumbnail: '/api/placeholder/320/180',
    duration: '4:32',
    views: '12.5K',
    date: '2024-01-15'
  },
  {
    id: '2',
    title: 'Behind the Scenes - Recording "Echoes"',
    description: 'Watch the creative process unfold as Noah layers vocals and experiments with new sounds.',
    youtubeId: 'dQw4w9WgXcQ', // Replace with actual video ID
    thumbnail: '/api/placeholder/320/180',
    duration: '6:18',
    views: '8.2K',
    date: '2024-01-10'
  },
  {
    id: '3',
    title: 'Live Loop Session - "City Lights"',
    description: 'Using loop pedals and layered vocals to create a full band sound in real-time.',
    youtubeId: 'dQw4w9WgXcQ', // Replace with actual video ID
    thumbnail: '/api/placeholder/320/180',
    duration: '5:45',
    views: '15.8K',
    date: '2024-01-05'
  },
  {
    id: '4',
    title: 'Acoustic Cover Series - Classic Hits',
    description: 'Noah puts his unique spin on timeless classics in this stripped-down studio session.',
    youtubeId: 'dQw4w9WgXcQ', // Replace with actual video ID
    thumbnail: '/api/placeholder/320/180',
    duration: '7:22',
    views: '22.1K',
    date: '2023-12-28'
  }
];

const VideoCard = React.memo(({ session, onSelect }: { session: StudioSession; onSelect: (session: StudioSession) => void }) => {
  return (
    <motion.div
      className="group relative cursor-pointer overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm transition-all hover:border-amber-900/50"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(session)}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-full w-full bg-gradient-to-br from-zinc-800 to-zinc-900">
            {/* Placeholder for thumbnail - replace with actual image */}
            <div className="absolute inset-0 flex items-center justify-center text-zinc-600">
              <Play className="h-12 w-12" />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <div className="rounded-full bg-amber-600 p-3 shadow-lg">
            <Play className="h-6 w-6 text-white" fill="white" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs text-white">
          {session.duration}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-white transition-colors group-hover:text-amber-400">
          {session.title}
        </h3>
        <p className="mb-3 line-clamp-2 text-xs text-zinc-400">
          {session.description}
        </p>
        <div className="flex items-center gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{session.views} views</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
      </div>
    </motion.div>
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
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('/texture.png')] bg-repeat opacity-5"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-900/10 blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Live Studio Sessions
          </h2>
          <p className="mx-auto max-w-2xl text-base text-zinc-400 md:text-lg">
            Experience the raw energy and creativity of Noah's live studio performances. 
            Watch exclusive behind-the-scenes content and intimate acoustic sessions.
          </p>
        </motion.div>

        {/* Video Grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
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
            href="https://youtube.com/@noahlynch" // Replace with actual YouTube channel
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-700"
          >
            <Play className="h-4 w-4" />
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
              className="absolute -top-10 right-0 text-white hover:text-amber-400"
              onClick={() => setSelectedVideo(null)}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}