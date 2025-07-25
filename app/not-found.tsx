'use client';

import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Home, Music, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Patrick_Hand } from 'next/font/google';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const patrickHand = Patrick_Hand({
  weight: '400',
  subsets: ['latin'],
});

/**
 * Custom 404 page with Noah Lynch branding and helpful navigation
 * @returns {React.ReactElement} 404 error page
 */
export default function NotFound(): React.ReactElement {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const quickLinks = [
    { href: '/', label: 'Home', icon: Home, description: 'Back to main page' },
    { href: '/music/honest', label: 'Latest Music', icon: Music, description: 'Listen to Honest' },
    { href: '/tour-dates', label: 'Tour Dates', icon: Calendar, description: 'See upcoming shows' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white safe-area-inset">
      <Navbar />

      {/* Background Image */}
      <div className="fixed inset-0">
        <Image
          src="/noah-lynch-studio-black-white.jpg"
          alt="Noah Lynch in studio - background"
          fill
          className="object-cover object-center"
          style={{
            filter: 'blur(4px) brightness(0.3)',
          }}
          priority
        />

        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Grain Texture */}
        <div className="pointer-events-none absolute inset-0 bg-[url('/texture.png')] bg-repeat opacity-[0.02]" />
      </div>

      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 pb-8 safe-area-inset-bottom">
        <motion.div
          className="w-full max-w-sm sm:max-w-md md:max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* 404 Number */}
          <motion.div
            className="mb-6 sm:mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl font-bold bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent leading-none">
              404
            </h1>
          </motion.div>

          {/* Error Message */}
          <motion.div className="mb-8 sm:mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}>
            <h2
              className={`text-2xl xs:text-3xl sm:text-3xl md:text-4xl font-bold text-amber-200 mb-3 sm:mb-4 leading-tight px-4 sm:px-0 ${patrickHand.className}`}
            >
              Looks like you hit a wrong note!
            </h2>
            <p className="text-base sm:text-lg text-zinc-400 max-w-xs sm:max-w-md mx-auto leading-relaxed px-2 sm:px-0">
              The page you're looking for doesn't exist. Maybe it's been moved, or perhaps you followed an old link.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12 px-2 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              >
                <Link
                  href={link.href}
                  className="group block rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-4 sm:p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5 min-h-[44px] touch-manipulation focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50"
                >
                  <link.icon className="h-6 w-6 sm:h-8 sm:w-8 text-amber-400 mb-2 sm:mb-3 mx-auto transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-1 group-hover:text-amber-400 transition-colors">{link.label}</h3>
                  <p className="text-xs sm:text-sm text-zinc-500 leading-snug">{link.description}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2 sm:px-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Button
              variant="primary"
              size="default"
              onClick={() => router.back()}
              leftIcon={<ArrowLeft className="h-4 w-4" />}
              className="w-full sm:w-auto min-h-[44px] touch-manipulation"
            >
              Go Back
            </Button>

            <Button asChild variant="secondary" size="default" className="w-full sm:w-auto min-h-[44px] touch-manipulation">
              <Link href="/">Return Home</Link>
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
