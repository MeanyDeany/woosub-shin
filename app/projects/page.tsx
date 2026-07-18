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
    "MeanyDeany research systems and academic lineage across reproducible research infrastructure, volatility validation, financial econometrics, and time-series diagnostics.",
};

const projects = [
  {
    accent: "cyan" as const,
    contribution:
      "An asset-neutral research foundation with immutable contracts, canonical dataset and experiment identity, controlled public-data acquisition, deterministic normalization, persistent run bundles, and offline verification before any experiment runner exists.",
    href: "/projects/multi-asset-research-lab",
    index: "01",
    methods: [
      "Immutable contracts",
      "Canonical hashes",
      "Controlled HTTPS",
      "Run bundles",
      "Offline verification",
    ],
    question:
      "How should a multi-asset research framework prove data identity, provenance, reproducibility, and failure boundaries before it is allowed to execute experiments?",
    status: "Flagship infrastructure build",
    title: "Multi-Asset Research Lab",
    type: "Research infrastructure",
  },
  {
    accent: "emerald" as const,
    contribution:
      "A separate BTCUSDT freezer-validation system joining volatility forecasts, forward outcomes, append-only evidence, provenance, maturity review, and operational integrity checks without crossing into strategy or execution authority.",
    href: "/projects/btc-futures-research",
    index: "02",
    methods: ["GARCH", "EGARCH", "GJR-GARCH", "HAR-RV", "Forward validation"],
    question:
      "How can BTCUSDT volatility research accumulate reviewable forward evidence while remaining strictly separated from entry permission, strategy approval, and trading execution?",
    status: "Freezer validation system",
    title: "BTC Futures Research System",
    type: "Operational research evidence",
  },
  {
    accent: "blue" as const,
    contribution:
      "An academic comparison across NQ, ES, and Crude Oil (CL) futures using an EGARCH-conditioned framework with otherwise identical intraday logic, treating volatility regime as a risk and admissibility layer.",
    href: "/projects/volatility-regime-filtering",
    index: "03",
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
    index: "04",
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
        intro="The program now separates an asset-neutral research framework, a dedicated BTC freezer-validation system, and the academic econometric work that shaped both."
        metadata={[
          { label: "Flagship", value: "Multi-Asset Research Lab" },
          { label: "Live research", value: "BTCUSDT freezer validation" },
          { label: "Foundation", value: "MSc thesis · seminar paper" },
          { label: "Boundary", value: "No execution systems" },
        ]}
      />

      <EditorialSection
        eyebrow="Program sequence"
        title="One research program, four layers"
        intro="Each system retains its own repository boundary, provenance, research question, methods, and bounded contribution."
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
