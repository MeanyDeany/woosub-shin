/** Editorial summaries of already published work. Not a performance calculation layer. */
export const portfolioStudies = [
  {
    id: "trader-behavior",
    category: "Personal trading / Machine learning",
    title: "What can my trading history teach a model?",
    question: "Can a model reproduce my LONG/SHORT decisions using only information available before entry?",
    contribution: "I reconstructed trading episodes, aligned pre-entry features, and separated direction imitation from entry quality and tail-loss detection.",
    finding: "The final chronological holdout supports partial imitation. It does not establish profitable entries or a reliable risk veto.",
    metric: "71.05%",
    metricLabel: "Direction accuracy on 114 held-out episodes",
    href: "/research/trader-behavior",
    connection: "Personal trade record → behavioral research → forward observation",
  },
  {
    id: "risk-forecasting",
    category: "Financial econometrics / Risk",
    title: "Better risk forecasts. A separate trading question.",
    question: "Does market context improve one-hour BTC risk forecasts beyond historical volatility persistence?",
    contribution: "I challenged the model against a HAR-basis baseline, then tested whether forecast improvements translated into a useful risk policy.",
    finding: "Independent forecast confirmation survived. The separate preregistered policy-utility claim did not.",
    metric: "+12.58%",
    metricLabel: "Log-MSE improvement, not investment return",
    href: "/research/risk-forecasting#independent-assessment",
    connection: "Volatility research → stronger baselines → policy validation",
  },
  {
    id: "futures-thesis",
    category: "MSc thesis / Futures",
    title: "When should an intraday strategy participate?",
    question: "Can daily volatility regimes provide useful context for intraday futures strategies?",
    contribution: "I used EGARCH conditioning, ablation, chronological evaluation, and walk-forward analysis to study the role of volatility in a trading framework.",
    finding: "The thesis is the academic foundation of this work, not evidence that the current BTC system is profitable.",
    metric: "EGARCH",
    metricLabel: "Volatility regimes as conditioning information",
    href: "/projects/volatility-regime-filtering",
    connection: "Academic econometrics → independent research → market mechanics",
  },
] as const;

export const researchConnections = [
  { title: "Trading record", text: "Observe actual decisions and account outcomes.", href: "/trading" },
  { title: "Research questions", text: "Separate direction, risk, and execution hypotheses.", href: "/research" },
  { title: "Tests and evidence", text: "Compare baselines and retain negative results.", href: "/asra" },
  { title: "Systems", text: "Build the data and replay tools needed for the next test.", href: "/projects" },
] as const;

export const paperConnections = [
  {
    title: "Volatility Regime Filtering in Futures Markets",
    type: "MSc Economics thesis",
    question: "Can volatility regimes improve the context in which an intraday futures strategy operates?",
    approach: "Daily EGARCH conditioning, intraday strategy evaluation, ablation, bootstrap, and walk-forward analysis.",
    connection: "This work led to a sharper distinction between forecasting risk and demonstrating that a trading policy benefits from the forecast.",
    methods: "EGARCH / Student-t / Ablation / Walk-forward",
    pdfHref: "/papers/volatility-regime-filtering-thesis.pdf",
    projectHref: "/projects/volatility-regime-filtering",
    nextHref: "/research/risk-forecasting",
    nextLabel: "Related BTC risk research",
  },
  {
    title: "Bitcoin Bubble Detection with GSADF",
    type: "Seminar paper",
    question: "When does Bitcoin price behavior exhibit statistical explosiveness?",
    approach: "Right-tailed explosive-root testing and time-series diagnostics using GSADF.",
    connection: "A foundation in testing market narratives against data. Detecting an explosive episode is not the same as timing an entry or exit.",
    methods: "GSADF / Explosive roots / Time-series diagnostics",
    pdfHref: "/papers/bitcoin-bubble-gsadf-seminar-paper.pdf",
    projectHref: "/projects/bitcoin-bubble-gsadf",
    nextHref: "/asra",
    nextLabel: "How I test research claims",
  },
] as const;
