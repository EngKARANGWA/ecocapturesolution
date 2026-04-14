import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const siteUrl = 'https://ecocapturesolution.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | EcoCapture Solutions Ltd',
    default: 'EcoCapture Solutions Ltd - Climate Tech for Africa',
  },
  description:
    "EcoCapture Solutions Ltd turns CO₂ into opportunity for Africa's future. Affordable carbon capture technology for agriculture, greenhouse farming, biochar fertilizers, and climate action - built in Rwanda.",
  keywords: [
    'CO2 capture Africa',
    'carbon capture Rwanda',
    'climate tech Africa',
    'biochar fertilizer Rwanda',
    'greenhouse CO2 enrichment',
    'sustainable agriculture Africa',
    'carbon neutral Africa',
    'EcoCapture Solutions',
    'circular economy Rwanda',
    'climate smart agriculture',
  ],
  authors: [{ name: 'EcoCapture Solutions Ltd', url: siteUrl }],
  creator: 'EcoCapture Solutions Ltd',
  publisher: 'EcoCapture Solutions Ltd',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'EcoCapture Solutions Ltd',
    title: 'EcoCapture Solutions Ltd - Climate Tech for Africa',
    description:
      "Turning CO₂ into Opportunity for Africa's Future. Affordable CO₂ capture for agriculture, industry, and climate action - built in Rwanda.",
    images: [
      {
        url: '/assets/hero/hero-ecocapture-new.png',
        width: 1200,
        height: 630,
        alt: 'EcoCapture Solutions Ltd — Climate Tech for Africa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EcoCapture Solutions Ltd - Climate Tech for Africa',
    description:
      "Turning CO₂ into Opportunity for Africa's Future. Affordable CO₂ capture for agriculture, industry, and climate action.",
    images: ['/assets/hero/hero-ecocapture-new.png'],
  },
  icons: {
    icon: '/assets/logos/logo-ecocapture.png',
    shortcut: '/assets/logos/logo-ecocapture.png',
    apple: '/assets/logos/logo-ecocapture.png',
  },
  category: 'technology',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
