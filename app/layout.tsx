import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Noah Lynch | Musician & Singer-Songwriter',
  description: 'Mississippi-Born Musician, Singer-Songwriter',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Noah Lynch | Musician & Singer-Songwriter</title>
        <meta
          name="description"
          content="Mississippi-Born Musician, Singer-Songwriter"
        />
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
