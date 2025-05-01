import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import { URL } from 'url';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://noahlynch.vercel.app'),
  openGraph: {
    type: 'website',
    url: 'https://noahlynch.vercel.app/',
    title: 'Noah Lynch | Musician & Singer-Songwriter',
    description: 'Mississippi-Born Musician, Singer-Songwriter',
    siteName: 'Noah Lynch',
    images: [
      {
        url: '/noah-portrait.jpeg',
        width: 960,
        height: 960,
      },
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/noah-portrait.jpeg" sizes="60x60" />
      </head>
      <body className="bg-background relative min-h-screen font-sans antialiased">
        <div className="grain-overlay" />
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
