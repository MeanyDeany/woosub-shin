import { PortfolioHome } from "@/components/portfolio-home";
import { metadataFor } from "@/lib/site-metadata";

export const metadata = metadataFor("/", "Woosub Shin — Quantitative Researcher", "Systematic trading and quantitative research: NQ/ES futures OOS evidence, reconstructed discretionary trading behavior, trader-behavior ML, ASRA, and financial econometrics.");

export default function Home() { return <PortfolioHome />; }
