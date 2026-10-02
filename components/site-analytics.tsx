"use client";

import { Analytics } from "@vercel/analytics/next";
import type { BeforeSendEvent } from "@vercel/analytics";
import { isOwnerBrowserExcluded } from "@/lib/owner-analytics";

export function SiteAnalytics() {
  return (
    <Analytics
      beforeSend={(event: BeforeSendEvent) => {
        try {
          const url = new URL(event.url);
          if (url.pathname === "/admin" || url.pathname.startsWith("/admin/")) {
            return null;
          }
          if (isOwnerBrowserExcluded(window.localStorage)) {
            return null;
          }
        } catch {
          return event;
        }
        return event;
      }}
    />
  );
}
