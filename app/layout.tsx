import type { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

let title = "AI Roaster - Get Your Website & Profile Savage Roasted";
let description = "Drop your website URL or bio and let AI brutally roast your pride.";
let url = "https://roasterai.vercel.app/";
let ogimage = "https://roasterai.vercel.app/og-image.png";
let sitename = "roasterai.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: url,
    siteName: sitename,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <PlausibleProvider domain="roasterai.vercel.app" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
  {children}

  {/* Adsterra Social Bar */}
  <Script 
    src="https://pl31351418.profitableratecpmnetwork.com/66/8f/a6/668fa68145ae78660bbdec313a9d0e20.js" 
    strategy="afterInteractive" 
  />
</body>
    </html>
  );
}
