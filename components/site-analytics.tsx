"use client";

import { Analytics } from "@vercel/analytics/next";
import type { BeforeSendEvent } from "@vercel/analytics";

export function SiteAnalytics() {
  return (
    <Analytics
      beforeSend={(event: BeforeSendEvent) => {
        try {
          const url = new URL(event.url);
          if (url.pathname === "/admin" || url.pathname.startsWith("/admin/")) {
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
