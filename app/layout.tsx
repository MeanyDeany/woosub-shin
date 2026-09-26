import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "./navigation.css";
import "./astra.css";
import "./trading-desk.css";
import "./portfolio.css";
import "./portfolio-shared.css";
import "./portfolio-compat.css";

const siteUrl = "https://meanydeany.com";
const siteTitle = "Woosub Shin / Trader / Quantitative Researcher";
const siteDescription = "Woosub Shin is a futures trader and quantitative researcher. Explore his personal trading record, academic papers, market research, and systems in development.";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const themeScript = `
(() => {
  try {
    const stored = window.localStorage.getItem("meanydeany-theme");
    const theme = stored === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {
    document.documentElement.dataset.theme = "dark";
    document.documentElement.style.colorScheme = "dark";
  }
})();
`;
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: "%s | Woosub Shin" },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: "Woosub Shin", title: siteTitle, description: siteDescription },
  twitter: { card: "summary", title: siteTitle, description: siteDescription },
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body className="flex min-h-full flex-col">{children}<Analytics /></body></html>;
}
