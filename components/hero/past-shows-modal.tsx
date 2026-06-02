"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFocusTrap } from "@/lib/hooks/use-focus-trap";
import { formatDate } from "@/lib/utils/date.utils";
import type { TourDate } from "@/lib/data/tour";

interface PastShowsModalProps {
  isOpen: boolean;
  onClose: () => void;
  pastShows: TourDate[];
}

export default function PastShowsModal({ isOpen, onClose, pastShows }: PastShowsModalProps) {
  const modalRef = useFocusTrap({
    isActive: isOpen,
    restoreFocus: true,
    autoFocus: true,
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={modalRef}
            className="relative mx-4 max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-900/95 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-zinc-700/50 bg-zinc-900/95 px-6 py-4 backdrop-blur-sm">
              <h2 className="font-patrick text-xl font-bold text-amber-200 sm:text-2xl">
                Previous Shows
              </h2>
              <Button onClick={onClose} variant="ghost" size="icon-sm" aria-label="Close modal">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="px-6 py-4">
              <div className="block sm:hidden">
                <motion.div
                  className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto"
                  style={{
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {pastShows.map((show, index) => (
                    <motion.div
                      key={show.id}
                      className="w-[85vw] max-w-sm shrink-0 snap-center"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="h-full rounded-xl border border-zinc-700/30 bg-zinc-800/50 p-4">
                        <h3 className="text-lg font-semibold text-zinc-100">{show.venue}</h3>
                        <div className="mt-1 flex items-center gap-2 text-sm text-zinc-300">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {show.city}, {show.state}
                          </span>
                        </div>
                        {show.description && (
                          <p className="mt-3 line-clamp-3 text-sm text-zinc-400">
                            {show.description}
                          </p>
                        )}
                        <div className="mt-4 space-y-1">
                          <div className="font-medium text-amber-200">{formatDate(show.date)}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                <div className="mt-4 flex justify-center gap-1">
                  {pastShows.map((_, index) => (
                    <div key={index} className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
                  ))}
                </div>
                <p className="mt-3 text-center text-xs text-zinc-400">Swipe to see more shows</p>
              </div>

              <div className="hidden max-h-[60vh] overflow-y-auto sm:block">
                <div className="space-y-4">
                  {pastShows.map((show) => (
                    <div
                      key={show.id}
                      className="group rounded-xl border border-zinc-700/30 bg-zinc-800/50 p-4 transition-all duration-300 hover:border-zinc-600/50 hover:bg-zinc-800/70"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-zinc-100">{show.venue}</h3>
                          <div className="mt-1 flex items-center gap-2 text-sm text-zinc-300">
                            <MapPin className="h-4 w-4" />
                            <span>
                              {show.city}, {show.state}
                            </span>
                          </div>
                          {show.description && (
                            <p className="mt-2 text-sm text-zinc-400">{show.description}</p>
                          )}
                        </div>
                        <div className="flex flex-col gap-1 sm:items-end">
                          <div className="font-medium text-amber-200">{formatDate(show.date)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 border-t border-zinc-700/50 bg-zinc-900/95 px-6 py-4 backdrop-blur-sm">
              <p className="text-center text-sm text-zinc-400">
                Follow Noah's socials for updates on upcoming shows!
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
