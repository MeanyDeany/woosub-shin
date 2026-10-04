import { metadataFor } from "@/lib/site-metadata";
import { CtaLink, EditorialSection, EvidenceBand, PageHero, ResearchTag } from "@/components/editorial";
import { PageShell } from "@/components/site-shell";

export const metadata = metadataFor(
  "/projects/btc-final-system",
  "R15 | Signal Design, Model Development and Validation",
  "A 15-minute BTC research framework by meanydeany: multi-timeframe prediction, volatility-normalized targets, dual-head ensembles, reproducible historical evaluation and source-validated runtime engineering.",
);

const recentMetrics = [
  { label: "RECENT gross return", value: "+108.63%" },
  { label: "Daily Sharpe", value: "1.719" },
  { label: "Minute-open MaxDD", value: "-27.55%" },
  { label: "Gross bp / trade", value: "0.482" },
] as const;
const fullMetrics = [
  { label: "FULL gross return", value: "+1,463.45%" },
  { label: "Daily Sharpe", value: "1.955" },
  { label: "Minute-open MaxDD", value: "-46.03%" },
  { label: "Simulated trades", value: "47,543" },
] as const;

const contributions = [
  { title: "Signal design", text: "I connected 36 predictors across four timeframes to a 15-minute return target, with monthly training and explicit information-availability rules." },
  { title: "Model development", text: "I tested a volatility-normalized target and a scale-aligned dual-head ensemble, then compared growth, drawdown and incremental value on the same historical support." },
  { title: "Comparative evaluation", text: "I used paired block comparisons and calendar subperiods to distinguish a stronger historical point estimate from evidence that warrants replacing the reference model." },
  { title: "Research engineering", text: "I carried the work into deterministic replay, independently reconciled accounting and a runtime with separate market-data admission and audit responsibilities." },
] as const;

const arms = [
  {
    name: "R15 RAW 1X", role: "Reference model", title: "A fixed point of comparison.",
    fullReturn: "+1,463.45%", recentReturn: "+108.63%", fullMdd: "-46.03%", recentMdd: "-27.55%",
    note: "Predicts the raw 15-minute return. Keeping this benchmark fixed makes it possible to measure what each subsequent modeling choice adds.",
  },
  {
    name: "R15 VOLNORM 1X", role: "Volatility-aware modeling", title: "Scale the target to the market.",
    fullReturn: "+6,763.15%", recentReturn: "+157.86%", fullMdd: "-21.48%", recentMdd: "-19.31%",
    note: "Normalizes the prediction target by causal volatility. In the reported replay, it combined higher gross returns with lower minute-open drawdowns than RAW in both periods.",
  },
  {
    name: "R15 BLEND 1X", role: "Dual-head ensemble", title: "Combine signals on a common scale.",
    fullReturn: "+6,001.97%", recentReturn: "+203.15%", fullMdd: "-24.82%", recentMdd: "-22.27%",
    note: "Aligns raw and volatility-normalized scores before equal weighting. It recorded the highest RECENT gross return of these three models, with greater drawdown than VOLNORM.",
  },
] as const;

const protocol = [
  "Market: BTCUSDT Binance USD-M linear perpetual.",
  "Inputs: 36 predictors from completed 1m, 5m, 15m and 1h data.",
  "Training: monthly Ridge estimation using the preceding 365 decision-days and training-only preprocessing.",
  "Timing: decision at D+3s, hypothetical entry at D+60s and exit at D+16m.",
  "Exposure: at most one pending or active position, fixed entry quantity, no overlapping stacking or same-decision reversal.",
  "Evaluation: calendar-marked returns, temporal subperiods and paired 7-day and 30-day block comparisons.",
] as const;

