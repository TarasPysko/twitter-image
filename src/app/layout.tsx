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

const defaultSiteUrl = "https://twitter-image.vercel.app";
const socialImageUrl =
  "https://cdn.betstrike.com/public/uploads/large_ru_rich_now_deal_with_it_ebd0518b08.png";
const socialTitle = "Market Pulse: Momentum Is Back";
const socialDescription =
  "Fresh setups are forming across majors, and volatility is waking up - perfect timing to track the next breakout.";

function getSiteUrl(): string {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    defaultSiteUrl;

  const candidate = rawUrl.includes("://") ? rawUrl : `https://${rawUrl}`;

  try {
    return new URL(candidate).toString();
  } catch {
    return defaultSiteUrl;
  }
}

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: socialTitle,
  description: socialDescription,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "twitter-image",
    url: siteUrl,
    title: socialTitle,
    description: socialDescription,
    images: [
      {
        url: socialImageUrl,
        width: 1200,
        height: 630,
        alt: "Market pulse preview card",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: socialDescription,
    images: [socialImageUrl],
  },
  other: {
    "twitter:image:src": socialImageUrl,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
