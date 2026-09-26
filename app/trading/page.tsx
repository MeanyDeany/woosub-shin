import Link from "next/link";
import { PageShell } from "@/components/site-shell";
import { RelatedWork } from "@/components/portfolio-editorial";
import { TradingAccountingGuide } from "@/components/trading-accounting-guide";
import { BtcTradingDesk } from "@/components/btc-trading-desk";
import { metadataFor } from "@/lib/site-metadata";
import { deriveBtcLifetimePerformanceFeedUrl } from "@/lib/btc-lifetime-performance";
import { deriveBtcLiveMultiPositionFeedUrl } from "@/lib/btc-live-multi-position";
import { deriveBtcRollingPerformanceFeedUrl } from "@/lib/btc-rolling-performance";
import { deriveBtcDailyPerformanceFeedUrl } from "@/lib/btc-daily-performance";

export const metadata = metadataFor("/trading", "Personal Trading Record", "Personal Binance USD-M account performance, positions, UTC daily history, and an explicit guide to the difference between account outcomes and research results.");

export default function TradingPage() {
  return <PageShell><div className="folio">
    {/* The full dashboard owns this page's h1; this introduction provides context. */}
    <header className="folio-intro folio-wrap"><p className="folio-eyebrow">Woosub Shin / Personal trading record</p><p className="folio-lead">My account outcomes, not a strategy advertisement. Positions, published returns, and daily history are shown with their source and reporting limits.</p></header>
    <div className="folio-wrap"><nav className="folio-subnav" aria-label="Trading record sections"><a href="#account-record">Performance and calendar</a><a href="#order-history">Order-history coverage</a><a href="#record-method">How to read the record</a><Link href="/research/trader-behavior">From trades to research ↗</Link></nav></div>
    <section id="account-record" className="folio-account" aria-label="Read-only account performance and trading calendar">
      <TradingAccountingGuide />
      <BtcTradingDesk
        positionFeedUrl={deriveBtcLiveMultiPositionFeedUrl(process.env.NEXT_PUBLIC_BTC_RESEARCH_OBSERVATORY_URL, process.env.NEXT_PUBLIC_BTC_MULTI_POSITION_URL)}
        performanceFeedUrl={deriveBtcLifetimePerformanceFeedUrl(process.env.NEXT_PUBLIC_BTC_RESEARCH_OBSERVATORY_URL, process.env.NEXT_PUBLIC_BTC_LIFETIME_PERFORMANCE_URL)}
        rollingFeedUrl={deriveBtcRollingPerformanceFeedUrl(process.env.NEXT_PUBLIC_BTC_RESEARCH_OBSERVATORY_URL, process.env.NEXT_PUBLIC_BTC_ROLLING_PERFORMANCE_URL)}
        dailyFeedUrl={deriveBtcDailyPerformanceFeedUrl(process.env.NEXT_PUBLIC_BTC_RESEARCH_OBSERVATORY_URL, process.env.NEXT_PUBLIC_BTC_DAILY_PERFORMANCE_URL)}
      />
    </section>
    <section id="order-history" className="folio-wrap folio-section">
      <div className="folio-section-heading"><div><p className="folio-eyebrow">Data coverage</p><h2>Daily history is not order history.</h2></div><p>The public record currently contains daily outcomes and current positions, not an order-by-order or fill-by-fill ledger.</p></div>
      <div className="folio-two-column"><div><h3>What is available</h3><p>The calendar reaches November 15, 2024 using supplied transaction exports. Authenticated performance reporting starts August 1, 2026. The public position feed reports every non-zero published position and whether open orders are present.</p><p>Open-order presence does not establish an order’s price, purpose, execution, or protective effect.</p></div><div className="folio-note"><strong>Order-level feed: not published</strong><p>No synthetic orders, reconstructed fill prices, or assumed trade counts are shown. Transaction-income rows cannot establish the complete order lifecycle.</p><p>A future order-history view requires a separately reviewed, sanitized source. Prices, quantities, account balances, order identifiers, credentials, and private notes remain outside this public release.</p></div></div>
    </section>
    <section id="record-method" className="folio-wrap folio-section" style={{ paddingTop: 0 }}>
      <p className="folio-eyebrow">Reading the numbers</p><h2>Three records. Different meanings.</h2>
      <div className="folio-table-wrap" role="region" aria-label="Account reporting coverage" tabIndex={0}><table className="folio-status-table"><caption>Reporting windows and permitted interpretations</caption><thead><tr><th scope="col">Record</th><th scope="col">Coverage</th><th scope="col">What it means</th></tr></thead><tbody>
        <tr><th scope="row">Authenticated account performance</th><td>From 01 Aug 2026</td><td>Published flow-adjusted reporting. Deposits and withdrawals are not trading PnL. The interface does not recalculate returns.</td></tr>
        <tr><th scope="row">Historical transaction exports</th><td>Calendar from 15 Nov 2024</td><td>BTCUSDT/BTCUSDC stablecoin realized cash PnL only, not complete account PnL. Missing boundary valuations prevent historical daily returns. Partial dates stay visibly partial.</td></tr>
        <tr><th scope="row">Research results</th><td>Each study’s stated sample</td><td>Backtests, forecast losses, imitation accuracy, and hypothetical markouts are not this account’s return series.</td></tr>
      </tbody></table></div>
      <p>Authenticated ledger rows take precedence. Unsupported BNB fees and ambiguous events are not assigned invented USD values. Missing observations are unavailable, not zero. Personal journal notes stay in the browser.</p>
      <RelatedWork title="What the account record led me to study"><Link href="/research/trader-behavior">Trading decisions and behavioral ML ↗</Link><Link href="/research/microstructure">Execution quality and market mechanics ↗</Link><Link href="/papers">Academic foundation ↗</Link></RelatedWork>
    </section>
  </div></PageShell>;
}
