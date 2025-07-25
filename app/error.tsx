'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Patrick_Hand } from 'next/font/google';
import Image from 'next/image';

const patrickHand = Patrick_Hand({
  weight: '400',
  subsets: ['latin'],
});

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global error boundary component
 * @param {ErrorProps} props - Error and reset function
 * @returns {React.ReactElement} Error page
 */
export default function Error({ error, reset }: ErrorProps): React.ReactElement {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Log the error to an error reporting service
    if (process.env.NODE_ENV === 'development') {
      console.error('Application error:', error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 safe-area-inset safe-area-inset-bottom">
      {/* Background Image */}
      <div className="fixed inset-0">
        <Image
          src="/noah-lynch-studio-black-white.jpg"
          alt="Noah Lynch in studio - background"
          fill
          className="object-cover object-center"
          style={{
            filter: 'blur(5px) brightness(0.25)',
          }}
          priority
        />

        {/* Dark overlay with red tint for error state */}
        <div className="absolute inset-0 bg-black/70 bg-gradient-to-b from-red-950/20 to-black/80" />

        {/* Grain Texture */}
        <div className="pointer-events-none absolute inset-0 bg-[url('/texture.png')] bg-repeat opacity-[0.02]" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Error Icon */}
        <motion.div
          className="mb-6 sm:mb-8 flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full" />
            <AlertTriangle className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-red-400" />
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div className="mb-8 sm:mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}>
          <h1
            className={`text-2xl xs:text-3xl sm:text-3xl md:text-4xl font-bold text-amber-200 mb-3 sm:mb-4 leading-tight px-4 sm:px-0 ${patrickHand.className}`}
          >
            Something went wrong!
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 max-w-xs sm:max-w-md mx-auto mb-4 sm:mb-6 leading-relaxed px-2 sm:px-0">
            We encountered an unexpected error. Don't worry, our team has been notified and we're working on it.
          </p>
          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 text-left mx-2 sm:mx-0">
              <p className="text-xs sm:text-sm font-mono text-zinc-500 mb-1">Error details:</p>
              <p className="text-xs sm:text-sm font-mono text-red-400 break-words">{error.message}</p>
              {error.digest && <p className="text-xs font-mono text-zinc-600 mt-2 break-all">Digest: {error.digest}</p>}
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2 sm:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Button
            variant="primary"
            size="default"
            onClick={reset}
            leftIcon={<RefreshCw className="h-4 w-4" />}
            className="w-full sm:w-auto min-h-[44px] touch-manipulation focus:outline-none focus:ring-2 focus:ring-amber-400/50"
          >
            Try Again
          </Button>

          <Button asChild variant="secondary" size="default" className="w-full sm:w-auto min-h-[44px] touch-manipulation">
            <Link href="/" aria-label="Return to homepage">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
