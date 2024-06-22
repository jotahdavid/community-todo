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

      <body className={cn(raleway.className, vt323.variable, 'h-full min-h-[100vh]')}>{children}</body>
    </html>
  );
}
