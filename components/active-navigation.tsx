"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { primaryNavigation } from "@/lib/site-routes";

function isActiveRoute(pathname: string, href: string) {
  if (href === "/") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function ActiveNavigation() {
  const pathname = usePathname();
  const [openedForPath, setOpenedForPath] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const expanded = openedForPath === pathname;

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
        Menu
        <span aria-hidden="true">{expanded ? "−" : "+"}</span>
      </button>
      <nav
        aria-label="Primary navigation"
        id={panelId}
        className={`navigation-panel${expanded ? " navigation-panel--open" : ""}`}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setOpenedForPath(null);
        }}
      >
        <ul className="navigation-links">
          <li className="navigation-home">
            <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
              Home
            </Link>
          </li>
          {primaryNavigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                data-active={isActiveRoute(pathname, item.href) || undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="navigation-utilities">
          <Link href="/resume" className="navigation-utility">
            Resume
          </Link>
          <a href="https://github.com/MeanyDeany" target="_blank" rel="noreferrer" className="navigation-utility">
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
