import type { Metadata } from 'next';
import { Raleway, VT323 } from 'next/font/google';
import './globals.css';
import { cn } from '@/utils/cn';

const raleway = Raleway({ subsets: ['latin'] });
const vt323 = VT323({ subsets: ['latin'], weight: '400', variable: '--font-vt323' });

export const metadata: Metadata = {
  title: 'ServerdeMine',
  description: 'Um servidor de mine.',
  robots: 'noindex',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <link rel="icon" href="/favicon.png" />

      <meta property="og:url" content="https://site.serverdemine.online" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="ServerdeMine" />
      <meta property="og:site_name" content="ServerdeMine" />
      <meta property="og:description" content="Um servidor de mine." />
      <meta property="og:image" content="/banner.webp" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="site.serverdemine.online" />
      <meta property="twitter:url" content="https://site.serverdemine.online" />
      <meta name="twitter:title" content="ServerdeMine" />
      <meta name="twitter:description" content="Um servidor de mine." />
      <meta name="twitter:image" content="/banner.webp" />

      <body className={cn(raleway.className, vt323.variable, 'h-full min-h-[100vh]')}>{children}</body>
    </html>
  );
}
