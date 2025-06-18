import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://www.noahlynch.com";
const siteName = "Noah Lynch Music";
const siteDescription = "Experience the raw talent and soulful music of Noah Lynch. Watch exclusive live studio sessions, explore his latest releases including 'Honest', and discover the Mississippi-born musician's authentic approach to songwriting.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Noah Lynch - Singer-Songwriter & Musician",
    template: `%s | Noah Lynch`,
  },
  description: siteDescription,
  keywords: [
    "Noah Lynch", 
    "musician", 
    "singer-songwriter", 
    "Mississippi musician",
    "blues", 
    "neo-rock",
    "acoustic music", 
    "indie artist", 
    "studio sessions",
    "Honest album",
    "Ready Records",
    "John Mayer inspired",
    "Stevie Ray Vaughan"
  ],
  authors: [{ name: "Noah Lynch" }],
  creator: "Noah Lynch",
  publisher: "Ready Records",
  
  // Open Graph for Facebook, LinkedIn, Discord, Slack
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: "Noah Lynch - Singer-Songwriter & Musician",
    description: siteDescription,
    images: [
      {
        url: "/noah-portrait.jpeg",
        width: 1200,
        height: 630,
        alt: "Noah Lynch - Mississippi-born Singer-Songwriter and Musician",
        type: "image/jpeg",
      },
      {
        url: "/noah-studio.jpeg",
        width: 1080,
        height: 1080,
        alt: "Noah Lynch Music Studio Session",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter/X Cards with actual handles
  twitter: {
    card: "summary_large_image",
    site: "@NoahLynch17",
    creator: "@NoahLynch17",
    title: "Noah Lynch - Singer-Songwriter & Musician",
    description: siteDescription,
    images: ["/noah-portrait.jpeg"],
  },

  // Additional meta for better SEO and social sharing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Additional structured data - updated with modern standards
  other: {
    // Discord embeds - using amber color from site design
    "theme-color": "#d97706",
    
    // General social media
    "author": "Noah Lynch",
    "article:author": "Noah Lynch",
    
    // Modern mobile web app tags (updated from deprecated Apple-specific)
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Noah Lynch",

    // Music-specific properties
    "music:musician": "Noah Lynch",
    "music:album": "Honest",
    "music:release_date": "2025-05-09",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Additional meta tags for enhanced social sharing */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#000000" />
        
        {/* LinkedIn specific (uses OpenGraph) */}
        <meta property="og:type" content="website" />
        
        {/* Discord embed color */}
        <meta name="theme-color" content="#d97706" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={siteUrl} />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/noah-portrait.jpeg" />
        
        {/* Open Graph fallback meta tags for better compatibility */}
        <meta property="og:image:secure_url" content={`${siteUrl}/noah-portrait.jpeg`} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        
        {/* Twitter specific fallbacks */}
        <meta name="twitter:image:alt" content="Noah Lynch - Mississippi-born Singer-Songwriter" />
        
        {/* Music-specific meta tags */}
        <meta property="music:creator" content="Noah Lynch" />
        <meta property="music:album" content="Honest" />
        <meta property="music:release_date" content="2025-05-09" />
      </head>
      <body className={inter.className}>
        {children}
        
        {/* JSON-LD structured data for enhanced search results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Noah Lynch",
              alternateName: ["Noah Lynch Music", "Noah Lynch Artist"],
              description: "Mississippi-born singer-songwriter blending blues and neo-rock, inspired by John Mayer and Stevie Ray Vaughan",
              url: siteUrl,
              image: `${siteUrl}/noah-portrait.jpeg`,
              birthPlace: {
                "@type": "Place",
                name: "Mississippi, USA"
              },
              sameAs: [
                "https://youtube.com/@noahlynch",
                "https://twitter.com/NoahLynch17",
                "https://instagram.com/NoahLynchMusic",
              ],
              jobTitle: "Singer-Songwriter",
              worksFor: {
                "@type": "Organization",
                name: "Ready Records",
              },
              genre: ["Blues", "Neo-Rock", "Indie", "Acoustic"],
              instrument: ["Guitar", "Vocals"],
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": siteUrl,
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Music Releases",
                itemListElement: [
                  {
                    "@type": "MusicAlbum",
                    name: "Honest",
                    datePublished: "2025-05-09",
                    recordLabel: "Ready Records"
                  }
                ]
              }
            }),
          }}
        />
      </body>
    </html>
  );
}