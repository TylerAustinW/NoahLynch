"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useScrollLock } from "@/lib/hooks/use-scroll-lock.hook";

export default function EntranceAnimation() {
  const [isVisible, setIsVisible] = useState(true);

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
          className="fixed top-0 left-0 right-0 bottom-0 z-[9999] flex items-center justify-center overflow-hidden bg-zinc-950"
          style={{
            height: "-webkit-fill-available" as React.CSSProperties["height"],
            minHeight: "100vh",
            width: "100vw",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-[url('/overlays/grain-texture-overlay.png')] bg-repeat opacity-5" />

          <div className="relative text-center z-10 px-4 w-full">
            <motion.div
              className="relative mx-auto will-change-transform"
              style={{
                transform: "translateZ(0)",
                width: "min(70vw, 600px)",
                height: "min(40vh, 300px)",
              }}
              initial={{
                scale: 1.3,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <Image
                src="/NoahSignature.png"
                alt="Noah Lynch"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 90vw, 600px"
                quality={75}
              />
            </motion.div>

            <motion.div
              className="-mt-8 sm:-mt-10 md:-mt-12 will-change-transform"
              style={{
                transform: "translateZ(0)",
              }}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <span className="text-white/80 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.4em] sm:tracking-[0.5em] md:tracking-[0.6em] uppercase">
                Music
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
