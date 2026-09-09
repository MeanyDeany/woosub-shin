"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useRef, useState } from "react";
import { LanguageSwitcher, type SiteLocale } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { primaryNavigation, primaryNavigationKo } from "@/lib/site-routes";

function isActiveRoute(pathname: string, href: string) {
  if (href === "/" || href === "/ko") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function ActiveNavigation({ locale = "en" }: { locale?: SiteLocale; showcase?: boolean }) {
  const pathname = usePathname();
  const [openedForPath, setOpenedForPath] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const expanded = openedForPath === pathname;
  const korean = locale === "ko";
  const items = korean ? primaryNavigationKo : primaryNavigation;
  const homeHref = korean ? "/ko" : "/";

  return (
    <div
      className="primary-navigation"
      onKeyDown={(event) => {
        if (event.key === "Escape" && expanded) {
          event.preventDefault();
          setOpenedForPath(null);
          toggleRef.current?.focus();
        }
      }}
    >
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        className="navigation-disclosure"
        onClick={() => setOpenedForPath(expanded ? null : pathname)}
      >
        {korean ? "메뉴" : "Menu"}
        <span aria-hidden="true">{expanded ? "−" : "+"}</span>
      </button>
      <nav
        aria-label={korean ? "주요 탐색" : "Primary navigation"}
        id={panelId}
        className={`navigation-panel${expanded ? " navigation-panel--open" : ""}`}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setOpenedForPath(null);
        }}
      >
        <ul className="navigation-links">
          <li className="navigation-home">
            <Link href={homeHref} aria-current={pathname === homeHref ? "page" : undefined}>
              {korean ? "홈" : "Home"}
            </Link>
          </li>
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                data-active={isActiveRoute(pathname, item.href) || undefined}
              >
                {item.label}
                {item.englishOnly ? <span className="navigation-language">English</span> : null}
              </Link>
            </li>
          ))}
        </ul>
        <div className="navigation-utilities">
          <Link href="/resume" className="navigation-utility">
            {korean ? "이력서" : "Resume"}
            {korean ? <span className="navigation-language">English</span> : null}
          </Link>
          <a href="https://github.com/MeanyDeany" target="_blank" rel="noreferrer" className="navigation-utility">
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <LanguageSwitcher locale={locale} />
          <ThemeToggle locale={locale} />
        </div>
      </nav>
    </div>
  );
}
