import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer/Footer";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { FloatingWhatsApp } from "@/components/reusable/FloatingWhatsApp";
import { defaultOgImage, seoKeywordAliases, siteConfig } from "@/lib/constants";
import "./globals.css";

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: "Pockeat Kitchen | Healthy Food, Fruit Bowls and Juices in Chennai",
    template: "%s | Pockeat Kitchen",
  },
  description:
    "Order fresh fruit bowls, juices, diet bowls, protein shakes and healthy comfort meals from Pockeat Kitchen in Taramani, Chennai.",
  keywords: seoKeywordAliases,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Pockeat Kitchen | Healthy Food, Fruit Bowls and Juices in Chennai",
    description:
      "Fresh bowls, juices, protein shakes and comfort meals prepared in Taramani, Chennai.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: defaultOgImage,
        width: 1254,
        height: 1254,
        alt: "Pockeat Kitchen logo and healthy food illustration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pockeat Kitchen | Healthy Food in Chennai",
    description:
      "Fresh fruit bowls, juices, diet bowls and protein shakes from Pockeat Kitchen.",
    images: [defaultOgImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#15583b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${bodyFont.variable} ${displayFont.variable}`}
    >
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
