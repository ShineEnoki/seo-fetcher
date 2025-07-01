import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SEO Fetcher",
  description: "A simple web application that fetches and displays SEO-related data from any given URL. Developed by Daung.",
  keywords: "SEO Fetcher, SEO, Fetcher, SEO Data, SEO Analysis, SEO Optimization",
  authors: [
    {
      name: "Daung",
      url: "https://github.com/ShineEnoki",
    },
  ],
  openGraph: {
    title: "SEO Fetcher",
    description: "A simple web application that fetches and displays SEO-related data from any given URL. Developed by Daung.",
    type: "website",
    locale: "en_US",
    siteName: "SEO Fetcher",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
