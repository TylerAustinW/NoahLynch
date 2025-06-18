import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://noahlynchmusic.com"; // Replace with actual domain
const siteName = "Noah Lynch Music";
const siteDescription = "Experience the raw talent and soulful music of Noah Lynch. Watch exclusive live studio sessions, explore his latest releases, and discover the artist behind the music.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: ["Noah Lynch", "musician", "singer-songwriter", "live sessions", "acoustic music", "indie artist", "studio sessions"],
  authors: [{ name: "Noah Lynch" }],
  creator: "Noah Lynch",
  publisher: "Noah Lynch Music",
  
  // Open Graph for Facebook, LinkedIn, Discord, Slack
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: "/og-image.jpg", // 1200x630 recommended
        width: 1200,
        height: 630,
        alt: "Noah Lynch - Singer-Songwriter and Musician",
        type: "image/jpeg",
      },
      {
        url: "/og-image-square.jpg", // 1080x1080 for Instagram/square formats
        width: 1080,
        height: 1080,
        alt: "Noah Lynch Music",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter/X Cards
  twitter: {
    card: "summary_large_image",
    site: "@noahlynchmusic", // Replace with actual Twitter handle
    creator: "@noahlynchmusic",
    title: siteName,
    description: siteDescription,
    images: ["/og-image.jpg"],
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

  // Verification meta tags (add when available)
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },

  // Additional structured data
  other: {
    // Discord embeds
    "theme-color": "#d97706", // Amber color from design
    
    // Slack unfurling
    "slack-app-id": "", // Add if you have a Slack app
    
    // General social media
    "author": "Noah Lynch",
    "article:author": "Noah Lynch",
    "music:musician": "Noah Lynch",
    
    // Apple specific
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": siteName,
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
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* LinkedIn specific (uses OpenGraph) */}
        <meta property="og:type" content="website" />
        
        {/* Discord embed color */}
        <meta name="theme-color" content="#d97706" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/noah-portrait.jpeg" as="image" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={siteUrl} />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
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
              alternateName: "Noah Lynch Music",
              description: siteDescription,
              url: siteUrl,
              image: `${siteUrl}/noah-portrait.jpeg`,
              sameAs: [
                "https://youtube.com/@noahlynch",
                "https://twitter.com/noahlynchmusic", // Replace with actual
                "https://instagram.com/noahlynchmusic", // Replace with actual
                "https://facebook.com/noahlynchmusic", // Replace with actual
              ],
              jobTitle: "Singer-Songwriter",
              worksFor: {
                "@type": "Organization",
                name: "Independent Artist",
              },
              genre: ["Indie", "Acoustic", "Singer-Songwriter"],
              instrument: ["Guitar", "Vocals"],
            }),
          }}
        />
      </body>
    </html>
  );
}