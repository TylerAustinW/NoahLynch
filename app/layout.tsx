import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SocialSidebar from '@/components/layout/social-sidebar';
import ScrollToTop from '@/components/layout/scroll-to-top';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = 'https://www.noahlynch.com';
const siteName = 'Noah Lynch Music';
const siteDescription =
  'Mississippi-born musician Noah Lynch blends soulful blues with infectious neo-rock energy. Drawing inspiration from John Mayer and Stevie Ray Vaughan, his authentic approach to songwriting captures the essence of human emotion, creating connections with listeners around the world.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Noah Lynch - Singer-Songwriter & Musician',
    template: `%s | Noah Lynch`,
  },
  description: siteDescription,
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
  ],
  authors: [{ name: 'Noah Lynch' }],
  creator: 'Noah Lynch',
  publisher: 'Ready Records',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: siteName,
    title: 'Noah Lynch - Singer-Songwriter & Musician',
    description: siteDescription,
    images: [
      {
        url: '/noah-lynch-portrait-guitar.jpeg',
        width: 1200,
        height: 630,
        alt: 'Noah Lynch - Mississippi-born Singer-Songwriter and Musician',
        type: 'image/jpeg',
      },
      {
        url: '/noah-lynch-studio-session.jpeg',
        width: 1080,
        height: 1080,
        alt: 'Noah Lynch Music Studio Session',
        type: 'image/jpeg',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@NoahLynch17',
    creator: '@NoahLynch17',
    title: 'Noah Lynch - Singer-Songwriter & Musician',
    description: siteDescription,
    images: [
      {
        url: '/noah-lynch-portrait-guitar.jpeg',
        width: 1200,
        height: 630,
        alt: 'Noah Lynch - Mississippi-born Singer-Songwriter and Musician',
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  other: {
    author: 'Noah Lynch',
    'article:author': 'Noah Lynch',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Noah Lynch',
    'music:musician': 'Noah Lynch',
    'music:album': 'Honest',
    'music:release_date': '2025-05-09',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#d97706" />
        <link rel="canonical" href={siteUrl} />
      </head>
      <body className={inter.className}>
        <SocialSidebar />
        <ScrollToTop />
        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Noah Lynch',
              alternateName: ['Noah Lynch Music', 'Noah Lynch Artist'],
              description:
                'Mississippi-born singer-songwriter blending blues and neo-rock, inspired by John Mayer and Stevie Ray Vaughan',
              url: siteUrl,
              image: `${siteUrl}/noah-lynch-portrait-guitar.jpeg`,
              birthPlace: {
                '@type': 'Place',
                name: 'Mississippi, USA',
              },
              sameAs: [
                'https://youtube.com/@noahlynch',
                'https://twitter.com/NoahLynch17',
                'https://instagram.com/NoahLynchMusic',
              ],
              jobTitle: 'Singer-Songwriter',
              worksFor: {
                '@type': 'Organization',
                name: 'Ready Records',
              },
              genre: ['Blues', 'Neo-Rock', 'Indie', 'Acoustic'],
              instrument: ['Guitar', 'Vocals'],
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': siteUrl,
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Music Releases',
                itemListElement: [
                  {
                    '@type': 'MusicAlbum',
                    name: 'Honest',
                    datePublished: '2025-05-09',
                    recordLabel: 'Ready Records',
                  },
                ],
              },
            }),
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
