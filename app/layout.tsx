import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import { ToastContainer } from '@/components/ui/Toast';

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
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-plugin-light text-plugin-text font-sans antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CartDrawer />
        <ToastContainer />
      </body>
    </html>
  );
}
