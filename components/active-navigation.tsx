"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, navigationKo } from "@/lib/content";
import type { SiteLocale } from "@/components/language-switcher";

function isActiveRoute(pathname: string, href: string) {
  if (href === "/" || href === "/ko") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function ActiveNavigation({ locale = "en" }: { locale?: SiteLocale }) {
  const pathname = usePathname();
  const [openMenuState, setOpenMenuState] = useState<{
    href: string;
    pathname: string;
  } | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const openMenu = openMenuState?.pathname === pathname ? openMenuState.href : null;
  const items = locale === "ko" ? navigationKo : navigation;

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenuState(null);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      const openPanel = navRef.current?.querySelector<HTMLElement>(
        ".header-menu__panel--open",
      );
      if (!openPanel) return;

      const toggle = openPanel
        .closest(".header-menu")
        ?.querySelector<HTMLButtonElement>(".header-menu__toggle");
      event.preventDefault();
      setOpenMenuState(null);
      toggle?.focus();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label={locale === "ko" ? "주요 탐색" : "Primary navigation"}
      className="min-w-0"
    >
      <ul className="scrollbar-none flex min-w-max items-center gap-3 sm:gap-6">
        {items.map((item) => {
          const active = isActiveRoute(pathname, item.href);
          const activeClass = active ? "theme-nav-link--active" : "";
          const hasChildren = "children" in item && item.children.length > 0;

          if (!hasChildren) {
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`theme-nav-link ${activeClass} inline-flex min-h-10 items-center text-xs font-medium transition-colors sm:text-[0.82rem]`}
                >
                  {item.label}
                </Link>
              </li>
            );
          }

          const expanded = openMenu === item.href;
          const panelId = `submenu-${item.href.replace(/[^a-z0-9]+/gi, "-")}`;
          const alignmentClass = item.href.endsWith("/research") ? "header-menu--align-right" : "";

          return (
            <li
              key={item.href}
              className={`header-menu ${alignmentClass}`}
              onMouseEnter={() => setOpenMenuState({ href: item.href, pathname })}
              onMouseLeave={() => setOpenMenuState(null)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setOpenMenuState(null);
                }
              }}
            >
              <div className="header-menu__top">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`theme-nav-link ${activeClass} header-menu__parent-link inline-flex min-h-10 items-center text-xs font-medium transition-colors sm:text-[0.82rem]`}
                  onClick={() => setOpenMenuState(null)}
                  onFocus={() => setOpenMenuState({ href: item.href, pathname })}
                >
                  {item.label}
                </Link>
                <button
                  type="button"
                  aria-label={
                    locale === "ko"
                      ? `${item.label} 하위 메뉴 ${expanded ? "닫기" : "열기"}`
                      : `${expanded ? "Close" : "Open"} ${item.label} submenu`
                  }
                  aria-expanded={expanded}
                  aria-haspopup="menu"
                  aria-controls={panelId}
                  className="theme-nav-link header-menu__toggle"
                  onClick={() =>
                    setOpenMenuState(expanded ? null : { href: item.href, pathname })
                  }
                >
                  <span aria-hidden="true" className="header-menu__chevron">⌄</span>
                </button>
              </div>

              <div
                id={panelId}
                className={`header-menu__panel ${expanded ? "header-menu__panel--open" : ""}`}
              >
                <p className="header-menu__eyebrow">{item.label}</p>
                <ul role="menu" className="header-menu__list">
                  {item.children.map((child) => (
                    <li key={child.href} role="none">
                      <Link
                        href={child.href}
                        role="menuitem"
                        className="header-menu__link"
                        onClick={() => setOpenMenuState(null)}
                      >
                        <span className="header-menu__label">{child.label}</span>
                        <span className="header-menu__detail">{child.detail}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
