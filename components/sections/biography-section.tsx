'use client';

import { useInView } from '@/hooks/use-in-view';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import { Patrick_Hand } from 'next/font/google';
import Image from 'next/image';
import { ChevronDown, ChevronLeft, ChevronRight, Music } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const patrickHand = Patrick_Hand({
  weight: '400',
  subsets: ['latin'],
});

const photoSlides = [
  {
    id: 'portrait',
    src: '/noah-lynch-portrait-guitar.jpeg',
    alt: 'Noah Lynch - The Artist',
    caption: 'The Artist',
    description: "Capturing the essence of Noah's artistic vision and musical passion",
  },
  {
    id: 'studio',
    src: '/noah-lynch-studio-session.jpeg',
    alt: 'Noah Lynch - In the Studio',
    caption: 'In His Element',
    description: 'Behind the scenes in the creative process where the magic happens',
  },
];

export default function BiographySection() {
  const { ref, inView } = useInView({ threshold: 0.1, once: true });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();

  // Track when component has mounted to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || !inView) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photoSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, inView]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % photoSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + photoSlides.length) % photoSlides.length);
    setIsAutoPlaying(false);
  };

  return (
    <section
      id="biography"
      ref={ref}
      className="relative overflow-hidden bg-zinc-950 px-4 py-16 sm:py-20 md:px-6 md:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[url('/grain-texture-overlay.png')] bg-repeat opacity-[0.03]" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-white/3 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/5 h-72 w-72 rounded-full bg-white/2 blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="mb-12 text-center md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-4 text-4xl font-bold text-zinc-200 md:text-5xl lg:text-6xl">
            The Story
          </h2>
          <p className={`${patrickHand.className} text-xl text-zinc-300 md:text-2xl`}>
            "Music isn't just what I do, it's who I am"
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6 text-lg leading-relaxed text-white md:text-xl">
              <p>
                Introducing{' '}
                <span className="font-bold text-amber-400 text-xl md:text-2xl">Noah Lynch</span>, a
                Mississippi-born musician whose journey with music began at the age of 6 when he
                first picked up a guitar. From those early days, Noah's passion for music has only
                grown stronger, fueling his desire to share his artistry with the world.
              </p>

              <p>
                Drawing inspiration from legends like{' '}
                <span className="font-semibold text-amber-400">John Mayer</span> and
                <span className="font-semibold text-amber-400"> Stevie Ray Vaughan</span>, Noah's
                music blends the soulful melodies of blues with the infectious energy of neo-rock.
                His sound is a reflection of his upbringing in a small town nestled in Mississippi,
                where music isn't the typical claim to fame.
              </p>

              <motion.div
                initial={false}
                animate={{
                  height: isMounted && isMobile && !isExpanded ? 0 : 'auto',
                  opacity: isMounted && isMobile && !isExpanded ? 0 : 1,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <p>
                  Noah's upbringing was marked by the serenade of his guitar strings and the
                  melodies that echoed through his soul. His authentic approach to songwriting
                  captures the essence of human emotion, creating connections with listeners around
                  the world.
                </p>
              </motion.div>

              {isMounted && isMobile && (
                <motion.button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="group inline-flex items-center gap-2 text-zinc-300 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-400/50 rounded-lg px-2 py-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-base font-medium">
                    {isExpanded ? 'Read Less' : 'Read More'}
                  </span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </motion.button>
              )}
            </div>

            <motion.div
              className="pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link
                href={'#music'}
                className="group inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-7 py-4 font-medium text-white transition-all duration-300 hover:bg-white/20 hover:border-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
              >
                <Music className="h-5 w-5" />
                Explore The Music
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </motion.svg>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-zinc-800/50 shadow-2xl">
              <div className="relative aspect-[4/5] md:aspect-[3/4]">
                {photoSlides.map((slide, index) => (
                  <motion.div
                    key={slide.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{
                      opacity: index === currentSlide ? 1 : 0,
                      x: index === currentSlide ? 0 : index > currentSlide ? 100 : -100,
                    }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4">
                      <p
                        className={`${patrickHand.className} mb-1 text-xl text-white/90 drop-shadow-lg`}
                      >
                        {slide.caption}
                      </p>
                      <p className="text-sm text-zinc-300/80 drop-shadow">{slide.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-4 md:flex">
                <button
                  onClick={prevSlide}
                  className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-2">
              {photoSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-8 bg-amber-400'
                      : 'w-2 bg-zinc-600 hover:bg-zinc-500'
                  }`}
                  aria-label={`View photo ${index + 1}`}
                />
              ))}
            </div>

            <motion.div
              className="absolute -top-6 -right-4 z-10 hidden max-w-xs rounded-xl bg-zinc-900/90 p-4 backdrop-blur border border-amber-400/30 lg:block"
              initial={{ opacity: 0, scale: 0.8, rotate: 3 }}
              animate={inView ? { opacity: 1, scale: 1, rotate: 2 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p className={`${patrickHand.className} text-sm text-zinc-300`}>
                "Every song is a piece of my soul, shared with the world"
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
