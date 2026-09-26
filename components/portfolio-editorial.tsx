import Link from "next/link";
import type { ReactNode } from "react";
import { researchConnections } from "@/lib/portfolio-content";

export function PortfolioIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return <header className="folio-intro folio-wrap"><p className="folio-eyebrow">{eyebrow}</p><h1>{title}</h1><div className="folio-lead">{children}</div></header>;
}

export function ResearchConnections() {
  return <nav className="folio-connections" aria-label="How the portfolio connects">
    {researchConnections.map(item => <Link key={item.href} href={item.href}><strong>{item.title}<span aria-hidden="true">↗</span></strong><span>{item.text}</span></Link>)}
  </nav>;
}

export function RelatedWork({ title = "Continue through the work", children }: { title?: string; children: ReactNode }) {
  return <aside className="folio-related"><p className="folio-eyebrow">{title}</p><div className="folio-links">{children}</div></aside>;
}
