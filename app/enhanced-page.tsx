/**
 * Enhanced Home Page
 * Modern, accessible main page with improved performance and UX
 */

import * as React from 'react';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';

// Components
import EnhancedNavbar from '@/components/layout/enhanced-navbar';
import EnhancedHero from '@/components/sections/enhanced-hero';

// Dynamic imports for performance optimization
const BiographySection = dynamic(
  () => import('@/components/sections/biography-section'),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    ),
    ssr: false,
  }
);

const MusicShowcaseSection = dynamic(
  () => import('@/components/sections/MusicShowcaseSection'),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    ),
    ssr: false,
  }
);

const StudioSessionsSection = dynamic(
  () => import('@/components/sections/studio-sessions-section'),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    ),
    ssr: false,
  }
);

// Page-specific metadata
export const metadata: Metadata = {
  title: 'Noah Lynch - Singer-Songwriter & Musician',
  description: 'Experience the raw talent and soulful music of Noah Lynch. Watch exclusive live studio sessions, explore his latest releases including "Honest", and discover the Mississippi-born musician\'s authentic approach to songwriting.',
  openGraph: {
    title: 'Noah Lynch - Singer-Songwriter & Musician',
    description: 'Experience the raw talent and soulful music of Noah Lynch. Watch exclusive live studio sessions, explore his latest releases including "Honest", and discover the Mississippi-born musician\'s authentic approach to songwriting.',
    images: ['/noah-portrait.jpeg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noah Lynch - Singer-Songwriter & Musician',
    description: 'Experience the raw talent and soulful music of Noah Lynch. Watch exclusive live studio sessions, explore his latest releases including "Honest", and discover the Mississippi-born musician\'s authentic approach to songwriting.',
    images: ['/noah-portrait.jpeg'],
  },
};

/**
 * Loading Component for Section Transitions
 */
function SectionLoader({ sectionName }: { sectionName: string }) {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-black"
      aria-label={`Loading ${sectionName} section`}
    >
      <div className="flex flex-col items-center space-y-4">
        <div 
          className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"
          role="status"
          aria-label="Loading"
        />
        <p className="text-zinc-400 text-sm">Loading {sectionName}...</p>
      </div>
    </div>
  );
}

/**
 * Error Boundary Component
 */
function SectionErrorBoundary({ 
  children, 
  fallback 
}: { 
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  return (
    <React.Suspense fallback={fallback}>
      {children}
    </React.Suspense>
  );
}

/**
 * Enhanced Home Page Component
 */
export default function EnhancedHome() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <EnhancedNavbar />
      
      {/* Main Content */}
      <main id="main-content" className="relative">
        {/* Hero Section - Always loaded first */}
        <EnhancedHero />
        
        {/* Music Section */}
        <section id="music" aria-label="Music section">
          <SectionErrorBoundary 
            fallback={<SectionLoader sectionName="Music" />}
          >
            <Suspense fallback={<SectionLoader sectionName="Music" />}>
              <MusicShowcaseSection />
            </Suspense>
          </SectionErrorBoundary>
        </section>
        
        {/* Studio Sessions Section */}
        <section id="studio-sessions" aria-label="Studio sessions section">
          <SectionErrorBoundary 
            fallback={<SectionLoader sectionName="Studio Sessions" />}
          >
            <Suspense fallback={<SectionLoader sectionName="Studio Sessions" />}>
              <StudioSessionsSection />
            </Suspense>
          </SectionErrorBoundary>
        </section>
        
        {/* Biography Section */}
        <section id="biography" aria-label="About Noah Lynch section">
          <SectionErrorBoundary 
            fallback={<SectionLoader sectionName="About" />}
          >
            <Suspense fallback={<SectionLoader sectionName="About" />}>
              <BiographySection />
            </Suspense>
          </SectionErrorBoundary>
        </section>
      </main>
      
      {/* Footer could be added here */}
      {/* <Footer /> */}
    </div>
  );
}

/**
 * Performance optimization: Preload critical sections
 */
if (typeof window !== 'undefined') {
  // Preload the next sections after hero loads
  const preloadSections = () => {
    import('@/components/sections/MusicShowcaseSection');
    import('@/components/sections/studio-sessions-section');
    import('@/components/sections/biography-section');
  };
  
  // Preload after a short delay to prioritize hero
  setTimeout(preloadSections, 2000);
}