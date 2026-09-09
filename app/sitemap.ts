import type { MetadataRoute } from "next";
import { getRouteAlternates, siteRoutes } from "@/lib/site-routes";
import { siteUrl } from "@/lib/site-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes.map((route) => {
    const { languages } = getRouteAlternates(route);
    return {
      url: new URL(route, siteUrl).href,
      ...(languages ? {
        alternates: {
          languages: Object.fromEntries(Object.entries(languages).map(([locale, pathname]) => [locale, new URL(pathname, siteUrl).href])),
        },
      } : {}),
    };
  });
}
