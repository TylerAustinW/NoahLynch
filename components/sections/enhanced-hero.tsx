/**
 * Enhanced Hero Section Component
 * Modern, accessible hero with performance optimizations and progressive enhancement
 */

'use client';

import * as React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, Heart } from 'lucide-react';
import { Patrick_Hand } from 'next/font/google';
import Image from 'next/image';
import { Button, ButtonGroup } from '@/components/ui/enhanced-button';
import { cn } from '@/lib/utils';
import { 
  useAnimateOnInView, 
  useLazyLoad 
} from '@/hooks/use-intersection-observer';
import { 
  useReducedMotion, 
  useLiveRegion 
} from '@/hooks/use-accessibility';
import { PerformanceMonitor, preloadImage } from '@/lib/performance';
import { designTokens } from '@/lib/design-tokens';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa6';

const patrickHand = Patrick_Hand({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

interface SocialLink {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  hoverColor: string;
}

const socialLinks: SocialLink[] = [
  {
    href: 'https://instagram.com/noahlynchmusic',
    icon: FaInstagram,
    label: 'Follow Noah Lynch on Instagram',
    hoverColor: 'hover:text-pink-500',
  },
  {
    href: 'https://facebook.com/noahlynchmusic',
    icon: FaFacebookF,
    label: 'Follow Noah Lynch on Facebook', 
    hoverColor: 'hover:text-blue-500',
  },
  {
    href: 'https://tiktok.com/@noahlynchmusic',
    icon: FaTiktok,
    label: 'Follow Noah Lynch on TikTok',
    hoverColor: 'hover:text-red-500',
  },
  {
    href: 'https://youtube.com/@noahlynch',
    icon: FaYoutube,
    label: 'Subscribe to Noah Lynch on YouTube',
    hoverColor: 'hover:text-red-500',
  },
];

interface CallToActionButton {
  href: string;
  label: string;
  variant: 'primary' | 'secondary' | 'outline';
  ariaLabel: string;
}

const callToActionButtons: CallToActionButton[] = [
  {
    href: '/music/honest',
    label: 'Listen Now',
    variant: 'primary',
    ariaLabel: 'Listen to the latest album Honest',
  },
  {
    href: 'mailto:NoahLynchContact@gmail.com',
    label: 'Contact',
    variant: 'secondary', 
    ariaLabel: 'Contact Noah Lynch via email',
  },
];

const secondaryButtons: CallToActionButton[] = [
  {
    href: '#music',
    label: 'Explore Music',
    variant: 'outline',
    ariaLabel: 'Explore Noah Lynch\'s music catalog',
  },
  {
    href: '/merch',
    label: 'Explore Merch',
    variant: 'outline',
    ariaLabel: 'Browse merchandise',
  },
];

export default function EnhancedHero() {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const [heroRef, isInView] = useAnimateOnInView({ threshold: 0.2 });
  const [imageRef, shouldLoadImage] = useLazyLoad();
  
  const monitor = PerformanceMonitor.getInstance();
  const { announce } = useLiveRegion();
  const prefersReducedMotion = useReducedMotion();

  // Scroll-based parallax effects
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 1000], [0, 300]);
  const imageScale = useTransform(scrollY, [0, 1000], [1, 1.1]);
  const contentY = useTransform(scrollY, [0, 500], [0, 150]);
  
  // Spring animation for smooth movement
  const smoothImageY = useSpring(imageY, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });

  // Preload critical image
  React.useEffect(() => {
    const preloadHeroImage = async () => {
      monitor.startMeasurement('hero-image-preload');
      try {
        await preloadImage('/honest-coverr.png');
      } catch (error) {
        console.error('Failed to preload hero image:', error);
        setImageError(true);
      } finally {
        monitor.endMeasurement('hero-image-preload');
      }
    };

    preloadHeroImage();
  }, [monitor]);

  // Handle image load with performance monitoring
  const handleImageLoad = React.useCallback(() => {
    monitor.startMeasurement('hero-image-render');
    setImageLoaded(true);
    announce('Hero image loaded', 'polite');
    monitor.endMeasurement('hero-image-render');
  }, [monitor, announce]);

  // Handle image error gracefully
  const handleImageError = React.useCallback(() => {
    setImageError(true);
    announce('Hero image failed to load, displaying fallback content', 'polite');
  }, [announce]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: 'easeOut',
      },
    },
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      y: prefersReducedMotion ? 0 : [0, 10, 0],
      transition: {
        opacity: { delay: 1.5, duration: 0.8 },
        y: prefersReducedMotion ? {} : {
          repeat: Infinity,
          duration: 1.5,
          ease: 'easeInOut',
        },
      },
    },
  };

  // Fallback content for image errors
  if (imageError) {
    return (
      <section
        ref={heroRef}
        className={cn(
          'relative flex min-h-screen items-center justify-center',
          'bg-gradient-to-br from-black via-zinc-900 to-black',
          'pt-16'
        )}
        aria-label="Hero section"
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h1 
              className={cn(
                'mb-4 text-5xl font-bold md:text-7xl',
                'text-white'
              )}
              variants={itemVariants}
            >
              Noah Lynch
              <br />
              <span className="text-amber-400">Musician</span>
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-xl text-zinc-300 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Experience authentic music from Mississippi-born singer-songwriter
            </motion.p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={heroRef}
      id="hero"
      className={cn(
        'relative flex min-h-screen items-center overflow-hidden',
        'pt-16 pb-0'
      )}
      aria-label="Hero section featuring Noah Lynch's latest album"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 h-full w-full">
        {shouldLoadImage && (
          <motion.div
            style={{
              y: prefersReducedMotion ? 0 : smoothImageY,
              scale: prefersReducedMotion ? 1 : imageScale,
            }}
            className="h-full w-full"
          >
            <Image
              ref={imageRef}
              src="/honest-coverr.png"
              alt="Noah Lynch - Honest album cover"
              fill
              className={cn(
                'object-cover object-center transition-all duration-1000',
                imageLoaded ? 'scale-105 opacity-100' : 'scale-100 opacity-0'
              )}
              style={{ objectPosition: 'center 30%' }}
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority
              sizes="100vw"
              quality={90}
            />
          </motion.div>
        )}
        
        {/* Gradient Overlay */}
        <div 
          className={cn(
            'absolute inset-0',
            'bg-gradient-to-b from-black/0 via-black/30 to-black/75'
          )} 
        />
      </div>

      {/* Main Content */}
      <motion.div
        className={cn(
          'relative z-10 container mx-auto px-6 md:px-12'
        )}
        style={{
          y: prefersReducedMotion ? 0 : contentY,
        }}
      >
        <motion.div
          className="max-w-xl"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Main Heading */}
          <motion.h1 
            className={cn(
              'mb-4 text-5xl font-bold uppercase text-white drop-shadow-lg',
              'md:text-6xl lg:text-7xl'
            )}
            variants={itemVariants}
          >
            Honest
            <br />
            <span className={cn(
              'text-amber-200/90 drop-shadow-lg',
              'block mt-2'
            )}>
              Out Now
            </span>
          </motion.h1>

          {/* Call-to-Action Buttons */}
          <motion.div 
            className="mt-6 space-y-4"
            variants={itemVariants}
          >
            <ButtonGroup orientation="horizontal" spacing="4">
              {callToActionButtons.map((button) => (
                <Button
                  key={button.href}
                  variant={button.variant}
                  size="lg"
                  asChild
                  className={cn(
                    'min-w-[140px]',
                    button.variant === 'primary' && 'bg-amber-500/90 hover:bg-amber-600/90',
                    button.variant === 'secondary' && 'bg-sky-500/90 hover:bg-sky-600/90'
                  )}
                >
                  <a href={button.href} aria-label={button.ariaLabel}>
                    {button.label}
                  </a>
                </Button>
              ))}
            </ButtonGroup>

            <ButtonGroup orientation="horizontal" spacing="4">
              {secondaryButtons.map((button) => (
                <Button
                  key={button.href}
                  variant={button.variant}
                  size="lg"
                  asChild
                  className={cn(
                    'min-w-[140px]',
                    'border-zinc-600/60 bg-zinc-900/50 text-white',
                    'hover:bg-zinc-800/60 hover:border-zinc-500/70'
                  )}
                >
                  <a href={button.href} aria-label={button.ariaLabel}>
                    {button.label}
                  </a>
                </Button>
              ))}
            </ButtonGroup>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="mt-8 flex gap-6"
            variants={itemVariants}
          >
            {socialLinks.map(({ href, icon: Icon, label, hoverColor }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={cn(
                  'text-zinc-400 transition-colors duration-200',
                  hoverColor,
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500',
                  'rounded-sm p-1'
                )}
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Mobile Scroll Indicator */}
      <motion.div
        className={cn(
          'absolute bottom-6 left-1/2 z-10 -translate-x-1/2',
          'sm:hidden'
        )}
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="flex flex-col items-center">
          <span className="mb-1 text-xs font-medium text-zinc-300">
            Scroll
          </span>
          <ChevronDown 
            className="h-6 w-6 text-zinc-300" 
            aria-hidden="true" 
          />
        </div>
      </motion.div>

      {/* Hand-written Quote */}
      <motion.div 
        className={cn(
          'absolute bottom-12 right-4 z-10 p-2 max-w-xs text-right',
          'hidden md:block'
        )}
        variants={itemVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <p className={cn(
          patrickHand.className,
          'text-lg text-zinc-50/90 leading-tight'
        )}>
          "I hope this record means as much to you as it does to me, thank you
          for the endless support
          <br />
          -{' '}
          <Heart
            className="h-5 w-5 text-zinc-200 inline-block ml-1"
            aria-hidden="true"
          />
          {' '}Noah"
        </p>
      </motion.div>
    </section>
  );
}