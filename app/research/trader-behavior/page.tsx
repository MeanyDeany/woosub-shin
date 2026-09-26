import Link from "next/link";
import { PageShell } from "@/components/site-shell";
import { PortfolioIntro, RelatedWork } from "@/components/portfolio-editorial";
import { metadataFor } from "@/lib/site-metadata";

export const metadata = metadataFor("/research/trader-behavior", "Trading Decisions and Behavioral ML", "A case study linking personal futures trading history to chronological direction-imitation tests, separate entry-quality diagnostics, and read-only forward observation.");

export default function TraderBehaviorPage() {
  return <PageShell><article className="folio">
    <PortfolioIntro eyebrow="Case study / Trading behavior" title="Can a model learn my trading decisions?"><p>I used my own futures trading history to study a narrow question: whether pre-entry market information and user state can reproduce the direction of an observed trade.</p></PortfolioIntro>
    <div className="folio-wrap"><div className="folio-note"><strong>Historical direction imitation, not a trading strategy.</strong><p>The model is evaluated conditional on recorded LONG/SHORT entries. It does not establish when to trade, when to pass, how much to risk, or whether a trade will be profitable.</p></div>
      <dl className="folio-metrics"><div><dt>ML-eligible episodes</dt><dd>686</dd></div><div><dt>Final chronological holdout</dt><dd>114</dd></div><div><dt>Direction accuracy</dt><dd>71.05%</dd></div><div><dt>Balanced accuracy</dt><dd>67.76%</dd></div></dl>
      <div className="folio-reading">
        <h2>Start with the decisions, not the win rate.</h2><p>The reconstructed record contains 689 complete episodes. Its gross win rate was 66.47%, but the worst 1% of episodes accounted for 50.20% of all losing PnL. That concentration makes a single accuracy or win-rate statistic an incomplete account of trading quality.</p><p>I separated three questions: can the model imitate direction, can it identify better entries, and can it recognize severe losses? Success on the first question cannot stand in for success on the other two.</p>
        <h2>What I built.</h2><p>I reconstructed complete trading episodes, aligned pre-entry market and user-state features, and applied public-data coverage checks. The final dataset contained 686 ML-eligible episodes.</p><p>The newest 114 BTCUSDC episodes formed a chronological holdout kept out of fitting and parameter selection. The reported HGB + user-state model achieved 71.05% direction accuracy, 67.76% balanced accuracy, and MCC 0.353 on this final conditional LONG/SHORT evaluation.</p>
        <h2>What the evidence did not establish.</h2><p>Final entry-quality ROC-AUC was 0.5583. Tail-loss PR-AUC was 0.1364. These diagnostics do not establish a profitable-entry model or a reliable risk veto. The account’s returns are not attributed to this model.</p><p>The historical data also reflect occasions on which a trade was actually entered. A model learned from those entries alone does not describe all the times I chose not to trade.</p>
        <h2>The next connection: observe decisions as they happen.</h2><p>A read-only observer was introduced to collect forward action and market-state evidence. That creates a separate prospective record rather than quietly treating the historical holdout as live validation.</p><p>The research direction connects naturally to market microstructure: even a plausible directional decision can have poor execution economics. Fill uncertainty, costs, and post-fill price movement need their own tests.</p>
        <h2>Evidence and provenance.</h2><p>This case study reorganizes the behavioral results already published in the portfolio’s September 24, 2026 update. It introduces no new empirical measurement or outcome-based retuning. The underlying account record, research sample, and forward observations are different datasets.</p>
      </div>
      <RelatedWork><Link href="/trading">Personal account record ↗</Link><Link href="/research/microstructure">Current execution research ↗</Link><Link href="/asra">Research process and evidence boundaries ↗</Link></RelatedWork>
    </div><div className="folio-wrap folio-section" />
  </article></PageShell>;
}
