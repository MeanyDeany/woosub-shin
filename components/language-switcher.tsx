"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type SiteLocale = "en" | "ko";

function counterpartPath(pathname: string, locale: SiteLocale) {
  if (locale === "ko") {
    const englishPath = pathname.replace(/^\/ko(?=\/|$)/, "");
    return englishPath || "/";
  }

  return pathname === "/" ? "/ko" : `/ko${pathname}`;
}

export function LanguageSwitcher({ locale }: { locale: SiteLocale }) {
  const pathname = usePathname();
  const targetLocale = locale === "ko" ? "en" : "ko";
  const label = locale === "ko" ? "EN" : "한국어";

  return (
    <Link
      href={counterpartPath(pathname, locale)}
      hrefLang={targetLocale}
      lang={targetLocale}
      aria-label={locale === "ko" ? "Switch to English" : "한국어로 전환"}
      className="theme-nav-link inline-flex min-h-9 shrink-0 items-center rounded-full border border-[#7187AB]/20 px-3 text-[0.68rem] font-semibold transition-colors hover:border-[#2580D8]/45"
    >
      {label}
    </Link>
  );
}
