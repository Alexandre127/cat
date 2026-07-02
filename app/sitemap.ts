import type { MetadataRoute } from "next";
import { site, guideSlugs } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/diagnostic", "/guides", "/mentions-legales"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  const guideRoutes = guideSlugs.map((slug) => ({
    url: `${site.url}/guides/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [...staticRoutes, ...guideRoutes];
}
