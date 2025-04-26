import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Noah Lynch | Musician & Singer-Songwriter",
  description:
    "Mississippi-Born Musician, Singer-Songwriter Noah Lynch. Explore music, tour dates, and more.",
  keywords: [
    "Noah Lynch",
    "musician",
    "singer-songwriter",
    "Mississippi",
    "music",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background min-h-screen font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
