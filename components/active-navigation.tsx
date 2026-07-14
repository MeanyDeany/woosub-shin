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
      <ul className="scrollbar-none flex min-w-max items-center gap-0 sm:gap-1">
        {navigation.map((item) => {
          const active = isActiveRoute(pathname, item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-10 items-center border-b px-1 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.1em] transition-colors focus-visible:outline-none sm:px-3 sm:text-[0.76rem] sm:tracking-[0.12em] ${
                  active
                    ? "border-[#42D7F5] text-[#F4F7FB]"
                    : "border-transparent text-[#8996A8] hover:border-[#475466] hover:text-[#DCE3EC]"
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
