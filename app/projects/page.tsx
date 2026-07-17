import type { Metadata } from "next";
import {
  EditorialSection,
  EvidenceBand,
  PageHero,
  ProjectIndexRow,
} from "@/components/editorial";
import { PageShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Research Systems",
  description:
    "MeanyDeany research systems and academic lineage across volatility infrastructure, financial econometrics, and time-series diagnostics.",
};

const projects = [
  {
    accent: "cyan" as const,
    contribution:
      "A deterministic BTCUSDT pipeline joining volatility forecasts, forward outcomes, append-only evidence, provenance, and operational integrity checks within a broader academic multi-asset lineage—without crossing into execution.",
    href: "/projects/btc-futures-research",
    index: "01",
    methods: ["GARCH", "EGARCH", "GJR-GARCH", "HAR-RV", "Event ledgers"],
    question:
      "How can statistical volatility forecasts become reviewable evidence while remaining strictly separated from strategy permission and trading execution?",
    status: "Flagship research infrastructure",
    title: "Multi-Asset Volatility Research System",
    type: "Research infrastructure",
  },
  {
    accent: "blue" as const,
    contribution:
      "An academic comparison across NQ, ES, and Crude Oil (CL) futures using an EGARCH-conditioned framework with otherwise identical intraday logic, treating volatility regime as a risk and admissibility layer.",
    href: "/projects/volatility-regime-filtering",
    index: "02",
    methods: ["NQ", "ES", "Crude Oil (CL)", "EGARCH", "5-minute data", "Robustness"],
    question:
      "Can volatility-regime filtering improve the discipline of an intraday NQ, ES, and Crude Oil (CL) futures framework without treating EGARCH as a direction predictor?",
    status: "Academic foundation",
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
    status: "Earlier time-series research",
    title: "Bitcoin Bubble Detection with GSADF",
    type: "Crypto-asset diagnostics",
  },
] as const;

export default function ProjectsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="MeanyDeany · Research systems"
        title="Research systems and academic lineage"
        intro="The program connects an earlier diagnostic study, an academic multi-asset financial-econometrics foundation, and a current public BTCUSDT evidence infrastructure."
        metadata={[
          { label: "Flagship", value: "Multi-Asset Volatility Research System" },
          { label: "Foundation", value: "MSc thesis · seminar paper" },
          { label: "Market contexts", value: "BTCUSDT current · NQ · ES · Crude Oil (CL) academic" },
          { label: "Boundary", value: "No execution systems" },
        ]}
      />

      <EditorialSection
        eyebrow="Program sequence"
        title="One research program, three stages"
        intro="Each system retains its provenance, research question, methods, and bounded contribution."
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
        title="What travels across the program"
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
