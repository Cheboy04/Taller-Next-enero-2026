import type { Metadata } from 'next';
import { Lora, Roboto } from 'next/font/google';
import './globals.css';

import { Footer } from '@/components/global/footer';
import { Header } from '@/components/global/header';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'My IMDB',
  description: 'Movies database',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${lora.variable} bg-slate-50 text-slate-900 antialiased`}
      >
        <Header />
        <main className="min-h-[calc(100vh-120px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
