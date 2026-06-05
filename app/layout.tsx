import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://chechnology.com'),
  title: {
    default: 'Chechnology — Building Africa\'s Future Through Technology',
    template: '%s | Chechnology',
  },
  description:
    'Chechnology develops innovative software solutions, empowers African talent, and creates opportunities that transcend borders.',
  keywords: ['Africa', 'technology', 'software', 'startups', 'innovation', 'talent', 'founders'],
  authors: [{ name: 'Chechnology' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Chechnology',
    title: 'Chechnology — Building Africa\'s Future Through Technology',
    description:
      'Innovative software solutions, empowered African talent, and opportunities that transcend borders.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Chechnology' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chechnology',
    description: 'Building Africa\'s Future Through Technology',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${jetbrains.variable} dark`} suppressHydrationWarning>
      <body className="bg-obsidian-950 text-obsidian-100 font-body antialiased">
        {children}
      </body>
    </html>
  );
}
