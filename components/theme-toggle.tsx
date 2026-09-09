"use client";

import { useSyncExternalStore } from "react";
import type { SiteLocale } from "@/lib/site-routes";

type Theme = "light" | "dark";
const THEME_CHANGE_EVENT = "meanydeany-theme-change";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  try {
    window.localStorage.setItem("meanydeany-theme", theme);
  } catch {
    // The current page still changes when browser storage is unavailable.
  }
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

function getThemeSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function getServerThemeSnapshot(): Theme {
  return "dark";
}

function subscribeToTheme(onStoreChange: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
}

export function ThemeToggle({ locale = "en" }: { locale?: SiteLocale }) {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);
  const nextTheme: Theme = theme === "light" ? "dark" : "light";
  const label = locale === "ko"
    ? `${nextTheme === "light" ? "라이트" : "다크"} 테마로 전환`
    : `Switch to ${nextTheme} theme`;

  return (
    <button type="button" aria-label={label} title={label} onClick={() => applyTheme(nextTheme)} className="navigation-theme">
      <span aria-hidden="true">{theme === "dark" ? "◐" : "◑"}</span>
      <span>{locale === "ko" ? "테마" : "Theme"}</span>
    </button>
  );
}
