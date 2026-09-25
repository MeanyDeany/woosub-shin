import { PortfolioHome } from "@/components/portfolio-home";
import { metadataFor } from "@/lib/site-metadata";

export const metadata = metadataFor("/", "Woosub Shin — Trader / Quantitative Researcher", "Futures trader and quantitative researcher working on BTC market microstructure, systematic trading, financial econometrics, and read-only account telemetry.");

export default function Home() { return <PortfolioHome />; }
