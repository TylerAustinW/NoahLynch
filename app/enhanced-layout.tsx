/**
 * Enhanced Root Layout
 * Modern layout with improved performance, accessibility, and SEO
 */

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { PerformanceMonitor } from '@/lib/performance';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

// Site configuration
const siteConfig = {
  name: 'Noah Lynch Music',
  title: 'Noah Lynch - Singer-Songwriter & Musician',
  description: 'Experience the raw talent and soulful music of Noah Lynch. Watch exclusive live studio sessions, explore his latest releases including "Honest", and discover the Mississippi-born musician\'s authentic approach to songwriting.',
  url: 'https://www.noahlynch.com',
  ogImage: '/noah-portrait.jpeg',
  creator: 'Noah Lynch',
  keywords: [
    'Noah Lynch',
    'musician', 
    'singer-songwriter',
    'Mississippi musician',
    'blues',
    'neo-rock',
    'acoustic music',
    'indie artist',
    'studio sessions',
    'Honest album',
    'Ready Records',
    'John Mayer inspired',
    'Stevie Ray Vaughan',
    'guitar',
    'vocals',
    'Mississippi blues',
    'authentic music',
  ],
  social: {
    twitter: '@NoahLynch17',
    instagram: '@noahlynchmusic',
    youtube: '@noahlynch',
    facebook: 'noahlynchmusic',
    tiktok: '@noahlynchmusic',
  },
};

// Enhanced viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#d97706' },
    { media: '(prefers-color-scheme: dark)', color: '#d97706' },
  ],
  colorScheme: 'dark light',
};

// Enhanced metadata
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.creator, url: siteConfig.url }],
  creator: siteConfig.creator,
  publisher: 'Ready Records',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Robots and indexing
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.creator} - Mississippi-born Singer-Songwriter and Musician`,
        type: 'image/jpeg',
      },
      {
        url: '/noah-studio.jpeg',
        width: 1080,
        height: 1080,
        alt: `${siteConfig.creator} Music Studio Session`,
        type: 'image/jpeg',
      },
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.social.twitter,
    creator: siteConfig.social.twitter,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },

  // Additional metadata
  alternates: {
    canonical: siteConfig.url,
  },

  // App-specific metadata
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: siteConfig.name,
  },

  // Verification (add your verification codes here)
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // other: 'your-other-verification-code',
  },

  // Additional structured data
  other: {
    // Discord embed color
    'theme-color': '#d97706',
    
    // Music-specific properties
    'music:musician': siteConfig.creator,
    'music:album': 'Honest',
    'music:release_date': '2025-05-09',
    'music:genre': 'Blues, Neo-Rock, Indie',
    
    // Geographic information
    'geo.region': 'US-MS',
    'geo.placename': 'Mississippi',
    
    // Content rating
    'rating': 'general',
    
    // Mobile app capabilities
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': siteConfig.name,
    
    // Microsoft specific
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
  },
};

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // Main person/artist
    {
      '@type': 'Person',
      '@id': `${siteConfig.url}#person`,
      name: siteConfig.creator,
      alternateName: [`${siteConfig.creator} Music`, `${siteConfig.creator} Artist`],
      description: 'Mississippi-born singer-songwriter blending blues and neo-rock, inspired by John Mayer and Stevie Ray Vaughan',
      url: siteConfig.url,
      image: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        width: 800,
        height: 600,
      },
      birthPlace: {
        '@type': 'Place',
        name: 'Mississippi, USA',
        addressRegion: 'MS',
        addressCountry: 'US',
      },
      sameAs: [
        `https://youtube.com/${siteConfig.social.youtube}`,
        `https://twitter.com/${siteConfig.social.twitter}`,
        `https://instagram.com/${siteConfig.social.instagram}`,
        `https://facebook.com/${siteConfig.social.facebook}`,
        `https://tiktok.com/${siteConfig.social.tiktok}`,
      ],
      jobTitle: 'Singer-Songwriter',
      worksFor: {
        '@type': 'Organization',
        name: 'Ready Records',
      },
      genre: ['Blues', 'Neo-Rock', 'Indie', 'Acoustic'],
      instrument: ['Guitar', 'Vocals'],
      knowsAbout: ['Music Production', 'Songwriting', 'Guitar Playing', 'Vocal Performance'],
    },
    
    // Website
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: { '@id': `${siteConfig.url}#person` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    
    // Music album
    {
      '@type': 'MusicAlbum',
      '@id': `${siteConfig.url}#honest-album`,
      name: 'Honest',
      byArtist: { '@id': `${siteConfig.url}#person` },
      datePublished: '2025-05-09',
      recordLabel: 'Ready Records',
      genre: ['Blues', 'Neo-Rock', 'Indie'],
      albumProductionType: 'StudioAlbum',
      image: `${siteConfig.url}/honest-coverr.png`,
    },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function EnhancedRootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://i.scdn.co" />
        <link rel="preconnect" href="https://img.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preload critical resources with fetchpriority */}
        <link 
          rel="preload" 
          href="/honest-coverr.png" 
          as="image" 
          type="image/png"
          fetchPriority="high"
        />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Performance monitoring initialization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize performance monitoring
              if (typeof window !== 'undefined' && window.performance) {
                window.__PERFORMANCE_START__ = performance.now();
              }
              
              // Set scrollbar width CSS variable
              function setScrollbarWidth() {
                const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');
              }
              
              if (typeof window !== 'undefined') {
                setScrollbarWidth();
                window.addEventListener('resize', setScrollbarWidth);
              }
            `,
          }}
        />
      </head>
      
      <body 
        className={`
          ${inter.className} 
          min-h-screen bg-black text-white 
          antialiased selection:bg-amber-500/20 selection:text-amber-100
          scrollbar-thin scrollbar-track-black scrollbar-thumb-zinc-700
        `}
        suppressHydrationWarning
      >
        {children}
        
        {/* Live region for accessibility announcements */}
        <div
          id="live-region"
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
          role="status"
        />
        
        {/* Performance monitoring script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Report initial page load performance
              if (typeof window !== 'undefined' && window.performance && window.__PERFORMANCE_START__) {
                window.addEventListener('load', function() {
                  const loadTime = performance.now() - window.__PERFORMANCE_START__;
                  console.log('Page load time:', loadTime + 'ms');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}