import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Korean pages are retired for this release. Temporary redirects retain
    // the option to restore reviewed translations without cached permanent moves.
    return [
      { source: "/ko", destination: "/", permanent: false },
      { source: "/ko/research", destination: "/research", permanent: false },
      { source: "/ko/papers", destination: "/papers", permanent: false },
      { source: "/ko/projects", destination: "/projects", permanent: false },
      { source: "/ko/projects/btc-futures-research", destination: "/projects/btc-futures-research", permanent: false },
      { source: "/ko/projects/btc-futures-research/live-position", destination: "/projects/btc-futures-research/live-position", permanent: false },
      { source: "/ko/projects/btc-regime-challenger", destination: "/projects/btc-regime-challenger", permanent: false },
      { source: "/ko/projects/multi-asset-research-lab", destination: "/projects/multi-asset-research-lab", permanent: false },
      { source: "/ko/projects/multi-asset-research-lab/claims", destination: "/projects/multi-asset-research-lab/claims", permanent: false },
      { source: "/ko/projects/volatility-regime-filtering", destination: "/projects/volatility-regime-filtering", permanent: false },
      { source: "/ko/projects/bitcoin-bubble-gsadf", destination: "/projects/bitcoin-bubble-gsadf", permanent: false },
      { source: "/ko/contact", destination: "/contact", permanent: false },
      { source: "/ko/build-log", destination: "/build-log", permanent: false },
    ];
  },
};

export default nextConfig;
