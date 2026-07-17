"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/content";

function isActiveRoute(pathname: string, href: string) {
  if (href === "/") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function ActiveNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation" className="min-w-0">
      <ul className="scrollbar-none flex min-w-max items-center gap-5 sm:gap-7">
        {navigation.map((item) => {
          const active = isActiveRoute(pathname, item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-10 items-center text-xs font-medium transition-colors focus-visible:outline-none sm:text-[0.82rem] ${
                  active
                    ? "text-[#F5F5F7]"
                    : "text-[#86868B] hover:text-[#F5F5F7]"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
