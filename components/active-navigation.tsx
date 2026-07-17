"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/lib/content";

function isActiveRoute(pathname: string, href: string) {
  if (href === "/") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function ActiveNavigation() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenMenu(null);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <nav ref={navRef} aria-label="Primary navigation" className="min-w-0">
      <ul className="scrollbar-none flex min-w-max items-center gap-3 sm:gap-6">
        {navigation.map((item) => {
          const active = isActiveRoute(pathname, item.href);
          const activeClass = active ? "theme-nav-link--active" : "";
          const hasChildren = "children" in item && item.children.length > 0;

          if (!hasChildren) {
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`theme-nav-link ${activeClass} inline-flex min-h-10 items-center text-xs font-medium transition-colors focus-visible:outline-none sm:text-[0.82rem]`}
                >
                  {item.label}
                </Link>
              </li>
            );
          }

          const expanded = openMenu === item.href;
          const panelId = `submenu-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

          return (
            <li
              key={item.href}
              className="header-menu"
              onMouseEnter={() => setOpenMenu(item.href)}
              onMouseLeave={() => setOpenMenu(null)}
              onFocus={() => setOpenMenu(item.href)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setOpenMenu(null);
                }
              }}
            >
              <div className="header-menu__top">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`theme-nav-link ${activeClass} header-menu__parent-link inline-flex min-h-10 items-center text-xs font-medium transition-colors focus-visible:outline-none sm:text-[0.82rem]`}
                  onClick={() => setOpenMenu(null)}
                >
                  {item.label}
                </Link>
                <button
                  type="button"
                  aria-label={`${expanded ? "Close" : "Open"} ${item.label} submenu`}
                  aria-expanded={expanded}
                  aria-haspopup="menu"
                  aria-controls={panelId}
                  className="theme-nav-link header-menu__toggle"
                  onClick={() => setOpenMenu(expanded ? null : item.href)}
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
                        onClick={() => setOpenMenu(null)}
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
