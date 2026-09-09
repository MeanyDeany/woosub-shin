import { PortfolioHome } from "@/components/portfolio-home";
import { metadataFor } from "@/lib/site-metadata";

export const metadata = metadataFor("/", "Woosub Shin — Quantitative Researcher", "Quantitative research built to survive falsification. ASRA, independently assessed BTC risk information, completed policy and synthetic methodology tests, and financial econometrics.");

export default function Home() { return <PortfolioHome />; }