export default function BtcFinalSystemPage() {
  return <PageShell><div className="research-page">
    <PageHero
      eyebrow="meanydeany / Systematic strategy research"
      title="R15: from signal to system."
      intro="I built a 15-minute BTC research framework connecting multi-timeframe prediction, volatility-aware modeling and ensemble design. The work combines reproducible historical evaluation with deterministic replay and market-data validation."
      actions={<><CtaLink href="#challengers" kind="primary">Explore the model development</CtaLink><CtaLink href="#recent">View historical results</CtaLink><CtaLink href="#runtime">Inside the engineering</CtaLink></>}
      metadata={[
        { label: "Market", value: "BTCUSDT perpetual" },
        { label: "Prediction horizon", value: "15 minutes" },
        { label: "Model inputs", value: "36 predictors / 4 timeframes" },
        { label: "Evidence", value: "Historical research / before costs" },
      ]}
    />

    <EditorialSection id="contribution" eyebrow="My contribution" title="Prediction, evaluation and engineering in one research workflow.">
      <div className="research-grid">
        {contributions.map(item => <article key={item.title} className="research-card"><h3>{item.title}</h3><p className="research-prose mt-4">{item.text}</p></article>)}
      </div>
    </EditorialSection>

    <EditorialSection id="challengers" eyebrow="Model development" title="One benchmark. Two extensions."
      intro="I explored two ways to improve the growth and drawdown profile: scale the target by volatility, then combine the raw and normalized forecasts. Each model answers a different design question.">
      <p className="research-note mb-8">Hypothetical gross results, with commission, spread, slippage and funding set to zero. FULL: 1 Jan 2022 to 29 Jul 2026. RECENT: 1 Jan 2025 to 29 Jul 2026. Both periods use UTC dates, include 29 July and are historical development samples, not live account returns.</p>
      <div className="research-grid">
        {arms.map(arm => <article key={arm.name} className="research-card flex flex-col" data-r15-model={arm.name}>
          <p className="research-kicker">{arm.role}</p>
          <h3>{arm.name}</h3>
          <p className="site-strong mt-4">{arm.title}</p>
          <p className="research-prose mt-4">{arm.note}</p>
          <dl className="metadata-list mt-auto pt-6">
            {[["FULL gross return", arm.fullReturn], ["RECENT gross return", arm.recentReturn], ["FULL minute-open MDD", arm.fullMdd], ["RECENT minute-open MDD", arm.recentMdd]].map(([label, value]) => <div key={label} className="metadata-row flex flex-wrap justify-between gap-4 border-t py-3"><dt>{label}</dt><dd className="font-mono">{value}</dd></div>)}
          </dl>
        </article>)}
        <article className="research-card" data-r15-decision>
        <p className="research-kicker">Selection decision</p>
        <h3>Promising extensions.<br />Disciplined model selection.</h3>
        <p className="research-prose mt-4">Both extensions produced positive gross results and useful growth-risk tradeoffs on the tested history. I kept RAW as the reference because the paired comparisons did not establish sufficiently consistent incremental improvement to replace it. That separates a promising design from an established upgrade.</p>
        <details className="mt-5">
          <summary className="research-note cursor-pointer">Read the comparison evidence</summary>
          <p className="research-prose mt-4">VOLNORM passed its own gross-return support requirement. Its paired arithmetic-return uplift over RAW included zero in the FULL 30-day interval and both RECENT intervals. BLEND passed its own gross-growth requirement, but all four paired log-growth intervals versus VOLNORM included zero; its FULL point difference was negative and its minute-open drawdown was greater in both periods. The two studies used different primary estimands, so their tests are not interchangeable.</p>
          <p className="research-note mt-4">The intervals are pointwise and conditional on already-exposed historical paths. They do not correct for all prior research searches or prove future performance. The recorded decisions remain unchanged: RAW is the incumbent; neither extension has been promoted.</p>
        </details>
        </article>
      </div>
    </EditorialSection>

    <EditorialSection id="recent" eyebrow="Reference model / Recent sample" title="The benchmark in numbers."
      intro="R15_RAW_1X, 1 Jan 2025 through 29 Jul 2026: 575 UTC calendar days. Hypothetical, zero-friction performance before commission, spread, slippage and funding.">
      <EvidenceBand items={recentMetrics} />
      <div className="mt-8 flex flex-wrap gap-3"><ResearchTag>16,675 simulated trades</ResearchTag><ResearchTag>51.66% trade win rate</ResearchTag><ResearchTag>30.21% time in position</ResearchTag></div>
      <p className="research-prose mt-7">The average gross result is 0.482 basis points per trade. This connects the prediction research to the next economic question: how much of that small per-trade margin can survive execution costs and fill uncertainty?</p>
    </EditorialSection>

    <EditorialSection id="full" eyebrow="Reference model / Full sample" title="A longer view of growth and risk."
      intro="R15_RAW_1X, 1 Jan 2022 through 29 Jul 2026: 1,671 UTC calendar days. The same hypothetical, zero-friction accounting applies.">
      <EvidenceBand items={fullMetrics} />
      <p className="research-prose mt-7">The FULL replay averaged 0.632 gross basis points per trade. The 2025 result was weaker than 2023, 2024 and partial 2026, which is why the research examines subperiods alongside the aggregate. Drawdown is measured at minute opens; intraminute loss and liquidation paths are not measured here.</p>
    </EditorialSection>

    <EditorialSection id="method" eyebrow="Research method" title="Every result has a timing and accounting contract.">
      <div className="research-grid">
        <article className="research-card"><h3>Time-respecting implementation</h3><ul className="research-prose mt-5 space-y-4">{protocol.map(item => <li key={item}>{item}</li>)}</ul></article>
        <article className="research-card"><h3>Reproducibility and evidence scope</h3>
          <p className="research-prose mt-4">Saved monthly models, deterministic signal replay and independently reconstructed equity paths make the reported results checkable. The BLEND experiment reused both saved model heads and evaluated a fixed combination rule rather than refitting to obtain a better result.</p>
          <p className="research-prose mt-4">R15 began as a post-outcome Ridge-only diagnostic after the C55 payoff primary did not pass. Later development used the same exposed historical sample. Freezing each subsequent comparison improves discipline; it does not turn that history into an untouched holdout.</p>
          <p className="research-note mt-4">Exact minute-open fills are simulation assumptions, not verified maker fills. These studies do not report net executable returns or the performance of the personal account.</p>
        </article>
      </div>
    </EditorialSection>

    <EditorialSection id="runtime" eyebrow="Research engineering" title="From historical replay to verifiable market observations."
      intro="A dedicated source-role runtime separates primary WebSocket observations from mandatory asynchronous REST audits. It checks data identity, timing, consistency and recovery without making the audit a synchronous admission bottleneck.">
      <EvidenceBand items={[
        { label: "Offline checks passed", value: "427 / 427" },
        { label: "Mutation tests passed", value: "20 / 20" },
        { label: "Primary source", value: "WebSocket" },
        { label: "Audit contract", value: "Asynchronous REST" },
      ]} />
      <p className="research-prose mt-7">The 3 Oct 2026 checkpoint comprises 99 inherited checks, 61 policy scenarios and 267 runtime/adversarial checks, plus 20 mutation categories. Model identity and numerical logic stayed fixed while source-handling behavior was validated.</p>
      <p className="research-note mt-4">This is a dated engineering checkpoint, not a live status feed. At that checkpoint, forward-valid origins were 0, forward validation had not passed and LIVE_READY was false. It authorized no trading. Prospective evidence and realistic execution evaluation remain separate steps.</p>
    </EditorialSection>

    <EditorialSection id="sources" eyebrow="Evidence and next step" title="A research portfolio with a traceable result."
      intro="This work connects model design to the practical questions of costs, fills and market-data reliability. The next question is economic translation, not another headline backtest.">
      <p className="research-note">Reviewed 4 Oct 2026 from the completed R15 Alpha V2 and Dual-Head Ensemble V1 reports, with the Source Role Runtime V1 checkpoint dated 3 Oct 2026. A machine-readable summary preserves the reported metrics, assumptions and original decisions. It is a publication snapshot, not a live trading feed.</p>
      <div className="research-actions mt-8"><CtaLink href="/research/r15-summary.json">View the evidence summary</CtaLink><CtaLink href="/research/microstructure">Execution research</CtaLink><CtaLink href="/trading">Personal account record</CtaLink><CtaLink href="/contact">Discuss the research</CtaLink></div>
    </EditorialSection>
  </div></PageShell>;
}
