"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "./button";

interface ExpandableBioProps {
    content: string;
    className?: string;
}

export default function ExpandableBio({ content, className = "" }: ExpandableBioProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const truncatedContent =
        "Noah Lynch is a Mississippi-born singer-songwriter blending acoustic soul, soft rock, and alt-pop into emotionally rich, story-driven music. Known for his heartfelt guitar playing and honest lyrics, Noah delivers performances that feel both intimate and universal. His songs speak to the real — love, heartbreak, growth — all anchored in smooth grooves and Southern sincerity.";
    const fullContent = content;

    const hasMoreContent = fullContent.length > truncatedContent.length;

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`space-y-3 sm:space-y-4 ${className}`}>
            <motion.div
                className="text-zinc-300 text-base sm:text-lg leading-relaxed print:text-sm print:text-black overflow-hidden will-change-transform"
                layout
                transition={{
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                }}
            >
                <AnimatePresence mode="wait">
                    {isExpanded ? (
                        <motion.div
                            key="full"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{
                                duration: 0.3,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            className="will-change-transform"
                        >
                            {fullContent}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="truncated"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{
                                duration: 0.3,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            className="will-change-transform"
                        >
                            {truncatedContent}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {hasMoreContent && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        delay: 0.1,
                        duration: 0.2,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="flex items-center"
                >
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleExpanded}
                        rightIcon={
                            <motion.div
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="flex items-center justify-center"
                            >
                                <ChevronDown className="h-4 w-4" />
                            </motion.div>
                        }
                        className="text-amber-200 hover:text-amber-100 hover:bg-amber-500/10 transition-colors duration-200 print:hidden"
                    >
                        {isExpanded ? "Read Less" : "Read More"}
                    </Button>
                </motion.div>
            )}
        </div>
    );
}
