import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Pockeat",
    description:
      "Fresh fruit bowls, juices, diet bowls, protein shakes and comfort meals from Pockeat Kitchen in Taramani, Chennai.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5fbf2",
    theme_color: "#15583b",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
