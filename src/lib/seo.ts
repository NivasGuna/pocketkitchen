import type { Metadata } from "next";
import { defaultOgImage, seoKeywordAliases, siteConfig } from "@/lib/constants";

export type PageSeo = {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
  };
  twitter?: {
    title?: string;
    description?: string;
    image?: string;
  };
};

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export function createPageMetadata(seo: PageSeo): Metadata {
  const ogImage = seo.openGraph?.image ?? defaultOgImage;
  const ogTitle = seo.openGraph?.title ?? seo.title;
  const ogDescription = seo.openGraph?.description ?? seo.description;
  const twitterImage = seo.twitter?.image ?? ogImage;
  const keywords = Array.from(
    new Set([...(seo.keywords ?? []), ...seoKeywordAliases])
  );

  return {
    metadataBase: new URL(siteConfig.url),
    title: seo.title,
    description: seo.description,
    keywords,
    alternates: {
      canonical: seo.canonical,
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
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: absoluteUrl(seo.canonical),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1254,
          height: 1254,
          alt: seo.openGraph?.imageAlt ?? siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.twitter?.title ?? ogTitle,
      description: seo.twitter?.description ?? ogDescription,
      images: [twitterImage],
    },
  };
}
