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

const socialImageUrl =
  "https://cdn.betstrike.com/public/uploads/large_ru_rich_now_deal_with_it_ebd0518b08.png";
const socialTitle = "Market Pulse: Momentum Is Back";
const socialDescription =
  "Fresh setups are forming across majors, and volatility is waking up - perfect timing to track the next breakout.";

export const metadata: Metadata = {
  title: socialTitle,
  description: socialDescription,
  openGraph: {
    title: socialTitle,
    description: socialDescription,
    images: [socialImageUrl],
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
