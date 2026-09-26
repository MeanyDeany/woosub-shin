import Link from "next/link";
import { PageShell } from "@/components/site-shell";
import { PortfolioIntro } from "@/components/portfolio-editorial";
import { paperConnections } from "@/lib/portfolio-content";
import { metadataFor } from "@/lib/site-metadata";

export const metadata = metadataFor("/papers", "Academic Papers", "Original MSc and seminar papers, their research questions and methods, and how they connect to Woosub Shin’s current trading and market research.");

export default function PapersPage() {
  return <PageShell><div className="folio"><PortfolioIntro eyebrow="Woosub Shin / Academic work" title="The academic foundation."><p>Two papers in financial econometrics and Bitcoin price dynamics. Each is a starting point for the questions I now study in futures markets, not a claim about today’s account performance.</p></PortfolioIntro><section className="folio-wrap" aria-label="Academic papers">
    {paperConnections.map(paper => <article className="folio-paper" key={paper.pdfHref}><div><p className="folio-eyebrow">{paper.type}</p><h2>{paper.title}</h2><p className="folio-lead">{paper.question}</p><p>{paper.methods}</p><div className="folio-links"><a className="folio-primary" href={paper.pdfHref} target="_blank" rel="noreferrer">Read original PDF ↗</a><Link href={paper.projectHref}>Research summary ↗</Link></div></div><dl><dt>Approach</dt><dd>{paper.approach}</dd><dt>Connection to current work</dt><dd>{paper.connection}</dd><dt>Continue reading</dt><dd><Link className="folio-text-link" href={paper.nextHref}>{paper.nextLabel} ↗</Link></dd></dl></article>)}
    <aside className="folio-related"><p>The headings above are portfolio display titles. Original titles, market coverage, sample definitions, and results are governed by the linked PDFs and detailed project pages. These are academic papers, not claims of peer-reviewed journal publication.</p></aside>
  </section><section className="folio-wrap folio-contact"><div><p className="folio-eyebrow">From the papers to the present</p><h2>Research continues<br />beyond the thesis.</h2></div><div className="folio-links"><Link href="/research">Research archive ↗</Link><Link href="/research/microstructure">Current work ↗</Link><Link href="/resume">Background ↗</Link></div></section></div></PageShell>;
}
