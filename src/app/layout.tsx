import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  preload: true,
});

export const metadata: Metadata = {
  title: 'Solar Host Project',
  description: 'Solar host project',
  icons: [
    { rel: 'icon', url: '/pwa-icons/icon-512x512.png' },
    { rel: 'apple-touch-icon', url: '/pwa-icons/icon-512x512.png' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} h-screen antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
