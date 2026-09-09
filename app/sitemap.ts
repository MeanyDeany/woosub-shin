import type { MetadataRoute } from "next";
import { siteRoutes } from "@/lib/site-routes";
import { siteUrl } from "@/lib/site-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes.map((route) => ({ url: new URL(route, siteUrl).href }));
}
