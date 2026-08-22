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
    "MeanyDeany research systems and academic lineage across reproducible research infrastructure, frozen BTC strategy research, financial econometrics, and time-series diagnostics.",
};

const projects = [
  {
    accent: "cyan" as const,
    contribution:
      "An asset-neutral research foundation with immutable contracts, canonical evidence identity, deterministic replay and PnL accounting, frozen search, validation, and explicit historical-to-forward boundaries.",
    href: "/projects/multi-asset-research-lab",
    index: "01",
    methods: [
      "Immutable contracts",
      "Replay / PnL",
      "Frozen search",
      "Deep validation",
      "Forward evidence",
    ],
    question:
      "How should a multi-asset systematic research framework move from data provenance to a retained research system without allowing evidence to silently become execution authority?",
    status: "Flagship research platform",
    title: "Multi-Asset Research Lab",
    type: "Research infrastructure",
  },
  {
    accent: "emerald" as const,
    contribution:
      "A retained BTCUSDT Daily EMA 50/200 long/flat research system with deterministic replay, funding-adjusted accounting, frozen final-system search, thirteen-gate deep validation, and append-only prospective forward observation.",
    href: "/projects/btc-final-system",
    index: "02",
    methods: [
      "Daily EMA 50/200",
      "Funding-adjusted PnL",
      "Cost stress",
      "Deep validation",
      "Forward runtime",
    ],
    question:
      "Can one simple BTC trend-following research system survive frozen search and deep validation, then cross into a prospective forward clock without turning research state into trading permission?",
    status: "Retained system · forward research",
    title: "BTC Final Research System V1",
    type: "Systematic strategy research",
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
        intro="The program now separates an asset-neutral research framework, one retained BTC research system under prospective observation, and the academic econometric work that shaped both."
        metadata={[
          { label: "Flagship", value: "Multi-Asset Research Lab" },
          { label: "Retained system", value: "BTC Final Research System V1" },
          { label: "Forward stage", value: "Prospective research observation" },
          { label: "Boundary", value: "No execution authority" },
        ]}
      />

      <EditorialSection
        eyebrow="Program sequence"
        title="One research program, four layers"
        intro="Each system retains its own provenance, research question, methods, result scope, and boundary. The newest BTC layer is a frozen research system, not a live trading product."
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
            { label: "Models", value: "Model roles stay narrower than strategy claims." },
            { label: "Validation", value: "Search, validation, and forward observation remain separate stages." },
            { label: "Evidence", value: "Provenance and boundaries travel with every result." },
          ]}
        />
      </EditorialSection>
    </PageShell>
  );
}
