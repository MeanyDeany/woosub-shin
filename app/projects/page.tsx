import type { Metadata } from "next";
import {
  EditorialSection,
  EvidenceBand,
  PageHero,
  ProjectIndexRow,
} from "@/components/editorial";
import { PageShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "An editorial index of Woosub Shin's quant research infrastructure, financial econometrics, and time-series research projects.",
};

const projects = [
  {
    accent: "cyan" as const,
    contribution:
      "A deterministic pipeline joining volatility forecasts, forward outcomes, append-only evidence, provenance, and operational integrity checks without crossing into execution.",
    href: "/projects/btc-futures-research",
    index: "01",
    methods: ["GARCH", "EGARCH", "GJR-GARCH", "HAR-RV", "Event ledgers"],
    question:
      "How can statistical volatility forecasts become reviewable evidence while remaining strictly separated from strategy permission and trading execution?",
    status: "Public showcase baseline",
    title: "BTC Futures Research Assistant",
    type: "Research infrastructure",
  },
  {
    accent: "blue" as const,
    contribution:
      "An academic comparison of an EGARCH-conditioned framework with otherwise identical intraday logic, treating volatility regime as a risk and admissibility layer.",
    href: "/projects/volatility-regime-filtering",
    index: "02",
    methods: ["NQ", "ES", "EGARCH", "5-minute data", "Robustness"],
    question:
      "Can volatility-regime filtering improve the discipline of an intraday NQ and ES futures framework without treating EGARCH as a direction predictor?",
    status: "MSc thesis",
    title: "Volatility Regime Filtering in Futures Markets",
    type: "Financial econometrics",
  },
  {
    accent: "amber" as const,
    contribution:
      "A compact time-series study applying right-tailed explosive-root diagnostics to identify and interpret periods of explosive Bitcoin price behavior.",
    href: "/projects/bitcoin-bubble-gsadf",
    index: "03",
    methods: ["Bitcoin", "GSADF", "Explosive roots", "Time series"],
    question:
      "How can GSADF testing identify statistically explosive Bitcoin price episodes while keeping diagnostic evidence separate from market recommendations?",
    status: "Seminar paper",
    title: "Bitcoin Bubble Detection with GSADF",
    type: "Crypto-asset diagnostics",
  },
] as const;

export default function ProjectsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Project index"
        title="Research systems, econometrics, and evidence"
        intro="Three projects trace a consistent practice: define the research question, constrain each model's role, and preserve the path from data to interpretation."
        metadata={[
          { label: "Primary", value: "Research infrastructure" },
          { label: "Academic", value: "MSc thesis · seminar paper" },
          { label: "Markets", value: "BTCUSDT · NQ · ES" },
          { label: "Boundary", value: "No execution systems" },
        ]}
      />

      <EditorialSection
        eyebrow="Portfolio sequence"
        title="Editorial project index"
        intro="Project type, question, contribution, methods, and context are kept visible so the scope can be understood before opening a detail page."
      >
        <div>
          {projects.map((project) => (
            <ProjectIndexRow key={project.href} {...project} />
          ))}
        </div>
      </EditorialSection>

      <EditorialSection
        accent="amber"
        eyebrow="Common standard"
        title="What travels across the portfolio"
        tone="deep"
      >
        <EvidenceBand
          items={[
            { label: "Time", value: "Information is aligned to when it was knowable." },
            { label: "Models", value: "Model roles are narrower than strategy claims." },
            { label: "Validation", value: "Comparisons and limitations remain explicit." },
            { label: "Evidence", value: "Provenance and boundaries travel with results." },
          ]}
        />
      </EditorialSection>
    </PageShell>
  );
}
