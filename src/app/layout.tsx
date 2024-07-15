import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./_providers";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | CYTunes",
    default: "CYTunes"
  },
  description: "Music Community",
  icons: {
    icon: "/music.ico"
  }
};

export default function RootLayout({
  children
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
