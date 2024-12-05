import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './_providers';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { headers } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      template: '%s | CYTunes',
      default: 'CYTunes',
    },
    description: 'Music Community',
    icons: {
      icon: '/music.ico',
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || ''),
    alternates: {
      types: {
        preconnect: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        'dns-prefetch': process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
