"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// Note: This component doesn't use reducedMotion yet but could benefit from it.
import { useScrollLock } from "@/lib/hooks/use-scroll-lock";
import { useViewportHeight } from "@/lib/hooks/use-viewport-height";

export default function EntranceAnimation() {
  const [isVisible, setIsVisible] = useState(true);
  const viewportHeight = useViewportHeight();

  useScrollLock(isVisible);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1200);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 right-0 bottom-0 left-0 z-9999 flex items-center justify-center overflow-hidden bg-zinc-950"
          style={{
            // Use actual viewport height from JS, with CSS fallbacks
            height: viewportHeight ? `${viewportHeight}px` : "100dvh",
            minHeight: viewportHeight ? `${viewportHeight}px` : "100dvh",
            width: "100vw",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-[url('/overlays/grain-texture-overlay.png')] bg-repeat opacity-5" />

          <div className="relative z-10 w-full px-4 text-center">
            <motion.div
              className="relative mx-auto will-change-transform"
              style={{
                transform: "translateZ(0)",
                width: "min(70vw, 600px)",
                height: "min(40vh, 300px)",
              }}
              initial={{
                scale: 1.5,
                opacity: 0,
                y: 30,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Image
                src="/branding/NoahSignature.png"
                alt="Noah Lynch"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 90vw, 600px"
                quality={75}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
