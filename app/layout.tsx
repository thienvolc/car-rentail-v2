import type { Metadata } from 'next';
import {  Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import Footer from '@/components/layout/footer';

const beVietnamPro = Be_Vietnam_Pro({
  variable: '--font-be-vietnam-pro',
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  fallback: ['system-ui', 'sans-serif'],
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: 'Dashspace',
  description: 'Car rental management system',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${beVietnamPro.className} antialiased`}>
        <main className='min-h-screen'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
