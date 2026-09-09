"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleCounterpart, type SiteLocale } from "@/lib/site-routes";

export type { SiteLocale } from "@/lib/site-routes";

export function LanguageSwitcher({ locale }: { locale: SiteLocale }) {
  const pathname = usePathname();
  const counterpart = getLocaleCounterpart(pathname);

  if (!counterpart) {
    return (
      <div className="language-availability">
        <span className="language-availability__note">This page is available in English.</span>
        <Link href="/ko" hrefLang="ko" lang="ko" className="navigation-utility">
          한국어 홈
        </Link>
      </div>
    );
  }

  return (
    <Link
      href={counterpart.href}
      hrefLang={counterpart.locale}
      lang={counterpart.locale}
      aria-label={locale === "ko" ? "Switch to English" : "한국어로 전환"}
      className="navigation-utility"
    >
      {counterpart.locale === "en" ? "EN" : "한국어"}
    </Link>
  );
}
