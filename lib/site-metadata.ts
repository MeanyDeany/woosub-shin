import type { Metadata } from "next";
import type { SiteRoute } from "@/lib/site-routes";

export const siteUrl = "https://meanydeany.com";

/** Static metadata for the English public release, without language alternates. */
export function metadataFor(pathname: SiteRoute, title: string, description: string): Metadata {
  const fullTitle = /woosub shin/i.test(title) ? title : `${title} | Woosub Shin`;
  const canonical = new URL(pathname, siteUrl).href;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "Woosub Shin",
      title: fullTitle,
      description,
      locale: "en_US",
    },
    twitter: { card: "summary", title: fullTitle, description },
  };
}
