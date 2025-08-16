'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Calendar,
  CheckCircle,
  Clock,
  Copy,
  Home,
  MapPin,
  MessageSquare,
  Music,
  Share2,
  User,
} from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase/client';
import { HASHTAGS, ROUTES, SUPABASE_TABLES } from '@/lib/config/constants';
import type { CheckIn, Show } from '@/lib/types/checkin'; // Import Patrick Hand font
import { Patrick_Hand } from 'next/font/google';

const patrickHand = Patrick_Hand({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

function CheckInSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const checkinId = searchParams.get('id');

  const [checkin, setCheckin] = useState<CheckIn | null>(null);
  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!checkinId) {
      router.push(ROUTES.CHECKIN);
      return;
    }

    async function fetchCheckinDetails() {
      try {
        const { data: checkinData, error: checkinError } = await supabase
          .from(SUPABASE_TABLES.CHECKINS)
          .select('*')
          .eq('id', checkinId)
          .single();

        if (checkinError) {
          console.error('Error fetching check-in:', checkinError);
          router.push(ROUTES.CHECKIN);
          return;
        }

        setCheckin(checkinData);

        const { data: showData, error: showError } = await supabase
          .from(SUPABASE_TABLES.SHOWS)
          .select('*')
          .eq('id', checkinData.show_id)
          .single();

        if (showError) {
          console.error('Error fetching show:', showError);
        } else {
          setShow(showData);
        }
      } catch (error) {
        console.error('Error fetching details:', error);
        router.push(ROUTES.CHECKIN);
      } finally {
        setLoading(false);
      }
    }

    fetchCheckinDetails().catch((error) => {
      console.error('Failed to fetch checkin details:', error);
    });
  }, [checkinId, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto p-8 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-3 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-zinc-400">Loading your check-in...</p>
          </div>
        </div>
      </main>
    );
  }

  const formatShowDetails = (show: Show) => {
    // Fix date parsing by adding time component
    const date = new Date(show.date + 'T00:00:00');
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    return {
      date: formattedDate,
      venue: show.venue,
      location: `${show.city}, ${show.state}`,
      time: show.time
        ? new Date(`1970-01-01T${show.time}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })
        : null,
    };
  };

  const showDetails = show ? formatShowDetails(show) : null;

  // Social share functions
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Just checked in at Noah Lynch's show${showDetails ? ` at ${showDetails.venue}` : ''}! 🎸`;

  const socialLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&hashtags=${HASHTAGS.MAIN.slice(1)},${HASHTAGS.LIVE_MUSIC.slice(1)}`,
    instagram: `https://www.instagram.com/`, // Instagram doesn't support direct sharing via URL
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-8 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-zinc-950 to-green-900/10 animate-gradient" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          {/* Success Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-2xl p-8 text-center mb-8 relative overflow-hidden"
          >
            {/* Success animation glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-400/5 to-transparent pointer-events-none" />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.3,
              }}
              className="mb-6"
            >
              <div className="relative inline-block">
                <CheckCircle className="w-20 h-20 text-green-400 mx-auto relative z-10" />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.2, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 bg-green-400 rounded-full blur-xl"
                />
              </div>
              <h1 className={`text-4xl font-bold text-white mt-4 mb-2 ${patrickHand.className}`}>
                You're All Checked In!
              </h1>
              <p className="text-lg text-zinc-300">
                Thanks for letting Noah know you're here tonight!
              </p>
            </motion.div>

            {/* Show Details Card */}
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-zinc-800/50 border border-zinc-700/30 rounded-xl p-6 mb-6"
              >
                <div className="flex items-center justify-center mb-4">
                  <Music className="w-5 h-5 text-amber-500 mr-2" />
                  <h2 className="text-xl font-semibold text-white">Tonight's Performance</h2>
                </div>
                <div className="space-y-3 text-zinc-300">
                  <div className="flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-zinc-500 mr-2" />
                    <p>{showDetails.date}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-zinc-500 mr-2" />
                    <p className="font-medium">{showDetails.venue}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-zinc-400">{showDetails.location}</p>
                  </div>
                  {showDetails.time && (
                    <div className="flex items-center justify-center">
                      <Clock className="w-4 h-4 text-zinc-500 mr-2" />
                      <p>{showDetails.time}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Check-in Details */}
            {checkin && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-5 mb-6 text-left"
              >
                <h3 className="font-semibold text-white mb-3 flex items-center">
                  <User className="w-4 h-4 mr-2 text-amber-500" />
                  Your Check-in
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <span className="text-zinc-500 mr-2">Name:</span>
                    <span className="text-zinc-300">{checkin.name}</span>
                  </div>
                  {checkin.feedback && (
                    <div>
                      <div className="flex items-start mb-2">
                        <MessageSquare className="w-4 h-4 mr-2 text-zinc-500 mt-0.5" />
                        <span className="text-zinc-500">Your feedback:</span>
                      </div>
                      <div className="ml-6 bg-gradient-to-r from-amber-900/20 to-transparent p-3 rounded-lg border-l-2 border-amber-500">
                        <p className="text-zinc-300 italic">"{checkin.feedback}"</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center text-zinc-400 text-xs pt-2">
                    <Clock className="w-3 h-3 mr-1" />
                    {checkin.created_at
                      ? new Date(checkin.created_at).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                        })
                      : 'Just now'}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <p className="text-zinc-400 mb-4">Enjoy the show! Noah appreciates your support.</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={ROUTES.HOME}
                  className="inline-flex items-center justify-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-amber-600/20"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>

                <Link
                  href={ROUTES.TOUR_DATES}
                  className="inline-flex items-center justify-center px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium rounded-xl transition-all hover:scale-105 border border-zinc-700"
                >
                  <Music className="w-4 h-4 mr-2" />
                  View More Shows
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Social Share Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-2xl p-6 text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <Share2 className="w-5 h-5 text-amber-500 mr-2" />
              <h2 className="text-xl font-bold text-white">Share the Vibe</h2>
            </div>

            <p className="text-zinc-400 mb-6">
              Spread the word about tonight's show! Tag @NoahLynchMusic
            </p>

            {/* Social Media Buttons */}
            <div className="flex justify-center gap-3 mb-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyToClipboard}
                className={`p-3 rounded-xl transition-all border ${
                  copied
                    ? 'bg-green-600/20 border-green-500/50 text-green-400'
                    : 'bg-zinc-800 hover:bg-amber-600/20 border-zinc-700 hover:border-amber-500/50 text-amber-400'
                }`}
                aria-label="Copy share text"
              >
                <Copy className="w-5 h-5" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-800 hover:bg-blue-600/20 rounded-xl transition-colors border border-zinc-700 hover:border-blue-500/50"
                aria-label="Share on Twitter"
              >
                <FaTwitter className="w-5 h-5 text-blue-400" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-800 hover:bg-pink-600/20 rounded-xl transition-colors border border-zinc-700 hover:border-pink-500/50"
                aria-label="View on Instagram"
              >
                <FaInstagram className="w-5 h-5 text-pink-400" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-800 hover:bg-blue-700/20 rounded-xl transition-colors border border-zinc-700 hover:border-blue-600/50"
                aria-label="Share on Facebook"
              >
                <FaFacebook className="w-5 h-5 text-blue-500" />
              </motion.a>
            </div>

            {copied && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-green-400 text-sm mb-4"
              >
                Share text copied to clipboard! 📋
              </motion.p>
            )}

            {/* Hashtags */}
            <div className="flex justify-center flex-wrap gap-2 text-sm">
              {[HASHTAGS.MAIN, HASHTAGS.LIVE_MUSIC, HASHTAGS.ACOUSTIC].map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="px-3 py-1 bg-zinc-800/50 text-amber-400 rounded-full border border-zinc-700/50"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </main>
  );
}

export default function CheckInSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-zinc-950 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto p-8 text-center">
            <div className="w-12 h-12 border-3 border-amber-500 border-t-transparent rounded-full mx-auto mb-4 animate-spin" />
            <p className="text-zinc-400">Loading your check-in...</p>
          </div>
        </div>
      </main>
    }>
      <CheckInSuccessContent />
    </Suspense>
  );
}
