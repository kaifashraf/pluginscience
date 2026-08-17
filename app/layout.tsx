import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ToastContainer } from '@/components/ui/Toast';

import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PluginScience — Engineer. Code. Fly.',
  description:
    'PluginScience is an advanced drone engineering platform offering hands-on workshops, custom drone kits, hardware components, and autonomous flight software. Build, code, and fly precision aerial vehicles.',
  keywords: [
    'drone workshop',
    'quadcopter assembly',
    'FPV drone',
    'autonomous drone',
    'YOLOv8',
    'flight controller',
    'drone kit',
    'PluginScience',
  ],
  openGraph: {
    title: 'PluginScience — Engineer. Code. Fly.',
    description:
      'Advanced drone engineering platform. Workshops, kits, hardware, and autonomous flight technology.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${cormorant.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/favicon.svg`} type="image/svg+xml" />
        <link rel="preload" as="image" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/hero/frames-lowres/frame_001.webp`} fetchPriority="high" />
      </head>
      <body className="bg-plugin-light text-plugin-text font-sans antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
