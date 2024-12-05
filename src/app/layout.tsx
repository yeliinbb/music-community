import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './_providers';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | CYTunes',
    default: 'CYTunes',
  },
  description: 'Music Community',
  icons: {
    icon: '/music.ico',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || ''),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL} crossOrigin="anonymous" />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
      </Head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
