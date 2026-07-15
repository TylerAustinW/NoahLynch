"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps): React.ReactElement {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error("Application error:", error);
    }
  }, [error]);

  return (
    <div className="safe-area-inset safe-area-inset-bottom flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="fixed inset-0">
        <Image
          src="/portraits/noah-lynch-studio-black-white.jpg"
          alt="Noah Lynch in studio - background"
          fill
          className="object-cover object-center"
          style={{
            filter: "blur(5px) brightness(0.25)",
          }}
          priority
          quality={75}
        />

        <div className="absolute inset-0 bg-black/70 bg-linear-to-b from-red-950/20 to-black/80" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-sm text-center sm:max-w-md md:max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="mb-6 flex justify-center sm:mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-red-500/20 blur-xl" />
            <AlertTriangle className="relative h-16 w-16 text-red-400 sm:h-20 sm:w-20 md:h-24 md:w-24" />
          </div>
        </motion.div>

        <motion.div
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h1 className="xs:text-3xl font-patrick mb-3 px-4 text-2xl leading-tight font-bold text-amber-200 sm:mb-4 sm:px-0 sm:text-3xl md:text-4xl">
            Something went wrong!
          </h1>
          <p className="mx-auto mb-4 max-w-xs px-2 text-base leading-relaxed text-zinc-400 sm:mb-6 sm:max-w-md sm:px-0 sm:text-lg">
            We encountered an unexpected error. Don&apos;t worry, our team has been notified and
            we&apos;re working on it.
          </p>
          {process.env.NODE_ENV === "development" && error.message && (
            <div className="mx-2 mt-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 text-left sm:mx-0 sm:mt-6 sm:p-4">
              <p className="mb-1 font-mono text-xs text-zinc-500 sm:text-sm">Error details:</p>
              <p className="font-mono text-xs wrap-break-word text-red-400 sm:text-sm">
                {error.message}
              </p>
              {error.digest && (
                <p className="mt-2 font-mono text-xs break-all text-zinc-600">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}
        </motion.div>

        <motion.div
          className="flex flex-col items-center justify-center gap-3 px-2 sm:flex-row sm:gap-4 sm:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Button
            variant="primary"
            size="default"
            onClick={reset}
            leftIcon={<RefreshCw className="h-4 w-4" />}
            className="min-h-[44px] w-full touch-manipulation focus:ring-2 focus:ring-amber-400/50 focus:outline-none sm:w-auto"
          >
            Try Again
          </Button>

          <Button
            asChild
            variant="secondary"
            size="default"
            className="min-h-[44px] w-full touch-manipulation sm:w-auto"
          >
            <Link href="/" aria-label="Return to homepage">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
