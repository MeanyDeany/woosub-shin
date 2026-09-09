import type { Metadata } from "next";
import { getRouteAlternates, type SiteRoute } from "@/lib/site-routes";

export const siteUrl = "https://meanydeany.com";

/** Static page metadata with one human name and only real locale counterparts. */
export function metadataFor(pathname: SiteRoute, title: string, description: string): Metadata {
  const fullTitle = /woosub shin|신우섭/i.test(title) ? title : `${title} | Woosub Shin`;
  const { languages } = getRouteAlternates(pathname);
  const canonical = new URL(pathname, siteUrl).href;
  const alternateLanguages = languages
    ? Object.fromEntries(Object.entries(languages).map(([locale, route]) => [locale, new URL(route, siteUrl).href]))
    : undefined;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical, languages: alternateLanguages },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "Woosub Shin",
      title: fullTitle,
      description,
      locale: pathname === "/ko" || pathname.startsWith("/ko/") ? "ko_KR" : "en_US",
    },
    twitter: { card: "summary", title: fullTitle, description },
  };
}
