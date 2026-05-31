import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import about from "./about/about.json";
import contact from "./contact/contact.json";
import gallery from "./gallery/gallery.json";
import home from "./home.json";
import menu from "./menu/menu.json";

const pages = [
  { seo: home.seo, priority: 1 },
  { seo: about.seo, priority: 0.82 },
  { seo: menu.seo, priority: 0.92 },
  { seo: gallery.seo, priority: 0.76 },
  { seo: contact.seo, priority: 0.86 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: absoluteUrl(page.seo.canonical),
    lastModified: new Date(),
    changeFrequency: page.seo.canonical === "/" ? "weekly" : "monthly",
    priority: page.priority,
  }));
}
