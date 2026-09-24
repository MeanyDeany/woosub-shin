import { PortfolioHome } from "@/components/portfolio-home";
import { metadataFor } from "@/lib/site-metadata";

export const metadata = metadataFor("/", "Woosub Shin — Quantitative Researcher", "Quantitative trading research with live read-only Binance USD-M performance and open-position telemetry, trader-behavior ML, ASRA, and financial econometrics.");

export default function Home() { return <PortfolioHome />; }
