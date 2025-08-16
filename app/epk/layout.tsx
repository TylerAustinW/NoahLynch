import type { Metadata } from 'next';
import './epk.css';
import React from 'react';

export const metadata: Metadata = {
  title: 'Noah Lynch - Electronic Press Kit',
  description:
    'Professional EPK for Noah Lynch - Mississippi singer-songwriter blending acoustic soul, soft rock, and alt-pop',
  keywords:
    'Noah Lynch, EPK, Electronic Press Kit, singer-songwriter, acoustic soul, Mississippi music, booking',
  robots: 'index, follow',
  openGraph: {
    title: 'Noah Lynch - Electronic Press Kit',
    description: 'Professional EPK for Noah Lynch - Mississippi singer-songwriter',
    url: 'https://noahlynch.com/epk',
    siteName: 'Noah Lynch Music',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noah Lynch - Electronic Press Kit',
    description: 'Professional EPK for Noah Lynch - Mississippi singer-songwriter',
  },
};

export default function EPKLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-white text-gray-900 print:bg-white">{children}</div>;
}
