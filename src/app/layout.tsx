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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "HTML: HyperText Markup Language | MDN",
  description:
    "HTML (HyperText Markup Language) is the most basic building block of the Web. It defines the meaning and structure of web content. Other technologies besides HTML are generally used to describe a web page's appearance/presentation (CSS) or functionality/behavior (JavaScript).",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "MDN Web Docs",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    title: "HTML: HyperText Markup Language | MDN",
    description:
      "HTML (HyperText Markup Language) is the most basic building block of the Web. It defines the meaning and structure of web content. Other technologies besides HTML are generally used to describe a web page's appearance/presentation (CSS) or functionality/behavior (JavaScript).",
    images: [
      {
        url: "/1.png",
        width: 1024,
        height: 1024,
        alt: "Preview image",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary",
    creator: "MozDevNet",
    title: "HTML: HyperText Markup Language | MDN",
    description:
      "HTML (HyperText Markup Language) is the most basic building block of the Web. It defines the meaning and structure of web content. Other technologies besides HTML are generally used to describe a web page's appearance/presentation (CSS) or functionality/behavior (JavaScript).",
    images: ["/1.png"],
  },
  alternates: {
    canonical: "https://developer.mozilla.org/en-US/docs/Web/HTML",
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
